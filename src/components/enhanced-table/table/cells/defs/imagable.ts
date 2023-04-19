import { ColDef } from './base';

/**
 * This is the column definition for a column that contains an image.
 *
 * It contains a map of images that can be displayed. Each image is
 * identified by a key. The key is the value of the cell.
 *
 * What images that are available is determined by implementing cell type.
 */
interface ImagableColDef<DataDef> extends ColDef<DataDef> {
  imageMap: Record<string, React.ReactNode>;
}

export type { ImagableColDef };
