import * as React from 'react';
import { EnhancedTableHeader } from './header-definitions';
import { Identible } from './cells/types/identible';
import { IconButton, TableCell, TableRow, styled, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface RowProps<DataDef> {
  row: DataDef & Identible;
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

  return (
    <React.Fragment>
      <StyledRow sx={{ backgroundColor: props.rowColor }}>
        {props.expandable && renderExpandCell()}
        {props.headers.map((header) => {
          return (
            <React.Fragment key={crypto.randomUUID()}>
              {header.definition?.render(props.row[header.dataType], header.definition)}
            </React.Fragment>
          );
        })}
      </StyledRow>
      {renderExpandedElement()}
    </React.Fragment>
  );
}

export default Row;
