/**
 * This interface is implemented by cells that support
 * a value.
 * @template T The type of the value.
 */
interface Valuable<T> {
  value: T;
}

export type { Valuable };
