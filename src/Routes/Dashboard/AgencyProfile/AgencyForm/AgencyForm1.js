/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import FormPhases from './FormPhases';
import { FilePicker } from 'react-file-picker'
// import agencyLogo from '../../../../assets/images/LandingPage/agencyLogo.png'
import agency3d from '../../../../assets/images/AgencyProfile/form1_3d.png'
import squareShape from '../../../../assets/images/AgencyProfile/squareShape.png'
import { NavLink } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import * as helper from '../../../../shared/helper';
import Back from '../../../../Components/Back/Back';

import instance from "../../../../Constants/axiosConstants"
import { toast } from 'react-toastify'
import Spinner from '../../../../Components/Spinner/Spinner'

function AgencyForm1(props) {

    const Role = localStorage.getItem('role');
    const api_param_const = "agencies"

    const colors = {
        Upload: "blue",
        Update: "Green",
    }

    const [loading, setLoading] = useState(false);
    const status = "Upload"
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
        agencyLogoError: "",
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
        if (formData.agencyLogo !== null) {
            instance.post(`api/${Role}/${api_param_const}/create`, { ...formData })
                .then(function (response) {
                    // setStatus("Next");
                    setLoading(false);
                    props.history.push("/agency-form-two");
                })
                .catch(err => {
                    setLoading(false);
                })
        }
    }, [formData, formDataErrors]);

    // function uploadMedia(category, document) {

    //     const data = new FormData();

    //     document && data.append(
    //         "files",
    //         document,
    //         category
    //     );

    //     instance.post(`api/${Role}/media/create`, data)
    //         .then(function (response) {

    //             setFormData({
    //                 ...formData,
    //                 agencyLogo: response[0].mediaURL
    //             })

    //             setStatus("Update")
    //         })
    // }


    const handleSubmit = (category, document) => {
        if (agencyLogo === null) {
            setFormDataErrors(
                {
                    agencyLogoError: "Agency Logo is required",
                    ownerNameError: "",
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
        else if (formData.ownerName === "") {
            setFormDataErrors(
                {
                    agencyLogoError: "",
                    ownerNameError: "Owner name is required",
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
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
        else if (formData.agencyPhone.length < 10) {
            setFormDataErrors(
                {
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
        else if (!helper.validateLink(formData?.socialPlatformDetails[0]?.platformLink)) {
            setFormDataErrors(
                {
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
                    agencyLogoError: "",
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
            setLoading(true);
            if (agencyLogo !== null) {
                const data = new FormData();

                data.append(
                    "files",
                    agencyLogo.document,
                    agencyLogo.category
                );

                instance.post(`api/${Role}/media/create`, data)
                    .then(function (response) {
                        setFormData({
                            ...formData,
                            agencyLogo: response[0].mediaURL
                        })
                    })
            }

        }
    };

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


    const handleUploadError = (error) => {
        toast.error(error)
    }

    const handleDocumentPicker = (document, category) => {
        setAgencyLogo({
            category,
            document
        })
    };

    useEffect(() => {
        setFormData({
            ...formData,
            socialPlatformDetails: [linkedIn]
        })
    }, [linkedIn])


    return (
        <>
            <Navbar />
            <div className="margin-top">
                <Back name="Agency Form 1" />
            </div>
            <FormPhases value1={true} />
            {/* <div
                className="backArrow_agencyForm1"
                onClick={() => {
                    props.history.goBack();
                }}
            >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
            </div> */}
            {loading ? <Spinner /> :
                <>
                    <div className="mainPersonelDetailsForm">
                        {/* <div className="innerPersonelDetailsForm">
                        <div className="leftPersonelDetailsForm"> */}
                        <div className="innerLeftPersonelDetailsForm">
                            <div className="formContentPartOne">
                                <div className="agencyLogo_parent">
                                    <label>Agency Logo</label>
                                    <div className="getAgencyLogo">
                                        <img src={agencyLogo} alt="" />
                                        <FilePicker
                                            extensions={['jpg', 'png', 'jpeg']}
                                            onChange={fileObj => handleDocumentPicker(fileObj, "agencyLogo")}
                                            onError={error => handleUploadError(error)}>
                                            <button>
                                                <i className="fa fa-upload" aria-hidden="true" />
                                                Pick File
                                            </button>
                                        </FilePicker>
                                        <p className="logo-type_agencyForm1">{`${agencyLogo?.document?.name ?? "(jpeg, png, jpg)"}`}</p>
                                        {formDataErrors.agencyLogoError !== '' &&
                                            <p className="error_agencyForm">
                                                {formDataErrors.agencyLogoError}
                                            </p>
                                        }
                                    </div>
                                </div>
                                <div className="getAgencyDesc">
                                    <p>Description</p>
                                    <textarea
                                        name="agencyDescription"
                                        cols="30"
                                        rows="5"
                                        value={formData?.agencyDescription}
                                        onChange={(event) => handleChange(event)} />
                                    {formDataErrors.agencyDescriptionError !== '' &&
                                        <p className="error_agencyForm">
                                            {formDataErrors.agencyDescriptionError}
                                        </p>
                                    }
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
                                    {formDataErrors.ownerNameError !== '' &&
                                        // <Alert severity="error"></Alert>
                                        <p className="error_agencyForm">
                                            {formDataErrors.ownerNameError}
                                        </p>
                                    }
                                </div>

                                <div className="getOwnerName">
                                    <p>Company Email</p>
                                    <input
                                        type="text"
                                        placeholder="abc@abc.in"
                                        name="agencyEmail"
                                        value={formData?.agencyEmail}
                                        onChange={(event) => handleChange(event)} />
                                    {formDataErrors.agencyEmailError !== '' &&
                                        // <Alert severity="error"></Alert>
                                        <p className="error_agencyForm">
                                            {formDataErrors.agencyEmailError}
                                        </p>
                                    }
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
                                    {formDataErrors.agencyPhoneError !== '' &&
                                        // <Alert severity="error"></Alert>
                                        <p className="error_agencyForm">
                                            {formDataErrors.agencyPhoneError}
                                        </p>
                                    }
                                </div>
                                <div className="getOwnerName">
                                    <p>LinkedIn URL</p>
                                    <input placeholder="E.g - https://www.linkedin.com/shethink-pvt-ltd/"
                                        type="text"
                                        name={linkedIn?.platformName}
                                        value={linkedIn?.platformLink}
                                        onChange={(event) => handleSocialPlatform(event)} />
                                    {formDataErrors.socialPlatformDetailsError !== '' &&
                                        <p className="error_agencyForm">
                                            {formDataErrors.socialPlatformDetailsError}
                                        </p>
                                    }
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
                                    {formDataErrors.agencyAddressError.addressError !== '' &&
                                        <p className="error_agencyForm">
                                            {formDataErrors.agencyAddressError.addressError}
                                        </p>
                                    }
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
                                    {formDataErrors.agencyAddressError.locationError !== '' &&
                                        <p className="error_agencyForm">
                                            {formDataErrors.agencyAddressError.locationError}
                                        </p>
                                    }
                                </div>
                            </div>

                            <div className="nextBtn">
                                {/* <NavLink to="/dashboard" style={{ textDecoration: "none" }}>
                                        <button>
                                            <i className="fa fa-long-arrow-left" aria-hidden="true" />
                                            Back
                                        </button>
                                    </NavLink> */}
                                {/* <NavLink to="/agency-form-two" style={{ textDecoration: "none" }} onClick={(event) => handleNavlink(event)}> */}
                                <button onClick={(event) => handleSubmit(event)} style={{ backgroundColor: colors[status] }}>
                                    Next
                                    {/* <i className="fa fa-long-arrow-right" aria-hidden="true" /> */}
                                </button>
                                {/* </NavLink> */}
                            </div>
                            {/* 
                            </div>
                        </div> */}

                        </div>
                    </div>
                    <div className="rightPersonelDetailsForm">
                        <span>Updating Profile</span>
                        <p>Updating your profile will make you visible to more clients and lead to more revenue.</p>
                        <img className="businessModal" src={agency3d} alt="" />
                        {/* <img className="squareShape" src={squareShape} alt="" /> */}
                    </div>
                </>
            }
        </>
    )
}

export default AgencyForm1
