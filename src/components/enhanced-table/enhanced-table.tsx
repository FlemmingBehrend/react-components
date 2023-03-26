import * as React from 'react';
import { Box, Grid, Paper, Table, TableContainer, useTheme } from '@mui/material';
import FilterComponent from './table/filter-field';
import { SortDirection, EnhancedTableHeader } from './table/header-definitions';
import { Identible } from './table/cell-types/cell-definitions';
import NumberOfRowsComponent from './table/number-of-rows';
import TableHeaders from './table/table-headers';
import TableContent from './table/table-content';
import {
  DEFAULT_TABLE_DISPLAY_NUMBER_OF_ROWS,
  DEFAULT_TABLE_EXPANDABLE,
  DEFAULT_TABLE_FILTERABLE,
  DEFAULT_TABLE_SHOW_HEADERS,
  DEFAULT_TABLE_SIZE,
  DEFAULT_TABLE_SORT_DIRECTION,
  DEFAULT_TABLE_STRIPED_ROWS
} from './default-values';
import { applyTableTheme } from './table-theme-property-creator';
import EnhancedThemeContextProvider from './table-theme-context-provider';

export interface EnhancedTableProps<DataDef> {
  /**
   * The rows of the table
   */
  rows: DataDef[];

  /**
   * The headers of the table
   */
  headers: EnhancedTableHeader<DataDef>[];

  /**
   * If 'true' the table will show the headers
   * @default true
   */
  showHeaders?: boolean;

  /**
   * The table will start with this column sorted
   * @default undefined, no column will be sorted
   */
  initialSortColumn?: keyof DataDef;

  /**
   * The table will start with this sort direction
   * @default 'asc'
   */
  initialSortDirection?: SortDirection;

  /**
   * If 'true' the table will support filtering of data
   * with a search bar at the top.
   * @default true
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

  /**
   * If 'true' each row can be expanded to show more details.
   * @default false
   */
  expandable?: boolean;
}

function EnhancedTable<DataDef extends Identible>(props: EnhancedTableProps<DataDef>) {
  const theme = useTheme();
  const [sortColumn, setSortColumn] = React.useState<keyof DataDef | undefined>(props.initialSortColumn);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(
    props.initialSortDirection ?? DEFAULT_TABLE_SORT_DIRECTION
  );
  const [filter, setFilter] = React.useState('');
  const [visibleRows, setVisibleRows] = React.useState(props.rows.length);

  applyTableTheme(theme);

  const filterable = props.filterable ?? DEFAULT_TABLE_FILTERABLE;
  const showHeaders = props.showHeaders ?? DEFAULT_TABLE_SHOW_HEADERS;
  const expandable = props.expandable ?? DEFAULT_TABLE_EXPANDABLE;
  const tableSize = props.tableSize ?? DEFAULT_TABLE_SIZE;
  const stripedRows = props.stripedRows ?? DEFAULT_TABLE_STRIPED_ROWS;
  const displayNumberOfRows = props.displayNumberOfRows ?? DEFAULT_TABLE_DISPLAY_NUMBER_OF_ROWS;

  return (
    theme.palette.enhancedTable && (
      <EnhancedThemeContextProvider mode={theme.palette.mode}>
        <Box sx={{ mt: 2 }}>
          <Grid container justifyContent="space-between" alignItems="flex-end">
            {filterable ? <FilterComponent setFilter={setFilter} /> : <React.Fragment>&nbsp;</React.Fragment>}
            {displayNumberOfRows && <NumberOfRowsComponent totalRows={visibleRows} />}
          </Grid>
          <Grid container justifyContent="space-between" alignItems="flex-end">
            <TableContainer component={Paper}>
              <Table size={tableSize}>
                {showHeaders && (
                  <TableHeaders
                    headers={props.headers}
                    sortColumn={sortColumn}
                    setSortColumn={setSortColumn}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    expandable={expandable}
                  />
                )}
                <TableContent
                  rows={props.rows}
                  headers={props.headers}
                  stripedRows={stripedRows}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  filter={filter}
                  setVisibleRows={setVisibleRows}
                  expandable={expandable}
                ></TableContent>
              </Table>
            </TableContainer>
          </Grid>
        </Box>
      </EnhancedThemeContextProvider>
    )
  );
}

export default EnhancedTable;
