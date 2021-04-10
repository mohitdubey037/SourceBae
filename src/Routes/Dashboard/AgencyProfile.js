import React from 'react'
import Navbar from './Navbar'
import './AgencyProfile.css'

import profileHeader from '../../assets/images/Quotation/profileHeader.jpg'
import agencyLogo from '../../assets/images/Logo/agencyLogo.svg'
import growth from '../../assets/images/Logo/growth.svg'
import Received from './Quotation/Received'
import Responded from './Quotation/Responded'
import ProjectesMatched from './Quotation/ProjectesMatched'
import received from '../../assets/images/Quotation/received.png'
import responded from '../../assets/images/Quotation/responded.png'
import matched from '../../assets/images/Quotation/matched.png'
import Information from './AgencyProfile/Information'

function AgencyProfile() {
    return (
        <>
            <Navbar headingInfo="Agency Profile" />

            <div className="mainProfileHeaderImage">
                <div className="innerProfileHeaderImage">
                    {/* <img src={profileHeader} alt="" /> */}
                </div>
            </div>

            <div className="mainAgencyProfileInfo">
                <div className="innerAgencyProfileInfo">
                    <div className="mainAgencyProfileLogo">
                        <div className="innerAgencyProfileLogo">
                            <img src={agencyLogo} alt="" />
                        </div>
                    </div>
                    <div className="mainAgencyProfileContent">
                        <div className="agencyName">
                            <div className="agencyNameURL">
                                <h2>One Plus</h2>
                                <p>https://oneplus.com</p>
                            </div>
                            <div className="agencyAddress">
                                <i class="fa fa-thumb-tack" aria-hidden="true"></i>
                                <span>302,BF-27,Scheme 54, Sica School Road, Vijay Nagar, Indore, MP,452010 </span>
                            </div>
                        </div>
                        <div className="agencyProfileConstantPoints">
                            <div className="pointContent" >
                                <p>Joining Date</p>
                                <h4>02 Jan 2021</h4>
                            </div>
                            <div className="pointContent" >
                                <p>Email ID</p>
                                <h4>shubham@oneplus.com</h4>
                            </div>
                            <div className="pointContent" >
                                <p>Agency Id</p>
                                <h4>287639374</h4>
                            </div>
                            <div className="pointContent" >
                                <p>Total Profile Views</p>
                                <h4>23</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mainAgencyProfileDesc">
                <div className="innerAgencyProfileDesc">
                    <div className="leftAgencyProfileDesc">
                        <h2>About us</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, quod odio! Eius harum cupiditate distinctio quos unde officiis magni officia, sed temporibus fuga odio natus porro accusantium et dolores? Ea, non, eos, dolores fugiat minima adipisci quisquam quidem excepturi qui minus dolor corporis numquam corrupti porro! Sunt tenetur ipsam voluptatum.

                    </p>
                        <div className="agencyProfileIndustry">
                            <p>Food</p>
                            <p>Fintech</p>
                            <p>E-commerce</p>
                        </div>
                    </div>
                    <div className="rightAgencyProfileDesc">
                        <div className="monthyView">
                            <div className="monthBorder"></div>
                            <img src={growth} alt="" />
                            <h3>Monthly Profile View</h3>
                            <p>05</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mainQuotation">
                <div className="innerQuotation">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                <img src={received} /> Information
                            </button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                <img src={responded} alt="" /> Skills Set
                            </button>
                            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                <img src={matched} alt="" /> Verification
                            </button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <Information />
                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <Responded />
                        </div>
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <ProjectesMatched />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AgencyProfile
