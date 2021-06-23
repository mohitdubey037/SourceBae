import React from 'react'
import Navbar from '../Navbar'
import './Quotation.css'
import received from '../../../assets/images/Quotation/received.png'
import responded from '../../../assets/images/Quotation/responded.png'
import matched from '../../../assets/images/Quotation/matched.png'
import Received from './Received'
import Responded from './Responded'
import ProjectesMatched from './ProjectesMatched'

function Quotation(props) {
    return (
        <>
            <Navbar headingInfo="Quotation" />
            <div className="mainQuotation">
                <div style={{ marginTop: '4rem' }} className="backArrow" onClick={() => { props.history.push("/dashboard") }} >
                        <i class="fa fa-angle-left" aria-hidden="true"></i>
                    </div>
                <div className="innerQuotation">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                <img src={received} alt="received" /> Received
                            </button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                <img src={responded} alt="" /> Responded
                            </button>
                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                <img src={matched} alt="" /> Project Matched
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <Received />
                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <Responded />
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <ProjectesMatched />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quotation
