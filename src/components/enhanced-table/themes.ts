export interface EnhancedTableTheme {
  headerBackgroundColor: string;
  headerFontColor: string;
  headerFontWeight: 'bold' | 'normal';
  headerSeperatorColor: string;
  cellFontColor: string;
  cellExpandColor: string;
  cellStripedRowColor: string;
  filterFieldColor: string;
  numberOfRowsFontColor: string;
  numberOfRowsFontWeight: 'bold' | 'normal';
}

export const LIGHT_BLUE: EnhancedTableTheme = {
  headerBackgroundColor: '#4D7EA9',
  headerSeperatorColor: '#dcdcdc',
  headerFontColor: '#f0ffff',
  cellFontColor: '#333333',
  cellStripedRowColor: '#e7e8f0',
  cellExpandColor: '#3d6a98',
  filterFieldColor: '#2E5E8E',
  numberOfRowsFontColor: '#A7C6D9',
  headerFontWeight: 'bold',
  numberOfRowsFontWeight: 'bold'
};

export const CYAN: EnhancedTableTheme = {
  headerBackgroundColor: '#a4d9d3',
  headerSeperatorColor: '#dcdcdc',
  headerFontColor: '#113335',
  cellFontColor: '#0d3333',
  cellStripedRowColor: '#edf6f6',
  cellExpandColor: '#a3e8e8',
  filterFieldColor: '#2e8f8e',
  numberOfRowsFontColor: '#9ee0d3',
  headerFontWeight: 'bold',
  numberOfRowsFontWeight: 'bold'
};

export const DARK: EnhancedTableTheme = {
  headerBackgroundColor: '#273238',
  headerSeperatorColor: '#404040',
  headerFontColor: '#f2f2f2',
  cellFontColor: '#f2f2f2',
  cellStripedRowColor: '#1f1f1f',
  cellExpandColor: ' #424242',
  filterFieldColor: '#c8c5ca',
  numberOfRowsFontColor: '#535b53',
  headerFontWeight: 'bold',
  numberOfRowsFontWeight: 'bold'
};
