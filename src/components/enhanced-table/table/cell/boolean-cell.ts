import type { Value } from './types/value';
import type { Tooltipable } from './types/tooltipable';
import type { Linkable } from './types/linkable';

export interface BooleanCell extends Value<Boolean>, Tooltipable, Linkable {}
