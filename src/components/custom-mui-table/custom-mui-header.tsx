import { TableCell, TableSortLabel } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Header, flexRender } from '@tanstack/react-table';
import * as React from 'react';

interface CustomMuiHeaderProps {
  header: Header<any, unknown>;
  fontSize: string | number;
}

function CustomMuiHeader(props: CustomMuiHeaderProps) {
  const sortDirection = props.header.column.getIsSorted();
  const sortDirectionString = sortDirection === false ? 'asc' : sortDirection;

  let render = props.header.isPlaceholder
    ? null
    : flexRender(props.header.column.columnDef.header, props.header.getContext());

  if (props.header.column.getCanSort()) {
    render = (
      <TableSortLabel
        active={props.header.column.getIsSorted() !== false}
        direction={sortDirectionString}
        onClick={props.header.column.getToggleSortingHandler()}
      >
        {render}
      </TableSortLabel>
    );
  }
  return (
    <TableCell
      align="left"
      colSpan={props.header.colSpan}
      sx={{
        backgroundColor: blue[300],
        borderRight: '1px solid #e0e0e0',
        fontSize: props.fontSize
      }}
    >
      {render}
    </TableCell>
  );
}

export default CustomMuiHeader;
