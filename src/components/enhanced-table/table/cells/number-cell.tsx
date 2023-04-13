import * as React from 'react';
import { ColDef, Valuable, Identible, Tooltipable, Linkable } from './cell-definitions';
import Cell from '../cell';

export interface NumberCell extends Identible, Valuable<number>, Tooltipable, Linkable {}

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

function numberFilterFn(cell: Valuable<unknown>, columnDef: ColDef<unknown>) {
  const numberCell = cell as unknown as Valuable<number>;
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
  ellipsis: false,
  render: renderNumberCell,
  comparator: numberComparator,
  filterFn: numberFilterFn
};
