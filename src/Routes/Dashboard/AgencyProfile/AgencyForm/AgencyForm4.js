import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'

import github from '../../../../assets/images/agencyForm/github.svg'
import stack from '../../../../assets/images/agencyForm/stack.svg'
import portfolio from '../../../../assets/images/agencyForm/portfolio.svg'
import featureLink from '../../../../assets/images/agencyForm/featureLink.svg'
import links from '../../../../assets/images/agencyForm/links.gif'
import { NavLink } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';

//axios instance
import instance from "../../../../Constants/axiosConstants"
import * as helper from "../../../../shared/helper"


function AgencyForm4() {

    const colors = {
        Update: "Blue",
        Finish: "green"
    }

    const Role = "agency"
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("Update");
    const [fields, setFields] = useState([{ value: null }]);
    const [githubLink, setGithubLink] = useState({ platformName: "github", platformLink: "" })
    const [stackoverflow, setStackoverflow] = useState({ platformName: "stackoverflow", platformLink: "" })
    //const [portfolioLink, setPortfolioLink] = useState({ platformName: "portfolioLink", platformLink: "" })
    const [featuredLink, setFeaturedLink] = useState({ platformName: "featuredLink", platformLink: "" })
    // const [profileLinksErrors, setProfileLinksErrors] = useState({
    //     githubLinkError: '',
    //     stackoverflowLinkError: '',
    //     portfolioLinkError: '',
    //     featuredLinkError: '',
    // })
    const [errors, setErrors] = useState({})

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

    const handleSocialPlatform = (event) => {
        const { name, value } = event.target
        if (name === "github") {
            setGithubLink({
                platformName: name,
                platformLink: value
            })

        }
        else if (name === "stackoverflow") {

            setStackoverflow({
                platformName: name,
                platformLink: value
            })

        }

        else if (name === "featuredLink") {
            setFeaturedLink({
                platformName: name,
                platformLink: value
            })
        }

    }


    const finishAgencyForm4Api = (apiData) => {
        setLoading(true);
        instance.post(`api/${Role}/agencies/create`, apiData)
            .then(function (response) {
                setLoading(false)
                window.location.href = "/dashboard"
            })
            .catch(errors => {
                setLoading(false)
            })
    }

    // useEffect(() => {
    //     if (githubLink.platformLink === "" && stackoverflow.platformLink === "" && (fields[0].value === null || fields[0].value === '') && featuredLink.platformLink === "") {
    //         console.log('finish')
    //         setStatus('Finish')
    //     }
    //     else {
    //         setStatus('Update')
    //     }
    // })

    useEffect(() => {
        console.log(fields[0].value);
        console.log(stackoverflow.platformLink);
        if (githubLink.platformLink === "") {
            console.log('1 hi');
        }
        if (stackoverflow.platformLink === "") {
            console.log('2 hi');
        }
        if (fields[0].value === null) {
            console.log('3 hi');
        }
        if (featuredLink.platformLink === "") {
            console.log(' 4 hi');
        }
    })


    const validateInfo = () => {
        const err = {}

        //this object is for resetting all the errors value to empty before adding a one
        // let tempProfileLinks = {
        //     githubLinkError: '',
        //     stackoverflowLinkError: '',
        //     portfolioLinkError: '',
        //     featuredLinkError: '',
        // };

        if (githubLink.platformLink === "") {
            err.githubLinkError = 'Github link is required.'
        }

        if (!helper.validateLink(githubLink.platformLink)) {
            err.githubLinkError = 'Invalid link provided.'
        }

        if (stackoverflow.platformLink === "") {
            err.stackoverflowLinkError = 'Stackoverflow link is required.'
        }

        if (!helper.validateLink(stackoverflow.platformLink)) {
            err.stackoverflowLinkError = 'Invalid link provided.'
        }

        if (fields[0].value === null) {
            err.portfolioLinkError = 'Portfolio link is required.'
        }

        if (!helper.validateLink(fields[0].value)) {
            err.portfolioLinkError = 'Invalid link provided.'
        }

        if (featuredLink.platformLink === "") {
            err.featuredLinkError = 'Featured link is required'
        }

        if (!helper.validateLink(featuredLink.platformLink)) {
            err.featuredLinkError = 'Invalid link provided.'
        }
        setErrors(err);
        if (Object.keys(err).length === 0)
            return true
        else
            return false
    }



    // if (githubLink.platformLink === "" && githubLink.platformLink < 12) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         githubLinkError: 'Github link is required.',
    //     })

    // }
    // else if (!helper.validateLink(githubLink.platformLink)) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         githubLinkError: 'Invalid link provided.',
    //     })

    // }
    // else if (stackoverflow.platformLink === "" && stackoverflow.platformLink < 12) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         stackoverflowLinkError: 'Stackoverflow link is required.',
    //     })

    // }
    // else if (!helper.validateLink(stackoverflow.platformLink)) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         stackoverflowLinkError: 'Invalid link provided.',
    //     })

    // }
    // else if (fields[0].value === "" && fields[0].value < 12) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         portfolioLinkError: 'Portfolio link is required.',
    //     })

    // }
    // else if (!helper.validateLink(fields[0].value)) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         portfolioLinkError: 'Invalid link provided.',
    //     })

    // }
    // else if (featuredLink.platformLink === "" && featuredLink.platformLink < 12) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         featuredLinkError: 'Featured link is required.',
    //     })

    // }
    // else if (!helper.validateLink(featuredLink.platformLink)) {
    //     setProfileLinksErrors({
    //         ...tempProfileLinks,
    //         featuredLinkError: 'Invalid link provided.',
    //     })

    // }


    // if (status === "Update") {
    //     const portfolios = fields.map((link, index) => {
    //         return {
    //             platformName: `portfolio${index + 1}`,
    //             platformLink: link.value
    //         }
    //     })
    //     const apiData = {
    //         stepsCompleted: "5",
    //         socialPlatformDetails: [githubLink, stackoverflow, featuredLink, ...portfolios]
    //     }
    //     createAgencyForm4Api(apiData)
    // }

    const finalUpdate = () => {
        if (validateInfo()) {
            if (status === "Finish") {
                const portfolios = fields.map((link, index) => {
                    return {
                        platformName: `portfolio${index + 1}`,
                        platformLink: link.value
                    }
                })
                const apiData = {
                    stepsCompleted: '5',
                    socialPlatformDetails: [githubLink, stackoverflow, featuredLink, ...portfolios]
                }
                finishAgencyForm4Api(apiData);
            }
        }
    }


    return (
        <>
            <Navbar />

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
                                name={githubLink.platformName}
                                value={githubLink.platformLink}
                                onChange={handleSocialPlatform} />
                            {errors.githubLinkError && <Alert severity="error">{errors.githubLinkError}</Alert> }
                        </div>

                        <div>
                            <section className="linksImages">
                                <img src={stack} alt="stackoverflow logo" />
                                <p>StackOverflow Link <span>(optional)</span></p>
                            </section>
                            <input placeholder="E.g - https://www.stackoverflow.com/your_name"
                                type="text"
                                name={stackoverflow.platformName}
                                value={stackoverflow.platformLink}
                                onChange={handleSocialPlatform} />
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
                                name={featuredLink.platformName}
                                value={featuredLink.platformLink}
                                onChange={handleSocialPlatform} />
                            {errors.featuredLinkError && <Alert severity="error">{errors.featuredLinkError}</Alert>}
                        </div>

                        <div className="nextBtn">
                            <NavLink to="/agency-form-three" style={{ textDecoration: "none" }}>
                                <button>
                                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back
                                </button>
                            </NavLink>
                            {/* <NavLink to="/agency-form-four" >Finish <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink> */}
                            <button /*style={{ backgroundColor: colors[status] }}*/ onClick={finalUpdate} >
                                Finish
                                <i class="fa fa-long-arrow-right" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="socialArea">
                        <img src={links} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencyForm4

