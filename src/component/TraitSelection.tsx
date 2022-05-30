import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Text,
  HStack,
  Heading,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  useToken,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { TraitBoxWithDeleteOption } from './TraitBoxWithDeleteOption';
import {
  removeItem,
  scrollBarStyle,
  setPropValues,
  traitFilter,
  traitWithLabel,
} from '../utils/traitFunctions';
import { TraitSelectionButton } from './TraitSelectionButton';
import { TraitSelectionCheckBox } from './TraitSelectionCheckBox';

export type TraitWithUniqueScore = {
  property: string;
  value: string;
  uniqueScore: number;
  id?: string;
};

type ITraitSelectionProps = {
  traits: TraitWithUniqueScore[];
  selectedTraits: TraitWithUniqueScore[];
  onSelect: (trait: TraitWithUniqueScore[]) => void;
};

export type TraitSelectable = TraitWithUniqueScore & {
  label: string;
};

export default function TraitSelection(props: ITraitSelectionProps) {
  const [filterInput, setFilterInput] = useState<string>('');
  const [properties, setProperties] = useState<string[]>([]);
  const [propertyValues, setPropertyValues] = useState<TraitWithUniqueScore[] | []>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [sessionValues, setSessionValues] = useState<TraitWithUniqueScore[] | []>([]);

  useEffect(() => {
    if (props.traits.length > 0) {
      const propertiesArr: string[] = [];
      for (let trait of props.traits) {
        if (propertiesArr.indexOf(trait.property) === -1) {
          propertiesArr.push(trait.property);
        }
      }
      setProperties(propertiesArr);
    }
  }, [props.traits]);

  useEffect(() => {
    if (props.selectedTraits.length > 0) {
      setSessionValues([...props.selectedTraits]);
    }
  }, [props.selectedTraits]);

  const unselectedTraits = useMemo(() => {
    return (
      props.traits.length -
      props.traits
        .map(traitWithLabel)
        .filter((item) =>
          sessionValues.some(
            (selectedItem) =>
              selectedItem.property === item.property && selectedItem.value === item.value
          )
        ).length
    );
  }, [sessionValues, props.traits]);

  /* const selectedItems = useMemo(() => {
    return sessionValues.map(traitWithLabel);
  }, [sessionValues]); */

  const [borderColor] = useToken('colors', ['border-color']);
  const scrollBarBG = useColorModeValue('gray.100', 'gray.800');
  const scrollBarOutlineColor = useColorModeValue('nftcheese-bg-light', 'nftcheese-bg-dark');
  const scrollBarThumbBG = useColorModeValue('nftcheese-bg-dark', 'nftcheese-bg-light');

  return (
    <Box w={588} color="white" bg="nftcheese-bg" borderRadius="md" pt="5">
      <Text color={'text'} marginBottom={'0.6rem'} mx="5">
        Selected Traits ({sessionValues.length}):
      </Text>

      <Box position="relative" mx="5">
        <HStack
          gap={1}
          paddingBottom={'2.3rem'}
          overflowX="scroll"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {sessionValues.length === 0 && <Text color={'text'}>No trait selected</Text>}
          {sessionValues.map((item, i) => (
            <Box key={i}>
              <TraitBoxWithDeleteOption
                trait={item}
                onRemove={() => removeItem(sessionValues, item, setSessionValues)}
              />
            </Box>
          ))}
        </HStack>
      </Box>

      <Box>
        <Text pb="17px" color={'text'} mx="5">
          Filter Traits ({unselectedTraits}):
        </Text>
        <Accordion
          allowToggle
          maxHeight="313px"
          overflowY="scroll"
          pr="13px"
          mb="48px"
          mx="5"
          sx={scrollBarStyle(scrollBarBG, scrollBarOutlineColor, scrollBarThumbBG)}
        >
          {properties?.map((property: string, key) => (
            <AccordionItem key={key} borderColor={borderColor}>
              {({ isExpanded }: { isExpanded: boolean }) => {
                return (
                  <Heading as="h2" color={'text'}>
                    <AccordionButton
                      py="14px"
                      _focus={{
                        boxShadow: '0 0 0 3px nftcheese-bg',
                      }}
                      pl={0}
                      onClick={() =>
                        setPropValues(
                          isExpanded,
                          properties,
                          props.traits,
                          setPropertyValues,
                          setFilter,
                          key
                        )
                      }
                    >
                      <Box flex="1" textAlign="left" fontWeight="semibold" letterSpacing={0.2}>
                        {property.toUpperCase()}
                      </Box>

                      <div>
                        {isExpanded ? (
                          <MinusIcon w={4} h={4} color="text" />
                        ) : (
                          <AddIcon w={4} h={4} color="text" />
                        )}
                      </div>
                    </AccordionButton>

                    <AccordionPanel px={2} pb={2} pt={1} color={'text'}>
                      {filter === property && (
                        <Input
                          placeholder="Filter Traits here"
                          size="md"
                          onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            traitFilter(
                              event,
                              property,
                              setFilterInput,
                              props.traits,
                              setPropertyValues
                            )
                          }
                          value={filterInput}
                          mb="12px"
                        />
                      )}
                      <Box
                        id="test"
                        maxHeight={propertyValues.length > 4 ? '160px' : '100%'}
                        width="100%"
                        overflowY={propertyValues.length > 4 ? 'scroll' : undefined}
                        sx={scrollBarStyle(scrollBarBG, scrollBarOutlineColor, scrollBarThumbBG)}
                      >
                        {propertyValues?.map((trait: TraitWithUniqueScore, key) => (
                          <TraitSelectionCheckBox
                            key={key}
                            sessionValues={sessionValues}
                            trait={trait}
                            setSessionValues={setSessionValues}
                          />
                        ))}
                      </Box>
                    </AccordionPanel>
                  </Heading>
                );
              }}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="dark-lg"
      >
        <Box my="16px" display="flex">
          <TraitSelectionButton text="Cancel" onSelect={props.onSelect} />
          <TraitSelectionButton
            text="Confirm"
            sessionValues={sessionValues}
            onSelect={props.onSelect}
            isConfirm
          />
        </Box>
      </Box>
    </Box>
  );
}
