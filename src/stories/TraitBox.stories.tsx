import { Meta, Story } from '@storybook/react';
import { NFTBox, NFT } from '../component/NFTBox';
import { Center } from '@chakra-ui/layout';
import GlobalStyles from '../component/GlobalStyles';
import { weiToEth } from '../utils/ethereum';

const meta: Meta = {
  title: 'Trait Box',
  component: NFTBox
}
export default meta;


const Template: Story<NFT> = (args) => (
  <Center height="100%" >
    <GlobalStyles />
    <NFTBox {...args} />
  </Center>
)

export const Legendary = Template.bind({})
Legendary.args = {
  totalSupply: 10001,
  image: 'https://lh3.googleusercontent.com/-_07IMew1vGOr8chc23tEyv1vVP4jub6FBqLFiKfQbQpjoJrIMxgKt6wOVW-PDLS23HVdsfQJWRhtin9GBNd3qa7lh2Ri4-MZenUTIo=w600',
  price: weiToEth(3e18),
  rarityScore: 90,
  name: 'Azuki #8690',
  rarityRank: 10,
  traits:
    [{
      "property": "Bloodline",
      "value": "Nubian",
      "uniqueScore": 0.1
    }, {
      "property": "Unique",
      "value": "Solomon",
      "uniqueScore": 0.01
    }, {
      "property": "Gender",
      "value": "Fema",
      "uniqueScore": 0.14
    }]
  ,
  isAvailable: true
}
