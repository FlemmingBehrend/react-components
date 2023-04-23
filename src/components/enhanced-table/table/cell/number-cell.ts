import type { Tooltipable } from './types/tooltipable';
import type { Value } from './types/value';
import type { Linkable } from './types/linkable';

export interface NumberCell extends Value<number>, Tooltipable, Linkable {}
