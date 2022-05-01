import { ViewIcon } from '@chakra-ui/icons';
import { LineWobble } from '@uiball/loaders'
import { Box, Text, Flex, HStack, Spacer, Button, useDisclosure, Center, useColorModeValue } from '@chakra-ui/react'
import { useMemo } from 'react';
import { assetsFromOpenseaLoaderGenerator } from '../utils/api';
import { NFT, NFTBox } from './NFTBox';
import TraitsListExpandPopup from './TraitsListExpandPopup';

export type TraitsAvailableListProps = {
  NFTs: NFT[]
  loading?: boolean,
  collectionSlug: string
}

export default function TraitsAvailableList(props: TraitsAvailableListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const assetLoader = useMemo(() => {
    return props.collectionSlug ? assetsFromOpenseaLoaderGenerator(props.collectionSlug) : undefined;
  }, [props.collectionSlug])

  const loadingLayoverBg = useColorModeValue('black', 'white');

  const NFTs = props.NFTs;
  return (
    <Box
      maxW="100%"
      overflow="auto"
      color="white"
      position="relative"
    >
      {props.loading &&
        <Center top={0} left={0} position={'absolute'} w='full' h='full' zIndex={2} bg='card-bg' opacity={0.9}>
          <LineWobble
            size={80}
            lineWeight={5}
            speed={1.75}
            color={loadingLayoverBg}
          />
        </Center>
      }
      <Flex align="center">
        <Text fontWeight={'bold'}>
          Available NFTs ({NFTs.length})
        </Text>
        <Spacer />
        <Button
          onClick={onOpen}
          bg={'none'}
          color={'text'}
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
          listName={'Available NFTs:'}
          NFTs={NFTs}
        />
      </Flex>
      <HStack
        gap=".5rem"
        marginBottom={'1rem'}
        maxHeight={330}
        overflow={'auto'}
        py={3}
      >
        {NFTs.slice(0, 3).map((NFT) => {
          return (
            <Box key={NFT.tokenID}>
              <NFTBox
                assetLoader={assetLoader}
                contractAddress={NFT.contractAddress}
                image={NFT.image}
                price={NFT.price}
                totalSupply={NFT.totalSupply}
                name={NFT.name}
                rarityScore={NFT.rarityScore}
                rarityRank={NFT.rarityRank}
                traits={NFT.traits}
                isAvailable={NFT.isAvailable}
                openseaURL={NFT.openseaURL}
                tokenID={NFT.tokenID}
              />
            </Box>
          )
        })}
      </HStack>
    </Box>
  )
}
