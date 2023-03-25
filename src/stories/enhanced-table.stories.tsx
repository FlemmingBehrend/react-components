import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { defaultTable, simpleTableNoHeader } from './enhanced-table-stories/simple-table';
import { fiveHeaderGrouping } from './enhanced-table-stories/subheaders-table';
import { EnhancedTable } from '../components';

export default {
  title: 'EnhancedTable',
  component: EnhancedTable
} as ComponentMeta<typeof EnhancedTable>;

export { defaultTable, simpleTableNoHeader, fiveHeaderGrouping };
