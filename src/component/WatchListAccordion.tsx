import { Box, Button, Flex, Grid, GridItem, HStack, Link, Skeleton, Spacer, Text, useToast } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
// import { uniqBy } from 'lodash';
import { useState } from 'react';
import { Filter } from '../container/WatchListContainer';
import { deleteWatchList } from '../utils/api';
import EthIcon from './icons/EthIcon';
import { NFTBox } from './NFTBox';
import { TraitBox } from "./TraitBox";
import { DeleteIcon } from '@chakra-ui/icons'

type WatchListAccordionProps = {
  member_address: string
  nftFilter: Filter
  id: string
  onRemove: (id: number) => void
}

const variant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const WatchListAccordion = (props: WatchListAccordionProps) => {
  const nftFilter = props.nftFilter
  const nftList = props.nftFilter.NFTs;
  const member_address = props.member_address
  const [page, setPage] = useState(0);
  const itemsPerPage = 18;
  const reachedEnd = itemsPerPage * (page + 1) >= props.nftFilter.NFTs.length;
  const toast = useToast();

  const onDelete = async (member_address: string, id: number, toast: ReturnType<typeof useToast>) => {
    await deleteWatchList(member_address, id).then(() => {
      props.onRemove(id)
      toast({
        title: `Deleted`,
        status: 'success',
        isClosable: true,
      })
    })

  }

  return (
    <Box
      borderRadius={'10px'}
      bg={'card-bg'}
      marginBottom={5}
      p={6}
    >
      <Flex
        paddingTop={3}
      >
        <Text>Collection:</Text> &nbsp;
        <Link color="blue.500" href={`https://opensea.io/collection/${nftFilter.collection}`}>{nftFilter.collection}</Link> &nbsp;
        <Spacer />
        <Button
          leftIcon={<DeleteIcon />}
          colorScheme="gray"
          marginLeft={'5px'}
          onClick={() => onDelete(member_address, nftFilter.id, toast)}
        >
          Delete
        </Button>
      </Flex>

      {/* Showing filter traits */}
      <HStack
        gap=".5rem"
        wrap="wrap"
        maxH='7rem'
        overflowY={'auto'}
        py={3}
      >
        {nftFilter.payload.traits?.map((trait) => {
          return (
            <TraitBox
              property={trait.property}
              value={trait.value}
              uniqueScore={trait.uniqueScore}
            />
          )
        })}
      </HStack>
      <Flex
        marginTop={3}
      >
        <Text>Max price: </Text>&nbsp;
        <Text>{nftFilter.payload.max_price} </Text>&nbsp;<EthIcon width={'10px'} />
      </Flex>
      <Flex
        marginTop={3}
      >
        <Text>Ranking: </Text>&nbsp;
        <Text>#{nftFilter.payload.rarity_range[0]} {'-->'} #{nftFilter.payload.rarity_range[1]}</Text>&nbsp;
      </Flex>

      {/* Show Available NFT */}
      <Box
        marginRight={3}
        marginTop={3}
        paddingTop={3}
        borderTopWidth={1}
        borderTopColor={'border-color'}
      >
        <Text>Available NFTs</Text>
        <AnimatePresence>
          <Grid
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(6, 1fr)'
            gap=".5rem"
            marginBottom={'1rem'}
            maxH='36rem'
            overflowY={'auto'}
            py={3}
            id="scrollableDiv"
          >
            {nftFilter.loading &&
              Array(3).fill(<Skeleton height="227px" width="160px"></Skeleton>)
            }
            {/* {uniqBy(nftList, 'tokenID')
              .map((NFT) => (
                <motion.div {...variant} key={NFT.tokenID}>
                  <NFTBox
                    tokenID={NFT.tokenID}
                    openseaURL={NFT.openseaURL}
                    image={NFT.image}
                    price={NFT.price}
                    totalSupply={NFT.totalSupply}
                    name={NFT.name}
                    rarityScore={NFT.rarityScore}
                    rarityRank={NFT.rarityRank}
                    traits={NFT.traits}
                    isAvailable={true}
                    contractAddress={NFT.contractAddress}
                  />
                </motion.div>
              ))
            } */}
            {nftList
              .filter((NFT) => { return !!NFT.price })
              .slice(page, itemsPerPage * (page + 1))
              .map((NFT) => {
                return (


                  <motion.div {...variant} key={NFT.tokenID}>
                    <GridItem>
                      <NFTBox
                        tokenID={NFT.tokenID}
                        openseaURL={NFT.openseaURL}
                        image={NFT.image}
                        price={NFT.price}
                        totalSupply={NFT.totalSupply}
                        name={NFT.name}
                        rarityScore={NFT.rarityScore}
                        rarityRank={NFT.rarityRank}
                        traits={NFT.traits}
                        isAvailable={true}
                        contractAddress={NFT.contractAddress}
                      />
                    </GridItem>
                  </motion.div>



                )
              })}
            {!reachedEnd &&
              <Button gridColumnStart={1} gridColumnEnd={7} variant="primary" onClick={() => setPage(page + 1)}>Load more</Button>
            }
          </Grid>
        </AnimatePresence>
      </Box>
    </Box>
  );
};
