import { Box, Text, HStack } from "@chakra-ui/layout";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useMemo } from "react";
import { Tag, TagCloseButton, TagLabel, useToken } from '@chakra-ui/react'

export type TraitWithUniqueScore = {
  property: string
  value: string
  uniqueScore: number
  id?: string
}

type ITraitSelectionProps = {
  traits: TraitWithUniqueScore[]
  selectedTraits: TraitWithUniqueScore[]
  onSelect: (trait: TraitWithUniqueScore[]) => void
}

type TraitSeletable = TraitWithUniqueScore & {
  label: string
}

export function TraitBox(trait: TraitWithUniqueScore) {
  const colors = getTraitColors(trait.uniqueScore);
  return (
    <Box
      cursor="pointer"
      borderRadius="md"
      p={2}
      bg={colors.bg}
      color={colors.color}
      display="flex"
      justifyContent="space-between"
      w={180}
    >
      <Box>
        <Text color="inherit"
          fontWeight="bold">{trait.property}</Text>
        <Text color="inherit">{trait.value}</Text>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {trait.uniqueScore > 0 && <Text color="inherit">{Math.round(trait.uniqueScore * 100) / 100}%</Text>}
      </Box>
    </Box>
  )
}

type ITraitBoxWithDeleteOptionProps = {
  trait: TraitWithUniqueScore
  onRemove: () => void
}

export function getTraitColors(uniqueScore: number) {
  if (uniqueScore <= 1) {
    return {
      bg: 'yellow.500',
      color: 'blackAlpha.700',
    }
  }
  if (uniqueScore <= 5) {
    return {
      bg: 'blue.500',
      color: 'blackAlpha.700',
    }
  }
  return {
    bg: 'gray',
    color: 'blackAlpha.700',
  }
}

export function getColorScheme(uniqueScore: number) {
  if (uniqueScore <= 1) {
    return 'yellow'
  }
  if (uniqueScore <= 5) {
    return 'blue'
  }
  return 'gray'
}


function TraitBoxWithDeleteOption(props: ITraitBoxWithDeleteOptionProps) {
  const { trait, onRemove } = props;
  const colorScheme = getColorScheme(trait.uniqueScore);

  return (
    <Tag size={'lg'} variant='solid' colorScheme={colorScheme}>
      <TagLabel>{trait.property}: {trait.value.toUpperCase()}</TagLabel>
      <TagCloseButton onClick={onRemove}/>
    </Tag>
  )
}

function traitWithLabel(trait: TraitWithUniqueScore): TraitSeletable {
  return {
    ...trait,
    label: `${trait.property} - ${trait.value}`,
    // value: `${trait.property} - ${trait.value}`,
  }
}

export default function TraitSelection(props: ITraitSelectionProps) {
  const handleSelectedItemsChange = (selectedItems: TraitWithUniqueScore[]) => {
    props.onSelect(selectedItems);
  };

  const removeItem = (selectedItem: TraitWithUniqueScore) => {
    props.onSelect(selectedItems.filter(
      item => !(item.property === selectedItem.property && item.value === selectedItem.value)
    ));
  };

  const unselectedTraits = useMemo(() => {
    return props.traits.map(traitWithLabel)
      .filter(
        item => !props.selectedTraits
          .some(
            selectedItem => selectedItem.property === item.property &&
              selectedItem.value === item.value
          )
      )
  }, [props.selectedTraits, props.traits])

  const selectedItems = useMemo(() => {
    return props.selectedTraits.map(traitWithLabel);
  }, [props.selectedTraits])

  const [borderColor] = useToken(
    'colors',
    ['border-color']
  )

  return (
    <Box w={588} color="white">
      <Text marginBottom={'0.5rem'}>Filter traits ({props.selectedTraits.length}):</Text>

      <Box position="relative">
        <Box position="absolute" zIndex={1} top={0} right={0} w={8} h={'full'} bgGradient={'linear(to-r, #f2f2f200, card-bg)'}>
        </Box>
        <HStack
          gap={1}
          paddingBottom={'1rem'}
          overflow={'scroll'}
        >
          {props.selectedTraits.length === 0 &&
            <Text color="gray">No trait selected</Text>
          }
          {props.selectedTraits.map((item, i) => (
            <Box key={i}>
              <TraitBoxWithDeleteOption
                trait={item}
                onRemove={() => removeItem(item)}
              />
            </Box>
          ))}
        </HStack>
      </Box>

      <Box>
        <CUIAutoComplete<TraitSeletable>
          label="Search traits"
          tagStyleProps={{
            display: 'none'
          }}
          placeholder="Search traits"
          items={unselectedTraits}
          selectedItems={selectedItems}
          onSelectedItemsChange={(changes) => {
            if (changes.selectedItems) {
              handleSelectedItemsChange(changes.selectedItems)
            }
          }}
          itemRenderer={TraitBox}
          listStyleProps={{
            bg: 'transparent',
            borderRadius: 'md',
            border: `1px solid ${borderColor}`,
            display: 'grid',
            justifyItems: 'center',
            gridTemplateColumns: '1fr 1fr 1fr',
            boxShadow: '0px 6px 20px -2px rgba(25, 25, 26, 0.62);',
            maxHeight: 200,
            overflow: 'auto'
          }}
          disableCreateItem
          createItemRenderer={() => (
            <Box>
              No trait found
            </Box>
          )}
          listItemStyleProps={{
            background: 'none'
          }}
          inputStyleProps={{
            border: '1px solid',
            borderColor: borderColor,
            bg: 'transparent'
          }}
          labelStyleProps={{
            marginBottom: 0,
            display: 'none',
            fontWeight: 'normal',
          }}
          icon={() => <></>}
          highlightItemBg={'none'}
          toggleButtonStyleProps={{
            display: 'none'
          }}
        />
      </Box>
    </Box>
  )
}