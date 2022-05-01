import React from 'react'
import { Story } from '@storybook/react'
import { Center } from '@chakra-ui/react'
import TraitSelection from '../component/TraitSelection'

// import Filters from '../components/SearchResults/Filters';

const traits = [
  {
    property: 'background',
    value: 'mint',
    uniqueScore: 0.005
  },
  {
    property: 'body',
    value: 'tribal necklace',
    uniqueScore: 0.04
  },
  {
    property: 'face',
    value: 'clout goggles',
    uniqueScore: 0.5
  },
  {
    property: 'ear',
    value: 'big',
    uniqueScore: 0.02
  },
  {
    property: 'background',
    value: 'black',
    uniqueScore: 0.0051
  },
  {
    property: 'body',
    value: 'tribal shirt',
    uniqueScore: 0.042
  },
  {
    property: 'face',
    value: 'nice goggles',
    uniqueScore: 0.54
  },
  {
    property: 'ear',
    value: 'small',
    uniqueScore: 0.012
  },
]

export default {
  title: 'TraitSelection',
  component: TraitSelection,
}

const Template: Story<React.ComponentProps<typeof TraitSelection>> = (args) => (
  <Center height="100%" bg="#000" width="100%">
    <TraitSelection
      {...args}
    />
  </Center>
)

export const Default = Template.bind({})
Default.args = {
  traits,
  selectedTraits: traits.slice(0, 2),
  onSelect: console.log
}
