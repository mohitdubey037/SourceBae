import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './homepage59r.css';
import leftImage from '../assests/Images/onlyphoto.png';
// import RequirementSelectbtn from './RequirementSelectbtn';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ReactDOM from 'react-dom';
import TimezoneSelect from 'react-timezone-select';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@material-ui/core';

const Requirement = () => {
    const history = useHistory();
    const [value, setValue] = React.useState('Grade A');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [selectedTimezone, setSelectedTimezone] = useState('')
    const [tech, setTech] = useState('')
    const [budget, setBudget] = useState('')

    const clientDetails = async (e) => {
        e.preventDefault();
        const clienttoken = await localStorage.getItem("clienttoken");
        const timeValue = JSON.stringify(selectedTimezone)
        console.log(typeof (timeValue))
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${clienttoken}`);
        myHeaders.append("Content-Type", "application/json");
        const userId = "603caf525e41ed0b3bb8c03e";
        var raw = JSON.stringify({ "techstack": tech, "grade": value, "budgetPerResource": budget, "timezone": timeValue, "userId": userId });
        console.log(raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.235.79.27:8000/client/register/1", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                result.status == true ? toast.success("Completed") : toast.error("Try Again")
                history.push('/requirementex')
            })
            .catch(error => console.log('error', error));


    }


    return (
        <>
            <div className="main-container">
                <div className="inner-container">
                    <div className="left-inner-container">
                        <div className="circle-1"></div>
                        <div className="circle-2"></div>
                        <div className="circle-3"></div>
                        <div className="circle-4"></div>
                        <div className="photo">
                            <img src={leftImage} alt="photo" />
                        </div>
                    </div>
                    <div className="right-inner-container">
                        <div className="right-content">
                            <h1>Your Requirement </h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                            <form>
                                <div className="inputArea">
                                    <label className="labels" for="Tech" name="Tech">Tech</label><br />
                                    <input onChange={(e) => setTech(e.target.value)} type="text" placeholder="Select"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="Grade">Grade</label><br />
                                    <FormControl component="fieldset">
                                        <RadioGroup className="radioButton-requirement" name="experience" value={value} onChange={handleChange}>
                                            <FormControlLabel value="Grade A" control={<Radio />} label="A" />
                                            <FormControlLabel value="Grade B" control={<Radio />} label="B" />
                                            <FormControlLabel value="Grade C" control={<Radio />} label="C" />
                                            {/* <FormControlLabel value="high" control={<Radio />} label="9+yrs" /> */}
                                        </RadioGroup>
                                    </FormControl>

                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="Budget" name="Budget">Budget per resource</label><br />
                                    <input onChange={(e) => setBudget(e.target.value)} type="text" placeholder="Select"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="timezone" name="timezone">Timezone</label><br />
                                    <TimezoneSelect className="timezone"
                                        value={selectedTimezone}
                                        onChange={setSelectedTimezone}
                                    /><br />
                                </div>

                                <div className="btn-position-requirement">
                                    <button className="button-class" >
                                        <div className="button-text"><a href="/client">Previous</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right previous-icon"></i></div>
                                    </button>
                                    <button className="button-class" onClick={clientDetails}>
                                        <div className="button-text"><a>Next</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right next-icon"></i></div>
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Requirement;

