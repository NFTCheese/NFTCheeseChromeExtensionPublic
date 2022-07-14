import {
  Box,
  Text,
  Flex,
  Grid,
  /*   Popover,
  PopoverTrigger,
  PopoverContent,
  Spacer,*/
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { Center, HStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';

import { TraitWithUniqueScore } from './TraitSelection';
import { /* btnClassPicker,  */ classNamePicker } from './assets/colorPicker';
/* import { TraitRarityTag } from './TraitRarityTag';
import EthDarkIcon from './icons/EthDarkIcon'; */

import { rarityToTag } from '../common/rarityToTag';
import NFTImage from './NFTImage';
import BuyNowButton from './BuyNowButton';
import { assetsFromOpenseaLoaderGenerator, OpenseaAsset } from '../utils/api';
import { useState } from 'react';
// import ScopedCSSPortal from './ScopedCSSPortal';
import { getTraitColors } from '../utils/rarityUtils';
import { NFTModal } from './NFTModal';
// import { fetchAssetPrice, useRequest } from '../utils/api';
// import { weiToEth } from '../utils/ethereum';

function transformImageUrl(url: string) {
  if (/^http(s)/.test(url)) {
    return url;
  }
  if (/^ipfs:\/\//.test(url)) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
}

export type NFT = {
  contractAddress: string;
  image?: string;
  video?: string;
  tokenID: string;
  openseaURL: string;
  traits?: TraitWithUniqueScore[];
  price: number | null;
  priceUnit?: string;
  listed?: boolean;
  rarityScore?: number;
  rarityRank: number;
  name: string; //rare trais of azuki
  isAvailable?: boolean;
  totalSupply: number;
  assetLoader?: ReturnType<typeof assetsFromOpenseaLoaderGenerator>;
};

const textLimit = (text: string, limit: number): string => {
  if (text.length >= limit) {
    return text.substring(0, limit - 2) + '...';
  } else return text;
};

export const NFTBox = (props: NFT) => {
  const variant = rarityToTag((props.rarityRank / props.totalSupply) * 100);
  const [openseaAsset, setOpenseaAsset] = useState<OpenseaAsset | undefined>(undefined);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (props.assetLoader) {
    props.assetLoader.load(props.tokenID).then(setOpenseaAsset);
  }

  const finalPrice = props.price;

  return (
    <>
      <Box className={classNamePicker(variant)} p={'1px'} borderRadius="lg" display="inline-block">
        <Grid
          w={160}
          bg={'nft-bg'}
          borderRadius="lg"
          overflow="hidden"
          color="text"
          templateRows={'3fr'}
          p={3}
        >
          <Center>
            <NFTImage
              width={128}
              src={
                openseaAsset && openseaAsset.image_thumbnail_url
                  ? openseaAsset.image_thumbnail_url
                  : transformImageUrl(props.image || '')
              }
              alt=""
              marginBottom={2}
            />
          </Center>

          <Flex justifyContent="space-between">
            <HStack>
              <Text>Rank:&nbsp;</Text>
              <Text fontWeight={'bold'}>{props.rarityRank}</Text>
            </HStack>
            <Box
              backgroundColor="gray.100"
              borderRadius="50%"
              color="black"
              w={'24px'}
              h={'24px'}
              textAlign="center"
              fontWeight={'bold'}
              onClick={onOpen}
              cursor="pointer"
            >
              !
            </Box>
            {/*  <Popover
            trigger='hover'
            placement='auto-start'
            styleConfig={{
              zIndex: 1700
            }}
          >
            <PopoverTrigger>
              <Box
                backgroundColor="gray.100"
                borderRadius="50%"
                color="black"
                w={'24px'}
                h={'24px'}
                textAlign="center"
                fontWeight={'bold'}
              >
                !
              </Box>
            </PopoverTrigger>
            <ScopedCSSPortal>
              <PopoverContent
                boxShadow={'md'}
                bg='layover-bg'
                borderRadius='md'
                w={270}
                border="none"
                rootProps={{
                  style: {
                    zIndex: 1600
                  }
                }}
              >
                <HStack
                  p={2}
                >
                  <Text fontWeight={'bold'} fontSize={25}>{props.name}</Text>
                  <a href={props.openseaURL} target="_blank" rel="noreferrer" >
                    <img width="19" alt="opensea" src="https://opensea.io/static/images/logos/opensea.svg" style={{ marginLeft: '1rem' }} />
                  </a>
                </HStack>
                <Box
                  paddingLeft={3}
                  paddingRight={3}
                  paddingBottom={5}
                  fontSize={15}
                >
                  {
                    props.traits?.map((trait: TraitWithUniqueScore, index: number) => {
                      if (rarityToTag(trait.uniqueScore) !== 'common') {
                        return (
                          <Flex
                            paddingTop={1}
                            key={index}
                          >
                            <Text>{trait.property}:&nbsp;</Text><Text>{textLimit(trait.value, 15 - trait.property.length)}</Text>
                            <Spacer />

                            <TraitRarityTag
                              variant={rarityToTag(trait.uniqueScore)}
                            />

                          </Flex>
                        )
                      }
                      return null;
                    })
                  }
                </Box>
              </PopoverContent>
            </ScopedCSSPortal>
          </Popover> */}
          </Flex>

          {props.isAvailable ? (
            <BuyNowButton address={props.contractAddress} tokenId={props.tokenID}>
              {({ onClick, isLoading }) => (
                <Box
                  as={'button'}
                  // href={props.openseaURL}
                  // target="_blank"
                  // className={`shiningBg ${btnClassPicker(variant)}`}
                  // color={variant === 'common' ? 'white' : 'black'}
                  bg={getTraitColors(props.rarityRank / props.totalSupply).bg + '.500'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                  marginTop={2}
                  paddingInline={0}
                  borderRadius="md"
                  paddingRight={'.6rem'}
                  paddingLeft={'.6rem'}
                  paddingTop={'.5rem'}
                  paddingBottom={'.5rem'}
                  fontWeight="bold"
                  onClick={() => finalPrice && onClick()}
                >
                  {isLoading /* || loadingPrice */ && <Spinner />}
                  {!(isLoading /* || loadingPrice */) && (
                    <HStack justify="space-between">
                      {finalPrice ? (
                        <>
                          <Flex>
                            <Text color="inherit">{Math.round(finalPrice * 100) / 100}&nbsp;</Text>
                            <Text mr="12px">Ξ</Text>
                            <Text color="inherit" textAlign="right">
                              Buy&nbsp;now
                            </Text>
                            {/* <EthDarkIcon width={'10px'} /> */}
                          </Flex>
                        </>
                      ) : (
                        <Text textAlign="center" color="inherit">
                          Not available
                        </Text>
                      )}
                    </HStack>
                  )}
                </Box>
              )}
            </BuyNowButton>
          ) : null}
        </Grid>
      </Box>
      <NFTModal
        isOpen={isOpen}
        onClose={onClose}
        nft={props}
        nftAsset={openseaAsset}
        imageTransform={transformImageUrl}
      />
    </>
  );
};
