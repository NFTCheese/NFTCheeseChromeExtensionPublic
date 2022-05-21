import DataLoader from 'dataloader';
import { Selectors } from "./selector"
import lastKnownInjectionSelectors from '../assets/lastKnownInjectionSelectors.json'
import { NFT } from '../component/NFTBox';
import { weiToEth } from "./ethereum";
import { RateLimit, Sema } from "async-sema";
import { getUserFromStorage, User } from "./user";
import axios, { AxiosRequestConfig } from "axios";
import { Filter } from '../container/WatchListContainer';
import { GasBoxProps } from '../component/GasBox';
import { useEffect, useState } from 'react';
import { TraitWithUniqueScore } from '../types';

const REMOTE_ASSET_BASE = 'https://nftcheese.net';
export const SERVER_DOMAIN = 'https://nftcheese.net';

// Parcel will inline the string
let lastKnownStyleOverrides = ''
try {
  const fs = require('fs')
  lastKnownStyleOverrides = fs.readFileSync(
    './src/assets/lastKnownStyleOverrides.css',
    'utf-8',
  )
} catch (err) { }

let selectorsPromise: Promise<Selectors> | null = null
export const fetchSelectors = () => {
  if (!selectorsPromise) {
    // Fallback to last known selectors if request takes more than 5 seconds
    selectorsPromise = Promise.race<Promise<Selectors>>([
      fetch(`${REMOTE_ASSET_BASE}/injectionSelectors`)
        .then((res: any) =>
          res.json(),
        ),
      new Promise<Selectors>((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 5000)
      }),
    ]).catch((err) => {
      console.error(err)
      return lastKnownInjectionSelectors as Selectors
    })
  }
  return selectorsPromise
}


let cssPromise: null | Promise<string> = null
export const fetchGlobalCSS = () => {
  if (!cssPromise) {
    // Fallback to last known css if request takes more than 5 seconds
    cssPromise = Promise.race<Promise<string>>([
      // fetch(`${REMOTE_ASSET_BASE}/styleOverrides.css`)
      //   .then((res) =>
      //     res.text(),
      //   ),
      Promise.resolve(lastKnownStyleOverrides),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 5000)
      }) as Promise<string>,
    ]).catch((err) => {
      console.error(err)
      return lastKnownStyleOverrides
    }) as Promise<string>
  }
  return cssPromise
}

export type trait = {
  name: string
  value: string
}

type apiPayload = {
  max_price: number
  rarity_range: number[]
  traits: trait[]
}

type apiFilter = {
  w_id: number
  w_member_add: string
  w_collection_slug: string
  w_payload: apiPayload
}

export const fetchWatchList = async (member_address: string, options: {
  signal?: AbortSignal
} = {}): Promise<Filter[]> => {
  const data: apiFilter[] = await cheeseApiRequest({
    method: 'GET',
    url: `${SERVER_DOMAIN}/api/members/${member_address}/watchlists`,
    signal: options.signal
  })

  const result = data.map((filter: apiFilter) => {
    const mappedTraits = filter.w_payload.traits.map((item: trait) => {
      return {
        property: item.name,
        value: item.value,
        uniqueScore: NaN
      }
    })

    const w_payload = {
      max_price: filter.w_payload.max_price,
      rarity_range: filter.w_payload.rarity_range,
      traits: mappedTraits
    }

    return {
      id: filter.w_id,
      member_address: filter.w_member_add,
      collection: filter.w_collection_slug,
      payload: w_payload,
      NFTs: []
    }
  })
  return result
}


type createWatchListProps = {
  collection_slug: string
  max_price: number
  rarity_range: number[]
  traits: trait[]
}

export const createWatchList = async (member_address: string, watchListInfo: createWatchListProps) => {

  await cheeseApiRequest({
    url: `${SERVER_DOMAIN}/api/members/${member_address}/watchlists`,
    method: 'POST',
    data: watchListInfo
  })
}


export const deleteWatchList = async (member_address: string, id: number) => {
  await cheeseApiRequest({
    url: `${SERVER_DOMAIN}/api/members/${member_address}/watchlists/${id}`,
    method: 'DELETE'
  })
}

type TraitResponse = {
  t_collection_slug: string
  t_count: number
  t_name: string
  t_pct: number
  t_value: string
}

