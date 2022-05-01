import { Meta, Story } from '@storybook/react';
import { TraitRarityTag, TraitRarityTagProps } from '../component/TraitRarityTag';
import { Center } from '@chakra-ui/layout';
import GlobalStyles from '../component/GlobalStyles';

const meta: Meta = {
  title: 'Trait Rarity Tag',
  component: TraitRarityTag,
  argTypes: {
    variant: {
      defaultValue: 'common'
    }
  }
}
export default meta;


const Template: Story<TraitRarityTagProps> = (args) => {
  return (
    <Center height="100%" >
      <GlobalStyles />
      <TraitRarityTag {...args} />
    </Center>
  )
}

export const Legendary = Template.bind({})
export const Common = Template.bind({})
Legendary.args = {
  variant: 'legend'
}
