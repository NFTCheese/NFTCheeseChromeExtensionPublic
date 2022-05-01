import type { ComponentStyleConfig } from '@chakra-ui/theme'
import { mode } from '@chakra-ui/theme-tools';

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const ButtonStyleConfig: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 8
  },
  variants: {
    solid: (props) => {
      switch (props.colorScheme) {
        case 'yellow':
          return {
            bg: 'yellow.500',
            color: 'yellow.50'
          };
        case 'green':
          return {
            bg: 'green.500',
            color: 'green.50'
          };
        case 'orange':
          return {
            bg: 'orange.500',
            color: 'orange.50',
          };
        case 'red':
          return {
            bg: 'red.500',
            color: 'red.50',
          };
        case 'blue':
          return {
            bg: 'blue.500',
            color: 'blue.50',
          };
        case 'gray':
          return {
            bg: mode('gray.100', 'gray.700')(props),
            color: mode('black', 'gray.200')(props),
            _hover: {
              bg: mode('gray.200', 'gray.600')(props),
            }
            // color: props.colorMode === 'dark' ? 'gray.200' : 'black'
          }
        default:
          return {};
      };
    }
  },
  defaultProps: {
    variant: 'solid',
  },
}

export default ButtonStyleConfig;