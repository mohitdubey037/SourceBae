import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import FormPhases from './FormPhases'

import agencyLogo from '../../../../assets/images/agencyForm/document.png'
import brochure from '../../../../assets/images/agencyForm/brochure.png'
import panCard from '../../../../assets/images/agencyForm/panCard.png'
import privacy from '../../../../assets/images/agencyForm/privacy.svg'
import { NavLink } from 'react-router-dom'

import { FilePicker } from 'react-file-picker'
import { toast } from 'react-toastify'

//axios instance
import instance from "../../../../Constants/axiosConstants"

function AgencyForm3() {

    const Role = "agency"
    const [status, setStatus] = useState("Upload")
    const [pickedAll, setPickedAll] = useState(false)

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

        console.log(document);
        console.log(category);
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

    console.log(registrationCertificate);


    const handleUploadError = (error) => {
        toast.error(error)
    }

    function uploadMedia(category, document) {

        const formData = new FormData();

        document && formData.append(
            "files",
            document,
            category
        );
        console.log(formData)
        instance.post(`api/${Role}/media/create`, formData)
            .then(function (response) {
                console.log(response);
                if (category === registrationCertificate.documentName)
                    setRegistrationCertificate({
                        ...registrationCertificate,
                        documentLink: response[0].mediaURL
                    })

                else if (category === brochureDoc.documentName)
                    setBrochureDoc({
                        ...brochureDoc,
                        documentLink: response[0].mediaURL
                    })

                else if (category === panCardDoc.documentName)
                    setPanCardDoc({
                        ...panCardDoc,
                        documentLink: response[0].mediaURL
                    })
            })

    }

    const handleUpload = (event) => {

        const { name } = event.target
        if (name === "Upload" && pickedAll) {
            uploadMedia(registrationCertificate.documentName, registrationCertificate.document)
            uploadMedia(brochureDoc.documentName, brochureDoc.document)
            uploadMedia(panCardDoc.documentName, panCardDoc.document)
        }
    }

    const handleUpdate = () => {
        console.log("handle update")
        const apiData = {
            stepsCompleted: "4",
            agencyDocuments: [registrationCertificate, brochureDoc, panCardDoc]
        }
        instance.post(`/api/${Role}/agencies/create`, apiData)
            .then(function (response) {
                console.log(response)
                setStatus("Next")
            })
    }

    const handleNavlink = (event) => {
        event.preventDefault()
        if (status === "Next"){
            window.location.href = "/agency-form-four"
        }
        else if (status === "Update")
            handleUpdate()

    }

    useEffect(() => {
        if (registrationCertificate.documentPicked && brochureDoc.documentPicked && panCardDoc.documentPicked) {
            setPickedAll(true)
        }
        if (registrationCertificate.documentLink !== "" && brochureDoc.documentLink !== "" && panCardDoc.documentLink !== "")
            setStatus("Update")
    }, [registrationCertificate, brochureDoc, panCardDoc])

    useEffect(() => {
        console.log(status, "upload")

    }, [status])
    return (
        <>
            <Navbar />

            <FormPhases value1={true} value2={true} value3={true} />

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
                                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back
                                </button>
                            </NavLink>

                            <NavLink to="/agency-form-four" style={{ textDecoration: "none" }} onClick={(e) => handleNavlink(e)} >
                                <button onClick={handleUpload} name={status}>
                                    {status}
                                    <i class="fa fa-long-arrow-right" aria-hidden="true" />
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="miscellaneousArea">
                        <p>Your Information is safe with us.</p>
                        <img src={privacy} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencyForm3
