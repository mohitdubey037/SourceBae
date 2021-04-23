import React, { useState } from 'react'
import ClientNavbar from '../../ClientNavbar'
import './HireAgencyForms.css'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';

const BlueRadio = withStyles({
    root: {
        color: '#26AFFF',
        '&$checked': {
            color: '#26AFFF',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const HireAgencyForm1 = () => {

    const [days, setDays] = useState(30);
    const [value, setValue] = React.useState('Below $5,000');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const upArrow = () => {
        if (days < 180)
            setDays(days + 15)
    }
    const downArrow = () => {
        if (days > 30)
            setDays(days - 15)
    }


    return (
        <>
            <ClientNavbar />

            <div className="mainHireAgencyForm1">
                <div className="innerHigherAgencyForm1">
                    <div className="higherAgencyFormArea">
                        <div className="stepCheck">
                            <p>Step 1</p>
                            <span>Help us understand more about your project..!!</span>
                        </div>
                        <div className="projectNameAgency">
                            <p>1. What will be the name of your project?</p>
                            <input type="text" name="" placeholder="Start from here.." id="" />
                        </div>
                        <div className="descriptionProjectAgency">
                            <p>2. Describe a little bit about your project?</p>
                            <textarea name="" id="" cols="30" rows="6"></textarea>
                            <div>
                                <span>More than 100 characters</span>
                                <span>0/100</span>
                            </div>
                        </div>
                        <div className="budgetSectionAreaAgency">
                            <p>3. What's your budget for this project?</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="Below $5,000" control={<BlueRadio />} label="Below $5,000" />
                                    <FormControlLabel value="$5,000-$10,000" control={<BlueRadio />} label="$5,000-$10,000" />
                                    <FormControlLabel value="$10,000-$20,000" control={<BlueRadio />} label="$10,000-$20,000" />
                                    <FormControlLabel value="$20,000-$50,000" control={<BlueRadio />} label="$20,000-$50,000" />
                                    <FormControlLabel value="More than $50,000" control={<BlueRadio />} label="More than $50,000" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="numberOfDays">
                            <p>4. How soon do you want to start?</p>
                            <div className="daysInputAgency">
                                <p>{days} days</p>
                                <div className="upArrow" onClick={upArrow} ><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                <div className="downArrow" onClick={downArrow} ><i class="fa fa-angle-down" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div className="nextBtn">
                            <div></div>
                            <NavLink to="/hire-agency-form-two" >Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                        </div>
                    </div>
                    <div className="higherAgencyInfoArea">
                        <h4>Points to Remember</h4>
                        <p>1. Keep the project name simple and to your brand.</p>
                        <p>2. Write about your service or idea in clear manner, with as many details as possible.</p>
                        <p>3. In case, you think you missed any details you can always edit this later.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HireAgencyForm1