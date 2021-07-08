/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import instance from "../../../Constants/axiosConstants";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Spinner from '../../../Components/Spinner/Spinner';

const MenuProps = {
    getContentAnchorEl: () => null,
    PaperProps: {
        style: {
            maxHeight: 230,
            width: 250,
            top: 350,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));

function getStyles(singleTechObject, allTechnologies, theme) {
    return {
        fontWeight:
            allTechnologies.indexOf(singleTechObject) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function AddingDeveloper(props) {

    const theme = useTheme();

    const classes = useStyles();
    const Role = localStorage.getItem('role')

    const [developerData, setDeveloperData] = React.useState(
        {
            firstName: "",
            lastName: "",
            agencyId: localStorage.getItem("userId") ?? "",
            developerDesignation: "",
            developerTechnologies: [

            ],
            developerDocuments: [
                {
                    documentName: "",
                    documentLink: ""
                }
            ],
            developerExperience: "",
            developerPriceRange: "",
            developerAvailability: ""
        })

    const [techs, setTechs] = useState([]);
    const [techIds, setTechIds] = React.useState([]);
    const [isDisabled, setIsDisabled] = useState(true)
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        if (name === "developerTechnologies") {
            setDeveloperData(
                {
                    ...developerData,
                    [name]: [value]
                }
            )
        }
        else {
            setDeveloperData(
                {
                    ...developerData,
                    [name]: value
                })
        }
    }

    const technologyHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "developerTechnologies") {
            setDeveloperData({
                ...developerData,
                [name]: value,
            });
            setTechIds(value);
        } else {
            setDeveloperData({
                ...developerData,
                [name]: value,
            });
        }
    };

    const getAllTechs = () => {
        instance.get(`api/${Role}/technologies/all`)
            .then(function (response) {
                setTechs(response);
                setLoading(false);
            })
    }

    const inputFileChoosen = (e) => {
        setResume(e.target.files[0])
        setIsDisabled(false)
    }

    const uploadMedia = () => {
        console.log('hire');
        setLoading(true)
        const formData = new FormData();
        resume && formData.append(
            "files",
            resume,
            resume.name
        );
        instance.post(`api/${Role}/media/create`, formData)
            .then(function (response) {
                setLoading(false);
                setDeveloperData({
                    ...developerData,
                    developerDocuments: [
                        {
                            documentName: "Resume",
                            documentLink: response[0].mediaURL
                        }
                    ]
                })
            })
            .catch(err => {
                setLoading(false);
            })

    }

    useEffect(() => {
        if (resume !== null) {
            uploadMedia()
        }
    }, [resume])

    const errorValidation = () => {
        console.log('h');
        const errors = {};
        if (developerData.firstName === '') {
            errors.firstName = 'First Name is required'
        }
        else if (developerData.lastName === '') {
            errors.lastName = 'Last Name is required'
        }
        else if (developerData.developerDesignation === '') {
            errors.developerDesignation = 'Developer Designation is required'
        }
        else if (developerData.developerTechnologies.length === 0) {
            errors.developerTechnologies = 'Technologies is required'
        }
        else if (resume === null) {
            errors.developerResume = 'Resume is required'
        }
        else if (developerData.developerExperience === '') {
            errors.developerExperience = 'Developer Experience is required'
        }
        else if (developerData.developerPriceRange === '') {
            errors.developerPrice = 'Developer Price is required'
        }
        else if (developerData.developerAvailability === '') {
            errors.developerAvailability = 'Developer Availability is required'
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0)
            return true;
        else
            return false;
    }

    const createDeveloperApi = () => {
        if (errorValidation()) {
            setLoading(true)
            instance.post(`api/${Role}/developers/create`, developerData)
                .then(function (response) {
                    setLoading(false);
                    props.history.push({
                        pathname: "/agency-profile",
                        origin: 'addingDeveloper'
                    })
                })
                .catch(error => {
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        getAllTechs()
    }, []);

    return (
        <>
            <Navbar />

            {loading ? <Spinner /> :

                <div className="mainAddingDeveloper">
                    <div style={{ marginTop: '4rem' }} className="backArrow" onClick={() => { props.history.push("/dashboard") }} >
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>
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
                                <div className="developerName_addingDeveloper">
                                    <h4>First Name</h4>
                                    <input type="text" placeholder="First Name" name="firstName" value={developerData.firstName} onChange={(event) => handleChange(event)} />
                                    {errors.firstName && (<p style={{ color: "red", fontWeight: "normal", fontSize: "14px", marginBottom: '0px' }}>{errors.firstName}</p>)}
                                </div>

                                <div className="developerName_addingDeveloper">
                                    <h4>Last Name</h4>
                                    <input type="text" placeholder="Last Name" name="lastName" value={developerData.lastName} onChange={(event) => handleChange(event)} />
                                    {errors.lastName && (<p style={{ color: "red", fontWeight: "normal", fontSize: "14px", marginBottom: '0px' }}>{errors.lastName}</p>)}
                                </div>

                                <div className="developerDesignation_addingDeveloper">
                                    <h4>Designation</h4>
                                    <input type="text" placeholder="E.g- Angular Developer" name="developerDesignation" value={developerData.developerDesignation} onChange={(event) => handleChange(event)} />
                                    {errors.developerDesignation && (<p style={{color: "red", fontWeight: "normal", fontSize: "14px", marginBottom: '0px' }}>{errors.developerDesignation}</p>)}
                                </div> 
                            </div>
                            <div className="inputField1">
                                <div className="developerName_addingDeveloper">
                                    <h4>Technology & Skills</h4>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            labelId="demo-mutiple-name"
                                            name="developerTechnologies"
                                            multiple
                                            displayEmpty
                                            MenuProps={MenuProps}
                                            onChange={technologyHandler}
                                            value={techIds}
                                            input={<Input />}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return <em>Choose from here</em>;
                                                }
                                                return techs.filter(t => selected.includes(t._id)).map(t => t.technologyName).join(', ');
                                            }}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem disabled value="">
                                                <em>Choose from here</em>
                                            </MenuItem>
                                            {techs.map((tech) => {
                                                return (
                                                    <MenuItem
                                                        key={tech._id}
                                                        value={tech._id}
                                                        style={getStyles(tech, techIds, theme)}
                                                    >
                                                        {tech.technologyName}
                                                    </MenuItem>
                                                )
                                            }
                                            )
                                            }
                                        </Select>
                                        {errors.developerTechnologies && (<p style={{color: "red", fontWeight: "normal", fontSize: "14px" }}>{errors.developerTechnologies}</p>)}
                                    </FormControl>

                                    {/* </select> */}
                                </div>
                                <div className="developerDesignation_addingDeveloper">
                                    <h4>Upload Resume</h4>
                                    <input onChange={inputFileChoosen} type="file" placeholder="E.g- Angular Developer" name="" id="fileInput" accept="application/pdf,application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                                    {errors.developerResume && (<p style={{ color: "red", fontWeight: "normal", fontSize: "14px" }}>{errors.developerResume}</p>)}
                                </div>
                            </div>
                            <div className="yearsOfExperience_addingDeveloper">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Years of Experience</FormLabel>
                                    <RadioGroup aria-label="developerExperience" name="developerExperience" value={developerData.developerExperience} onChange={(event) => handleChange(event)}>
                                        <FormControlLabel value="1" control={<Radio />} label="Junior(1-3years)" />
                                        <FormControlLabel value="3" control={<Radio />} label="Mid Range(3-6years)" />
                                        <FormControlLabel value="6" control={<Radio />} label="Senior(6-9years)" />
                                    </RadioGroup>
                                </FormControl>
                                {errors.developerExperience && (<p style={{ color: "red", fontWeight: "normal", fontSize: "14px" }}>{errors.developerExperience}</p>)}
                            </div>
                            <div className="priceRange">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Price Range(Monthly)</FormLabel>
                                    <RadioGroup aria-label="developerPriceRange" name="developerPriceRange" value={developerData.developerPriceRange} onChange={(event) => handleChange(event)}>
                                        <FormControlLabel value="1500" control={<Radio />} label="less than $1500 per month" />
                                        <FormControlLabel value="2500" control={<Radio />} label="$1500-$2500 per month" />
                                        <FormControlLabel value="4000" control={<Radio />} label="$2500-$4000 per month" />
                                        <FormControlLabel value="6000" control={<Radio />} label="More than $4000 per month" />
                                    </RadioGroup>
                                </FormControl>
                                {errors.developerPrice && (<p style={{ color: "red", fontWeight: "normal", fontSize: "14px" }}>{errors.developerPrice}</p>)}
                            </div>
                            <div className="availabilityArea">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Availability</FormLabel>
                                    <RadioGroup aria-label="developerAvailability" name="developerAvailability" value={developerData.developerAvailability} onChange={(event) => handleChange(event)}>
                                        <FormControlLabel value="0" control={<Radio />} label="Immediately" />
                                        <FormControlLabel value="1" control={<Radio />} label="less than 2 weeks" />
                                        <FormControlLabel value="2" control={<Radio />} label="More than 2 weeks" />
                                        <FormControlLabel value="-1" control={<Radio />} label="Negotiable" />
                                    </RadioGroup>
                                </FormControl>
                                {errors.developerAvailability && (<p style={{ color: "red", fontWeight: "normal", fontSize: "14px" }}>{errors.developerAvailability}</p>)}
                            </div>
                            <div className="submitButton">
                                <button onClick={() => createDeveloperApi()}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AddingDeveloper
