import * as React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { EnhancedTableThemeContext } from '../table-theme-context-provider';
import { red } from '@mui/material/colors';
import { makeStyles, styled, useTheme } from '@mui/material';

const StyledFilterField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.enhancedTable[theme.palette.mode].filterFieldColor
  }
}));

interface FilterComponentProps {
  setFilter: (filter: string) => void;
}

const FilterComponent = React.memo(function FilterComponent(props: FilterComponentProps) {
  const theme = useTheme();
  const tableTheme = React.useContext(EnhancedTableThemeContext);
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
      <FilterAltIcon
        sx={{ color: theme.palette.enhancedTable[theme.palette.mode].filterFieldColor, mr: 0.5, my: 0.5 }}
      />
      <StyledFilterField
        id="filterField"
        placeholder="filter value"
        type="search"
        variant="standard"
        size="small"
        onChange={(e) => props.setFilter(e.target.value)}
      />
    </Box>
  );
});

export default FilterComponent;
