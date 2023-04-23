import * as React from 'react';
import { SparklineCell } from '../cell/sparkeline-cell';
import { ColumnOptions } from './column-options';
import { useTheme } from '@mui/material';
import Cell from '../cell/cell';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { ColumnFunctions } from './column-functions';

function renderSparklineCell(cell: SparklineCell, columnOptions: ColumnOptions) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Cell align={columnOptions.align} tooltip={cell.tooltip}>
        <Sparklines height={cell.heigth} width={cell.width} data={cell.value}>
          <SparklinesLine color={cell.color ?? theme.palette.text.primary} />
        </Sparklines>
      </Cell>
    </React.Fragment>
  );
}

function sparklineComparator<DataDef>(sortColumn: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortColumn] as unknown as SparklineCell;
    const bObj = b[sortColumn] as unknown as SparklineCell;
    const lastestA = aObj.value[aObj.value.length - 1];
    const lastestB = bObj.value[bObj.value.length - 1];
    if (lastestA < lastestB) {
      return -1;
    }
    if (lastestA > lastestB) {
      return 1;
    }
    return 0;
  };
}

const sparklineColumnDefaults: ColumnOptions & ColumnFunctions = {
  sortable: true,
  align: 'center',
  render: renderSparklineCell,
  comparator: sparklineComparator
};

export { sparklineColumnDefaults };
