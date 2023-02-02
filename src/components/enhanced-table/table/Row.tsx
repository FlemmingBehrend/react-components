import * as React from 'react';
import { TableHeader } from './header-definitions';
import { Identible } from './cell-types/cell-definitions';
import { TableRow } from '@mui/material';

interface RowProps<DataDef> {
  row: DataDef & Identible;
  headers: TableHeader<DataDef>[];
}

function Row<DataDef>(props: RowProps<DataDef>) {
  return (
    <TableRow>
      {props.headers.map((header) => {
        return header.definition?.render(props.row[header.dataType], header.definition);
      })}
    </TableRow>
  );
}

export default Row;
