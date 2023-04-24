import type { Tooltipable } from './types/tooltipable';
import type { Value } from './types/value';

export interface SparklineCell extends Value<number[]>, Tooltipable {
  color?: string;
  heigth?: number;
  width?: number;
}
