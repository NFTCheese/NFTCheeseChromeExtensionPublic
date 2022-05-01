import React from 'react'
import { Story } from '@storybook/react'
import { Box, Center } from '@chakra-ui/react'
import SalesActivity from '../component/SalesActivity'
import { UserProvider } from '../utils/user'
import GlobalStyles from '../component/GlobalStyles'

export default {
  title: 'SalesActivity',
  component: SalesActivity,
}

const Template: Story<React.ComponentProps<typeof SalesActivity>> = (args) => (
  <UserProvider
    mockUser={{
      role: 'MEMBER',
      publicAddress: '0x000',
      isSubscriber: true,
      isFounder: false,
      membershipType: 'LIFETIME'
    }}
  >
    <Center height="100%" >
      <Box maxW={'600px'}>
        <SalesActivity {...args}/>
      </Box>
    </Center>
    <GlobalStyles />
  </UserProvider>
)

export const Default = Template.bind({})
Default.args = {
  collectionSlug: 'divineanarchy',
  collectingData: false,
  minRank: 1,
  maxRank: 2000,
  traits: []
}
