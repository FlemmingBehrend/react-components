export { default } from './enhanced-table';
export { StringCell, StringColDef } from './table/cell-types/string-cell';
export { NumberCell, NumberColDef } from './table/cell-types/number-cell';
export { Identible } from './table/cell-types/cell-definitions';
export { EnhancedTableHeader, SortDirection } from './table/header-definitions';

declare module '@mui/material/styles' {
  interface Theme {
    enhancedTable: {
      dark: {
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
      };
      light: {
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
      };
    };
  }
  interface ThemeOptions {
    enhancedTable?: {
      dark?: {
        numberOfRowsFontColor?: string;
        numberOfRowsFontWeight?: 'bold' | 'normal';
        headerBackgroundColor?: string;
        headerSeperatorColor?: string;
        headerFontColor?: string;
        headerFontWeight?: 'bold' | 'normal';
        cellFontColor?: string;
        cellStripedRowColor?: string;
        cellExpandColor?: string;
        filterFieldColor?: string;
      };
      light?: {
        numberOfRowsFontColor?: string;
        numberOfRowsFontWeight?: 'bold' | 'normal';
        headerBackgroundColor?: string;
        headerSeperatorColor?: string;
        headerFontColor?: string;
        headerFontWeight?: 'bold' | 'normal';
        cellFontColor?: string;
        cellStripedRowColor?: string;
        cellExpandColor?: string;
        filterFieldColor?: string;
      };
    };
  }
  interface Palette {
    enhancedTable: {
      dark: {
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
      };
      light: {
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
      };
    };
  }
}
