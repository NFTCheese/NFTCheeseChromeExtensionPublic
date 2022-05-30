/* put Menu in its own file since it got large and makes it easier for testing */
import {
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useColorModeValue,
  Icon,
  MenuDivider,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { CheckIcon } from '@chakra-ui/icons';
// import ScopedCSSPortal from './ScopedCSSPortal';
import { useContext } from 'react';
import { EventEmitterContext, GlobalConfigContext } from './AppProvider';
import EthIcon from './icons/EthIcon';
import { IoDiamondOutline } from 'react-icons/io5';

// these props for the menu are received from NFTInfoExtensionInjectable comp
// added these to NFTInfoExtensionInjectable
export type IMenuRendererProps = {
  chain: string;
  address: string;
  isAutoImageReplaced: boolean;
  replaceImage: () => void;
  tokenId: string;
  loadingPrices: boolean;
  avgPriceToday: number;
  volumeToday: number;
  floorPrice: number;
};

export const MenuRenderer = ({
  chain,
  address,
  isAutoImageReplaced,
  replaceImage,
  tokenId,
  loadingPrices,
  avgPriceToday,
  volumeToday,
  floorPrice,
}: IMenuRendererProps) => {
  const globalConfig = useContext(GlobalConfigContext);
  const events = useContext(EventEmitterContext);
  const borderColor = useColorModeValue('#292929', '#292929');
  const color = useColorModeValue('white', 'white');
  return (
    <Menu
      autoSelect={false}
      eventListeners={{ scroll: false, resize: false }}
      isLazy
      placement="right-start"
    >
      {({ isOpen }) => (
        <>
          <MenuButton
            onClick={() => {
              // don't want to run function twice only run on open where isOpen is initially false then true after being opened
              if (!isOpen) {
                if (chrome.runtime) {
                  chrome.runtime.sendMessage({ method: 'displayMenu', nftID: tokenId });
                }
              }
            }}
            as={IconButton}
            icon={<Icon as={FiMoreHorizontal} />}
            size="md"
            position="absolute"
            top="2"
            bg="transparent"
            height="20px"
            mt="1"
            minWidth="24px"
            ml="5px"
            right="4"
            color="white"
          >
            More Options
          </MenuButton>

          <MenuList
            borderColor={borderColor}
            bgColor={'#292929'}
            color={color}
            fontSize="sm"
            width="259px"
          >
            <MenuGroup
              // @ts-ignore
              title={
                <Text>
                  {chain === 'polygon' ? (
                    <Tag fontSize="xs" mt="-1px" ml="0.35em">
                      Unavailable
                    </Tag>
                  ) : null}
                </Text>
              }
              mr="0"
            >
              <MenuItem isDisabled={chain === 'polygon'} onClick={replaceImage}>
                Replace image from contract
              </MenuItem>
              <MenuItem
                isDisabled={chain === 'polygon'}
                onClick={async () => {
                  globalConfig.autoImageReplaceAddresses[address] =
                    !globalConfig.autoImageReplaceAddresses[address];

                  if (!globalConfig.autoImageReplaceAddresses[address]) {
                    Object.keys(globalConfig.imageReplaced).forEach((key) => {
                      const [_address] = key.split('/');
                      if (address === _address) {
                        globalConfig.imageReplaced[key] = false;
                      }
                    });
                  }

                  events.emit('toggleAutoReplaceImage', {
                    value: globalConfig.autoImageReplaceAddresses[address],
                    address,
                  });
                }}
              >
                <Text maxWidth="210px" color="white">
                  Mass-replace image from smart contract
                  {isAutoImageReplaced && (
                    <CheckIcon width="12px" height="auto" display="inline-block" marginLeft="3px" />
                  )}
                </Text>
              </MenuItem>
              <MenuItem isDisabled>See Rare Traits</MenuItem>
              <MenuItem isDisabled>View Transactions</MenuItem>
              <MenuItem isDisabled>
                <Flex alignItems="center">
                  <IoDiamondOutline size={25} color="#7E89F2" />
                  <span style={{ marginLeft: 10 }}>Show traitsniper ranking:</span>
                </Flex>
              </MenuItem>
            </MenuGroup>
            <MenuDivider borderColor="gray.400" />
            <MenuGroup my="8px">
              <Flex
                width="80%"
                justifyContent="space-between"
                paddingLeft="5px"
                marginBottom="8px"
                mx="auto"
              >
                <Text color="white">Avg price Today</Text>
                <Flex alignItems="center">
                  <EthIcon height={16} />
                  <Skeleton isLoaded={!loadingPrices}>
                    <Text color="white" style={{ marginLeft: 5 }}>
                      &nbsp;{Math.round(avgPriceToday * 100) / 100}
                    </Text>
                  </Skeleton>
                </Flex>
              </Flex>
              <Flex
                width="80%"
                justifyContent="space-between"
                paddingLeft="5px"
                marginBottom="8px"
                mx="auto"
              >
                <Text color="white">Floor Today</Text>
                <Flex alignItems="center">
                  <EthIcon height={16} />
                  <Skeleton isLoaded={!loadingPrices}>
                    <Text color="white" style={{ marginLeft: 5 }}>
                      &nbsp;{Math.round(floorPrice * 100) / 100}
                    </Text>
                  </Skeleton>
                </Flex>
              </Flex>
              <Flex
                width="80%"
                justifyContent="space-between"
                paddingLeft="5px"
                marginBottom="8px"
                mx="auto"
              >
                <Text color="white">Volume Today</Text>
                <Flex alignItems="center">
                  <EthIcon height={16} />
                  <Skeleton isLoaded={!loadingPrices}>
                    <Text color="white" style={{ marginLeft: 5 }}>
                      &nbsp;{Math.round(volumeToday * 100) / 100}
                    </Text>
                  </Skeleton>
                </Flex>
              </Flex>
            </MenuGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};
