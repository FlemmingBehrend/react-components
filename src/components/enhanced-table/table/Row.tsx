import * as React from 'react';
import { IconButton, TableCell, TableRow, styled, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { EnhancedTableHeader } from './header/header-options';
import { columnHasFunctions } from '../helpers';

const StyledRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface RowProps<DataDef> {
  row: DataDef;
  headers: EnhancedTableHeader<DataDef>[];
  stripedRows: boolean;
  expandable: boolean;
  rowColor: string;
}

function Row<DataDef>(props: RowProps<DataDef>) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function renderExpandCell() {
    if (props.expandable) {
      return (
        <TableCell>
          <IconButton size="small" aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon fontSize="inherit" /> : <KeyboardArrowDownIcon fontSize="inherit" />}
          </IconButton>
        </TableCell>
      );
    }
  }

  function renderExpandedElement() {
    if (open) {
      return (
        <StyledRow>
          <TableCell colSpan={props.headers.length + 1} sx={{ backgroundColor: theme.enhancedTable.cellExpandColor }}>
            EXPANDED
          </TableCell>
        </StyledRow>
      );
    }
  }

  function renderCell(header: EnhancedTableHeader<DataDef>) {
    const options = header.columnOptions;
    if (columnHasFunctions(options)) {
      return (
        <React.Fragment key={crypto.randomUUID()}>
          {options?.render(props.row[header.dataType], header.columnOptions!)}
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      <StyledRow sx={{ backgroundColor: props.rowColor }}>
        {props.expandable && renderExpandCell()}
        {props.headers.map((header) => {
          return <React.Fragment key={crypto.randomUUID()}>{renderCell(header)}</React.Fragment>;
        })}
      </StyledRow>
      {renderExpandedElement()}
    </React.Fragment>
  );
}

export default Row;
