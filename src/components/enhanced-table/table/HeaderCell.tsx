import { TableCell, TableSortLabel, Tooltip } from '@mui/material';
import React, { memo, useContext } from 'react';
import { SortDirection, TableHeader } from './header-definitions';
import { HeaderCellContext } from './HeaderCellContextProvider';

export interface HeaderCellProps {
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

const LabelCell = function LabelCell() {
  const { label } = useContext(HeaderCellContext);
  return <span style={{ whiteSpace: 'nowrap' }}>{label}</span>;
};

function SortCell() {
  const { dataType, sortable, sortDirection, sortColumn, setSortColumn, setSortDirection } =
    useContext(HeaderCellContext);
  function handleSort(row: string) {
    const isAsc = sortColumn === dataType && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(row);
  }

  function render() {
    if (!sortable || !dataType) return <LabelCell />;
    return (
      <TableSortLabel active={dataType === sortColumn} direction={sortDirection} onClick={() => handleSort(dataType)}>
        <LabelCell />
      </TableSortLabel>
    );
  }
  return render();
}

const TooltipCell = memo(function TooltipCell() {
  const { backgroundColor, fontColor, fontWeight, seperatorColor, tooltip, colspan, alignment } =
    useContext(HeaderCellContext);
  const sx = {
    backgroundColor,
    borderRight: `1px solid ${seperatorColor}`,
    color: fontColor,
    fontWeight
  };
  return tooltip ? (
    <Tooltip title={tooltip} followCursor>
      <TableCell
        // @ts-ignore: colspan is used internally to calculate the width of the header
        colSpan={colspan}
        align={alignment}
        sx={sx}
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
    >
      <SortCell />
    </TableCell>
  );
});

export default TooltipCell;
