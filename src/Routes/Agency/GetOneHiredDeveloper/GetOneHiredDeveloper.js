/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./GetOneHiredDeveloper.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import Spinner from '../../../Components/Spinner/Spinner';
import Navbar from '../../Dashboard/Navbar';

function RespondedDetails(props) {
    let { hireDeveloperId } = useParams();
    const routerHistory = useHistory();

    const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);

    const [loading, setLoading] = useState(false);

    const Role = localStorage.getItem("role");
    const [selectedDevelopers, setSelectedDevelopers] = useState([])
    const userId = localStorage.getItem("userId")
    const getOneDeveloper = () => {
        setLoading(true);
        instance
            .get(`/api/${Role}/hire-developers/get/${hireDeveloperId}?agencyId=${userId}`)
            .then(function (response) {
                setSingleHiredDeveloper(response);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const shareDeveloper = (hireDevId) => {
        setLoading(true);
        const body = {
            agencyId: localStorage.getItem('userId'),
            reply: "Find the devlopers' Resume",
            developersShared: selectedDevelopers
        }
        instance
            .patch(`/api/${Role}/hire-developers/share-developer/${hireDevId}`, body)
            .then(function (response) {
                setLoading(false);
                props.history.push('/get-hire-developer')
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const handleDevelopers = (developerId)=>{
        
        const index = selectedDevelopers.indexOf(developerId)
        if(index===-1){
            const arr = [...selectedDevelopers, developerId]
            setSelectedDevelopers(arr)
        }
        else{
            const arr = [...selectedDevelopers]
            const filtered = arr.filter((value,filterIndex)=> filterIndex!==index)
            setSelectedDevelopers(filtered)
        }
    }

    useEffect(()=>{
    },[selectedDevelopers])
    useEffect(() => {
        getOneDeveloper();
    }, []);

    return (
        <>
            <Navbar />
            {loading ? <Spinner /> :
                <>
                    <div
                        style={{ marginTop: "55px" }}
                        className="backArrow"
                        onClick={() => routerHistory.goBack()}
                    >
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>

                    <div style={{display:"flex", alignItems:"center",justifyContent:"center",margin:"2rem"}}>
                        <h2>Developer Requirements</h2>
                    </div>
                    <div className="respondCard">
                        <div className="innerResponseCar">
                            <div>
                                <p>Requirement Name</p>
                                <p>{`${singleHiredDeveloper?.clientId?.firstName||""} ${singleHiredDeveloper?.clientId?.lastName||""}`}</p>
                            </div>
                            <div>
                                <p>Budget</p>
                                <p>{singleHiredDeveloper?.averageBudget}</p>
                            </div>
                            <div>
                                <p>Developer Experience Required</p>
                                <p>{singleHiredDeveloper?.developerExperienceRequired}</p>
                            </div>
                            <div>
                                <p>Contract Period</p>
                                <p>{singleHiredDeveloper?.contractPeriod}</p>
                            </div>
                            <div>
                                <p>Developer Technologies Required</p>
                                {singleHiredDeveloper?.developerTechnologiesRequired?.length>0 && singleHiredDeveloper?.developerTechnologiesRequired?.map((tech)=>{
                                    return <p>{tech.technologyName}</p>
                                })}
                                
                            </div>
                            <div>
                                <p>Expected StartDate</p>
                                <p>{singleHiredDeveloper?.expectedStartDate}</p>
                            </div>
                            <div>
                                <p>Number Of Resources Required</p>
                                <p>{singleHiredDeveloper?.numberOfResourcesRequired}</p>
                            </div>
                            <div>
                                <p>Preferred Billing Mode</p>
                                <p>{singleHiredDeveloper?.preferredBillingMode}</p>
                            </div>
                        </div>
                        {/* </div> */}

                        <div className="moreAgency">
                            <div className="innerMoreAgency">
                            {(singleHiredDeveloper?.agenciesMatched?.length > 0 && singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.length>0) ? 
                                <>
                                <div className="moreAgencyHeading">
                                    <h3>Matched Developer</h3>
                                </div>
                                <div className="moreAgencyList">
                                    {
                                        singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.map((developer) => {
                                            return (
                                                <div style={{ cursor: 'pointer' }} onClick={() => props.history.push(`/get-one-hire-developer:${developer._id}`)} className="moreAgencyCard">
 
                                                    <div className="moreAgencyIn">
                                                        <h6>{`${developer?.developerId?.firstName} ${developer?.developerId?.lastName}`}</h6>
                                                        <p>{developer?.developerId?.developerDesignation}</p>
                                                    </div>
                                                    <div className="moreAgencyL" style={{display:"flex", justifyContent: "center"}}>
                                                  
                                                 {developer?.developerId?.developerDocuments?.length>0 &&  <a href= {developer?.developerId?.developerDocuments[0]?.documentLink} target="  "> <button style={{backgroundColor:"#135cbb",  marginRight:"1rem"}}>View Resume</button></a>}

                                                       {selectedDevelopers.indexOf(developer._id)===-1 ?
                                                        <button style = {{marginRight:"1rem"}} onClick={()=>handleDevelopers(developer._id)}>Select Developer</button>
                                                        :
                                                        <button style = {{backgroundColor:"#c90900"}} onClick={()=>handleDevelopers(developer._id)}>Remove Developer</button>
                                                       }
                                                       
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="moreAgencySeeMore_GetOneHiredDeveloper">
                                    <button onClick={()=>shareDeveloper(singleHiredDeveloper._id)}>Process Selected Developers</button>
                                </div>
                                </>
                                :
                                    <div>"Great! You have already shared the resume."</div>}
                            </div>
                        </div>           
                    </div>
                </>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
        condition: state.condition,
    };
};

export default connect(mapStateToProps)(RespondedDetails);
