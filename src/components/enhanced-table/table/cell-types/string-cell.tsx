import * as React from 'react';
import { TableCell } from '@mui/material';
import { ColDef, Valuable, Identible } from './cell-definitions';

export interface StringCell extends Valuable<string>, Identible {}

function renderStringCell(cell: StringCell, columnDef: ColDef<string>) {
  console.log(cell);
  return (
    <TableCell key={cell.id} align={columnDef.align}>
      {cell.value as string}
    </TableCell>
  );
}

export const StringColDef: ColDef<string> = {
  align: 'left',
  sortable: true,
  render: renderStringCell
};
