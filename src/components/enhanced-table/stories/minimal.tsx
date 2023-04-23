import * as React from 'react';
import { ThemeProvider } from '@mui/material';
import EnhancedTable from '../enhanced-table';
import { Identible } from '../table/cell/types/identible';
import { StringCell } from '../table/cell/string-cell';
import { stringColumnDefaults } from '../table/column/string-column';
import { chooseMode } from './mode-helper';
import type { StoryObj } from '@storybook/react';
import { EnhancedTableHeader } from '../table/header/header-options';
import { NumberCell } from '../table/cell/number-cell';
import { numberColumnDefaults } from '../table/column/number-column';

interface Data extends Identible {
  animal: StringCell;
  age: NumberCell;
}

const rows: Data[] = [
  {
    id: '1',
    animal: { value: 'Dog' },
    age: { value: 5 }
  },
  {
    id: '2',
    animal: { value: 'Cat' },
    age: { value: 3 }
  }
];

const headers: EnhancedTableHeader<Data>[] = [
  {
    dataType: 'animal',
    label: 'Animal',
    columnOptions: stringColumnDefaults
  },
  {
    dataType: 'age',
    label: 'Age',
    align: 'right',
    columnOptions: numberColumnDefaults
  }
];

type Story = StoryObj<typeof EnhancedTable<Data>>;
export const Minimal: Story = (args: any) => (
  <ThemeProvider theme={chooseMode('light')}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
Minimal.args = { headers, rows };
