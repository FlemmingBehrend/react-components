import React from 'react';
import { ColDef, Identible, Suffixable, Tooltipable, Valuable } from './cell-definitions';
import Cell from '../cell';
import moment from 'moment';

export interface DateCell extends Identible, Valuable<Date>, Tooltipable, Suffixable {
  display?: 'date' | 'time' | 'datetime' | 'relative';
}

function renderDateCell(cell: DateCell, columnDef: ColDef<Date>) {
  let date = '';
  switch (cell.display) {
    case 'date':
      date = moment(cell.value).format('L');
      break;
    case 'time':
      date = moment(cell.value).format('LTS');
      break;
    case 'datetime':
      date = moment(cell.value).format('L LTS');
      break;
    case 'relative':
    default:
      date = moment(cell.value).fromNow();
      break;
  }
  return (
    <React.Fragment>
      <Cell align={columnDef.align} tooltip={cell.tooltip}>
        {cell.suffix ? `${date}${cell.suffix}` : date}
      </Cell>
    </React.Fragment>
  );
}

function dateComparator<DataDef>(sortColumn: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortColumn] as unknown as { value: Date };
    const bObj = b[sortColumn] as unknown as { value: Date };
    if (aObj.value && bObj.value) {
      const aDate = new Date(aObj.value).getTime();
      const bDate = new Date(bObj.value).getTime();
      if (aDate < bDate) {
        return -1;
      }
      if (aDate > bDate) {
        return 1;
      }
      return 0;
    } else {
      if (!aObj.value) {
        return -1;
      }
      if (!bObj.value) {
        return 1;
      }
      return 0;
    }
  };
}

function dateFilterFn(cell: Valuable<unknown>) {
  return (filterValue: string): boolean => {
    const dateCell = cell as DateCell;
    const from = moment(dateCell.value).fromNow();
    const searchString = dateCell.suffix ? `${from}${dateCell.suffix}` : from;
    return searchString.toLowerCase().includes(filterValue.toLowerCase());
  };
}

export const DateColDef: ColDef<Date> = {
  sortable: true,
  suffix: '',
  align: 'left',
  render: renderDateCell,
  comparator: dateComparator,
  filterFn: dateFilterFn
};
