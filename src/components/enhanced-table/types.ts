import { ColDef } from './table/cell-types/definition';

type CommonHeaderOptions = {
  /**
   * The displayed text value of the header.
   */
  label: string;

  /**
   * The colspan of the header.
   */
  colspan?: number;

  /**
   * The tooltip of the header.
   * @default undefined, no tooltip
   */
  tooltip?: string;
};

type Header<DataDef> = {
  subHeaders?: never;
  dataType: keyof DataDef;
  definition?: ColDef<unknown>;
};

type HeaderGroup<DataDef> = {
  subHeaders: TableHeader<DataDef>[];
  dataType?: never;
  definition?: never;
};

export type TableHeader<DataDef> = CommonHeaderOptions & (Header<DataDef> | HeaderGroup<DataDef>);
