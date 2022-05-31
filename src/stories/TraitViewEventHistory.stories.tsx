import { Meta, Story } from '@storybook/react';
import React from 'react';
// import divineTraitViewEventHistory from '../mockupData/divineTraitViewEventHistory';
import TraitViewEventHistory from '../component/TraitViewEventHistory';





const meta: Meta = {
    title: 'Trait Event History',
    component: TraitViewEventHistory,
};

export default meta;

// const TraitViewEventHistory = divineTraitViewEventHistory;

const Template: Story<React.ComponentProps<typeof TraitViewEventHistory>> = () => (
    <>
        <TraitViewEventHistory />
    </>
);

export const Default = Template.bind({});

