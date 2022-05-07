// import { Button } from "@chakra-ui/button";
import { Box, /* Grid,  */ HStack, Text /*  VStack, Flex  */ } from '@chakra-ui/layout';
import { Skeleton /* , useColorModeValue */, Spinner } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { getRarityLabel } from '../utils/rarityUtils';
import { btnClassPicker, classNamePicker } from './assets/colorPicker';
// import EthIcon from './icons/EthIcon';
import { Image } from '@chakra-ui/react';
import BuyNowButton from './BuyNowButton';
import { Fragment } from 'react';
import { RiShoppingCartFill } from 'react-icons/ri';
import { IMenuRendererProps } from './MenuRenderer';

type INFTInfoExtensionInjectableProps = {
  rank?: number;
  totalSupply?: number;
  loadingRarity: boolean;
  // updated/new props for menu renderer
  menuRenderer: ({
    chain,
    address,
    replaceImage,
    isAutoImageReplaced,
  }: IMenuRendererProps) => JSX.Element;
  chain: string;
  address: string;
  replaceImage: () => void;
  isAutoImageReplaced: boolean;
  tokenId: string;
  price: number | null;
};

export default function NFTInfoExtensionInjectable(
  props: INFTInfoExtensionInjectableProps & IMenuRendererProps
) {
  const variant =
    props.rank && props.totalSupply ? getRarityLabel(props.rank / props.totalSupply) : 'unranked';
  const MenuRenderer = props.menuRenderer;

  return (
    <Box
      color="white"
      height="125px"
      minWidth="301px"
      p={'1px'}
      borderRadius={'lg'}
      position="relative"
      className={classNamePicker(variant)}
      // borderWidth="2px"
    >
      <Box
        bg={'#292929'}
        width="100%"
        height="100%"
        paddingBottom="10px"
        borderRadius={'lg'}
        display="flex"
        flexDirection="column"
      >
        <MenuRenderer
          chain={props.chain}
          address={props.address}
          replaceImage={props.replaceImage}
          isAutoImageReplaced={props.isAutoImageReplaced}
          tokenId={props.tokenId}
          loadingPrices={props.loadingPrices}
          avgPriceToday={props.avgPriceToday}
          volumeToday={props.volumeToday}
          floorPrice={props.floorPrice}
        />
        <Skeleton
          height="100%"
          display="flex"
          flexDirection="column"
          paddingTop="3"
          isLoaded={!props.loadingRarity}
        >
          <HStack display="flex" /* ml="auto" */ paddingLeft="20px" alignItems="center">
            <div style={{ display: 'flex' }}>
              <Text color="white" fontWeight="bold" marginRight="5px" style={{ fontSize: 15 }}>
                Rank:{' '}
              </Text>
              {props.rank && props.totalSupply && (
                <Text color="white" lineHeight="short">
                  <span style={{ fontSize: 15, fontWeight: 'bold' }}>{props.rank}</span>
                  <span style={{ fontSize: 15 }}>/{props.totalSupply}</span>
                </Text>
              )}
            </div>
            <div>
              <Skeleton isLoaded={!props.loadingRarity}>
                <Box
                  borderRadius="md"
                  marginLeft="5px"
                  fontSize={13}
                  textColor="#fff"
                  fontWeight="bold"
                  p={1}
                >
                  {capitalize(variant)}
                </Box>
              </Skeleton>
            </div>
          </HStack>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            paddingLeft="20px"
            paddingTop="12px"
            justifyContent={props.price !== null && props.price >= 0 ? 'flex-start' : 'flex-end'}
          >
            {props.price !== null && props.price >= 0 && (
              <BuyNowButton address={props.address} tokenId={props.tokenId}>
                {({ onClick, isLoading }) => (
                  <Box
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    marginRight="auto"
                    fontSize={15}
                    textColor="#fff"
                    fontWeight="bold"
                    py={2}
                    px={3}
                    className={`${btnClassPicker(variant)}`}
                    onClick={() => props.price !== null && props.price >= 0 && onClick()}
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <Fragment>
                        <RiShoppingCartFill style={{ marginRight: 11 }} size={23} />
                        <span>Buy Now</span>
                      </Fragment>
                    )}
                  </Box>
                )}
              </BuyNowButton>
            )}
            {/* image won't load until main card info is loaded in  */}
            <Skeleton alignSelf="flex-end" isLoaded={!props.loadingRarity}>
              <Box paddingRight={2}>
                {!props.loadingRarity ? (
                  <Image src="https://svgur.com/i/gYv.svg" width="100px" alt="nft cheese" />
                ) : null}
              </Box>
            </Skeleton>
          </Box>
        </Skeleton>
      </Box>
    </Box>
  );
}
