import React from 'react';
import { Story } from '@storybook/react';
import { Center } from '@chakra-ui/react';
import GlobalStyles from '../component/GlobalStyles';
import NFTInfoExtensionInjectable from '../component/NFTInfoExtensionInjectable';
import { MenuRenderer } from '../component/MenuRenderer';

export default {
  title: 'NFTInfoExtensionInjectable',
  component: NFTInfoExtensionInjectable,
};

const Template: Story<React.ComponentProps<typeof NFTInfoExtensionInjectable>> = (args) => (
  <Center p={10} bg="#000" width="100%">
    <GlobalStyles />
    <NFTInfoExtensionInjectable {...args} />
  </Center>
);

export const Default = Template.bind({});

Default.args = {
  rank: 1,
  totalSupply: 10000,
  avgPriceToday: 6,
  volumeToday: 10,
  floorPrice: 4.5,
  loadingPrices: false,
  loadingRarity: false,
  menuRenderer: MenuRenderer,
  chain: 'etherum',
  address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
  replaceImage: () => null,
  isAutoImageReplaced: false,
  price: 0.002,
};

Default.decorators = [(Story) => <Story />];
