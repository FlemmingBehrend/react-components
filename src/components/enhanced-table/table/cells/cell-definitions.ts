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
   * This value will be displayed in the end of other values in the column.
   */
  suffix: string;

  /**
   * The alignment of content of the column.
   */
  align: 'left' | 'right' | 'center';

  /**
   * If this is set to true text that is too long will be truncated with an ellipsis.
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
   */
  ellipsis: boolean;

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
  filterFn?: (cell: Valuable<unknown>, columnDef: ColDef<unknown>) => (filterValue: string) => boolean;
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

/**
 * This interface is implemented by cells that support
 * a value.
 * @template T The type of the value.
 */
export interface Valuable<T> {
  value: T;
}

/**
 * This interface is implemented by cells that support
 * a suffix.
 *
 * The suffix will be displayed after the value.
 */
export interface Suffixable {
  suffix?: string;
}

/**
 * This interface is implemented by cells that support
 * a link that will be navigated to when the text is
 * clicked.
 */
export interface Linkable {
  /**
   * The link to navigate to when the cell is clicked.
   * @default undefined
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href
   */
  href?: string;

  /**
   * Sets the target attribute of the anchor tag.
   * @default _blank
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
   */
  target?: '_self' | '_blank' | '_parent' | '_top';
}
