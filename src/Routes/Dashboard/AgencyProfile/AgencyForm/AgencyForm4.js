import React, { useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'

import github from '../../../../assets/images/agencyForm/github.svg'
import stack from '../../../../assets/images/agencyForm/stack.svg'
import portfolio from '../../../../assets/images/agencyForm/portfolio.svg'
import featureLink from '../../../../assets/images/agencyForm/featureLink.svg'
import links from '../../../../assets/images/agencyForm/links.gif'
import { NavLink } from 'react-router-dom'

function AgencyForm4() {

    const [fields, setFields] = useState([{ value: null }]);

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
                                <div className="addMoreFields" onClick={() => handleAdd()}>+ Add More</div>
                            </section>
                            {
                                fields.map((value, index) => {
                                    return (
                                        <div className="extraFields">
                                            <input onChange={e => handleChange(index, e)} placeholder="E.g - https://www.your_company.com/" type="text" name="" id="" />
                                            {
                                                index == 0 ? null : <div><i onClick={() => handleRemove(index)} class="fa fa-times" aria-hidden="true"></i></div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <section className="linksImages">
                                <img src={featureLink} alt="" />
                                <p>Featured Link <span>(optional)</span></p>
                            </section>
                            <input placeholder="E.g - https://www.company.com/your_feed" type="text" name="" id="" />
                        </div>

                        <div className="nextBtn">
                            <NavLink to="/agency-form-three" ><i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back</NavLink>
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
