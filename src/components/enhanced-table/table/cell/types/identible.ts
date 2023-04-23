/**
 * This interface is implemented by items that needs to
 * be displayed in the table where each row requires a
 * unique identifier.
 */
interface Identible extends Object {
  id: string;
}

export type { Identible };
