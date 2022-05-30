import { Box, Text } from '@chakra-ui/react';
import { getTraitColors } from '../utils/rarityUtils';
import { TraitWithUniqueScore } from './TraitSelection';

export const TraitBox = ({
  trait: { property, value, uniqueScore },
}: {
  trait: TraitWithUniqueScore;
}) => {
  const colors = getTraitColors(uniqueScore);
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
        <Text color="inherit" fontWeight="bold">
          {property}
        </Text>
        <Text color="inherit">{value}</Text>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {uniqueScore > 0 && <Text color="inherit">{Math.round(uniqueScore * 100) / 100}%</Text>}
      </Box>
    </Box>
  );
};
