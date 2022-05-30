import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, Text } from '@chakra-ui/react';
import { handleSelectedItemsChange } from '../utils/traitFunctions';
import { TraitWithUniqueScore } from './TraitSelection';

type ITraitSelectionButton = {
  text: string;
  isConfirm?: boolean;
  sessionValues?: TraitWithUniqueScore[];
  onSelect: (trait: TraitWithUniqueScore[]) => void;
};

export const TraitSelectionButton = ({
  text,
  isConfirm,
  sessionValues,
  onSelect,
}: ITraitSelectionButton) => {
  return (
    <Button
      display="flex"
      alignItems="center"
      mr="14px"
      type="button"
      bg={isConfirm ? 'green.500' : 'gray.600'}
      onClick={() => {
        if (isConfirm) {
          sessionValues?.forEach((trait) =>
            handleSelectedItemsChange(
              [
                {
                  property: trait.property,
                  value: trait.value,
                  uniqueScore: trait.uniqueScore,
                },
              ],
              onSelect
            )
          );
        }
      }}
    >
      {isConfirm ? (
        <CheckIcon fontSize="12px" color="white" mr="14px" />
      ) : (
        <CloseIcon fontSize="12px" color="white" mr="14px" />
      )}
      <Text color="white" fontSize="14px">
        {text}
      </Text>
    </Button>
  );
};
