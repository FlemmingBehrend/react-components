import React, { PropsWithChildren } from 'react';
import { Box, Grid } from '@mui/material';
import FilterComponent from './table/FilterField';
import TableComponent from './table/TableComponent';
import { TableHeader } from './types';
import { calculateHeaderColspan } from './helpers';
import { Identible } from './table/cell-types/definition';

declare module '@mui/material/styles' {
  interface Theme {
    enhancedTable: {
      tableHeader: {
        backgroundColor: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    enhancedTable?: {
      tableHeader?: {
        backgroundColor: string;
      };
    };
  }
}

export interface EnhancedTableProps<DataDef> {
  rows: DataDef[];
  headers: TableHeader<DataDef>[];
  rowHeight?: number;
  showHeaders?: boolean;
  tableSize?: 'small' | 'medium';
}

function EnhancedTable<DataDef extends Identible>(props: PropsWithChildren<EnhancedTableProps<DataDef>>) {
  props.headers?.map((header) => {
    calculateHeaderColspan(header);
  });

  return (
    <Box sx={{ mt: 2 }}>
      <FilterComponent />
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <TableComponent
          showHeaders={props.showHeaders ?? true}
          headers={props.headers}
          rows={props.rows}
          tableSize={props.tableSize ?? 'small'}
        />
      </Grid>
    </Box>
  );
}

export default EnhancedTable;
