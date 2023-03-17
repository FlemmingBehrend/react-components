import * as React from 'react';
import { TableCell, Tooltip } from '@mui/material';
import { ColDef, Valuable, Identible, Tooltipable } from './cell-definitions';

export interface StringCell extends Valuable<string>, Identible, Tooltipable {}

function renderStringCell(cell: StringCell, columnDef: ColDef<string>) {
  function renderCellContent() {
    return (
      <TableCell key={cell.id} align={columnDef.align}>
        {cell.value as string}
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

function stringComparator<DataDef>(sortColumn: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortColumn] as unknown as { value: string };
    const bObj = b[sortColumn] as unknown as { value: string };
    if (aObj.value < bObj.value) {
      return -1;
    }
    if (aObj.value > bObj.value) {
      return 1;
    }
    return 0;
  };
}

export const StringColDef: ColDef<string> = {
  align: 'left',
  sortable: true,
  render: renderStringCell,
  comparator: stringComparator
};
