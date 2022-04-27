import React, { useState, useEffect } from 'react';
import './HireDeveloper.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import MultiSelect from 'react-multi-select-component';
import instance from '../../../../Constants/axiosConstants';
import Back from '../../../../Components/Back/Back';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';

import VerifyModal from '../../../../Components/VerifyModal/VerifyModal';
import SizedBox from '../../../../Components/SizedBox/SizedBox';
import { CLIENTROUTES } from '../../../../Navigation/CONSTANTS';

const BlueRadio = withStyles({
    root: {
        color: '#3A3A3A',
        '&$checked': {
            color: '#26AFFF'
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

function HireDeveloper(props) {
    const Role = localStorage.getItem('role');
    const id = localStorage.getItem('userId');
    const [validateEffect, setValidateEffect] = useState({ validate: false });
    const [apiData, setApiData] = useState({
        requirementName: '',
        developerRolesRequired: [],
        numberOfResourcesRequired: '',
        developerTechnologiesRequired: [],
        developerExperienceRequired: '1,3',
        preferredBillingMode: 'Weekly',
        averageBudget: '0,50000',
        jobDescription: '',
        expectedStartTime: '0',
        contractPeriod: 3,
        clientId: id
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        let filterList = [
            'averageBudget',
            'developerExperienceRequired',
            'jobDescription'
        ];
        let { name, value } = event.target;
        if (filterList.includes(event.target.name)) {
            setApiData({
                ...apiData,
                [name]: value
            });
        } else {
            // value = value.replace(/[^\w\s]/gi, '');
            setApiData({
                ...apiData,
                [name]: value
            });
        }
    };
    const options = [
        {
            label: 'Frontend',
            value: 'Frontend'
        },
        {
            label: 'UI/UX',
            value: 'UI/UX'
        },
        {
            label: 'Tester',
            value: 'Tester'
        },
        {
            label: 'CMS',
            value: 'CMS'
        },
        {
            label: 'Project Management',
            value: 'Project Management'
        },
        {
            label: 'Support',
            value: 'Support'
        },
        {
            label: 'Backend',
            value: 'Backend'
        },
        {
            label: 'Full stack Developer',
            value: 'Full stack Developer'
        },
        {
            label: 'Mobile Developer',
            value: 'Mobile Developer'
        },
        {
            label: 'Game Developer',
            value: 'Game Developer'
        },
        {
            label: 'Data Scientist Developer',
            value: 'Data Scientist Developer'
        },
        {
            label: 'DevOps Developer',
            value: 'DevOps Developer'
        },
        {
            label: 'Software Developer',
            value: 'Software Developer'
        },
        {
            label: 'Web Developer',
            value: 'Web Developer'
        },
        {
            label: 'AI/ML',
            value: 'AI/ML'
        },
        {
            label: 'Security Developer',
            value: 'Security Developer'
        }
    ];

    const [allTechnologies, setAllTechnologies] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const getAllTechnologies = () => {
        instance.get(`/api/client/technologies/all`).then(function (response) {
            const techs = response.map((tech) => {
                return {
                    label: tech.technologyName,
                    value: tech._id
                };
            });
            setAllTechnologies(techs);
        });
    };

    const handleSubmit = () => {
        fieldsClearer();
        let validated = errorValidation();
        if (!validated) {
            return;
        }
        const body = {
            ...apiData,
            developerRolesRequired: selectedRoles.map((role) => role.value),
            developerTechnologiesRequired: selectedTechnologies.map(
                (tech) => tech.value
            ),
            averageBudget: {
                min: parseInt(apiData.averageBudget.split(',')?.[0]),
                max: parseInt(apiData.averageBudget.split(',')?.[1])
            },
            developerExperienceRequired: {
                min: parseInt(
                    apiData.developerExperienceRequired.split(',')?.[0]
                ),
                max: parseInt(
                    apiData.developerExperienceRequired.split(',')?.[1]
                )
            },
            expectedStartTime: parseInt(apiData.expectedStartTime)
        };
        instance
            .post(`api/client/hire-developers/create`, body)
            .then(function (response) {
                props.history.replace({
                    pathname: CLIENTROUTES.DEVELOPER_HIRE_REQUIREMENTS,
                    condition: `client`
                });
            });
    };
    useEffect(() => {
        getAllTechnologies();
    }, []);

    const fieldsClearer = () => {
        setApiData({
            ...apiData,
            requirementName: apiData.requirementName?.replace(/^\s+|\s+$/g, '')
        });
        setValidateEffect({ validate: true });
    };

    useEffect(() => {
        if (validateEffect.validate) errorValidation();
    }, [validateEffect]); // eslint-disable-line

    const errorValidation = () => {
        const errors = {};

        if (apiData.requirementName === '') {
            errors.requirementName = 'Requirement name cannot be blank';
        }
        // if (apiData.jobDescription.length >= 50) {
        //     errors.jobDescription = "The Job Description must be at least 50 characters.";
        // }
        if (selectedRoles.length === 0) {
            errors.developerRolesRequired =
                'Atleast one developer role is Required';
        }
        if (apiData.numberOfResourcesRequired === '') {
            errors.numberOfResourcesRequired = 'Resources cannot be blank';
        } else if (apiData.numberOfResourcesRequired < 1) {
            errors.numberOfResourcesRequired =
                'Resources cannot be less than 1';
        }
        if (selectedTechnologies.length === 0) {
            errors.developerTechnologiesRequired =
                'Atleast one technology is Required';
        }

        setErrors(errors);
        if (Object.keys(errors).length === 0) return true;
        else return false;
    };

    const customItemRenderer = ({ checked, option, onClick, disabled }) => {
        return (
            <div
                className={`item-renderer ${disabled && 'disabled'
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
    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => '✔️ ' + label)
            : 'No services selected';
    };
    return (
        <>
            <Navbar />
            <div className="back_and_hireDeveloper_Parent">
                {/* <img className="Image2" src={DownImage} alt="downImage" /> */}
                <Back name="Hire Developer" />
                <div className="mainHireDeveloper">
                    <div className="hireDeveloperForm">
                        <div className="hireDeveloperFormInfo">
                            <p className="hire-developer-heading">
                                Fulfill your specific requirements with skilled
                                and experienced developers
                            </p>
                            <span className="hire-developer-heading-note">
                                note - payment in monthly type system
                            </span>
                        </div>
                        <SizedBox height={'10px'} />
                        <div className="resourceNumber">
                            <ul>
                                <li>
                                    Requirement Name{' '}
                                    <span className="requiredStar">*</span>
                                </li>
                            </ul>
                            <div className="inputs-container">
                                <input
                                    type="text"
                                    name="requirementName"
                                    value={apiData.requirementName}
                                    placeholder="Give a name to identify requirement"
                                    onChange={handleChange}
                                />
                                {errors?.requirementName && (
                                    <span className="validation_message">
                                        {errors?.requirementName}
                                    </span>
                                )}
                            </div>
                        </div>
                        <SizedBox height={'10px'} />
                        <div className="resourceNumber">
                            <ul>
                                <li>
                                    Description{' '}
                                    <span className="requiredStar">*</span>
                                </li>
                            </ul>
                            <div className="inputs-container">
                                <textarea
                                    name="jobDescription"
                                    value={apiData.jobDescription}
                                    placeholder="Give a name to identify requirement"
                                    onChange={handleChange}
                                    rows={5}
                                    style={{
                                        height: '100px',
                                        fontSize: '14px',
                                        padding: '8px',
                                        borderColor: '#E1E1E1',
                                        borderRadius: 6,
                                        width: '420px'
                                    }}
                                />
                                {errors?.jobDescription && (
                                    <span className="validation_message">
                                        {errors?.jobDescription}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="resourceNumberCover">
                            <div className="resourceNumber">
                                <ul>
                                    <li>
                                        What Roles Are You looking For ?{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>
                                <div className="inputs-container">
                                    <MultiSelect
                                        options={options}
                                        value={selectedRoles}
                                        onChange={setSelectedRoles}
                                        labelledBy="Select"
                                        className="multi-select developerrole-select"
                                        ItemRenderer={customItemRenderer}
                                        valueRenderer={customValueRenderer}
                                    />
                                    {errors?.developerRolesRequired && (
                                        <span className="validation_message">
                                            {errors?.developerRolesRequired}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="resourceNumber">
                                <ul>
                                    <li>
                                        Skills Required{' '}
                                        {/* <span className="requiredStar">*</span> */}
                                    </li>
                                </ul>
                                <div className="inputs-container">
                                    {allTechnologies.length > 0 ? (
                                        <MultiSelect
                                            options={allTechnologies}
                                            value={selectedTechnologies}
                                            onChange={setSelectedTechnologies}
                                            labelledBy="Select"
                                            ItemRenderer={customItemRenderer}
                                            valueRenderer={customValueRenderer}
                                        />
                                    ) : (
                                        'Sorry no Technologies to select'
                                    )}
                                </div>
                                {errors?.developerTechnologiesRequired && (
                                    <span className="validation_message">
                                        {errors?.developerTechnologiesRequired}
                                    </span>
                                )}
                                <SizedBox height={'28px'} />
                            </div>

                            <div className="resourceNumber">
                                <ul>
                                    <li>
                                        Number of Resources{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>
                                <div className="inputs-container">
                                    <input
                                        type="number"
                                        min="1"
                                        name="numberOfResourcesRequired"
                                        value={
                                            apiData.numberOfResourcesRequired
                                        }
                                        placeholder="E.g- 1 or 2"
                                        onChange={handleChange}
                                    />
                                    {errors?.numberOfResourcesRequired && (
                                        <span className="validation_message">
                                            {errors?.numberOfResourcesRequired}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="contractPeriod">
                                <ul>
                                    <li>
                                        Contract Periods{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>
                                <select
                                    name="contractPeriod"
                                    id="contractPeriod"
                                    onChange={handleChange}
                                >
                                    <option value={3}>3 Months</option>
                                    <option value={6}>6 Months</option>
                                    <option value={9}>9 Months</option>
                                    <option value={12}>12 Months</option>
                                </select>
                            </div>
                        </div>
                        <SizedBox height={'30px'} />
                        <div className="radioContainer">
                            <div className="developerExperienceRequired">
                                <ul>
                                    <li>
                                        Average Experience{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>
                                <FormControl component="fieldset">
                                    <div className="left-margin1">
                                        <RadioGroup
                                            aria-label="experience"
                                            name="developerExperienceRequired"
                                            value={
                                                apiData.developerExperienceRequired
                                            }
                                            onChange={handleChange}
                                        >
                                            <div
                                                className="Junior"
                                                style={{ display: 'flex' }}
                                            >
                                                <div>
                                                    <FormControlLabel
                                                        value="1,3"
                                                        control={<BlueRadio />}
                                                        label="Junior (1-3years)"
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="Mid-Range"
                                                style={{ display: 'flex' }}
                                            >
                                                <div>
                                                    <FormControlLabel
                                                        value="3,6"
                                                        control={<BlueRadio />}
                                                        label="Mid Range (3-6 years)"
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="Senior"
                                                style={{ display: 'flex' }}
                                            >
                                                <div>
                                                    <FormControlLabel
                                                        value="6,9"
                                                        control={<BlueRadio />}
                                                        label="Senior (6-9 years)"
                                                    />
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </FormControl>
                            </div>

                            <div className="startPeriod">
                                <ul>
                                    <li>
                                        Start Time{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>
                                <FormControl component="fieldset">
                                    <div className="left-margin">
                                        <RadioGroup
                                            aria-label="startDate"
                                            name="expectedStartTime"
                                            value={apiData.expectedStartTime}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value="0"
                                                control={<BlueRadio />}
                                                label="Immediately"
                                            />
                                            <FormControlLabel
                                                value="1"
                                                control={<BlueRadio />}
                                                label="within 1 week"
                                            />
                                        </RadioGroup>
                                    </div>
                                </FormControl>
                            </div>

                            <div className="averageBudget">
                                <SizedBox height={'20px'} />
                                <ul>
                                    <li>
                                        Average Budget{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>

                                <FormControl component="fieldset">
                                    <div className="left-margin">
                                        <RadioGroup
                                            aria-label="averageBudget"
                                            name="averageBudget"
                                            value={apiData.averageBudget}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value={'0,700'}
                                                control={<BlueRadio />}
                                                label="less than $700"
                                            />
                                            <FormControlLabel
                                                value={'700,1600'}
                                                control={<BlueRadio />}
                                                label="$700-$1600 Per Month"
                                            />
                                            <FormControlLabel
                                                value={'1600,2600'}
                                                control={<BlueRadio />}
                                                label="$1600-$2600 Per Month"
                                            />
                                            <FormControlLabel
                                                value={'2600,90000000'}
                                                control={<BlueRadio />}
                                                label="More than $2600 Per Month"
                                            />
                                        </RadioGroup>
                                    </div>
                                </FormControl>
                            </div>
                        </div>

                        <div className="submitBtn">
                            <div onClick={handleSubmit}>Submit</div>
                        </div>
                    </div>
                </div>
            </div>

            <VerifyModal Role={Role} id={id} isUserVerified={null} />
        </>
    );
}

export default HireDeveloper;
