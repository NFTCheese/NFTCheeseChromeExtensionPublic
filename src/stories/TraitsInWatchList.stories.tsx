import React from 'react';
import { Box } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react';
import TraitsInWatchList from '../component/TraitsInWatchList';

const meta: Meta = {
  title: 'Traits Watch List',
  component: TraitsInWatchList
}
export default meta;

const traits = [
  {
    contractAddress: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    totalSupply: 10001,
    image: "https://lh3.googleusercontent.com/YzKA1_0BoSdS2KadlovqwrM9sjNZ5wQ1cJERMvonl3_x9ltKWCmSaxbiStGO4cNcVADWgob6eIQHpKxwXw7KZGYbJzmldHLWOlREEg=s128",
    price: 3,
    rarityScore: 90,
    name: 'Rare Traits of Azuki #8690',
    openseaURL: `https://opensea.io/assets/0xc631164b6cb1340b5123c9162f8558c866de1926/4703`,
    tokenID: '8690',
    rarityRank: 1,
    traits:
      [{
        "property": "Weapon",
        "value": "Base Buster",
        "uniqueScore": 0.01
      }, {
        "property": "Eyes",
        "value": "Piercer Eyes",
        "uniqueScore": 0.01
      }, {
        "property": "Hair",
        "value": "Black Hair Tie",
        "uniqueScore": 0.43
      }, {
        "property": "Clothes",
        "value": "Bruce Lee Tracksuit",
        "uniqueScore": 0.73
      }, {
        "property": "Mask",
        "value": "Metal Mempo",
        "uniqueScore": 1.07
      }, {
        "property": "Bloodline",
        "value": "Genesis",
        "uniqueScore": 2.52
      }, {
        "property": "Background",
        "value": "9",
        "uniqueScore": 6.57
      }, {
        "property": "Faction",
        "value": "Hero",
        "uniqueScore": 49.95
      }, {
        "property": "Gender",
        "value": "Female",
        "uniqueScore": 49.97
      }]
    ,
    isAvailable: false
  },
  {
    contractAddress: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    totalSupply: 10001,
    image: "https://lh3.googleusercontent.com/YzKA1_0BoSdS2KadlovqwrM9sjNZ5wQ1cJERMvonl3_x9ltKWCmSaxbiStGO4cNcVADWgob6eIQHpKxwXw7KZGYbJzmldHLWOlREEg=s128",
    price: 3,
    rarityScore: 90,
    openseaURL: `https://opensea.io/assets/0xc631164b6cb1340b5123c9162f8558c866de1926/4703`,
    tokenID: '8690',
    name: 'Rare Traits of Azuki #8690',
    rarityRank: 100,
    traits:
      [{
        "property": "Weapon",
        "value": "Base Buster",
        "uniqueScore": 0.01
      }, {
        "property": "Eyes",
        "value": "Piercer Eyes",
        "uniqueScore": 0.01
      }, {
        "property": "Hair",
        "value": "Black Hair Tie",
        "uniqueScore": 0.43
      }, {
        "property": "Clothes",
        "value": "Bruce Lee Tracksuit",
        "uniqueScore": 0.73
      }, {
        "property": "Mask",
        "value": "Metal Mempo",
        "uniqueScore": 1.07
      }, {
        "property": "Bloodline",
        "value": "Genesis",
        "uniqueScore": 2.52
      }, {
        "property": "Background",
        "value": "9",
        "uniqueScore": 6.57
      }, {
        "property": "Faction",
        "value": "Hero",
        "uniqueScore": 49.95
      }, {
        "property": "Gender",
        "value": "Female",
        "uniqueScore": 49.97
      }]
    ,
    isAvailable: false
  },
  {
    totalSupply: 10001,
    contractAddress: '0x495f947276749ce646f68ac8c248420045cb7b5e',
    image: "https://lh3.googleusercontent.com/YzKA1_0BoSdS2KadlovqwrM9sjNZ5wQ1cJERMvonl3_x9ltKWCmSaxbiStGO4cNcVADWgob6eIQHpKxwXw7KZGYbJzmldHLWOlREEg=s128",
    price: 3,
    rarityScore: 90,
    openseaURL: `https://opensea.io/assets/0xc631164b6cb1340b5123c9162f8558c866de1926/4703`,
    tokenID: '8690',
    name: 'Rare Traits of Azuki #8690',
    rarityRank: 10,
    traits:
      [{
        "property": "Weapon",
        "value": "Base Buster",
        "uniqueScore": 0.01
      }, {
        "property": "Eyes",
        "value": "Piercer Eyes",
        "uniqueScore": 0.01
      }, {
        "property": "Hair",
        "value": "Black Hair Tie",
        "uniqueScore": 0.43
      }, {
        "property": "Clothes",
        "value": "Bruce Lee Tracksuit",
        "uniqueScore": 0.73
      }, {
        "property": "Mask",
        "value": "Metal Mempo",
        "uniqueScore": 1.07
      }, {
        "property": "Bloodline",
        "value": "Genesis",
        "uniqueScore": 2.52
      }, {
        "property": "Background",
        "value": "9",
        "uniqueScore": 6.57
      }, {
        "property": "Faction",
        "value": "Hero",
        "uniqueScore": 49.95
      }, {
        "property": "Gender",
        "value": "Female",
        "uniqueScore": 49.97
      }]
    ,
    isAvailable: false
  }
]


const Template: Story<React.ComponentProps<typeof TraitsInWatchList>> = (args) => (
  <Box
    bg="black"
  >
    <TraitsInWatchList
      {...args}
    />
  </Box>

)

export const Default = Template.bind({})
Default.args = {
  NFTs: traits
}