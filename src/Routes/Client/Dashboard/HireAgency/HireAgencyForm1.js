import React, { useState, useEffect } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import './HireAgencyForms.css';
import Back from '../../../../Components/Back/Back';

import instance from '../../../../Constants/axiosConstants';
import Spinner from '../../../../Components/Spinner/Spinner';
import illustration from '../../../../assets/images/Newestdashboard/Hire-Agency-Form/illustration.svg';
import DownImage from '../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import './HireAgencyForm1.css';
import VerifyModal from '../../../../Components/VerifyModal/VerifyModal';
import { toast } from 'react-toastify';

const HireAgencyForm1 = (props) => {
    const id = localStorage.getItem('userId');
    const Role = localStorage.getItem('role');

    const [loading, setLoading] = useState(false);
    const [words, setWords] = useState(0);
    const [validateEffect, setValidateEffect] = useState({ validate: false });

    const [data, setData] = useState({
        stepsCompleted: 1,
        clientId: id,
        projectName: '',
        projectDescription: '',
        projectProposalCost: '5000',
        projectExpectedStartingDays: 5
    });

    const [error, setError] = useState({
        projectNameError: '',
        projectDescriptionError: '',
        projectExpectedStartingDaysError: ''
    });

    const handleChange = (event) => {
        let { name, value } = event.target;
        value = value.replace(/[^\w\s]/gi, '');
        if (name === 'projectDescription') {
            value = value.slice(0, 1).toUpperCase() + value.slice(1);
            if (value.length <= 100) setWords(value.length);
            if (value.length > 100) setWords(100);
            setData({
                ...data,
                [name]: value
            });
        } else if (name === 'projectExpectedStartingDays') {
            if (value.length <= 2) {
                setData({ ...data, projectExpectedStartingDays: value });
            } else {
                toast.error('Starting days should be less than 100');
            }
        } else {
            setData({
                ...data,
                [name]: value
            });
        }
    };

    useEffect(() => {
        if (props.location.state?.agencyForm1) {
            setData(props.location.state.agencyForm1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fieldsClearer = () => {
        let desc = data.projectDescription?.replace(/^\s+|\s+$/g, '');
        setData({
            ...data,
            projectDescription: desc,
            projectName: data.projectName?.replace(/^\s+|\s+$/g, '')
        });

        setWords(desc.length);
        setValidateEffect({ validate: true });
    };

    useEffect(() => {
        if (validateEffect.validate) errorValidation();
    }, [validateEffect]); // eslint-disable-line
    const handleBack = () => {
        if (window.confirm('Do you want to discard changes?') === true) {
            props.history.push(`/clientNewestDashboard`);
        }
    };

    function errorValidation() {
        let returnValue = false;
        let tempError = {};
        if (data.projectName === '') {
            returnValue = true;
            tempError.projectNameError = 'Project name is required';
        }
        if (data.projectName.length < 2) {
            returnValue = true;
            tempError.projectNameError =
                'Project name should be atleast 2 characters';
        }
        if (data.projectDescription === '') {
            returnValue = true;
            tempError.projectDescriptionError =
                'Project description is required';
        }
        if (data.projectDescription.length <= 100) {
            returnValue = true;
            tempError.projectDescriptionError =
                'Project description should be atleast 100 characters';
        }
        if (data.projectProposalCost <= 499) {
            returnValue = true;
            tempError.projectProposalCostError =
                'Project proposal cost should be greater than 500';
        }
        if (data.projectExpectedStartingDays <= 4) {
            returnValue = true;
            tempError.projectExpectedStartingDaysError =
                'Project expected starting days should be greater than 4';
        }
        setError(tempError);
        return !returnValue;
    }
    const handleSubmit = async () => {
        fieldsClearer();
        let isValidated = await errorValidation();

        if (isValidated) {
            setLoading(true);
            instance
                .post(
                    `/api/${Role}/projects/create`,
                    props?.location?.state?.agencyForm1?.projectId
                        ? {
                              ...data,
                              id: props.location.state.agencyForm1?.projectId
                          }
                        : data
                )
                .then(function (response) {
                    setLoading(false);
                    data.projectId = response._id;
                    props.history.replace(
                        `/hire-agency-form-two/${response._id}`,
                        {
                            agencyForm1: data
                        }
                    );
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Navbar />
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="main_HireAgencyParent">
                        <Back name="Hire Agency" />
                        <img
                            className="Image2_hireAgency"
                            src={DownImage}
                            alt="downImage"
                        />
                        <div className="higherAgencyInfoParent">
                            <div className="higherAgencyInfoArea">
                                <div className="points-to-remember_hireAgencyForm1">
                                    <h4>About Project</h4>
                                </div>
                                <div className="cardsDetail_hireAgencyForm1">
                                    <div className="stepContainer">
                                        <div className="cards_hireAgencyForm1">
                                            <div className="keep_the_project_name">
                                                <p>
                                                    1. Give your project a
                                                    simple and meaningful name.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="steps_hireAgencyForm">
                                            <div className="steps_on_hire_agency">
                                                <div>
                                                    <p>Step 1</p>
                                                </div>
                                                <div className="color_hireAgencyForm green"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stepContainer">
                                        <div className="cards_hireAgencyForm1">
                                            <div className="write_about_your_project">
                                                <p>
                                                    2. Describe your service or
                                                    idea in a precise with
                                                    relevant details.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="diabled-step_hireAgencyForm">
                                            <div className="steps_on_hire_agency">
                                                <p className="grey-step_hireAgencyForm">
                                                    Step 2
                                                </p>
                                            </div>
                                            <div className="color_hireAgencyForm grey"></div>
                                        </div>
                                    </div>

                                    <div className="stepContainer">
                                        <div className="cards_hireAgencyForm1">
                                            <div className="in_case_you_think">
                                                <p>
                                                    3. Missed something, don't
                                                    worry you can edit it later
                                                    anytime.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="diabled-step_hireAgencyForm">
                                            <div className="steps_on_hire_agency">
                                                <p className="grey-step_hireAgencyForm">
                                                    Step 3
                                                </p>
                                            </div>
                                            <div className="color_hireAgencyForm grey"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mainHireAgencyForm1">
                                <div className="innerHigherAgencyForm1">
                                    <div className="higherAgencyFormArea">
                                        <div className="understand_your_project">
                                            Help us understand more about your
                                            project..!!
                                        </div>
                                        <div className="input-form_hireAgencyForm1">
                                            <div className="projectNameAgency">
                                                <p>
                                                    1.&nbsp;What will be the
                                                    name of your project?{' '}
                                                    <span className="requiredStar">
                                                        *
                                                    </span>
                                                </p>
                                                <input
                                                    type="text"
                                                    name="projectName"
                                                    onChange={handleChange}
                                                    placeholder="Enter Project Name here"
                                                    value={data.projectName}
                                                    maxLength="22"
                                                />
                                                {error.projectNameError && (
                                                    <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                                                        {error.projectNameError}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="descriptionProjectAgency">
                                                <p>
                                                    2.&nbsp;Describe a little
                                                    bit about your project?{' '}
                                                    <span className="requiredStar">
                                                        *
                                                    </span>
                                                </p>
                                                <textarea
                                                    name="projectDescription"
                                                    cols="30"
                                                    rows="6"
                                                    onChange={handleChange}
                                                    value={
                                                        data.projectDescription
                                                    }
                                                ></textarea>
                                                <div>
                                                    <span>
                                                        More than 100 characters
                                                    </span>
                                                    <span>{words}/100</span>
                                                </div>
                                                {error.projectDescriptionError && (
                                                    <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                                                        {
                                                            error.projectDescriptionError
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="budgetSectionAreaAgency">
                                                <p>
                                                    3.&nbsp;What's your budget
                                                    for this project? (in $){' '}
                                                    <span className="requiredStar">
                                                        *
                                                    </span>{' '}
                                                </p>
                                                {/* <div className="daysInputAgency"> */}
                                                <input
                                                    style={{
                                                        height: '35px',
                                                        width: '79%',
                                                        border: '1px solid #015F9A',
                                                        padding: '1rem',
                                                        borderRadius: '8px'
                                                    }}
                                                    name="projectProposalCost"
                                                    type="number"
                                                    onChange={handleChange}
                                                    min="500"
                                                    value={
                                                        data.projectProposalCost
                                                    }
                                                    placeholder="Text should be number "
                                                />
                                                {error.projectProposalCostError && (
                                                    <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                                                        {
                                                            error.projectProposalCostError
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="numberOfDays">
                                                <p>
                                                    4.&nbsp;How soon do you want
                                                    to start? (in days){' '}
                                                    <span className="requiredStar">
                                                        *
                                                    </span>{' '}
                                                </p>
                                                {/* <div className="daysInputAgency"> */}
                                                <input
                                                    style={{
                                                        height: '35px',
                                                        width: '79%',
                                                        border: '1px solid #015F9A',
                                                        padding: '1rem',
                                                        borderRadius: '8px'
                                                    }}
                                                    name="projectExpectedStartingDays"
                                                    type="number"
                                                    onChange={handleChange}
                                                    min="5"
                                                    max="60"
                                                    value={
                                                        data.projectExpectedStartingDays
                                                    }
                                                    placeholder="Text should be number "
                                                />
                                                {error.projectExpectedStartingDaysError && (
                                                    <p className="error_hireAgencyForm2 error_hireAgencyForm1">
                                                        {
                                                            error.projectExpectedStartingDaysError
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="nextbutton nextbutton_hireAgencyForm1">
                                            <div
                                                className="backbutton_hireAgencyForm2"
                                                onClick={() => handleBack()}
                                                style={{
                                                    backgroundColor: '#707070'
                                                }}
                                            >
                                                Back
                                            </div>
                                            <div onClick={() => handleSubmit()}>
                                                Submit
                                            </div>
                                        </div>
                                    </div>
                                    <div className="illustration_hireAgencyForm1">
                                        <img src={illustration} alt="agency" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <VerifyModal Role={Role} id={id} isUserVerified={null} />
                </>
            )}
        </>
    );
};

export default HireAgencyForm1;
