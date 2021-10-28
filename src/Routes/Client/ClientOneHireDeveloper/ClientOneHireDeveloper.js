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
    // const routerHistory = useHistory();
    let { hireDeveloperId } = useParams();

    hireDeveloperId = helper.cleanParam(hireDeveloperId);
    const Role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    const [selectedDevelopers, setSelectedDevelopers] = useState([])
    const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disability, setDisability] = useState(false);
    const [form, setForm] = useState({
        isShortListed: true,
        agencyId: ''
    })


    const getOneDeveloper = () => {
        setLoading(true);
        instance.get(`/api/${Role}/hire-developers/get/${hireDeveloperId}?clientId=${userId}`)
            .then(function (response) {
                console.log(response);
                setSingleHiredDeveloper(response);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };


    const handleDevelopers = (agencyId) => {
        // props.history.push({
        //     pathname: `/shared-developers/:${hireDeveloperId}/:${agencyId}`,
        //     condition: `Client`
        // })
        instance.post(`/api/agency/hire-developers/update-matched-agency/${hireDeveloperId}}`, form)
            .then(res => {
                setDisability(true);
            })
    }

    useEffect(() => {
    }, [selectedDevelopers, singleHiredDeveloper]);

    useEffect(() => {
        getOneDeveloper();
    }, []);

    const routeDirect = () => {
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
                                                    <div className="agencyDesc_clientOneHireDeveloper">
                                                        <h6 className="name-title">About the company:{" "}</h6>
                                                        <h6 className="name-Font">{`${agency?.agencyId?.agencyName}`}</h6>
                                                    </div>
                                                    {/* <div className="phone_clientOneHireDeveloper">
                                                            <img src={PhoneImage} alt="phone_image" />
                                                            <p>{agency?.agencyId?.agencyPhone}</p>
                                                        </div> */}
                                                    <div className="email_clientOneHireDeveloper">
                                                        {/* <img src={Group} alt="group" /> */}
                                                        <p>Description:</p>
                                                        <p className="description_sharedDeveloper">{agency?.agencyId?.agencyDescription}</p>
                                                    </div>
                                                </div>

                                                <div className="button_parent">
                                                    <button onClick={() => handleDevelopers(agency?.agencyId?._id)} className="moreAgencyLogo checkResource">
                                                        <p>Get connected to the company</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                                :
                                <div className="no_matched_agency"><h2>Sorry No Matched Agencies Found.</h2></div>}
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
