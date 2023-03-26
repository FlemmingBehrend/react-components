import { Theme } from '@mui/material';
import { getDarkerColor, getLighterColor, isPaletteColorSet } from './helpers';

function getNumberOfRowsFontColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.primary[100];
    } else {
      return theme.palette.primary[900];
    }
  } else {
    if (mode === 'dark') {
      return getDarkerColor(theme.palette.primary.main, 10);
    } else {
      return getLighterColor(theme.palette.primary.main, 50);
    }
  }
}

function getNumberOfRowsFontWeight(mode: 'dark' | 'light', theme: Theme): 'bold' | 'normal' {
  return 'bold';
}

function getHeaderBackgroundColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.primary[900];
    } else {
      return theme.palette.primary[50];
    }
  } else {
    if (mode === 'dark') {
      return getLighterColor(theme.palette.primary.main, 0.5);
    } else {
      return getDarkerColor(theme.palette.primary.main, 0.5);
    }
  }
}

function getHeaderSeperatorColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.primary[900];
    } else {
      return theme.palette.primary[50];
    }
  } else {
    if (mode === 'dark') {
      return getLighterColor(theme.palette.primary.main, 0.5);
    } else {
      return getDarkerColor(theme.palette.primary.main, 0.5);
    }
  }
}

function getHeaderFontColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.common.white;
    } else {
      return theme.palette.common.black;
    }
  } else {
    return theme.palette.primary.contrastText;
  }
}

function getHeaderFontWeight(mode: 'dark' | 'light', theme: Theme): 'bold' | 'normal' {
  return 'bold';
}

function getCellFontColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.common.white;
    } else {
      return theme.palette.common.black;
    }
  } else {
    return theme.palette.primary.contrastText;
  }
}

function getCellExpandColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.common.white;
    } else {
      return theme.palette.common.black;
    }
  } else {
    return theme.palette.primary.contrastText;
  }
}

function getCellStripedRowColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.primary[900];
    } else {
      return theme.palette.primary[50];
    }
  } else {
    if (mode === 'dark') {
      return getLighterColor(theme.palette.primary.main, 0.5);
    } else {
      return getDarkerColor(theme.palette.primary.main, 0.5);
    }
  }
}

function getFilterFieldColor(mode: 'dark' | 'light', theme: Theme): string {
  if (isPaletteColorSet(theme.palette.primary)) {
    if (mode === 'dark') {
      return theme.palette.primary[900];
    } else {
      return theme.palette.primary[50];
    }
  } else {
    if (mode === 'dark') {
      return getLighterColor(theme.palette.primary.main, 60);
    } else {
      return getDarkerColor(theme.palette.primary.main, 60);
    }
  }
}

interface ThemeProps {
  numberOfRowsFontColor: string;
  numberOfRowsFontWeight: 'bold' | 'normal';
  headerBackgroundColor: string;
  headerSeperatorColor: string;
  headerFontColor: string;
  headerFontWeight: 'bold' | 'normal';
  cellFontColor: string;
  cellStripedRowColor: string;
  cellExpandColor: string;
  filterFieldColor: string;
}

function createEnhancedTableTheme(theme: Theme): { dark: ThemeProps; light: ThemeProps } {
  return {
    dark: {
      numberOfRowsFontColor: getNumberOfRowsFontColor('dark', theme),
      numberOfRowsFontWeight: getNumberOfRowsFontWeight('dark', theme),
      headerBackgroundColor: getHeaderBackgroundColor('dark', theme),
      headerSeperatorColor: getHeaderSeperatorColor('dark', theme),
      headerFontColor: getHeaderFontColor('dark', theme),
      headerFontWeight: getHeaderFontWeight('dark', theme),
      cellFontColor: getCellFontColor('dark', theme),
      cellExpandColor: getCellExpandColor('dark', theme),
      cellStripedRowColor: getCellStripedRowColor('dark', theme),
      filterFieldColor: getFilterFieldColor('dark', theme)
    },
    light: {
      numberOfRowsFontColor: getNumberOfRowsFontColor('light', theme),
      numberOfRowsFontWeight: getNumberOfRowsFontWeight('light', theme),
      headerBackgroundColor: getHeaderBackgroundColor('light', theme),
      headerSeperatorColor: getHeaderSeperatorColor('light', theme),
      headerFontColor: getHeaderFontColor('light', theme),
      headerFontWeight: getHeaderFontWeight('light', theme),
      cellFontColor: getCellFontColor('light', theme),
      cellExpandColor: getCellExpandColor('light', theme),
      cellStripedRowColor: getCellStripedRowColor('light', theme),
      filterFieldColor: getFilterFieldColor('light', theme)
    }
  };
}

export function applyTableTheme(theme: Theme): void {
  if (!theme.palette.enhancedTable) {
    console.log('Applying enhanced table theme');
    const defaultTheme = createEnhancedTableTheme(theme);
    console.log('defaultTheme', defaultTheme);
    theme.palette.enhancedTable = defaultTheme;
  }
}
