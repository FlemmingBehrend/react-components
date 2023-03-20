import * as React from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import Row from './Row';
import { TableHeader } from './header-definitions';
import { getHeaderCells } from '../helpers';
import { Identible } from './cell-types/cell-definitions';

interface TableContentProps<DataDef> {
  rows: DataDef[];
  headers: TableHeader<DataDef>[];
  stripedRows?: boolean;
  sortColumn?: keyof DataDef;
  sortDirection?: 'asc' | 'desc';
  filter: string;
  setVisibleRows: (no: number) => void;
}

function TableContent<DataDef extends Identible>(props: TableContentProps<DataDef>) {
  const [displayedRows, setDisplayedRows] = React.useState<DataDef[]>(props.rows);

  const headers = getHeaderCells<DataDef>(props.headers);

  React.useEffect(() => {
    const rows: DataDef[] = [];
    if (props.filter) {
      const fValue = props.filter.toLowerCase();
      const filteredRows = props.rows.filter((row) => {
        let filters: Array<boolean> = [];
        for (const [key, cell] of Object.entries(row)) {
          const header = headers.find((header) => header.dataType === key);
          if (header && header.definition && header.definition.filterFn) {
            const filterFn = header.definition.filterFn(cell, header.definition);
            filters.push(filterFn(fValue));
          }
        }
        return !filters.every((element) => element === false);
      });
      rows.push(...filteredRows);
    } else {
      rows.push(...props.rows);
    }

    if (props.sortColumn !== undefined) {
      const sortHeader = headers.find((header) => header.dataType === props.sortColumn);
      if (sortHeader && sortHeader.definition && sortHeader.definition.comparator) {
        const comparator = sortHeader.definition.comparator(sortHeader.dataType);
        props.sortDirection === 'asc' ? rows.sort(comparator) : rows.sort((a, b) => comparator(b, a));
      }
    }

    setDisplayedRows(rows);
    props.setVisibleRows(rows.length);
  }, [props.filter, props.sortDirection, props.sortColumn]);

  return (
    <TableBody>
      {displayedRows.map((row) => {
        return <Row key={row.id} row={row} headers={headers} stripedRows={props.stripedRows ?? false} />;
      })}
    </TableBody>
  );
}

export default TableContent;
