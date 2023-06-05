import React, { useState } from 'react';
import { CellContext, FilterFn, Row, RowData } from '@tanstack/react-table';
import { TableCell } from '@mui/material';
import { Cell, getColumnId } from './cell';
import { renderLink, renderTooltip, renderTypography } from './common-render';

interface StringCellOptions {}

function StringCell<T>(ctx: CellContext<T, string>, options?: StringCellOptions) {
  const [isEllipsed, setIsEllipsed] = useState(false);
  const fontSize = ctx.column.columnDef.meta?.fontSize || 'inherit';
  const value = ctx.getValue();
  const columnId = getColumnId(ctx.column.id);
  const original = ctx.row.original as Record<string, RowData>;
  const cellObj = original[columnId] as Cell<string>;
  let render = <>{value}</>;
  render = renderLink(render, cellObj);
  render = renderTypography(render, fontSize, setIsEllipsed);
  render = <TableCell align="left">{render}</TableCell>;
  render = renderTooltip(render, cellObj, isEllipsed);
  return render;
}

function stringComparator<T>(rowA: Row<T>, rowB: Row<T>, columnId: string): number {
  // const id = getColumnId(columnId);
  const cellA = rowA.getValue(columnId) as Cell<string>;
  console.log(cellA);
  const cellB = rowB.getValue(columnId) as Cell<string>;
  if (cellA.value < cellB.value) {
    return -1;
  }
  if (cellA.value > cellB.value) {
    return 1;
  }
  return 0;
}

function stringFilter<TData>(row: Row<TData>, columnId: string, filterValue: string): boolean {
  const search = filterValue.toLowerCase();
  console.log(row.getValue(columnId));
  // return Boolean(
  //   row
  //     .getValue<string | null>(columnId)
  //     ?.toString()
  //     ?.toLowerCase()
  //     ?.includes(search)
  // )
  return true;
}

export { StringCell, stringComparator, stringFilter };
