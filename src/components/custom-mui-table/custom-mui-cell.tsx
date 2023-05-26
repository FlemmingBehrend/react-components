import { Tooltip, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { isTooltip } from './cell-types/cell';

interface CellProps {
  tooltip?: string | React.ReactNode;
  href?: string;
  target?: string;
  children: React.ReactNode;
}

function CustomMuiCell(props: CellProps) {
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
    if (props.href) {
      return (
        <a href={props.href} target={props.target ?? '_blank'} style={{ color: theme.palette.text.primary }}>
          {props.children}
        </a>
      );
    }
  }

  return (
    <Tooltip title={tooltip} followCursor>
      <Typography noWrap ref={cellRef} sx={{ color: theme.palette.text.primary }}>
        {props.href ? renderLink() : props.children}
      </Typography>
    </Tooltip>
  );
}

export default CustomMuiCell;
