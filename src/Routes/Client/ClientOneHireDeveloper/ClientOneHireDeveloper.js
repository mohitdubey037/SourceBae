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
// import Polygon1 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/Polygon2.svg';
// import Polygon2 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/Polygon.svg';
import Back from "../../../Components/Back/Back";

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
            <div className="margin-top conditional_back_parent">
                <Back name="Matched Agencies" />
            </div>
            {loading ? <Spinner /> :
                <>
                    <div className="respondCards_clientOneHireDeveloper">
                        {/* <div className="moreAgencyHeading">
                                <h3>Matched Agencies</h3>
                            </div> */}
                        {(singleHiredDeveloper?.agenciesMatched?.length > 0) ?
                            singleHiredDeveloper?.agenciesMatched?.map(agency => {
                                return (
                                    <>
                                        <div className="moreAgencyList new_design_clientOneHireDeveloper">
                                            {/* <div className="polygon1">
                                                <img src={Polygon1} alt="Polygon1" />
                                            </div>
                                            <div className="polygon2">
                                                <img src={Polygon2} alt="Polygon2" />
                                            </div> */}
                                            <div className="moreAgencyInfo">
                                                <h6 className="name-Font">{`${agency?.agencyId?.agencyName}`}</h6>
                                                <div>
                                                    <div className="phone_clientOneHireDeveloper">
                                                        <img src={PhoneImage} alt="phone_image" />
                                                        <p>{agency?.agencyId?.agencyPhone}</p>
                                                    </div>
                                                    <div className="email_clientOneHireDeveloper">
                                                        <img src={Group} alt="group" />
                                                        <p>{agency?.agencyId?.agencyEmail}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="button_parent">
                                                <div onClick={() => handleDevelopers(agency?.agencyId?._id)} className="moreAgencyLogo checkResource">
                                                    <p>Check Resources</p>
                                                </div>
                                                {/* <div onClick={() => routeDirect()} className="moreAgencyLogo show-details">
                                                    <p>Show Details</p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </>
                                )
                            })

                            :
                            <div style={{ padding: "1rem" }}><h2>Sorry No Matched Agencies Found.</h2></div>}
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
