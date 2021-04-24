import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './AgencyProfile.css'

import profileHeader from '../../assets/images/Quotation/profileHeader.jpg'
import agencyLogo from '../../assets/images/Logo/agencyLogo.svg'
import growth from '../../assets/images/Logo/growth.svg'
import document from '../../assets/images/Logo/document.png'
import Received from './Quotation/Received'
import Responded from './Quotation/Responded'
import ProjectesMatched from './Quotation/ProjectesMatched'
import received from '../../assets/images/Quotation/received.png'
import responded from '../../assets/images/Quotation/responded.png'
import matched from '../../assets/images/Quotation/matched.png'
import Information from './AgencyProfile/Information'
import SkillsSet from './AgencyProfile/SkillsSet'
import Rules from './AgencyProfile/Rules'

import { FilePicker } from 'react-file-picker'
import DeveloperList from './AgencyProfile/DeveloperList'
import Portfolio from './AgencyProfile/Portfolio'
import FeatureLink from './AgencyProfile/FeatureLink'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import instance from "../../Constants/axiosConstants"

function AgencyProfile() {

    const Role = "agency"
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [agencyProfileData, setAgencyProfileData]= useState({
        ownerName: "",
        agencyName: "",
        agencyEmail: "",
        agencyPhone: "",
        agencyDescription: "",
        agencyLogo: "",
        incorporationDate: "",
        agencyTeamSize: "",
        isAgencyRegistered: "",
        isAgencyVerified: "",
        verificationMessage: "",
        agencyAverageRating: "",
        stepsCompleted: "",
        agencyMonthlyBudget: "",
        agencyServices: [],
        agencyTechnologies: [],
        _id: "6075c922cb210f7772a268df",
        agencyDomains: [],
        agencyDocuments: [],
        socialPlatformDetails: [],
        projectDetails: [],
        agencyAddress:{
            address: "",
            location: "",
            _id: ""
        },
        createdAt: "",
        updatedAt: "",
    })
    const getAgencyProfile = ()=>{
        const id = localStorage.getItem("userId")
        instance.get(`/api/${Role}/agencies/get/${id}`)
        .then(function(response){
            console.log(response)
            setAgencyProfileData({...response})
        })
    }

    useEffect(()=>{
        getAgencyProfile()
    },[])

    return (
        <>
            <Navbar headingInfo="Agency Profile" />

            <div className="mainProfileHeaderImage">
                <div className="innerProfileHeaderImage">
                    <div>
                        <p onClick={onOpenModal} ><i class="fa fa-question-circle" aria-hidden="true"></i>Have a Question..?</p>
                    </div>
                </div>
            </div>

            <Modal open={open} classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
            }} onClose={onCloseModal} center>
                <div className="mainAskQuestion">
                    <div className="innerAskQuestion">
                        <div className="questionAsking">
                            <h1>Have Any Queries..??</h1>
                            <div className="questionFields">
                                <input placeholder="Your Question here" type="text" name="" id="" />
                                <button>Ask Question</button>
                            </div>
                        </div>

                        <div className="recetlyAskedQuestion">
                            <h2>Recently Asked Questions</h2>
                            <div>
                                <h3>Are your developers willing to work remotely?</h3>
                                <p>Yes.</p>
                            </div>
                            <div>
                                <h3>Are your developers willing to work remotely?</h3>
                                <p>Yes.</p>
                            </div>
                            <div>
                                <h3>Are your developers willing to work remotely?</h3>
                                <p>Yes.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>

            <div className="mainAgencyProfileInfo">
                <div className="innerAgencyProfileInfo">
                    <div className="mainAgencyProfileLogo">
                        <div className="innerAgencyProfileLogo">
                            <img src={agencyProfileData.agencyLogo} alt="" />
                        </div>
                    </div>
                    <div className="mainAgencyProfileContent">
                        <div className="agencyName">
                            <div className="agencyNameURL">
                                <div className="agencyDEtails">
                                    <h2>{agencyProfileData?.agencyName}</h2>
                                    <p>{`${agencyProfileData?.socialPlatformDetails[0]?.platformLink}`}</p>
                                </div>
                                <div className="verifiedStatus" style={{ filter: `${(!agencyProfileData?.isAgencyVerified) ? `grayscale(100%)` : `none`}` }}>
                                    <i class="fa fa-check" aria-hidden="true"/> 
                                    <span>{`${!agencyProfileData?.isAgencyVerified?agencyProfileData?.verificationMessage:`Verified`}`}</span>
                                </div>
                            </div>
                            <div className="agencyAddress">
                                <i class="fa fa-thumb-tack" aria-hidden="true"></i>
                                <span>{`${agencyProfileData?.agencyAddress?.address}, ${agencyProfileData?.agencyAddress?.location}`} </span>
                            </div>
                        </div>
                        <div className="agencyProfileConstantPoints">
                            <div className="pointContent" >
                                <p>Joining Date</p>
                                <h4>02 Jan 2021</h4>
                            </div>
                            <div className="pointContent" >
                                <p>Email ID</p>
                                <h4>{agencyProfileData.agencyEmail}</h4>
                            </div>
                            <div className="pointContent" >
                                <p>Agency Id</p>
                                <h4>{agencyProfileData._id}</h4>
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
                        <p>{agencyProfileData.agencyDescription}</p>
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
                        <div className="monthyView">
                            <div className="monthBorder"></div>
                            <h3>Agency Document</h3>

                            {/* <button> */}
                            <img style={{ position: 'relative' }} src={document} alt="" />

                            <FilePicker
                                extensions={['pdf']}
                                onChange={FileObject => { }}
                                onError={errMsg => { }}
                            >
                                <button className="uploadButton">
                                    <i class="fa fa-upload" aria-hidden="true"></i>Upload
                                </button>

                            </FilePicker>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mainQuotation">
                <div className="innerQuotation">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                                <img src={received} alt="information" /> Information
                            </button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                                <img src={responded} alt="skills" /> Skills Set
                            </button>
                            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                                <img src={matched} alt="rules" /> Agency Rules
                            </button>
                            <button class="nav-link" id="nav-developer-tab" data-bs-toggle="tab" data-bs-target="#nav-developer" type="button" role="tab" aria-controls="nav-developer" aria-selected="false">
                                <img src={matched} alt="dev" /> Developers
                            </button>
                            <button class="nav-link" id="nav-portfolio-tab" data-bs-toggle="tab" data-bs-target="#nav-portfolio" type="button" role="tab" aria-controls="nav-portfolio" aria-selected="false">
                                <img src={matched} alt="portfolio" /> Portfolio
                            </button>
                            <button class="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">
                                <img src={matched} alt="Reviews" /> Reviews
                            </button>
                            <button class="nav-link" id="nav-question-tab" data-bs-toggle="tab" data-bs-target="#nav-question" type="button" role="tab" aria-controls="nav-question" aria-selected="false">
                                <img src={matched} alt="Feature Link" /> Feature Link
                            </button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <Information data = {agencyProfileData}/>
                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <SkillsSet />
                        </div>
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <Rules />
                        </div>
                        <div class="tab-pane fade" id="nav-developer" role="tabpanel" aria-labelledby="nav-developer-tab">
                            <DeveloperList />
                        </div>
                        <div class="tab-pane fade" id="nav-portfolio" role="tabpanel" aria-labelledby="nav-portfolio-tab">
                            <Portfolio />
                        </div>
                        <div class="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
                            <DeveloperList />
                        </div>
                        <div class="tab-pane fade" id="nav-question" role="tabpanel" aria-labelledby="nav-question-tab">
                            <FeatureLink />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AgencyProfile
