import React from 'react'
import { Story } from '@storybook/react'
import { Center } from '@chakra-ui/react'
import PriceRangePicker from '../component/PriceRangePicker'

export default {
  title: 'PriceRangePicker',
  component: PriceRangePicker,
}

const Template: Story<React.ComponentProps<typeof PriceRangePicker>> = (args) => (
  <Center height="100%" width="100%">
    <PriceRangePicker {...args}/>
  </Center>
)

export const Default = Template.bind({})
Default.args = {

}
