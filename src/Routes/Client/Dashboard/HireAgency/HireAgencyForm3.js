/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import * as helper from "../../../../shared/helper"
import ClientNavbar from '../../ClientNavbar'

import MultiSelect from "react-multi-select-component";

//multi-select
import instance from "../../../../Constants/axiosConstants";



function HireAgencyForm3() {

    const Role = "client";
    let { projectId } = useParams();
    projectId = helper.cleanParam(projectId)

    const [allServices, setAllServices] = useState([])
    const [selected, setSelected] = useState([]);
    const [apiData , setApiData] = useState({
        id:projectId,
        stepsCompleted:3,
        projectTechnologiesRequired:[]
    })
    const [buttonStatus, setButtonStatus] = useState("Next")

    //selecting domain budget
    const [allTechnologies,setAllTechnologies] = useState([])

    const handleServices = (event) => {
        let technologies = []
        setAllTechnologies([])
        const { className } = event.target
        const toggledServices = allServices.map((service) => {
            const techs = service?.technologies?.map((tech)=>{
                return {
                    label: tech.technologyName,
                    value: tech._id
                }
            })||[]

            if (service.serviceName === className){
                if(!service.selected){
                    console.log(techs)
                    technologies = [...technologies, ...techs]
                }
                return {
                    ...service,
                    selected: !service.selected
                }
            }
            else if(service.serviceName !== className){
                if(service.selected){
                    technologies = [...technologies, ...techs]
                }

                return service
            }
            return service
        })
        setAllServices(toggledServices)
        setAllTechnologies(technologies)
    }

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
            
            })
    }

    const hireAgencyForm3Api = ()=>{
            console.log(apiData);
            instance.post(`/api/${Role}/projects/create`,apiData)
            .then(function(response){
                setButtonStatus("Next")
            })
    }
    const handleButton = ()=>{
        if(buttonStatus==="Next")
            hireAgencyForm3Api()
        else if(buttonStatus==="Finish")
            window.location.href = "/client-dashboard"
    }
    useEffect(() => {
        getAllServices()
    }, [])

    useEffect(()=>{
        console.log(allTechnologies)
    },[allTechnologies])

    useEffect(()=>{
        setApiData({
            ...apiData,
            projectTechnologiesRequired:selected.map((tech)=>{return tech.value})
        })
      },[selected])

    return (
        <>

            <ClientNavbar />
            <div className="mainHireAgencyForm3">
                <div className="innerHireAgencyForm3">
                    <div className="techStackFields">

                        <div className="stepCheck">
                            <p>Step 3</p>
                        </div>

                        <div className="HireAgencyForm3Heading">
                            <h2>How can <span> OneSoucing </span> can help you?</h2>
                        </div>

                        <div className="serivcesHireAgency">
                            <p className="servicesAgencyHeadingForm3">which kind of application or service would you require?</p>

                            <div className="servicesCardsHireAgency">

                            {allServices?.length > 0 ? allServices.map((service) => {
                                    return (
                                        <div className={`${service.serviceName}`} onClick={(event) => handleServices(event)} style={{ backgroundColor: service.selected ? '#02044a' : '#D6EAF8' }} >
                                            <img className={`${service.serviceName}`} src={service.serviceIcon} alt="" />
                                            <p className={`${service.serviceName}`} style={{ color: service.selected ? '#fff' : '#000' }}>{`${service.serviceName}`}</p>
                                        </div>
                                    )
                                })
                                    :
                                    <p>Sorry No Data Found.</p>
                                }
                            </div>
                        </div>

                        <div className="nextbuttton">
                            <div onClick={() => window.location.href = "/hire-agency-form-two"} ><i class="fa fa-long-arrow-left" aria-hidden="true"></i>Back</div>
                            <div onClick={()=>handleButton()}>{buttonStatus} <i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
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
                    />
                  </>
                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HireAgencyForm3
