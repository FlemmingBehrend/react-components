import * as React from 'react';
import { Theme, ThemeProvider, createTheme } from '@mui/material';
import EnhancedTable from '../enhanced-table';
import { Identible } from '../table/cells/types/identible';
import { StringCell, StringColDef } from '../table/cells/string-cell';
import { NumberCell, NumberColDef } from '../table/cells/number-cell';
import { EnhancedTableHeader } from '../table/header-definitions';
import { chooseMode } from './mode-helper';
import type { StoryObj } from '@storybook/react';

interface MinimalRowDef extends Identible {
  animal: StringCell;
  maxAge: NumberCell;
}

const headers: EnhancedTableHeader<MinimalRowDef>[] = [
  {
    label: 'Animal',
    dataType: 'animal',
    colDef: { ...StringColDef, align: 'center' }
  },
  {
    label: 'Max age',
    dataType: 'maxAge',
    colDef: NumberColDef,
    align: 'right',
    tooltip: 'The maximum age of the animal'
  }
];
const rows: MinimalRowDef[] = [
  {
    id: '1',
    animal: { value: 'Dog' },
    maxAge: { value: 15 }
  },
  {
    id: '2',
    animal: { value: 'Cat' },
    maxAge: { value: 20 }
  }
];

type Story = StoryObj<typeof EnhancedTable<MinimalRowDef>>;
export const Minimal: Story = (args: any) => (
  <ThemeProvider theme={chooseMode('light')}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
Minimal.args = { headers, rows };
