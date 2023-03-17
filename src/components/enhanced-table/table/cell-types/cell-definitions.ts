/**
 * This is the base column definition most of the other column definitions extend from.
 *
 * If a column contains text, numbers, dates or other things that can be rendered
 * as a JSX element it should extend from this.
 */
export interface ColDef<DataDef> {
  /**
   * If this is set to true the column will be sortable.
   */
  sortable: boolean;

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

  comparator?: <DataDef>(sortColumn: keyof DataDef) => (a: DataDef, b: DataDef) => number;
}

/**
 * This interface is implemented by items that needs to
 * be displayed in the table where each row requires a
 * unique identifier.
 */
export interface Identible extends Object {
  id: string;
}

/**
 * This interface is implemented by cells that support
 * tooltips.
 */
export interface Tooltipable {
  tooltip?: string | React.ReactNode;
}

export interface Valuable<T> {
  value: T;
}
