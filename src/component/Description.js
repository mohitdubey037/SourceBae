import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './homepage59r.css';
import leftImage from '../assests/Images/onlyphoto.png';
// import DescriptionSelectbtn from './DescriptionSelectbtn';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactDOM from 'react-dom';
import TimezoneSelect from 'react-timezone-select';


const Description = () => {
    const history = useHistory();
    const [selectedTimezone, setSelectedTimezone] = useState('');
    const [value, setValue] = React.useState('5-10');
    const [location, setLocation] = useState('')
    const [expertise, setExpertise] = useState('')
    const [techstack, setTechstack] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const agencyDetails = async (e) => {
        e.preventDefault();
        const agencytoken = await localStorage.getItem("agencytoken");
        // console.log({ userId, value, location, expertise, techstack })
        // console.log(typeof (JSON.stringify(selectedTimezone)))
        const timeValue = JSON.stringify(selectedTimezone)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${agencytoken}`)

        var raw = JSON.stringify({ "teamsize": value, "location": location, "expertise": expertise, "techstack": techstack, "timezone": timeValue });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.onesourcing.in/agency/register", requestOptions)
            .then(response => response.json())
            .then((result) => (
                console.log(result),
                result.status == true ? (toast.success('Completed'),
                    history.push('/thankyoupage')) : toast.error('Try Again')
            ))
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
                        <div className="right-content right-content-description">
                            {/* <h1>Register as Client </h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p> */}
                            <form className="form-description">
                                <div className="inputArea">
                                    <label className="labels" for="Team" name="Team">Team</label><br />
                                    <FormControl component="fieldset">
                                        <RadioGroup className="radioButton-requirement" name="team" value={value} onChange={handleChange}>
                                            <FormControlLabel value="5-10" control={<Radio />} label="5-10" />
                                            <FormControlLabel value="10-20" control={<Radio />} label="10-20" />
                                            <FormControlLabel value="20+" control={<Radio />} label="20+" />
                                            {/* <FormControlLabel value="high" control={<Radio />} label="9+yrs" /> */}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="location">Location</label><br />
                                    <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="e.g- Indore"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="Expertise" name="expertise">Expertise</label><br />
                                    <input onChange={(e) => setExpertise(e.target.value)} type="text" placeholder="e.g- E-commerces"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="techstack" name="techstack">Techstack</label><br />
                                    <input onChange={(e) => setTechstack(e.target.value)} type="text" placeholder="e.g- React,Angular,etc"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="timezone" name="timezone">Timezone</label><br />
                                    <TimezoneSelect className="timezone"
                                        value={selectedTimezone}
                                        onChange={setSelectedTimezone}
                                    /><br />
                                </div>


                                <div className="btn-position-agency-client-description description-btn">
                                    <button className="button-class" onClick={agencyDetails}>
                                        <div className="button-text"><a>Next</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right"></i></div>
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

export default Description;