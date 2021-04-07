import React, { useState } from 'react'
import Navbar from '../Navbar'

import './AddingDeveloper.css'
import model from '../../../assets/images/AddDeveloper/modal3d.png'
import html from '../../../assets/images/AddDeveloper/html.svg'
import css from '../../../assets/images/AddDeveloper/css.svg'
import javscripts from '../../../assets/images/AddDeveloper/javascript.svg'
import reacts from '../../../assets/images/AddDeveloper/react.svg'
import angular from '../../../assets/images/AddDeveloper/angular.svg'
import nodejs from '../../../assets/images/AddDeveloper/nodejs.svg'
import mongodb from '../../../assets/images/AddDeveloper/mongodb.svg'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function AddingDeveloper() {

    const inputFileChoosen = (e) => {
        console.log(e.target.files[0].type)
    }

    const [experienceValue, setExperineceValue] = useState('junior');
    const [pricerange, setPricerange] = useState('2500');
    const [availability, setAvailability] = useState('immediately');

    const handleExperience = (event) => {
        setExperineceValue(event.target.value);
    };
    const handlePrice = (event) => {
        setPricerange(event.target.value);
    };
    const handleAvailability = (event) => {
        setAvailability(event.target.value);
    };

    return (
        <>
            <Navbar />

            <div className="mainAddingDeveloper">
                <div className="innerAddingDeveloper">
                    <div className="addingDeveloperHeadings">
                        <img src={model} className="model3d" alt="" />
                        <img src={html} className="techImage html" alt="" />
                        <img src={css} className="techImage css" alt="" />
                        <img src={javscripts} className="techImage javascripts" alt="" />
                        <img src={reacts} className="techImage reacts" alt="" />
                        <img src={angular} className="techImage angular" alt="" />
                        <img src={nodejs} className="techImage nodejs" alt="" />
                        <img src={mongodb} className="techImage mongodb" alt="" />
                        <h1>Adding Developer</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, reiciendis natus inventore laborum distinctio numquam cum pariatur voluptatum vero ipsum.</p>
                        <div className="pointsToRemember">
                            <h2>Points To Remember</h2>
                            <ul>
                                <li>Fill Form Carefully</li>
                                <li>Drop the Resume</li>
                                <li>We will reach you shortly</li>
                            </ul>
                        </div>
                    </div>
                    <div className="inputForm">
                        <div className="inputField1">
                            <div className="developerName">
                                <h4>Name</h4>
                                <input type="text" placeholder="Name" />
                            </div>
                            <div className="developerDesignation">
                                <h4>Designation</h4>
                                <input type="text" placeholder="E.g- Angular Developer" name="" id="" />
                            </div>
                        </div>
                        <div className="inputField1">
                            <div className="developerName">
                                <h4>Technology & Skills</h4>
                                <input type="text" list="browsers" placeholder="Name" />
                                <datalist id="browsers">
                                    <option>Nodejs</option>
                                    <option>Angular js</option>
                                    <option>Laravel </option>
                                    <option>Php </option>

                                </datalist>
                            </div>
                            <div className="developerDesignation">
                                <h4>Upload Resume</h4>
                                <input onChange={inputFileChoosen} type="file" placeholder="E.g- Angular Developer" name="" id="fileInput" />
                            </div>
                        </div>
                        <div className="yearsOfExperience">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Years of Experience</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={experienceValue} onChange={handleExperience}>
                                    <FormControlLabel value="junior" control={<Radio />} label="Junior(1-3years)" />
                                    <FormControlLabel value="midrange" control={<Radio />} label="Mid Range(3-6years)" />
                                    <FormControlLabel value="senior" control={<Radio />} label="Senior(6-9years)" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="priceRange">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Price Range(Monthly)</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={pricerange} onChange={handlePrice}>
                                    <FormControlLabel value="1500" control={<Radio />} label="less than $1500 per month" />
                                    <FormControlLabel value="2500" control={<Radio />} label="$1500-$2500 per month" />
                                    <FormControlLabel value="4000" control={<Radio />} label="$2500-$4000 per month" />
                                    <FormControlLabel value="6000" control={<Radio />} label="More than $4000 per month" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="availabilityArea">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Availability</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={availability} onChange={handleAvailability}>
                                    <FormControlLabel value="immediately" control={<Radio />} label="Immediately" />
                                    <FormControlLabel value="less2week" control={<Radio />} label="less than 2 weeks" />
                                    <FormControlLabel value="more2week" control={<Radio />} label="More than 2 weeks" />
                                    <FormControlLabel value="negotiable" control={<Radio />} label="Negotiable" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="submitButton">
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddingDeveloper
