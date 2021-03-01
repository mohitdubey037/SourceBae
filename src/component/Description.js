import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './homepage59r.css';
import leftImage from '../assests/Images/onlyphoto.png';
import DescriptionSelectbtn from './DescriptionSelectbtn';

import ReactDOM from 'react-dom';
import TimezoneSelect from 'react-timezone-select';


const Description = () => {
    const [selectedTimezone, setSelectedTimezone] = useState('')

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
                                    <DescriptionSelectbtn />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="location">Location</label><br />
                                    <input type="text" placeholder="Select"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="Expertise" name="expertise">Expertise</label><br />
                                    <input type="text" placeholder="e.g- E-commerces"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="techstack" name="techstack">Techstack</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="timezone" name="timezone">Timezone</label><br />
                                    <TimezoneSelect className="timezone"
                                        value={selectedTimezone}
                                        onChange={setSelectedTimezone}
                                    /><br />
                                </div>


                                <div className="btn-position-agency-client-description">
                                    <NavLink className="button-class" to="/">
                                        <div className="button-text"><a>Next</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right"></i></div>
                                    </NavLink>
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