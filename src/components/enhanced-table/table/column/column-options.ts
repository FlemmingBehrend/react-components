/**
 * These options are available for all columns.
 *
 * When specifying
 */
interface ColumnOptions {
  /**
   * If this is set to true the column will be sortable.
   */
  sortable: boolean;

  /**
   * This value may be displayed in the end of values in each column.
   */
  suffix?: string;

  /**
   * The alignment of content of the column.
   */
  align: 'left' | 'right' | 'center';
}

/**
 * This is the column options for a column that contains an image.
 *
 * It contains a map of images that can be displayed. Each image is
 * identified by a key. The key is the value of the cell.
 *
 * What images that are available is determined by implementing cell type.
 */
interface ImagableColumnOptions extends ColumnOptions {
  imageMap: Record<string, React.ReactNode>;
}

export type { ColumnOptions, ImagableColumnOptions };
