import { ViewIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, HStack, Spacer, Button, useDisclosure, Spinner } from '@chakra-ui/react'
import { useMemo } from 'react';
import { assetsFromOpenseaLoaderGenerator } from '../utils/api';
import { NFT, NFTBox } from './NFTBox';
import TraitsListExpandPopup from './TraitsListExpandPopup';

export type ITraitsInWatchListProps = {
  NFTs: NFT[]
  loading?: boolean
  collectionSlug: string
}

export default function TraitsInWatchList(props: ITraitsInWatchListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const assetLoader = useMemo(() => {
    return props.collectionSlug ? assetsFromOpenseaLoaderGenerator(props.collectionSlug) : undefined;
  }, [props.collectionSlug])

  const NFTs = props.NFTs;
  return (
    <Box
      maxW="100%"
      overflow="auto"
      color="white"
    >
      <Flex align="center">
        {props.loading ?
          <Text>
            Loading unlisted NFTs ({NFTs.length})
          </Text>
          : <Text>
            There're {NFTs.length} NFTs available in your watch list
          </Text>
        }
        <Spacer />
        <Button
          onClick={onOpen}
          bg={'none'}
          color={'white'}
          _hover={{ backgroundColor: 'none' }}
          _active={{ backgroundColor: 'none' }}
          _focus={{ backgroundColor: 'none' }}
        >
          <ViewIcon />
        </Button>
        <TraitsListExpandPopup
          collectionSlug={props.collectionSlug}
          isOpen={isOpen}
          onClose={onClose}
          listName={'Watch list'}
          NFTs={NFTs} />
      </Flex>
      <HStack
        gap=".5rem"
        marginBottom={'1rem'}
        maxHeight={330}
        overflow={'auto'}
        py={3}
      >
        {NFTs.slice(0, 3).map((NFT, i) => {
          return (
            <Box key={i}>
              <NFTBox
                assetLoader={assetLoader}
                contractAddress={NFT.contractAddress}
                tokenID={NFT.tokenID}
                openseaURL={NFT.openseaURL}
                image={NFT.image}
                price={NFT.price}
                totalSupply={NFT.totalSupply}
                name={NFT.name}
                rarityScore={NFT.rarityScore}
                rarityRank={NFT.rarityRank}
                traits={NFT.traits}
                isAvailable={false}
              />
            </Box>
          )
        })}
        {props.loading &&
          Array(1).fill(<Box
            bg={'#212121'}
            height="227px"
            width="160px"
            borderRadius={5}
          >
            <Spinner
              margin={55}
              marginTop={75}
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.400'
              color='gray.900'
              size='xl'
            />
          </Box>)
        }
      </HStack>
    </Box>
  )
}
