import React from 'react'
import { Story } from '@storybook/react'
import { Center } from '@chakra-ui/react'
import TraitSelection from '../component/TraitSelection'

// import Filters from '../components/SearchResults/Filters';

const traits = [{
  property: 'shoes',
  value: 'Nike Air jordans', uniqueScore: 0.142
},
  {
    property: 'background',
    value: 'mint', uniqueScore: 0.005
  },
  {
    property: 'body',
    value: 'tribal necklace',
    uniqueScore: 0.004,
  },
  {
    property: 'face',
    value: 'clout goggles',
    uniqueScore: 0.5,
  },
  {
    property: 'shoes',
    value: "Men's Coffee Sneakers - Stealth Black", uniqueScore: 0.012
  },
  {
    property: 'ear',
    value: 'big',
    uniqueScore: 0.02,
  },
  {
    property: 'glasses',
    value: 'transparent', uniqueScore: 0.051 
  },
  {
    property: 'shoes',
    value: 'Adidas NMD R1', uniqueScore: 0.442 
  },
  {
    property: 'shoes',
    value: "Men's Coffee Sneakers - Rebel White", uniqueScore: 0.052 
  },
  {
    property: 'jewelry',
    value: 'diamond watch', uniqueScore: 0.0155,
  },
  {
    property: 'shoes',
    value: 'Nike Air Max 90', uniqueScore: 0.042
  },
  {
    property: 'hair',
    value: 'comb-over', uniqueScore: 0.012,
  },
];

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
