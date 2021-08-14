/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import FormPhases from './FormPhases'
import github from '../../../../assets/images/agencyForm/github.svg'
import stack from '../../../../assets/images/agencyForm/stack.svg'
import portfolio from '../../../../assets/images/agencyForm/portfolio.svg'
import featureLink from '../../../../assets/images/agencyForm/featureLink.svg'
import links from '../../../../assets/images/agencyForm/links.gif'
import { NavLink } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import Spinner from '../../../../Components/Spinner/Spinner';

//axios instance
import instance from "../../../../Constants/axiosConstants"
import * as helper from "../../../../shared/helper"


function AgencyForm4(props) {

    const Role = "agency"
    const [loading, setLoading] = useState(false);
    const [fields, setFields] = useState([{ value: null }]);
    const [githubLink, setGithubLink] = useState({})
    const [stackoverflow, setStackoverflow] = useState({})
    const [featuredLink, setFeaturedLink] = useState({})
    const [errors, setErrors] = useState({})

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        console.log(values);
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
        const { name, value } = event.target
        if (value === '') {
            setGithubLink({})
        }
        else {
            setGithubLink({
                platformName: name,
                platformLink: value
            })
        }
    }

    const handleStackoveflow = (event) => {
        const { name, value } = event.target
        if (value === '') {
            setStackoverflow({})
        }
        else {
            setStackoverflow({
                platformName: name,
                platformLink: value
            })
        }
    }

    const handleFeaturedlink = (event) => {
        const { name, value } = event.target
        if (value === '') {
            setFeaturedLink({})
        }
        else {
            setFeaturedLink({
                platformName: name,
                platformLink: value
            })
        }
    }

    // const handleSocialPlatform = (event) => {
    //     const { name, value } = event.target
    //     console.log(name);
    //     console.log(value == '');
    // }


    const finishAgencyForm4Api = (apiData) => {
        setLoading(true);
        instance.post(`api/${Role}/agencies/create`, apiData)
            .then(function (response) {
                console.log(response);
                setLoading(false)
                props.history.push("/dashboard")
            })
            .catch(errors => {
                setLoading(false)
            })
    }

    useEffect(() => {
        console.log(githubLink, stackoverflow, featuredLink);
    }, [githubLink, stackoverflow, featuredLink])


    const validateInfo = () => {
        const err = {}

        if (githubLink.platformLink !== undefined && githubLink.platformLink !== '') {
            if (!helper.validateLink(githubLink.platformLink)) {
                err.githubLinkError = 'Invalid link provided.'
            }
        }
        if (stackoverflow.platformLink !== undefined && stackoverflow.platformLink !== '') {
            if (!helper.validateLink(stackoverflow.platformLink)) {
                err.stackoverflowLinkError = 'Invalid link provided.'
            }
        }
        // if (fields[0].value !== null ) {
        //     console.log(fields[0].value);
        //     if (!helper.validateLink(fields[0].value)) {
        //         err.portfolioLinkError = 'Invalid link provided.'
        //     }
        // }
        if (featuredLink.platformLink !== undefined && featuredLink.platformLink !== '') {
            if (!helper.validateLink(featuredLink.platformLink)) {
                err.featuredLinkError = 'Invalid link provided.'
            }
        }
        setErrors(err);
        if (Object.keys(err).length === 0) {
            return true
        }
        else {
            return false
        }
    }

    useEffect(() => {
        if (githubLink.platformLink !== '') {
            validateInfo()
        }
        if (stackoverflow.platformLink !== '') {
            validateInfo()
        }
        if (featuredLink.platformLink !== '') {
            validateInfo()
        }
    }, [githubLink, stackoverflow, featuredLink])




    const finalUpdate = () => {
        console.log('finish')
        if (validateInfo()) {
            let apiData;
            let socialPlatformDetails = [];
            if (Object.entries(githubLink).length === 0 && Object.entries(stackoverflow).length === 0 && Object.entries(featuredLink).length === 0 && fields[0].value == null) {
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: socialPlatformDetails
                }
            }

            if (Object.entries(githubLink).length !== 0) {
                socialPlatformDetails.push(githubLink)
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: socialPlatformDetails
                }
            }
            if (Object.entries(stackoverflow).length !== 0) {
                socialPlatformDetails.push(stackoverflow);
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: socialPlatformDetails
                }
            }
            if (Object.entries(featuredLink).length !== 0) {
                socialPlatformDetails.push(featuredLink)
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: socialPlatformDetails
                }
            }
            if (fields[0].value !== null) {
                console.log(fields[0].value);
                console.log('fldsf');
                const portfolios = fields.map((link, index) => {
                    return {
                        platformName: `portfolio${index + 1}`,
                        platformLink: link.value
                    }
                })
                socialPlatformDetails.push(...portfolios);
                apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: socialPlatformDetails
                }
            }
            finishAgencyForm4Api(apiData);
        }
    };


    return (
        <>
            <Navbar />
            <div
                className="backArrow_agencyForm4"
                onClick={() => {
                    props.history.goBack();
                }}
            >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
            </div>
            {loading ? <Spinner /> :

                <>
                    <FormPhases value1={true} value2={true} value3={true} value4={true} />

                    <div className="mainSocialLinks">
                        <div className="innerSocialLinks">
                            <div className="socialInputs">

                                <div>
                                    <section className="linksImages">
                                        <img src={github} alt="github logo" />
                                        <p>Github Link <span>(optional)</span></p>
                                    </section>
                                    <input
                                        placeholder="E.g - https://www.github.com/your_name"
                                        type="text"
                                        name='github'
                                        value={githubLink.platformLink}
                                        onChange={handleGithub} />
                                    {errors.githubLinkError && <Alert severity="error">{errors.githubLinkError}</Alert>}
                                </div>

                                <div>
                                    <section className="linksImages">
                                        <img src={stack} alt="stackoverflow logo" />
                                        <p>StackOverflow Link <span>(optional)</span></p>
                                    </section>
                                    <input placeholder="E.g - https://www.stackoverflow.com/your_name"
                                        type="text"
                                        name='stackoverflow'
                                        value={stackoverflow.platformLink}
                                        onChange={handleStackoveflow} />
                                    {errors.stackoverflowLinkError && <Alert severity="error">{errors.stackoverflowLinkError}</Alert>}
                                </div>

                                <div>
                                    <section className="linksImages">
                                        <img src={portfolio} alt="portfolio logo" />
                                        <p>Portfolio Link <span>(optional)</span></p>
                                        <div className="addMoreFields" onClick={() => handleAdd()}>+ Add More</div>
                                    </section>
                                    {
                                        fields.map((value, index) => {
                                            return (
                                                <div className="extraFields">
                                                    <input
                                                        onChange={e => handleChange(index, e)}
                                                        placeholder="E.g - https://www.your_company.com/"
                                                        type="text"
                                                        value={value[index]}
                                                        name="portfolioLink"
                                                        id="" />
                                                    {
                                                        index === 0 ? null : <div><i onClick={() => handleRemove(index)} class="fa fa-times" aria-hidden="true"></i></div>
                                                    }
                                                </div>

                                            )
                                        })
                                    }
                                    {errors.portfolioLinkError && <Alert severity="error">{errors.portfolioLinkError}</Alert>}
                                </div>

                                <div>
                                    <section className="linksImages">
                                        <img src={featureLink} alt="featured link logo" />
                                        <p>Featured Link <span>(optional)</span></p>
                                    </section>
                                    <input placeholder="E.g - https://www.company.com/your_feed"
                                        type="text"
                                        name='featuredLink'
                                        value={featuredLink.platformLink}
                                        onChange={handleFeaturedlink} />
                                    {errors.featuredLinkError && <Alert severity="error">{errors.featuredLinkError}</Alert>}
                                </div>

                                <div className="nextBtn">
                                    <NavLink to="/agency-form-three" style={{ textDecoration: "none" }}>
                                        <button>
                                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>Back
                                        </button>
                                    </NavLink>
                                    <button onClick={finalUpdate} >
                                        Finish
                                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="socialArea">
                                <img src={links} alt="" />
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default AgencyForm4

