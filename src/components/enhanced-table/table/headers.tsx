import { TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import * as React from 'react';
import { SortDirection, EnhancedTableHeader } from './header-definitions';
import { EnhancedHeaderCell } from './header';
import HeaderCellContextProvider, { HeaderCellContextProps } from '../context/header-cell-context-provider';
import { getBackgroundColor } from '../helpers';
import { hash } from '../../../hashing';

interface TableHeadersProps<DataDef> {
  headers: EnhancedTableHeader<DataDef>[];
  sortColumn?: keyof DataDef;
  setSortColumn: (column: keyof DataDef) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  expandable: boolean;
}

function TableHeaders<DataDef>(props: TableHeadersProps<DataDef>) {
  const theme = useTheme();

  function generateHeadersRecursively(
    headers: EnhancedTableHeader<DataDef>[],
    headerRows = new Map<number, HeaderCellContextProps[]>(),
    level: number = 0
  ): Map<number, HeaderCellContextProps[]> {
    if (!headers) return headerRows;

    headers.map((header) => {
      if (!headerRows.has(level)) {
        headerRows.set(level, []);
      }

      const contextProps: HeaderCellContextProps = {
        label: header.label,
        dataType: header.dataType as string,
        alignment: header.align ?? 'left',
        tooltip: header.tooltip,
        sortable: header.definition?.sortable ?? false,
        colspan: header.colspan ?? 1,
        sortDirection: props.sortDirection,
        sortColumn: props.sortColumn as string,
        setSortColumn: props.setSortColumn as (column: string) => void,
        setSortDirection: props.setSortDirection,
        backgroundColor: getBackgroundColor(theme.enhancedTable.headerBackgroundColor, level, theme.palette.mode),
        fontColor: theme.enhancedTable.headerFontColor,
        fontWeight: theme.enhancedTable.headerFontWeight,
        seperatorColor: theme.enhancedTable.headerSeperatorColor
      };

      headerRows.get(level)?.push(contextProps);

      if (header.subHeaders) {
        generateHeadersRecursively(header.subHeaders, headerRows, level + 1);
      }
    });
    return headerRows;
  }

  const headerRows = generateHeadersRecursively(props.headers);

  return (
    <TableHead>
      {[...headerRows.keys()].map((level) => {
        return (
          <TableRow key={level}>
            {props.expandable && (
              <TableCell
                sx={{
                  backgroundColor: `${getBackgroundColor(
                    theme.enhancedTable.headerBackgroundColor,
                    level,
                    theme.palette.mode
                  )}`,
                  width: '35px'
                }}
              ></TableCell>
            )}
            {headerRows.get(level)?.map((header, index) => (
              <HeaderCellContextProvider
                key={hash(header.label + index)}
                alignment={header.alignment}
                backgroundColor={header.backgroundColor}
                colspan={header.colspan}
                fontColor={header.fontColor}
                fontWeight={header.fontWeight}
                label={header.label}
                seperatorColor={header.seperatorColor}
                sortColumn={header.sortColumn}
                sortDirection={header.sortDirection}
                setSortColumn={header.setSortColumn}
                setSortDirection={header.setSortDirection}
                tooltip={header.tooltip}
                sortable={header.sortable}
                dataType={header.dataType}
              >
                <EnhancedHeaderCell />
              </HeaderCellContextProvider>
            ))}
          </TableRow>
        );
      })}
    </TableHead>
  );
}

export default TableHeaders;
