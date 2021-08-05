import React, { useEffect, useState } from "react";
import "./ClientOneHireDeveloper.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import * as helper from '../../../shared/helper';
import Spinner from '../../../Components/Spinner/Spinner';
import ClientNavbar from '../ClientNavbar';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar'
import PhoneImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/phone_icon.svg';
import Group from '../../../assets/images/Newestdashboard/Client-one-hire-developer/Group.svg';

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
                console.log(response);
                setSingleHiredDeveloper(response);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };


    const handleDevelopers = (agencyId) => {
        props.history.push({
            pathname: `/shared-developers/:${hireDeveloperId}/:${agencyId}`,
            condition: `Client`
        })
    }

    useEffect(() => {
        console.log(selectedDevelopers, "selected dev")
    }, [selectedDevelopers])
    useEffect(() => {
        console.log(singleHiredDeveloper, "selected dev")
    }, [singleHiredDeveloper])
    useEffect(() => {
        getOneDeveloper();
    }, []);

    const routeDirect = () => {
        console.log('hi')
        if (singleHiredDeveloper?.agenciesMatched?.length > 0) {
            props.history.push({
                pathname: `/agency-profile:${singleHiredDeveloper?.agenciesMatched[0]._id}`,
                condition: 'Client'
            })
        }
    }

    return (
        <>
            <Navbar />
            {loading ? <Spinner /> :
                <>
                    {/* <div
                        style={{ marginTop: "55px" }}
                        className="backArrow"
                        onClick={() => routerHistory.goBack()}
                    >
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div> */}
                    <div className="respondCards_clientOneHireDeveloper">

                        <div className="moreAgencies_clientOneHireDeveloper">
                            <div className="innerMoreAgencies_clientOneHireDeveloper">
                                {(singleHiredDeveloper?.agenciesMatched?.length > 0) ?
                                    <>
                                        <div style={{ paddingBottom: '1%' }} className="moreAgencyHeading">
                                            <h3>Matched Agencies</h3>
                                        </div>
                                        <div className="moreAgencyList new_design_clientOneHireDeveloper">
                                            {
                                                singleHiredDeveloper?.agenciesMatched?.map((agency) => {
                                                    return (
                                                        <div style={{ cursor: 'pointer', flexDirection: 'column' }} className="moreAgencyCard">

                                                            <div className="moreAgencyInfo">
                                                                <h6 style={{ width: '70%' }} className="text-center name-Font">{`${agency?.agencyId?.agencyName}`}</h6>
                                                                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', width: '36%', marginLeft: '40px' }}>
                                                                    <img src={PhoneImage} alt="phone_image" />
                                                                    <p>{agency?.agencyId?.agencyPhone}</p>
                                                                </div>
                                                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '57%', marginLeft: '40px' }}>
                                                                    <img src={Group} alt="group" />
                                                                    <p>{agency?.agencyId?.agencyEmail}</p>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <div style={{
                                                                    background: '#F2F2F2',
                                                                    border: '1px solid #DCD3D3',
                                                                    borderRadius: '5.54545px',
                                                                    padding: '10px',
                                                                    width: '34%',
                                                                    marginTop: '20px',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }} className="moreAgencyLogo">
                                                                    <button onClick={() => handleDevelopers(agency?.agencyId?._id)}>Check Resources</button>
                                                                </div>
                                                                <div style={{
                                                                    background: '#F2F2F2',
                                                                    border: '1px solid #DCD3D3',
                                                                    borderRadius: '5.54545px',
                                                                    padding: '10px',
                                                                    width: '34%',
                                                                    marginTop: '20px',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    marginLeft: '30px'
                                                                }} className="moreAgencyLogo">
                                                                    <button onClick={() => routeDirect()}>Show Details</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                    :
                                    <div style={{ padding: "1rem" }}><h2>Sorry No Matched Agencies Found.</h2></div>}
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
