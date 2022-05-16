/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import instance from '../../../Constants/axiosConstants';
import check from '../../../assets/images/Newestdashboard/Agency-Profile/check.png';
import cancel from '../../../assets/images/Newestdashboard/Agency-Profile/cancel.png';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import editIcon from '../../../assets/images/AgencyProfile/edit.svg'

import LocalizationProvider from '@mui/lab/LocalizationProvider';

import './Rules.css';
import moment from 'moment';

function Rules(props) {
    const Role = localStorage.getItem('role');
    const [agencyProfiledata, setAgencyProfileData] = useState({});
    const userId = props.id ? props.id : localStorage.getItem('userId');

    const [rules, setRules] = useState([]);

    const [editRules, setEditRules] = useState(false);
    const [form, setForm] = useState({
        agencyTiming: {
            startTime: props?.data?.agencyTiming?.startTime
                ? props?.data?.agencyTiming?.startTime
                : moment().format('HH:mm A'),
            endTime: props?.data?.agencyTiming?.endTime
                ? props?.data?.agencyTiming?.endTime
                : moment().format('HH:mm A'),
            weekendOpen: props?.data?.agencyTiming?.weekendOpen
        }
    });

    const handleEditRules = (value) => {
        setEditRules(value);
        instance
            .patch(`/api/${Role}/agencies/update/${userId}`, {
                agencyRules: rules.map((rules) => {
                    return {
                        ruleId: rules.ruleId._id,
                        selection: rules.selection
                    };
                }),
                agencyTiming: { ...form.agencyTiming }
            })
            .then((response) => { })
            .catch((err) => { });
    };

    const getAgencyProfile = (profileviewStatus) => {
        let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
        instance
            .get(`/api/${Role}/agencies/get/${userId}${addParam}`)
            .then(function (response) {
                setAgencyProfileData(response);
                setRules(response.agencyRules);
                setEditRules(false);
            })
            .catch((err) => { });
    };

    const handleChange = (value, isStart) => {
        if (isStart)
            setForm({
                ...form,
                agencyTiming: {
                    ...form.agencyTiming,
                    startTime: moment(value).format('hh:mm A')
                }
            });
        else
            setForm({
                ...form,
                agencyTiming: {
                    ...form.agencyTiming,
                    endTime: moment(value).format('hh:mm A')
                }
            });
    };
    const handleChangeWeekend = (event) => {
        setForm({
            ...form,
            agencyTiming: {
                ...form.agencyTiming,
                weekendOpen: event.target.value === 'true' ? true : false
            }
        });
    };

    const handleRules = (event, rule) => {
        const { value } = event.target;
        let tempArr = [...rules];
        let index = tempArr.indexOf(rule);
        tempArr[index].selection = value === 'true' ? true : false;
        setRules(tempArr);
    };

    useEffect(() => {
        getAgencyProfile();
    }, []);

    return (
        <>
            <div className="mainRules">
                <div className="innerRules">
                    {Role === 'agency'
                        ? agencyProfiledata.isAgencyVerified && (
                            <div className="editableBtn_rules">
                                <div className="rules_parent">
                                    <p>Agency Rules</p>
                                </div>
                                <img onClick={() => {
                                    setEditRules(true);
                                }}
                                    src={editIcon}
                                    className='Edit-icon_information' alt="rules" />
                                {/* <i
                                    onClick={() => {
                                        setEditRules(true);
                                    }}
                                    class="fa fa-pencil-square-o Edit-icon_information"
                                    aria-hidden="true"
                                ></i> */}
                            </div>
                        )
                        : null}
                    <div className="rulesCard">
                        <div className="rulesUpper">
                            <div className="openTiming">
                                <p>
                                    {/* <i
                                        class="fa fa-clock-o"
                                        aria-hidden="true"
                                    /> */}
                                    Default Opening & Closing Time
                                </p>
                                <div className="date_parent">
                                    {editRules ? (
                                        <LocalizationProvider
                                            dateAdapter={DateAdapter}
                                        >
                                            <TimePicker
                                                value={moment(
                                                    form?.agencyTiming
                                                        ?.startTime,
                                                    'HH:mm A'
                                                )}
                                                onChange={(event) =>
                                                    handleChange(event, true)
                                                }
                                                name="startTime"
                                                renderInput={(params) => (
                                                    <TextField {...params} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    ) : (
                                        <p className='timing'>{form.agencyTiming.startTime}</p>

                                    )}
                                    <p className='timing'>to</p>
                                    {editRules ? (
                                        <LocalizationProvider
                                            dateAdapter={DateAdapter}
                                        >
                                            <TimePicker
                                                value={moment(
                                                    form?.agencyTiming?.endTime,
                                                    'HH:mm A'
                                                )}
                                                onChange={(event) =>
                                                    handleChange(event, false)
                                                }
                                                name="startTime"
                                                renderInput={(params) => (
                                                    <TextField {...params} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    ) : (
                                        <p className='timing'>{form.agencyTiming.endTime}</p>
                                    )}
                                </div>
                            </div>
                            <div className="weekendOpening">
                                <p>
                                    {/* <i
                                        class="fa fa-calendar"
                                        aria-hidden="true"
                                    ></i> */}
                                    Weekend Open
                                </p>
                                {editRules ? (
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="weekendOpen"
                                            name="weekendOpen"
                                            value={
                                                form.agencyTiming.weekendOpen
                                            }
                                            onChange={(event) =>
                                                handleChangeWeekend(event)
                                            }
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row'
                                            }}
                                        >
                                            <FormControlLabel
                                                value={true}
                                                control={<Radio />}
                                                label="Yes"
                                            />

                                            <FormControlLabel
                                                value={false}
                                                control={<Radio />}
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                ) : (
                                    <p style={{ color: '#5396FF', textAlign: 'center', marginTop: '0.8rem' }} className='timing'>
                                        {form.agencyTiming.weekendOpen === true
                                            ? 'Yes'
                                            : 'No'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div
                            className="rulesQuestions"
                            style={{ marginTop: editRules && '15px' }}
                        >
                            {rules.length > 0
                                ? rules.map((value) => {
                                    return (
                                        <div
                                            className={`questionPart ${editRules === false &&
                                                'conditionalPadding'
                                                }`}
                                        >
                                            <div className="leftQuestion">
                                                <p>{value.ruleId.rule}</p>
                                            </div>

                                            {!editRules && (
                                                <div className="rulesMark">
                                                    {value?.selection ? (
                                                        <img
                                                            className="check-img"
                                                            src={check}
                                                            alt="check"
                                                        />
                                                    ) : (
                                                        <img
                                                            className="cancel-img"
                                                            src={cancel}
                                                            alt="cancel"
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            {editRules && (
                                                <FormControl component="fieldset">
                                                    <RadioGroup
                                                        aria-label={value._id}
                                                        name={value._id}
                                                        value={`${value.selection}`}
                                                        onChange={(event) =>
                                                            handleRules(
                                                                event,
                                                                value
                                                            )
                                                        }
                                                    >
                                                        <FormControlLabel
                                                            value="true"
                                                            control={
                                                                <Radio />
                                                            }
                                                            label="Yes"
                                                        />

                                                        <FormControlLabel
                                                            value="false"
                                                            control={
                                                                <Radio />
                                                            }
                                                            label="No"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            )}
                                        </div>
                                    );
                                })
                                : 'There are no rules available for this Agency.'}
                            {editRules && (
                                <div className="handleButtons">
                                    <div className="submitEditBtn">
                                        <div className="information_save_parent">
                                            <div
                                                onClick={() =>
                                                    getAgencyProfile(false)
                                                }
                                                className="information_cancel"
                                            >
                                                <p>Cancel</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => {
                                            handleEditRules(false);
                                        }}
                                        className="submitEditBtn"
                                    >
                                        <div className="information_save">
                                            <p>Submit</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rules;
