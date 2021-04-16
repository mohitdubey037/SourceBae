import React from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'
import { FilePicker } from 'react-file-picker'
import agencyLogo from '../../../../assets/images/LandingPage/agencyLogo.png'
import agency3d from '../../../../assets/images/AgencyProfile/form1_3d.png'
import squareShape from '../../../../assets/images/AgencyProfile/squareShape.png'
import { NavLink } from 'react-router-dom'

function AgencyForm1() {
    return (
        <>
            <Navbar />

            <FormPhases value1={true} />


            <div className="mainPersonelDetailsForm">
                <div className="innerPersonelDetailsForm">
                    <div className="leftPersonelDetailsForm">
                        <div className="innerLeftPersonelDetailsForm">

                            <div className="formContentPartOne">
                                <div className="getAgencyLogo">
                                    <img src={agencyLogo} alt="" />
                                    <FilePicker
                                        extensions={['md']}
                                        onChange={FileObject => { }}
                                        onError={errMsg => { }}
                                    >
                                        <button>
                                            Upload Logo
                                        </button>
                                    </FilePicker>
                                </div>
                                <div className="getAgencyDesc">
                                    <p>Decription</p>
                                    <textarea name="" id="" cols="30" rows="5"></textarea>
                                </div>
                            </div>

                            <div className="formContentPartTwo">
                                <div className="getOwnerName">
                                    <p>Owner Name</p>
                                    <input type="text" placeholder="Jack Morrison" name="" id="" />
                                </div>
                                <div className="getOwnerName">
                                    <p>Company Email</p>
                                    <input type="text" placeholder="abc@abc.in" name="" id="" />
                                </div>
                            </div>
                            <div className="formContentPartTwo">
                                <div className="getOwnerName">
                                    <p>Company Phone</p>
                                    <input type="text" placeholder="9876543210" name="" id="" />
                                </div>
                                <div className="getOwnerName">
                                    <p>Linkedin URL</p>
                                    <input type="text" placeholder="https://linkedin.com/in/company" name="" id="" />
                                </div>
                            </div>
                            <div className="formContentPartTwo addressField">
                                <div className="getOwnerName getCompanyAddress">
                                    <p>Company Address</p>
                                    <input type="text" placeholder="scheme 54, Vijay Nagar, Indore,MP" name="" id="gettingAddress" />
                                </div>
                            </div>

                            <div className="nextBtn">
                                <NavLink to="/agency-form-two" >Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink>
                            </div>

                        </div>
                    </div>
                    <div className="rightPersonelDetailsForm">
                        <span>Updating Profile</span>
                        <p>Upadting your profile will make you visible to more clients and lead to more revenue.</p>
                        <img className="businessModal" src={agency3d} alt="" />
                        <img className="squareShape" src={squareShape} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencyForm1
