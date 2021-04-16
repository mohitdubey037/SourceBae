import React from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'

import agencyLogo from '../../../../assets/images/agencyForm/document.png'
import brochure from '../../../../assets/images/agencyForm/brochure.png'
import privacy from '../../../../assets/images/agencyForm/privacy.svg'
import { NavLink } from 'react-router-dom'

function AgencyForm3() {
    return (
        <>
            <Navbar />

            <FormPhases value1={true} value2={true} value3={true} />

            <div className="mainDocumentsForm">
                <div className="innerDocumentForm">
                    <div className="documentDetails">
                        <p>1. Provide your Valid Document</p>
                        <div className="documentInformation">
                            <div className="agencyCertification">
                                <span>Company Registration Certificate</span>
                                <img src={agencyLogo} alt="" />
                                <button><i class="fa fa-upload" aria-hidden="true"></i>Upload</button>
                            </div>
                            <div className="agencyBrochure">
                                <span>Brochure</span>
                                <img src={brochure} alt="" />
                                <button><i class="fa fa-upload" aria-hidden="true"></i>Upload</button>
                            </div>
                        </div>
                        <div className="panDetails">
                            <p>2. Enter your Pan Card number</p>
                            <input type="text" placeholder="E.g- ACBPZ2854P" />
                        </div>

                        <div className="nextBtn">
                            <NavLink to="/agency-form-four" >Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                        </div>
                    </div>
                    <div className="miscellaneousArea">
                        <p>Your Information is safe with us.</p>
                        <img src={privacy} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencyForm3
