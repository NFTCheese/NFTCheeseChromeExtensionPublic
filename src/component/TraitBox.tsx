import { Box, Text } from "@chakra-ui/layout"
import { TraitWithUniqueScore } from "../types"
import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'

type ITraitBoxWithDeleteOptionProps = {
  trait: TraitWithUniqueScore
  onRemove: () => void
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

export function TraitBoxWithDeleteOption(props: ITraitBoxWithDeleteOptionProps) {
  const { trait, onRemove } = props;
  const colorScheme = getColorScheme(trait.uniqueScore);

  return (
    <Tag size={'lg'} variant='solid' colorScheme={colorScheme}>
      <TagLabel>{trait.property}: {trait.value.toUpperCase()}</TagLabel>
      <TagCloseButton onClick={onRemove} />
    </Tag>
  )
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
  );
}
