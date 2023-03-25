import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import TestComponent from '../components/test-component';

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'TestComponent',
  component: TestComponent
} as ComponentMeta<typeof TestComponent>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof TestComponent> = (args) => <TestComponent {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
