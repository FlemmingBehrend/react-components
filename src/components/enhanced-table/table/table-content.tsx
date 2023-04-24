import * as React from 'react';
import { TableBody, useTheme } from '@mui/material';
import Row from './row';
import { getHeaderCells, columnIsFilterable, columnIsSortable } from '../helpers';
import type { Identible } from './cell/types/identible';
import { EnhancedTableHeader } from './header/header-options';

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
          const options = header?.columnOptions;
          if (columnIsFilterable(options)) {
            const fn = options.filterFn!(cell, options);
            filters.push(fn(fValue));
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
      if (!sortHeader) {
        console.warn('Sort column not found, this is probably a bug');
        return;
      }
      const options = sortHeader.columnOptions;
      if (columnIsSortable(options)) {
        const comparator = options.comparator!(sortHeader.dataType!);
        if (props.sortDirection === 'asc') {
          const sortedRows = displayedRows.sort(comparator);
          setDisplayedRows([...sortedRows]);
        } else {
          const sortedRows = displayedRows.sort((a, b) => comparator(b, a));
          setDisplayedRows([...sortedRows]);
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
            key={row.id}
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
