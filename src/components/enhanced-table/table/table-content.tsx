import * as React from 'react';
import { TableBody, useTheme } from '@mui/material';
import { EnhancedTableHeader } from './header-definitions';
import { Identible } from './cell-types/cell-definitions';
import { getDarkerColor, getLighterColor } from '../helpers';
import { TableThemeContext } from '../table-theme-context-provider';
import Row from './row';

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

function getHeaderCells<DataDef>(headers: EnhancedTableHeader<DataDef>[]): EnhancedTableHeader<DataDef>[] {
  const headerCells: EnhancedTableHeader<DataDef>[] = [];
  headers.forEach((header) => {
    if (header.subHeaders) {
      headerCells.push(...getHeaderCells(header.subHeaders));
    } else {
      headerCells.push(header);
    }
  });
  return headerCells;
}

function TableContent<DataDef extends Identible>(props: TableContentProps<DataDef>) {
  const [displayedRows, setDisplayedRows] = React.useState<DataDef[]>(props.rows);
  const theme = useTheme();
  const tableTheme = React.useContext(TableThemeContext);

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
          if (header && header.definition && header.definition.filterFn) {
            const filterFn = header.definition.filterFn(cell, header.definition);
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
      if (sortHeader && sortHeader.definition && sortHeader.definition.comparator) {
        const comparator = sortHeader.definition.comparator(sortHeader.dataType);
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
      return index % 2 === 0
        ? theme.palette.background.default
        : tableTheme.mode === 'dark'
        ? getDarkerColor(theme.palette.primary.main, 90)
        : getLighterColor(theme.palette.primary.main, 90);
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
