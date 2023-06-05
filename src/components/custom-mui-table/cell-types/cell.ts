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

export type Link = LinkWithHref | LinkWithoutHref;

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
export const isStringCell = (obj: any): obj is Cell<string> => {
  return 'value' in obj && typeof obj.value === 'string';
};
export const isNumberCell = (obj: any): obj is Cell<number> => {
  return 'value' in obj && typeof obj.value === 'number';
};

// helpers
export const getColumnId = (id: string) => {
  if (!id) return id;
  if (!id.includes('_')) return id;
  return id.substring(0, id.lastIndexOf('_'));
};
