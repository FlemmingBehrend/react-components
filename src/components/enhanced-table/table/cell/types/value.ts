/**
 * This interface is implemented by cells that support
 * a value.
 * @template T The type of the value.
 */
interface Value<T> {
  value: T;
}

export type { Value };
