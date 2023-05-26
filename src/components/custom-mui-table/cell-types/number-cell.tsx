import { CellContext, Row } from '@tanstack/react-table';
import React, { useState } from 'react';
import { Cell } from './cell';
import { renderLink, renderTooltip, renderTypography } from './common-render';
import { TableCell, Typography } from '@mui/material';

interface NumberCellOptions {}

function NumberCell<T>(ctx: CellContext<T, Cell<number>>, options?: NumberCellOptions) {
  const [isEllipsed, setIsEllipsed] = useState(false);
  const fontSize = ctx.column.columnDef.meta?.fontSize || 'inherit';
  const cellObj = ctx.getValue();

  let render = <>{cellObj.value}</>;
  render = renderLink(render, cellObj);
  render = renderTypography(render, fontSize, setIsEllipsed);
  render = <TableCell align="right">{render}</TableCell>;
  render = renderTooltip(render, cellObj, isEllipsed);
  return render;
}

function numberComparator<T>(rowA: Row<T>, rowB: Row<T>, columnId: string): number {
  const cellA = rowA.getValue(columnId) as Cell<number>;
  const cellB = rowB.getValue(columnId) as Cell<number>;
  if (cellA.value < cellB.value) {
    return -1;
  }
  if (cellA.value > cellB.value) {
    return 1;
  }
  return 0;
}

export { NumberCell, numberComparator };
