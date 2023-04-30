import * as React from 'react';
import { CellContext } from '@tanstack/react-table';
import { valueIsObject } from '../guards';
import CustomMuiCell from '../custom-mui-cell';
import { Tooltip, Typography } from '@mui/material';

interface StringCellOptions {}

function StringCell<T>(info: CellContext<T, any>, options?: StringCellOptions) {
  console.log(info.getValue());
  const o = info.getValue();
  if (valueIsObject(o)) {
    const { href, target, tooltip, value } = o;
    console.log(href, target, tooltip, value);
    return (
      <Tooltip title={tooltip} followCursor>
        <Typography noWrap>{value}</Typography>
      </Tooltip>
    );
  } else {
    return o;
  }
}

export { StringCell };
