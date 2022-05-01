import type { ComponentStyleConfig } from '@chakra-ui/theme'

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
const SelectStyleConfig: ComponentStyleConfig = {
  baseStyle: {
    borderColor: 'border-color',
    color: 'text',
  },
  variants: {
    outline: {
      borderColor: 'border-color',
    }
  }
}

export default SelectStyleConfig;