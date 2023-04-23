import { Meta } from '@storybook/react';
import { EnhancedTable } from '.';
import { Minimal } from './stories/minimal';
import { ColumnTypes } from './stories/column-types';
import { MultiHeader } from './stories/multi-header';

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
} as Meta<typeof EnhancedTable>;

export { Minimal };
