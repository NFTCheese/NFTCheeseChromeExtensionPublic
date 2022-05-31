import { Box, Checkbox, Tag, TagLabel, Text } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { getRarityLabel, getTraitColors } from '../utils/rarityUtils';
import { TraitWithUniqueScore } from './TraitSelection';

type ITraitSelectionCheckBox = {
  isChecked: boolean
  trait: TraitWithUniqueScore;
  onSelect: () => void
};

export const TraitSelectionCheckBox = (props: ITraitSelectionCheckBox) => {
  return (
    <Checkbox
      colorScheme={getTraitColors(props.trait.uniqueScore)?.bg}
      spacing="12px"
      borderColor="text"
      mb="-7px"
      isChecked={props.isChecked}
      onChange={() => props.onSelect()}
    >
      <Box display="flex" alignItems="center">
        <Text pr="12px" fontWeight="normal">{capitalize(props.trait.value)}</Text>
        <Tag size={'md'} variant="solid" colorScheme={getTraitColors(props.trait.uniqueScore)?.bg}>
          <TagLabel display="flex" alignItems="center">
            <Text color="inherit" pr="3px">{((props.trait.uniqueScore * 100) / 100).toFixed(3)} %</Text>
            <Text color="inherit">{capitalize(getRarityLabel(props.trait.uniqueScore))}</Text>
          </TagLabel>
        </Tag>
      </Box>
    </Checkbox>
  );
};
