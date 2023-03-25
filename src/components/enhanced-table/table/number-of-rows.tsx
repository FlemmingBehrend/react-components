import * as React from 'react';
import { Typography } from '@mui/material';
import { TableThemeContext } from '../table-theme-context-provider';

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
  const tableTheme = React.useContext(TableThemeContext);
  return (
    <Typography sx={{ fontWeight: tableTheme.numberOfRowsFontWeight, color: tableTheme.numberOfRowsFontColor }}>
      {getDisplayedRows(props.totalRows)}
    </Typography>
  );
});

export default NumberOfRowsComponent;
