import React, { useEffect, useState } from "react";
import "./ClientOneHireDeveloper.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import * as helper from '../../../shared/helper';
import Spinner from '../../../Components/Spinner/Spinner';
import ClientNavbar from '../ClientNavbar';


function ClientOneHireDeveloper(props) {
    let { hireDeveloperId } = useParams();
    hireDeveloperId = helper.cleanParam(hireDeveloperId);
    const routerHistory = useHistory();

    const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);

    const [loading, setLoading] = useState(false);

    const Role = localStorage.getItem("role");
    const [selectedDevelopers, setSelectedDevelopers] = useState([])
    const userId = localStorage.getItem("userId")
    const getOneDeveloper = () => {
        setLoading(true);
        instance
            .get(`/api/${Role}/hire-developers/get/${hireDeveloperId}?clientId=${userId}`)
            .then(function (response) {
                setSingleHiredDeveloper(response);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };


    const handleDevelopers = (agencyId)=>{
      props.history.push({
        pathname: `/shared-developers/:${hireDeveloperId}/:${agencyId}`,
        condition: `Client`
    })
    }

    useEffect(()=>{
        console.log(selectedDevelopers,"selected dev")
    },[selectedDevelopers])
    useEffect(() => {
        getOneDeveloper();
    }, []);

    return (
        <>
            <ClientNavbar />
            {loading ? <Spinner /> :
                <>
                    <div
                        style={{ marginTop: "55px" }}
                        className="backArrow"
                        onClick={() => routerHistory.goBack()}
                    >
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>
                    <div className="respondCards_clientOneHireDeveloper">

                        <div className="moreAgencies_clientOneHireDeveloper">
                            <div className="innerMoreAgencies_clientOneHireDeveloper">
                            {(singleHiredDeveloper?.agenciesMatched?.length > 0) ? 
                                <>
                                <div className="moreAgencyHeading">
                                    <h3>Matched Agencies</h3>
                                </div>
                                <div className="moreAgencyList">
                                    {
                                        singleHiredDeveloper?.agenciesMatched?.map((agency) => {
                                            return (
                                                <div style={{ cursor: 'pointer' }} className="moreAgencyCard">
 
                                                    <div className="moreAgencyInfo">
                                                        <h6>{`${agency?.agencyId?.agencyName}`}</h6>
                                                        <p>{agency?.agencyId?.agencyPhone}</p>
                                                        <p>{agency?.agencyId?.agencyEmail}</p>
                                                    </div>
                                                    <div className="moreAgencyLogo">
                                                        <button onClick={()=>handleDevelopers(agency?.agencyId?._id)}>Check Resources</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                </>
                                :
                                    <div style={{padding:"1rem"}}><h2>Sorry No Matched Agencies Found.</h2></div>}
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

export default connect(mapStateToProps)(ClientOneHireDeveloper);
