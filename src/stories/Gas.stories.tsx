import { Meta, Story } from '@storybook/react';
import { GasBox, GasBoxProps } from '../component/GasBox';

const meta: Meta = {
  title: 'Gas Box',
  component: GasBox,
  argTypes: {
    priorityFee: {
      defaultValue: 0
    },
    maxFee: {
      defaultValue: 0
    },
    probability: {
      defaultValue: 0
    },
    isRecommended: {
      defaultValue: false
    }

  }

}
export default meta;

const GasBoxTemplate: Story<GasBoxProps> = (args) => <GasBox {...args} />

export const Recommended = GasBoxTemplate.bind({})
export const noRecommended = GasBoxTemplate.bind({})
Recommended.args = {
  priorityFee: 100,
  maxFee: 150,
  probability: 95,
  isRecommended: true
}