const fetchCollectionTraitsRateLimit = RateLimit(2)
export const collectionTraitsLoader = new DataLoader(
  async (keys: readonly string[]) => {
    const [slug] = keys
    await fetchCollectionTraitsRateLimit()
    const data: TraitResponse[] = await cheeseApiRequest({
      method: 'GET',
      url: `${SERVER_DOMAIN}/api/traits?collection_slug=${slug}`
    })

    const result: TraitWithUniqueScore[] = data.map(
      (trait) => {
        return {
          property: trait.t_name,
          value: trait.t_value,
          uniqueScore: trait.t_pct
        }
      },
    )
    return [result];
  },
  {
    maxBatchSize: 1,
  },
)
export const fetchTraitsCollection = async (slug: string): Promise<TraitWithUniqueScore[]> => {
  return collectionTraitsLoader.load(slug);
}

type GasResponse = {
  price: number,
  confidence: number
  maxFeePerGas: number
  maxPriorityFeePerGas: number
}

export const fetchGas = async (): Promise<GasBoxProps[]> => {
  const data: GasResponse[] = await cheeseApiRequest({
    method: 'GET',
    url: `${SERVER_DOMAIN}/api/gas`
  })

  const result = data.slice(0, 4).map(
    (gas) => {
      return {
        priorityFee: gas.maxPriorityFeePerGas,
        maxFee: gas.maxFeePerGas,
        probability: gas.confidence,
        isRecommended: false
      }
    },
  )

  //Sort by prob
  result.sort(function (a, b) {
    return b.probability - a.probability
  })

  //Set highest prob to recomeneded
  result[0].isRecommended = true
  return result
}



type Trait = {
  name: string
  rarity_pct: number
  value: string
}
type Asset = {
  a_collection_slug: string
  a_contract_address_id: string
  a_current_price: number | null
  a_image_url: string
  a_rarity_rank: number
  a_rarity_score: string
  a_token_id: string
  a_traits: Trait[]
}

export async function fetchAssetsCollection(
  slug: string,
  filteredTraits: any[],
  sinceTs?: string | null,
  rarityRange?: number[],
  maxPrice?: number | null
): Promise<{
  totalSupply: number,
  NFTs: NFT[]
}> {

  const mappingFilteredTraits = filteredTraits.map((traits) => {
    return {
      name: traits.property,
      value: traits.value
    }
  })

  let post_body = {
    traits: mappingFilteredTraits,
    since_ts: sinceTs,
    rarity_range: rarityRange,
    max_price: maxPrice
  }

  const assetsData = await cheeseApiRequest({
    url: `${SERVER_DOMAIN}/api/collections/${slug}/assets`,
    method: 'POST',
    data: post_body
  }) as {
    data: Asset[],
    total_supply: number
  };
  // const data = res.data.data as Asset[];
  const totalSupply = assetsData.total_supply as number;

  const result = assetsData.data.map(
    (asset) => {
      let traits = asset.a_traits.map((item) => {
        return {
          property: item.name,
          value: item.value,
          uniqueScore: item.rarity_pct
        }
      })

      return {
        totalSupply,
        contractAddress: asset.a_contract_address_id,
        price: asset.a_current_price ? weiToEth(asset.a_current_price) : null,
        image: asset.a_image_url,
        rarityRank: asset.a_rarity_rank,
        rarityScore: parseFloat(asset.a_rarity_score),
        tokenID: asset.a_token_id,
        traits: traits,
        isAvailable: asset.a_current_price ? true : false,
        openseaURL: `https://opensea.io/assets/${asset.a_contract_address_id}/${asset.a_token_id}`,
        name: `#${asset.a_token_id}`
      }
    },
  )

  return {
    NFTs: result,
    totalSupply
  }
}
export const checkAuth = async (): Promise<any> => {
  const data = await cheeseApiRequest({
    url: `${SERVER_DOMAIN}/api/auth/`,
    method: 'GET'
  })
  return data
}
// const tokenClient = new GraphQLClient(GRAPHQL_AUTH_URL, {
//   credentials: 'include',
//   mode: 'cors',
// })

const userSema = new Sema(1)
let cachedUser:
  | {
    accessToken: string
    role: User['role']
    membershipType: User['membershipType']
    publicAddress: User['publicAddress']
  }
  | null
  | undefined = undefined;

