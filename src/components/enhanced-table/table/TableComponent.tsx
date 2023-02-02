import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import * as React from 'react';
import { SortDirection, TableHeader } from './header-definitions';
import Row from './Row';
import { Identible } from './cell-types/cell-definitions';
import { getBackgroundColor, getSeperatorColor } from '../helpers';
import HeaderCell from './HeaderCell';
import { hash } from '../../../hashing';

interface TableComponentProps<DataDef> {
  headers: TableHeader<DataDef>[];
  rows: DataDef[];
  orderBy: keyof DataDef;
  order: SortDirection;
  showHeaders: boolean;
  tableSize: 'small' | 'medium';
}

function TableComponent<DataDef extends Identible>(props: TableComponentProps<DataDef>) {
  const theme = useTheme();
  const [headers, setHeaders] = React.useState<Map<number, JSX.Element[]>>(new Map());

  React.useEffect(() => {
    console.log('useEffect');
    setHeaders(generateHeadersRecursively(props.headers));
  }, [props.headers]);

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
            order={props.order}
            orderBy={props.orderBy}
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
            {[...headers.keys()].map((level) => (
              <TableRow>{headers.get(level)}</TableRow>
            ))}
          </TableHead>
        )}
        <TableBody>
          {props.rows.map((row) => {
            return <Row key={row.id} row={row} headers={props.headers} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
