import * as React from 'react';
import { CellContext, Row } from '@tanstack/react-table';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Cell } from './cell';
import { TableCell } from '@mui/material';
import { renderLink, renderTooltip } from './common-render';

interface BooleanCellOptions {
  imageMap: {
    true: React.ReactNode;
    false: React.ReactNode;
  };
}

const defaultImageMap: BooleanCellOptions['imageMap'] = {
  true: <CheckIcon />,
  false: <ClearIcon />
};

function BooleanCell<T>(ctx: CellContext<T, Cell<boolean>>, options?: BooleanCellOptions) {
  const cellObj = ctx.getValue();
  const imageMap = options?.imageMap || defaultImageMap;
  let render = <>{cellObj.value ? imageMap.true : imageMap.false}</>;
  render = renderLink(render, cellObj);
  render = <TableCell align="center">{render}</TableCell>;
  render = renderTooltip(render, cellObj, false);
  return render;
}

function booleanComparator<T>(rowA: Row<T>, rowB: Row<T>, columnId: string): number {
  const cellA = rowA.getValue(columnId) as Cell<boolean>;
  const cellB = rowB.getValue(columnId) as Cell<boolean>;
  if (cellA.value && cellB.value) {
    const aNumber = cellA.value ? 1 : 0;
    const bNumber = cellB.value ? 1 : 0;
    if (aNumber < bNumber) {
      return -1;
    }
    if (aNumber > bNumber) {
      return 1;
    }
    return 0;
  } else {
    if (!cellA.value) {
      return -1;
    }
    if (!cellB.value) {
      return 1;
    }
    return 0;
  }
}

export { BooleanCell, booleanComparator };