export const getUser = async (refresh = false) => {
  await userSema.acquire()
  if (!refresh) {
    if (cachedUser !== undefined) {
      userSema.release()
      return cachedUser
    }
  }

  // return Promise.reject('Refresh Token is not yet supported');

  const user = await getUserFromStorage()
  cachedUser = user;

  if (!user) {
    cachedUser = {
      accessToken: '',
      role: 'FREE',
      membershipType: null,
      publicAddress: ''
    }
  }

  // const {
  //   refreshToken: { accessToken, account },
  // } = await tokenClient.request(refreshTokenQuery)

  userSema.release()

  return cachedUser
}

const getUserRoleHeader = (
  role: User['role'],
  membershipType: User['membershipType'],
) => {
  return `${role}-${membershipType}` as const
}

type APIRequestOption = AxiosRequestConfig & {
  refreshAccessToken?: boolean
}
export const cheeseApiRequest = async <T = any>(options: APIRequestOption): Promise<T> => {
  const user = await getUser(options.refreshAccessToken)
  const accessToken = user?.role !== 'FREE' && user?.accessToken

  try {
    const { data } = await axios({
      url: options.url,
      method: options.method,
      data: options.data,
      headers: {
        ...(accessToken ? {
          Authorization: `Bearer ${accessToken}`,
          'X-NFTCheese-Role': getUserRoleHeader(
            user.role,
            user.membershipType,
          ),
          'X-NFTCheese-Path': window.location.pathname,
        } : {}),
        ...(options.headers || {})
      }
    });
    return data;
  } catch (err: any) {
    /* @todo: Refresh Token */
    // if (
    //   err?.response?.errors[0]?.message === 'Not Authorised!' &&
    //   !options.refreshAccessToken
    // ) {
    //   return cheeseApiRequest({
    //     ...options,
    //     refreshAccessToken: true
    //   })
    // }
    throw err
  }
}

/* ------- Fetch sale activity ------- */
export type SaleActivityResponse = {
  average: { key: string, value: number }[]
  totalSales: { key: string, value: number }[]
  volume: { key: string, value: number }[]
  high: { key: string, value: number }[]
  low: { key: string, value: number }[]
}

export const fetchSalesActivity = async (options: {
  collectionSlug: string,
  intervalTime: string,
  tokenIDs?: string[], // DEPRECATED
  rarityRange?: number[],
  signal?: AbortSignal
  traits?: {
    name: string
    value: string
  }[]
}): Promise<SaleActivityResponse> => {
  const { collectionSlug,
    intervalTime,
    rarityRange,
    signal
  } = options;
  const data = await cheeseApiRequest({
    method: 'POST',
    url: `${SERVER_DOMAIN}/api/sales-activity/metrics`,
    data: {
      interval: intervalTime || '7d',
      collection_slug: collectionSlug,
      rarity_range: rarityRange,
      traits: options.traits
    },
    refreshAccessToken: false,
    signal,
  });
  return data;
}

/* ------- Fetch assets of a collection ------- */
export type Rarities = {
  tokenCount: number
  tokens: {
    iteratorID: string
    rank: number
  }[]
}

const rarityLoader = new DataLoader(
  async (collectionSlugs: readonly string[]) => {
    // Max batch size is 1, we only use this for client side caching
    try {
      // const res = await nonFungibleRequest(rarityQuery, {
      //   address,
      // })
      const { NFTs: assets, totalSupply } = await fetchAssetsCollection(collectionSlugs[0], [], "", [], null)
      return [{
        contractAddress: '',
        tokenCount: totalSupply,
        tokens: assets.map((asset) => {
          return {
            iteratorID: asset.tokenID,
            rank: asset.rarityRank
          }
        })
      }]
      // return [res.contract]
    } catch (e) {
      return [null]
    }
  },
  {
    batchScheduleFn: (callback) => setTimeout(callback, 250),
    maxBatchSize: 1,
  },
);
export const fetchRarities = async (collectionSlug: string) => {
  return rarityLoader.load(collectionSlug) as Promise<Rarities | null>
}

export const createNFTLoader = (collectionSlug: string) => new DataLoader(
  async (tokenIDs: readonly string[]) => {
    const { data: assets, total_supply }: {
      data: any[],
      total_supply: number
    } = await cheeseApiRequest({
      method: 'GET',
      url: `${SERVER_DOMAIN}/api/collections/${collectionSlug}/assets?token_ids=${tokenIDs.join(',')}`
    });

    return tokenIDs.map((tokenID) => {
      const asset = assets.find(asset => asset.a_token_id === tokenID)
      return {
        iteratorID: asset.a_token_id,
        rank: asset.a_rarity_rank,
        tokenCount: total_supply,
      }
    })
    // return assets.map((asset) => {
    //   return {
    //     iteratorID: asset.a_token_id,
    //     rank: asset.a_rarity_rank,
    //     tokenCount: total_supply,
    //   }
    // })
  },
  {
    batchScheduleFn: (callback) => setTimeout(callback, 250),
    maxBatchSize: 16,
  },
)

