import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CustomedCheckBox({label}) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(!checked);
  };
  return (
    <FormControlLabel
        label={label}
        control={<Checkbox 
                    checked={checked} 
                    sx={{
                            color: 'var(--ocean-blue-pearl)',
                            '&.Mui-checked': {
                            color: 'var(--ocean-blue-pearl)',
                            },
                       }}
                    onChange={handleChange}
                />}
    />
  );
}
