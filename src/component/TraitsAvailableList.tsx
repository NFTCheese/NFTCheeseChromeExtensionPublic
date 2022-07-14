import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons';
import { LineWobble } from '@uiball/loaders';
import {
  Box,
  Text,
  Flex,
  HStack,
  Spacer,
  Button,
  useDisclosure,
  Center,
  useColorModeValue,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
  Grid,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { assetsFromOpenseaLoaderGenerator } from '../utils/api';
import { NFT, NFTBox } from './NFTBox';
import TraitsListExpandPopup from './TraitsListExpandPopup';

export type TraitsAvailableListProps = {
  NFTs: NFT[];
  loading?: boolean;
  collectionSlug: string;
};

export default function TraitsAvailableList(props: TraitsAvailableListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // this state updates menu text display
  const [menuOpt, setMenuOpt] = useState('Rank');

  // colors for menu to support dark/light mode, also for see all card
  const menuOutlineColor = useColorModeValue('#000', '#383838');
  const menuColor = useColorModeValue('#000', '#fff');
  const seeAllBG = useColorModeValue('transparent', '#383838');
  const seeAllShadow = useColorModeValue('rgba(0, 0, 0, 0.62)', 'rgba(0, 0, 0, 0.42)');

  const assetLoader = useMemo(() => {
    return props.collectionSlug
      ? assetsFromOpenseaLoaderGenerator(props.collectionSlug)
      : undefined;
  }, [props.collectionSlug]);

  const loadingLayoverBg = useColorModeValue('black', 'white');

  const NFTs = props.NFTs;
  return (
    <Box maxW="100%" /* overflow="auto" */ color="white" position="relative">
      {props.loading && (
        <Center
          top={0}
          left={0}
          position={'absolute'}
          w="full"
          h="full"
          zIndex={2}
          bg="card-bg"
          opacity={0.9}
        >
          <LineWobble size={80} lineWeight={5} speed={1.75} color={loadingLayoverBg} />
        </Center>
      )}
      <Flex align="center">
        <Text fontWeight={'bold'}>Available NFTs ({NFTs.length})</Text>
        <Spacer />
        <Text mr="13px">Sort by</Text>
        {/* replacing View Button that opens disclosure with the menu for sorting */}
        <Menu placement="right-end">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg="transparent"
            border={`1px solid ${menuOutlineColor}`}
            color={menuColor}
          >
            {menuOpt}
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem onClick={() => menuOpt !== 'Rank' && setMenuOpt('Rank')}>Rank</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
        {/*  <Button
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
        /> */}
      </Flex>
      <HStack gap=".5rem" marginBottom={'1rem'} maxHeight={330} /* overflow={'auto'} */ py={3}>
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
          );
        })}
        {/* See All Button that opens disclosure */}
        <Box
          p={'1px'}
          borderRadius="lg"
          display="inline-block"
          height="232px"
          sx={{
            boxShadow: `-1px 6px 12px 3px ${seeAllShadow}`,
          }}
          bg={seeAllBG}
          cursor="pointer"
          onClick={onOpen}
        >
          <Grid
            h="100%"
            w={160}
            bg={'nft-bg'}
            borderRadius="lg"
            overflow="hidden"
            color="text"
            templateRows={'3fr'}
            p={3}
          >
            <Center>SEE ALL</Center>
          </Grid>
        </Box>
        <TraitsListExpandPopup
          collectionSlug={props.collectionSlug}
          isOpen={isOpen}
          onClose={onClose}
          listName={'Available NFTs:'}
          NFTs={NFTs}
        />
      </HStack>
    </Box>
  );
}
