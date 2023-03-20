import React, { createContext, FC } from 'react';
import { SortDirection } from './header-definitions';

interface HeaderCellContextProps {
  key: string;
  label: string;
  dataType: string;
  alignment: 'left' | 'center' | 'right';
  tooltip?: string;
  sortable: boolean;
  colspan: number;
  sortDirection: SortDirection;
  sortColumn: string;
  setSortColumn: (column: string) => void;
  setSortDirection: (direction: SortDirection) => void;
  backgroundColor: string;
  fontColor: string;
  fontWeight: string;
  seperatorColor: string;
}

export const HeaderCellContext = createContext<HeaderCellContextProps>({
  key: '',
  label: '',
  dataType: '',
  alignment: 'left',
  tooltip: '',
  sortable: false,
  colspan: 1,
  sortDirection: 'asc',
  sortColumn: '',
  setSortColumn: () => {},
  setSortDirection: () => {},
  backgroundColor: '',
  fontColor: '',
  fontWeight: '',
  seperatorColor: ''
});

interface HeaderCellContextProviderProps {
  key: string;
  label: string;
  dataType: string;
  alignment: 'left' | 'center' | 'right';
  tooltip?: string;
  sortable: boolean;
  colspan: number;
  sortDirection: SortDirection;
  sortColumn: string;
  setSortColumn: (column: string) => void;
  setSortDirection: (direction: SortDirection) => void;
  backgroundColor: string;
  fontColor: string;
  fontWeight: string;
  seperatorColor: string;
  children: React.ReactNode;
}

const HeaderCellContextProvider: FC<HeaderCellContextProviderProps> = ({
  alignment,
  backgroundColor,
  colspan,
  dataType,
  fontColor,
  fontWeight,
  key,
  label,
  setSortColumn,
  setSortDirection,
  seperatorColor,
  sortable,
  sortColumn,
  sortDirection,
  tooltip,
  children
}) => {
  return (
    <HeaderCellContext.Provider
      value={{
        alignment,
        backgroundColor,
        colspan,
        dataType,
        fontColor,
        fontWeight,
        key,
        label,
        seperatorColor,
        setSortColumn,
        setSortDirection,
        sortable,
        sortColumn,
        sortDirection,
        tooltip
      }}
    >
      {children}
    </HeaderCellContext.Provider>
  );
};

export default HeaderCellContextProvider;
