import { EnhancedHeader, EnhancedHeaderGroup } from './table/header-definitions';

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

export function getBackgroundColor(color: string, level: number, mode: 'light' | 'dark') {
  if (level === 0) {
    return color;
  } else {
    if (mode === 'dark') {
      return getDarkerColor(color, level * 15);
    }
    if (mode === 'light') {
      return getLighterColor(color, level * 15);
    }
    throw new Error('Invalid mode');
  }
}

export function instanceOfEnhancedHeader<DataDef>(object: any): object is EnhancedHeader<DataDef> {
  return 'dataType' in object;
}

export function instanceOfEnhancedHeaderGroup<DataDef>(object: any): object is EnhancedHeaderGroup<DataDef> {
  return 'subHeaders' in object;
}
