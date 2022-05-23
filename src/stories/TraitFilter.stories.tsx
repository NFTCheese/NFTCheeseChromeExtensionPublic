import { Meta, Story } from '@storybook/react';
import React from 'react';
// import divineTraitFilter from '../mockupData/divineTraitFilter';
import TraitFilter from '../component/TraitFilter';


 const allTraits = [
  {
    traitTitle: 'Type',
    traitProperties: [
      { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Type' },
      { traitType: 'Blue', rarenessPercentage: 5, traitTitle: 'Type' },
      { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Type' },
    ]
  },

  {
    traitTitle: 'Special',
    traitProperties: [
      { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Special' },
      { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Special' },
      { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Special' }]
  },


  {
    traitTitle: 'Clothing',
    traitProperties: [
      { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Clothing' },
      { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Clothing' },
      { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Clothing' }]
  },
  {
    traitTitle: 'Offhand',
    traitProperties: [
      { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Offhand' },
      { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Offhand' },
      { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Offhand' }]
  },
  {
    traitTitle: 'Hair',
    traitProperties: [
      { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Hair' },
      { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Hair' },
      { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Hair' }]
  },
  {
    traitTitle: 'HeadGear',
    traitProperties: [
      { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'HeadGear' },
      { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'HeadGear' },
      { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'HeadGear' }]
  },


]



const meta: Meta = {
  title: 'TraitFilter',
  component: TraitFilter,
};

export default meta;

// const traitFilter = divineTraitFilter;

const Template: Story<React.ComponentProps<typeof TraitFilter>> = (args) => (
  <>
    <TraitFilter {...args} />
  </>
);

export const Default = Template.bind({});

Default.args = {
  allTraits,
};
