import * as React from 'react';
import TestComponent from './test-component';

export default {
  component: TestComponent,
  title: 'TestComponent'
};

const Template = (args) => <TestComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Button'
};