/* ------- Fetch prices of a collection -------- */
const openSeaPublicRateLimit = RateLimit(2)
export type Chain = 'ethereum' | 'polygon'
export const collectionPricesLoader = new DataLoader(
  async (keys: readonly string[]) => {
    const [slug] = keys
    await openSeaPublicRateLimit()
    const { stats } = await fetch(
      `https://api.opensea.io/api/v1/collection/${slug}/stats`,
    ).then((res) => res.json())
    return [
      {
        floorPrice: Math.round(stats.floor_price * 10000) / 10000,
        todayVolume: Math.round(stats.one_day_volume * 10000) / 10000,
        todayAveragePrice: Math.round(stats.one_day_average_price * 10000) / 10000,
        floorSearchUrl: `https://opensea.io/collection/${slug}?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW`,
        currency: 'ETH',
      },
    ]
  },
  {
    maxBatchSize: 1,
  },
)

export type CollectionPrices = {
  floorPrice: number
  todayVolume: number
  todayAveragePrice: number
  floorSearchUrl: string
  currency: string
}

export const fetchFloorPrice = (collectionSlug: string) => {
  return collectionPricesLoader.load(collectionSlug) as Promise<CollectionPrices>
}


export const fetchAsset = async (address: string, tokenId: string) => {
  return fetch(
    `https://api.opensea.io/api/v1/asset/${address}/${tokenId}`,
  ).then((res) => res.json())
}

export const fetchAssetOrders = async (address: string, tokenId: string) => {
  return cheeseApiRequest({
    method: 'GET',
    url: `${SERVER_DOMAIN}/api/orders?collection_address=${address}&token_id=${tokenId}`
  })
}

export const assetPriceLoader = new DataLoader(
  async (keys: readonly string[]) => {
    const [slug] = keys
    await openSeaPublicRateLimit()
    const [address, tokenId] = slug.split('/');
    const data = cheeseApiRequest<{ price: number | null}>({
      method: 'GET',
      url: `${SERVER_DOMAIN}/api/price?collection_address=${address}&token_id=${tokenId}`
    })
    return [data];
  },
  {
    maxBatchSize: 1,
  },
)
export const fetchAssetPrice = async (address: string, tokenId: string): Promise<{ price: number | null}> => {
  // return cheeseApiRequest({
  //   method: 'GET',
  //   url: `${SERVER_DOMAIN}/api/price?collection_address=${address}&token_id=${tokenId}`
  // })
  return assetPriceLoader.load(`${address}/${tokenId}`);
}

export const fetchOptimalGasPreset = async () => {
  return fetch('https://nonfungible.tools/api/gas').then((res) => res.json())
}

type AssetListing = {
  listings: {
    base_price: number
    current_price: number
  }[]
}

const OPENSEA_SHARED_CONTRACT_ADDRESSES = [
  '0x495f947276749ce646f68ac8c248420045cb7b5e',
  '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
]
// Not exactly right but good enough to split tokenIds into their unique collections
const OPENSEA_SHARED_CONTRACT_COLLECTION_ID_LENGTH = 60;
const nftAssetListingsLoader = new DataLoader(
  async (
    keys: readonly {
      address: string
      tokenId: string
    }[],
  ) => {
    const { address, tokenId } = keys[0]
    await openSeaPublicRateLimit()
    const asset = await fetch(
      `https://api.opensea.io/api/v1/asset/${address}/${tokenId}/listings`,
    ).then((res: any) => res.json() as AssetListing)
    return [asset]
  },
  {
    maxBatchSize: 1,
    cacheKeyFn: ({ address, tokenId }) => {
      if (OPENSEA_SHARED_CONTRACT_ADDRESSES.includes(address))
        return `${address}/${tokenId.slice(
          0,
          OPENSEA_SHARED_CONTRACT_COLLECTION_ID_LENGTH,
        )}`
      return `${address}/${tokenId}`
    },
  },
);

export const fetchNFTAssetListings = async (address: string, tokenId: string) => {
  return nftAssetListingsLoader.load({ address, tokenId }) as Promise<AssetListing>
}

