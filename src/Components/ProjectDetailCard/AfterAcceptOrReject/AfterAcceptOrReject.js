import React from "react";
import Moment from "react-moment";
import RejectedImage from '../../../assets/images/Newestdashboard/Rejection_reason/rejectedImage.jpg';
import completedImage from "../../../assets/images/Newestdashboard/Project_completed/agency_detail_completed.svg";
import loadingStatus from "../../../assets/images/Newestdashboard/Not_found/loading_status.jpg";
import './AfterAcceptOrReject.css';
import {CLIENT, AGENCY} from "../../../shared/constants";

function afterAcceptOrReject({ projectProposals, role, companyName }) {

    return (
        <div className="respondedDetails_afterCompletion">
            <div className="project-details">
                <h4>Chat Details</h4>
            </div>
            <div className="details_with_rejected">
                <div className="project-details_child">
                    <div className="respondedDetails_afterCompletion_child1">
                        <div>
                            <div className="question" style={{ width: "62%" }}>
                                <p>{role === CLIENT ? CLIENT : AGENCY}</p>
                            </div>
                            <div className="answer">
                                <p>{companyName}</p>
                            </div>
                        </div>
                        {projectProposals?.comments?.map(pp =>
                        (
                            <div>
                                <div className="question" style={{ width: "62%" }}>
                                    <p>{pp?.comment}</p>
                                </div>
                                <div className="answer">
                                    <p>{pp?.reply}</p>
                                </div>
                            </div>
                        )
                        )}
                        {projectProposals.agencyNegotiablePrice &&
                            <div>
                                <div className="question" style={{ width: "62%" }}>
                                    <p>Agency Negotiable Price</p>
                                </div>
                                <div className="answer">
                                    <p>{projectProposals?.agencyNegotiablePrice}</p>
                                </div>
                            </div>
                        }
                        {projectProposals.clientNegotiablePrice &&
                            <div>
                                <div className="question" style={{ width: "62%" }}>
                                    <p>Client Negotiable Price</p>
                                </div>
                                <div className="answer">
                                    <p>{projectProposals?.clientNegotiablePrice}</p>
                                </div>
                            </div>
                        }
                    </div>


                    <div className="project_is_completed_parent">
                        <div className="project_is_completed">
                            {
                                projectProposals?.isQuotationAcceptedByClient && projectProposals?.isQuotationAcceptedByAgency ?
                                    <p>Project is started from both side</p>
                                    :
                                    projectProposals?.isQuotationAcceptedByClient ?
                                        <p>{`Project is started from ${role === CLIENT ? "You" : "Client"}`}</p>
                                        :
                                        projectProposals?.isQuotationAcceptedByAgency ?
                                            <p>{`Project is started from ${role === AGENCY ? "You" : "Agency"}`}</p>
                                            :
                                            (projectProposals?.isProjectRejectedByClient === undefined || projectProposals?.isProjectRejectedByAgency) &&
                                            <p>Project is started from both side</p>
                            }
                        </div>
                    </div>
                </div>
                {(projectProposals?.isQuotationAcceptedByClient === true && projectProposals?.isQuotationAcceptedByClient === true) ?
                    <img className="completedImage" src={completedImage} alt="completedImage" />
                    :
                    (projectProposals?.isQuotationAcceptedByClient === false || projectProposals?.isQuotationAcceptedByClient === false) ?
                        <img className="completedImage" src={loadingStatus} alt="completedImage" />
                        :
                        (projectProposals?.isProjectRejectedByClient !== undefined || projectProposals?.isProjectRejectedByAgency !== undefined) &&

                        <img className="completedImage" src={RejectedImage} alt="completedImage" />

                }
            </div>
        </div >
    )
}


export default afterAcceptOrReject;