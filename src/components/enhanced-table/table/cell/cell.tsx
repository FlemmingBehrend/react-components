import { TableCell, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

type LinkType = {
  href: string;
  target?: string;
};

type CellProps = {
  align: 'left' | 'right' | 'center';
  tooltip?: string | React.ReactNode;
  link?: LinkType;
  children: React.ReactNode;
};

function Cell(props: CellProps) {
  const theme = useTheme();
  const cellRef = useRef<HTMLSpanElement>(null);
  const [isEllipsed, setIsEllipsed] = useState(false);
  const [tooltip, setTooltip] = useState<React.ReactNode>();

  useEffect(() => {
    if (!isEllipsed) {
      props.tooltip && setTooltip(<React.Fragment>{props.tooltip}</React.Fragment>);
    } else {
      setTooltip(
        <React.Fragment>
          <div>{props.children}</div>
          <div>{props.tooltip}</div>
        </React.Fragment>
      );
    }
  }, [isEllipsed]);

  useLayoutEffect(() => {
    const cellEl = cellRef.current;
    if (!cellEl) {
      return;
    }
    if (cellEl.clientWidth < cellEl.scrollWidth) {
      setIsEllipsed(true);
    } else {
      setIsEllipsed(false);
    }
  }, [cellRef.current]);

  function renderLink() {
    if (props.link) {
      return (
        <a
          href={props.link.href}
          target={props.link.target ?? '_blank'}
          style={{ color: theme.enhancedTable.cellFontColor }}
        >
          {props.children}
        </a>
      );
    }
  }

  return (
    <TableCell align={props.align}>
      <Tooltip title={tooltip} followCursor>
        <Typography noWrap ref={cellRef} sx={{ color: theme.enhancedTable.cellFontColor }}>
          {props.link ? renderLink() : props.children}
        </Typography>
      </Tooltip>
    </TableCell>
  );
}

export default Cell;
