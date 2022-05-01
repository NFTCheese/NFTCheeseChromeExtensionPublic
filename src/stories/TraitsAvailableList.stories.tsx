import React from 'react';
import { Center } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react';
import divineAnarchyAvailableNFTs from '../mockupData/divineAnarchyAvailableNFTs';
import TraitsAvailableList from '../component/TraitsAvailableList';
import GlobalStyles from '../component/GlobalStyles';

const meta: Meta = {
  title: 'TraitsAvailableList',
  component: TraitsAvailableList
}
export default meta;

const traits = divineAnarchyAvailableNFTs;


const Template: Story<React.ComponentProps<typeof TraitsAvailableList>> = (args) => (
  <Center
  >
    <TraitsAvailableList
      {...args}
    />
    <GlobalStyles/>
  </Center>
)

export const Default = Template.bind({})
Default.args = {
  NFTs: traits
}