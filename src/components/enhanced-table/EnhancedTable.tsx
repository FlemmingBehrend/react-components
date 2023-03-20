import React, { PropsWithChildren } from 'react';
import { Box, Grid, Paper, Table, TableContainer, useTheme } from '@mui/material';
import FilterComponent from './table/FilterField';
import { SortDirection, TableHeader } from './table/header-definitions';
import { Identible } from './table/cell-types/cell-definitions';
import NumberOfRowsComponent from './table/NumberOfRows';
import TableHeaders from './table/TableHeaders';
import TableContent from './table/TableContent';

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
  const [sortColumn, setSortColumn] = React.useState<keyof DataDef | undefined>(props.initialSortColumn);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(props.initialSortDirection ?? 'desc');

  const [filter, setFilter] = React.useState('');
  const [visibleRows, setVisibleRows] = React.useState(props.rows.length);

  const filterable = props.filterable ?? true;
  const showHeaders = props.showHeaders ?? true;

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        {filterable ? <FilterComponent setFilter={setFilter} /> : <React.Fragment>&nbsp;</React.Fragment>}
        <NumberOfRowsComponent totalRows={visibleRows} color={theme.enhancedTable?.numberOfRowColor ?? 'DarkGray'} />
      </Grid>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <TableContainer component={Paper}>
          <Table size={props.tableSize ?? 'small'}>
            {showHeaders && (
              <TableHeaders
                headers={props.headers}
                initialSortColumn={props.initialSortColumn}
                initialSortOrder={props.initialSortDirection ?? 'desc'}
                sortColumn={sortColumn}
                setSortColumn={setSortColumn}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
              />
            )}
            <TableContent
              rows={props.rows}
              headers={props.headers}
              stripedRows={props.stripedRows}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              filter={filter}
              setVisibleRows={setVisibleRows}
            ></TableContent>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
}

export default EnhancedTable;
