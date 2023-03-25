import { Theme } from '@mui/material';
import { getDarkerColor, getLighterColor, isPaletteColorSet } from './helpers';

export function getNumberOfRowsFontColor(mode: 'dark' | 'light', theme: Theme): string {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].numberOfRowsFontColor;
  } else {
    if (isPaletteColorSet(theme.palette.primary)) {
      // A color from the palette has been set, we can assume that the palette has 50 to 900 in colors
      if (mode === 'dark') {
        return theme.palette.primary[900];
      } else {
        return theme.palette.primary[50];
      }
    } else {
      // Standard palette we calculate the color
      if (mode === 'dark') {
        return getLighterColor(theme.palette.primary.main, 0.5);
      } else {
        return getDarkerColor(theme.palette.primary.main, 0.5);
      }
    }
  }
}

export function getNumberOfRowsFontWeight(mode: 'dark' | 'light', theme: Theme): 'bold' | 'normal' {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].numberOfRowsFontWeight;
  } else {
    return 'bold';
  }
}

export function getHeaderBackgroundColor(mode: 'dark' | 'light', theme: Theme): string {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].headerBackgroundColor;
  } else {
    if (isPaletteColorSet(theme.palette.primary)) {
      // A color from the palette has been set, we can assume that the palette has 50 to 900 in colors
      if (mode === 'dark') {
        return theme.palette.primary[900];
      } else {
        return theme.palette.primary[50];
      }
    } else {
      // Standard palette we calculate the color
      if (mode === 'dark') {
        return getLighterColor(theme.palette.primary.main, 0.5);
      } else {
        return getDarkerColor(theme.palette.primary.main, 0.5);
      }
    }
  }
}

export function getHeaderSeperatorColor(mode: 'dark' | 'light', theme: Theme): string {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].headerSeperatorColor;
  } else {
    if (isPaletteColorSet(theme.palette.primary)) {
      // A color from the palette has been set, we can assume that the palette has 50 to 900 in colors
      if (mode === 'dark') {
        return theme.palette.primary[900];
      } else {
        return theme.palette.primary[50];
      }
    } else {
      // Standard palette we calculate the color
      if (mode === 'dark') {
        return getLighterColor(theme.palette.primary.main, 0.5);
      } else {
        return getDarkerColor(theme.palette.primary.main, 0.5);
      }
    }
  }
}

export function getHeaderFontColor(mode: 'dark' | 'light', theme: Theme): string {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].headerFontColor;
  } else {
    if (isPaletteColorSet(theme.palette.primary)) {
      // A color from the palette has been set, we can assume that the palette has 50 to 900 in colors
      if (mode === 'dark') {
        return theme.palette.common.white;
      } else {
        return theme.palette.common.black;
      }
    } else {
      return theme.palette.primary.contrastText;
    }
  }
}

export function getHeaderFontWeight(mode: 'dark' | 'light', theme: Theme): 'bold' | 'normal' {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].headerFontWeight;
  } else {
    return 'bold';
  }
}

export function getCellFontColor(mode: 'dark' | 'light', theme: Theme): string {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].cellFontColor;
  } else {
    if (isPaletteColorSet(theme.palette.primary)) {
      // A color from the palette has been set, we can assume that the palette has 50 to 900 in colors
      if (mode === 'dark') {
        return theme.palette.common.white;
      } else {
        return theme.palette.common.black;
      }
    } else {
      return theme.palette.primary.contrastText;
    }
  }
}

export function getCellExpandColor(mode: 'dark' | 'light', theme: Theme): string {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].cellExpandColor;
  } else {
    if (isPaletteColorSet(theme.palette.primary)) {
      // A color from the palette has been set, we can assume that the palette has 50 to 900 in colors
      if (mode === 'dark') {
        return theme.palette.common.white;
      } else {
        return theme.palette.common.black;
      }
    } else {
      return theme.palette.primary.contrastText;
    }
  }
}

export function getCellStripedRowColor(mode: 'dark' | 'light', theme: Theme): string {
  if (theme.palette.enhancedTable) {
    return theme.palette.enhancedTable[mode].cellStripedRowColor;
  } else {
    if (isPaletteColorSet(theme.palette.primary)) {
      // A color from the palette has been set, we can assume that the palette has 50 to 900 in colors
      if (mode === 'dark') {
        return theme.palette.primary[900];
      } else {
        return theme.palette.primary[50];
      }
    } else {
      // Standard palette we calculate the color
      if (mode === 'dark') {
        return getLighterColor(theme.palette.primary.main, 0.5);
      } else {
        return getDarkerColor(theme.palette.primary.main, 0.5);
      }
    }
  }
}
