import React, { useEffect, useState } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../../Components/Back/Back';
import FormPhases from './FormPhases'
import fileIcon from '../../../../assets/images/Newestdashboard/Agency-form/attach-file.svg';
import illustrationImage from '../../../../assets/images/Newestdashboard/Agency-form/illustration_3.svg'

import { FilePicker } from 'react-file-picker'
import { toast } from 'react-toastify'

//axios instance
import instance from "../../../../Constants/axiosConstants";
import Spinner from '../../../../Components/Spinner/Spinner';

import './ResponsiveAgencyForm.css';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

function AgencyForm3(props) {
    const dispatch = useDispatch();

    const propData = props.location.state ? props.location.state : {}

    const Role = localStorage.getItem('role');
    const url = props.history.location.pathname;
    const status = "Upload"
    const [pickedAll, setPickedAll] = useState(false)
    const [loading, setLoading] = useState(false);
    const [steps, setSteps] = useState('');

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

    const getStepsCompleted = () => {
        instance.get(`api/${Role}/agencies/steps-completed`)
            .then(function (response) {
                setSteps(response.stepsCompleted);
            });
    };

    useEffect(() => {
        getStepsCompleted();
    }, []);

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
            instance.post(`api/${Role}/media/create`, formData)
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
            stepsCompleted: 4,
            agencyDocuments: [registrationCertificate, brochureDoc, panCardDoc]
        }
        if (apiData.agencyDocuments.length < 8) {
            instance.post(`/api/${Role}/agencies/create`, apiData)
                .then(function (response) {
                    setLoading(false);
                    propData.agencyForm3 = apiData;
                    dispatch({ type: 'NEXT_PRESSED' });
                    props.history.push("/agency-form-four", propData)
                })
                .catch(err => {
                    setLoading(false);
                })
        }
    }

    const goBack = () => {
        if (url.includes('agency-form-one')) {
            props.history.replace('/agencyNewestDashboard');
        }
        else if (url.includes('agency-form-two')) {
            props.history.replace('/agency-form-one');
        }
        else if (url.includes('agency-form-three')) {
            dispatch({ type: 'BACK_PRESSED' });
            props.history.replace('/agency-form-two', propData);
        }
        else if (url.includes('agency-form-four')) {
            props.history.replace('/agency-form-three');
        }
        else {
            props.history.goBack();
        }
    }

    useEffect(() => {
        if (props.location.state?.agencyForm3) {
            setRegistrationCertificate({
                documentName: propData.agencyForm3.documentName
            })
            setBrochureDoc({
                documentName: propData.agencyForm3.documentName
            })
            setPanCardDoc({
                documentName: propData.agencyForm3.documentName
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propData])

    useEffect(() => {
        if (registrationCertificate.documentPicked && brochureDoc.documentPicked && panCardDoc.documentPicked) {
            setPickedAll(true)
        }

        if (registrationCertificate.documentLink !== "" && brochureDoc.documentLink !== "" && panCardDoc.documentLink !== "") {
            setLoading(false);
            handleUpdate();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationCertificate, brochureDoc, panCardDoc])

    return (
        <>
            <div className="agency-form_parent">
                <Navbar />
                <Back name="Agency Form 3" />
                <FormPhases steps={steps} />

                {loading ? <Spinner /> :
                    <div className="mainDocumentsForm">
                        <div className="innerDocumentForm">
                            <div className="documentDetails">
                                <p>
                                    <span className="requiredStar">
                                        *
                                    </span>
                                    Provide your Valid Document:{" "}<span style={{ color: 'red' }}>max 3 file</span></p>
                                <div className="documentInformation">
                                    <div className="agencyCertification">
                                        <FilePicker
                                            extensions={['pdf', 'jpg', 'png', 'jpeg']}
                                            onChange={fileObj => handleDocumentPicker(fileObj, registrationCertificate.documentName)}
                                            onError={error => handleUploadError(error)}>
                                            <button className="pick_btn">
                                                <p>Pick File
                                                    <span className="requiredStar">
                                                        *
                                                    </span>
                                                </p>
                                                <img src={fileIcon} alt="finish" /></button>
                                        </FilePicker>
                                        {/* </div> */}
                                        <p className="logo-type_agencyForm1">{`${(registrationCertificate?.document?.name) ? registrationCertificate?.document?.name.slice(0, 20) : "Company Registration Certificate"}`}</p>
                                    </div>
                                    <div className="agencyBrochure">
                                        {/* <p>2. Upload Agency Brochure</p> */}
                                        <FilePicker
                                            extensions={['pdf', 'jpg', 'png', 'jpeg']}
                                            onChange={fileObj => handleDocumentPicker(fileObj, brochureDoc.documentName)}
                                            onError={error => handleUploadError(error)}>
                                            <button className="pick_btn">
                                                <p>Pick File
                                                    <span className="requiredStar">
                                                        *
                                                    </span>
                                                </p>
                                                <img src={fileIcon} alt="finish" />
                                            </button>
                                        </FilePicker>
                                        {/* </div> */}
                                        <p className="logo-type_agencyForm1">{`${(brochureDoc?.document?.name) ? brochureDoc?.document?.name.slice(0, 20) : "Brochure"}`}</p>
                                    </div>
                                </div>
                                <div className="panDetails">
                                    {/* <p>3. Upload your PanCard</p> */}
                                    <div className="panCardContent">
                                        <FilePicker
                                            extensions={['pdf', 'jpg', 'png', 'jpeg']}
                                            onChange={fileObj => handleDocumentPicker(fileObj, panCardDoc.documentName)}
                                            onError={error => handleUploadError(error)}>
                                            <button className="pick_btn">
                                                <p>Pick File
                                                    <span className="requiredStar">
                                                        *
                                                    </span>
                                                </p>
                                                <img src={fileIcon} alt="finish" />
                                            </button>
                                        </FilePicker>
                                        <p className="logo-type_agencyForm1">{`${(panCardDoc?.document?.name) ? panCardDoc?.document?.name.slice(0, 20) : "Pancard"}`}</p>
                                    </div>
                                </div>

                                <div className="nextBtn bothBtn">
                                    <button onClick={() => goBack()} style={{ backgroundColor: '#707070' }}>
                                        Back
                                    </button>
                                    <button className="uploadButton_agencyForm3" style={{ backgroundImage: 'linear-gradient(to right, #5C6DFF, #45A4EA)' }} onClick={handleUpload} name={status}>
                                        {status}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="miscellaneousArea">
                            <p>Your Information is safe with us.</p>
                            <div className="information_safe_image">
                                <img src={illustrationImage} alt="agency-form-3" />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default AgencyForm3
