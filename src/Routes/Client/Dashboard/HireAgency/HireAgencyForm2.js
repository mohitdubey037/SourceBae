/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import MultiSelect from 'react-multi-select-component';
import { useParams } from 'react-router';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DownImage from '../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';

import instance from '../../../../Constants/axiosConstants';
import Spinner from '../../../../Components/Spinner/Spinner';
import './HireAgencyForm2.css';
import Back from '../../../../Components/Back/Back';
import { CLIENTROUTES } from '../../../../Navigation/CONSTANTS';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
});
const BlueRadio = withStyles({
    root: {
        color: '#26AFFF',
        '&$checked': {
            color: '#26AFFF'
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

function HireAgencyForm2(props) {
    const propData = props.location.state;
    const Role = localStorage.getItem('role');
    let { projectId } = useParams();
    const id = localStorage.getItem('userId');
    const [apiData, setApiData] = useState({
        stepsCompleted: 2,
        clientId: id,
        id: projectId,
        projectDomainId: '',
        projectExpertiseRequired: [],
        agencyExperience: propData?.agencyForm2?.agencyExperience
            ? propData?.agencyForm2?.agencyExperience
            : 'capable'
    });
    const [allDomainsData, setAllDomainsData] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        projectDomainIdError: '',
        projectExpertiseRequiredError: [],
        agencyExperienceError: ''
    });
    const classes = useStyles();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setApiData(
            {
                ...apiData,
                [name]: value
            },
            {
                agencyExperience: propData?.agencyForm2?.agencyExperience
            }
        );
    };
    useEffect(() => {
        if (propData?.agencyForm2) {
            setApiData({
                stepsCompleted: 2,
                clientId: propData.agencyForm2.clientId,
                id: propData.agencyForm2.id,
                projectDomainId: propData.agencyForm2.projectDomainId,
                projectExpertiseRequired:
                    propData.agencyForm2.projectExpertiseRequired,
                agencyExperience: propData.agencyForm2.agencyExperience
            });
        }
    }, [propData]);

    const handleDomains = (event) => {
        const { className } = event.target;
        const toggledDomains = allDomainsData.map((domain) => {
            if (domain.domainName === className) {
                if (!domain.selected) {
                    setApiData({
                        ...apiData,
                        projectDomainId: domain._id
                    });
                } else
                    setApiData({
                        ...apiData,
                        projectDomainId: ''
                    });
                if (!domain.selected) setSelectedDomain(domain);
                else
                    setApiData({
                        ...apiData,
                        projectDomainId: ''
                    });

                return {
                    ...domain,
                    selected: !domain.selected
                };
            } else {
                return {
                    ...domain,
                    selected: false
                };
            }
        });
        setAllDomainsData(toggledDomains);
    };

    useEffect(() => {
        setSelected([]);
    }, [selectedDomain]);
    //Api Calls methods
    const getAllDomains = () => {
        instance
            .get(`api/${Role}/domains/all`, apiData)
            .then(function (response) {
                const domainNames = response.map((domain) => {
                    return {
                        ...domain,
                        selected: false
                    };
                });
                setAllDomainsData(domainNames);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const getExpertiseOption = () => {
        const options = selectedDomain?.expertise?.map((expertise) => {
            return {
                label: expertise.expertiseName,
                value: expertise._id
            };
        });
        setOptions(options);
    };

    const handleSubmit = () => {
        let tempError = {
            projectDomainIdError: '',
            projectExpertiseRequiredError: [],
            agencyExperienceError: ''
        };

        if (apiData.projectDomainId === '' || apiData.projectDomainId === null)
            setError({
                ...tempError,
                projectDomainIdError: 'Please Select a Domain.'
            });
        else if (apiData.projectExpertiseRequired.length === 0)
            setError({
                ...tempError,
                projectExpertiseRequiredError: 'Please Select a Service.'
            });
        else {
            setLoading(true);
            instance
                .post(`/api/${Role}/projects/create`, apiData)
                .then(function () {
                    setLoading(false);
                    propData.agencyForm2 = apiData;
                    props.history.replace(
                        `${CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_3}/${projectId}`,
                        propData
                    );
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        getExpertiseOption();
        selectedDomain?._id &&
            setApiData({
                ...apiData,
                projectDomainId: selectedDomain._id
            });
    }, [selectedDomain]);

    useEffect(() => {
        setApiData({
            ...apiData,
            projectExpertiseRequired: selected.map((service) => {
                return service.value;
            })
        });
    }, [selected]);

    useEffect(() => {
        getAllDomains();
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
    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => '?????? ' + label)
            : 'No services selected';
    };
    return (
        <>
            <Navbar />

            {loading ? (
                <Spinner />
            ) : (
                <div style={{ paddingTop: '5rem' }}>
                    <Back
                        propData={propData}
                        formState2={apiData}
                        name="Hire Agency"
                    />
                    <div className="mainHireAgencyFormTwo">
                        <img
                            className="Image2_hireAgency"
                            src={DownImage}
                            alt="downImage"
                        />
                        <div className="steps_hireAgencyForm2">
                            <div
                                className="steps_hireAgencyForm step3_disabled"
                                style={{ width: '30%' }}
                            >
                                <div className="steps_on_hire_agency">
                                    <p>Step 1</p>
                                    <div className="color_hireAgencyForm green"></div>
                                </div>
                            </div>

                            <div
                                className="steps_hireAgencyForm diabled-step_hireAgencyForm"
                                style={{ width: '30%' }}
                            >
                                <div className="steps_on_hire_agency">
                                    <p>Step 2</p>
                                </div>
                                <div className="color_hireAgencyForm green"></div>
                            </div>

                            <div
                                className="diabled-step_hireAgencyForm"
                                style={{ width: '30%' }}
                            >
                                <div className="steps_on_hire_agency">
                                    <p className="grey-step_hireAgencyForm">
                                        Step 3
                                    </p>
                                </div>
                                <div className="color_hireAgencyForm grey"></div>
                            </div>
                        </div>
                        <div className="servicesHirecover">
                            {selectedDomain && options && (
                                <>
                                    <div className="serviceFieldsOptions">
                                        <div className="servicesHireAgencyContainer hireAgencyForm2">
                                            <div className="serviceSelectionInput">
                                                <>
                                                    <p className="uiuxtext">
                                                        Select{' '}
                                                        {
                                                            selectedDomain.domainName
                                                        }{' '}
                                                        services{' '}
                                                        <span
                                                            style={{
                                                                fontSize: '12px'
                                                            }}
                                                            className="requiredStar"
                                                        >
                                                            *
                                                        </span>
                                                    </p>
                                                    <MultiSelect
                                                        options={options}
                                                        value={selected}
                                                        onChange={setSelected}
                                                        labelledBy="Select"
                                                        className="margin-left"
                                                        ItemRenderer={
                                                            customItemRenderer
                                                        }
                                                        valueRenderer={
                                                            customValueRenderer
                                                        }
                                                    />
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                    {error.projectExpertiseRequiredError && (
                                        <p className="error_hireAgencyForm2 error-select_hireAgencyForm2">
                                            {
                                                error.projectExpertiseRequiredError
                                            }
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="innerHireAgencyFormTwo">
                            <div className="techStackFields">
                                <div className="serivcesHireAgency">
                                    <ul>
                                        <li>
                                            <p className="servicesAgencyHeading">
                                                Select the domain you need
                                                assistance in.{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="servicesCardsHireAgency">
                                        {allDomainsData.map((domain) => {
                                            return (
                                                <div className="tech-container">
                                                    <div
                                                        className={`${
                                                            domain.domainName
                                                        } ${
                                                            domain.selected &&
                                                            'conditional_transparency'
                                                        }`}
                                                        onClick={(event) =>
                                                            handleDomains(event)
                                                        }
                                                    >
                                                        <img
                                                            className={`${domain.domainName}`}
                                                            src={
                                                                domain.domainIcon
                                                            }
                                                            alt="domainIcon"
                                                        />
                                                    </div>
                                                    <p
                                                        className={`${domain.domainName}`}
                                                        style={{
                                                            color: '#707070',
                                                            fontFamily:
                                                                'Segoe UI',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        {`${domain.domainName}`}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {error.projectDomainIdError && (
                                        <p className="error_hireAgencyForm2">
                                            {error.projectDomainIdError}
                                        </p>
                                    )}
                                </div>

                                <div className="monthlyBudget">
                                    <ul>
                                        <li>
                                            <p>
                                                Desired level of proficiency in
                                                the project's domain?{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </p>
                                        </li>
                                    </ul>

                                    <div className="domainBudgetOptions">
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label="agencyExperience"
                                                name="agencyExperience"
                                                value={
                                                    apiData.agencyExperience ||
                                                    propData?.agencyForm2
                                                        ?.agencyExperience
                                                }
                                                onChange={handleChange}
                                            >
                                                <div className="radio-label_hireAgencyForm2">
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
                                                <div className="radio-label_hireAgencyForm2">
                                                    <FormControlLabel
                                                        value="skilled"
                                                        control={<BlueRadio />}
                                                        label="Skilled"
                                                    />
                                                </div>
                                                <div className="radio-label_hireAgencyForm2">
                                                    <FormControlLabel
                                                        value="proficient"
                                                        control={<BlueRadio />}
                                                        label="Proficient"
                                                    />
                                                </div>
                                                <div className="radio-label_hireAgencyForm2">
                                                    <FormControlLabel
                                                        value="accomplished"
                                                        control={<BlueRadio />}
                                                        label="Accomplished"
                                                    />
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="nextbutton">
                                    <div
                                        className="backbutton_hireAgencyForm2"
                                        onClick={() =>
                                            props.history.push(
                                                CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1,
                                                propData
                                            )
                                        }
                                        style={{ backgroundColor: '#707070' }}
                                    >
                                        Back
                                    </div>
                                    <div onClick={() => handleSubmit()}>
                                        Next
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HireAgencyForm2;
