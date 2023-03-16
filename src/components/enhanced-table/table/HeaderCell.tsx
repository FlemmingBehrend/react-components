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

function SortCell<DataDef>(props: HeaderCellProps<DataDef>) {
  function render() {
    if (!props.header.definition?.sortable) return <LabelCell {...props} />;
    return (
      <TableSortLabel active={props.orderBy === props.header.dataType} direction={props.order}>
        <LabelCell {...props} />
      </TableSortLabel>
    );
  }
  return render();
}

function TooltipCell<DataDef>(props: HeaderCellProps<DataDef>) {
  function render() {
    if (!props.header.tooltip) {
      return (
        <TableCell
          // @ts-ignore: colspan is used internally to calculate the width of the header
          colSpan={props.header.colspan}
          align={props.header.definition?.align ?? 'left'}
          sx={{
            backgroundColor: props.backgroundColor,
            borderRight: `1px solid ${props.seperatorColor}`
          }}
        >
          <SortCell {...props} />
        </TableCell>
      );
    }
    return (
      <Tooltip title={props.header.tooltip} followCursor>
        <TableCell
          // @ts-ignore: colspan is used internally to calculate the width of the header
          colSpan={props.header.colspan}
          align={props.header.definition?.align ?? 'left'}
          sx={{
            backgroundColor: props.backgroundColor,
            borderRight: `1px solid ${props.seperatorColor}`
          }}
        >
          <SortCell {...props} />
        </TableCell>
      </Tooltip>
    );
  }
  return render();
}

function HeaderCell<DataDef>(props: HeaderCellProps<DataDef>) {
  const [sortBy, setSortBy] = React.useState<keyof DataDef>(props.orderBy);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(props.order || 'desc');

  function handleSort(dataType: keyof DataDef) {
    const isAsc = sortBy === dataType && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(dataType);
  }

  return <TooltipCell {...props} />;
}

export default HeaderCell;
