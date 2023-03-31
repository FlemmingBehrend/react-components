import React, { createContext, FC } from 'react';

export interface ModeContextProps {
  mode: 'dark' | 'light';
}

export const ModeContext = createContext<ModeContextProps>({
  mode: 'dark'
});

interface ModeContextProviderProps {
  mode: 'dark' | 'light';
  children: React.ReactNode;
}

const ModeContextProvider: FC<ModeContextProviderProps> = ({ mode, children }) => {
  return (
    <ModeContext.Provider
      value={{
        mode
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContextProvider;
