import * as React from 'react';
import { Box, Grid, Paper, Table, TableContainer, useTheme } from '@mui/material';
import FilterComponent from './table/filter-field';
import { SortDirection, EnhancedTableHeader } from './table/header-definitions';
import { Identible } from './table/cells/types/identible';
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
  DEFAULT_TABLE_STRIPED_ROWS,
  DEFAULT_THEME
} from './default-values';
import { EnhancedTableTheme } from './themes';
import { getHeaderCells } from './helpers';

declare module '@mui/material/styles' {
  interface Theme {
    enhancedTable: EnhancedTableTheme;
  }
  interface ThemeOptions {
    enhancedTable?: EnhancedTableTheme;
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
  headers: EnhancedTableHeader<DataDef>[];

  /**
   * An array of strings or numbers that represent the width of each column.
   *
   * A number will be interpreted as a pixel value.
   * A string can be any valid CSS value, e.g. '10%', 'auto', '100px'.
   *
   * - if the array is shorter than the number of columns,
   * the last value in the array is used for the remaining columns
   * - if the array is longer than the number of columns, the extra values are ignored.
   * - if the array is empty or undefined, we set tableLayout to 'auto' and let the browser figure it out.
   * @default undefined, the browser will figure it out
   */
  columnWidths?: Array<number | string>;

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
  // Fail fast if required props are not provided
  if (!props.rows) {
    throw new Error('The rows property is required');
  }
  if (!props.headers) {
    throw new Error('The headers property is required');
  }

  // State of the component
  const theme = useTheme();
  const [sortColumn, setSortColumn] = React.useState<keyof DataDef | undefined>(props.initialSortColumn);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(
    props.initialSortDirection ?? DEFAULT_TABLE_SORT_DIRECTION
  );
  const [filter, setFilter] = React.useState('');
  const [visibleRows, setVisibleRows] = React.useState(props.rows?.length);

  // Determine default values for optional props
  const filterable = props.filterable ?? DEFAULT_TABLE_FILTERABLE;
  const showHeaders = props.showHeaders ?? DEFAULT_TABLE_SHOW_HEADERS;
  const expandable = props.expandable ?? DEFAULT_TABLE_EXPANDABLE;
  const tableSize = props.tableSize ?? DEFAULT_TABLE_SIZE;
  const stripedRows = props.stripedRows ?? DEFAULT_TABLE_STRIPED_ROWS;
  const displayNumberOfRows = props.displayNumberOfRows ?? DEFAULT_TABLE_DISPLAY_NUMBER_OF_ROWS;

  if (!theme.enhancedTable) {
    theme.enhancedTable = { ...DEFAULT_THEME };
  }

  function renderColGroup(columnWidths: Array<number | string>) {
    const numberOfHeaders = getHeaderCells(props.headers).length;
    if (columnWidths.length < numberOfHeaders) {
      const lastWidth = columnWidths[columnWidths.length - 1];
      for (let i = columnWidths.length; i < numberOfHeaders; i++) {
        columnWidths.push(lastWidth);
      }
    } else if (columnWidths.length > numberOfHeaders) {
      columnWidths = columnWidths.slice(0, numberOfHeaders);
    }
    return columnWidths.map((width, index) => {
      return <col key={index} style={{ width }} />;
    });
  }

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        {filterable ? <FilterComponent setFilter={setFilter} /> : <React.Fragment>&nbsp;</React.Fragment>}
        {displayNumberOfRows && <NumberOfRowsComponent totalRows={visibleRows} />}
      </Grid>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <TableContainer component={Paper}>
          <Table size={tableSize} sx={{ width: '100%', tableLayout: 'fixed' }}>
            {props.columnWidths && props.columnWidths.length > 0 && (
              <colgroup>
                {props.expandable && <col style={{ width: '60px' }} />}
                {renderColGroup(props.columnWidths)}
              </colgroup>
            )}
            {showHeaders && (
              <TableHeaders
                headers={props.headers}
                sortColumn={sortColumn}
                setSortColumn={setSortColumn}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                renderExpandableHeader={expandable}
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
  );
}

export default EnhancedTable;
