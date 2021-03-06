import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './homepage59r.css';
import leftImage from '../assests/Images/onlyphoto.png';
import ThankyouPage from './ThankyouPage';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RequirementExtended = () => {
    const history = useHistory();
    const [projectStage, setProjectStage] = useState('Basic');
    const [joiningtiming, setJoiningTiming] = useState('Basic');
    const [hireType, setHireType] = useState('Basic');
    const [contractType, setContractType] = useState('Basic');

    const projectstageChange = (event) => {
        setProjectStage(event.target.value);
    };
    const joiningtimingChange = (event) => {
        setJoiningTiming(event.target.value);
    };
    const hireTypeChange = (event) => {
        setHireType(event.target.value);
    };
    const contractTypeChange = (event) => {
        setContractType(event.target.value);
    };


    const veryfyingRequirements = async (e) => {
        e.preventDefault();
        const clienttoken = await localStorage.getItem("clienttoken");
        // console.log(projectStage, joiningtiming, hireType, contractType)

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${clienttoken}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "clientId": "603e25de41f5961fd30a3091", "projectStage": projectStage, "joiningTime": joiningtiming, "typeOfHire": hireType, "timeOfContract": contractType });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://api.onesourcing.in/client/register/2", requestOptions)
            .then(response => response.json())
            .then((result) => (
                result.status == true ? (toast.success("WoooHooo"),
                    history.push('/thankyoupage')) : toast.error("Try Again")

            ))
            .catch(error => console.log('error', error))
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
                            <form className="form-description">
                                <div className="inputArea">
                                    <label className="labels" for="projectstage" name="projectstage">Project Stage</label><br />
                                    <FormControl component="fieldset">
                                        <RadioGroup className="radioButton-requirement" name="experience" value={projectStage} onChange={projectstageChange}>
                                            <FormControlLabel value="Basic" control={<Radio />} label="BAsic" />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="High" control={<Radio />} label="High" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="joiningtime" name="joiningtime">Joining Time</label><br />
                                    <FormControl component="fieldset">
                                        <RadioGroup className="radioButton-requirement" name="experience" value={joiningtiming} onChange={joiningtimingChange}>
                                            <FormControlLabel value="Basic" control={<Radio />} label="BAsic" />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="High" control={<Radio />} label="High" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="typeofhire" name="typeofhire">Type Of Hire</label><br />
                                    <FormControl component="fieldset">
                                        <RadioGroup className="radioButton-requirement" name="experience" value={hireType} onChange={hireTypeChange}>
                                            <FormControlLabel value="Basic" control={<Radio />} label="BAsic" />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="High" control={<Radio />} label="High" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="contract" name="contract">Contract</label><br />
                                    <FormControl component="fieldset">
                                        <RadioGroup className="radioButton-requirement" name="experience" value={contractType} onChange={contractTypeChange}>
                                            <FormControlLabel value="Basic" control={<Radio />} label="BAsic" />
                                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                            <FormControlLabel value="High" control={<Radio />} label="High" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>


                                <div className="btn-position-requirement">
                                    <button className="button-class">
                                        <div className="button-text"><a href="/requirement">Previous</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right previous-icon"></i></div>
                                    </button>
                                    <button className="button-class" onClick={veryfyingRequirements}>
                                        <div className="button-text"><a >Next</a></div>
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

export default RequirementExtended;

