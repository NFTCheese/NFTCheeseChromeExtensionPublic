import { Box, Text } from '@chakra-ui/layout';

import { btnClassPicker } from './assets/colorPicker';

export type TraitRarityTagProps = {
  variant: string
}

function titleUpppercaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export const TraitRarityTag = ({ variant }: TraitRarityTagProps) => {
  return (
    <div>
      {variant !== "common" &&
        <Box
          className={`shiningBg ${btnClassPicker(variant)}`}
          // bg={colorPicker(variant,true)}
          w='100px'
          textAlign='center'
          borderRadius='md'
          pt={1}
          pb={1}
          boxShadow='0px 6px 20px -2px rgba(25, 25, 26, 0.62);'
        >
          <Text
            fontWeight='bold'
            color='black'
          >{titleUpppercaseWord(variant)}</Text>
        </Box>
      }
    </div>
  )
}