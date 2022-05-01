import { Button, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Grid, GridItem, Center, useToken } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { assetsFromOpenseaLoaderGenerator } from '../utils/api';
import { NFT, NFTBox } from './NFTBox';
import { SCOPED_CLASS_NAME } from './ScopedCSSReset';
import { JellyTriangle } from '@uiball/loaders'
import {getOrCreatePortal} from './ScopedCSSPortal';

export type NFTsListProps = {
  listName: string
  NFTs: NFT[]
  isOpen: boolean
  onClose: () => void
  collectionSlug: string
}

export default function NFTsListExpandPopup(props: NFTsListProps) {
  const NFTs = props.NFTs;
  const [page, setPage] = useState(0);

  const assetLoader = useMemo(() => {
    return props.collectionSlug ? assetsFromOpenseaLoaderGenerator(props.collectionSlug) : undefined;
  }, [props.collectionSlug])

  const itemsPerPage = 25;

  const reachedEnd = itemsPerPage * (page + 1) >= props.NFTs.length;

  useEffect(() => {

  }, [props.NFTs])

  useEffect(() => {
    if (!props.isOpen) {
      setPage(0);
    } else {
      setTimeout(() => {forceCheck()}, 500)
    }
  }, [props.isOpen])

  const [gray500] = useToken(
    'colors',
    ['gray.500']
  );
  const loadingColor = gray500;

  return (
    <>
      <Modal
        portalProps={{
          containerRef: getOrCreatePortal()
        }}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent
          className={SCOPED_CLASS_NAME}
          bg='card-bg'
          color='text'
          maxW='80rem'
          maxH='60rem'
          borderRadius={10}
        >
          <ModalHeader>{props.listName}</ModalHeader>
          <ModalCloseButton
            _focus={{ backgroundColor: 'none' }}
          />
          <ModalBody>
            {NFTs.length === 0 &&
              <Text>No info</Text>
            }
            <Grid
              templateRows='repeat(3, 1fr)'
              templateColumns='repeat(5, 1fr)'
              gap=".5rem"
              marginBottom={'1rem'}
              minH='5rem'
              maxH='38rem'
              overflowY={'auto'}
              position="relative"
              py={3}
              id="scrollableDiv"
            >
              {props.NFTs.slice(page, itemsPerPage * (page + 1)).map((NFT, i) => {
                return (
                  <GridItem key={i}>
                    <LazyLoad
                      overflow
                      placeholder={
                        <Center height={184}>
                          <JellyTriangle
                            size={60}
                            speed={1.75}
                            color={loadingColor}
                          />
                        </Center>
                      }
                      debounce={500}
                      offset={100}
                      unmountIfInvisible
                      height={184}
                      scrollContainer={'#scrollableDiv'}
                    >
                      <Center>
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
                          isAvailable={NFT.isAvailable}
                        />
                      </Center>
                    </LazyLoad>
                  </GridItem>
                )
              })}
              {!reachedEnd &&
                <Button gridColumnStart={1} gridColumnEnd={6} variant="primary" onClick={() => setPage(page + 1)}>Load more</Button>
              }
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )

}
