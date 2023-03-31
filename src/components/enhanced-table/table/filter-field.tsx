import * as React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ModeContext } from '../mode-context-provider';
import { styled, useTheme } from '@mui/material';

declare module '@mui/material/TextField' {
  interface BaseTextFieldProps {
    mode: 'light' | 'dark';
  }
}

const StyledFilterField = styled(TextField)(({ theme, mode }) => ({
  '& .MuiInputBase-input': {
    color: theme.enhancedTable[mode].filterFieldColor
  }
}));

interface FilterComponentProps {
  setFilter: (filter: string) => void;
}

const FilterComponent = React.memo(function FilterComponent(props: FilterComponentProps) {
  const theme = useTheme();
  const modeContext = React.useContext(ModeContext);
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
      <FilterAltIcon sx={{ color: theme.enhancedTable[modeContext.mode].filterFieldColor, mr: 0.5, my: 0.5 }} />
      <StyledFilterField
        id="filterField"
        placeholder="filter value"
        type="search"
        variant="standard"
        size="small"
        mode={modeContext.mode}
        onChange={(e) => props.setFilter(e.target.value)}
      />
    </Box>
  );
});

export default FilterComponent;
