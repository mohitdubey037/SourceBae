/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import instance from "../../../Constants/axiosConstants"
import Rules_edit from '../../../assets/images/Newestdashboard/Agency-Profile/Agency-Rules_edit.svg';

import './Rules.css'

function Rules(props) {

    const Role = localStorage.getItem("role");
    const [agencyProfiledata, setAgencyProfileData] = useState({});

    const [rules, setRules] = useState([]);
    const [editRules, setEditRules] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditRules = (value) => {
        setLoading(true);
        setEditRules(value)
        const id = localStorage.getItem("userId")
        instance.patch(`/api/${Role}/agencies/update/${id}`,
            {
                agencyRules: rules.map((rules) => {
                    return {
                        ruleId: rules.ruleId._id,
                        selection: rules.selection
                    }
                })
            })
            .then(response => {
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }

    const getAgencyProfile = (agencyId, profileviewStatus) => {
        let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
        instance.get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
            .then(function (response) {
                console.log(response);
                setAgencyProfileData(response);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        if (Role === 'Agency') {
            getAgencyProfile(localStorage.getItem("userId"), false);
        }
    }, []);

    const handleRules = (event, rule) => {
        const { value } = event.target
        let tempArr = [...rules]
        let index = tempArr.indexOf(rule)

        tempArr[index].selection = value === "true" ? true : false
        setRules(tempArr)
    }

    useEffect(() => {
        setRules(props.data.agencyRules)
    }, [])

    useEffect(() => {
        console.log(rules)
    }, [rules])

    return (
        <>
            <div className="mainRules">
                <div className="innerRules">
                    {
                        Role === 'Agency' ?
                            agencyProfiledata.isAgencyVerified &&
                            // (props?.id === null || props?.id === undefined) && 
                            <div className="editableBtn">
                                <div className="rules_parent">
                                    <img src={Rules_edit} alt="Rules" />
                                    <p>Agency Rules</p>
                                </div>
                                {/* <button onClick={() => { handleEditRules(true) }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit Your Rules</button> */}
                                <i class="fa fa-pencil-square-o Edit-icon_information" aria-hidden="true"></i>
                            </div> : null
                    }
                    <div className="rulesCard">
                        <div className="rulesUpper">
                            <div className="openTiming">
                                <h4><i class="fa fa-clock-o" aria-hidden="true"></i>Opening &  Closing Time</h4>
                                <p>9:00AM to 5:00PM</p>
                            </div>
                            <div className="weekendOpening">
                                <h4><i class="fa fa-calendar" aria-hidden="true"></i>Weekend Open</h4>
                                <p>Yes</p>
                            </div>
                        </div>

                        <div className="rulesQuestions">
                            {
                                rules.length > 0
                                    ?
                                    rules.map((value) => {
                                        return (
                                            <div className="questionPart">
                                                <div className="leftQuestion">
                                                    <p>{value?.ruleId.rule}</p>
                                                </div>


                                                {!editRules && <div className="rulesMark">
                                                    {value?.selection
                                                        ?
                                                        <i className="fa fa-check" style={{ color: '#5cb85c' }} aria-hidden="true" />
                                                        :
                                                        <i className="fa fa-times" style={{ color: '#d9534f' }} aria-hidden="true" />
                                                    }
                                                </div>}

                                                {editRules && <FormControl component="fieldset">
                                                    <RadioGroup aria-label={value?._id} name={value?._id} value={`${value?.selection}`} onChange={(event) => handleRules(event, value)}>
                                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                                    </RadioGroup>
                                                </FormControl>}
                                            </div>
                                        )
                                    })
                                    :
                                    "There are no rules available for this Agency."
                            }
                            {editRules && <div className="submitEditBtn">
                                <button onClick={() => { handleEditRules(false) }}>Submit</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rules
