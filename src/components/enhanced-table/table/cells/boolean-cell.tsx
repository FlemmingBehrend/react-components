import * as React from 'react';
import { Identible, ImagableColDef, Tooltipable, Valuable } from './cell-definitions';
import { TableCell, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export interface BooleanCell extends Identible, Valuable<Boolean>, Tooltipable {}

function renderBooleanCell(cell: BooleanCell, columnDef: ImagableColDef<boolean>) {
  function renderCellContent(cell: BooleanCell) {
    return <span>{columnDef.imageMap[`${cell.value}`]}</span>;
  }

  return (
    <TableCell key={cell.id} align={columnDef.align}>
      {cell.tooltip ? <Tooltip title={cell.tooltip}>{renderCellContent(cell)}</Tooltip> : renderCellContent(cell)}
    </TableCell>
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
