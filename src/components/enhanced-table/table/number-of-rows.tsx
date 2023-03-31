import * as React from 'react';
import { Typography, useTheme } from '@mui/material';
import { ModeContext } from '../mode-context-provider';

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
  const modeContext = React.useContext(ModeContext);
  return (
    <Typography
      sx={{
        fontWeight: theme.enhancedTable[modeContext.mode].numberOfRowsFontWeight,
        color: theme.enhancedTable[modeContext.mode].numberOfRowsFontColor
      }}
    >
      {getDisplayedRows(props.totalRows)}
    </Typography>
  );
});

export default NumberOfRowsComponent;
