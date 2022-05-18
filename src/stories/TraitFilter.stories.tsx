import React from 'react';
import { Center } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import divineAnarchyAvailableNFTs from '../mockupData/divineAnarchyAvailableNFTs';
import TraitFilter from '../component/TraitFilter';
import GlobalStyles from '../component/GlobalStyles';

const meta: Meta = {
  title: 'TraitFilterThrough',
  component: TraitFilter,
};
export default meta;

const traits = divineAnarchyAvailableNFTs;

const Template: Story<React.ComponentProps<typeof TraitFilter>> = (args) => (
  <Center>
    <TraitFilter {...args} />
    <GlobalStyles />
  </Center>
);

export const Default = Template.bind({});
Default.args = {
  NFTs: traits,
};
