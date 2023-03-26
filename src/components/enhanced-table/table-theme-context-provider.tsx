import React, { createContext, FC } from 'react';

export interface EnhancedTableThemeContextProps {
  mode: 'dark' | 'light';
}

export const EnhancedTableThemeContext = createContext<EnhancedTableThemeContextProps>({
  mode: 'dark'
});

interface EnhancedTableThemeContextProviderProps {
  mode: 'dark' | 'light';
  children: React.ReactNode;
}

const EnhancedThemeContextProvider: FC<EnhancedTableThemeContextProviderProps> = ({ mode, children }) => {
  return (
    <EnhancedTableThemeContext.Provider
      value={{
        mode
      }}
    >
      {children}
    </EnhancedTableThemeContext.Provider>
  );
};

export default EnhancedThemeContextProvider;
