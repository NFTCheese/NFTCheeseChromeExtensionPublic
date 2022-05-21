import { Box, Text, HStack, Stack, Wrap, WrapItem } from "@chakra-ui/layout";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Checkbox, Input, Tag, TagCloseButton, TagLabel, useToken, Badge, Button, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { deselectAllTraits, deselectTrait, toggleTraitSelection } from "../state/store"
import { TraitWithUniqueScore } from "../types";
import { useDispatch } from "react-redux";
import { selectGroupedTraits, selectSelectedTraits } from "../state/slices/traitsSlice/selectors";
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, MinusIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { getTraitColors, TraitBoxWithDeleteOption } from "./TraitBox";
import Card from "../ui/Card";
import theme from "../theme";
import { getRarityLabel, RARITY_TYPES } from "../utils/rarityUtils";


export type ITraitSelectionProps = {
  width?: number,
  height?: number,
  onSelect: (trait: TraitWithUniqueScore[]) => void,
  onConfirm: (traits: TraitWithUniqueScore[]) => void,
  onCancel: () => void,
}

type TTraitsSearchParams = {
  traits: TraitWithUniqueScore[],
  onSelect: (trait: TraitWithUniqueScore[]) => void
}

export function TraitSearch({ traits, onSelect }: TTraitsSearchParams) {
  const dispatch = useDispatch()
  const [filteredTraits, setFilteredTraits] = useState(traits)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!searchTerm) {
      return setFilteredTraits(traits)
    }
    setFilteredTraits(traits.filter(x => x.value.includes(searchTerm)))
  }, [searchTerm, traits])

  const handleTypeSearch = (evt: React.FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value
    setSearchTerm(value)
  }

  const handleTraitSelect = (_evt: React.FormEvent<HTMLInputElement>, trait: TraitWithUniqueScore) => {
    onSelect(traits.filter(x => x.selected))
    dispatch(toggleTraitSelection(trait))
  }
  
  return (
    <Box>
      <Box>
        <Stack spacing={2} marginBottom={5}>
          <Input color='text' borderColor='border-color' width='auto' onChange={handleTypeSearch} placeholder='Search...' />
        </Stack>
        <Stack spacing={2} direction='column' maxHeight={360} overflowY='scroll' overflowX='auto'>
          {filteredTraits.map(trait => {
            const rariryLabel = getRarityLabel(trait.uniqueScore)
            const rarityType = RARITY_TYPES.find(x => x.name === rariryLabel)
            const bgColor = rarityType?.color!
            // const color = useColorModeValue(bgColor.light, bgColor.dark)
            return (
              <Checkbox style={{ width: '100%' }} color='text' borderColor='border-color' isChecked={trait.selected} onChange={(evt: React.FormEvent<HTMLInputElement>) => handleTraitSelect(evt, trait)}>
                <Box textTransform='capitalize' width='100%'>
                  <Box display='inline' marginRight={15}>{trait.value}</Box>
                  {rarityType?.top !== Infinity && <Badge textTransform='lowercase' position='absolute' left='50%' color='white'>
                    {(rarityType?.top ?? 1)}% {(rarityType?.top ?? 1) < 0.05 ? rariryLabel : ''}
                  </Badge>}
                </Box>
              </Checkbox>
            )
          })}
        </Stack>
      </Box>
    </Box>
  )
}

export default function TraitSelection(props: ITraitSelectionProps) {
  const groupedTraits = useSelector(selectGroupedTraits)
  const selectedTraits = useSelector(selectSelectedTraits)
  const dispatch = useDispatch()
  const defaultHeight = 800
  const height = props.height ?? defaultHeight
  const headerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>
  const footerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>
  const [maxContentHeight, setMaxContentHeight] = useState(0)
  const cardPadding = 6

  useEffect(() => {
    const space = parseFloat(theme.space[cardPadding])
    // 1rem is set to 16 pixels in chakra
    const cardPaddingPixels = space * 16
    const headerHeight = headerRef?.current?.clientHeight ?? 0
    const footerHeight = footerRef?.current?.clientHeight ?? 0
    setMaxContentHeight(height - headerHeight - footerHeight - cardPaddingPixels)
  })

  const removeItem = (selectedItem: TraitWithUniqueScore) => {
    dispatch(deselectTrait(selectedItem))
  }

  const getSelectedLength = (group: string) => {
    const traits = groupedTraits[group]
    const length = traits.filter(x => x.selected).length
    if (!length) {
      return null
    }
    return `(${length})`
  }

  const handleConfirm = (evt: React.FormEvent<HTMLButtonElement>) => {
    props.onConfirm(selectedTraits)
  }

  const handleCancel = (evt: React.FormEvent<HTMLButtonElement>) => {
    dispatch(deselectAllTraits())
  }

  return (
    <Card p={cardPadding} position='relative' width={props.width ?? 'auto'} height={height}>
      <Box ref={headerRef} position="relative">
        <Box position="absolute" zIndex={1} top={0} right={0} w={8} h={'full'} bgGradient={'linear(to-r, #f2f2f200, card-bg)'}>
        </Box>
        <HStack gap={1} paddingBottom={'1rem'} overflow={'scroll'}>
          {selectedTraits.length === 0 && <Text color="gray">No trait selected</Text>}
          {selectedTraits.map((item, i) => (
            <Box key={i}>
              <TraitBoxWithDeleteOption trait={item} onRemove={() => removeItem(item)} />
            </Box>
          ))}
        </HStack>
      </Box>
      <Stack spacing={2} direction='column' overflowY='scroll' maxHeight={maxContentHeight}>
        <Box position='relative'>
          <Text flex='1' marginBottom='3' fontSize='lg' textAlign='left' color='text'>Filter traits ({Object.keys(groupedTraits).length})</Text>
          <Accordion allowToggle reduceMotion allowMultiple>
            {Object.keys(groupedTraits).map((group, index) => (
              <AccordionItem isFocusable={false} color='text' borderColor='border-color'>
                {({ isExpanded }: { isExpanded: boolean }) => (
                  <>
                    <div>
                      <AccordionButton>
                        <Text flex='1' textAlign='left' fontWeight='bold' textTransform='uppercase'>{group} {getSelectedLength(group)}</Text>
                        {isExpanded ? (
                          <MinusIcon fontSize='12px' />
                        ) : (
                          <AddIcon fontSize='12px' />
                        )}
                      </AccordionButton>
                    </div>
                    <AccordionPanel>
                      <TraitSearch traits={groupedTraits[group]} onSelect={props.onSelect} />
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        <Wrap ref={footerRef} padding='3' spacing='3' boxShadow={'var(--chakra-colors-card-shadow) 0px -10px 15px -15px'} width='100%' position='absolute' bottom={0} left={0} justify='center'>
          <WrapItem>
            <Button onClick={handleCancel} leftIcon={<CloseIcon width={2} />} size={'sm'} p={5} variant='solid'>
              Cancel
            </Button>
          </WrapItem>
          <WrapItem>
            <Button onClick={handleConfirm} leftIcon={<CheckIcon width={2} />} size={'sm'} p={5} colorScheme='green' variant='solid'>
              Confirm
            </Button>
          </WrapItem>
        </Wrap>
      </Stack>
    </Card>
  )
}