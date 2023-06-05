import { RowData } from '@tanstack/table-core';
import { Link } from './cell-types/cell';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    fontSize?: string | number;
    link?: Link;
    tooltip?: string;
  }
}

import type { Cell } from './cell-types/cell';
export type { Cell };
import { CustomMuiTable } from './custom-mui-table';
import { StringCell, stringComparator, stringFilter } from './cell-types/string-cell';
import { NumberCell } from './cell-types/number-cell';
import { BooleanCell, booleanComparator } from './cell-types/boolean-cell';

export { CustomMuiTable, StringCell, stringComparator, stringFilter, NumberCell, BooleanCell, booleanComparator };
