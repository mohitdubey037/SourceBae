import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './homepage59r.css'

const DescriptionSelectbtn = () => {
    const [value, setValue] = React.useState('start');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup className="radioButton-requirement" name="team" value={value} onChange={handleChange}>
                <FormControlLabel value="start" control={<Radio />} label="5-10" />
                <FormControlLabel value="medium" control={<Radio />} label="10-20" />
                <FormControlLabel value="high" control={<Radio />} label="20+" />
                {/* <FormControlLabel value="high" control={<Radio />} label="9+yrs" /> */}
            </RadioGroup>
        </FormControl>
    )

}
export default DescriptionSelectbtn