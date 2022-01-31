import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../Components/Back/Back';

import './AddingDeveloper.css';
import dev from '../../../assets/images/AddDeveloper/dev.svg';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import instance from '../../../Constants/axiosConstants';
import { useDropzone } from 'react-dropzone';

import Spinner from '../../../Components/Spinner/Spinner';
import MultiSelect from 'react-multi-select-component';
import { FaFileUpload } from 'react-icons/fa';

import { upload } from '../../../shared/helper';

function AddingDeveloper(props) {
    const logoLink =
        'https://api.onesourcing.in/media/images/1637044803259.svg';

    const Role = localStorage.getItem('role');

    const [developerData, setDeveloperData] = React.useState({
        firstName: '',
        lastName: '',
        agencyId: localStorage.getItem('userId') ?? '',
        developerDesignation: '',
        developerTechnologies: [],
        developerDocuments: [
            {
                documentName: '',
                documentLink: ''
            }
        ],
        developerExperience: '',
        developerPriceRange: '',
        developerAvailability: null
    });

    const [techs, setTechs] = useState([]);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [multipleSelectId, setMultipleSelectId] = useState([]);

    useEffect(() => {
        setDeveloperData({
            ...developerData,
            developerTechnologies: multipleSelectId.map((t) => t.value)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multipleSelectId]);

    useEffect(() => {}, [developerData]);

    const onDrop = useCallback((acceptedFiles) => {
        setResume(acceptedFiles);
    }, []);

    const { isDragActive, getRootProps, getInputProps, isDragReject } =
        useDropzone({
            onDrop,
            accept: '.pdf,.doc,.docx',
            minSize: 0
        });

    const handleChange = (event, type) => {
        const { name, value } = event.currentTarget;
        if (type === 'negoPrice') {
            if (value > 3) {
                setDeveloperData({
                    ...developerData,
                    [name]: value
                });
            }
        } else {
            setDeveloperData({
                ...developerData,
                [name]: value
            });
        }
    };

    useEffect(() => {}, [developerData]);

    const getAllTechs = () => {
        instance.get(`api/${Role}/technologies/all`).then(function (response) {
            setTechs(response);
            setLoading(false);
        });
    };

    const errorValidation = () => {
        const errors = {};
        if (developerData.firstName === '') {
            errors.firstName = 'First Name is required';
        } else if (developerData.lastName === '') {
            errors.lastName = 'Last Name is required';
        } else if (developerData.developerDesignation === '') {
            errors.developerDesignation = 'Developer Designation is required';
        } else if (developerData.developerDesignation.length < 4) {
            errors.developerDesignation =
                'Developer Designation must be at least 4 character';
        } else if (developerData.developerTechnologies.length === 0) {
            errors.developerTechnologies = 'Technologies is required';
        } else if (resume === null) {
            errors.developerResume = 'Resume is required';
        } else if (developerData.developerExperience === '') {
            errors.developerExperience = 'Developer Experience is required';
        } else if (developerData.developerPriceRange === '') {
            errors.developerPrice = 'Developer Price is required';
        } else if (developerData.developerAvailability === '') {
            errors.developerAvailability = 'Developer Availability is required';
        } else if (developerData.developerAvailability === null) {
            errors.developerAvailability = 'Developer Availability is required';
        } else if (developerData.developerAvailability === 'Negotiable') {
            errors.developerAvailability = 'Please enter a day';
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) return true;
        else return false;
    };

    async function uploadMedia() {
        try {
            const detail = await upload(resume, Role);
            detail &&
                setDeveloperData({
                    ...developerData,
                    developerDocuments: [
                        {
                            documentName: 'Resume',
                            documentLink: detail
                        }
                    ]
                });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (developerData.developerDocuments[0].documentLink !== '') {
            createDeveloperApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [developerData]);

    const createDeveloperApi = () => {
        setLoading(true);
        instance
            .post(`api/${Role}/developers/create`, developerData)
            .then(function (response) {
                setLoading(false);
                props.history.replace({
                    pathname: '/agency-profile',
                    origin: 'addingDeveloper'
                });
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const handleButton = () => {
        if (errorValidation()) {
            uploadMedia();
        }
    };

    useEffect(() => {
        getAllTechs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const customItemRenderer = ({ checked, option, onClick, disabled }) => {
        return (
            <div
                className={`item-renderer ${
                    disabled && 'disabled'
                } custom-item-renderer`}
            >
                <input
                    type="checkbox"
                    onChange={onClick}
                    checked={checked}
                    tabIndex={-1}
                    disabled={disabled}
                />
                <p>{option.label}</p>
            </div>
        );
    };
    return (
        <>
            <Navbar logoLink={logoLink} />

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="mainAddingDeveloper_parent">
                        <Back name="Add Developer" />
                        <div className="mainAddingDeveloper">
                            <div className="addingDeveloperHeadings">
                                <h1>Adding Developer</h1>
                                <p>
                                    Your team is the face of your firm at
                                    sourcebae , the details you mention will be
                                    your packaging to the clients, represent
                                    them in the best way you can.
                                </p>
                                <div className="pointsToRemember">
                                    <h2>Points To Remember</h2>
                                    <div style={{ paddingTop: '1rem' }}>
                                        <div>
                                            <ul>
                                                <li>
                                                    <p>Fill Form Carefully.</p>
                                                </li>
                                                <li>
                                                    <p>Drop the Resume.</p>
                                                </li>
                                                <li>
                                                    <p>
                                                        We will reach you
                                                        shortly.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={dev}
                                    alt="NotFound"
                                    style={{
                                        margin: '1rem 0rem 0rem 5rem',
                                        width: '80%'
                                    }}
                                />
                            </div>
                            <div className="innerAddingDeveloper">
                                <div className="inputForm">
                                    <div className="inputField1">
                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                First Name
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                value={developerData.firstName}
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            {errors.firstName && (
                                                <p className="error_paragraph basic">
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                Last Name
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={developerData.lastName}
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            {errors.lastName && (
                                                <p className="error_paragraph basic">
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="developerDesignation_addingDeveloper">
                                            <h4>
                                                Designation
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <input
                                                type="text"
                                                placeholder="E.g- Angular Developer"
                                                name="developerDesignation"
                                                value={
                                                    developerData.developerDesignation
                                                }
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            />
                                            {errors.developerDesignation && (
                                                <p className="error_paragraph basic">
                                                    {
                                                        errors.developerDesignation
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="inputField2">
                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                Technology & Skills
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <MultiSelect
                                                options={techs.map((t) => ({
                                                    label: t.technologyName,
                                                    value: t._id
                                                }))}
                                                value={multipleSelectId}
                                                onChange={setMultipleSelectId}
                                                labelledBy="Select"
                                                className="multi-select"
                                                ItemRenderer={
                                                    customItemRenderer
                                                }
                                            />
                                            {errors.developerTechnologies && (
                                                <p className="error_paragraph experience">
                                                    {
                                                        errors.developerTechnologies
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="developerDesignation_addingDeveloper">
                                            <h4>
                                                Upload Resume(pdf, doc, docx)
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <div className="uploadBlock_addingDeveloper">
                                                <div className="fileUploadButton_addingDeveloper">
                                                    <section className="container_addingDeveloper">
                                                        <div
                                                            className="file_click_addingDeveloper"
                                                            {...getRootProps()}
                                                        >
                                                            <input
                                                                {...getInputProps()}
                                                            />
                                                            {!isDragActive && (
                                                                <>
                                                                    <FaFileUpload />
                                                                    {resume ===
                                                                    null ? (
                                                                        <p className="select_file">
                                                                            click
                                                                            to
                                                                            select
                                                                            files
                                                                        </p>
                                                                    ) : (
                                                                        <p className="logo_detail">
                                                                            {resume !==
                                                                                null &&
                                                                                resume[0]
                                                                                    .name}
                                                                        </p>
                                                                    )}
                                                                </>
                                                            )}
                                                            {isDragActive &&
                                                                !isDragReject &&
                                                                "Drop it like it's hot!"}
                                                            {isDragReject &&
                                                                'File type not accepted, sorry!'}
                                                            {/* {isFileTooLarge && (
                                                                <div className="text-danger mt-2">
                                                                    File is too large.
                                                                </div>
                                                            )} */}
                                                        </div>
                                                        {/* <p className="logo_detail">{resume !== null && resume[0].name}</p> */}
                                                    </section>
                                                </div>
                                            </div>

                                            {errors.developerResume && (
                                                <p className="error_paragraph experience">
                                                    {errors.developerResume}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="yearsOfExperience_addingDeveloper">
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Years of Experience{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <div className="experience-radio-parent">
                                                <RadioGroup
                                                    aria-label="developerExperience"
                                                    name="developerExperience"
                                                    value={
                                                        developerData.developerExperience
                                                    }
                                                    onChange={(event) =>
                                                        handleChange(event)
                                                    }
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        control={<Radio />}
                                                        label="Junior(1-3years)"
                                                    />
                                                    <FormControlLabel
                                                        value="3"
                                                        control={<Radio />}
                                                        label="Mid Range(3-6years)"
                                                    />
                                                    <FormControlLabel
                                                        value="6"
                                                        control={<Radio />}
                                                        label="Senior(6-9years)"
                                                    />
                                                </RadioGroup>
                                            </div>
                                        </FormControl>
                                        {errors.developerExperience && (
                                            <p className="error_paragraph">
                                                {errors.developerExperience}
                                            </p>
                                        )}
                                    </div>
                                    <div className="priceRange">
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Price Range(Monthly){' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <RadioGroup
                                                aria-label="developerPriceRange"
                                                name="developerPriceRange"
                                                value={
                                                    developerData.developerPriceRange
                                                }
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            >
                                                <FormControlLabel
                                                    value="1500"
                                                    control={<Radio />}
                                                    label="less than $1500 per month"
                                                />
                                                <FormControlLabel
                                                    value="2500"
                                                    control={<Radio />}
                                                    label="$1500-$2500 per month"
                                                />
                                                <FormControlLabel
                                                    value="4000"
                                                    control={<Radio />}
                                                    label="$2500-$4000 per month"
                                                />
                                                <FormControlLabel
                                                    value="6000"
                                                    control={<Radio />}
                                                    label="More than $4000 per month"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                        {errors.developerPrice && (
                                            <p className="error_paragraph">
                                                {errors.developerPrice}
                                            </p>
                                        )}
                                    </div>
                                    <div className="availabilityArea">
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Availability{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <RadioGroup
                                                aria-label="developerAvailability"
                                                name="developerAvailability"
                                                onChange={(event) =>
                                                    handleChange(event)
                                                }
                                            >
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Immediately"
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="less than 2 weeks"
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio />}
                                                    label="More than 2 weeks"
                                                />
                                                <FormControlLabel
                                                    value="Negotiable"
                                                    control={<Radio />}
                                                    label="Negotiable"
                                                />
                                            </RadioGroup>
                                            {developerData.developerAvailability !==
                                                '0' &&
                                                developerData.developerAvailability !==
                                                    '1' &&
                                                developerData.developerAvailability !==
                                                    '2' &&
                                                developerData.developerAvailability !==
                                                    null && (
                                                    <input
                                                        min={4}
                                                        type="number"
                                                        className="availability_days"
                                                        placeholder="Enter Days"
                                                        name="developerAvailability"
                                                        onChange={(event) =>
                                                            handleChange(
                                                                event,
                                                                'negoPrice'
                                                            )
                                                        }
                                                    />
                                                )}
                                        </FormControl>
                                        {errors.developerAvailability && (
                                            <p
                                                style={{
                                                    marginTop:
                                                        developerData.developerAvailability &&
                                                        '0'
                                                }}
                                                className="error_paragraph"
                                            >
                                                {errors.developerAvailability}
                                            </p>
                                        )}
                                    </div>
                                    <div className="submitButton">
                                        <button onClick={handleButton}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default AddingDeveloper;
