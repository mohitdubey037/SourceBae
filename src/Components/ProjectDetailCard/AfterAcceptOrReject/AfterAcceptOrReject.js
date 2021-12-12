import React from "react";
import Moment from "react-moment";
import RejectedImage from '../../../assets/images/Newestdashboard/Rejection_reason/rejectedImage.jpg';
import completedImage from "../../../assets/images/Newestdashboard/Project_completed/agency_detail_completed.svg";
import loadingStatus from "../../../assets/images/Newestdashboard/Not_found/loading_status.jpg";
import './AfterAcceptOrReject.css';

function afterAcceptOrReject(props) {
    return (
        <div className="respondedDetails_afterCompletion">
            <div className="project-details">
                <h4>Project Details</h4>
            </div>
            <div className="details_with_rejected">
                <div className="project-details_child">
                    <div className="respondedDetails_afterCompletion_child1">
                        <div>
                            <div className="question" style={{ width: "62%" }}>
                                <p>{props?.role === "Client" ? "Client" : "Agency"}</p>
                            </div>
                            <div className="answer">
                                <p>{props?.companyName}</p>
                            </div>
                        </div>

                        <div>
                            <div className="question" style={{ width: "62%" }}>
                                <p>{props?.role === "Client" ? "Agency" : "Client"}</p>
                            </div>
                            <div className="answer">
                                <p>
                                    {props.agencyOrClientName}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="question" style={{ width: "62%" }}>
                                <p>Final Cost</p>
                            </div>
                            <div className="answer">
                                <p>
                                    $ {props?.finalCost}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="respondedDetails_afterCompletion_child2">
                        <div>
                            <div className="question after">
                                <p>Project Creation Date</p>
                            </div>
                            <div className="answer">
                                <p>
                                    <Moment format="D MMM YYYY" withTitle>
                                        {props?.projectCreationDate}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                        {props?.expectedTimeline !== 0 && (
                            <div>
                                <div className="question after">
                                    <p>Expected Timeline</p>
                                </div>
                                <div className="answer">
                                    <p>{`${props?.expectedTimeline} Days`}</p>
                                </div>
                            </div>
                        )}
                        <div>
                            <div className="question after">
                                <p>Project Type</p>
                            </div>
                            <div className="answer">
                                <p>{props?.projectType}</p>
                            </div>
                        </div>
                    </div>
                    <div className="project_is_completed_parent">
                        <div className="project_is_completed">
                            {
                                props.isQuotationAcceptedByClient && props.isQuotationAcceptedByAgency ?
                                    <p>Project is started from both side</p>
                                    :
                                    props.isQuotationAcceptedByClient ?
                                        <p>{`Project is started from ${props.role === 'Client' ? "You" : "Client"}`}</p>
                                        :
                                        props.isQuotationAcceptedByAgency ?
                                            <p>{`Project is started from ${props.role === 'Agency' ? "You" : "Agency"}`}</p>
                                            :
                                            props.isProjectRejectedByClient === undefined || props.isProjectRejectedByAgency &&
                                            <p>Project is started from both side</p>
                            }
                        </div>
                    </div>
                </div>
                {(props.isQuotationAcceptedByClient === true && props.isQuotationAcceptedByClient === true) ?
                    <img className="completedImage" src={completedImage} alt="completedImage" />
                    :
                    (props.isQuotationAcceptedByClient === false || props.isQuotationAcceptedByClient === false) ?
                        <img className="completedImage" src={loadingStatus} alt="completedImage" />
                        :
                        (props.isProjectRejectedByClient !== undefined || props.isProjectRejectedByAgency !== undefined) &&
                        // <div className="rejected_image">
                            <img className="completedImage" src={RejectedImage} alt="completedImage" />
                        // </div>
                }
                {/* {(props.isProjectRejectedByClient !== undefined || props.isProjectRejectedByAgency !== undefined) &&
                    <div className="rejected_image">
                        <img src={RejectedImage} alt="completedImage" />
                    </div>
                } */}
            </div>
        </div>
    )
}


export default afterAcceptOrReject;