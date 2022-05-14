/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import FormPhases from './FormPhases';
import github from '../../../../assets/images/agencyForm/github.svg';
import stack from '../../../../assets/images/agencyForm/stack.svg';
import portfolio from '../../../../assets/images/agencyForm/portfolio.svg';
import featureLink from '../../../../assets/images/agencyForm/featureLink.svg';
import Alert from '@material-ui/lab/Alert';
import Spinner from '../../../../Components/Spinner/Spinner';
import Back from '../../../../Components/Back/Back';
import illustrationImage from '../../../../assets/images/Newestdashboard/Agency-form/agencyForm4_image.svg';
//axios instance
import instance from '../../../../Constants/axiosConstants';
import * as helper from '../../../../shared/helper';

import './ResponsiveAgencyForm.css';

import { useDispatch } from 'react-redux';
import { AGENCYROUTES } from '../../../../Navigation/CONSTANTS';

function AgencyForm4(props) {
    const dispatch = useDispatch();
    const Role = localStorage.getItem('role');
    const url = props.history.location.pathname;
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState([{ value: null }]);
    const [githubLink, setGithubLink] = useState({});
    const [stackoverflow, setStackoverflow] = useState({});
    const [featuredLink, setFeaturedLink] = useState({});
    const [errors, setErrors] = useState({});
    const [steps, setSteps] = useState('');

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    const handleGithub = (event) => {
        const { name, value } = event.target;
        if (value === '') {
            setGithubLink({});
        } else {
            setGithubLink({
                platformName: name,
                platformLink: value
            });
        }
    };

    const getStepsCompleted = () => {
        instance
            .get(`api/${Role}/agencies/steps-completed`)
            .then(function (response) {
                setSteps(response.stepsCompleted);
            });
    };

    useEffect(() => {
        getStepsCompleted();
    }, []);

    const handleStackoveflow = (event) => {
        const { name, value } = event.target;
        if (value === '') {
            setStackoverflow({});
        } else {
            setStackoverflow({
                platformName: name,
                platformLink: value
            });
        }
    };

    const handleFeaturedlink = (event) => {
        const { name, value } = event.target;
        if (value === '') {
            setFeaturedLink({});
        } else {
            setFeaturedLink({
                platformName: name,
                platformLink: value
            });
        }
    };

    const finishAgencyForm4Api = (apiData) => {
        setLoading(true);
        instance
            .post(`api/${Role}/agencies/create`, apiData)
            .then(function (response) {
                setLoading(false);
                dispatch({ type: 'NEXT_PRESSED' });
                props.history.replace(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
            })
            .catch((errors) => {
                setLoading(false);
            });
    };

    const goBack = () => {
        if (
            window.confirm('Your Previous Saved Documents Will Be Lost') ===
            true
        ) {
            if (url.includes(AGENCYROUTES.AGENCY_UPDATE_1)) {
                props.history.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
            } else if (url.includes(AGENCYROUTES.AGENCY_UPDATE_2)) {
                props.history.push(AGENCYROUTES.AGENCY_UPDATE_1);
            } else if (url.includes(AGENCYROUTES.AGENCY_UPDATE_3)) {
                props.history.push(AGENCYROUTES.AGENCY_UPDATE_2);
            } else if (url.includes(AGENCYROUTES.AGENCY_UPDATE_4)) {
                dispatch({ type: 'BACK_PRESSED' });
                props.history.push(AGENCYROUTES.AGENCY_UPDATE_3);
            } else {
                props.history.goBack();
            }
        }
    };

    const validateInfo = () => {
        const err = {};

        if (
            githubLink.platformLink !== undefined &&
            githubLink.platformLink !== ''
        ) {
            if (!helper.validateLink(githubLink.platformLink)) {
                err.githubLinkError = 'Invalid link provided.';
            }
        }
        if (
            stackoverflow.platformLink !== undefined &&
            stackoverflow.platformLink !== ''
        ) {
            if (!helper.validateLink(stackoverflow.platformLink)) {
                err.stackoverflowLinkError = 'Invalid link provided.';
            }
        }
        if (
            featuredLink.platformLink !== undefined &&
            featuredLink.platformLink !== ''
        ) {
            if (!helper.validateLink(featuredLink.platformLink)) {
                err.featuredLinkError = 'Invalid link provided.';
            }
        }
        setErrors(err);
        if (Object.keys(err).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (githubLink.platformLink !== '') {
            validateInfo();
        }
        if (stackoverflow.platformLink !== '') {
            validateInfo();
        }
        if (featuredLink.platformLink !== '') {
            validateInfo();
        }
    }, [githubLink, stackoverflow, featuredLink]);

    const finalUpdate = () => {
        if (validateInfo()) {
            let PlatformDetails = [];
            let apiData = {
                stepsCompleted: '5',
                socialPlatformDetails: []
            };

            if (
                Object.entries(githubLink).length === 0 &&
                Object.entries(stackoverflow).length === 0 &&
                Object.entries(featuredLink).length === 0 &&
                fields[0].value === null &&
                fields[0].value === ''
            ) {
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: PlatformDetails
                };
            }

            if (Object.entries(githubLink).length !== 0) {
                PlatformDetails.push(githubLink);
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: PlatformDetails
                };
            }
            if (Object.entries(stackoverflow).length !== 0) {
                PlatformDetails.push(stackoverflow);
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: PlatformDetails
                };
            }
            if (Object.entries(featuredLink).length !== 0) {
                PlatformDetails.push(featuredLink);
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: PlatformDetails
                };
            }
            if (fields[0].value !== null && fields[0].value !== '') {
                const portfolios = fields.map((link, index) => {
                    return {
                        platformName: `portfolio${index + 1}`,
                        platformLink: link.value
                    };
                });
                PlatformDetails.push(...portfolios);
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: PlatformDetails
                };
            }
            finishAgencyForm4Api(apiData);
        }
    };

    return (
        <>
            <div className="agency-form_parent">
                <Navbar />
                <Back name="Agency Form 4" />
                <FormPhases steps={steps} />
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="mainSocialLinks">
                            <div className="innerSocialLinks">
                                <div className="socialInputs">
                                    <div>
                                        <section className="linksImages">
                                            <img
                                                src={github}
                                                alt="github logo"
                                            />
                                            <p>
                                                Github Link{' '}
                                                <span>(optional)</span>
                                            </p>
                                        </section>
                                        <input
                                            placeholder="E.g - https://www.github.com/your_name"
                                            type="text"
                                            name="github"
                                            value={githubLink.platformLink}
                                            onChange={handleGithub}
                                        />
                                        {errors.githubLinkError && (
                                            <Alert severity="error">
                                                {errors.githubLinkError}
                                            </Alert>
                                        )}
                                    </div>

                                    <div style={{ marginTop: '25px' }}>
                                        <section className="linksImages">
                                            <img
                                                src={stack}
                                                alt="stackoverflow logo"
                                            />
                                            <p>
                                                StackOverflow Link{' '}
                                                <span>(optional)</span>
                                            </p>
                                        </section>
                                        <input
                                            placeholder="E.g - https://www.stackoverflow.com/your_name"
                                            type="text"
                                            name="stackoverflow"
                                            value={stackoverflow.platformLink}
                                            onChange={handleStackoveflow}
                                        />
                                        {errors.stackoverflowLinkError && (
                                            <Alert severity="error">
                                                {errors.stackoverflowLinkError}
                                            </Alert>
                                        )}
                                    </div>

                                    <div style={{ marginTop: '25px' }}>
                                        <section className="linksImages">
                                            <img
                                                src={portfolio}
                                                alt="portfolio logo"
                                            />
                                            <p>
                                                Portfolio Link{' '}
                                                <span>(optional)</span>
                                            </p>
                                            <div
                                                className="addMoreFields"
                                                onClick={() => handleAdd()}
                                            >
                                                + Add More
                                            </div>
                                        </section>
                                        {fields.map((value, index) => {
                                            return (
                                                <div className="extraFields">
                                                    <input
                                                        onChange={(e) =>
                                                            handleChange(
                                                                index,
                                                                e
                                                            )
                                                        }
                                                        placeholder="E.g - https://www.your_company.com/"
                                                        type="text"
                                                        value={value[index]}
                                                        name="portfolioLink"
                                                        id=""
                                                    />
                                                    {index === 0 ? null : (
                                                        <div>
                                                            <i
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        index
                                                                    )
                                                                }
                                                                class="fa fa-times"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        {errors.portfolioLinkError && (
                                            <Alert severity="error">
                                                {errors.portfolioLinkError}
                                            </Alert>
                                        )}
                                    </div>

                                    <div style={{ marginTop: '25px' }}>
                                        <section className="linksImages">
                                            <img
                                                src={featureLink}
                                                alt="featured link logo"
                                            />
                                            <p>
                                                Featured Link{' '}
                                                <span>(optional)</span>
                                            </p>
                                        </section>
                                        <input
                                            placeholder="E.g - https://www.company.com/your_feed"
                                            type="text"
                                            name="featuredLink"
                                            value={featuredLink.platformLink}
                                            onChange={handleFeaturedlink}
                                        />
                                        {errors.featuredLinkError && (
                                            <Alert severity="error">
                                                {errors.featuredLinkError}
                                            </Alert>
                                        )}
                                    </div>

                                    <div className="nextBtn bothBtn buttonParent_agencyForm4">
                                        <button
                                            style={{
                                                backgroundColor: '#707070'
                                            }}
                                            onClick={() => goBack()}
                                        >
                                            Back
                                        </button>
                                        <button
                                            style={{
                                                backgroundImage:
                                                    'linear-gradient(to right, #5C6DFF, #45A4EA)'
                                            }}
                                            onClick={finalUpdate}
                                        >
                                            Finish
                                        </button>
                                    </div>
                                </div>
                                <div className="image_div">
                                    <img
                                        src={illustrationImage}
                                        alt="illustration"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AgencyForm4;
