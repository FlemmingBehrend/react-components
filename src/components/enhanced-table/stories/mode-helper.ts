import { Theme, createTheme } from '@mui/material';
import { EnhancedTableTheme, LIGHT_BLUE } from '../themes';

export function chooseMode(mode: 'light' | 'dark', colorTheme: EnhancedTableTheme = LIGHT_BLUE): Theme {
  return createTheme({
    palette: {
      mode
    },
    enhancedTable: colorTheme
  });
}
