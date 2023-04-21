import * as React from 'react';
import { TableBody, useTheme } from '@mui/material';
import { EnhancedTableHeader } from './header-definitions';
import Row from './row';
import { getHeaderCells } from '../helpers';
import type { Identible } from './cells/types/identible';

interface TableContentProps<DataDef> {
  rows: DataDef[];
  headers: EnhancedTableHeader<DataDef>[];
  stripedRows: boolean;
  sortColumn?: keyof DataDef;
  sortDirection?: 'asc' | 'desc';
  filter: string;
  setVisibleRows: (no: number) => void;
  expandable: boolean;
}

function TableContent<DataDef extends Identible>(props: TableContentProps<DataDef>) {
  const [displayedRows, setDisplayedRows] = React.useState<DataDef[]>(props.rows);
  const theme = useTheme();

  const headers = React.useMemo(() => {
    const headerCells: EnhancedTableHeader<DataDef>[] = [];
    props.headers.forEach((header) => {
      if (header.subHeaders) {
        headerCells.push(...getHeaderCells(header.subHeaders));
      } else {
        headerCells.push(header);
      }
    });
    return headerCells;
  }, [props.headers]);

  React.useEffect(() => {
    if (props.filter) {
      const fValue = props.filter.toLowerCase();
      const filteredRows = props.rows.filter((row) => {
        let filters: Array<boolean> = [];
        for (const [key, cell] of Object.entries(row)) {
          const header = headers.find((header) => header.dataType === key);
          if (header && header.colDef && header.colDef.filterFn) {
            const filterFn = header.colDef.filterFn(cell, header.colDef);
            filters.push(filterFn(fValue));
          }
        }
        return !filters.every((element) => element === false);
      });
      setDisplayedRows(filteredRows);
    } else {
      setDisplayedRows(props.rows);
    }
  }, [props.filter]);

  React.useEffect(() => {
    if (props.sortColumn !== undefined) {
      const sortHeader = headers.find((header) => header.dataType === props.sortColumn);
      if (sortHeader && sortHeader.colDef && sortHeader.colDef.comparator) {
        const comparator = sortHeader.colDef.comparator(sortHeader.dataType);
        if (props.sortDirection === 'asc') {
          const asc = displayedRows.sort(comparator);
          setDisplayedRows([...asc]);
        } else {
          const desc = displayedRows.sort((a, b) => comparator(b, a));
          setDisplayedRows([...desc]);
        }
      }
    }
  }, [props.sortColumn, props.sortDirection]);

  React.useEffect(() => {
    props.setVisibleRows(displayedRows.length);
  }, [displayedRows.length]);

  function getRowColor(index: number): string {
    if (props.stripedRows) {
      return index % 2 === 0 ? theme.palette.background.default : theme.enhancedTable.cellStripedRowColor;
    } else {
      return theme.palette.background.default;
    }
  }
  return (
    <TableBody>
      {displayedRows.map((row, index) => {
        return (
          <Row
            key={crypto.randomUUID()}
            row={row}
            headers={headers}
            stripedRows={props.stripedRows}
            expandable={props.expandable}
            rowColor={getRowColor(index)}
          />
        );
      })}
    </TableBody>
  );
}

export default TableContent;
