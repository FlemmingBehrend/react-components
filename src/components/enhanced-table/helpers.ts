import { Theme } from '@mui/material';
import { TableHeader } from './table/header-definitions';
import { blueGrey } from '@mui/material/colors';

export const DEFAULT_TABLE_HEADER_COLOR = blueGrey[400];

export function getDarkerColor(hex: string, percent: number): string {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  r = Math.round(r * (1 - percent / 100));
  g = Math.round(g * (1 - percent / 100));
  b = Math.round(b * (1 - percent / 100));
  let darkerHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return darkerHex;
}

export function getLighterColor(hex: string, percent: number): string {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  r = Math.round(r + ((255 - r) * percent) / 100);
  g = Math.round(g + ((255 - g) * percent) / 100);
  b = Math.round(b + ((255 - b) * percent) / 100);
  let lighterHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return lighterHex;
}

export function calculateHeaderColspan<DataDef>(headers: TableHeader<DataDef>): number {
  let count = 0;
  if (headers.subHeaders) {
    headers.subHeaders.map((header) => {
      if (header.subHeaders) {
        count += calculateHeaderColspan(header);
      } else {
        count++;
      }
    });
  } else {
    count++;
  }
  // @ts-ignore: colspan is used internally to calculate the width of the header
  headers['colspan'] = count;
  return count;
}

export function getHeaderCells<DataDef>(headers: TableHeader<DataDef>[]): TableHeader<DataDef>[] {
  const headerCells: TableHeader<DataDef>[] = [];
  headers.forEach((header) => {
    if (header.subHeaders) {
      headerCells.push(...getHeaderCells(header.subHeaders));
    } else {
      headerCells.push(header);
    }
  });
  return headerCells;
}

export function getBackgroundColor(theme: Theme, level: number) {
  const baseBackgroundColor = theme?.enhancedTable?.headers?.backgroundColor ?? DEFAULT_TABLE_HEADER_COLOR;
  if (level === 0) {
    return baseBackgroundColor;
  } else {
    return getLighterColor(baseBackgroundColor, level * 10);
  }
}

export function getSeperatorColor(theme: Theme) {
  const definedTheme = theme?.enhancedTable?.headers?.backgroundColor;
  const verticalSeperatorColor = definedTheme
    ? getLighterColor(definedTheme, 70)
    : getLighterColor(DEFAULT_TABLE_HEADER_COLOR, 70);
  return verticalSeperatorColor;
}
