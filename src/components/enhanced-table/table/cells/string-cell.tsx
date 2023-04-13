import * as React from 'react';
import { ColDef, Valuable, Identible, Tooltipable, Linkable } from './cell-definitions';
import Cell from '../cell';

export interface StringCell extends Identible, Valuable<string>, Tooltipable, Linkable {}

function renderStringCell(cell: StringCell, columnDef: ColDef<string>) {
  return (
    <React.Fragment key={crypto.randomUUID()}>
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

function stringFilterFn(cell: Valuable<unknown>, columnDef: ColDef<unknown>) {
  const stringCell = cell as unknown as Valuable<string>;
  const stringColumnDef = columnDef as unknown as ColDef<string>;
  return (filterValue: string): boolean => {
    const searchString = stringColumnDef.suffix ? `${stringCell.value}${stringColumnDef.suffix}` : stringCell.value;
    return searchString.toLowerCase().includes(filterValue.toLowerCase());
  };
}

export const StringColDef: ColDef<string> = {
  align: 'left',
  sortable: true,
  suffix: '',
  ellipsis: true,
  render: renderStringCell,
  comparator: stringComparator,
  filterFn: stringFilterFn
};
