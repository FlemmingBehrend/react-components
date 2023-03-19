import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import * as React from 'react';
import { SortDirection, TableHeader } from './header-definitions';
import Row from './Row';
import { Identible } from './cell-types/cell-definitions';
import { getBackgroundColor, getHeaderCells, getSeperatorColor } from '../helpers';
import HeaderCell from './HeaderCell';
import { hash } from '../../../hashing';

interface TableComponentProps<DataDef> {
  headers: TableHeader<DataDef>[];
  rows: DataDef[];
  initialSortColumn: keyof DataDef;
  initialSortOrder: SortDirection;
  showHeaders: boolean;
  tableSize: 'small' | 'medium';
  stripedRows: boolean;
}

function TableComponent<DataDef extends Identible>(props: TableComponentProps<DataDef>) {
  const theme = useTheme();
  const [headers, setHeaders] = React.useState<Map<number, JSX.Element[]>>(new Map());
  const [sortColumn, setSortColumn] = React.useState<keyof DataDef>(props.initialSortColumn);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(props.initialSortOrder);

  React.useEffect(() => {
    setHeaders(generateHeadersRecursively(props.headers));
    const headerCells = getHeaderCells<DataDef>(props.headers);
    const sortHeader = headerCells.find((header) => header.dataType === sortColumn);
    if (sortHeader && sortHeader.definition && sortHeader.definition.comparator) {
      const comparator = sortHeader.definition.comparator(sortColumn);
      sortDirection === 'asc' ? props.rows.sort(comparator) : props.rows.sort((a, b) => comparator(b, a));
    }
  }, [props.headers, props.rows, sortColumn, sortDirection]);

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
          {props.rows.map((row) => {
            const headers = getHeaderCells<DataDef>(props.headers);
            return <Row key={row.id} row={row} headers={headers} stripedRows={props.stripedRows} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
