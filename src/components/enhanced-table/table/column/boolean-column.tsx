import * as React from 'react';
import { ColumnOptions, ImagableColumnOptions } from './column-options';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { BooleanCell } from '../cell/boolean-cell';
import Cell from '../cell/cell';
import { ColumnFunctions } from './column-functions';

function renderBooleanCell(cell: BooleanCell, columnOptions: ImagableColumnOptions) {
  return (
    <React.Fragment>
      <Cell
        align={columnOptions.align}
        tooltip={cell.tooltip}
        link={cell.href ? { href: cell.href, target: cell.target } : undefined}
      >
        {columnOptions.imageMap[`${cell.value}`]}
      </Cell>
    </React.Fragment>
  );
}

function booleanComparator<DataDef>(sortBy: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortBy] as unknown as BooleanCell;
    const bObj = b[sortBy] as unknown as BooleanCell;
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

const booleanColumnDefaults: ImagableColumnOptions & ColumnFunctions = {
  sortable: true,
  align: 'center',
  imageMap: {
    true: <CheckIcon />,
    false: <ClearIcon />
  },
  render(cell: BooleanCell, columnOptions: ColumnOptions) {
    return renderBooleanCell(cell, columnOptions as ImagableColumnOptions);
  },
  comparator: booleanComparator
};

export { booleanColumnDefaults };
