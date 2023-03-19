import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import * as React from 'react';
import { SortDirection, TableHeader } from './header-definitions';
import Row from './Row';
import { Identible } from './cell-types/cell-definitions';
import { getBackgroundColor, getHeaderCells, getSeperatorColor } from '../helpers';
import HeaderCell from './HeaderCell';
import { hash } from '../../../hashing';
import { common } from '@mui/material/colors';

interface TableComponentProps<DataDef> {
  headers: TableHeader<DataDef>[];
  rows: DataDef[];
  setVisibleRows: (no: number) => void;
  initialSortColumn: keyof DataDef;
  initialSortOrder: SortDirection;
  showHeaders: boolean;
  tableSize: 'small' | 'medium';
  stripedRows: boolean;
  filter: string;
}

function TableComponent<DataDef extends Identible>(props: TableComponentProps<DataDef>) {
  const theme = useTheme();
  const [headers, setHeaders] = React.useState<Map<number, JSX.Element[]>>(new Map());
  const [sortColumn, setSortColumn] = React.useState<keyof DataDef>(props.initialSortColumn);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(props.initialSortOrder);
  const [displayedRows, setDisplayedRows] = React.useState<DataDef[]>(props.rows);

  React.useEffect(() => {
    const headerCells = getHeaderCells<DataDef>(props.headers);

    if (props.showHeaders) {
      setHeaders(generateHeadersRecursively(props.headers));
      const sortHeader = headerCells.find((header) => header.dataType === sortColumn);
      if (sortHeader && sortHeader.definition && sortHeader.definition.comparator) {
        const comparator = sortHeader.definition.comparator(sortColumn);
        sortDirection === 'asc' ? displayedRows.sort(comparator) : displayedRows.sort((a, b) => comparator(b, a));
      }
    }

    if (props.filter) {
      const fValue = props.filter.toLowerCase();
      const filteredRows = props.rows.filter((row) => {
        let filters: Array<boolean> = [];
        for (const [key, cell] of Object.entries(row)) {
          const header = headerCells.find((header) => header.dataType === key);
          if (header && header.definition && header.definition.filterFn) {
            const filterFn = header.definition.filterFn(cell, header.definition);
            filters.push(filterFn(fValue));
          }
        }
        return !filters.every((element) => element === false);
      });
      setDisplayedRows(filteredRows);
      props.setVisibleRows(filteredRows.length);
    } else {
      setDisplayedRows(props.rows);
      props.setVisibleRows(props.rows.length);
    }
  }, [props.headers, props.rows, props.showHeaders, props.filter, sortColumn, sortDirection, setDisplayedRows]);

  function generateHeadersRecursively(
    headers: TableHeader<DataDef>[],
    headerRows: Map<number, JSX.Element[]> = new Map(),
    level: number = 0
  ): Map<number, JSX.Element[]> {
    if (!headers) return headerRows;

    headers.map((header, index) => {
      if (!headerRows.has(level)) {
        headerRows.set(level, []);
      }
      const backgroundColor = getBackgroundColor(theme, level);
      const fontColor = theme.enhancedTable?.headers?.fontColor || common.black;
      const fontWeight = theme.enhancedTable?.headers?.fontWeight || 'normal';
      const seperatorColor = getSeperatorColor(theme);

      headerRows
        .get(level)
        ?.push(
          <HeaderCell
            key={hash(header.label + index).toString()}
            header={header}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            setSortColumn={setSortColumn}
            setSortDirection={setSortDirection}
            backgroundColor={backgroundColor}
            fontColor={fontColor}
            fontWeight={fontWeight}
            seperatorColor={seperatorColor}
          />
        );
      if (header.subHeaders) {
        generateHeadersRecursively(header.subHeaders, headerRows, level + 1);
      }
    });
    return headerRows;
  }

  return (
    <TableContainer component={Paper}>
      <Table size={props.tableSize}>
        {props.showHeaders && (
          <TableHead>
            {[...headers.keys()].map((level) => {
              return <TableRow key={level}>{headers.get(level)}</TableRow>;
            })}
          </TableHead>
        )}
        <TableBody>
          {displayedRows.map((row) => {
            const headers = getHeaderCells<DataDef>(props.headers);
            return <Row key={row.id} row={row} headers={headers} stripedRows={props.stripedRows} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
