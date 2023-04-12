import { ColDef } from './cells/cell-definitions';

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

type EnhancedHeader<DataDef> = {
  /**
   * A Header on the lowest level of the table can never have subHeaders.
   */
  subHeaders?: never;

  /**
   * The data type of the column.
   * This is used to determine the cell type.
   */
  dataType: keyof DataDef;

  /**
   * The definition of the column.
   */
  definition: ColDef<string> | ColDef<number>;
};

type EnhancedHeaderGroup<DataDef> = {
  subHeaders: EnhancedTableHeader<DataDef>[];
  dataType?: never;
  definition?: never;
};

type EnhancedTableHeader<DataDef> = CommonHeaderOptions & (EnhancedHeader<DataDef> | EnhancedHeaderGroup<DataDef>);

type SortDirection = 'asc' | 'desc';

export type { EnhancedTableHeader, SortDirection, EnhancedHeader, EnhancedHeaderGroup };
