import { TableCell, TableSortLabel } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Header, flexRender } from '@tanstack/react-table';
import * as React from 'react';

interface CustomMuiHeaderProps {
  header: Header<any, unknown>;
}

function CustomMuiHeader({ header }: CustomMuiHeaderProps) {
  const sortDirection = header.column.getIsSorted();
  const sortDirectionString = sortDirection === false ? 'asc' : sortDirection;

  return header.column.getCanSort() ? (
    <TableCell colSpan={header.colSpan} sx={{ backgroundColor: blue[300], borderRight: '1px solid #e0e0e0' }}>
      <TableSortLabel
        active={header.column.getIsSorted() !== false}
        direction={sortDirectionString}
        onClick={header.column.getToggleSortingHandler()}
      >
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
      </TableSortLabel>
    </TableCell>
  ) : (
    <TableCell colSpan={header.colSpan} sx={{ backgroundColor: blue[300], borderRight: '1px solid #e0e0e0' }}>
      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
    </TableCell>
  );
}

export default CustomMuiHeader;
