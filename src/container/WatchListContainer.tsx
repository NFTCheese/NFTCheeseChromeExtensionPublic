import { Box, Container, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { fetchAssetsCollection, fetchTraitsCollection, fetchWatchList } from '../utils/api'
import { NFT } from '../component/NFTBox';
import { useUser } from '../utils/user';
import { WatchListAccordion } from '../component/WatchListAccordion';
import ListingNotifier from '../component/ListingNotifier';
import { sortBy } from 'lodash';
import { TraitWithUniqueScore } from '../types';

export type Payload = {
  traits: TraitWithUniqueScore[]
  max_price: number
  rarity_range: number[]
}

export type Filter = {
  id: number
  member_address: string
  collection: string
  payload: Payload
  NFTs: NFT[]
  loading?: boolean
}

export type NFTList = {
  id: number,
  NFTs: NFT[]
}

function upsert(array: NFT[], element: NFT) {
  const i = array.findIndex(_element => _element.tokenID === element.tokenID);
  if (i > -1) array[i] = element;
  else {
    array.unshift(element)
  }
}


// Merging the filter list with unique score percentatges
function isMatch(watchListTrait: TraitWithUniqueScore, traitColecction: TraitWithUniqueScore) {
  return (watchListTrait.property === traitColecction.property && watchListTrait.value === traitColecction.value)
}


export default function WatchListContainer() {
  const [filters, setFilters] = useState<Filter[]>([])
  const [initLoad, setInitLoad] = useState(true)
  const sinceTsRef = useRef('')
  let notifyingFilters = filters
  const user = useUser();


  useEffect(() => {
    const abortController = new AbortController();
    let now = new Date().toISOString();
    (async () => {
      if (!user) {
        console.log(`User is undefined (WatchListNotification)`);
        return;
      }

      let fetchedWatchList = await fetchWatchList(user.publicAddress, {
        signal: abortController.signal
      })

      setFilters(fetchedWatchList.map((watchlist) => ({
        loading: true,
        id: watchlist.id,
        NFTs: [],
        collection: watchlist.collection,
        member_address: watchlist.member_address,
        payload: watchlist.payload,
      })))


      // Fetiching NFT
      await Promise.all(fetchedWatchList.map(async (filter) => {
        const slug = filter.collection
        let fetchedTraitsCollection = await fetchTraitsCollection(slug);

        const traits = filter.payload.traits.map((trait) => {
          const foundCollectionTrait = fetchedTraitsCollection
            .find((collectionTrait) => isMatch(trait, collectionTrait));

          return {
            ...trait,
            uniqueScore: foundCollectionTrait?.uniqueScore || NaN
          }
        })

        let { NFTs } = await fetchAssetsCollection(
          slug,
          filter.payload.traits,
          "",
          filter.payload.rarity_range,
          filter.payload.max_price
        );

        NFTs.filter((NFT) => {
          return !!NFT.price;
        })

        setFilters((nftFilters) => nftFilters.map((nftFilter) => {
          if (nftFilter.id == filter.id) {

            return {
              ...nftFilter,
              loading: false,
              payload: {
                ...filter.payload,
                traits
              },
              NFTs
            }
          }
          return nftFilter;
        }))


      }));
      sinceTsRef.current = now;
      setInitLoad(false)
    })();

    return () => {
      setFilters([])
      abortController.abort();
    }
  }, [user])


  const updateNftFunc = (updatedFilter: Filter) => {
    let now = new Date().toISOString();
    setFilters((nftFilters) => nftFilters.map((nftFilter) => {
      if (updatedFilter && nftFilter.id === updatedFilter.id) {
        updatedFilter.NFTs && updatedFilter.NFTs
          .filter((NFT) => {
            return NFT.isAvailable;
          })
          .forEach((updatedNFT) => upsert(nftFilter.NFTs, updatedNFT))
        return {
          ...nftFilter,
          loading: false,
        }
      }
      return nftFilter;
    }))
    sinceTsRef.current = now;
  }

  const removeList = (listId: number) => {
    setFilters((filters) => {
      return (filters.filter(
        filterList => !(filterList.id === listId)
      )
      )
    })
  }

  if (!user) {
    return null;
  }

  return (
    <Box w={'full'} bg="nftcheese-bg">
      <Container
        maxW='max'
        borderRadius="md"
        padding={5}
      >
        <Text
          fontSize={25}
          marginTop={3}
          fontWeight={"bold"}
        >Notifications:</Text>
        {sortBy(filters, 'id').reverse().map((filter, i) => {
          return (
            <div key={i}
            >
              <Text
                marginTop={7}
                marginBottom={2}
              ># {filter.id}</Text>
              <WatchListAccordion
                id={filter.id.toString()}
                nftFilter={filter}
                member_address={user.publicAddress}
                onRemove={(id) => removeList(id)}
              />
            </div>
          )
        }
        )}
        {!initLoad && notifyingFilters.map((notifyingFilter, i) => {
          return (
            <div key={i}>
              <ListingNotifier
                NFTNotifyFilter={notifyingFilter}
                // updatedNftFilter={updatedFilter}
                lastUpdatedTs={sinceTsRef.current}
                onUpdatedNftFilterChange={(updatedFilter) => updateNftFunc(updatedFilter)}

              />
            </div>
          )
        })}
      </Container>
    </Box>
  )
}