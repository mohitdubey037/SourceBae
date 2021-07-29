/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import * as helper from "../../../../shared/helper"
import ClientNavbar from '../../ClientNavbar';
import Navbar from '../../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../../../Components/Back/Back';

import MultiSelect from "react-multi-select-component";

//multi-select
import instance from "../../../../Constants/axiosConstants";
import Spinner from "../../../../Components/Spinner/Spinner";


function HireAgencyForm3(props) {

    const Role = "client";
    let { projectId } = useParams();
    projectId = helper.cleanParam(projectId)

    const [loading, setLoading] = useState(true);
    const [allServices, setAllServices] = useState([])
    const [selected, setSelected] = useState([]);
    const [apiData, setApiData] = useState({
        id: projectId,
        stepsCompleted: 3,
        projectTechnologiesRequired: [],
        projectServicesRequired: []
    })

    // const [buttonStatus, setButtonStatus] = useState("Next");


    //selecting domain budget
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
                    console.log(techs)
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
        console.log(apiData, "apiData")
    }, [apiData])

    const getAllServices = () => {
        instance.get(`api/${Role}/services/all?with_technologies=1`)
            .then(function (response) {
                console.log(response);
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

    // const hireAgencyForm3Api = ()=>{
    //     setLoading(true)
    //         console.log(apiData);
    //         instance.post(`/api/${Role}/projects/create`,apiData)
    //         .then(function(response){
    //             console.log(response);
    //             setLoading(false);
    //             window.location.href = `/agency-list:${projectId}`
    //         })
    //         .catch(err => {
    //             setLoading(false);
    //         })
    // }
    // const handleButton = ()=>{
    //     if(buttonStatus==="Next")
    //         hireAgencyForm3Api()
    // }

    useEffect(() => {
        getAllServices()
    }, [])

    const handleSubmit = () => {
        setLoading(true)
        console.log(apiData);
        instance.post(`/api/${Role}/projects/create`, apiData)
            .then(function (response) {
                console.log(response);
                setLoading(false);
                props.history.push(`/agency-list:${projectId}`)
            })
            .catch(err => {
                setLoading(false);
            })
    }

    useEffect(() => {
        console.log(allTechnologies)
    }, [allTechnologies])

    useEffect(() => {
        setApiData({
            ...apiData,
            projectTechnologiesRequired: selected.map((tech) => { return tech.value })
        })
    }, [selected])

    return (
        <>
            <div className="Navbar-parent">
                <Navbar />
            </div>
            {loading ? <Spinner /> :
                <div className="mainHireAgencyForm3">
                    <div className="innerHireAgencyForm3">
                        <div className="techStackFields">
                            <div className="stepCheck">
                                <div className="color-div_hireAgencyForm1">
                                </div>
                                <p>Step 3</p>
                            </div>

                            <div className="HireAgencyForm3Heading">
                                <h2>How can <span> OneSourcing </span> may help you?</h2>
                            </div>

                            <div className="serivcesHireAgency">
                                <p className="servicesAgencyHeadingForm3">
                                    <ul>
                                        <li>
                                            Which kind of application or service would you require?
                                        </li>
                                    </ul>
                                </p>

                                <div className="servicesCardsHireAgency">
                                    {allServices?.length > 0 ? allServices.map((service) => {
                                        return (
                                            <div className="tech-container">
                                                <div className={`${service.serviceName}`} onClick={(event) => handleServices(event)} style={{ backgroundColor: service.selected ? "#68E1FD" : '#white' }} >
                                                    <img className={`${service.serviceName}`} src={service.serviceIcon} alt="" />
                                                </div>
                                                <p className={`${service.serviceName}`} style={{ color: '#000' }}>{`${service.serviceName}`}</p>
                                            </div>
                                        )
                                    })
                                        :
                                        <p>Sorry No Data Found.</p>
                                    }
                                </div>
                            </div>

                            <div className="nextbutton">
                                <div onClick={() => props.history.push("/hire-agency-form-two")}>
                                    {/* <i class="fa fa-long-arrow-left" aria-hidden="true"></i> */}
                                    Back
                                </div>
                                <div onClick={() => handleSubmit()}>
                                    Submit
                                    {/* <i class="fa fa-long-arrow-right" aria-hidden="true"></i> */}
                                </div>
                            </div>
                        </div>

                        <div className="serviceFieldsOptions">
                            <div className="servicesHireAgencyContainer">
                                <div className="serviceSelectionInput">
                                    {allTechnologies ? (
                                        <>
                                            <p className="uiuxtext">
                                                Select Technolgies
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
                    </div>
                </div>
            }
        </>
    )
}

export default HireAgencyForm3
