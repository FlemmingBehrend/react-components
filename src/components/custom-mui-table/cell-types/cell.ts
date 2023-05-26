type LinkWithHref = {
  href: string;
  target?: string;
};

type LinkWithoutHref = {
  href?: never;
  target?: never;
};

type Tooltip = {
  tooltip?: string;
};
type Link = LinkWithHref | LinkWithoutHref;

export type Cell<T> = {
  value: T;
} & Tooltip &
  Link;

// guards
export const isLink = (obj: any): obj is LinkWithHref => {
  return 'href' in obj;
};
export const isTooltip = (obj: any): obj is Tooltip => {
  return 'tooltip' in obj;
};
