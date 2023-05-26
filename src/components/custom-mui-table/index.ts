import { RowData } from '@tanstack/table-core';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    fontSize?: string | number;
  }
}

import type { Cell } from './cell-types/cell';
export type { Cell };
import { CustomMuiTable } from './custom-mui-table';
import { StringCell, stringComparator } from './cell-types/string-cell';
import { NumberCell } from './cell-types/number-cell';
import { BooleanCell, booleanComparator } from './cell-types/boolean-cell';

export { CustomMuiTable, StringCell, stringComparator, NumberCell, BooleanCell, booleanComparator };
