import React, { useEffect, useState } from "react";
import "./GetOneHiredDeveloper.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
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
    // const arr = [
    //     {
    //         title: "Food",
    //     },
    //     {
    //         title: "Meal Subscription",
    //     },
    //     {
    //         title: "Online Orderdering",
    //     },
    //     {
    //         title: "Menu & Reviews",
    //     },
    // ];

    const getOneDeveloper = () => {
        setLoading(true);
        instance
            .get(`/api/${Role}/hire-developers/get/${hireDeveloperId}`)
            .then(function (response) {
                console.log(Array.isArray(response));
                console.log(typeof (response))
                setSingleHiredDeveloper(response);
                setLoading(false);
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

    useEffect(() => {
        getOneDeveloper();
        getAgencyDeveloper();
    }, []);

    useEffect(() => {
        console.log(singleHiredDeveloper);
        console.log(Array.isArray(singleHiredDeveloper));
        console.log(typeof (singleHiredDeveloper));
        // if (singleHiredDeveloper.length > 0) {
        //     console.log(singleHiredDeveloper?.agencyMatched[0])
        // }
    }, [singleHiredDeveloper])

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
                    <div className="respondCards">
                        <div className="innerResponseCard">
                            <span className="leftLine"></span>
                            <div>
                                <p>Created at</p>
                                {/* <p>{singleHiredDeveloper?.length > 0 && singleHiredDeveloper?.agencyMatched[0].createdAt}</p> */}
                            </div>
                            <div>
                                <p>Updated At</p>
                                {/* <p>{singleHiredDeveloper?.length > 0 && singleHiredDeveloper?.agencyMatched[0].updatedAt}</p> */}
                            </div>
                            <div>
                                <p>agencyId</p>
                                {/* <p>{singleHiredDeveloper?.length > 0 && singleHiredDeveloper?.agencyMatched[0].agencyId}</p> */}
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
                                <p>{singleHiredDeveloper?.developerTechnologiesRequired}</p>
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
                            <div>
                                <p>id</p>
                                <p>{singleHiredDeveloper?._id}</p>
                            </div>
                            <div>
                                <p>Developer Resume</p>
                                <p>{singleHiredDeveloper.length > 0 && singleHiredDeveloper.agencyMatched[0].developerResumes}</p>
                            </div>
                        </div>
                        {/* </div> */}

                        <div className="moreAgencies">
                            <div className="innerMoreAgencies">
                                <div className="moreAgencyHeading">
                                    <h3>Similar Developer</h3>
                                </div>
                                <div className="moreAgencyList">
                                    {
                                        agencyDeveloper.length > 0 && agencyDeveloper.map((value) => {
                                            return (
                                                <div style={{ cursor: 'pointer' }} onClick={() => props.history.push(`/get-one-hire-developer:${value._id}`)} className="moreAgencyCard">
                                                    <div className="moreAgencyLogo">
                                                        <div>
                                                            {/* <img src={logo} alt="" /> */}
                                                        </div>
                                                    </div>
                                                    <div className="moreAgencyInfo">
                                                        <h6>{value._id}</h6>
                                                        <p>{value.developerDesignation}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="moreAgencySeeMore">
                                    <p>See More</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*<div className="innerAgencyQuotation">
                    <div className="quotationleftLine"></div>
                    <div className="agencyQuotationHeader">
                        <div className="agencyQuotationHeading">
                            <h2>Quotation Details</h2>
                        </div>
                    </div>

                    <div className="agencyQuotationDesc">
                        <h4>Comments and Replies</h4>
                    </div>

                    <div className="agencyQuestions">
                        <div>
                            <h4>Fixed Budget</h4>
                            <ul>
                                <li>Min $5000</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Estimated Timeline</h4>
                            <ul>
                                <li>45days</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Technology</h4>
                            <ul>
                                {props?.projectTechnologiesRequired?.map((p) => {
                                    return <li>{p?.technologyName}</li>;
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4>Technology</h4>
                            <ul>
                                {props?.projectTechnologiesRequired?.map((p) => {
                                    return <li>{p?.technologyName}</li>;
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4>Technology</h4>
                            <ul>
                                {props?.projectTechnologiesRequired?.map((p) => {
                                    return <li>{p?.technologyName}</li>;
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4>Technology</h4>
                            <ul>
                                {props?.projectTechnologiesRequired?.map((p) => {
                                    return <li>{p?.technologyName}</li>;
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4>{singleHiredDeveloper?.projectFiles}</h4>
                            <p>-</p>
                        </div>
                    </div>
                            </div>*/}
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
