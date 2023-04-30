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

const DEFAULT_TABLE_SEACHABLE = true;
const DEFAULT_TABLE_DISPLAY_NUMBER_OF_ROWS = true;
const DEFAULT_TABLE_SORTABLE = false;

interface CustomMuiTableProps {
  columns: any[];
  data: any[];
  searchable?: boolean;
  sortable?: boolean;
  displayNumberOfRows?: boolean;
  initialSort?: { id: string; desc: boolean };
  initialSearch?: string;
}

const searchFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  return filterFns.includesString(row, columnId, value, addMeta);
};

function MuiCustomTable(props: CustomMuiTableProps) {
  // Add default values for props that are not specified
  const searchable = props.searchable ?? DEFAULT_TABLE_SEACHABLE;
  const displayNumberOfRows = props.displayNumberOfRows ?? DEFAULT_TABLE_DISPLAY_NUMBER_OF_ROWS;
  const sortable = props.sortable ?? DEFAULT_TABLE_SORTABLE;

  const [searchValue, setSearchValue] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: props.data,
    columns: props.columns,
    state: {
      globalFilter: searchValue,
      sorting: sorting
    },
    onGlobalFilterChange: setSearchValue,
    onSortingChange: setSorting,
    enableGlobalFilter: searchable,
    enableSorting: sortable,
    globalFilterFn: searchFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  React.useEffect(() => {
    // setSearchValue('');
  }, [props.searchable]);

  React.useEffect(() => {
    props.initialSort && setSorting([props.initialSort]);
  }, [props.initialSort]);

  React.useEffect(() => {
    props.initialSearch && setSearchValue(props.initialSearch);
  }, []);

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        {searchable ? (
          <SearchComponent setSearchValue={setSearchValue} searchValue={searchValue} />
        ) : (
          <React.Fragment>&nbsp;</React.Fragment>
        )}
        {displayNumberOfRows && <NumberOfRowsComponent totalRows={getRowModel().rows.length} />}
      </Grid>
      <Grid container justifyContent="space-between" alignItems="flex-end">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <CustomMuiHeader key={header.id} header={header} />
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <pre>{JSON.stringify(sorting, null, 2)}</pre>
        <pre>{JSON.stringify(searchValue, null, 2)}</pre>
      </Grid>
    </Box>
  );
}

export default MuiCustomTable;
