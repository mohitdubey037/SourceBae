import React, { useEffect, useState } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import BackLeft from '../../../../assets/images/Back/Back-left.svg';
import './NewestAddDeveloper.css';

import model from '../../../../assets/images/AddDeveloper/modal3d.png'
import html from '../../../../assets/images/AddDeveloper/html.svg'
import css from '../../../../assets/images/AddDeveloper/css.svg'
import javscripts from '../../../../assets/images/AddDeveloper/javascript.svg'
import reacts from '../../../../assets/images/AddDeveloper/react.svg'
import angular from '../../../../assets/images/AddDeveloper/angular.svg'
import nodejs from '../../../../assets/images/AddDeveloper/nodejs.svg'
import mongodb from '../../../../assets/images/AddDeveloper/mongodb.svg'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function NewestAddDeveloper(props) {
    const classes = useStyles();
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="container-body">
            <Navbar />
            <div className="main-body_newestAddDeveloper">
                <div className="back-button_newestAddDeveloper">
                    <div className="image-div_newestAddDeveloper">
                        <img src={BackLeft} alt="Back left" />
                        <h6>Back</h6>
                    </div>
                    <div className="add-developer-div">
                        <h6>Add Developer</h6>
                    </div>
                </div>
                <div className="mainAddingDeveloper_newestAddDeveloper">
                    <div className="innerAddingDeveloper_newestAddDeveloper">
                        <div className="addingDeveloperHeadings_newestAddDeveloper">
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
                        <div className="inputForm_newestAddDeveloper">
                            <div className="inputField1_newestAddDeveloper">
                                <div className="developerName_newestAddDeveloper">
                                    <h6>First Name</h6>
                                    <input type="text" placeholder="First Name" name="firstName" />
                                </div>

                                <div className="developerName_newestAddDeveloper">
                                    <h6>Last Name</h6>
                                    <input type="text" placeholder="Last Name" name="lastName" />
                                </div>

                                <div className="developerDesignation_newestAddDeveloper">
                                    <h6>Designation</h6>
                                    <input type="text" placeholder="E.g- Angular Developer" name="developerDesignation" />
                                </div>
                            </div>
                            <div className="inputField5_newestAddDeveloper">
                                <div className="developerTechnology_newestAddDeveloper">
                                    <h6>Technology and Skills</h6>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="developerDesignation_newestAddDeveloper">
                                    <h6>Upload Resume</h6>
                                    <input type="file" placeholder="E.g- Angular Developer" name="" id="fileInput" accept="application/pdf,application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                                </div>
                            </div>
                            <div className="inputField2_newestAddDeveloper">
                                <h5>Years of Experience</h5>
                                <div className="experience-radio-container">
                                    <div className="experience-radio junior-radio">
                                        <input type="radio" />
                                        <label>junior(1-3 Years)</label>
                                    </div>
                                    <div className="black-strip_newestAddDeveloper"></div>
                                    <div className="experience-radio midrange-radio">
                                        <input type="radio" />
                                        <label>Mid Range(3 - 6 Years)</label>
                                    </div>
                                    <div className="black-strip_newestAddDeveloper"></div>
                                    <div className="experience-radio senior-radio">
                                        <input type="radio" />
                                        <label>Senior(6 - 9 Years)</label>
                                    </div>
                                </div>
                            </div>
                            <div className="inputField3_newestAddDeveloper">
                                <h5>Price Range(Monthly)</h5>
                                <div className="price-radio-container">
                                    <div>
                                        <input type="radio" />
                                        <label>Less Than $1500 Per Month</label>
                                    </div>
                                    <div>
                                        <input type="radio" />
                                        <label>$1500 - $2000 Per Month</label>
                                    </div>
                                    <div>
                                        <input type="radio" />
                                        <label>$2500 - $4000 Per Month</label>
                                    </div>
                                    <div>
                                        <input type="radio" />
                                        <label>More Than $4000 Per Month</label>
                                    </div>
                                </div>
                            </div>
                            <div className="inputField4_newestAddDeveloper">
                                <h5>Availability</h5>
                                <div className="availability-radio-container">
                                    <div className="availability-radio immediate">
                                        <input type="radio" />
                                        <label>Immediately</label>
                                    </div>
                                    <div className="availability-radio less-than-2-weeks">
                                        <input type="radio" />
                                        <label>Less Than 2 Weeks</label>
                                    </div>
                                    <div className="availability-radio more-than-2-weeks">
                                        <input type="radio" />
                                        <label>More Thank 2 Weeks </label>
                                    </div>
                                    <div className="availability-radio negotiable">
                                        <input type="radio" />
                                        <label>Negotiable</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewestAddDeveloper;