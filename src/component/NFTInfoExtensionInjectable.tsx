// import { Button } from "@chakra-ui/button";
import { Box, Grid, HStack, Text, VStack, Flex } from "@chakra-ui/layout";
import { Skeleton, useColorModeValue } from "@chakra-ui/react";
import { capitalize } from "lodash";
import { getRarityLabel } from "../utils/rarityUtils";
import { btnClassPicker, classNamePicker } from "./assets/colorPicker";
import EthIcon from "./icons/EthIcon";

type INFTInfoExtensionInjectableProps = {
  rank?: number
  totalSupply?: number
  avgPriceToday: number
  volumeToday: number
  floorPrice: number
  loadingPrices: boolean,
  loadingRarity: boolean
  menuRenderer: () => JSX.Element
}

export default function NFTInfoExtensionInjectable(
  props: INFTInfoExtensionInjectableProps
) {
  const variant = (props.rank && props.totalSupply) ? getRarityLabel(props.rank / props.totalSupply) : 'unranked';
  const MenuRenderer = props.menuRenderer;

  return (
    <Box p={'1px'} className={classNamePicker(variant)} borderRadius={"lg"}>
      <Box bg={useColorModeValue('gray.50', 'blackAlpha.900')} p={4} borderRadius={"lg"} position="relative">
        <MenuRenderer/>
        <VStack alignItems="stretch">
          <VStack justifyItems="flext-start">
            <Skeleton isLoaded={!props.loadingRarity}>
              <HStack alignItems="flex-end">
                <Text fontWeight="bold">Rank: </Text>
                {props.rank && props.totalSupply &&
                  <>
                    <Text lineHeight="short" fontWeight="bold">
                      <span style={{ fontSize: 30, lineHeight: '22px' }}>{props.rank}</span>
                    </Text>
                    <Text>
                      /{props.totalSupply}
                    </Text>
                  </>
                }
              </HStack>
            </Skeleton>
            <div>
              <Skeleton isLoaded={!props.loadingRarity}>
                <Box borderRadius="md" fontWeight="bold" p={1} paddingRight={4} paddingLeft={4} color="black" className={`shiningBg ${btnClassPicker(variant)}`}>
                  {capitalize(variant)}
                </Box>
              </Skeleton>
            </div>
          </VStack>

          <HStack width="100%">
            <Grid templateColumns="repeat(3, 1fr)" gap={2} textAlign="center" width="full">
              <Text color={useColorModeValue('gray.800', "gray.400")}>Avg Price<br/>Today</Text>
              <Text color={useColorModeValue('gray.800', "gray.400")}>Volume<br/>Today</Text>
              <Text color={useColorModeValue('gray.800', "gray.400")}>Floor<br/>Price</Text>
              <Flex alignItems="center" justify="center">
                <EthIcon height={16}/>
                <Skeleton isLoaded={!props.loadingPrices}>
                  <Text>&nbsp;{Math.round(props.avgPriceToday * 100) / 100}</Text>
                </Skeleton>
              </Flex>
              <Flex alignItems="center" justify="center">
                <EthIcon height={16}/>
                <Skeleton isLoaded={!props.loadingPrices}>
                  <Text>&nbsp;{Math.round(props.volumeToday * 100) / 100}</Text>
                </Skeleton>
              </Flex>
              <Flex alignItems="center" justify="center">
                <EthIcon height={16}/>
                <Skeleton isLoaded={!props.loadingPrices}>
                  <Text>&nbsp;{Math.round(props.floorPrice * 100) / 100}</Text>
                </Skeleton>
              </Flex>
            </Grid>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}
