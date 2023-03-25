import * as React from 'react';
import { EnhancedTableHeader } from './header-definitions';
import { Identible } from './cell-types/cell-definitions';
import { IconButton, TableCell, TableRow, styled } from '@mui/material';
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
  const [open, setOpen] = React.useState(false);

  function renderExpandCell() {
    if (props.expandable) {
      return (
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      );
    }
  }

  function renderExpandedElement() {
    if (open) {
      return (
        <StyledRow>
          <TableCell colSpan={props.headers.length + 1}>EXPANDED</TableCell>
        </StyledRow>
      );
    }
  }

  return (
    <React.Fragment>
      <StyledRow sx={{ backgroundColor: props.rowColor }}>
        {props.expandable && renderExpandCell()}
        {props.headers.map((header) => {
          return header.definition?.render(props.row[header.dataType], header.definition);
        })}
      </StyledRow>
      {renderExpandedElement()}
    </React.Fragment>
  );
}

export default Row;
