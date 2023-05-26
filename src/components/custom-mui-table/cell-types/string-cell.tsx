import React, { useState } from 'react';
import { CellContext, Row } from '@tanstack/react-table';
import { TableCell, Typography } from '@mui/material';
import { Cell } from './cell';
import { renderLink, renderTooltip, renderTypography } from './common-render';

interface StringCellOptions {}

function StringCell<T>(ctx: CellContext<T, Cell<string>>, options?: StringCellOptions) {
  const [isEllipsed, setIsEllipsed] = useState(false);
  const fontSize = ctx.column.columnDef.meta?.fontSize || 'inherit';
  const cellObj = ctx.getValue();

  let render = <>{cellObj.value}</>;
  render = renderLink(render, cellObj);
  render = renderTypography(render, fontSize, setIsEllipsed);
  render = <TableCell align="left">{render}</TableCell>;
  render = renderTooltip(render, cellObj, isEllipsed);
  return render;
}

function stringComparator<T>(rowA: Row<T>, rowB: Row<T>, columnId: string): number {
  const cellA = rowA.getValue(columnId) as Cell<string>;
  const cellB = rowB.getValue(columnId) as Cell<string>;
  if (cellA.value < cellB.value) {
    return -1;
  }
  if (cellA.value > cellB.value) {
    return 1;
  }
  return 0;
}

export { StringCell, stringComparator };
