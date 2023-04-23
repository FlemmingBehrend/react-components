import * as React from 'react';
import { Value } from '../cell/types/value';
import { ColumnOptions } from './column-options';
import { NumberCell } from '../cell/number-cell';
import Cell from '../cell/cell';
import { ColumnFunctions } from './column-functions';

function renderNumberCell(cell: NumberCell, columnOptions: ColumnOptions) {
  return (
    <React.Fragment>
      <Cell
        align={columnOptions.align}
        tooltip={cell.tooltip}
        link={cell.href ? { href: cell.href, target: cell.target } : undefined}
      >
        {`${cell.value}${columnOptions.suffix}`}
      </Cell>
    </React.Fragment>
  );
}

function numberComparator<DataDef>(sortColumn: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortColumn] as unknown as { value: number };
    const bObj = b[sortColumn] as unknown as { value: number };
    if (aObj.value < bObj.value) {
      return -1;
    }
    if (aObj.value > bObj.value) {
      return 1;
    }
    return 0;
  };
}

function numberFilterFn(cell: Value<number>, columnOptions: ColumnOptions) {
  return (filterValue: string): boolean => {
    const searchString = columnOptions.suffix ? `${cell.value}${columnOptions.suffix}` : cell.value.toString();
    return searchString.includes(filterValue);
  };
}

const numberColumnDefaults: ColumnOptions & ColumnFunctions = {
  align: 'right',
  sortable: true,
  suffix: '',
  render: renderNumberCell,
  comparator: numberComparator,
  filterFn: numberFilterFn
};

export { numberColumnDefaults };
