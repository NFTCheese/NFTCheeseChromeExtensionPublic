
/* @TODO:
1. Naming rariest is wack
2. isMatchedWithRarities is funky -> DONE. Now also filter by traits
3. Need to fetch the notifiers from the server
4. API to return the assets with the ranking is slow
5. What about the multi collections
*/

import { useToast } from '@chakra-ui/react';
import { get, inRange, throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { ASSEST_REFRESH_INTERVAL, IS_USING_OPENSEA_TO_UPDATE } from '../config/web-config';
import { Filter } from '../container/WatchListContainer';
import { fetchAssetsCollection, fetchCollectionAddress, fetchSelectors } from '../utils/api';
import { readableEthValue, weiToEth } from '../utils/ethereum';
import { useTraitCountExcluded } from '../utils/rarityUtils';
import { NFT } from './NFTBox';


const playSound = true;
const sendNotification = true;

export const throttledPlayNotificationSound = throttle(() => {
  const audio = new Audio(chrome.runtime.getURL('/notification.mp3'))
  audio.play()
}, 1000)

export type Notifier = {
  id: string,
  collectionSlug: string,
  maxPrice: number,
  minRank: number,
  maxRank: number,
  includeAuctions: boolean,
  traits: {
    property: string,
    value: string
  }[],
  autoQuickBuy: boolean
}

export type MatchedAsset = {
  listingId: string
  tokenId: string
  contractAddress: string
  chain: string
  name: string
  image: string
  price: string
  currency: string
  timestamp: string
  notifier: Notifier
}

type Trait = {
  count: number
  trait_type: string
  value: string
}

export type Rarities = {
  tokenRank: Record<string, number>
  noTraitCountTokenRank: Record<string, number>
  tokenCount: number
  isRanked: boolean
  traits: Trait[]
}

const isMatchedWithNotifier = ({
  asset,
  notifier,
  traitCountExcluded,
  rarities,
  assetsMatchingNotifier,
}: {
  asset: MatchedAsset
  notifier: Notifier
  traitCountExcluded: boolean | null
  rarities: Rarities | null
  assetsMatchingNotifier: Record<string, Record<string, boolean>>
}) => {
  // Auctions
  if (!notifier.includeAuctions && asset.currency === 'WETH') {
    return false
  }

  // Max Price
  if (
    notifier.maxPrice !== null &&
    weiToEth(Number(asset.price)) > notifier.maxPrice
  ) {
    return false
  }

  // Rarity
  if (rarities) {
    const rank = traitCountExcluded
      ? rarities.noTraitCountTokenRank[asset.tokenId]
      : rarities.tokenRank[asset.tokenId];


    const isInRange = inRange(rank, notifier.minRank, notifier.maxRank);
    if (!isInRange) { return false; }
  }

  // Traits
  if (notifier.traits.length) {
    if (
      !assetsMatchingNotifier[notifier.id] ||
      !assetsMatchingNotifier[notifier.id][asset.tokenId]
    ) {
      return false
    }
  }
  return true
}

type CachedState = {
  collectionSlug: string
  assetsMatchingNotifier: Record<string, Record<string, boolean>>
  rarities: Rarities | null
  pollTime?: string | null
  pollInterval: number
  addedListings: Record<string, boolean>
  matchedAssets: MatchedAsset[]
  activeNotifiers: Notifier[]
  playSound: boolean
  sendNotification: boolean
  seenListingsCount: number
  notificationIds: string[]
}
let DEFAULT_STATE: CachedState = {
  collectionSlug: '',
  activeNotifiers: [],
  matchedAssets: [],
  addedListings: {},
  pollTime: null,
  pollInterval: ASSEST_REFRESH_INTERVAL,
  rarities: null,
  assetsMatchingNotifier: {},
  playSound: true,
  sendNotification: true,
  seenListingsCount: 0,
  notificationIds: [],
}
let cachedState = DEFAULT_STATE

// const createPollTime = (bufferSeconds = 0) =>
//   new Date(Date.now() - bufferSeconds * 1000).toISOString().replace(/Z$/, '')

type IListingNotifierProps = {
  NFTNotifyFilter: Filter
  lastUpdatedTs?: string
  onUpdatedNftFilterChange: (filter: Filter) => void
}

export default function ListingNotifier(props: IListingNotifierProps) {
  const [address, setAddress] = useState('');

  const stateToRestore =
    cachedState.collectionSlug === props.NFTNotifyFilter.collection ? cachedState : DEFAULT_STATE

  // const pollTimeRef = useRef<string | null>(null)

  const [pollStatus, setPollStatus] = useState<
    'STARTING' | 'ACTIVE' | 'FAILED'
  >('STARTING');

  const [_, setError] = useState<{
    type: string, message: string
  } | null>(null)

  const retriesRef = useRef(0);
  const totalAssetsInfoRef = useRef<NFT[]>();
  const [activeNotifiers, setActiveNotifiers] = useState<Notifier[]>(
    stateToRestore.activeNotifiers,
  )
  const [rarities, setRarities] = useState<Rarities | null>(
    stateToRestore.rarities,
  )
  const [notificationIds, setNotificationIds] = useState<string[]>(stateToRestore.notificationIds);
  const addedListings = useRef<Record<string, boolean>>(
    stateToRestore.addedListings
  ).current;
  const [traitCountExcluded] = useTraitCountExcluded(address)

  const assetsMatchingNotifier = useRef<
    Record<string, Record<string, boolean>>
  >(stateToRestore.assetsMatchingNotifier).current;

  const [pollInterval, _setPollInterval] = useState(stateToRestore.pollInterval)
  const [matchedAssets, _setMatchedAssets] = useState<MatchedAsset[]>(
    stateToRestore.matchedAssets,
  );

  const [seenListingsCount, _setSeenListingsCount] = useState(
    stateToRestore.seenListingsCount,
  )

  const toast = useToast();
  var matchedAssetsOpenseaRef: NFT[]

  useEffect(() => {
    //Set Active Notifier
    let tempTrait = props.NFTNotifyFilter.payload.traits.map((trait) => {
      return {
        property: trait.property,
        value: trait.value
      }
    }
    )
    const currentNotifier = {
      id: props.NFTNotifyFilter.id.toString(),
      collectionSlug: props.NFTNotifyFilter.collection,
      maxPrice: props.NFTNotifyFilter.payload.max_price,
      minRank: props.NFTNotifyFilter.payload.rarity_range[0],
      maxRank: props.NFTNotifyFilter.payload.rarity_range[1],
      includeAuctions: false,
      traits: tempTrait,
      autoQuickBuy: false
    }
    if ([currentNotifier] !== activeNotifiers) {
      setActiveNotifiers([currentNotifier])
    }

  }, [props.NFTNotifyFilter])

  useEffect(() => {

    cachedState = {
      collectionSlug: props.NFTNotifyFilter.collection,
      assetsMatchingNotifier: assetsMatchingNotifier,
      rarities,
      pollTime: props.lastUpdatedTs,
      addedListings,
      matchedAssets,
      activeNotifiers,
      playSound,
      pollInterval,
      sendNotification,
      seenListingsCount,
      notificationIds,
    }
  }, [
    activeNotifiers,
    addedListings,
    assetsMatchingNotifier,
    props.NFTNotifyFilter.collection,
    matchedAssets,
    pollInterval,
    rarities,
    seenListingsCount,
    notificationIds,
  ]);

  useEffect(() => {
    (async () => {
      if (!totalAssetsInfoRef.current) {
        try {
          const address = await fetchCollectionAddress(props.NFTNotifyFilter.collection)
          setAddress(address || '')
        } catch (err) {
          console.error('failed fetching collection slug', err)
        }

        const snipingTraits = activeNotifiers.map((notifier) => notifier.traits).flat();
        const totalAssetsInfo = await fetchAssetsCollection(props.NFTNotifyFilter.collection, snipingTraits, '', props.NFTNotifyFilter.payload.rarity_range, null)
        totalAssetsInfoRef.current = totalAssetsInfo.NFTs

        /* assetsMatchingNotifier is all of the NFTs (assets) match the __traits__ */
        activeNotifiers.forEach(notifier => {
          assetsMatchingNotifier[notifier.id] = totalAssetsInfo.NFTs
            .filter((asset) => {
              if (!asset.traits) return false;

              return snipingTraits.every((snipingTrait) => {
                return asset.traits?.some(assetTrait => {
                  return assetTrait.property === snipingTrait.property &&
                    assetTrait.value === snipingTrait.value;
                })
              })
            })
            .reduce((final, asset) => {
              return {
                ...final,
                [asset.tokenID]: true
              }
            }, {});
        })
        const rarities: Rarities = {
          traits: [], // Deprecated
          tokenCount: totalAssetsInfo.totalSupply,
          tokenRank: totalAssetsInfo.NFTs.reduce((final, asset) => {
            return {
              ...final,
              [asset.tokenID]: asset.rarityRank
            }
          }, {}),
          noTraitCountTokenRank: {},
          isRanked: true
        }
        setRarities(rarities)
      }
    })()
  }, [activeNotifiers]);

  useEffect(() => {
    if (!rarities) return;

    let pollTimeout: NodeJS.Timeout | null = null
    if (activeNotifiers.length === 0 || pollStatus === 'FAILED') {
      pollTimeout !== null && clearInterval(pollTimeout)
    } else {
      if (props.lastUpdatedTs) {
        pollTimeout = setInterval(async () => {
          chrome.storage.local.get(
            ['openSeaGraphQlRequests'],
            async ({ openSeaGraphQlRequests }) => {
              const request = openSeaGraphQlRequests?.EventHistoryPollQuery
              if (request && IS_USING_OPENSEA_TO_UPDATE) {
                const selectors = await fetchSelectors()
                const body = JSON.parse(request.body)
                body.variables = {
                  ...body.variables,
                  ...selectors.listingNotifier.api.staticVariables,
                  [selectors.listingNotifier.api.variablePaths.collectionSlug]: [
                    props.NFTNotifyFilter.collection,
                  ],
                  [selectors.listingNotifier.api.variablePaths.timestamp]: props.lastUpdatedTs,
                }

                let fetchedAssets = null;

                try {
                  const res = await fetch(request.url, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: request.headers.reduce(
                      (
                        acc: Record<string, string>,
                        { name, value }: { name: string; value: string },
                      ) => {
                        if (value) {
                          acc[name] = value
                        }
                        return acc
                      },
                      {},
                    ),
                  })
                  if (res.status !== 200) {
                    const text = await res.text()
                    // eslint-disable-next-line no-throw-literal
                    throw { message: text, status: res.status }
                  }
                  const json = await res.json();

                  const paths = selectors.listingNotifier.api.resultPaths

                  fetchedAssets = get(json, paths.edges).map((edge: any) => {
                    if (!get(edge, paths.asset)) return null
                    const chain = get(edge, paths.chain)
                    return {
                      listingId: get(edge, paths.listingId),
                      tokenId: get(edge, paths.tokenId),
                      contractAddress: get(edge, paths.contractAddress),
                      chain: chain === 'MATIC' ? 'polygon' : 'ethereum',
                      name:
                        get(edge, paths.name) ||
                        get(edge, paths.collectionName),
                      image: get(edge, paths.image),
                      price: get(edge, paths.price),
                      currency: get(edge, paths.currency),
                      timestamp: get(edge, paths.timestamp),
                    }
                  });
                } catch (e: any) {
                  if (e.status === 429) {
                    setError({ type: 'RATE_LIMIT', message: e.message })
                    setPollStatus('FAILED')
                  } else {
                    chrome.storage.local.remove(['openSeaGraphQlRequests'])
                    retriesRef.current += 1
                  }
                }

                if (fetchedAssets) {
                  const sortedNotifiers = [...activeNotifiers].sort(
                    (a, b) => Number(b.autoQuickBuy) - Number(a.autoQuickBuy),
                  )

                  const filteredAssets = fetchedAssets
                    .filter(Boolean)
                    .filter(
                      (asset: MatchedAsset) => !addedListings[asset.listingId],
                    )
                    .map((asset: MatchedAsset) => {
                      /* Check if asset match the filters */
                      /* AND not fired notification already */
                      const notifier = sortedNotifiers.find((notifier) =>
                        isMatchedWithNotifier({
                          asset,
                          notifier,
                          traitCountExcluded,
                          rarities,
                          assetsMatchingNotifier,
                        }),
                      )
                      return { ...asset, notifier }
                    })
                    .filter((asset: MatchedAsset) => Boolean(asset.notifier));

                  matchedAssetsOpenseaRef = []
                  filteredAssets.forEach(
                    ({
                      notifier,
                      ...asset
                    }: MatchedAsset & { notifier: Notifier }) => {
                      addedListings[asset.listingId] = true;
                      const rank = rarities?.tokenRank[asset.tokenId] || null

                      // Use map openSea data to our db. Updated price
                      let cheeseAssets = totalAssetsInfoRef.current?.find((info) => info.tokenID === asset.tokenId)
                      if (cheeseAssets) {
                        cheeseAssets.price = readableEthValue(+asset.price)
                        matchedAssetsOpenseaRef.push(cheeseAssets)
                      }

                      if (sendNotification) {
                        chrome.runtime.sendMessage(
                          {
                            method: 'notify',
                            params: {
                              id: asset.listingId,
                              openOnClick: `https://opensea.io/assets/${asset.contractAddress}/${asset.tokenId}`,
                              options: {
                                title: 'NFTCheese - New Snipe',
                                type: 'basic',
                                iconUrl: asset.image,
                                requireInteraction: true,
                                silent: true,
                                message: `${rank ? `Rank #${rank} - ` : ''}${asset.name
                                  } (${readableEthValue(+asset.price)} ${asset.currency
                                  })`,
                              },
                            },
                          },
                          (notificationId: string) => {
                            if (playSound) {
                              throttledPlayNotificationSound()
                            }
                            throttledPlayNotificationSound()
                            setNotificationIds((ids) =>
                              ids.concat([notificationId]),
                            )
                          },
                        )
                        toast({
                          title: `New NFT in #${asset.name}`,
                          description: `1 New ${props.NFTNotifyFilter.collection} NFT Listing (${readableEthValue(+asset.price)} ${asset.currency
                            }) match your watchlist`,
                          status: 'info',
                          isClosable: true,
                        })
                      } else if (playSound) {
                        throttledPlayNotificationSound()
                      };
                    },
                  )
                  props.onUpdatedNftFilterChange({
                    ...props.NFTNotifyFilter,
                    NFTs: matchedAssetsOpenseaRef
                  })
                }
              } else {
                let currentNotifier = activeNotifiers[0]
                let fetchedAssets = await fetchAssetsCollection(currentNotifier.collectionSlug, currentNotifier.traits, props.lastUpdatedTs, [currentNotifier.minRank, currentNotifier.maxRank], currentNotifier.maxPrice);

                props.onUpdatedNftFilterChange({
                  ...props.NFTNotifyFilter,
                  NFTs: fetchedAssets.NFTs
                })

                fetchedAssets.NFTs
                  .filter((asset) => {
                    if (!asset.price) return false;
                    return true
                  })
                  .forEach((asset) => {
                    chrome.runtime.sendMessage(
                      {
                        method: 'notify',
                        params: {
                          id: props.NFTNotifyFilter.collection + asset.tokenID,
                          openOnClick: `https://opensea.io/assets/${asset.contractAddress}/${asset.tokenID}`,
                          options: {
                            title: 'NFTCheese - New Snipe',
                            type: 'basic',
                            iconUrl: asset.image,
                            requireInteraction: true,
                            silent: true,
                            message: `${asset.rarityRank ? `Rank #${asset.rarityRank} - ` : ''}${asset.name} (${asset.price} ETH)`,
                          },
                        },
                      },
                      (notificationId: string) => {
                        if (playSound) {
                          throttledPlayNotificationSound()
                        }
                        throttledPlayNotificationSound()
                        setNotificationIds((ids) =>
                          ids.concat([notificationId]),
                        )
                      },
                    )
                    toast({
                      title: `New NFT in #${asset.name}`,
                      description: `1 New ${props.NFTNotifyFilter.collection} NFT Listing (${asset.price} ETH) match your watchlist`,
                      status: 'info',
                      isClosable: true,
                    })
                  }
                  )
              }
            })
        }, pollInterval * 1000)
      }
    }


    return () => {
      pollTimeout && clearInterval(pollTimeout)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeNotifiers,
    rarities,
    traitCountExcluded,
    pollInterval,
    pollStatus,
    props.lastUpdatedTs
  ])

  return (
    <>
    </>
  )
}