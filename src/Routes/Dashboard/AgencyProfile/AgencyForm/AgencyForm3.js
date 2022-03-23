import React, { useEffect, useState } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../../Components/Back/Back';
import FormPhases from './FormPhases';
import fileIcon from '../../../../assets/images/Newestdashboard/Agency-form/attach-file.svg';
import illustrationImage from '../../../../assets/images/Newestdashboard/Agency-form/illustration_3.svg';

import { toast } from 'react-toastify';

//axios instance
import instance from '../../../../Constants/axiosConstants';
import Spinner from '../../../../Components/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import { AGENCY } from '../../../../shared/constants';

import './ResponsiveAgencyForm.css';

function AgencyForm3(props) {
    const dispatch = useDispatch();

    const propData = props.location.state ? props.location.state : {};

    const Role = localStorage.getItem('role') || AGENCY;
    const url = props.history.location.pathname;
    const status = 'Upload';
    const [isMediaUploaded, setIsMediauploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [steps, setSteps] = useState('');

    const [registrationCertificate, setRegistrationCertificate] = useState({
        documentName: 'Company Registration Certificate',
        documentLink: '',
        documentPicked: false,
        document: ''
    });

    const [brochureDoc, setBrochureDoc] = useState({
        documentName: 'Brochure',
        documentLink: '',
        documentPicked: false,
        document: ''
    });

    const [panCardDoc, setPanCardDoc] = useState({
        documentName: 'Pancard',
        documentLink: '',
        documentPicked: false,
        document: ''
    });

    const getStepsCompleted = () => {
        instance
            .get(`api/${Role}/agencies/steps-completed`)
            .then(function (response) {
                setSteps(response.stepsCompleted);
            });
    };

    useEffect(() => {
        getStepsCompleted();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDocumentPicker = (category, acceptedFiles) => {
        if (category === registrationCertificate.documentName) {
            setRegistrationCertificate({
                ...registrationCertificate,
                documentPicked: true,
                name: acceptedFiles[0].name,
                document: acceptedFiles[0]
            });
        } else if (category === brochureDoc.documentName) {
            setBrochureDoc({
                ...brochureDoc,
                documentPicked: true,
                name: acceptedFiles[0].name,
                document: acceptedFiles[0]
            });
        } else if (category === panCardDoc.documentName) {
            setPanCardDoc({
                ...panCardDoc,
                documentPicked: true,
                name: acceptedFiles[0].name,
                document: acceptedFiles[0]
            });
        }
    };

    function uploadMedia() {
        setLoading(true);
        return new Promise((resolve, reject) => {
            let index = 0;
            let trackObj = {};

            const formData = new FormData();

            if (registrationCertificate?.document) {
                trackObj['registrationCertificate'] = index;
                index++;
                formData.append(
                    'files',
                    registrationCertificate.document,
                    registrationCertificate.name
                );
            }

            if (brochureDoc?.document) {
                trackObj['brochureDoc'] = index;
                index++;
                formData.append(
                    'files',
                    brochureDoc.document,
                    brochureDoc.name
                );
            }

            if (panCardDoc?.document) {
                trackObj['panCardDoc'] = index;
                index++;
                formData.append('files', panCardDoc.document, panCardDoc.name);
            }

            instance
                .post(`api/${Role}/media/create`, formData)
                .then(function (response) {
                    Object.keys(trackObj).forEach((key) => {
                        if (key === 'registrationCertificate') {
                            setRegistrationCertificate({
                                ...registrationCertificate,
                                documentLink:
                                    response?.[trackObj[key]]?.mediaURL
                            });
                        } else if (key === 'brochureDoc') {
                            setBrochureDoc({
                                ...brochureDoc,
                                documentLink:
                                    response?.[trackObj[key]]?.mediaURL
                            });
                        } else if (key === 'panCardDoc') {
                            setPanCardDoc({
                                ...panCardDoc,
                                documentLink:
                                    response?.[trackObj[key]]?.mediaURL
                            });
                        }
                    });
                    setIsMediauploaded(true);
                })
                .catch((err) => {
                    setLoading(false);
                });
        });
    }

    const handleUpload = async (event) => {
        if (status === 'Upload') {
            await uploadMedia();
            setLoading(false);
        } else {
            toast.error('Please upload all the documents.');
        }
    };

    const handleUpdate = () => {
        setLoading(true);
        const apiData = {
            stepsCompleted: 4,
            agencyDocuments: brochureDoc?.document
                ? [registrationCertificate, brochureDoc, panCardDoc]
                : [registrationCertificate, panCardDoc]
        };
        if (apiData.agencyDocuments.length < 8) {
            instance
                .post(`/api/${Role}/agencies/create`, apiData)
                .then(function (response) {
                    setLoading(false);
                    propData.agencyForm3 = apiData;
                    dispatch({ type: 'NEXT_PRESSED' });
                    props.history.push('/agency-form-four', propData);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    };

    const goBack = () => {
        if (url.includes('agency-form-one')) {
            props.history.replace('/agency-newest-dashboard');
        } else if (url.includes('agency-form-two')) {
            props.history.replace('/agency-form-one');
        } else if (url.includes('agency-form-three')) {
            dispatch({ type: 'BACK_PRESSED' });
            props.history.replace('/agency-form-two', propData);
        } else if (url.includes('agency-form-four')) {
            props.history.replace('/agency-form-three');
        } else {
            props.history.goBack();
        }
    };

    useEffect(() => {
        if (props.location.state?.agencyForm3) {
            setRegistrationCertificate({
                documentName: propData.agencyForm3.documentName
            });
            setBrochureDoc({
                documentName: propData.agencyForm3.documentName
            });
            setPanCardDoc({
                documentName: propData.agencyForm3.documentName
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propData]);

    useEffect(() => {
        console.log(isMediaUploaded, 'uploaded');
        if (isMediaUploaded) {
            setLoading(false);
            handleUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMediaUploaded]);

    return (
        <>
            <div className="agency-form_parent">
                <Navbar />
                <Back name="Documentation" />
                <FormPhases steps={steps} />

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="mainDocumentsForm">
                        <div className="innerDocumentForm">
                            <div className="documentDetails">
                                <p>
                                    {/* <span className="requiredStar">*</span> */}
                                    Provide your valid document:{' '}
                                </p>
                                <div className="documentInformation">
                                    <div className="agencyCertification">
                                        <div className="Company Registration Certificate">
                                            <Dropzone
                                                accept=".pdf, .jpg, .png, .jpeg"
                                                onDrop={(acceptedFiles) =>
                                                    handleDocumentPicker(
                                                        registrationCertificate.documentName,
                                                        acceptedFiles
                                                    )
                                                }
                                            >
                                                {({
                                                    getRootProps,
                                                    getInputProps
                                                }) => (
                                                    <section>
                                                        <div
                                                            {...getRootProps()}
                                                        >
                                                            <input
                                                                {...getInputProps()}
                                                            />
                                                            <button className="pick_btn">
                                                                <p>
                                                                    Pick File
                                                                    {/* <span className="requiredStar">
                                                                        *
                                                                    </span> */}
                                                                </p>
                                                                <img
                                                                    src={
                                                                        fileIcon
                                                                    }
                                                                    alt="finish"
                                                                />
                                                            </button>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </div>
                                        <p className="logo-type_agencyForm1">{`${
                                            registrationCertificate?.name
                                                ? `Incorporation : ${registrationCertificate?.name.slice(
                                                      0,
                                                      20
                                                  )}`
                                                : 'Incorporation Certificate'
                                        }`}</p>
                                    </div>
                                    <div className="agencyBrochure">
                                        <div className="Brochure">
                                            <Dropzone
                                                accept=".pdf, .jpg, .png, .jpeg"
                                                onDrop={(acceptedFiles) =>
                                                    handleDocumentPicker(
                                                        brochureDoc.documentName,
                                                        acceptedFiles
                                                    )
                                                }
                                            >
                                                {({
                                                    getRootProps,
                                                    getInputProps
                                                }) => (
                                                    <section>
                                                        <div
                                                            {...getRootProps()}
                                                        >
                                                            <input
                                                                {...getInputProps()}
                                                            />
                                                            <button className="pick_btn">
                                                                <p>Pick File</p>
                                                                <img
                                                                    src={
                                                                        fileIcon
                                                                    }
                                                                    alt="finish"
                                                                />
                                                            </button>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </div>
                                        <p className="logo-type_agencyForm1">{`${
                                            brochureDoc?.name
                                                ? `Brochure: ${brochureDoc?.name.slice(
                                                      0,
                                                      20
                                                  )}`
                                                : 'Brochure'
                                        }`}</p>
                                    </div>
                                </div>
                                <div className="panDetails">
                                    <div className="panCardContent">
                                        <div className="Pancard">
                                            <Dropzone
                                                accept=".pdf, .jpg, .png, .jpeg"
                                                onDrop={(acceptedFiles) =>
                                                    handleDocumentPicker(
                                                        panCardDoc.documentName,
                                                        acceptedFiles
                                                    )
                                                }
                                            >
                                                {({
                                                    getRootProps,
                                                    getInputProps
                                                }) => (
                                                    <section>
                                                        <div
                                                            {...getRootProps()}
                                                        >
                                                            <input
                                                                {...getInputProps()}
                                                            />
                                                            <button className="pick_btn">
                                                                <p>
                                                                    Pick File
                                                                    {/* <span className="requiredStar">
                                                                        *
                                                                    </span> */}
                                                                </p>
                                                                <img
                                                                    src={
                                                                        fileIcon
                                                                    }
                                                                    alt="finish"
                                                                />
                                                            </button>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        </div>
                                        <p className="logo-type_agencyForm1">{`${
                                            panCardDoc?.name
                                                ? `Pancard: ${panCardDoc?.name.slice(
                                                      0,
                                                      20
                                                  )}`
                                                : 'Pancard'
                                        }`}</p>
                                    </div>
                                </div>

                                <div className="nextBtn bothBtn">
                                    <button
                                        onClick={() => goBack()}
                                        style={{ backgroundColor: '#707070' }}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="uploadButton_agencyForm3"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(to right, #5C6DFF, #45A4EA)'
                                        }}
                                        onClick={handleUpload}
                                        name={status}
                                    >
                                        {status}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="miscellaneousArea">
                            <p>Your Information is safe with us.</p>
                            <div className="information_safe_image">
                                <img
                                    src={illustrationImage}
                                    alt="agency-form-3"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AgencyForm3;
