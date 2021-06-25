import React, { useEffect, useState } from "react";
import "./GetOneHiredDeveloper.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import * as helper from '../../../shared/helper';
import Spinner from '../../../Components/Spinner/Spinner';
import Navbar from '../../Dashboard/Navbar';

function RespondedDetails(props) {
    let { hireDeveloperId } = useParams();
    hireDeveloperId = helper.cleanParam(hireDeveloperId);
    const routerHistory = useHistory();

    const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);
    const [agencyDeveloper, setAgencyDeveloper] = useState([]);

    const [loading, setLoading] = useState(false);

    const Role = localStorage.getItem("role");
    const [selectedDevelopers, setSelectedDevelopers] = useState([])
    const userId = localStorage.getItem("userId")
    const getOneDeveloper = () => {
        setLoading(true);
        instance
            .get(`/api/${Role}/hire-developers/get/${hireDeveloperId}?agencyId=${userId}`)
            .then(function (response) {
                console.log(response);
                // console.log(Array.isArray(response));
                // console.log(typeof (response))
                // console.log(response)
                setSingleHiredDeveloper(response);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
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
                console.log(response);
                setLoading(false);
                props.history.push('/get-hire-developer')
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const getAgencyDeveloper = () => {
        instance.get(`/api/${Role}/developers/all`)
            .then(function (response) {
                console.log(response)
                setAgencyDeveloper(response)
            })
            .catch(err => {
                console.log(err?.response?.data?.message)
            })
    }

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
        console.log(selectedDevelopers,"selected dev")
    },[selectedDevelopers])
    useEffect(() => {
        getOneDeveloper();
        getAgencyDeveloper();
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
                    <div className="respondCard">
                        <div className="innerResponseCar">
                            <span className="leftLine"></span>
                            <div>
                                <p>Client Name</p>
                                <p>{`${singleHiredDeveloper?.clientId?.firstName||""} ${singleHiredDeveloper?.clientId?.lastName||""}`}</p>
                            </div>
                            <div>
                                <p>Budget</p>
                                <p style={{ fontWeight: "600" }}>{singleHiredDeveloper?.averageBudget}</p>
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
                            {!(singleHiredDeveloper?.agencyMatched?.length > 0 && singleHiredDeveloper?.agencyMatched[0]?.developersShared?.length>0) ? 
                                <>
                                <div className="moreAgencyHeading">
                                    <h3>Matched Developer</h3>
                                </div>
                                <div className="moreAgencyList">
                                    {
                                        agencyDeveloper.length > 0 && agencyDeveloper.map((value) => {
                                            return (
                                                <div style={{ cursor: 'pointer' }} onClick={() => props.history.push(`/get-one-hire-developer:${value._id}`)} className="moreAgencyCard">
 
                                                    <div className="moreAgencyIn">
                                                        <h6>{value._id}</h6>
                                                        <p>{value.developerDesignation}</p>
                                                    </div>
                                                    <div className="moreAgencyL">
                                                       {selectedDevelopers.indexOf(value._id)===-1 ?
                                                        <button onClick={()=>handleDevelopers(value._id)}>Select Developer</button>
                                                        :
                                                        <button style = {{backgroundColor:"#c90900"}} onClick={()=>handleDevelopers(value._id)}>Remove Developer</button>
                                                       }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="moreAgencySeeMore">
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
