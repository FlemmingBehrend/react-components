/**
 * This interface is implemented by cells that support
 * a link that will be navigated to when the text is
 * clicked.
 */
interface Linkable {
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

export type { Linkable };
