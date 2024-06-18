import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AddPackage = (() => {
    
    return (
        <>
   <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
      <TextField id="standard-basic" label="name" variant="standard" />
      <TextField id="standard-basic" label="trackingNumber" variant="standard" />

      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="not collected" name="radio-buttons-group">
        <FormControlLabel value="female" control={<Radio />} label="collected" />
        <FormControlLabel value="male" control={<Radio />} label="not collected" />
      </RadioGroup>
    </FormControl>

      <TextField id="standard-basic" label="lat" variant="standard" />
      <TextField id="standard-basic" label="lng" variant="standard" />

    </Box>      
      </>
    )
})
export default AddPackage