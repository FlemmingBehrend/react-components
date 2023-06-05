import * as React from 'react';
import {
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  filterFns,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableContainer,
  useTheme,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from '@mui/material';
import SearchComponent from './search-field';
import NumberOfRowsComponent from './number-of-rows';
import { getBackgroundColor } from '../enhanced-table/helpers';
import { blue } from '@mui/material/colors';
import CustomMuiHeader from './custom-mui-header';
import CustomMuiCell from './custom-mui-cell';
import { isNumberCell, isStringCell } from './cell-types/cell';

const DEFAULT_TABLE_SEACHABLE = true;
const DEFAULT_TABLE_DISPLAY_NUMBER_OF_ROWS = true;
const DEFAULT_TABLE_SORTABLE = false;
const DEFAULT_TABLE_HEADER_FONT_SIZE = '0.875rem';
const DEFAULT_TABLE_COLUMN_FONT_SIZE = '0.875rem';

interface CustomMuiTableProps {
  columns: any[];
  columnsWidth?: Array<number | string>;
  data: any[];
  searchable?: boolean;
  sortable?: boolean;
  size?: 'small' | 'medium';
  width?: string | number;
  displayNumberOfRows?: boolean;
  initialSort?: { id: string; desc: boolean };
  initialSearch?: string;
  headerFontSize?: string | number;
  columnFontSize?: string | number;
}

const searchFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  console.log('searchFilter', value, columnId);
  const obj = row.getValue(columnId);
  if (typeof obj === 'object') {
    if (isStringCell(obj)) {
      return obj.value.toLowerCase().includes(value.toLowerCase());
    } else if (isNumberCell(obj)) {
      return obj.value === value;
    }
  }

  return false;
};

export function CustomMuiTable(props: CustomMuiTableProps) {
  // Add default values for props that are not specified
  const searchable = props.searchable ?? DEFAULT_TABLE_SEACHABLE;
  const displayNumberOfRows = props.displayNumberOfRows ?? DEFAULT_TABLE_DISPLAY_NUMBER_OF_ROWS;
  const sortable = props.sortable ?? DEFAULT_TABLE_SORTABLE;
  const headerFontSize = props.headerFontSize ?? DEFAULT_TABLE_HEADER_FONT_SIZE;
  const columnFontSize = props.columnFontSize ?? DEFAULT_TABLE_COLUMN_FONT_SIZE;

  const [searchValue, setSearchValue] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    state: {
      sorting: sorting,
      globalFilter: searchValue
    },
    onGlobalFilterChange: setSearchValue,
    onSortingChange: setSorting,
    enableGlobalFilter: searchable,
    enableSorting: sortable,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: searchFilter,
    debugAll: false
  });

  React.useEffect(() => {
    setSearchValue('');
  }, [props.searchable]);

  React.useEffect(() => {
    props.initialSort && setSorting([props.initialSort]);
  }, [props.initialSort]);

  React.useEffect(() => {
    props.initialSearch && setSearchValue(props.initialSearch);
  }, []);

  function renderColGroup(columnWidths: Array<number | string>) {
    const numberOfHeaders = table.getHeaderGroups()[0].headers.length;
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
        {searchable ? (
          <SearchComponent setSearchValue={setSearchValue} searchValue={searchValue} />
        ) : (
          <React.Fragment>&nbsp;</React.Fragment>
        )}
        {displayNumberOfRows && <NumberOfRowsComponent totalRows={table.getRowModel().rows.length} />}
      </Grid>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <TableContainer component={Paper}>
          <Table
            size={props.size ?? 'small'}
            sx={{ width: props.width ?? '100%', tableLayout: props.columnsWidth ? 'fixed' : 'auto' }}
          >
            {props.columnsWidth && props.columnsWidth.length > 0 && (
              <colgroup>{renderColGroup(props.columnsWidth)}</colgroup>
            )}

            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <CustomMuiHeader key={header.id} header={header} fontSize={headerFontSize} />
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      console.log(row.getVisibleCells().length);
                      cell.column.columnDef.meta = {
                        fontSize: columnFontSize
                      };
                      const props = { ...cell.getContext(), key: crypto.randomUUID() };
                      return flexRender(cell.column.columnDef.cell, props);
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
      </Grid>
    </Box>
  );
}
