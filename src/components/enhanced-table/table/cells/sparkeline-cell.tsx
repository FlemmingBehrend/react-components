import * as React from 'react';
import { ColDef, Identible, Tooltipable, Valuable } from './cell-definitions';
import Cell from '../cell';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useTheme } from '@mui/material';

export interface SparklineCell extends Identible, Valuable<number[]>, Tooltipable {
  color?: string;
  heigth?: number;
  width?: number;
}

function renderSparklineCell(cell: SparklineCell, columnDef: ColDef<number[]>) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Cell align={columnDef.align} tooltip={cell.tooltip}>
        <Sparklines height={cell.heigth} width={cell.width} data={cell.value}>
          <SparklinesLine color={cell.color ?? theme.palette.primary.contrastText} />
        </Sparklines>
      </Cell>
    </React.Fragment>
  );
}

function sparklineComparator<DataDef>(sortColumn: keyof DataDef) {
  return (a: DataDef, b: DataDef) => {
    const aObj = a[sortColumn] as unknown as SparklineCell;
    const bObj = b[sortColumn] as unknown as SparklineCell;
    // find latest value in sparkline aObj.value
    // find latest value in sparkline bObj.value
    // compare latest values
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

export const SparklineColDef: ColDef<number[]> = {
  sortable: true,
  align: 'center',
  render: renderSparklineCell,
  comparator: sparklineComparator
};
