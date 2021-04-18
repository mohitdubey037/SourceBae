import React, { useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'
import { FilePicker } from 'react-file-picker'
import agencyLogo from '../../../../assets/images/LandingPage/agencyLogo.png'
import agency3d from '../../../../assets/images/AgencyProfile/form1_3d.png'
import squareShape from '../../../../assets/images/AgencyProfile/squareShape.png'
import { NavLink } from 'react-router-dom'

import instance from "../../../../Constants/axiosConstants"

function AgencyForm1() {

    const Role = "agency"
    const api_param_const = "agencies"
    const [formData, setFormData] = useState({
        stepsCompleted: "2",
        ownerName: "",
        agencyEmail: "",
        agencyPhone: "",
        agencyDescription: "",
        agencyLogo: "http://13.235.79.27:8000/media/images/1618496735048.png",
        agencyAddress: {
            address: "",
            location: ""
        },
    })

    const handleSubmit = () => {
        // toast("You need to fill this form first to move to next step.")
       

        instance.post(`api/${Role}/${api_param_const}/create`, { ...formData })
        .then(function (response) {
            window.location.replace("/dashboard")
        })
    }

    const handleChange = (event) => {
        const {id,name,value} = event.target
        if(id==='address_location'){
            setFormData({
                ...formData,
                agencyAddress:{
                    ...formData.agencyAddress,
                    [name]:value
                }
            })
        }
        else{
            setFormData({
                ...formData,
                [name]:value
            })
        }

    }

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
                                    <p>Description</p>
                                    <textarea
                                        name="agencyDescription"
                                        cols="30"
                                        rows="5"
                                        value={formData.agencyDescription}
                                        onChange={(event) => handleChange(event)} />
                                </div>
                            </div>

                            <div className="formContentPartTwo">
                                <div className="getOwnerName">
                                    <p>Owner Name</p>
                                    <input
                                        type="text"
                                        placeholder="Jack Morrison"
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={(event) => handleChange(event)}
                                    />
                                </div>

                                <div className="getOwnerName">
                                    <p>Company Email</p>
                                    <input
                                        type="text"
                                        placeholder="abc@abc.in"
                                        name="agencyEmail" 
                                        value={formData.agencyEmail}
                                        onChange={(event) => handleChange(event)} />
                                </div>
                            </div>

                            <div className="formContentPartTwo">
                                <div className="getOwnerName">
                                    <p>Company Phone</p>
                                    <input 
                                        type="text" 
                                        placeholder="9876543210" 
                                        name="agencyPhone" 
                                        value={formData.agencyPhone}
                                        onChange={(event) => handleChange(event)} />
                                </div>

                                {/* <div className="getOwnerName">
                                    <p>Linkedin URL</p>
                                    <input type="text" placeholder="https://linkedin.com/in/company" name="" id="" />
                                </div> */}
                            </div>

                            <div className="formContentPartTwo addressField">
                                <div className="getOwnerName getCompanyAddress">
                                    <p>Company Address</p>
                                    <input
                                        type="text"
                                        placeholder="scheme 54, Vijay Nagar, Indore,MP"
                                        name="address" 
                                        id="address_location" 
                                        value = {formData.agencyAddress.address}
                                        onChange={(event) => handleChange(event)} />
                                </div>

                                <div className="getOwnerName getCompanyAddress">
                                    <p>Company Location</p>
                                    <input
                                        type="text"
                                        placeholder="scheme 54, Vijay Nagar, Indore,MP"
                                        name="location"
                                        id="address_location" 
                                        value = {formData.agencyAddress.location}
                                        onChange={(event) => handleChange(event)} />
                                </div>
                            </div>

                            <div className="nextBtn">
<<<<<<< HEAD
                                <button onClick={() => handleSubmit(formData)}>
                                    Next
                                    <i class="fa fa-long-arrow-right" aria-hidden="true" />
                                </button>
=======
                                {/* <NavLink to="/agency-form-two" >Next <i class="fa fa-long-arrow-right" aria-hidden="true"></i></NavLink> */}
                                <div></div>
>>>>>>> c84ff58cae18d0c6bfde2dd25c237de5d3275610
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
