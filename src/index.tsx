import "setimmediate";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/color-mode'
import { UserProvider } from './utils/user';
import Popup from './component/Popup/Popup';
import GlobalStyles from "./component/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider
      resetCSS
      theme={extendTheme({
        config: {
          initialColorMode: 'dark',
          useSystemColorMode: false,
        },
      })}
    >
      <ColorModeScript initialColorMode="dark" />
      <UserProvider
        allowNullUser
        loadFromBackgroundScript
        mockUser={
          process.env.REACT_APP_NODE_ENV === 'development' ?
            {
              role: 'MEMBER',
              publicAddress: '0x000',
              isSubscriber: true,
              isFounder: false,
              membershipType: 'LIFETIME'
            }
            : undefined
        }
      >
        <Popup />
        <GlobalStyles />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
