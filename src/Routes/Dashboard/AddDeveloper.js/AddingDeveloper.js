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
import instance, { axiosPatchModule } from '../../../Constants/axiosConstants';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select'

import Spinner from '../../../Components/Spinner/Spinner';
import MultiSelect from 'react-multi-select-component';
import { FaFileUpload } from 'react-icons/fa';

import { upload } from '../../../shared/helper';
import { toast } from 'react-toastify';
import { AGENCYROUTES } from '../../../Navigation/CONSTANTS';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AddingDeveloper(props) {
    const logoLink = 'https://api.onesourcing.in/media/images/1637044803259.svg';

    const Role = localStorage.getItem('role');
    const [primaryRoles, setprimaryRoles] = useState([])

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
        developerExperience: '1',
        developerPriceRange: '',
        developerAvailability: '0',
        developerRoles: []
    });

    const [techs, setTechs] = useState([]);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [haveResumeLink, sethaveResumeLink] = useState(false)
    const [multipleSelectId, setMultipleSelectId] = useState([])
    const [selectRoles, setselectRoles] = useState([])
    const [selectedTechnologies, setselectedTechnologies] = useState([])
    const [roleBasedTechnologies, setroleBasedTechnologies] = useState([``])
    const { id } = useParams()

    const autoFillFields = data => {
        let technologies = []
        let technologiesIds = []
        let devRoles = []
        data.developerTechnologies?.forEach(item => {
            technologies.push({ label: item.technologyName, value: item._id })
            technologiesIds.push(item?._id)
        })
        data?.developerRoles?.forEach(item => {
            devRoles.push({ value: item, label: item })
        })
        setDeveloperData({
            firstName: data?.firstName,
            lastName: data?.lastName,
            agencyId: data?.agencyId,
            developerDesignation: data?.developerDesignation,
            developerTechnologies: technologiesIds,
            developerDocuments: data?.developerDocuments,
            developerExperience: data?.developerExperience.toString(),
            developerPriceRange: data?.developerPriceRange.toString(),
            developerAvailability: data?.developerAvailability.toString(),
            developerRoles: data?.developerRoles
        })
        setselectRoles(devRoles)
        setResume([{ name: 'Resume' }])
        sethaveResumeLink(true)
        setMultipleSelectId(technologies)
    }

    const getDeveloperDetails = () => {
        instance.get(`api/${Role}/developers/get/${id}`)
            .then(function (response) {
                autoFillFields(response)
            })
            .catch(err => console.log(err))
    }

    const fetchRoles = () => {
        instance.get(`api/${Role}/developer-roles/all`).then(function (response) {
            let _temp = []
            response?.forEach(item => {
                _temp.push({
                    label: item.roleName,
                    value: item._id
                })
            })
            setprimaryRoles(_temp);
        });
    }

    useEffect(() => {
        setDeveloperData({
            ...developerData,
            developerTechnologies: multipleSelectId.map((t) => t.value)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multipleSelectId]);

    useEffect(() => {
        setDeveloperData({
            ...developerData,
            developerRoles: selectRoles.map(t => t.value)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectRoles]);

    useEffect(() => {
        fetchRoles()
        id && getDeveloperDetails()
    }, [])


    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setResume(acceptedFiles);
            sethaveResumeLink(false)
        } else {
            toast.error('Only .jpg, .jpeg, .png, files are allowed');
        }
    }, []);

    const { isDragActive, getRootProps, getInputProps, isDragReject } =
        useDropzone({
            onDrop,
            accept: '.pdf,.doc,.docx',
            minSize: 0,
            multiple: false
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
        } else if (developerData.developerRoles.length == 0) {
            errors.developerRoles = 'Please select role';
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) return true;
        else return false;
    };

    async function uploadMedia() {
        try {
            const detail = await upload(resume, Role);
            if (detail) {
                let data = {
                    ...developerData,
                    developerDocuments: [
                        {
                            documentName: 'Resume',
                            documentLink: detail
                        }
                    ]
                }
                id ? updateDeveloper(data) : createDeveloperApi(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const createDeveloperApi = (data) => {
        setLoading(true);
        instance
            .post(`api/${Role}/developers/create`, (data))
            .then(function (response) {
                setLoading(false);
                props.history.replace({
                    pathname: AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST,
                    origin: 'addingDeveloper'
                });
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const updateDeveloper = (data) => {
        axiosPatchModule(`/api/${Role}/developers/update/${id}`, data)
            .then(res => {
                if (res?.code == 206) {
                    toast.success(res?.message)
                    props.history(-1)
                }
            })
            .catch(err => {
                let response = err?.response
                if (response?.data?.code == 400) {
                    return toast.error(response?.data?.message)
                }
            })
            .finally(() => setLoading(false))
    }

    const handleButton = () => {
        if (errorValidation()) {
            if (haveResumeLink) {
                id ? updateDeveloper(developerData) : createDeveloperApi(developerData)
            } else {
                uploadMedia();
            }
        }
    };

    useEffect(() => {
        getAllTechs();
    }, []);

    const customItemRenderer = ({ checked, option, onClick, disabled }) => {
        return (
            <div
                className={`item-renderer ${disabled && 'disabled'} custom-item-renderer`}
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


    const roleChoiceMade = role => {
        setselectRoles([role])
        instance.get(`/api/${Role}/technologies/${role?.value}`)
            .then(res => {
                let _temp = []
                res?.forEach(item => {
                    _temp.push({
                        label: item.technologyName,
                        value: item._id
                    })
                })
                setroleBasedTechnologies(_temp)
            })
            .catch(() => {
                toast.error('Oops! something went wrong!')
                setselectRoles([])
                setselectedTechnologies([])
                setroleBasedTechnologies([])
            })
    }


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
                                                Roles
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <Select
                                                options={primaryRoles}
                                                className='multi-select'
                                                isClearable={false}
                                                value={selectRoles}
                                                styles={{
                                                    control: (base, state) => ({
                                                        ...base,
                                                        border: "1px solid #45a4ea",
                                                    })
                                                }}
                                                onChange={role => roleChoiceMade(role)}
                                            />
                                            {errors.developerRoles && (
                                                <p className="error_paragraph experience">
                                                    {
                                                        errors.developerRoles
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="developerName_addingDeveloper">
                                            <h4>
                                                Technology & Skills
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4>
                                            <Select
                                                options={roleBasedTechnologies}
                                                className='multi-select'
                                                isClearable={false}
                                                value={selectedTechnologies}
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        border: "1px solid #45a4ea",
                                                    }),
                                                    multiValue: (base) => ({
                                                        ...base,
                                                        minWidth: 'auto',
                                                    }),
                                                    valueContainer: (base) => ({
                                                        ...base,
                                                        overflow: 'scroll',
                                                        flexWrap: 'nowrap'
                                                    }),
                                                }}
                                                onChange={val => setselectedTechnologies([val])}
                                            />
                                            {/* <MultiSelect
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
                                            /> */}
                                            {errors.developerTechnologies && (
                                                <p className="error_paragraph experience">
                                                    {
                                                        errors.developerTechnologies
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="developerDesignation_addingDeveloper">
                                            {/* <h4>
                                                Upload Resume(pdf, doc, docx)
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </h4> */}
                                            <div
                                                className="uploadBlock_addingDeveloper"
                                                {...getRootProps()}
                                            >
                                                <div className="fileUploadButton_addingDeveloper">
                                                    <section className="container_addingDeveloper">
                                                        <div className="file_click_addingDeveloper">
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
                                                                        <p
                                                                            className="logo_detail"
                                                                            title={
                                                                                resume !==
                                                                                null &&
                                                                                resume[0]
                                                                                    .name
                                                                            }
                                                                        >
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
                                    <div>
                                        {/* <FormControl component="fieldset">
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
                                                    value="50000"
                                                    control={<Radio />}
                                                    label="50,000₹-60,000₹"
                                                    checked={
                                                        developerData.developerPriceRange ===
                                                        '50000'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="65000"
                                                    control={<Radio />}
                                                    label="65,000₹-75,000₹"
                                                    checked={
                                                        developerData.developerPriceRange ===
                                                        '65000'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="80000"
                                                    control={<Radio />}
                                                    label="80000₹-90,000₹"
                                                    checked={
                                                        developerData.developerPriceRange ===
                                                        '80000'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="90000"
                                                    control={<Radio />}
                                                    label="Less than 1Lakh₹"
                                                    checked={
                                                        developerData.developerPriceRange ===
                                                        '90000'
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl> */}
                                        <h4 className='priceTag' style={{ display: 'flex' }} >
                                            Price
                                            <span className="requiredStar">
                                                *
                                            </span>
                                            <p style={{ fontSize: '12px', padding: '4px' }} >(in Dollar)</p>
                                        </h4>
                                        <input
                                            type="number"
                                            className='priceRangeClass'
                                            placeholder="$5000"
                                            name="developerPriceRange"
                                            value={developerData.developerPriceRange}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        /> / month
                                        {errors.developerPrice && (
                                            <p className="error_paragraph">
                                                {errors.developerPrice}
                                            </p>
                                        )}
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
                                                        checked={
                                                            developerData.developerExperience ===
                                                            '1'
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="3"
                                                        control={<Radio />}
                                                        label="Mid Range(3-6years)"
                                                        checked={
                                                            developerData.developerExperience ===
                                                            '3'
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="6"
                                                        control={<Radio />}
                                                        label="Senior(6-9years)"
                                                        checked={
                                                            developerData.developerExperience ===
                                                            '6'
                                                        }
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
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        '0'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="less than 2 weeks"
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        '1'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio />}
                                                    label="More than 2 weeks"
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        '2'
                                                    }
                                                />
                                                <FormControlLabel
                                                    value="Negotiable"
                                                    control={<Radio />}
                                                    label="Negotiable"
                                                    checked={
                                                        developerData?.developerAvailability ===
                                                        'Negotiable'
                                                    }
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
