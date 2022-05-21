import { get } from "lodash";
import { NFT } from "../component/NFTBox";
import { TraitWithUniqueScore } from "../types";
import { cheeseApiRequest, SERVER_DOMAIN } from "./api";
import { GetCollectionItemsQuery } from "./queries";

type TraitResponseV2 = {
  data: {
    collection: {
      id: string
      attributes: {
        id: string
        name: string
        values: {
          id: string
          value: string
          tokenCount: number
        }[]
      }[]
    }
  }
}


export const fetchCollectionTotalSupply = async (collectionAddress: string): Promise<number> => {
  const data: {
    data: {
      collection: {
        id: string
        totalSupply: number
      }
    }
  } = await cheeseApiRequest({
    method: `POST`,
    url: `${SERVER_DOMAIN}/api/v2/graphql`,
    data: {
      "operationName": "GetCollectionItems",
      "variables": {
        "address": collectionAddress,
      },
      "query": `query GetCollectionItems($address: String!) {
        collection(where: {id: $address}) {
          id
          totalSupply
          __typename
        }
      }`
    }
  });
  return data.data.collection.totalSupply;
}

export const fetchTraitsCollectionV2 = async (collectionAddress: string): Promise<(TraitWithUniqueScore)[]> => {
  const response: TraitResponseV2 = await cheeseApiRequest({
    method: 'POST',
    url: `${SERVER_DOMAIN}/api/v2/graphql`,
    data: {
      "operationName": "CollectionAttributes",
      "variables": {
        "collectionAddress": collectionAddress
      },
      "query": `
        query CollectionAttributes($collectionAddress: String!) {
          collection(where: {id: $collectionAddress}) {
            id
            attributes {
              id
              name
              values(take: 1000) {
                id
                value
                tokenCount
              }
            }
          }
        }
      `
    }
  });

  const totalSupply = await fetchCollectionTotalSupply(collectionAddress)

  const traits = response.data.collection.attributes.map((attribute) => attribute.values.map(({ value, tokenCount, id }) => ({
    property: attribute.name,
    value,
    id,
    uniqueScore: tokenCount / totalSupply * 100
  }))).flat();

  return traits;
}

export async function fetchAssetWithRankingV2(collectionAddress: string, tokenID: string) {
  /* {
        iteratorID: asset.a_token_id,
        rank: asset.a_rarity_rank,
        tokenCount: total_supply,
      } */
  const data: {
    data: {
      collection: {
        id: string
        totalSupply: number
        tokens: {
          id: string
          tokenId: string
          tokenUri: string
          image: string
          name: string
          rarityScore: string
          rarityRank: number
          price: number
          attributes: {
            attribute: { name: string }
            attributeValue: {value: string, tokenCount: number}
          }[]
        }[]
      }
    }
  } = await cheeseApiRequest({
    method: 'POST',
    url: `${SERVER_DOMAIN}/api/v2/graphql`,
    data: {
      "operationName": "GetCollectionItems",
      "variables": {
        "address": collectionAddress,
        "first": 24,
        "orderBy": "rarityRank",
        "owner": null,
        "priceFrom": null,
        "priceTo": null,
        "attributeValueIds": [],
        tokenId: tokenID
        // listingStatus: 'listed'
      },
      "query": GetCollectionItemsQuery
    }
  });
  const rank: number | null = get(data, 'data.collection.tokens[0].rarityRank', null);
  const tokenCount: number | null = get(data, 'data.collection.totalSupply', null);

  return {
    iteratorID: tokenID,
    rank,
    tokenCount
  }
}

