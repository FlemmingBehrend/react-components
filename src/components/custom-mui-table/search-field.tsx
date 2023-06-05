import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const StyledFilterField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  }
}));

interface SearchComponentProps {
  setSearchValue: (value: string) => void;
  searchValue: string;
}

const SearchComponent = React.memo(function SearchComponent(props: SearchComponentProps) {
  const [value, setValue] = React.useState(props.searchValue);

  React.useEffect(() => {
    setValue(props.searchValue);
  }, [props.searchValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      props.setSearchValue(value);
    }, 300);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
      <SearchIcon sx={{ mr: 0.5, my: 0.5 }} />
      <StyledFilterField
        id="filterField"
        placeholder="search value"
        type="search"
        variant="standard"
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
});

export default SearchComponent;
