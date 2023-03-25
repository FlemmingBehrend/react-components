import { TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import * as React from 'react';
import { SortDirection, EnhancedTableHeader } from './header-definitions';
import { EnhancedHeaderCellProps, EnhancedHeaderCell } from './header-cell';
import { hash } from '../../../hashing';
import HeaderCellContextProvider from './header-cell-context-provider';
import { getBackgroundColor } from '../helpers';
import { TableThemeContext } from '../table-theme-context-provider';

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
  const tableTheme = React.useContext(TableThemeContext);

  const headerRows = React.useMemo(() => {
    const headers = generateHeadersRecursively(props.headers);
    // traverse the headerRows map from the bottom up calculating the colspan for each header
    // this is done by adding the colspan of the subheaders to the colspan of the current header
    // if the current header has no subheaders, the colspan is 1
    for (let level = headers.size - 1; level >= 0; level--) {
      const currentLevelHeaders = headers.get(level);
      const nextLevelHeaders = headers.get(level + 1);
      if (currentLevelHeaders && nextLevelHeaders) {
        currentLevelHeaders.map((header, index) => {
          if (header.colspan > 1) {
            let colspan = header.colspan;
            for (let i = index; i < index + header.colspan; i++) {
              colspan += nextLevelHeaders[i].colspan - 1;
            }
            header.colspan = colspan;
          }
        });
      }
    }
    return headers;
  }, [props.headers, props.sortColumn, props.sortDirection]);

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
        colspan: header.subHeaders?.length ?? 1,
        sortDirection: props.sortDirection,
        sortColumn: props.sortColumn as string,
        setSortColumn: props.setSortColumn as (column: string) => void,
        setSortDirection: props.setSortDirection,
        backgroundColor: getBackgroundColor(tableTheme.headerBackgroundColor, level),
        fontColor: tableTheme.headerFontColor,
        fontWeight: tableTheme.headerFontWeight,
        seperatorColor: tableTheme.headerSeperatorColor
      });
      if (header.subHeaders) {
        generateHeadersRecursively(header.subHeaders, headerRows, level + 1);
      }
    });
    return headerRows;
  }

  return (
    <TableHead>
      {[...headerRows.keys()].map((level) => {
        return (
          <TableRow key={level}>
            {props.expandable && (
              <TableCell
                sx={{ backgroundColor: `${getBackgroundColor(tableTheme.headerBackgroundColor, level)}`, width: '1%' }}
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
