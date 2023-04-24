import * as React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material';

const StyledFilterField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.enhancedTable.filterFieldColor
  }
}));

interface FilterComponentProps {
  setFilter: (filter: string) => void;
}

const FilterComponent = React.memo(function FilterComponent(props: FilterComponentProps) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
      <FilterAltIcon sx={{ color: theme.enhancedTable.filterFieldColor, mr: 0.5, my: 0.5 }} />
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
