import React, { useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'

import github from '../../../../assets/images/agencyForm/github.svg'
import stack from '../../../../assets/images/agencyForm/stack.svg'
import portfolio from '../../../../assets/images/agencyForm/portfolio.svg'
import featureLink from '../../../../assets/images/agencyForm/featureLink.svg'
import links from '../../../../assets/images/agencyForm/links.gif'
import { NavLink } from 'react-router-dom'
//axios instance
import instance from "../../../../Constants/axiosConstants"

function AgencyForm4() {

    const Role = "agency"
    const [status, setStatus] = useState("Update")
    const [fields, setFields] = useState([{ value: null }]);
    const [githubLink, setGithubLink] = useState({ platformName: "github", platformLink: "" })
    const [stackoverflow, setStackoverflow] = useState({ platformName: "stackoverflow", platformLink: "" })
    const [featuredLink, setFeaturedLink] = useState({ platformName: "featuredLink", platformLink: "" })

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

    const createAgencyForm4Api = (apiData) => {
        instance.post(`api/${Role}/agencies/create`, apiData)
            .then(function (response) {
                setStatus("Finish")
            })
    }

    const handleNext = () => {

        if (status === "Update") {
            const portfolios = fields.map((link, index) => {
                return {
                    platformName: `portfolio${index + 1}`,
                    platformLink: link.value
                }
            })
            const apiData = {
                stepsCompleted: "5",
                socialPlatformDetails: [githubLink, stackoverflow, featuredLink, ...portfolios]
            }
            createAgencyForm4Api(apiData)
        }
        else if(status==="Finish"){
            window.location.href = "/dashboard"
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
                                                id="" />
                                            {
                                                index === 0 ? null : <div><i onClick={() => handleRemove(index)} class="fa fa-times" aria-hidden="true"></i></div>
                                            }
                                        </div>
                                    )
                                })
                            }
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
                        </div>

                        <div className="nextBtn">
                            <NavLink to="/agency-form-three" style={{ textDecoration: "none" }}>
                                <button>
                                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back
                                </button>
                            </NavLink>
                            {/* <NavLink to="/agency-form-four" >Finish <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink> */}
                            <button onClick={handleNext} >
                                {status}
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
