import * as React from 'react';
import { CellContext } from '@tanstack/react-table';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface BooleanCellOptions {
  imageMap: {
    true: React.ReactNode;
    false: React.ReactNode;
  };
}

const defaultImageMap: BooleanCellOptions['imageMap'] = {
  true: <CheckIcon />,
  false: <ClearIcon />
};

function BooleanCell<T>(info: CellContext<T, any>, options?: BooleanCellOptions) {
  const value = info.getValue() as boolean;
  const imageMap = options?.imageMap || defaultImageMap;
  return value ? imageMap.true : imageMap.false;
}

export { BooleanCell };
