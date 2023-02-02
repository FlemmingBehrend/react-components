import { TableCell, TableSortLabel, Tooltip } from '@mui/material';
import * as React from 'react';
import { SortDirection, TableHeader } from './header-definitions';

export interface HeaderCellProps<DataDef> {
  header: TableHeader<DataDef>;
  orderBy: keyof DataDef;
  order: SortDirection;
  backgroundColor: string;
  seperatorColor: string;
}

function LabelCell<DataDef>(props: HeaderCellProps<DataDef>) {
  return <span style={{ whiteSpace: 'nowrap' }}>{props.header.label}</span>;
}

function TooltipCell<DataDef>(props: HeaderCellProps<DataDef>) {
  return (
    <Tooltip title={props.header.tooltip}>
      <LabelCell {...props} />
    </Tooltip>
  );
}

function HeaderCell<DataDef>(props: HeaderCellProps<DataDef>) {
  const [sortBy, setSortBy] = React.useState<keyof DataDef>(props.orderBy);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(props.order || 'desc');

  function handleSort(dataType: keyof DataDef) {
    const isAsc = sortBy === dataType && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(dataType);
  }

  return (
    <TableCell
      colSpan={props.header.colspan}
      align={props.header.definition?.align ?? 'left'}
      sx={{
        backgroundColor: props.backgroundColor,
        borderRight: `1px solid ${props.seperatorColor}`
      }}
    >
      {props.header.definition?.sortable && (
        <TableSortLabel
          active={sortBy === props.header.dataType}
          direction={sortDirection}
          onClick={() => handleSort(props.header.dataType!)}
        >
          {props.header.tooltip ? <TooltipCell {...props} /> : <LabelCell {...props} />}
        </TableSortLabel>
      )}
    </TableCell>
  );
}

export default HeaderCell;
