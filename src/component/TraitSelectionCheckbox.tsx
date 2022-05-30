import { Box, Checkbox, Tag, TagLabel, Text } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { getRarityLabel, getTraitColors } from '../utils/rarityUtils';
import { checkBox } from '../utils/traitFunctions';
import { TraitWithUniqueScore } from './TraitSelection';

type ITraitSelectionCheckBox = {
  sessionValues: TraitWithUniqueScore[];
  trait: TraitWithUniqueScore;
  setSessionValues: Dispatch<SetStateAction<TraitWithUniqueScore[]>>;
};

export const TraitSelectionCheckBox = ({
  sessionValues,
  trait,
  setSessionValues,
}: ITraitSelectionCheckBox) => {
  return (
    <Checkbox
      colorScheme={getTraitColors(trait.uniqueScore)?.bg}
      spacing="12px"
      fontWeight="semibold"
      letterSpacing="0.2px"
      borderColor="text"
      mb="-7px"
      isChecked={sessionValues.some(
        (item) => item.property === trait.property && item.value === trait.value
      )}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        checkBox(
          event,
          trait.property,
          trait.value,
          trait.uniqueScore,
          setSessionValues,
          sessionValues
        )
      }
    >
      <Box display="flex" alignItems="center">
        <Text pr="12px">{capitalize(trait.value)}</Text>
        <Tag size={'md'} variant="solid" colorScheme={getTraitColors(trait.uniqueScore)?.bg}>
          <TagLabel display="flex" alignItems="center">
            <Text pr="3px">{((trait.uniqueScore * 100) / 100).toFixed(3)} %</Text>
            <Text>{capitalize(getRarityLabel(trait.uniqueScore))}</Text>
          </TagLabel>
        </Tag>
      </Box>
    </Checkbox>
  );
};
