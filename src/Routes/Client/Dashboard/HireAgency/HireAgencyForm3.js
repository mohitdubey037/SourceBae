import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import * as helper from "../../../../shared/helper"
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../../Components/Back/Back';

import MultiSelect from "react-multi-select-component";
import UpImage from '../../../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';

import instance from "../../../../Constants/axiosConstants";
import Spinner from "../../../../Components/Spinner/Spinner";


function HireAgencyForm3(props) {

    const Role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    let { projectId } = useParams();
    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(true);
    const [allServices, setAllServices] = useState([])
    const [selected, setSelected] = useState([]);
    const [apiData, setApiData] = useState({
        clientId: userId,
        id: projectId,
        stepsCompleted: 3,
        projectTechnologiesRequired: [],
        projectServicesRequired: []
    })
    const oldFormData = props.location.state
    useEffect(() => {
    }, [allServices])

    const [allTechnologies, setAllTechnologies] = useState([])

    const handleServices = (event) => {
        let technologies = []
        setAllTechnologies([])
        let servicesRequired = []
        const { className } = event.target
        const toggledServices = allServices.map((service) => {
            const techs = service?.technologies?.map((tech) => {
                return {
                    label: tech.technologyName,
                    value: tech._id
                }
            }) || []

            if (service.serviceName === className) {
                if (!service.selected) {
                    technologies = [...technologies, ...techs]
                    servicesRequired = [...servicesRequired, service._id]
                }

                return {
                    ...service,
                    selected: !service.selected
                }
            }
            else if (service.serviceName !== className) {
                if (service.selected) {
                    technologies = [...technologies, ...techs]
                    servicesRequired = [...servicesRequired, service._id]
                }

                return service
            }
            return service
        })
        setAllServices(toggledServices)
        setApiData({ ...apiData, projectServicesRequired: servicesRequired })
        setAllTechnologies(technologies)
    }

    useEffect(() => {
    }, [apiData])

    const getAllServices = () => {
        instance.get(`api/${Role}/services/all?with_technologies=1`)
            .then(function (response) {
                const servicesNames = response.map((service) => {
                    return {
                        ...service,
                        selected: false
                    }
                })
                setAllServices(servicesNames)
                setLoading(false)
            })
    }

    const validateInfo = () => {
        const err = {}
        if (apiData.projectServicesRequired.length === 0) {
            err.projectServicesRequiredError = "Please Select a Service"
            setErrors(err);
            return false;
        }
        else if (apiData.projectTechnologiesRequired.length === 0) {
            err.projectTechnologiesError = 'Please Select a Technology';
            setErrors(err);
            return false;
        }
        else {
            return true;
        }
    };

    useEffect(() => {
        getAllServices()
    }, [])

    const handleSubmit = () => {
        if (validateInfo()) {
            setLoading(true)
            instance.post(`/api/${Role}/projects/create`, apiData)
                .then(function (response) {
                    setLoading(false);
                    props.history.replace(`/agency-list/${projectId}`)
                })
                .catch(err => {
                    setLoading(false);
                })
        }
    }

    useEffect(() => {
    }, [allTechnologies]);

    useEffect(() => {
    }, [errors])

    useEffect(() => {
        setApiData({
            ...apiData,
            projectTechnologiesRequired: selected.map((tech) => { return tech.value })
        })
    }, [selected])

    return (
        <>
            <Navbar />
            {loading ? <Spinner /> :
                <div style={{ paddingTop: '5rem' }}>
                    <Back oldFormData={oldFormData} formState3={apiData} projectId={projectId} name="Hire Agency Form 3" />
                    <div className="mainHireAgencyForm3">
                        {/* <img className="Image1_hireAgency" src={UpImage} alt="upImage" /> */}
                        {/* <div> */}
                        <img className="Image2_hireAgency" src={DownImage} alt="downImage" />
                        <div className="servicesHirecover">
                            {allTechnologies.length > 0 &&
                                <>
                                    <div className="serviceFieldsOptions newHireAgencyForm3">
                                        <div className="servicesHireAgencyContainer hireAgencyForm3">
                                            <div className="serviceSelectionInput">
                                                {allTechnologies ? (
                                                    <>
                                                        <p className="uiuxtext">
                                                            Select Technologies    <span className="requiredStar">*</span>
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

                                            </div>
                                        </div>
                                    </div>
                                    {errors.projectTechnologiesError && (
                                        <p className="error_hireAgencyForm2 error-select_hireAgencyForm3">
                                            {errors.projectTechnologiesError}
                                        </p>)}
                                </>
                            }
                        </div>

                        <div className="steps_hireAgencyForm3">
                            <div style={{ width: "30%" }}>
                                <div >
                                    <p>Step 1</p>
                                </div>
                                <div className='color_hireAgencyForm3 green'></div>
                            </div>

                            <div className="diabled-step_hireAgencyForm" style={{ width: "30%" }}>
                                <div >
                                    <p className="grey-step_hireAgencyForm">Step 2</p>
                                </div>
                                <div className='color_hireAgencyForm3 green'></div>
                            </div>

                            <div style={{ width: "30%" }}>
                                <div >
                                    <p className="grey-step_hireAgencyForm">Step 3</p>
                                </div>
                                <div className='color_hireAgencyForm3 green'></div>
                            </div>
                        </div>
                        <div className="innerHireAgencyForm3">
                            <div className="techStackFields">
                                <div className="HireAgencyForm3Heading">
                                    <h2>How can <span> SourceBae </span> may help you?</h2>
                                </div>

                                <div className="serivcesHireAgency">
                                    <p className="servicesAgencyHeadingForm3">
                                        <ul>
                                            <li>
                                                Which kind of application or service would you require?     <span className="requiredStar">*</span>
                                            </li>
                                        </ul>
                                    </p>

                                    <div className="servicesCardsHireAgency">
                                        {allServices?.length > 0 ? allServices.map((service) => {
                                            return (
                                                <div className="tech-container">
                                                    <div className={`${service.serviceName}`} onClick={(event) => handleServices(event)} style={{ filter: service.selected ? " invert(90%) sepia(21%) saturate(287%) hue-rotate(150deg) brightness(98%) contrast(98%)" : "none" }} >
                                                        <img className={`${service.serviceName}`} src={service.serviceIcon} alt="" />
                                                    </div>
                                                    <p className={`${service.serviceName}`} style={{ color: '#707070', fontFamily: "Segoe UI" }}>{`${service.serviceName}`}</p>
                                                </div>
                                            )
                                        })
                                            :
                                            <p>Sorry No Data Found.</p>
                                        }
                                        {errors.projectServicesRequiredError && (
                                            <p className="error_hireAgencyForm2 error_hireAgencyForm3">
                                                {errors.projectServicesRequiredError}
                                            </p>)}
                                    </div>
                                </div>

                                <div className="nextbutton" style={{ width: "100%" }}>
                                    <div className="backbutton_hireAgencyForm3" onClick={() => props.history.push(`/hire-agency-form-two/${projectId}`, oldFormData)} style={{ backgroundColor: '#707070' }}>
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
            }
        </>
    )
}

export default HireAgencyForm3
