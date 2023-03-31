import * as React from 'react';
import { TableCell, Tooltip, useTheme } from '@mui/material';
import { ColDef, Valuable, Identible, Tooltipable, Linkable } from './cell-definitions';
import { hash } from '../../../../hashing';
import { ModeContext } from '../../mode-context-provider';

export interface StringCell extends Identible, Valuable<string>, Tooltipable, Linkable {}

function renderStringCell(cell: StringCell, columnDef: ColDef<string>) {
  const theme = useTheme();
  const modeContext = React.useContext(ModeContext);

  function renderLink() {
    return cell.href ? (
      <a href={cell.href} target={cell.target ?? '_blank'}>{`${cell.value}${columnDef.suffix}`}</a>
    ) : (
      `${cell.value}${columnDef.suffix}`
    );
  }

  function renderTableCell() {
    return (
      <TableCell
        key={`${hash(cell.id + cell.value)}`}
        align={columnDef.align}
        sx={{ color: theme.enhancedTable[modeContext.mode].cellFontColor }}
      >
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

function stringFilterFn(cell: Valuable<unknown>, columnDef: ColDef<unknown>) {
  const stringCell = cell as unknown as Valuable<string>;
  const stringColumnDef = columnDef as unknown as ColDef<string>;
  return (filterValue: string): boolean => {
    const searchString = stringColumnDef.suffix ? `${stringCell.value}${stringColumnDef.suffix}` : stringCell.value;
    return searchString.toLowerCase().includes(filterValue.toLowerCase());
  };
}

export const StringColDef: ColDef<string> = {
  align: 'left',
  sortable: true,
  suffix: '',
  render: renderStringCell,
  comparator: stringComparator,
  filterFn: stringFilterFn
};
