import * as React from 'react';
import { TableCell, TableSortLabel, Tooltip, Typography } from '@mui/material';
import { SortDirection } from './header-definitions';
import { HeaderCellContext } from './header-cell-context-provider';

export interface EnhancedHeaderCellProps {
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
  width: string;
  seperatorColor: string;
}

const LabelCell = function LabelCell() {
  const { label } = React.useContext(HeaderCellContext);
  return <Typography noWrap>{label}</Typography>;
};

function SortCell() {
  const { dataType, sortable, sortDirection, sortColumn, setSortColumn, setSortDirection } =
    React.useContext(HeaderCellContext);
  function handleSort(row: string) {
    const isAsc = sortColumn === dataType && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(row);
  }

  function render() {
    if (!sortable || !dataType) return <LabelCell />;
    let tooltip = ``;
    if (!sortColumn) {
      tooltip = `Sort this column. No column is currently sorted, so this will sort by ${dataType} in ascending order.`;
    } else {
      tooltip = `Sort this column. Currently sorted by ${sortColumn} in ${sortDirection}ending order.`;
    }
    return (
      <Tooltip title={tooltip} placement="top-start">
        <TableSortLabel active={dataType === sortColumn} direction={sortDirection} onClick={() => handleSort(dataType)}>
          <LabelCell />
        </TableSortLabel>
      </Tooltip>
    );
  }
  return render();
}

const TooltipCell = React.memo(function TooltipCell() {
  const { backgroundColor, fontColor, fontWeight, seperatorColor, tooltip, colspan, alignment, width } =
    React.useContext(HeaderCellContext);

  const sx = {
    backgroundColor,
    borderRight: `1px solid ${seperatorColor}`,
    color: fontColor,
    fontWeight: fontWeight,
    width: width
  };
  return tooltip ? (
    <Tooltip title={tooltip} followCursor>
      <TableCell
        // @ts-ignore: colspan is used internally to calculate the width of the header
        colSpan={colspan}
        align={alignment}
        sx={sx}
        variant="head"
      >
        <SortCell />
      </TableCell>
    </Tooltip>
  ) : (
    <TableCell
      // @ts-ignore: colspan is used internally to calculate the width of the header
      colSpan={colspan}
      align={alignment}
      sx={sx}
      variant="head"
    >
      <SortCell />
    </TableCell>
  );
});

export { TooltipCell as EnhancedHeaderCell };
