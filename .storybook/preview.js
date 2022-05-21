import { useToolbarActions } from 'storybook-addon-toolbar-actions'
import store from '../src/state/store'
import {
  ChakraProvider,
  ColorModeScript,
  Box,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'
import theme from '../src/theme'
import { Provider } from 'react-redux'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const Container = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  useToolbarActions('colorMode', <SunIcon />, {
    onClick: () => {
      toggleColorMode()
    },
  })
  return (
    <Box
      width="100%"
      height="100vh"
      bg={'nftcheese-bg'}
    >
      {children}
    </Box>
  )
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Container>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Story />
        </Container>
      </ChakraProvider>
    </Provider>
  ),
]
