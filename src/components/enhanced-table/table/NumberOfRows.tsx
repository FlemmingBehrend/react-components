import React, { memo } from 'react';
import { Typography } from '@mui/material';

function getDisplayedRows(rows: number) {
  switch (rows) {
    case 0:
      return 'No rows displayed';
    case 1:
      return '1 row displayed';
    default:
      return `${rows} rows displayed`;
  }
}

const NumberOfRowsComponent = memo(function NumberOfRowsComponent(props: { totalRows: number; color: string }) {
  return <Typography sx={{ fontWeight: 'bolder', color: props.color }}>{getDisplayedRows(props.totalRows)}</Typography>;
});

export default NumberOfRowsComponent;
