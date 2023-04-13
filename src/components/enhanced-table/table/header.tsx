import * as React from 'react';
import { TableCell, TableSortLabel, Tooltip, Typography, SxProps } from '@mui/material';
import { HeaderCellContext } from '../context/header-cell-context-provider';

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
    return (
      <TableSortLabel active={dataType === sortColumn} direction={sortDirection} onClick={() => handleSort(dataType)}>
        <LabelCell />
      </TableSortLabel>
    );
  }
  return render();
}

const TooltipCell = React.memo(function TooltipCell() {
  const { backgroundColor, fontColor, fontWeight, seperatorColor, tooltip, colspan, alignment } =
    React.useContext(HeaderCellContext);

  const sx: SxProps = {
    backgroundColor,
    borderRight: `1px solid ${seperatorColor}`,
    color: fontColor,
    fontWeight: fontWeight
  };

  return tooltip ? (
    <Tooltip title={tooltip} followCursor>
      <TableCell colSpan={colspan} align={alignment} sx={sx}>
        <SortCell />
      </TableCell>
    </Tooltip>
  ) : (
    <TableCell colSpan={colspan} align={alignment} sx={sx}>
      <SortCell />
    </TableCell>
  );
});

export { TooltipCell as EnhancedHeaderCell };
