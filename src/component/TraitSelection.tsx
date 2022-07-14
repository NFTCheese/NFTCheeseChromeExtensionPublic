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
  Button,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { TraitBoxWithDeleteOption } from './TraitBoxWithDeleteOption';
import { TraitSelectionCheckBox } from './TraitSelectionCheckbox';
import { uniq } from 'lodash';

export const scrollBarStyle = (
  scrollBarBG: string,
  scrollBarOutlineColor: string,
  scrollBarThumbBG: string
) => {
  return {
    '&::-webkit-scrollbar': {
      backgroundColor: scrollBarBG,
      borderRadius: '3px',
      width: '3px',
      outlineWidth: '2px',
      outlineColor: scrollBarOutlineColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollBarThumbBG,
      borderRadius: '3px',
      width: '3px',
    },
  };
};

export type TraitWithUniqueScore = {
  property: string;
  value: string;
  uniqueScore: number;
  id?: string;
};

type ITraitSelectionProps = {
  traits: TraitWithUniqueScore[];
  selectedTraits: TraitWithUniqueScore[];
  onConfirm: (traits: TraitWithUniqueScore[]) => void;
  onCancel: () => void;
};

export type TraitSelectable = TraitWithUniqueScore & {
  label: string;
};

type ITraitAccordionProps = {
  property: string;
  propertyValues: TraitWithUniqueScore[];
  sessionValues: TraitWithUniqueScore[];
  onTraitToggle: (trait: Omit<TraitWithUniqueScore, 'id'>) => void;
};
const TraitAccordion = (props: ITraitAccordionProps) => {
  const [borderColor] = useToken('colors', ['border-color']);
  const scrollBarBG = useColorModeValue('gray.100', 'gray.800');
  const scrollBarOutlineColor = useColorModeValue('nftcheese-bg-light', 'nftcheese-bg-dark');
  const scrollBarThumbBG = useColorModeValue('nftcheese-bg-dark', 'nftcheese-bg-light');
  const labelColor = useColorModeValue('black', 'white');
  const [traitFilterTerm, setTraitFilterTerm] = useState('');

  return (
    <AccordionItem borderColor={borderColor}>
      {({ isExpanded }: { isExpanded: boolean }) => {
        return (
          <Heading as="h2" color={'text'}>
            <AccordionButton
              py="14px"
              _focus={{
                boxShadow: '0 0 0 3px nftcheese-bg',
              }}
              pl={0}
            >
              <Box
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                letterSpacing={0.2}
                color={labelColor}
              >
                {props.property.toUpperCase()}
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
              {props.propertyValues.length > 4 && (
                <Input
                  placeholder="Filter Traits here"
                  size="md"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setTraitFilterTerm(event.target.value)
                  }
                  value={traitFilterTerm}
                  mb="12px"
                />
              )}

              <Box
                id="test"
                maxHeight={props.propertyValues.length > 4 ? '160px' : '100%'}
                width="100%"
                overflowY={'auto'}
                sx={scrollBarStyle(scrollBarBG, scrollBarOutlineColor, scrollBarThumbBG)}
              >
                {props.propertyValues
                  .filter((trait) =>
                    trait.value.toLowerCase().includes(traitFilterTerm.toLowerCase())
                  )
                  .map((trait: TraitWithUniqueScore, key) => (
                    <TraitSelectionCheckBox
                      key={key}
                      trait={trait}
                      isChecked={props.sessionValues.some(
                        (item) => item.property === trait.property && item.value === trait.value
                      )}
                      onSelect={() => props.onTraitToggle(trait)}
                    />
                  ))}
              </Box>
            </AccordionPanel>
          </Heading>
        );
      }}
    </AccordionItem>
  );
};

const isSameTrait = (traitA: TraitWithUniqueScore, traitB: TraitWithUniqueScore): boolean => {
  return traitA.property === traitB.property && traitA.value === traitB.value;
};

export default function TraitSelection(props: ITraitSelectionProps) {
  // This is the temp values
  const [sessionValues, setSessionValues] = useState<TraitWithUniqueScore[]>([]);

  const properties = useMemo(
    () => uniq(props.traits.map(({ property }) => property)),
    [props.traits]
  );

  useEffect(() => {
    if (props.selectedTraits.length > 0) {
      setSessionValues([...props.selectedTraits]);
    }
  }, [props.selectedTraits]);

  const scrollBarBG = useColorModeValue('gray.100', 'gray.800');
  const scrollBarOutlineColor = useColorModeValue('nftcheese-bg-light', 'nftcheese-bg-dark');
  const scrollBarThumbBG = useColorModeValue('nftcheese-bg-dark', 'nftcheese-bg-light');
  const labelColor = useColorModeValue('black', 'white');
  const [selectedTraitsContainerRef] = useAutoAnimate<HTMLDivElement>();

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
          ref={selectedTraitsContainerRef}
        >
          {sessionValues.length === 0 && <Text color={'text'}>No trait selected</Text>}
          {sessionValues.map((item, i) => (
            <Box key={`${item.id}-${item.property}-${item.value}`}>
              <TraitBoxWithDeleteOption
                trait={item}
                onRemove={() => {
                  setSessionValues((sessionValues) => {
                    return sessionValues.filter(
                      (selectedTrait) => !isSameTrait(item, selectedTrait)
                    );
                  });
                }}
              />
            </Box>
          ))}
        </HStack>
      </Box>

      <Box>
        <Text pb="17px" color={labelColor} mx="5">
          Filter Traits:
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
            <TraitAccordion
              key={key}
              property={property}
              sessionValues={sessionValues}
              propertyValues={props.traits.filter((trait) => trait.property === property)}
              onTraitToggle={(toggledTrait) => {
                setSessionValues((selectedTraits) => {
                  const newSelectedTraits = selectedTraits.filter(
                    (selectedTrait) => !isSameTrait(selectedTrait, toggledTrait)
                  );
                  if (newSelectedTraits.length === selectedTraits.length) {
                    return [toggledTrait, ...selectedTraits];
                  }
                  return newSelectedTraits;
                });
              }}
            />
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
          <Button
            display="flex"
            alignItems="center"
            mr="14px"
            type="button"
            onClick={props.onCancel}
          >
            <CloseIcon fontSize="12px" color="inherit" mr="14px" />
            <Text fontSize="14px">Cancel</Text>
          </Button>
          <Button
            display="flex"
            alignItems="center"
            mr="14px"
            type="button"
            colorScheme="green"
            onClick={() => props.onConfirm(sessionValues)}
          >
            <CheckIcon fontSize="12px" color="white" mr="14px" />
            <Text color="white" fontSize="14px">
              Confirm
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
