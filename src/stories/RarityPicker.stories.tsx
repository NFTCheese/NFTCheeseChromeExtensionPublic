import React from 'react'
import { useColorModeValue } from '@chakra-ui/react';
import { Story } from '@storybook/react'
import { Center } from '@chakra-ui/react'

import { UserProvider } from '../utils/user';
import RarityPicker from '../component/RarityPicker';
import GlobalStyles from '../component/GlobalStyles';

export default {
  title: 'RarityPicker',
  component: RarityPicker,
}

const Template: Story<React.ComponentProps<typeof RarityPicker>> = (args) => {
  const bg = useColorModeValue('opensea-light', 'nftcheese-bg.dark')
  return (
    <Center bg={bg} height="100%" width="100%">
      <UserProvider
        loadFromBackgroundScript={false}
        mockUser={{
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHhhMmJlYjM3NDkxNjZhMTc4NjYwYzQxMDI2MzhhMWJkNGU3MDYzZDY0In0.TJwVvhxBi1Dr0bIEh6Goz-476Z-2F1gGXh9lGSL7Iqw',
          isFounder: false,
          isSubscriber: true,
          membershipType: 'LIFETIME',
          publicAddress: '0xa2beb3749166a178660c4102638a1bd4e7063d64',
          role: 'MEMBER'
        }}
        >
          <RarityPicker {...args}/>
        </UserProvider>
        <GlobalStyles />
    </Center>
  )
}

export const Default = Template.bind({})
Default.args = {
  onSelect: (minVal, maxVal) => {console.log(minVal, maxVal)},
  maxRarity: 15123,
}
