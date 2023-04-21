import * as React from 'react';
import Cell from '../cell';
import type { Tooltipable } from './types/tooltipable';
import type { Value } from './types/value';
import type { Linkable } from './types/linkable';
import type { ColDef } from './defs/base';

export interface NumberCell extends Value<number>, Tooltipable, Linkable {}

function renderNumberCell(cell: NumberCell, columnDef: ColDef<number>) {
  return (
    <React.Fragment>
      <Cell
        align={columnDef.align}
        tooltip={cell.tooltip}
        link={cell.href ? { href: cell.href, target: cell.target } : undefined}
      >
        {`${cell.value}${columnDef.suffix}`}
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

function numberFilterFn(cell: Value<number>, columnDef: ColDef<number>) {
  const numberCell = cell as unknown as Value<number>;
  const numberColumnDef = columnDef as unknown as ColDef<number>;
  return (filterValue: string): boolean => {
    const searchString = numberColumnDef.suffix
      ? `${numberCell.value}${numberColumnDef.suffix}`
      : numberCell.value.toString();
    return searchString.includes(filterValue);
  };
}

export const NumberColDef: ColDef<number> = {
  align: 'right',
  sortable: true,
  suffix: '',
  render: renderNumberCell,
  comparator: numberComparator,
  filterFn: numberFilterFn
};
