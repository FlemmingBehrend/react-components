import * as React from 'react';
import { Typography, useTheme } from '@mui/material';

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

const NumberOfRowsComponent = React.memo(function NumberOfRowsComponent(props: { totalRows: number }) {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.text.disabled
      }}
    >
      {getDisplayedRows(props.totalRows)}
    </Typography>
  );
});

export default NumberOfRowsComponent;
