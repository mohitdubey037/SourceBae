/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'
import { FilePicker } from 'react-file-picker'
// import agencyLogo from '../../../../assets/images/LandingPage/agencyLogo.png'
import agency3d from '../../../../assets/images/AgencyProfile/form1_3d.png'
import squareShape from '../../../../assets/images/AgencyProfile/squareShape.png'
import { NavLink } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import * as helper from '../../../../shared/helper';

import instance from "../../../../Constants/axiosConstants"
import { toast } from 'react-toastify'

function AgencyForm1() {

    const Role = "agency"
    const api_param_const = "agencies"

    const colors = {
        upload: "blue",
        update: "yellow",
        next: "green",
        finish: "orange"
    }


    const [status, setStatus] = useState("upload")
    const [linkedIn, setLinkedIn] = useState({
        platformName: "linkedIn",
        platformLink: ""
    })

    const [agencyLogo, setAgencyLogo] = useState(null)
    const [formData, setFormData] = useState({
        stepsCompleted: "2",
        ownerName: "",
        agencyEmail: "",
        agencyPhone: "",
        agencyDescription: "",
        socialPlatformDetails: [],
        agencyLogo: null,
        agencyAddress: {
            address: "",
            location: ""
        },
    })

    const [formDataErrors, setFormDataErrors] = useState({
        ownerNameError: "",
        agencyEmailError: "",
        agencyPhoneError: "",
        agencyDescriptionError: "",
        socialPlatformDetailsError: "",
        agencyAddressError: {
            addressError: "",
            locationError: ""
        },
    })



    useEffect(() => {
    }, [formData, formDataErrors]);


    const handleSubmit = () => {
        if (formData.ownerName === "") {
            setFormDataErrors(
                {
                    ownerNameError: "Owener name is required",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    }
                }
            )
        }
        else if (formData.ownerName.length < 2) {
            setFormDataErrors(
                {
                    ownerNameError: "Owner name must be more than 2 characters.",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyEmail === "") {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "Email is required.",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (!/\S+@\S+\.\S+/.test(formData.agencyEmail)) {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "Invalid email address.",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyPhone === "") {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "Phone is required",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyPhone < 10) {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "Phone must be of 10 digits.",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyPhone.match(/[^0-9]/g)) {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "Phone must be digits.",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyDescription === "") {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "Description is required",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyDescription < 100 && formData.agencyDescription > 300) {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "Description must be between 100-300 characters.",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        //         else if (formData?.socialPlatformDetails[0]?.agencyAddress === "") {
        //     setFormDataErrors(
        //             {
        //                 ownerNameError: "",
        //                 agencyEmailError: "",
        //                 agencyPhoneError: "",
        //                 agencyDescriptionError: "",
        //                 socialPlatformDetailsError: "",
        //                 agencyAddressError: {
        //                     addressError: "",
        //                     locationError: ""
        //                 },
        //             }
        //         )
        // }
        else if (!helper.validateLink(formData?.socialPlatformDetails[0]?.platformLink)){
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "Invalid website address",
                    agencyAddressError: {
                        addressError: "",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyAddress.address === "") {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "Address is required",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyAddress.address > 200) {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "Address must be less than 200 characters.",
                        locationError: ""
                    },
                }
            )
        }
        else if (formData.agencyAddress.location === "") {
            setFormDataErrors(
                {
                    ownerNameError: "",
                    agencyEmailError: "",
                    agencyPhoneError: "",
                    agencyDescriptionError: "",
                    socialPlatformDetailsError: "",
                    agencyAddressError: {
                        addressError: "",
                        locationError: "Location is required"
                    },
                }
            )
        }
        else {
            instance.post(`api/${Role}/${api_param_const}/create`, { ...formData })
                .then(function (response) {
                    setStatus("next")
                })
        }
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

    const handleNavlink = async (e) => {
        console.log(status)
        if (status !== "next") {
            e.preventDefault()
            if (status === "upload" && agencyLogo !== null)
                uploadMedia(agencyLogo.category, agencyLogo.document)
            else if (status === "update")
                handleSubmit()
            else
                toast.error("Upload document.")
        }
        else if (status === "next")
            window.location.href = "/agency-form-two"
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

        instance.post(`api/${Role}/media/create`, data)
            .then(function (response) {

                setFormData({
                    ...formData,
                    agencyLogo: response[0].mediaURL
                })

                setStatus("update")
            })

    }

    useEffect(() => {
        setFormData({
            ...formData,
            socialPlatformDetails: [linkedIn]
        })
    }, [linkedIn])

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
                                    <p>{`${agencyLogo?.document?.name ?? ""}`}</p>
                                    <FilePicker
                                        extensions={['pdf', 'jpg', 'png']}
                                        onChange={fileObj => handleDocumentPicker(fileObj, "agencyLogo")}
                                        onError={error => handleUploadError(error)}>

                                        <button>
                                            <i class="fa fa-upload" aria-hidden="true" />
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
                                    {formDataErrors.agencyDescriptionError !== '' && <Alert severity="error">{formDataErrors.agencyDescriptionError}</Alert>}
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
                                    {formDataErrors.ownerNameError !== '' && <Alert severity="error">{formDataErrors.ownerNameError}</Alert>}
                                </div>

                                <div className="getOwnerName">
                                    <p>Company Email</p>
                                    <input
                                        type="text"
                                        placeholder="abc@abc.in"
                                        name="agencyEmail"
                                        value={formData?.agencyEmail}
                                        onChange={(event) => handleChange(event)} />
                                    {formDataErrors.agencyEmailError !== '' && <Alert severity="error">{formDataErrors.agencyEmailError}</Alert>}
                                </div>
                            </div>

                            <div className="formContentPartTwo">
                                <div className="getOwnerName">
                                    <p>Company Phone</p>
                                    <input
                                        maxLength='10'
                                        type="text"
                                        placeholder="9876543210"
                                        name="agencyPhone"
                                        value={formData?.agencyPhone}
                                        onChange={(event) => handleChange(event)} />
                                    {formDataErrors.agencyPhoneError !== '' && <Alert severity="error">{formDataErrors.agencyPhoneError}</Alert>}
                                </div>
                                <div className="getOwnerName">
                                    <p>LinkedIn URL</p>
                                    <input placeholder="E.g - https://www.linkedin.com/shethink-pvt-ltd/"
                                        type="text"
                                        name={linkedIn?.platformName}
                                        value={linkedIn?.platformLink}
                                        onChange={(event) => handleSocialPlatform(event)} />
                                    {formDataErrors.socialPlatformDetailsError !== '' && <Alert severity="error">{formDataErrors.socialPlatformDetailsError}</Alert>}
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
                                    {formDataErrors.agencyAddressError.addressError !== '' && <Alert severity="error">{formDataErrors.agencyAddressError.addressError}</Alert>}
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
                                    {formDataErrors.agencyAddressError.locationError !== '' && <Alert severity="error">{formDataErrors.agencyAddressError.locationError}</Alert>}
                                </div>
                            </div>

                            <div className="nextBtn">
                                <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                                    <button>
                                        <i class="fa fa-long-arrow-left" aria-hidden="true" />
                                        Back
                                    </button>
                                </NavLink>
                                <NavLink to="/agency-form-two" style={{ textDecoration: "none" }} onClick={(event) => handleNavlink(event)}>
                                    <button style={{ backgroundColor: colors[status] }}>
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
