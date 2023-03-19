import { TableCell, TableSortLabel, Tooltip } from '@mui/material';
import * as React from 'react';
import { SortDirection, TableHeader } from './header-definitions';

export interface HeaderCellProps<DataDef> {
  header: TableHeader<DataDef>;
  sortColumn: keyof DataDef;
  sortDirection: SortDirection;
  setSortColumn: React.Dispatch<React.SetStateAction<keyof DataDef>>;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
  backgroundColor: string;
  fontColor: string;
  fontWeight: string;
  seperatorColor: string;
}

function LabelCell<DataDef>(props: HeaderCellProps<DataDef>) {
  return <span style={{ whiteSpace: 'nowrap' }}>{props.header.label}</span>;
}

function SortCell<DataDef>(props: HeaderCellProps<DataDef>) {
  function handleSort(row: keyof DataDef) {
    const isAsc = props.sortColumn === props.header.dataType && props.sortDirection === 'asc';
    props.setSortDirection(isAsc ? 'desc' : 'asc');
    props.setSortColumn(row);
  }

  function render() {
    if (!props.header.definition?.sortable) return <LabelCell {...props} />;
    const row = props.header.dataType;
    return (
      <TableSortLabel
        active={props.header.dataType === props.sortColumn}
        direction={props.sortDirection}
        onClick={() => handleSort(row)}
      >
        <LabelCell {...props} />
      </TableSortLabel>
    );
  }
  return render();
}

function TooltipCell<DataDef>(props: HeaderCellProps<DataDef>) {
  const sx = {
    backgroundColor: props.backgroundColor,
    borderRight: `1px solid ${props.seperatorColor}`,
    color: props.fontColor,
    fontWeight: props.fontWeight
  };
  return props.header.tooltip ? (
    <Tooltip title={props.header.tooltip} followCursor>
      <TableCell
        // @ts-ignore: colspan is used internally to calculate the width of the header
        colSpan={props.header.colspan}
        align={props.header.definition?.align ?? 'left'}
        sx={sx}
      >
        <SortCell {...props} />
      </TableCell>
    </Tooltip>
  ) : (
    <TableCell
      // @ts-ignore: colspan is used internally to calculate the width of the header
      colSpan={props.header.colspan}
      align={props.header.definition?.align ?? 'left'}
      sx={sx}
    >
      <SortCell {...props} />
    </TableCell>
  );
}

function HeaderCell<DataDef>(props: HeaderCellProps<DataDef>) {
  return <TooltipCell {...props} />;
}

export default HeaderCell;
