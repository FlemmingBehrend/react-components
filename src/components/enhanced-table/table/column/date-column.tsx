import * as React from 'react';
import moment from 'moment';
import { Value } from '../cell/types/value';
import type { ColumnOptions } from './column-options';
import Cell from '../cell/cell';
import { DateCell } from '../cell/date-cell';
import { ColumnFunctions } from './column-functions';

function renderDateCell(cell: DateCell, columnOptions: ColumnOptions) {
  let date = '';
  switch (cell.display) {
    case 'date':
      date = moment(cell.value).format('L');
      break;
    case 'time':
      date = moment(cell.value).format('LT');
      break;
    case 'datetime':
      date = moment(cell.value).format('L LT');
      break;
    case 'relative':
    default:
      date = moment(cell.value).fromNow();
      break;
  }
  return (
    <React.Fragment>
      <Cell align={columnOptions.align} tooltip={cell.tooltip}>
        {columnOptions.suffix ? `${date}${columnOptions.suffix}` : date}
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

function dateFilterFn(cell: Value<Date>, columnOptions: ColumnOptions) {
  return (filterValue: string): boolean => {
    const dateCell = cell;
    const from = moment(dateCell.value).fromNow();
    const searchString = columnOptions.suffix ? `${from}${columnOptions.suffix}` : from;
    return searchString.toLowerCase().includes(filterValue.toLowerCase());
  };
}

const dateColumnDefaults: ColumnOptions & ColumnFunctions = {
  sortable: true,
  suffix: '',
  align: 'left',
  render: renderDateCell,
  comparator: dateComparator,
  filterFn: dateFilterFn
};

export { dateColumnDefaults };
