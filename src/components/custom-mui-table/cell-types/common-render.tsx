import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, Tooltip, Typography } from '@mui/material';
import { Cell, isLink, isTooltip } from './cell';

function renderLink<T>(el: JSX.Element, cellObj: Cell<T>): JSX.Element {
  if (isLink(cellObj)) {
    el = (
      <Link href={cellObj.href} target={cellObj.target ?? '_blank'}>
        {el}
      </Link>
    );
  }
  return el;
}

function renderTooltip<T>(el: JSX.Element, cellObj: Cell<T>, isEllipsed: boolean): JSX.Element {
  const [tooltip, setTooltip] = useState<React.ReactNode>();

  useEffect(() => {
    if (isEllipsed) {
      setTooltip(
        <React.Fragment>
          <div>{cellObj.value as string}</div>
          <hr></hr>
          <div>{cellObj.tooltip}</div>
        </React.Fragment>
      );
    } else {
      setTooltip(<React.Fragment>{cellObj.tooltip}</React.Fragment>);
    }
  }, [isEllipsed]);

  if (isTooltip(cellObj)) {
    el = (
      <Tooltip title={tooltip} followCursor>
        {el}
      </Tooltip>
    );
  }
  return el;
}

function renderTypography(
  el: JSX.Element,
  fontSize: string | number,
  setIsEllipsed: Dispatch<SetStateAction<boolean>>
): JSX.Element {
  const cellRef = useRef<HTMLSpanElement>(null);

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

  el = (
    <Typography ref={cellRef} noWrap sx={{ fontSize }}>
      {el}
    </Typography>
  );

  return el;
}

export { renderLink, renderTooltip, renderTypography };
