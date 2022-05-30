import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { getTraitColors } from '../utils/rarityUtils';
import { TraitWithUniqueScore } from './TraitSelection';

type ITraitBoxWithDeleteOptionProps = {
  trait: TraitWithUniqueScore;
  onRemove: () => void;
};

export const TraitBoxWithDeleteOption = (props: ITraitBoxWithDeleteOptionProps) => {
  const { trait, onRemove } = props;
  const colorScheme = getTraitColors(trait.uniqueScore)?.bg;

  return (
    <Tag size={'lg'} variant="solid" colorScheme={colorScheme}>
      <TagLabel>
        {trait.property}: {trait.value.toUpperCase()}
      </TagLabel>
      <TagCloseButton onClick={onRemove} />
    </Tag>
  );
};
