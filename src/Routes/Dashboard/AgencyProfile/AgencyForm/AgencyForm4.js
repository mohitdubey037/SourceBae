import React from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'

import github from '../../../../assets/images/agencyForm/github.svg'
import stack from '../../../../assets/images/agencyForm/stack.svg'
import portfolio from '../../../../assets/images/agencyForm/portfolio.svg'
import featureLink from '../../../../assets/images/agencyForm/featureLink.svg'
import links from '../../../../assets/images/agencyForm/links.gif'
import { NavLink } from 'react-router-dom'

function AgencyForm4() {
    return (
        <>
            <Navbar />

            <FormPhases value1={true} value2={true} value3={true} value4={true} />

            <div className="mainSocialLinks">
                <div className="innerSocialLinks">
                    <div className="socialInputs">

                        <div>
                            <section className="linksImages">
                                <img src={github} alt="" />
                                <p>Github Link <span>(optional)</span></p>
                            </section>
                            <input placeholder="E.g - https://www.github.com/your_name" type="text" name="" id="" />
                        </div>
                        <div>
                            <section className="linksImages">
                                <img src={stack} alt="" />
                                <p>StackOverflow Link <span>(optional)</span></p>
                            </section>
                            <input placeholder="E.g - https://www.stackoverflow.com/your_name" type="text" name="" id="" />
                        </div>
                        <div>
                            <section className="linksImages">
                                <img src={portfolio} alt="" />
                                <p>Portfolio Link <span>(optional)</span></p>
                            </section>
                            <input placeholder="E.g - https://www.your_company.com/" type="text" name="" id="" />
                        </div>
                        <div>
                            <section className="linksImages">
                                <img src={featureLink} alt="" />
                                <p>Featured Link <span>(optional)</span></p>
                            </section>
                            <input placeholder="E.g - https://www.company.com/your_feed" type="text" name="" id="" />
                        </div>

                        <div className="nextBtn">
                            <NavLink to="/agency-form-four" >Finish <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
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
