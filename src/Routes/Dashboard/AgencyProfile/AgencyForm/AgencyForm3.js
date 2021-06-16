import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'

import agencyLogo from '../../../../assets/images/agencyForm/document.png'
import brochure from '../../../../assets/images/agencyForm/brochure.png'
import panCard from '../../../../assets/images/agencyForm/panCard.png'
import privacy from '../../../../assets/images/agencyForm/privacy.svg'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

import { FilePicker } from 'react-file-picker'
import { toast } from 'react-toastify'

//axios instance
import instance from "../../../../Constants/axiosConstants"
import Spinner from '../../../../Components/Spinner/Spinner'

function AgencyForm3() {

    const colors = {
        Upload: "blue",
        Update: "orange",
        Next: "green",
    }

    const Role = "agency"
    const [status, setStatus] = useState("Upload")
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
                document
            })
        }

        else if (category === brochureDoc.documentName) {
            setBrochureDoc({
                ...brochureDoc,
                documentPicked: true,
                document
            })
        }
        else if (category === panCardDoc.documentName) {
            setPanCardDoc({
                ...panCardDoc,
                documentPicked: true,
                document
            })
        }

    }


    const handleUploadError = (error) => {
        toast.error(error)
    }

    function uploadMedia(category, document) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();

        document && formData.append(
            "files",
            document,
            category
        );
        console.log(formData)
        axios.post(`https://api.onesourcing.in/api/${Role}/media/create`, formData)
            .then(function (response) {
                console.log(response.data.data[0].mediaURL);
                if (category === registrationCertificate.documentName)
                    setRegistrationCertificate({
                        ...registrationCertificate,
                        documentLink: response.data.data[0].mediaURL
                    })

                else if (category === brochureDoc.documentName)
                    setBrochureDoc({
                        ...brochureDoc,
                        documentLink: response.data.data[0].mediaURL
                    })

                else if (category === panCardDoc.documentName)
                    setPanCardDoc({
                        ...panCardDoc,
                        documentLink: response.data.data[0].mediaURL
                    })
                    resolve()
            })
        })
    }

    const handleUpload = async (event) => {
        setLoading(true);
        const { name } = event.target
        if (status === "Upload" && pickedAll) {
            // console.log(registrationCertificate.documentName, registrationCertificate.document);
            await uploadMedia(registrationCertificate.documentName, registrationCertificate.document)
            await uploadMedia(brochureDoc.documentName, brochureDoc.document)
            await uploadMedia(panCardDoc.documentName, panCardDoc.document)
            toast.success('media saved successfully');
            setLoading(false);
        }
        if (status === 'Next'){
            window.location.href = "/agency-form-four"
        }
    }

    const handleUpdate = () => {
        setLoading(true);
        console.log(registrationCertificate);
        console.log(brochureDoc);
        console.log(panCardDoc);
        const apiData = {
            stepsCompleted: "4",
            agencyDocuments: [registrationCertificate, brochureDoc, panCardDoc]
        }
        instance.post(`/api/${Role}/agencies/create`, apiData)
            .then(function (response) {
                console.log(response)
                setStatus("Next");
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }

    // const handleNavlink = (event) => {
    //     event.preventDefault()
    //     if (status === "Next") {
    //         window.location.href = "/agency-form-four"
    //     }
    //     // else if (status === "Update")
    //     //     handleUpdate()
    // }

    useEffect(() => {
        if (registrationCertificate.documentPicked && brochureDoc.documentPicked && panCardDoc.documentPicked) {
            setPickedAll(true)
        }

        if (registrationCertificate.documentLink !== "" && brochureDoc.documentLink !== "" && panCardDoc.documentLink !== ""){
            handleUpdate();
        }

        console.log(registrationCertificate, brochureDoc, panCardDoc);


    }, [registrationCertificate, brochureDoc, panCardDoc])

    return (
        <>
            <Navbar />

            <FormPhases value1={true} value2={true} value3={true} />

            {loading ? <Spinner /> :

                <div className="mainDocumentsForm">
                    <div className="innerDocumentForm">
                        <div className="documentDetails">
                            <p>1. Provide your Valid Document</p>
                            <div className="documentInformation">
                                <div className="agencyCertification">
                                    <span>Company Registration Certificate</span>
                                    <img src={agencyLogo} alt="" />
                                    <p>{`${registrationCertificate?.document?.name ?? ""}`}</p>
                                    <FilePicker
                                        extensions={['pdf', 'jpg', 'png']}
                                        onChange={fileObj => handleDocumentPicker(fileObj, registrationCertificate.documentName)}
                                        onError={error => handleUploadError(error)}>
                                        <button className="pick_btn"><i class="fa fa-upload" aria-hidden="true"></i>Pick File</button>
                                    </FilePicker>
                                </div>
                                <div className="agencyBrochure">
                                    <span>Brochure</span>
                                    <img src={brochure} alt="" />
                                    <p>{`${brochureDoc?.document?.name ?? ""}`}</p>
                                    <FilePicker
                                        extensions={['pdf', 'jpg', 'png']}
                                        onChange={fileObj => handleDocumentPicker(fileObj, brochureDoc.documentName)}
                                        onError={error => handleUploadError(error)}>
                                        <button className="pick_btn"><i class="fa fa-upload" aria-hidden="true"></i>Pick File</button>
                                    </FilePicker>
                                </div>
                            </div>
                            <div className="panDetails">
                                <p>2. Enter your Pan Card number</p>
                                <div className="panCardContent">
                                    <img src={panCard} alt="" />
                                    <p>{`${panCardDoc?.document?.name ?? ""}`}</p>
                                    <FilePicker
                                        extensions={['pdf', 'jpg', 'png']}
                                        onChange={fileObj => handleDocumentPicker(fileObj, panCardDoc.documentName)}
                                        onError={error => handleUploadError(error)}>
                                        <button className="pick_btn"><i class="fa fa-upload" aria-hidden="true"></i>Pick File</button>
                                    </FilePicker>
                                </div>
                            </div>

                            <div className="nextBtn">
                                <NavLink to="/agency-form-two" style={{ textDecoration: "none" }}>
                                    <button>
                                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i>Back
                                </button>
                                </NavLink>

                                {/* <NavLink to="/agency-form-four" style={{ textDecoration: "none" }} onClick={(e) => handleNavlink(e)} > */}
                                    <button style={{ backgroundColor: colors[status] }} onClick={handleUpload} name={status}>
                                        {status}
                                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                    </button>
                                {/* </NavLink> */}
                            </div>
                        </div>
                        <div className="miscellaneousArea">
                            <p>Your Information is safe with us.</p>
                            <img src={privacy} alt="" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AgencyForm3
