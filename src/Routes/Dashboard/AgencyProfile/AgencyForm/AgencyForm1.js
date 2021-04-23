import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'
import { FilePicker } from 'react-file-picker'
import agencyLogo from '../../../../assets/images/LandingPage/agencyLogo.png'
import agency3d from '../../../../assets/images/AgencyProfile/form1_3d.png'
import squareShape from '../../../../assets/images/AgencyProfile/squareShape.png'
import { NavLink } from 'react-router-dom'

import instance from "../../../../Constants/axiosConstants"
import { toast } from 'react-toastify'

function AgencyForm1() {

    const Role = "agency"
    const api_param_const = "agencies"

    const [status,setStatus] = useState("upload")
    const [linkedIn, setLinkedIn] = useState({
        platformName:"linkedIn",
        platformLink:""
    })

    const [agencyLogo, setAgencyLogo] = useState(null)
    const [formData, setFormData] = useState({
        stepsCompleted: "2",
        ownerName: "",
        agencyEmail: "",
        agencyPhone: "",
        agencyDescription: "",
        socialPlatformDetails:[],
        agencyLogo: null,
        agencyAddress: {
            address: "",
            location: ""
        },
    })

    const handleSubmit = () => {
        console.log(formData, "formData")
        instance.post(`api/${Role}/${api_param_const}/create`, { ...formData })
            .then(function (response) {
                setStatus("next")
            })
    }

    const handleChange = (event) => {
        const { id, name, value } = event.target
        if (id === 'address_location') {
            setFormData({
                ...formData,
                agencyAddress: {
                    ...formData.agencyAddress,
                    [name]: value
                }
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            })
        }

    }

    
    const handleSocialPlatform = (event) => {
        const { name, value } = event.target
        if (name === "linkedIn") {
            setLinkedIn({
                platformName: name,
                platformLink: value
            })

        }
    }
    const handleNavlink = async(e)=>{
        if(status!=="next"){
            e.preventDefault()
            if(status==="upload" && agencyLogo!==null)
                uploadMedia(agencyLogo.category,agencyLogo.document)
            else if(status==="update")
                handleSubmit()
            else
                toast.error("Something went wrong.")
        }
    }

    const handleUploadError = (error) => {
        toast.error(error)
    }

    const handleDocumentPicker = (document, category) => {
        setAgencyLogo({
            category,
            document    
        })
    }

    function uploadMedia(category, document) {

        const data = new FormData();
        
        document && data.append(
            "files",
            document,
            category
        );
        console.log(data)
        instance.post(`api/${Role}/media/create`, data)
            .then(function (response) {
                
                setFormData({
                    ...formData,
                    agencyLogo:response[0].mediaURL
                })

                setStatus("update")
            })

    }

    useEffect(()=>{
        setFormData({
            ...formData,
            socialPlatformDetails:[linkedIn]
        })
    },[linkedIn])
    
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
                                        extensions={['pdf', 'jpg', 'png']}
                                        onChange={fileObj => handleDocumentPicker(fileObj, "agencyLogo")}
                                        onError={error => handleUploadError(error)}>
                                        <button>
                                            <i class="fa fa-upload" aria-hidden="true"/>
                                            Pick File
                                        </button>
                                </FilePicker>
                                </div>
                                <div className="getAgencyDesc">
                                    <p>Description</p>
                                    <textarea
                                        name="agencyDescription"
                                        cols="30"
                                        rows="5"
                                        value={formData?.agencyDescription}
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
                                        value={formData?.ownerName}
                                        onChange={(event) => handleChange(event)}
                                    />
                                </div>

                                <div className="getOwnerName">
                                    <p>Company Email</p>
                                    <input
                                        type="text"
                                        placeholder="abc@abc.in"
                                        name="agencyEmail"
                                        value={formData?.agencyEmail}
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
                                        value={formData?.agencyPhone}
                                        onChange={(event) => handleChange(event)} />
                                </div>
                                <div className="getOwnerName">
                                    <p>LinkedIn URL</p>
                                    <input placeholder="E.g - https://www.linkedin.com/shethink-pvt-ltd/"
                                        type="text"
                                        name={linkedIn?.platformName}
                                        value={linkedIn?.platformLink}
                                        onChange={(event) => handleSocialPlatform(event)} />
                                </div>
                            </div>

                            <div className="formContentPartTwo">
                                <div className="getOwnerName">
                                    <p>Company Address</p>
                                    <input
                                        type="text"
                                        placeholder="scheme 54, Vijay Nagar"
                                        name="address"
                                        id="address_location"
                                        value={formData?.agencyAddress?.address}
                                        onChange={(event) => handleChange(event)} />
                                </div>

                                <div className="getOwnerName">
                                    <p>Company Location</p>
                                    <input
                                        type="text"
                                        placeholder="Indore,MP"
                                        name="location"
                                        id="address_location"
                                        value={formData?.agencyAddress?.location}
                                        onChange={(event) => handleChange(event)} />
                                </div>
                            </div>

                            <div className="nextBtn">
                                <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                                    <button>
                                        <i class="fa fa-long-arrow-left" aria-hidden="true" />
                                        Back
                                    </button>
                                </NavLink>
                                <NavLink to="/agency-form-two"  style={{ textDecoration: "none" }} onClick = {(event)=>handleNavlink(event)}>
                                    <button>
                                        {status}
                                        <i class="fa fa-long-arrow-right" aria-hidden="true" />
                                    </button>
                                </NavLink>
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
