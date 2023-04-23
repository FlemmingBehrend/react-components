import type { Value } from './types/value';
import type { Tooltipable } from './types/tooltipable';
import { Linkable } from './types/linkable';

export interface DateCell extends Value<Date>, Tooltipable, Linkable {
  display?: 'date' | 'time' | 'datetime' | 'relative';
}
