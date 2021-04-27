import React, { useState } from 'react'
import ClientNavbar from '../../ClientNavbar'
import './HireDeveloper.css'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import month from '../../../../assets/images/ClientDashboard/shortTerm/calender.png'
import hourPrice from '../../../../assets/images/ClientDashboard/shortTerm/hourPrice.png'

const BlueRadio = withStyles({
    root: {
        color: '#26AFFF',
        '&$checked': {
            color: '#26AFFF',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function HireDeveloper() {
    const [billing, setBilling] = useState(1);
    const [value, setValue] = React.useState('Junior (1-3years)');
    const [budget, setBudget] = useState('less than $1500')
    const [budgetHour, setBudgetHour] = useState('less than $20');
    const [timeperiod, setTimeperiod] = useState('Immediately')
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleChangeBudget = (event) => {
        setBudget(event.target.value);
    };
    const handleChangeStartPeriod = (event) => {
        setTimeperiod(event.target.value);
    };
    const handleChangeBudgetHour = (event) => {
        setBudgetHour(event.target.value);
    };

    const changeBilling = (id) => {
        if (id != billing)
            setBilling(id)
    }

    return (
        <>
            <ClientNavbar />
            <div className="mainHireDeveloper">
                <div className="backArrow" onClick={() => { window.location.href = "/client-dashboard" }} >
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </div>
                <div className="innerHireDeveloper">
                    <div className="hireDeveloperForm">
                        <div className="hireDeveloperFormInfo">
                            <h2>predilection</h2>
                            <p>Financed new companies and Enterprises are battling to recruit quality engineers quicker. Even in the wake of offering higher remuneration, advantages and investment opportunities, the ability pool stays restricted. </p>
                            <p>26,714 natural solicitations including K***book, Dunzo, Lenskart, IndiaGold, medcords, Shopkirana, Infobeans, pepsico, homelane, Razorpay, Townscript, Bewakoof, SAP, Samsung</p>
                        </div>

                        <div className="roleLooking">
                            <p>1. What roles are you looking for?</p>
                            <input type="text" placeholder="E.g- FrontEnd,Backend,etc.." name="" id="" />
                        </div>

                        <div className="resourceNumber">
                            <p>2. Number of Resources</p>
                            <input type="number" min="1" placeholder="E.g- 1 or 2" />
                        </div>
                        <div className="skillsRequiredDeveloper">
                            <p>3. Skills Required</p>
                            <input type="text" placeholder="Type here.." />
                        </div>
                        <div className="averageExperience">
                            <p>4. Average Experience</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="Junior (1-3years)" control={<BlueRadio />} label="Junior (1-3years)" />
                                    <FormControlLabel value="Mid Range (3-6 years)" control={<BlueRadio />} label="Mid Range (3-6 years)" />
                                    <FormControlLabel value="Senior (6-9 years)" control={<BlueRadio />} label="Senior (6-9 years)" />

                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="prefferedBilling">
                            <p>5. Preffered Billing</p>
                            <div className="billingOptions">
                                <div className="billingButton" onClick={() => changeBilling(1)} >
                                    {
                                        billing == 1 ? <i class="fa fa-check-circle" aria-hidden="true"></i> : null
                                    }
                                    <img src={month} alt="" />
                                    <h6>Monthly</h6>
                                </div>
                                <div className="billingButton" onClick={() => changeBilling(2)}>
                                    {
                                        billing == 2 ? <i class="fa fa-check-circle" aria-hidden="true"></i> : null
                                    }
                                    <img src={hourPrice} alt="" />
                                    <h6>Monthly</h6>
                                </div>
                            </div>
                        </div>

                        <div className="averageBudget">
                            <p>6. Average Budget</p>
                            {
                                billing == 1 ? (
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="gender" name="gender1" value={budget} onChange={handleChangeBudget}>
                                            <FormControlLabel value="less than $1500" control={<BlueRadio />} label="less than $1500" />
                                            <FormControlLabel value="$1500-$2500" control={<BlueRadio />} label="$1500-$2500" />
                                            <FormControlLabel value="$2500-$4000" control={<BlueRadio />} label="$2500-$4000" />
                                            <FormControlLabel value="More than $4000" control={<BlueRadio />} label="More than $4000" />

                                        </RadioGroup>
                                    </FormControl>
                                ) : (<FormControl component="fieldset">
                                    <RadioGroup aria-label="gender" name="gender1" value={budgetHour} onChange={handleChangeBudgetHour}>
                                        <FormControlLabel value="less than $20" control={<BlueRadio />} label="less than $20" />
                                        <FormControlLabel value="$20-$40" control={<BlueRadio />} label="$20-$40" />
                                        <FormControlLabel value="$40-$60" control={<BlueRadio />} label="$40-$60" />
                                        <FormControlLabel value="Above $60" control={<BlueRadio />} label="Above $60" />

                                    </RadioGroup>
                                </FormControl>)
                            }

                        </div>


                        <div className="startPeriod">
                            <p>7. Start Date</p>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={timeperiod} onChange={handleChange}>
                                    <FormControlLabel value="Immediately" control={<BlueRadio />} label="Immediately" />
                                    <FormControlLabel value="in 1 to 2 weeks" control={<BlueRadio />} label="in 1 to 2 weeks" />
                                    <FormControlLabel value="more than 2 weeks" control={<BlueRadio />} label="more than 2 weeks" />
                                    <FormControlLabel value="negotiable" control={<BlueRadio />} label="negotiable" />

                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className="contractPeriod">
                            <p>8. Contract Periods</p>
                            <select name="contractPeriod" id="contractPeriod">
                                <option value="volvo">1 Month</option>
                                <option value="saab">3 Months</option>
                                <option value="opel">6 Months</option>
                                <option value="audi">12 Months</option>
                            </select>
                        </div>

                        <div className="submitBtn">
                            <div></div>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HireDeveloper
