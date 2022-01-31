import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../../Components/Back/Back';

import MultiSelect from 'react-multi-select-component';
import DownImage from '../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';

import instance from '../../../../Constants/axiosConstants';
import Spinner from '../../../../Components/Spinner/Spinner';

function HireAgencyForm3(props) {
    const Role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    let { projectId } = useParams();
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(true);
    const [allServices, setAllServices] = useState([]);
    const [selected, setSelected] = useState([]);
    const [apiData, setApiData] = useState({
        clientId: userId,
        id: projectId,
        stepsCompleted: 3,
        projectTechnologiesRequired: [],
        projectServicesRequired: []
    });
    const oldFormData = props.location.state;

    const [allTechnologies, setAllTechnologies] = useState([]);

    const handleServices = (event) => {
        let technologies = [];
        setAllTechnologies([]);
        let servicesRequired = [];
        const { className } = event.target;
        const toggledServices = allServices.map((service) => {
            const techs =
                service?.technologies?.map((tech) => {
                    return {
                        label: tech.technologyName,
                        value: tech._id
                    };
                }) || [];

            if (service.serviceName === className) {
                if (!service.selected) {
                    technologies = [...technologies, ...techs];
                    servicesRequired = [...servicesRequired, service._id];
                }

                return {
                    ...service,
                    selected: !service.selected
                };
            } else if (service.serviceName !== className) {
                if (service.selected) {
                    technologies = [...technologies, ...techs];
                    servicesRequired = [...servicesRequired, service._id];
                }

                return service;
            }
            return service;
        });
        setAllServices(toggledServices);
        setApiData({ ...apiData, projectServicesRequired: servicesRequired });
        setAllTechnologies(technologies);
    };

    useEffect(() => {}, [apiData]);

    const getAllServices = () => {
        instance
            .get(`api/${Role}/services/all?with_technologies=1`)
            .then(function (response) {
                const servicesNames = response.map((service) => {
                    return {
                        ...service,
                        selected: false
                    };
                });
                setAllServices(servicesNames);
                setLoading(false);
            });
    };

    const validateInfo = () => {
        const err = {};
        if (apiData.projectServicesRequired.length === 0) {
            err.projectServicesRequiredError = 'Please Select a Service';
            setErrors(err);
            return false;
        } else if (apiData.projectTechnologiesRequired.length === 0) {
            err.projectTechnologiesError = 'Please Select a Technology';
            setErrors(err);
            return false;
        } else {
            return true;
        }
    };

    useEffect(() => {
        getAllServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        if (validateInfo()) {
            setLoading(true);
            instance
                .post(`/api/${Role}/projects/create`, apiData)
                .then(function (response) {
                    setLoading(false);
                    props.history.replace(`/agency-list/${projectId}`);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        setApiData({
            ...apiData,
            projectTechnologiesRequired: selected.map((tech) => {
                return tech.value;
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

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
                    height={'25px'}
                />
                <p>{option.label}</p>
            </div>
        );
    };
    const customValueRenderer = (selected, _options) => {
        return selected.length
            ? selected.map(({ label }) => '✔️ ' + label)
            : 'No Items Selected';
    };
    return (
        <>
            <Navbar />
            {loading ? (
                <Spinner />
            ) : (
                <div style={{ paddingTop: '5rem' }}>
                    <Back
                        oldFormData={oldFormData}
                        formState3={apiData}
                        projectId={projectId}
                        name="Hire Agency"
                    />
                    <div className="mainHireAgencyForm3">
                        <img
                            className="Image2_hireAgency"
                            src={DownImage}
                            alt="downImage"
                        />
                        <div className="servicesHirecover">
                            {allTechnologies.length > 0 && (
                                <>
                                    <div className="serviceFieldsOptions newHireAgencyForm3">
                                        <div className="servicesHireAgencyContainer hireAgencyForm3">
                                            <div className="serviceSelectionInput">
                                                {allTechnologies ? (
                                                    <>
                                                        <p className="uiuxtext">
                                                            Select Technologies{' '}
                                                            <span className="requiredStar">
                                                                *
                                                            </span>
                                                        </p>
                                                        <MultiSelect
                                                            options={
                                                                allTechnologies
                                                            }
                                                            value={selected}
                                                            onChange={
                                                                setSelected
                                                            }
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
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    {errors.projectTechnologiesError && (
                                        <p className="error_hireAgencyForm2 error-select_hireAgencyForm3">
                                            {errors.projectTechnologiesError}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="steps_hireAgencyForm3">
                            <div
                                className="steps_hireAgencyForm"
                                style={{ width: '30%' }}
                            >
                                <div className="steps_on_hire_agency">
                                    <p>Step 1</p>
                                    <div className="color_hireAgencyForm green"></div>
                                </div>
                            </div>
                            <div
                                className="steps_hireAgencyForm step3_disabled"
                                style={{ width: '30%' }}
                            >
                                <div className="steps_on_hire_agency">
                                    <p>Step 2</p>
                                    <div className="color_hireAgencyForm green"></div>
                                </div>
                            </div>
                            <div
                                className="steps_hireAgencyForm step3_disabled"
                                style={{ width: '30%' }}
                            >
                                <div className="steps_on_hire_agency">
                                    <p>Step 3</p>
                                    <div className="color_hireAgencyForm green"></div>
                                </div>
                            </div>
                        </div>
                        <div className="innerHireAgencyForm3">
                            <div
                                className="techStackFields"
                                style={{ width: '95%' }}
                            >
                                <div className="HireAgencyForm3Heading">
                                    <h2>
                                        How can <span> SourceBae </span> assist
                                        you?
                                    </h2>
                                </div>

                                <div className="serivcesHireAgency">
                                    <p className="servicesAgencyHeadingForm3">
                                        <ul>
                                            <li>
                                                Which kind of application or
                                                service would you require?{' '}
                                                <span className="requiredStar">
                                                    *
                                                </span>
                                            </li>
                                        </ul>
                                    </p>

                                    <div className="servicesCardsHireAgency">
                                        {allServices?.length > 0 ? (
                                            allServices.map((service) => {
                                                return (
                                                    <div className="tech-container">
                                                        <div
                                                            className={`${
                                                                service.serviceName
                                                            } ${
                                                                service.selected &&
                                                                'conditional_transparency'
                                                            }`}
                                                            onClick={(event) =>
                                                                handleServices(
                                                                    event
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                className={`${service.serviceName}`}
                                                                src={
                                                                    service.serviceIcon
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                        <p
                                                            className={`${service.serviceName}`}
                                                            style={{
                                                                color: '#707070',
                                                                fontFamily:
                                                                    'Segoe UI'
                                                            }}
                                                        >{`${service.serviceName}`}</p>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p>Sorry No Data Found.</p>
                                        )}
                                        {errors.projectServicesRequiredError && (
                                            <p className="error_hireAgencyForm2 error_hireAgencyForm3">
                                                {
                                                    errors.projectServicesRequiredError
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className="nextbutton"
                                    style={{ width: '100%' }}
                                >
                                    <div
                                        className="backbutton_hireAgencyForm3"
                                        onClick={() =>
                                            props.history.push(
                                                `/hire-agency-form-two/${projectId}`,
                                                oldFormData
                                            )
                                        }
                                        style={{ backgroundColor: '#707070' }}
                                    >
                                        Back
                                    </div>
                                    <div onClick={() => handleSubmit()}>
                                        Submit
                                    </div>
                                </div>
                            </div>
                            {/* {allTechnologies.length > 0 &&
                            <div className="serviceFieldsOptions newHireAgencyForm3">
                                <div className="servicesHireAgencyContainer hireAgencyForm3">
                                    <div className="serviceSelectionInput">
                                        {allTechnologies ? (
                                            <>
                                                <p className="uiuxtext">
                                                    Select Technologies
                                                </p>
                                                <MultiSelect
                                                    options={allTechnologies}
                                                    value={selected}
                                                    onChange={setSelected}
                                                    labelledBy="Select"
                                                    className="margin-left"
                                                />
                                            </>
                                        ) : null}
                                        {errors.projectTechnologiesError && (
                                            <p className="error_hireAgencyForm2 error-select_hireAgencyForm2">
                                                {errors.projectTechnologiesError}
                                            </p>)}
                                    </div>
                                </div>
                            </div>
                        } */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HireAgencyForm3;
