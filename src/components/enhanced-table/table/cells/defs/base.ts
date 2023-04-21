import { Value } from '../types/value';

/**
 * This is the base column definition most of the other column definitions extend from.
 *
 * If a column contains text, numbers, dates or other things that can be rendered
 * as a JSX element it should extend from this.
 */
interface ColDef<DataDef> {
  /**
   * If this is set to true the column will be sortable.
   */
  sortable: boolean;

  /**
   * This value may be displayed in the end of other values in the column.
   */
  suffix?: string;

  /**
   * The alignment of content of the column.
   */
  align: 'left' | 'right' | 'center';

  /**
   * The render function for the column.
   *
   * This function will be called for every row in the table.
   *
   * @param cell The cell to render.
   * @param columnDefinition The specific column definition.
   * @returns A react node to render.
   */
  // eslint-disable-next-line no-unused-vars
  render: (cell: any, columnDefinition: ColDef<DataDef>) => React.ReactNode;

  /**
   * The comparator function for the column.
   *
   * @param sortColumn The column to sort by.
   * @returns A comparator function that can be used to sort the data.
   */
  comparator?: <DataDef>(sortColumn: keyof DataDef) => (a: DataDef, b: DataDef) => number;

  /**
   * The filter function for the column.
   *
   * @param cell The cell to filter
   * @param columnDef The column definition of the cell
   * @returns a function that takes a filter value and returns true if the cell should be filtered out.
   */
  filterFn?: (cell: Value<DataDef>, columnDef: ColDef<DataDef>) => (filterValue: string) => boolean;
}

export type { ColDef };
