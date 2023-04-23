import { ColumnOptions } from '../column/column-options';

interface HeaderOptions {
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
   * @default 1
   */
  colspan?: number;
}

interface EnhancedHeader<DataDef> extends HeaderOptions {
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
   * The is used for common column options.
   */
  columnOptions: ColumnOptions;
}

interface EnhancedHeaderGroup<DataDef> extends HeaderOptions {
  /**
   * A HeaderGroup can have subHeaders.
   *
   * These are the headers that are displayed
   * in the next row.
   *
   * Subheaders can be either a Header or a new HeaderGroup but the last
   * header rows can only contain EnhancedHeader types.
   */
  subHeaders: EnhancedHeader<DataDef>[];

  /**
   * A HeaderGroup can never have a dataType.
   */
  dataType?: never;

  /**
   * A HeaderGroup can never have a definition.
   */
  columnOptions?: never;
}

type EnhancedTableHeader<DataDef> = EnhancedHeader<DataDef> | EnhancedHeaderGroup<DataDef>;

type SortDirection = 'asc' | 'desc';

export type { EnhancedTableHeader, SortDirection };
