import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Selector({ label, value, handleChange, options, disabled }) {
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value}
          label={label}
          onChange={handleChange}
          disabled={disabled}
        >
            {options.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}