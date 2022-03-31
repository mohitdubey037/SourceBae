import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import FormPhases from './FormPhases';
// import agencyLogo from '../../../../assets/images/LandingPage/agencyLogo.png'
import * as helper from '../../../../shared/helper';
import Back from '../../../../Components/Back/Back';
import { useDropzone } from 'react-dropzone';

import instance from '../../../../Constants/axiosConstants';
import Spinner from '../../../../Components/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { FaFileUpload } from 'react-icons/fa';

import { upload } from '../../../../shared/helper';

import './ResponsiveAgencyForm.css';
import { toast } from 'react-toastify';
import { AGENCYROUTES } from '../../../../Navigation/CONSTANTS';

function AgencyForm1(props) {
    const dispatch = useDispatch();

    const Role = localStorage.getItem('role');
    const api_param_const = 'agencies';

    const [loading, setLoading] = useState(false);
    const steps = '';
    const [errors, setErrors] = useState({});

    const [logo, setLogo] = useState(null);

    const [formData, setFormData] = useState({
        stepsCompleted: 2,
        ownerName: props?.location?.state?.agencyForm1
            ? props.location.state.agencyForm1.ownerName
            : '',
        agencyEmail: props?.location?.state?.agencyForm1
            ? props.location.state.agencyForm1.agencyEmail
            : '',
        agencyPhone: props?.location?.state?.agencyForm1
            ? props.location.state.agencyForm1.agencyPhone
            : '',
        agencyDescription: props?.location?.state?.agencyForm1
            ? props.location.state.agencyForm1.agencyDescription
            : '',
        socialPlatformDetails: props?.location?.state?.agencyForm1
            ? props.location.state.agencyForm1.socialPlatformDetails
            : [],
        agencyLogo: null,
        agencyAddress: props.location.state?.agencyForm1
            ? props.location.state.agencyForm1.agencyAddress
            : {
                  address: '',
                  location: ''
              }
    });

    const [linkedIn, setLinkedIn] = useState({
        platformName: 'linkedIn',
        platformLink: formData.socialPlatformDetails[0]
            ? formData.socialPlatformDetails[0].platformLink
            : ''
    });

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setLogo(acceptedFiles);
        } else {
            toast.error('Only .jpg, .jpeg, .png, files are allowed');
        }
    }, []);

    const { isDragActive, getRootProps, getInputProps, isDragReject } =
        useDropzone({
            onDrop,
            accept: '.jpg,.jpeg,.png',
            minSize: 0,
            maxSize: 5000000
        });

    const errorValidation = () => {
        const errors = {};
        if (logo === null) {
            errors.agencyLogo = 'Agency Logo is required';
        } else if (formData.agencyDescription === '') {
            errors.agencyDescription = 'Description is required';
        } else if (formData.agencyDescription.length < 2) {
            errors.agencyDescription =
                'Description must be atleast 2 characters.';
        } else if (formData.ownerName === '') {
            errors.ownerName = 'Owner name is required';
        } else if (formData.ownerName.length < 2) {
            errors.ownerName = 'Owner name must be more than 2 characters.';
        } else if (formData.ownerName === '') {
            errors.ownerName = 'Owner name is required';
        } else if (formData.ownerName.length < 2) {
            errors.ownerName = 'Owner name must be more than 2 characters.';
        } else if (formData.agencyEmail === '') {
            errors.agencyEmail = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.agencyEmail)) {
            errors.agencyEmail = 'Invalid email address.';
        } else if (formData.agencyPhone === '') {
            errors.agencyPhone = 'Phone is required';
        } else if (formData.agencyPhone.length < 10) {
            errors.agencyPhone = 'Phone must be of 10 digits.';
        } else if (formData.agencyPhone.match(/[^0-9]/g)) {
            errors.agencyPhone = 'Phone must be digits.';
        } else if (formData.socialPlatformDetails[0].platformLink === '') {
            errors.socialPlatformDetails = 'LinkedIn URL required';
        } else if (
            !helper.validateLinkedIn(
                formData?.socialPlatformDetails[0]?.platformLink
            )
        ) {
            errors.socialPlatformDetails = 'Invalid LinkedIn URL';
        } else if (
            !helper.validateLink(
                formData?.socialPlatformDetails[0]?.platformLink
            )
        ) {
            errors.socialPlatformDetails = 'Invalid website address';
        } else if (formData.agencyAddress.address === '') {
            errors.address = 'Address is required';
        } else if (formData.agencyAddress.address.length < 3) {
            errors.address = 'Address must be at least 3 characters';
        } else if (formData.agencyAddress.address > 200) {
            errors.address = 'Address must be less than 200 characters.';
        } else if (formData.agencyAddress.location === '') {
            errors.location = 'Location is required';
        } else if (formData.agencyAddress.location.length < 3) {
            errors.location = 'Location must be atleast 3 characters';
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) return true;
        else return false;
    };

    async function uploadMedia() {
        try {
            const detail = await upload(logo, Role);
            detail &&
                setFormData({
                    ...formData,
                    agencyLogo: detail
                });
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = () => {
        instance
            .post(`api/${Role}/${api_param_const}/create`, { ...formData })
            .then(function () {
                setLoading(false);
                dispatch({ type: 'NEXT_PRESSED' });
                props.history.push(AGENCYROUTES.AGENCY_UPDATE_2, {
                    agencyForm1: formData
                });
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (formData.agencyLogo !== null) {
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.agencyLogo]);

    const handleButton = () => {
        if (errorValidation()) {
            uploadMedia();
        }
    };

    const handleChange = (event) => {
        const { id, name, value } = event.target;
        if (id === 'address_location') {
            setFormData({
                ...formData,
                agencyAddress: {
                    ...formData.agencyAddress,
                    [name]: value
                }
            });
        } else if (name === 'agencyPhone') {
            if (helper.noTextNumber(value)) {
                setFormData({
                    ...formData,
                    [name]: value
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSocialPlatform = (event) => {
        const { name, value } = event.target;
        if (name === 'linkedIn') {
            setLinkedIn({
                platformName: name,
                platformLink: value
            });
        }
    };

    useEffect(() => {
        setFormData({
            ...formData,
            socialPlatformDetails: [linkedIn]
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [linkedIn]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Navbar />
                    <div className="agency-form_parent">
                        <Back name="Basic Details" />
                        <FormPhases value1={true} steps={steps} />
                        <div className="mainPersonelDetailsForm">
                            <div className="innerLeftPersonelDetailsForm">
                                <div className="formContentPartOne">
                                    <div className="agencyLogo_parent">
                                        <label>
                                            Company Logo
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </label>
                                        <div className="getAgencyLogo">
                                            <div className="fileUploadButton_addingDeveloper upload_logo">
                                                <section className="container_agencyForm1">
                                                    <div {...getRootProps()}>
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        {!isDragActive && (
                                                            <>
                                                                <FaFileUpload />
                                                                <p className="agencyLogo_pick_file">
                                                                    Pick File
                                                                </p>
                                                            </>
                                                        )}
                                                        {isDragActive &&
                                                            !isDragReject &&
                                                            "Drop it like it's hot!"}
                                                        {isDragReject &&
                                                            'File type not accepted, sorry!'}
                                                    </div>
                                                </section>
                                            </div>
                                            {logo === null ? (
                                                <p className="logo-type_agencyForm1">
                                                    Please Choose file (jpeg,
                                                    png, jpg)
                                                </p>
                                            ) : (
                                                <div className="accepted_file_items">
                                                    <p>{logo[0].name}</p>
                                                </div>
                                            )}
                                            {errors?.agencyLogo !== '' && (
                                                <p className="error_agencyForm">
                                                    {errors.agencyLogo}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="getAgencyDesc">
                                        <p>
                                            Description
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </p>
                                        <textarea
                                            name="agencyDescription"
                                            cols="30"
                                            rows="5"
                                            placeholder="Add Description"
                                            value={formData?.agencyDescription}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors?.agencyDescription !== '' && (
                                            <p className="error_agencyForm">
                                                {errors.agencyDescription}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="formContentPartTwo">
                                    <div className="getOwnerName">
                                        <p>
                                            Owner Name{' '}
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter Owner's Name"
                                            name="ownerName"
                                            value={formData?.ownerName}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.ownerName !== '' && (
                                            <p className="error_agencyForm">
                                                {errors.ownerName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="getOwnerName">
                                        <p>
                                            Company Email
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter Company Email"
                                            name="agencyEmail"
                                            value={formData?.agencyEmail}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.agencyEmail !== '' && (
                                            <p className="error_agencyForm">
                                                {errors.agencyEmail}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="formContentPartTwo">
                                    <div className="getOwnerName">
                                        <p>
                                            Company Phone
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </p>
                                        <input
                                            maxLength="10"
                                            type="text"
                                            placeholder="Enter Company Contact Number"
                                            name="agencyPhone"
                                            value={formData?.agencyPhone}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.agencyPhone !== '' && (
                                            <p className="error_agencyForm">
                                                {errors.agencyPhone}
                                            </p>
                                        )}
                                    </div>
                                    <div className="getOwnerName">
                                        <p>
                                            LinkedIn Profile URL
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </p>
                                        <input
                                            placeholder="E.g - https://www.linkedin.com/shethink-pvt-ltd/"
                                            type="text"
                                            name={linkedIn?.platformName}
                                            value={linkedIn?.platformLink}
                                            onChange={(event) =>
                                                handleSocialPlatform(event)
                                            }
                                        />
                                        {errors.socialPlatformDetails !==
                                            '' && (
                                            <p className="error_agencyForm">
                                                {errors.socialPlatformDetails}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="formContentPartTwo">
                                    <div className="getOwnerName">
                                        <p>
                                            Company Address
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter Company Address"
                                            name="address"
                                            id="address_location"
                                            value={
                                                formData?.agencyAddress?.address
                                            }
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.address !== '' && (
                                            <p className="error_agencyForm">
                                                {errors.address}
                                            </p>
                                        )}
                                    </div>

                                    <div className="getOwnerName">
                                        <p>
                                            Company Location
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter Company Location"
                                            name="location"
                                            id="address_location"
                                            value={
                                                formData?.agencyAddress
                                                    ?.location
                                            }
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.location !== '' && (
                                            <p className="error_agencyForm">
                                                {errors.location}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="nextBtn">
                                    <button
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(to right, #5C6DFF, #45A4EA)'
                                        }}
                                        onClick={() => handleButton()}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default AgencyForm1;
