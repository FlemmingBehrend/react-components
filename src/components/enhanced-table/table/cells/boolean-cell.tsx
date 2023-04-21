import * as React from 'react';
import Cell from '../cell';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import type { Value } from './types/value';
import type { Tooltipable } from './types/tooltipable';
import type { Linkable } from './types/linkable';
import type { ImagableColDef } from './defs/imagable';

export interface BooleanCell extends Value<Boolean>, Tooltipable, Linkable {}

function renderBooleanCell(cell: BooleanCell, columnDef: ImagableColDef<boolean>) {
  return (
    <React.Fragment>
      <Cell
        align={columnDef.align}
        tooltip={cell.tooltip}
        link={cell.href ? { href: cell.href, target: cell.target } : undefined}
      >
        {columnDef.imageMap[`${cell.value}`]}
      </Cell>
    </React.Fragment>
  );
}

function booleanComparator<DataDef>(sortBy: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortBy] as unknown as { value: boolean };
    const bObj = b[sortBy] as unknown as { value: boolean };
    if (aObj.value && bObj.value) {
      const aNumber = aObj.value ? 1 : 0;
      const bNumber = bObj.value ? 1 : 0;
      if (aNumber < bNumber) {
        return -1;
      }
      if (aNumber > bNumber) {
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

export const BooleanColDef: ImagableColDef<boolean> = {
  sortable: true,
  align: 'center',
  render: (rows, columnDefinition) => renderBooleanCell(rows, columnDefinition as ImagableColDef<boolean>),
  comparator: booleanComparator,
  imageMap: {
    true: <CheckIcon />,
    false: <ClearIcon />
  }
};
