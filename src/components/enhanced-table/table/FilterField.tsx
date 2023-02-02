import * as React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function FilterComponent() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
      <FilterAltIcon sx={{ color: 'action.active', mr: 0.5, my: 0.5 }} />
      <TextField
        id="filterField"
        label="filter value"
        type="search"
        variant="standard"
        size="small"
        // value={filter}
        //     onChange={(e) => setFilter(e.target.value)}
      />
    </Box>
  );
}

export default FilterComponent;
