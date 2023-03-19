import * as React from 'react';
import { TableHeader } from './header-definitions';
import { Identible } from './cell-types/cell-definitions';
import { TableRow, styled } from '@mui/material';
import { getLighterColor } from '../helpers';

const StripedTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor:
      theme.enhancedTable?.stripedRowsColor || theme.enhancedTable?.headers?.backgroundColor
        ? getLighterColor(theme.enhancedTable.headers.backgroundColor, 90)
        : theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface RowProps<DataDef> {
  row: DataDef & Identible;
  headers: TableHeader<DataDef>[];
  stripedRows: boolean;
}

function Row<DataDef>(props: RowProps<DataDef>) {
  return props.stripedRows ? (
    <StripedTableRow>
      {props.headers.map((header) => {
        return header.definition?.render(props.row[header.dataType], header.definition);
      })}
    </StripedTableRow>
  ) : (
    <TableRow>
      {props.headers.map((header) => {
        return header.definition?.render(props.row[header.dataType], header.definition);
      })}
    </TableRow>
  );
}

export default Row;
