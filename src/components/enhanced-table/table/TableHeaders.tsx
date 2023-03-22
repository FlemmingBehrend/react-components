import { TableHead, TableRow, useTheme } from '@mui/material';
import * as React from 'react';
import { SortDirection, TableHeader } from './header-definitions';
import { getBackgroundColor, getSeperatorColor } from '../helpers';
import { common } from '@mui/material/colors';
import TooltipCell, { HeaderCellProps } from './HeaderCell';
import { hash } from '../../../hashing';
import HeaderCellContextProvider from './HeaderCellContextProvider';

interface TableHeadersProps<DataDef> {
  headers: TableHeader<DataDef>[];
  initialSortColumn?: keyof DataDef;
  initialSortOrder: SortDirection;
  sortColumn?: keyof DataDef;
  setSortColumn: (column: keyof DataDef) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
}

function TableHeaders<DataDef>(props: TableHeadersProps<DataDef>) {
  const theme = useTheme();

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
    headers: TableHeader<DataDef>[],
    headerRows: Map<number, HeaderCellProps[]> = new Map(),
    level: number = 0
  ): Map<number, HeaderCellProps[]> {
    if (!headers) return headerRows;

    headers.map((header, index) => {
      if (!headerRows.has(level)) {
        headerRows.set(level, []);
      }
      const backgroundColor = getBackgroundColor(theme, level);
      const fontColor = theme.enhancedTable?.headers?.fontColor || common.black;
      const fontWeight = theme.enhancedTable?.headers?.fontWeight || 'normal';
      const seperatorColor = getSeperatorColor(theme);

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
        backgroundColor,
        fontColor,
        fontWeight,
        seperatorColor
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
                <TooltipCell />
              </HeaderCellContextProvider>
            ))}
          </TableRow>
        );
      })}
    </TableHead>
  );
}

export default TableHeaders;
