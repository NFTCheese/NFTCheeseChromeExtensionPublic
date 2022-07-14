import { Flex, Text, useToken } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { rarityToTag } from '../common/rarityToTag';
import { btnClassPicker } from './assets/colorPicker';
/* import { getRarityLabel } from '../utils/rarityUtils';
import { btnClassPicker } from './assets/colorPicker'; */
import { TraitWithUniqueScore } from './TraitSelection';

export const NFTTrait = ({ trait }: { trait: TraitWithUniqueScore }) => {
  const [borderColor] = useToken('colors', ['border-color']);
  const rarity = rarityToTag(trait.uniqueScore);
  return (
    <Flex
      align="center"
      justify="space-between"
      borderBottom={`1px solid ${borderColor}`}
      p="17px"
      fontFamily="inter"
    >
      <Text>
        {trait.property}:<span style={{ marginLeft: '3px' }}>{trait.value}</span>
      </Text>
      <Flex
        justify="center"
        borderRadius="8px"
        p="1"
        fontSize="0.8rem"
        className={`shiningBg ${btnClassPicker(rarity)}`}
        color="text"
        maxW="157px"
        w="157px"
        fontWeight="bold"

        // colorScheme={getTraitColors((trait.uniqueScore * 100) / 100).bg}
      >
        {capitalize(rarity)}: {((trait.uniqueScore * 100) / 100).toFixed(3)}%
      </Flex>
    </Flex>
  );
};
