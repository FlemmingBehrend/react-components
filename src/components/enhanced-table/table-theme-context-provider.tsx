import React, { createContext, FC } from 'react';

export interface TableThemeContextProps {
  numberOfRowsFontColor: string;
  numberOfRowsFontWeight: 'bold' | 'normal';
  headerBackgroundColor: string;
  headerSeperatorColor: string;
  headerFontColor: string;
  headerFontWeight: 'bold' | 'normal';
  cellFontColor: string;
  cellStripedRowColor: string;
  cellExpandColor: string;
  mode: 'dark' | 'light';
}

export const TableThemeContext = createContext<TableThemeContextProps>({
  numberOfRowsFontColor: '',
  numberOfRowsFontWeight: 'bold',
  headerBackgroundColor: '',
  headerSeperatorColor: '',
  headerFontColor: '',
  headerFontWeight: 'bold',
  cellFontColor: '',
  cellStripedRowColor: '',
  cellExpandColor: '',
  mode: 'dark'
});

interface TableThemeContextProviderProps {
  numberOfRowsFontColor: string;
  numberOfRowsFontWeight: 'bold' | 'normal';
  headerBackgroundColor: string;
  headerSeperatorColor: string;
  headerFontColor: string;
  headerFontWeight: 'bold' | 'normal';
  cellFontColor: string;
  cellStripedRowColor: string;
  cellExpandColor: string;
  mode: 'dark' | 'light';
  children: React.ReactNode;
}

const ThemeContextProvider: FC<TableThemeContextProviderProps> = ({
  numberOfRowsFontColor,
  numberOfRowsFontWeight,
  headerBackgroundColor,
  headerSeperatorColor,
  headerFontColor,
  headerFontWeight,
  cellFontColor,
  cellStripedRowColor,
  cellExpandColor,
  mode,
  children
}) => {
  return (
    <TableThemeContext.Provider
      value={{
        numberOfRowsFontColor,
        numberOfRowsFontWeight,
        headerBackgroundColor,
        headerSeperatorColor,
        headerFontColor,
        headerFontWeight,
        cellFontColor,
        cellStripedRowColor,
        cellExpandColor,
        mode
      }}
    >
      {children}
    </TableThemeContext.Provider>
  );
};

export default ThemeContextProvider;
