import React, { PropsWithChildren } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import FilterComponent from './table/FilterField';
import TableComponent from './table/TableComponent';
import { SortDirection, TableHeader } from './table/header-definitions';
import { calculateHeaderColspan } from './helpers';
import { Identible } from './table/cell-types/cell-definitions';
import NumberOfRowsComponent from './table/NumberOfRows';

declare module '@mui/material/styles' {
  interface Theme {
    enhancedTable: {
      stripedRowsColor: string;
      numberOfRowColor: string;
      headers: {
        fontWeight: 'bold' | 'normal';
        fontColor: string;
        backgroundColor: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    enhancedTable?: {
      stripedRowsColor?: string;
      numberOfRowColor?: string;
      headers?: {
        fontWeight?: 'bold' | 'normal';
        fontColor?: string;
        backgroundColor?: string;
      };
    };
  }
}

export interface EnhancedTableProps<DataDef> {
  /**
   * The rows of the table
   */
  rows: DataDef[];

  /**
   * The headers of the table
   */
  headers: TableHeader<DataDef>[];

  /**
   * If 'true' the table will show the headers
   * @default true
   */
  showHeaders?: boolean;

  /**
   * The table will start with this column sorted
   * @default 'id'
   */
  initialSortColumn?: keyof DataDef;

  /**
   * The table will start with this sort direction
   * @default 'desc'
   */
  initialSortDirection?: SortDirection;

  /**
   * If 'true' the table will support filtering of data
   * with a search bar at the top.
   * @default false
   */
  filterable?: boolean;

  /**
   * If 'true' every other row will render in another color
   * Will not work as expected if `expandable` is set to `true`
   * the expanded rows will always be rendered in the same color
   * @default false
   */
  stripedRows?: boolean;

  /**
   * The size of the table
   * @default 'small'
   * @see https://mui.com/components/tables/#sizes
   */
  tableSize?: 'small' | 'medium';

  /**
   * If 'true' the table will display the number of rows in the table.
   * @default true
   */
  displayNumberOfRows?: boolean;
}

function EnhancedTable<DataDef extends Identible>(props: PropsWithChildren<EnhancedTableProps<DataDef>>) {
  const theme = useTheme();
  const [filter, setFilter] = React.useState('');
  const [visibleRows, setVisibleRows] = React.useState(props.rows.length);

  props.headers?.map((header) => {
    calculateHeaderColspan(header);
  });
  const filterable = props.filterable ?? true;

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        {filterable ? (
          <FilterComponent setFilter={setFilter} filter={filter} />
        ) : (
          <React.Fragment>&nbsp;</React.Fragment>
        )}
        <NumberOfRowsComponent totalRows={visibleRows} color={theme.enhancedTable?.numberOfRowColor ?? 'DarkGray'} />
      </Grid>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <TableComponent
          headers={props.headers}
          rows={props.rows}
          setVisibleRows={setVisibleRows}
          initialSortColumn={props.initialSortColumn ?? 'id'}
          initialSortOrder={props.initialSortDirection ?? 'desc'}
          tableSize={props.tableSize ?? 'small'}
          showHeaders={props.showHeaders ?? true}
          stripedRows={props.stripedRows ?? false}
          filter={filter}
        />
      </Grid>
    </Box>
  );
}

export default EnhancedTable;
