import React, { useEffect, useState } from 'react'
import './DeveloperList.css'
import document from '../../../assets/images/Logo/document.png';
import instance from "../../../Constants/axiosConstants";
import { useHistory } from 'react-router-dom';

import { set } from 'react-ga'

function DeveloperList(props) {

    const routerHistory = useHistory();
    console.log(routerHistory);
    console.log(props)
    const Role = "agency"
    const arr = [1, 2, 3, 4, 5]
    const agencyId = localStorage.getItem("userId")
    const [developers, setDevelopers] = useState([])

    const getAgencyDevelopers = () => {
        instance.get(`/api/${Role}/developers/all?agencyId=${agencyId}`)
            .then(function (response) {
                console.log(response)
                setDevelopers(response)
            })
    }
    useEffect(() => {
        getAgencyDevelopers()
    }, [])

    // const resumeDownloader = (developer) => {
    //     developer.map(dev => {
    //         return dev.developerDocuments
    //     })
    // }

    //     agencyId: "6083df6bd332367f9152e02e"
    // createdAt: "2021-05-06T09:21:07.282Z"
    // developerAvailability: -1
    // developerDesignation: "React Developer"
    // developerDocuments: [{…}]
    // developerExperience: 1
    // developerExpertise: []
    // developerPriceRange: 4000
    // developerTechnologies: [{…}]
    // firstName: "Atul"
    // isRemoteDeveloper: false
    // lastName: "Bhatt"
    // socialPlatformDetails: []
    console.log(developers.map((developer) => developer.developerDocuments[0].documentLink));


    return (
        <>
            <div className="mainDeveloperList">
                <div className="innerDeveloperList">
                    {
                        developers.map((developer) => {
                            return (
                                <div className="developerCard">
                                    <div className="developerCardBorder"></div>
                                    <div className="developerNameExp">
                                        <div className="developerName">
                                            <h2>{`${developer.firstName} ${developer.lastName}`}</h2>
                                            <p>{`${developer.developerExperience} year`}</p>
                                        </div>
                                        <div className="developerExp">
                                            <p>Available</p>
                                        </div>
                                    </div>

                                    <div className="developerTech">
                                        <h6>Techstack</h6>
                                        <div className="developerTechNames">
                                            {developer.developerTechnologies.map((tech) => {
                                                return <p>{tech.technologyName}</p>
                                            })}
                                        </div>
                                    </div>

                                    <div className="developerBudgetResume">
                                        <div className="developerBudget">
                                            <div>
                                                <p>Budget</p>
                                                <h6>{`$${developer.developerPriceRange}-$${developer.developerPriceRange + 3 * 1000}`}</h6>
                                            </div>
                                            <div>
                                                <p>Timeline</p>
                                                <h6>{developer.developerAvailability === -1 ? `Immediately Avaialable` : `${developer.developerAvailability} Weeks`}</h6>
                                            </div>
                                        </div>
                                        <div className="developerResume">
                                            <div>
                                                <img src={document} alt="" />
                                                <button onClick={()=> window.open(`${developer.developerDocuments[0].documentLink}`, "_blank")} ><i class="fa fa-upload" aria-hidden="true"></i>Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DeveloperList
