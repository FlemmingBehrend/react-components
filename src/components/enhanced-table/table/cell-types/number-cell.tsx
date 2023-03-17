import * as React from 'react';
import { TableCell, Tooltip } from '@mui/material';
import { ColDef, Valuable, Identible, Tooltipable } from './cell-definitions';

export interface NumberCell extends Valuable<number>, Identible, Tooltipable {}

function renderNumberCell(cell: NumberCell, columnDef: ColDef<number>) {
  function renderCellContent() {
    return (
      <TableCell key={cell.id} align={columnDef.align}>
        {cell.value as number}
      </TableCell>
    );
  }

  function renderWithTooltip() {
    return (
      <Tooltip title={cell.tooltip} followCursor>
        {renderCellContent()}
      </Tooltip>
    );
  }

  return cell.tooltip ? renderWithTooltip() : renderCellContent();
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

export const NumberColDef: ColDef<number> = {
  align: 'right',
  sortable: true,
  render: renderNumberCell,
  comparator: numberComparator
};
