import { Meta, Story } from '@storybook/react';
import React from 'react';
// import divineTraitFilter from '../mockupData/divineTraitFilter';
import TraitListingChart from '../component/TraitListingChart';




const meta: Meta = {
    title: 'TraitListChart',
    component: TraitListingChart,
};

export default meta;

// const traitFilter = divineTraitFilter;

const Template: Story<React.ComponentProps<typeof TraitListingChart>> = () => (
    <>
        <TraitListingChart  />
    </>
);

export const Default = Template.bind({});

// Default.args = {
//     allTraits,
// };
