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
import DownImage from '../../../../assets/images/Newestdashboard/Register/signup_down.svg';

import VerifyModal from '../../../../Components/VerifyModal/VerifyModal';

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
        developerExperienceRequired: 'Junior (1-3years)',
        preferredBillingMode: 'Weekly',
        averageBudget: 'less than $1500',
        expectedStartDate: 'Immediately',
        contractPeriod: '3 Months',
        clientId: id
    });

    const [errors, setErrors] = useState({});
    const billing = 1;

    const handleChange = (event) => {
        let { name, value } = event.target;
        value = value.replace(/[^\w\s]/gi, '');
        setApiData({
            ...apiData,
            [name]: value
        });
    };
    const options = [
        {
            label: 'Frontend',
            value: 'Frontend'
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
            )
        };
        instance
            .post(`api/client/hire-developers/create`, body)
            .then(function (response) {
                props.history.replace({
                    pathname: `/get-client-hire-developer`,
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
    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => '✔️ ' + label)
            : 'No services selected';
    };
    return (
        <>
            <Navbar />
            <div className="back_and_hireDeveloper_Parent">
                <img className="Image2" src={DownImage} alt="downImage" />
                <Back name="Hire Developer" />
                <div className="mainHireDeveloper">
                    <div className="hireDeveloperForm">
                        <div className="hireDeveloperFormInfo">
                            <p className="hire-developer-heading">
                                Fulfill your specific requirements with skilled
                                and experienced developers
                            </p>
                        </div>
                        <div className="resourceNumberCover">
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

                            <div className="resourceNumber">
                                <ul>
                                    <li>
                                        Roles Required?{' '}
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
                            <div className="resourceNumber">
                                <ul>
                                    <li>
                                        Skills Required{' '}
                                        <span className="requiredStar">*</span>
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
                            </div>
                        </div>
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
                                                        value="Junior (1-3years)"
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
                                                        value="Mid Range (3-6 years)"
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
                                                        value="Senior (6-9 years)"
                                                        control={<BlueRadio />}
                                                        label="Senior (6-9 years)"
                                                    />
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </FormControl>
                            </div>

                            <div className="preferredBillingMode">
                                <ul>
                                    <li>
                                        Preffered Billing{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>

                                <FormControl component="fieldset">
                                    <div className="left-margin1">
                                        <RadioGroup
                                            aria-label="billing"
                                            name="preferredBillingMode"
                                            value={apiData.preferredBillingMode}
                                            onChange={handleChange}
                                        >
                                            <div
                                                className="Weekly"
                                                style={{ display: 'flex' }}
                                            >
                                                <div>
                                                    <FormControlLabel
                                                        value="Weekly"
                                                        control={<BlueRadio />}
                                                        label="Weekly"
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                className="Monthly"
                                                style={{ display: 'flex' }}
                                            >
                                                <div>
                                                    <FormControlLabel
                                                        value="Monthly"
                                                        control={<BlueRadio />}
                                                        label="Monthly"
                                                    />
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </FormControl>
                            </div>

                            <div className="averageBudget">
                                <ul>
                                    <li>
                                        Average Budget{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>
                                {billing === 1 ? (
                                    <FormControl component="fieldset">
                                        <div className="left-margin">
                                            <RadioGroup
                                                aria-label="averageBudget"
                                                name="averageBudget"
                                                value={apiData.averageBudget}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    value="less than $1500"
                                                    control={<BlueRadio />}
                                                    label="less than $1500"
                                                />
                                                <FormControlLabel
                                                    value="$1500-$2500"
                                                    control={<BlueRadio />}
                                                    label="$1500-$2500 Per Month"
                                                />
                                                <FormControlLabel
                                                    value="$2500-$4000"
                                                    control={<BlueRadio />}
                                                    label="$2500-$4000 Per Month"
                                                />
                                                <FormControlLabel
                                                    value="More than $4000"
                                                    control={<BlueRadio />}
                                                    label="More than $4000 Per Month"
                                                />
                                            </RadioGroup>
                                        </div>
                                    </FormControl>
                                ) : (
                                    <FormControl component="fieldset">
                                        <div className="left-margin">
                                            <RadioGroup
                                                aria-label="hourlyBudget"
                                                name="averageBudget"
                                                value={apiData.averageBudget}
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel
                                                    value="less than $20"
                                                    control={<BlueRadio />}
                                                    label="less than $20"
                                                />
                                                <FormControlLabel
                                                    value="$20-$40"
                                                    control={<BlueRadio />}
                                                    label="$20-$40"
                                                />
                                                <FormControlLabel
                                                    value="$40-$60"
                                                    control={<BlueRadio />}
                                                    label="$40-$60"
                                                />
                                                <FormControlLabel
                                                    value="Above $60"
                                                    control={<BlueRadio />}
                                                    label="Above $60"
                                                />
                                            </RadioGroup>
                                        </div>
                                    </FormControl>
                                )}
                            </div>

                            <div className="startPeriod">
                                <ul>
                                    <li>
                                        Start Date{' '}
                                        <span className="requiredStar">*</span>
                                    </li>
                                </ul>
                                <FormControl component="fieldset">
                                    <div className="left-margin">
                                        <RadioGroup
                                            aria-label="startDate"
                                            name="expectedStartDate"
                                            value={apiData.expectedStartDate}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value="Immediately"
                                                control={<BlueRadio />}
                                                label="Immediately"
                                            />
                                            <FormControlLabel
                                                value="in 1 to 2 weeks"
                                                control={<BlueRadio />}
                                                label="in 1 to 2 weeks"
                                            />
                                            <FormControlLabel
                                                value="more than 2 weeks"
                                                control={<BlueRadio />}
                                                label="more than 2 weeks"
                                            />
                                            <FormControlLabel
                                                value="negotiable"
                                                control={<BlueRadio />}
                                                label="negotiable"
                                            />
                                        </RadioGroup>
                                    </div>
                                </FormControl>
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
                                    <option value="3 Months">3 Months</option>
                                    <option value="6 Months">6 Months</option>
                                    <option value="9 Months">9 Months</option>
                                    <option value="12 Months">12 Months</option>
                                </select>
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
