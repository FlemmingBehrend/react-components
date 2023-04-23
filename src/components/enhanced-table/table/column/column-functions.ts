import { Value } from '../cell/types/value';
import { ColumnOptions } from './column-options';

/**
 * This is the base interface for all functions supported by a column renderer.
 */
interface ColumnFunctions {
  /**
   * The render function for the column.
   *
   * This function will be called for every row in the table.
   *
   * @param cell The cell to render.
   * @param columnOptions The options for the column, these are shared among all rendered cells.
   * @returns A react node to render.
   */
  // eslint-disable-next-line no-unused-vars
  render: (cell: any, columnOptions: ColumnOptions) => React.ReactNode;

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
   * @param colDef The column definition of the cell
   * @returns a function that takes a filter value and returns true if the cell should be filtered out.
   */
  filterFn?: (cell: any, columnOptions: ColumnOptions) => (filterValue: string) => boolean;
}

export type { ColumnFunctions };
