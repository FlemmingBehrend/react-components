import { TableCell, Tooltip } from '@mui/material';
import * as React from 'react';
import { TableHeader } from '../types';

export interface HeaderCellProps<DataDef> {
  header: TableHeader<DataDef>;
  backgroundColor: string;
  seperatorColor: string;
}

function HeaderCell<DataDef>(props: HeaderCellProps<DataDef>) {
  return (
    <TableCell
      colSpan={props.header.colspan}
      align={props.header.definition?.align ?? 'left'}
      sx={{
        backgroundColor: props.backgroundColor,
        borderRight: `1px solid ${props.seperatorColor}`
      }}
    >
      {props.header.tooltip ? (
        <Tooltip title={props.header.tooltip}>
          <span style={{ whiteSpace: 'nowrap' }}>{props.header.label}</span>
        </Tooltip>
      ) : (
        <span style={{ whiteSpace: 'nowrap' }}>{props.header.label}</span>
      )}
    </TableCell>
  );
}

export default HeaderCell;