/* ------- GET collection -------   */
/* GET /api/collections?slug=xxx */
export const fetchCollectionStatus = async (collectionSlug: string): Promise<{
  _collection_slug: string
  c_total_supply: number | null
  c_last_updated: string | null
  c_price_updated: string | null
  c_sales_updated: string | null
  c_pulled_count: number | null
  c_is_revealed: boolean
  is_ranked: boolean
}> => {
  return cheeseApiRequest({
    method: 'GET',
    url: `${SERVER_DOMAIN}/api/collections?slug=${collectionSlug}`
  })
}

/* POST /api/collections {slug: "xxx"}  */
export const addCollectionToDB = async (collectionSlug: string) => {
  return cheeseApiRequest({
    method: 'POST',
    url: `${SERVER_DOMAIN}/api/collections`,
    data: {
      slug: collectionSlug
    }
  })
}

export const useRequest = <T>(promiseCall: () => Promise<T>, props: any[] = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const abordController = new AbortController();
    promiseCall().then((data) => {
      if (abordController.signal.aborted) return;
      setData(data)
      setLoading(false)
    }).catch(error => {
      if (abordController.signal.aborted) return;
      setLoading(false);
      setError(error)
    });

    return () => {
      abordController.abort();
    }
  }, props)

  return {
    loading,
    data,
    error
  }
}


const collectionAddressLoader = new DataLoader(
  async (slugs: readonly string[]) => {
    // Max batch size is 1, we only use this for client side caching
    const slug = slugs[0]
    try {
      const data = await fetch(
        `https://api.opensea.io/api/v1/assets?limit=1&collection=${slug}`,
      ).then((res) => res.json())
      return [data.assets[0].asset_contract.address]
    } catch (e) {
      return [null]
    }
  },
  {
    batchScheduleFn: (callback) => setTimeout(callback, 250),
    maxBatchSize: 1,
  },
)
export const fetchCollectionAddress = async (slug: string) => {
  return collectionAddressLoader.load(slug) as Promise<string>
}

// export const fetchRaritiesWithTraits = async (collectionSlug: string, traits: { name: string, value: string }[]) => {
//   const assets = await fetchAssetsCollection(collectionSlug, traits)
// }

export type RaritiesWithTraits = Rarities & {
  rankingOptions: {
    excludeTraits: string[]
  }
  traits: Trait[]
}

export const fetchMetadata = async (
  contractAddress: string,
  tokenId: number,
) => {
  return fetch(
    `https://nonfungible.tools/api/metadata-proxy?address=${contractAddress}&tokenId=${tokenId}`,
  ).then((res) => res.json())
}

const collectionIsRevealedLoader = new DataLoader(
  async (slugs: readonly string[]) => {
    // Max batch size is 1, we only use this for client side caching
    const slug = slugs[0]
    try {
      const data: {
        id: string
        type: string
        isRevealed: string
      } = await cheeseApiRequest({
        method: 'POST',
        url: `${SERVER_DOMAIN}/api/v2/graphql`,
        data: {
          "operationName": "Query",
          "variables": {
            "slug": slug
          },
          query: `
            query Query($slug: String!) {
              collections(where: {
                slug: {
                  equals: $slug,
                },
              }, take: 1) {
                id
                type
                isRevealed
              }
            }
          `
        }
      })
      .then((response) => {
        return response.data.collections[0];
      });

      return [data];
    } catch (e) {
      return [null]
    }
  },
  {
    batchScheduleFn: (callback) => setTimeout(callback, 250),
    maxBatchSize: 1,
  },
);

export const fetchCollectionIsRevealed = async (slug: string) => {
  return collectionIsRevealedLoader.load(slug)
}

export type OpenseaAsset = {
  image_url: string
  image_preview_url: string
  image_thumbnail_url: string
  image_original_url: string
  name: string
  description: string
  permalink: string
  token_metadata: string
  token_id: string
}

export const assetsFromOpenseaLoaderGenerator = (slug: string) =>  new DataLoader(
  async (tokenIDs: readonly string[]) => {
    const { data: assets } = await axios.get<OpenseaAsset[]>(`${SERVER_DOMAIN}/api/collections/${slug}/assets?force=true&token_ids=${tokenIDs.join(',')}`)
    return tokenIDs.map((tokenID) => assets.find(({ token_id }) => token_id === tokenID));
  },
  {
    batchScheduleFn: (callback) => setTimeout(callback, 250),
    maxBatchSize: 12,
  }
)
