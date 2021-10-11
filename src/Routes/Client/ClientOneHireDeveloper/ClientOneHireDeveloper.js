import React, { useEffect, useState } from "react";
import "./ClientOneHireDeveloper.css"
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import * as helper from '../../../shared/helper';
import Spinner from '../../../Components/Spinner/Spinner';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar'
import PhoneImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/phone_icon.svg';
import Group from '../../../assets/images/Newestdashboard/Client-one-hire-developer/Group.svg';
import UpImage1 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/UpImage1.svg';
import DownImage2 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/DownImage2.svg';
import UpBigImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/UpBigImage.svg';
import DownBigImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/DownBigImage.svg';
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
            {loading ? <Spinner /> :
                <div className="main_parent_clientOneHireDeveloper">
                    <Navbar />
                    <img className="upImage1_clientOneHireDeveloper" src={UpImage1} alt="upImage1" />
                    <img className="upImage2_clientOneHireDeveloper" src={UpBigImage} alt="upImage1" />
                    <img className="downImage3_clientOneHireDeveloper" src={DownImage2} alt="upImage1" />
                    <img className="downImage4_clientOneHireDeveloper" src={DownBigImage} alt="upImage1" />
                    <div className="respondCards_clientOneHireDeveloper">
                        <Back name="Matched Agencies" />
                        <div className="moreAgency_parent">
                            {(singleHiredDeveloper?.agenciesMatched?.length > 0) ?
                                singleHiredDeveloper?.agenciesMatched?.map(agency => {
                                    return (
                                        <>
                                            <div className="moreAgencyList new_design_clientOneHireDeveloper">
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
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                :
                                <div style={{ padding: "1rem" }}><h2>Sorry No Matched Agencies Found.</h2></div>}
                        </div>
                    </div>
                </div>
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
