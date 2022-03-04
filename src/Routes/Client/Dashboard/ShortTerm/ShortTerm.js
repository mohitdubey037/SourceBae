import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import './ShortTerm.css';

import fixed from '../../../../assets/images/Newestdashboard/Short_Term/payment.svg';

import VerifyModal from '../../../../Components/VerifyModal/VerifyModal';
import { upload } from '../../../../shared/helper';

//material-ui
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import instance from '../../../../Constants/axiosConstants';
import { useDropzone } from 'react-dropzone';
import Back from '../../../../Components/Back/Back';
import FileUploadImage from '../../../../assets/images/Newestdashboard/Short_Term/short_term.svg';
import DownImage from '../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import Spinner from '../../../../Components/Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        maxWidth: '100%'
    },
    noLabel: {
        marginTop: theme.spacing(3)
    },
    radioParent: {
        '& .MuiFormGroup-root': {
            flexDirection: 'row'
        }
    }
}));

const BlueRadio = withStyles({
    root: {
        '&$checked': {
            color: '#26AFFF'
        },
        padding: '0'
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

function ShortTerm(props) {
    useEffect(() => {
        window.onbeforeunload = function () {
            return 'you can not refresh the page';
        };
    }, []);
    const Role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');

    const [words, setWords] = useState(0);
    const [allServices, setAllServices] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState(null);

    const [apiData, setApiData] = useState({
        clientId: id,
        projectName: '',
        projectDescription: '',
        projectFiles: [],
        projectExpectedStartingDays: '5',
        projectRequirements: '',
        projectProposalCost: '',
        projectServicesRequired: [],
        projectPaymentModel: 'Fixed Price',
        agencyExperience: 'capable',
        projectHourBasisCost: ''
    });
    // const [projectFiles, setProjectFiles] = useState(null);
    const classes = useStyles();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'projectDescription') {
            if (value.length <= 100) setWords(value.length);
            if (value.length > 100) setWords(100);
        }
        setApiData({
            ...apiData,
            [name]: value
        });
    };
    const handleChangeRadio = (name, value) => {
        setApiData({
            ...apiData,
            [name]: value
        });
    };

    const onDrop = useCallback((acceptedFiles) => {
        setLogo(acceptedFiles);
    }, []);

    const { isDragActive, getRootProps, getInputProps, isDragReject } =
        useDropzone({
            onDrop,
            accept: '.jpg, .pdf, .png, .jpeg, .xlsx',
            minSize: 0
        });

    const handleServices = (event) => {
        const { className } = event.target;
        const toggledServices = allServices.map((service) => {
            if (service.serviceName === className) {
                if (!service.selected) {
                    setApiData({
                        ...apiData,
                        projectServicesRequired: [service._id]
                    });
                } else if (service.selected) {
                    setApiData({
                        ...apiData,
                        projectServicesRequired: []
                    });
                }
                return {
                    ...service,
                    selected: !service.selected
                };
            } else {
                return {
                    ...service,
                    selected: false
                };
            }
        });
        setAllServices(toggledServices);
    };

    useEffect(() => {
        console.log(apiData, 'api data');
    }, [apiData.projectServicesRequired]);
    const errorValidation = () => {
        const err = {};
        if (apiData.projectServicesRequired.length === 0) {
            err.projectServicesRequired = 'Please select a service.';
        } else if (apiData.projectName === '') {
            err.projectName = 'Project name can"t be empty.';
        } else if (apiData.projectDescription.length === '') {
            err.projectDescription = 'Project description can"t be empty.';
        } else if (apiData.projectDescription.length < 100) {
            err.projectDescription =
                'Project description should be more than 100 characters';
        }
        // else if (!acceptedFileItems) {
        //   errors.projectUpload = 'Document is required'
        // }
        else if (logo === null) {
            err.projectUpload = 'Document is required';
        } else if (apiData.projectRequirements === '') {
            err.projectRequirements = "Project qequirement ain't be empty.";
        } else if (apiData.projectPaymentModel === '') {
            err.projectPaymentModel = 'Please select a project Payment Model.';
        } else if (
            apiData.projectHourBasisCost === '' &&
            apiData.projectPaymentModel === 'By Hour'
        ) {
            err.projectHourBasisCost =
                'Please select a Hourly project proposal cost.';
        } else if (apiData.projectProposalCost === '') {
            err.projectProposalCost = 'Please select a project proposal cost.';
        } else if (apiData.projectExpectedStartingDays === '') {
            err.projectExpectedStartingDays =
                'Please select Project Expected Starting Days.';
        } else if (apiData.projectExpectedStartingDays < 5) {
            err.projectExpectedStartingDays =
                'Please choose more than 5 days .';
        } else if (apiData.agencyExperience === '') {
            err.agencyExperience = 'Please select a Agency Experience.';
        }
        setErrors(err);
        if (Object.keys(err).length === 0) return true;
        else return false;
    };

    async function uploadMedia() {
        try {
            const detail = await upload(logo, Role);
            detail &&
                setApiData({
                    ...apiData,
                    projectFiles: [detail]
                });
        } catch (err) {
            console.log(err);
        }
    }

    const shortTermProjectApi = () => {
        setLoading(true);
        instance
            .post(`api/${Role}/projects/create-short-term`, apiData)
            .then(function (response) {
                setLoading(false);
                props.history.replace(`/agency-list/${response.project._id}`);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const handleButton = () => {
        if (errorValidation()) {
            uploadMedia();
        }
    };

    //Api Calls methods
    const getAllDomains = () => {
        instance.get(`api/${Role}/services/all`).then(function (response) {
            const serviceNames = response.map((service) => {
                return {
                    ...service,
                    selected: false
                };
            });
            setAllServices(serviceNames);
        });
    };

    useEffect(() => {
        getAllDomains();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {}, [allServices]);

    useEffect(() => {
        if (apiData.projectFiles.length !== 0) {
            shortTermProjectApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);
    return (
        <>
            <Navbar />
            {loading ? (
                <Spinner />
            ) : (
                <div className="mainShortTerm">
                    {/* <img className="Image1_shortTerm" src={UpImage} alt="upImage" /> */}
                    <img
                        className="Image2_shortTerm"
                        src={DownImage}
                        alt="downImage"
                    />
                    <Back name="Short Term" />
                    <div className="innerShortTerm">
                        <div className="shortTermForm">
                            <div className="shortTermHeading">
                                <h2>Short Term Projects</h2>
                                <p>
                                    Need to outsource a short term project
                                    modification or a specific task? We’ve got
                                    you covered.
                                </p>
                            </div>
                        </div>

                        <div className="tellUsWhatYouNeed">
                            <h6>Tell Us What You Need..!!</h6>
                        </div>

                        <div className="shortTermProjectType">
                            <p className="select_technology_shortTerm">
                                Please select a service{' '}
                                <span style={{ color: 'red' }}>*</span>
                            </p>
                            <div className="shortTermProjectType_child">
                                {allServices.map((service) => {
                                    return (
                                        <>
                                            <div
                                                className={`tech-container_shortTerm ${
                                                    service.selected &&
                                                    'conditional_transparency'
                                                }`}
                                            >
                                                <div
                                                    className={`${service.serviceName}`}
                                                    onClick={(event) =>
                                                        handleServices(event)
                                                    }
                                                >
                                                    <img
                                                        className={`${service.serviceName}`}
                                                        src={
                                                            service.serviceIcon
                                                        }
                                                        alt="icon"
                                                    />
                                                </div>
                                                <h2
                                                    className={`${service.serviceName}`}
                                                >
                                                    {service.serviceName}
                                                </h2>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                            {errors.projectServicesRequired && (
                                <p className="error_productForm_shortTerm">
                                    {errors.projectServicesRequired}
                                </p>
                            )}
                        </div>

                        <div className="left_and_right_side">
                            <div className="left_side_shortTerm">
                                <div className="shortTermProjectName">
                                    <ul>
                                        <li>
                                            Project Name
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </li>
                                    </ul>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Give a name to identity requirement"
                                            name="projectName"
                                            value={apiData.projectName}
                                            maxLength="22"
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                    </div>
                                    {errors.projectName && (
                                        <p className="error_productForm_shortTerm">
                                            {errors.projectName}
                                        </p>
                                    )}
                                </div>

                                <div className="shortTermProjectDesc">
                                    <ul>
                                        <li>
                                            Tell us more about your project{' '}
                                            <span
                                                className="requiredStar"
                                                style={{ color: 'red' }}
                                            >
                                                *
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="startABit_shortTermProjectDesc">
                                        Start with a bit about yourself or your
                                        business, include An overview of the
                                        project and what do you require.
                                    </div>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <textarea
                                            cols="30"
                                            rows="6"
                                            type="text"
                                            name="projectDescription"
                                            value={apiData.projectDescription}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                    </div>
                                    <div className="wordsLimit">
                                        <p>Minimum 100 characters.</p>
                                        <p>{words}/100</p>
                                    </div>
                                    {errors.projectDescription && (
                                        <p className="error_productForm_shortTerm">
                                            {errors.projectDescription}
                                        </p>
                                    )}
                                </div>

                                <div className="shortTermFileUpload">
                                    <div className="uploadBlock">
                                        <div
                                            className="fileUploadButton"
                                            style={{
                                                display: 'flex'
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',

                                                    cursor: 'pointer',
                                                    width: '20%'
                                                }}
                                            >
                                                <section className="container_addingDeveloper">
                                                    <div
                                                        className="file_click_addingDeveloper"
                                                        {...getRootProps()}
                                                    >
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        {!isDragActive && (
                                                            <img
                                                                className="fileUpload_shortTerm"
                                                                src={
                                                                    FileUploadImage
                                                                }
                                                                alt="upload"
                                                            />
                                                        )}
                                                        {isDragActive &&
                                                            !isDragReject &&
                                                            "Drop it like it's hot!"}
                                                        {isDragReject &&
                                                            'File type not accepted, sorry!'}
                                                    </div>
                                                </section>
                                            </div>
                                            <span
                                                className="requiredStar"
                                                style={{ color: 'red' }}
                                            >
                                                *
                                            </span>
                                        </div>
                                        <div className="uploadInfo">
                                            {logo === null ? (
                                                <p className="upload_question">
                                                    Upload an image or a
                                                    document that might be
                                                    helpful in explaining your
                                                    project in brief.
                                                </p>
                                            ) : (
                                                <p className="upload_answer">
                                                    {logo[0].name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {errors.projectUpload && (
                                        <p className="error_productForm_shortTerm">
                                            {errors.projectUpload}
                                        </p>
                                    )}
                                </div>

                                <div className="shortTermOptionSelect">
                                    <ul>
                                        <li>
                                            What work do you need to get done?{' '}
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </li>
                                    </ul>

                                    <div>
                                        <div>
                                            List of all requirements comma(,)
                                            separated
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Ex: Blog Section, Dashboard, Admin Panel,etc"
                                            name="projectRequirements"
                                            value={apiData.projectRequirements}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                    </div>
                                </div>
                                {errors.projectRequirements && (
                                    <p className="error_productForm_shortTerm">
                                        {errors.projectRequirements}
                                    </p>
                                )}
                            </div>

                            <div className="right_side_shortTerm">
                                <div className="howToPay">
                                    <ul>
                                        <li>
                                            Here's our payment policy?
                                            <span className="requiredStar">
                                                *
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="innerHowToPay">
                                        <FormControl
                                            className={classes.radioParent}
                                            component="fieldset"
                                        >
                                            <RadioGroup
                                                className={classes.root}
                                                aria-label="howToPay"
                                                name="projectPaymentModel"
                                                value={
                                                    apiData.projectPaymentModel
                                                }
                                                // onChange={(event) => handleChange(event)}
                                            >
                                                <div
                                                    className="fixedPrice"
                                                    name="projectPaymentModel"
                                                    onClick={() =>
                                                        handleChangeRadio(
                                                            'projectPaymentModel',
                                                            'Fixed Price'
                                                        )
                                                    }
                                                >
                                                    <FormControlLabel
                                                        color="primary"
                                                        value="Fixed Price"
                                                        control={
                                                            <BlueRadio
                                                                className={
                                                                    classes.root
                                                                }
                                                            />
                                                        }
                                                    />
                                                    <div className="fixedImage">
                                                        <img
                                                            src={fixed}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="fixedContent">
                                                        <h6>Pay fixed price</h6>
                                                        <p>
                                                            Agree on a price and
                                                            release payment when
                                                            the job is done.
                                                            Best for one-off
                                                            tasks.
                                                        </p>
                                                    </div>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {errors.projectPaymentModel && (
                                        <p className="error_productForm_shortTerm">
                                            {errors.projectPaymentModel}
                                        </p>
                                    )}
                                </div>

                                {apiData.projectPaymentModel === 'By Hour' ? (
                                    <div className="hourlyPaymentBudget">
                                        <div>
                                            <ul>
                                                <li>
                                                    What is your Hourly Budget?{' '}
                                                    <span className="requiredStar">
                                                        *
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div style={{ marginLeft: '1rem' }}>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="projectHourBasisCost"
                                                    name="projectHourBasisCost"
                                                    value={
                                                        apiData.projectHourBasisCost
                                                    }
                                                    onChange={(event) =>
                                                        handleChange(event)
                                                    }
                                                >
                                                    <FormControlLabel
                                                        color="primary"
                                                        value="1"
                                                        control={
                                                            <BlueRadio
                                                                className={
                                                                    classes.root
                                                                }
                                                            />
                                                        }
                                                        label="$0 - $15"
                                                    />
                                                    <FormControlLabel
                                                        value="15"
                                                        control={<BlueRadio />}
                                                        label="$15 - $30"
                                                    />
                                                    <FormControlLabel
                                                        value="30"
                                                        control={<BlueRadio />}
                                                        label="Max $30"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        {errors.projectHourBasisCost && (
                                            <p className="error_productForm_shortTerm">
                                                {errors.projectHourBasisCost}
                                            </p>
                                        )}
                                    </div>
                                ) : null}

                                <div className="estimatedBudget">
                                    <div className="estimatedBudgetText">
                                        <ul>
                                            <li>
                                                What is your estimated Budget?{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="projectProposalCost"
                                                name="projectProposalCost"
                                                value={
                                                    apiData.projectProposalCost
                                                }
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            >
                                                <FormControlLabel
                                                    color="primary"
                                                    value="50000"
                                                    control={
                                                        <BlueRadio
                                                            className={
                                                                classes.root
                                                            }
                                                        />
                                                    }
                                                    label="5000₹ - 100,000₹"
                                                />
                                                <FormControlLabel
                                                    value="10000"
                                                    control={<BlueRadio />}
                                                    label="100,000₹ - 1,50,000₹"
                                                />
                                                <FormControlLabel
                                                    value="200000"
                                                    control={<BlueRadio />}
                                                    label="Max 2,00,000₹"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {errors.projectProposalCost && (
                                        <p className="error_productForm_shortTerm">
                                            {errors.projectProposalCost}
                                        </p>
                                    )}
                                </div>
                                <div className="numberOfDays">
                                    <ul style={{ marginLeft: '0' }}>
                                        <li>
                                            How soon do you want to start?(in
                                            days){' '}
                                            <span className="requiredStar">
                                                *
                                            </span>{' '}
                                        </li>
                                    </ul>
                                    {/* <div className="daysInputAgency"> */}
                                    <input
                                        style={{
                                            height: '35px',
                                            width: '25rem',
                                            border: '1px solid #707070',
                                            padding: '1rem',
                                            borderRadius: '8px'
                                        }}
                                        name="projectExpectedStartingDays"
                                        type="number"
                                        onChange={(event) =>
                                            handleChange(event)
                                        }
                                        min="5"
                                        value={
                                            apiData.projectExpectedStartingDays
                                        }
                                        placeholder="Text should be number "
                                    />
                                    {errors.projectExpectedStartingDays && (
                                        <p className="error_productForm_shortTerm">
                                            {errors.projectExpectedStartingDays}
                                        </p>
                                    )}
                                </div>
                                <div className="agencyExperience">
                                    <ul>
                                        <li>
                                            <p style={{ width: '24rem' }}>
                                                Desired level of proficiency?
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="agencyExperience"
                                            name="agencyExperience"
                                            value={apiData.agencyExperience}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        >
                                            <div className="radio-label_shortTermForm">
                                                <FormControlLabel
                                                    color="primary"
                                                    value="capable"
                                                    control={
                                                        <BlueRadio
                                                            className={
                                                                classes.root
                                                            }
                                                        />
                                                    }
                                                    label="Capable"
                                                />
                                            </div>
                                            <div className="radio-label_shortTermForm">
                                                <FormControlLabel
                                                    value="skilled"
                                                    control={<BlueRadio />}
                                                    label="Skilled"
                                                />
                                            </div>
                                            <div className="radio-label_shortTermForm">
                                                <FormControlLabel
                                                    value="proficient"
                                                    control={<BlueRadio />}
                                                    label="Proficient"
                                                />
                                            </div>
                                            <div className="radio-label_shortTermForm">
                                                <FormControlLabel
                                                    value="accomplished"
                                                    control={<BlueRadio />}
                                                    label="Accomplished"
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    {errors.agencyExperience && (
                                        <p className="error_productForm_shortTerm">
                                            {errors.agencyExperience}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="post-project">
                            <p onClick={() => handleButton()}>Post Project</p>
                        </div>
                    </div>
                </div>
            )}

            <VerifyModal Role={Role} id={id} isUserVerified={null} />
        </>
    );
}

export default ShortTerm;
