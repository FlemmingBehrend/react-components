import { ColDef } from './cell-types/cell-definitions';

type CommonHeaderOptions = {
  /**
   * The displayed text value of the header.
   */
  label: string;

  /**
   * The tooltip of the header.
   * The tooltip will be displayed when the
   * user hovers over the header and follow the
   * mouse cursor.
   * @default undefined, no tooltip
   */
  tooltip?: string;

  /**
   * Align the header text.
   */
  align?: 'left' | 'center' | 'right';

  /**
   * The colspan of the header.
   */
  colspan: number;
};

export type EnhancedHeader<DataDef> = {
  subHeaders?: never;
  dataType: keyof DataDef;
  definition: ColDef<string> | ColDef<number>;
  width: string;
};

export type EnhancedHeaderGroup<DataDef> = {
  subHeaders: EnhancedTableHeader<DataDef>[];
  dataType?: never;
  definition?: never;
};

export type EnhancedTableHeader<DataDef> = CommonHeaderOptions &
  (EnhancedHeader<DataDef> | EnhancedHeaderGroup<DataDef>);

export type SortDirection = 'asc' | 'desc';
