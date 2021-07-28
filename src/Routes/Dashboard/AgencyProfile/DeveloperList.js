/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './DeveloperList.css'
import document from '../../../assets/images/Logo/document.png';
import instance from "../../../Constants/axiosConstants";
import { useHistory } from 'react-router-dom';
import NO_Data_ICON from '../no_data_icon.jpg';
import addDeveloper from '../../../assets/images/AgencyProfile/addDeveloper.png'

function DeveloperList(props) {
    const routerHistory = useHistory();
    const Role = localStorage.getItem('role')
    const agencyId = localStorage.getItem("userId")
    const [developers, setDevelopers] = useState([])
    const [err, setErr] = useState();

    const [agencyProfiledata, setAgencyProfileData] = useState({});
    const getAgencyDevelopers = () => {
        instance.get(`/api/${Role}/developers/all?agencyId=${agencyId}`)
            .then(function (response) {
                setDevelopers(response)
            })
            .catch(err => {
                console.error(err?.response?.data?.message)
                setErr(err?.response?.data?.message)
            })
    };
    useEffect(() => {
        getAgencyDevelopers()
    }, [])

    const getAgencyProfile = (agencyId, profileviewStatus) => {
        let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
        instance.get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
            .then(function (response) {
                console.log(response);
                setAgencyProfileData(response);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        if (Role === 'Agency') {
            getAgencyProfile(agencyId, false);
        }
    }, []);



    return (
        <>
            <div className="mainDeveloperList">
                <div className="innerDeveloperList">
                    {err ?
                        <>
                            <div style={{ textAlign: 'center', width: '100%' }}>
                                <img height="300px" src={NO_Data_ICON} alt="no_data_img" />
                                <h6>{err}</h6>
                            </div>
                        </>
                        :
                        developers.map((developer) => {
                            return (
                                <div className="developerCard">
                                    <div className="developerNameExp">
                                        <div className="developerName">
                                            <h2>{`${developer.firstName} ${developer.lastName}`}</h2>
                                            {/* <p>{`${developer.developerExperience} year`}</p> */}
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
                                            <div className="developer-detail">
                                                <div>
                                                    <p>Budget</p>
                                                    <h6>{`$${developer.developerPriceRange}-$${developer.developerPriceRange + 3 * 1000}`}</h6>
                                                </div>
                                                <div>
                                                    <p>Timeline</p>
                                                    <h6>{developer.developerAvailability === -1 ? `Immediately Avaialable` : `${developer.developerAvailability} Weeks`}</h6>
                                                </div>
                                            </div>
                                            <div className="developer-detail">
                                                <div>
                                                    <p>Experience</p>
                                                    <h6>{`${developer.developerExperience} year`}</h6>
                                                </div>
                                                <div className="developerResume">
                                                    <button onClick={() => window.open(`${developer.developerDocuments[0].documentLink}`, "_blank")} >Download</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {Role === 'Agency' ?
                        agencyProfiledata.isAgencyVerified &&
                        <div className="developerCard" onClick={() => routerHistory.push("/add-developer")}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 255, cursor: 'pointer' }}>
                                <img src={addDeveloper} alt="" style={{ width: '25%', objectFit: 'contain' }} />
                                <h6 className="addDeveloperText">Add Developer</h6>
                            </div>
                        </div>
                        : null
                    }
                </div>

            </div>
        </>
    );
}

export default DeveloperList
