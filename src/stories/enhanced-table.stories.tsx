import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { defaultTable, simpleTableNoHeader } from './enhanced-table-stories/simple-table';
import { fourLevelDark, fourLevelLight } from './enhanced-table-stories/subheaders-table';
import { EnhancedTable } from '../components';

export default {
  title: 'EnhancedTable',
  component: EnhancedTable,
  argTypes: {
    rows: {
      control: {
        disable: true
      }
    },
    headers: {
      control: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof EnhancedTable>;

const FourLevelLightTemplate: ComponentStory<typeof EnhancedTable> = (args: any) => {
  return fourLevelLight(args);
};
export const FourLevelLight = FourLevelLightTemplate.bind({});
FourLevelLight.args = {
  showHeaders: true,
  stripedRows: true,
  filterable: true,
  displayNumberOfRows: true,
  expandable: false
};

const FourLevelDarkTemplate: ComponentStory<typeof EnhancedTable> = (args: any) => {
  return fourLevelDark(args);
};
export const FourLevelDark = FourLevelDarkTemplate.bind({});
FourLevelDark.args = {
  showHeaders: true,
  stripedRows: true,
  filterable: true,
  displayNumberOfRows: true,
  expandable: false
};
