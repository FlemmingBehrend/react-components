import * as React from 'react';
import { ColumnOptions } from './column-options';
import { StringCell } from '../cell/string-cell';
import Cell from '../cell/cell';
import { ColumnFunctions } from './column-functions';
import { hash } from '../../../../hashing';

function renderStringCell(cell: StringCell, columnOptions: ColumnOptions) {
  return (
    <Cell
      key={hash(`${cell.value}${cell.tooltip}${cell.href}${cell.target}`)}
      align={columnOptions.align}
      tooltip={cell.tooltip}
      link={cell.href ? { href: cell.href, target: cell.target } : undefined}
    >
      {`${cell.value}${columnOptions.suffix}`}
    </Cell>
  );
}

function stringComparator<DataDef>(sortColumn: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortColumn] as unknown as { value: string };
    const bObj = b[sortColumn] as unknown as { value: string };
    if (aObj.value < bObj.value) {
      return -1;
    }
    if (aObj.value > bObj.value) {
      return 1;
    }
    return 0;
  };
}

function stringFilterFn(cell: StringCell, columnOptions: ColumnOptions) {
  return (filterValue: string): boolean => {
    const searchString = columnOptions.suffix ? `${cell.value}${columnOptions.suffix}` : cell.value;
    return searchString.toLowerCase().includes(filterValue.toLowerCase());
  };
}

const stringColumnDefaults: ColumnOptions & ColumnFunctions = {
  align: 'left',
  sortable: true,
  suffix: '',
  render: renderStringCell,
  comparator: stringComparator,
  filterFn: stringFilterFn
};

export { stringColumnDefaults };
