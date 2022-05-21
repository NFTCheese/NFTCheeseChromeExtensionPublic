import { extendTheme } from '@chakra-ui/react'
import ButtonStyleConfig from './ui/ButtonStyleConfig'
import { mode } from '@chakra-ui/theme-tools';
import SelectStyleConfig from './ui/SelectStyleConfig';
import TextStyleConfig from './ui/TextStyleConfig';

const parseCookies = () => {
  return document.cookie.split(';').reduce<Record<string, any>>((res, c) => {
    const [key, val] = c.trim().split('=').map(decodeURIComponent)
    try {
      return Object.assign(res, { [key]: JSON.parse(val) })
    } catch (e) {
      return Object.assign(res, { [key]: val })
    }
  }, {})
}

const getOpenSeaTheme = () => {
  // return 'dark';

  // TEMPORARY DISABLE LIGHT MODE
  const { theme } = parseCookies()
  console.log({ theme });
  return theme?.theme || 'light'
}

const theme = extendTheme({
  "colors": {
    blue: {
      500: '#00ACE6'
    },
    "green": {
      "50": "#EBF9F1",
      "100": "#C8EFD7",
      "200": "#A4E5BD",
      "300": "#80DAA3",
      "400": "#5DD08A",
      "500": "#00A537",
      "600": "#2E9E59",
      "700": "#227743",
      "800": "#174F2D",
      "900": "#0B2816"
    },
    "yellow": {
      "50": "#FFF9E5",
      "100": "#FFEFB8",
      "200": "#FFE58A",
      "300": "#FFDB5C",
      "400": "#E8AE00",
      "500": "#FFC700",
      "600": "#CC9F00",
      "700": "#997800",
      "800": "#665000",
      "900": "#332800"
    },
    'opensea-dark': '#202225',
    'opensea-light': '#FFFFFF',
    'nftcheese-bg-dark': '#2A2A2A',
    'nftcheese-bg-light': '#FFFFFF',
    'nftcheese-bg': {
      'dark': '#292929',
      'light': '#FFFFFF'
    },
    "gray": {
      "50": "#F2F2F2",
      "100": "#DBDBDB",
      "200": "#C4C4C4",
      "300": "#ADADAD",
      "400": "#969696",
      "500": "#808080",
      "600": "#666666",
      "700": "#4D4D4D",
      "800": "#333333",
      "900": "#1A1A1A"
    }
  },
  semanticTokens: {
    colors: {
      'text': {
        default: 'black',
        _dark: 'gray.300'
      },

      'accordion-label': {
        default: 'black',
        _dark: 'gray.100@'
      },

      'nftcheese-bg': {
        default: 'nftcheese-bg.light',
        _dark: 'nftcheese-bg.dark',
      },
      'card-bg': {
        default: 'gray.50',
        _dark: '#212121'
      },
      'card-shadow': {
        default: 'gray.500',
        _dark: '#000000'
      },
      'nft-bg': {
        default: 'white',
        _dark: '#212121'
      },
      'border-color': {
        default: '#CCCCCC',
        _dark: '#383838'
      },
      'layover-bg': {
        default: '#D6D6D6',
        _dark: '#474747'
      }
    }
  },
  components: {
    Button: ButtonStyleConfig,
    Select: SelectStyleConfig,
    Text: TextStyleConfig
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: getOpenSeaTheme(),
  },
})


theme.styles.global = (props: any) => {
  return {
    'html,body': {
      color: mode('gray.800', 'whiteAlpha.900')(props),
    }
  }
}
window.localStorage['chakra-ui-color-mode'] = theme.config.initialColorMode

export default theme
