import { TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import * as React from 'react';
import { SortDirection, EnhancedTableHeader, EnhancedHeaderGroup } from './header-definitions';
import { EnhancedHeaderCellProps, EnhancedHeaderCell } from './header-cell';
import { hash } from '../../../hashing';
import HeaderCellContextProvider from './header-cell-context-provider';
import { getBackgroundColor, instanceOfEnhancedHeader, instanceOfEnhancedHeaderGroup } from '../helpers';

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
    headerRows: Map<number, EnhancedHeaderCellProps[]> = new Map(),
    level: number = 0
  ): Map<number, EnhancedHeaderCellProps[]> {
    if (!headers) return headerRows;

    headers.map((header, index) => {
      if (!headerRows.has(level)) {
        headerRows.set(level, []);
      }
      headerRows.get(level)?.push({
        key: hash(header.label + index).toString(),
        label: header.label,
        dataType: header.dataType as string,
        alignment: header.align ?? 'left',
        tooltip: header.tooltip,
        sortable: header.definition?.sortable ?? false,
        colspan: header.colspan,
        sortDirection: props.sortDirection,
        sortColumn: props.sortColumn as string,
        setSortColumn: props.setSortColumn as (column: string) => void,
        setSortDirection: props.setSortDirection,
        backgroundColor: getBackgroundColor(theme.enhancedTable.headerBackgroundColor, level, theme.palette.mode),
        fontColor: theme.enhancedTable.headerFontColor,
        fontWeight: theme.enhancedTable.headerFontWeight,
        seperatorColor: theme.enhancedTable.headerSeperatorColor,
        width: instanceOfEnhancedHeader(header) ? header.width : 'auto'
      });
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
                  width: '1%'
                }}
              ></TableCell>
            )}
            {headerRows.get(level)?.map((header) => (
              <HeaderCellContextProvider
                alignment={header.alignment}
                backgroundColor={header.backgroundColor}
                colspan={header.colspan}
                fontColor={header.fontColor}
                fontWeight={header.fontWeight}
                key={header.key}
                label={header.label}
                seperatorColor={header.seperatorColor}
                sortColumn={header.sortColumn}
                sortDirection={header.sortDirection}
                setSortColumn={header.setSortColumn}
                setSortDirection={header.setSortDirection}
                tooltip={header.tooltip}
                sortable={header.sortable}
                dataType={header.dataType}
                width={header.width}
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
