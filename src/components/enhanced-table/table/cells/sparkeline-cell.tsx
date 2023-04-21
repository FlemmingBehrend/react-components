import * as React from 'react';
import { useTheme } from '@mui/material';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Cell from '../cell';
import type { Tooltipable } from './types/tooltipable';
import type { Value } from './types/value';
import type { ColDef } from './defs/base';

export interface SparklineCell extends Value<number[]>, Tooltipable {
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

export const SparklineColDef: ColDef<number[]> = {
  sortable: true,
  align: 'center',
  render: renderSparklineCell,
  comparator: sparklineComparator
};
