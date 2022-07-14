import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  // useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NFTTrait } from './NFTTrait';
import { scrollBarStyle, TraitWithUniqueScore } from './TraitSelection';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NFTTransactions } from './NFTTransactions';

type INFTTabs = {
  traits: TraitWithUniqueScore[] | undefined;
  isOpen: boolean;
  tokenID: string;
};

export const NFTTabs = ({ traits, isOpen, tokenID }: INFTTabs) => {
  const scrollBarBG = useColorModeValue('gray.100', 'gray.800');
  const scrollBarOutlineColor = useColorModeValue('nftcheese-bg-light', 'nftcheese-bg-dark');
  const scrollBarThumbBG = useColorModeValue('nftcheese-bg-dark', 'nftcheese-bg-light');
  const [traitsState, setTraitsState] = useState<TraitWithUniqueScore[] | []>([]);

  const addTraits = (): Promise<TraitWithUniqueScore[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSet = traits && [...traits?.slice(traitsState.length, 6 + traitsState.length)];
        const updatedTraits = newSet && [...traitsState, ...newSet];
        resolve(updatedTraits!);
      }, 250);
    });
  };

  const traitsUpdate = async () => {
    const updatedTraits: TraitWithUniqueScore[] | [] = await addTraits();
    setTraitsState(updatedTraits);
  };

  //   sets initial state
  useEffect(() => {
    if (traits && traits?.length > 0 && isOpen) {
      setTraitsState(traits.slice(0, 6));
    } else {
      setTraitsState([]);
    }
  }, [traits, isOpen]);

  return (
    <Tabs>
      <TabList borderBottom="1px solid" borderColor="#383838">
        <Tab flex="50%" _selected={{ borderBottom: '2px solid #E0AF00' }} fontWeight="bold">
          Transactions
        </Tab>
        <Tab flex="50%" _selected={{ borderBottom: '2px solid #E0AF00' }} fontWeight="bold">
          Traits
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <NFTTransactions tokenID={tokenID} />
        </TabPanel>
        <TabPanel>
          <Box
            id="NFTTraits"
            maxH="300px"
            overflowY="scroll"
            sx={scrollBarStyle(scrollBarBG, scrollBarOutlineColor, scrollBarThumbBG)}
          >
            <InfiniteScroll
              dataLength={traitsState.length}
              next={traitsUpdate}
              hasMore={traitsState?.length !== traits?.length ? true : false}
              loader={<h4>Loading...</h4>}
              scrollableTarget="NFTTraits"
            >
              {traitsState?.map((trait: TraitWithUniqueScore) => (
                <NFTTrait trait={trait} key={trait.property + ' ' + trait.value} />
              ))}
            </InfiniteScroll>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
