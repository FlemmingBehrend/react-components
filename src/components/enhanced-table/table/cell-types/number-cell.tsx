import * as React from 'react';
import { TableCell, Tooltip } from '@mui/material';
import { ColDef, Valuable, Identible, Tooltipable, Linkable } from './cell-definitions';

export interface NumberCell extends Identible, Valuable<number>, Tooltipable, Linkable {}

function renderNumberCell(cell: NumberCell, columnDef: ColDef<number>) {
  function renderLink() {
    return cell.href ? (
      <a href={cell.href} target={cell.target ?? '_blank'}>{`${cell.value}${columnDef.suffix}`}</a>
    ) : (
      `${cell.value}${columnDef.suffix}`
    );
  }

  function renderTableCell() {
    return (
      <TableCell key={cell.id} align={columnDef.align}>
        {renderLink()}
      </TableCell>
    );
  }

  function renderWithTooltip() {
    return (
      <Tooltip title={cell.tooltip} followCursor>
        {renderTableCell()}
      </Tooltip>
    );
  }

  return cell.tooltip ? renderWithTooltip() : renderTableCell();
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
  suffix: '',
  render: renderNumberCell,
  comparator: numberComparator
};
