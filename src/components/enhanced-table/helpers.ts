import { Theme } from '@mui/material';

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

export function getBackgroundColor(color: string, level: number) {
  if (level === 0) {
    return color;
  } else {
    return getLighterColor(color, level * 10);
  }
}

type Color = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
  main: string;
  light: string;
  dark: string;
  contrastText: string;
};

export function isPaletteColorSet(color: any): color is Color {
  return (
    color &&
    color.main &&
    color.light &&
    color.dark &&
    color.contrastText &&
    color.A100 &&
    color.A200 &&
    color.A400 &&
    color.A700
  );
}