export async function fetchAssetsCollectionV2(
  collectionAddress: string,
  traitIDs: string[],
  rankingRange: {
    minRank: number
    maxRank: number
  } | null,
): Promise<{
  totalSupply: number,
  NFTs: NFT[]
}> {
  const data: {
    data: {
      collection: {
        id: string
        totalSupply: number
        tokens: {
          id: string
          tokenId: string
          tokenUri: string
          image: string
          name: string
          rarityScore: string
          rarityRank: number
          price: number
          attributes: {
            attribute: { name: string }
            attributeValue: {value: string, tokenCount: number}
          }[]
        }[]
      }
    }
  } = await cheeseApiRequest({
    method: 'POST',
    url: `${SERVER_DOMAIN}/api/v2/graphql`,
    data: {
      "operationName": "GetCollectionItems",
      "variables": {
        "address": collectionAddress,
        "first": rankingRange ? rankingRange.maxRank - rankingRange.minRank : 1000,
        "orderBy": "rarityRank",
        "owner": null,
        "tokenId": null,
        "priceFrom": null,
        "priceTo": null,
        skip: rankingRange ? (rankingRange.minRank - 1) : null,
        "attributeValueIds": traitIDs,
        // listingStatus: 'listed'
      },
      "query": GetCollectionItemsQuery
    }
  });

  const totalSupply = data.data.collection.totalSupply;

  return {
    totalSupply: data.data.collection.totalSupply,
    NFTs: data.data.collection.tokens.map((token) => {
      return {
        contractAddress: collectionAddress,
        image: token.image,
        video: undefined,
        tokenID: token.tokenId,
        openseaURL: `https://opensea.io/assets/${collectionAddress}/${token.tokenId}`,
        traits: token.attributes.map((attribute) => ({
          property: attribute.attribute.name,
          value: attribute.attributeValue.value,
          uniqueScore: attribute.attributeValue.tokenCount / totalSupply * 100
        })),
        price: token.price,
        priceUnit: 'eth',
        listed: !!token.price,
        rarityScore: parseFloat(token.rarityScore),
        rarityRank: token.rarityRank,
        name: token.name,
        isAvailable: !!token.price,
        totalSupply,
      }
    })
  }
}

const blackListFetchAssetsCollectionV2ByChunkTokens: { [key: number]: boolean } = {}

/* E.g:
min = 2; max = 10; increment = 2;
-->
[2, 4], [4, 6], [6, 8], [8, 10]

*/
// function splitChunks(min: number, max: number, increment: number): (number[])[] {
//   const chunkSize = Math.ceil((max-min) / increment);
//   return Array(chunkSize).fill(null)
//     .map((_, index) => {
//       const start = min + index * increment
//       return [start, Math.min(start + increment, max)]
//     })
// }

export function fetchAssetsCollectionV2ByChunk(
  collectionAddress: string,
  traitIDs: string[],
  rankingRange: {
    minRank: number
    maxRank: number
  } | null,
  onGetResult: (result: {NFTs: NFT[], totalSupply: number}) => void,
  onComplete: (result: {NFTs: NFT[], totalSupply: number}) => void
) {
  let i = rankingRange ? rankingRange.minRank : 1;
  let maxRank = rankingRange ? rankingRange.maxRank : 1000;
  let assets: NFT[] = [];
  let _totalSupply = 0;
  const INCREMENT = 20;

  let random = Math.round(Math.random() * 10000);

  (async () => {

    while (i < maxRank && !blackListFetchAssetsCollectionV2ByChunkTokens[random]) {
      // console.log({blackListFetchAssetsCollectionV2ByChunkTokens})
      console.log(`Fetching with token ${random}`);
      const { NFTs: newAssets, totalSupply } = await fetchAssetsCollectionV2(
        collectionAddress,
        traitIDs,
        {
          minRank: i,
          maxRank: i + INCREMENT
        }
      );
      i += INCREMENT;
      if (newAssets.length === 0) {
        break
      }
      assets = [...assets, ...newAssets];
      _totalSupply = totalSupply;
      onGetResult({
        NFTs: assets,
        totalSupply
      });
    }

    onComplete({
      NFTs: assets,
      totalSupply: _totalSupply
    });
  })()

  return random;
}

export function clearFetchAssetsCollectionV2ByChunk(token: number) {
  // console.log(`Clearing ${token}`);
  blackListFetchAssetsCollectionV2ByChunkTokens[token] = true;
  // console.log(`After clear`, { blackListFetchAssetsCollectionV2ByChunkTokens });
}