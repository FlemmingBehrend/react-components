import * as React from 'react';
import { TableCell } from '@mui/material';
import { ColDef, Cell, Identible } from './definition';

export interface NumberCell extends Cell<number>, Identible {}

function renderNumberCell(cell: NumberCell, columnDef: ColDef<number>) {
  console.log(cell);
  return (
    <TableCell key={cell.id} align={columnDef.align}>
      {cell.value as number}
    </TableCell>
  );
}

export const NumberColDef: ColDef<number> = {
  align: 'right',
  sortable: true,
  render: renderNumberCell
};
