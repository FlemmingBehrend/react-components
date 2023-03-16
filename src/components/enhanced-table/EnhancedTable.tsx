import React, { PropsWithChildren } from 'react';
import { Box, Grid } from '@mui/material';
import FilterComponent from './table/FilterField';
import TableComponent from './table/TableComponent';
import { SortDirection, TableHeader } from './table/header-definitions';
import { calculateHeaderColspan } from './helpers';
import { Identible } from './table/cell-types/cell-definitions';

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
  orderBy?: keyof DataDef;
  order?: SortDirection;
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
          headers={props.headers}
          rows={props.rows}
          orderBy={props.orderBy ?? 'id'}
          order={props.order ?? 'desc'}
          tableSize={props.tableSize ?? 'small'}
          showHeaders={props.showHeaders ?? true}
        />
      </Grid>
    </Box>
  );
}

export default EnhancedTable;
