/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import Navbar from '../../Navbar';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../../Components/Back/Back';
import FormPhases from './FormPhases'

import agencyLogo from '../../../../assets/images/agencyForm/document.png'
import brochure from '../../../../assets/images/agencyForm/brochure.png'
import panCard from '../../../../assets/images/agencyForm/panCard.png'
import privacy from '../../../../assets/images/agencyForm/privacy.svg';
// import FinishIcon from '../../../../assets/images/Newestdashboard/AgencyForm1/upload_icon.svg';
import fileIcon from '../../../../assets/images/Newestdashboard/Agency-form/attach-file.svg';
import { NavLink } from 'react-router-dom'

import { FilePicker } from 'react-file-picker'
import { toast } from 'react-toastify'

//axios instance
import instance from "../../../../Constants/axiosConstants"
import Spinner from '../../../../Components/Spinner/Spinner'

function AgencyForm3(props) {

    const colors = {
        Upload: "#119dee",
        Update: "orange",
        Next: "green",
    }

    const Role = "agency"
    const status = "Upload"
    const [pickedAll, setPickedAll] = useState(false)
    const [loading, setLoading] = useState(false);

    const [registrationCertificate, setRegistrationCertificate] = useState({
        documentName: "Company Registration Certificate",
        documentLink: "",
        documentPicked: false,
        document: ""
    })

    const [brochureDoc, setBrochureDoc] = useState({
        documentName: "Brochure",
        documentLink: "",
        documentPicked: false,
        document: ""
    })

    const [panCardDoc, setPanCardDoc] = useState({
        documentName: "Pancard",
        documentLink: "",
        documentPicked: false,
        document: ""
    })

    const handleDocumentPicker = (document, category) => {
        if (category === registrationCertificate.documentName) {
            setRegistrationCertificate({
                ...registrationCertificate,
                documentPicked: true,
                name: document.name,
                document
            })
        }

        else if (category === brochureDoc.documentName) {
            setBrochureDoc({
                ...brochureDoc,
                documentPicked: true,
                name: document.name,
                document
            })
        }
        else if (category === panCardDoc.documentName) {
            setPanCardDoc({
                ...panCardDoc,
                documentPicked: true,
                name: document.name,
                document
            })
        }
    }

    const handleUploadError = (error) => {
        toast.error(error)
    }

    function uploadMedia() {
        setLoading(true);
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append(
                "files",
                registrationCertificate.document,
                registrationCertificate.name
            );
            formData.append(
                "files",
                brochureDoc.document,
                brochureDoc.name
            );
            formData.append(
                "files",
                panCardDoc.document,
                panCardDoc.name
            );
            instance.post(`https://api.onesourcing.in/api/${Role}/media/create`, formData)
                .then(function (response) {
                    setRegistrationCertificate({
                        ...registrationCertificate,
                        documentLink: response[0].mediaURL
                    })

                    setBrochureDoc({
                        ...brochureDoc,
                        documentLink: response[1].mediaURL
                    })

                    setPanCardDoc({
                        ...panCardDoc,
                        documentLink: response[2].mediaURL
                    })
                })
                .catch(err => {
                    setLoading(false)
                })
        })
    }

    const handleUpload = async (event) => {
        console.log(status)
        if (status === "Upload" && pickedAll) {
            await uploadMedia()
            setLoading(false);
        }
        else {
            toast.error("Please upload all the documents.")
        }
    }

    const handleUpdate = () => {
        setLoading(true);
        const apiData = {
            stepsCompleted: "4",
            agencyDocuments: [registrationCertificate, brochureDoc, panCardDoc]
        }
        instance.post(`/api/${Role}/agencies/create`, apiData)
            .then(function (response) {
                setLoading(false);
                props.history.push("/agency-form-four")
            })
            .catch(err => {
                setLoading(false);
            })
    }

    useEffect(() => {
        if (registrationCertificate.documentPicked && brochureDoc.documentPicked && panCardDoc.documentPicked) {
            setPickedAll(true)
        }

        if (registrationCertificate.documentLink !== "" && brochureDoc.documentLink !== "" && panCardDoc.documentLink !== "") {
            setLoading(false);
            handleUpdate();
        }


    }, [registrationCertificate, brochureDoc, panCardDoc])

    return (
        <>
            <div className="Navbar-parent">
                <Navbar />
            </div>
            <div className="back-parent marginLeft">
                <Back name="Hire Agency 3" />
            </div>
            <FormPhases value1={true} value2={true} value3={true} />
            {/* <div
                className="backArrow_agencyForm3"
                onClick={() => {
                    props.history.goBack();
                }}
            >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
            </div> */}

            {loading ? <Spinner /> :

                <div className="mainDocumentsForm">
                    <div className="innerDocumentForm">
                        <div className="documentDetails">
                            <p>1. Provide your Valid Document</p>
                            <div className="documentInformation">
                                <div className="agencyCertification">
                                    {/* <span>Company Registration Certificate</span> */}
                                    {/* <div> */}
                                        {/* <img src={agencyLogo} alt="" /> */}
                                        <FilePicker
                                            extensions={['pdf', 'jpg', 'png', 'jpeg']}
                                            onChange={fileObj => handleDocumentPicker(fileObj, registrationCertificate.documentName)}
                                            onError={error => handleUploadError(error)}>
                                            <button className="pick_btn">
                                                <p>Pick File</p>
                                                <img src={fileIcon} alt="finish" /></button>
                                        </FilePicker>
                                    {/* </div> */}
                                    <p className="logo-type_agencyForm1">{`${registrationCertificate?.document?.name ?? "Company Registration Certificate"}`}</p>
                                </div>
                                <div className="agencyBrochure">
                                    {/* <span>Brochure</span> */}
                                    {/* <div> */}
                                        {/* <img src={brochure} alt="" /> */}
                                        <FilePicker
                                            extensions={['pdf', 'jpg', 'png', 'jpeg']}
                                            onChange={fileObj => handleDocumentPicker(fileObj, brochureDoc.documentName)}
                                            onError={error => handleUploadError(error)}>
                                            <button className="pick_btn">
                                                <p>Pick File</p>
                                                <img src={fileIcon} alt="finish" />
                                            </button>
                                        </FilePicker>
                                    {/* </div> */}
                                    <p className="logo-type_agencyForm1">{`${brochureDoc?.document?.name ?? "Brochure"}`}</p>
                                </div>
                            </div>
                            <div className="panDetails">
                                <p>2. Enter your Pan Card number</p>
                                <div className="panCardContent">
                                    {/* <div> */}
                                        {/* <img src={panCard} alt="" /> */}
                                        <FilePicker
                                            extensions={['pdf', 'jpg', 'png', 'jpeg']}
                                            onChange={fileObj => handleDocumentPicker(fileObj, panCardDoc.documentName)}
                                            onError={error => handleUploadError(error)}>
                                            <button className="pick_btn">
                                                <p>Pick File</p>
                                                <img src={fileIcon} alt="finish" />
                                            </button>
                                        </FilePicker>
                                    {/* </div> */}
                                    <p className="logo-type_agencyForm1">{`${panCardDoc?.document?.name ?? "Pancard"}`}</p>
                                </div>
                            </div>

                            <div className="nextBtn">
                                {/* <NavLink to="/agency-form-two" style={{ textDecoration: "none" }}>
                                    <button>
                                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                                    </button>
                                </NavLink> */}

                                {/* <NavLink to="/agency-form-four" style={{ textDecoration: "none" }} onClick={(e) => handleNavlink(e)} > */}
                                <button onClick={() => props.history.goBack()} style={{ backgroundColor: '#707070' }}>
                                    Back
                                </button>
                                <button className="uploadButton_agencyForm3" style={{ backgroundImage: 'linear-gradient(to right, #5C6DFF, #45A4EA)' }} onClick={handleUpload} name={status}>
                                    {status}
                                    {/* <img src={FinishIcon} alt="finish icon"/> */}
                                </button>
                                {/* </NavLink> */}
                            </div>
                        </div>
                    </div>
                    <div className="miscellaneousArea">
                        {/* <img src={privacy} alt="" /> */}
                        <p>Your Information is safe with us.</p>
                    </div>
                </div>
            }
        </>
    )
}

export default AgencyForm3
