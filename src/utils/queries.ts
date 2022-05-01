export const GetCollectionItemsQuery = `query GetCollectionItems($address: String!, $first: Int, $skip: Int, $orderBy: String, $owner: String, $tokenId: String, $listingStatus: String, $attributeValueIds: [String!], $priceFrom: Float, $priceTo: Float) {
  collection(where: {id: $address}) {
    id
    totalSupply
    tokens(
      take: $first
      skip: $skip
      orderBy: $orderBy
      owner: $owner
      tokenId: $tokenId
      listingStatus: $listingStatus
      attributeValueIds: $attributeValueIds
      priceFrom: $priceFrom
      priceTo: $priceTo
    ) {
      ...Token_Fields
      price
      __typename
    }
    __typename
  }
}

fragment Token_Fields on Token {
  id
  tokenId
  tokenUri
  image
  name
  rarityScore
  rarityRank
  metadata
  attributes {
    attribute {
      name
      __typename
    }
    attributeValue {
      value
      tokenCount
      __typename
    }
    __typename
  }
  __typename
}
`