import React from "react";
import Moment from "react-moment";
import './ProjectDetailCard.css';

import { AGENCY } from "../../../shared/constants";

function ProjectDetailCard(props) {
    return (
        <>
            <div className="respondCards_AgencyRespondedDetails">
                <div className="innerResponseCard">
                    <span className="leftLine"></span>
                    <div>
                        <p>{`${props.role === AGENCY ? 'Client' : 'Agency'}`}</p>
                        <p>{props.name}</p>
                    </div>
                    <div>
                        <p>Expected Timeline</p>
                        <p>{`${props.expectedTimeline} Days`}</p>
                    </div>
                    <div>
                        <p>Project Proposal Cost</p>
                        <p>{`$${props.projectProposalCost}`}</p>
                    </div>
                    <div>
                        <p>Agency Experience</p>
                        <p>{props.agencyExperience}</p>
                    </div>
                </div>
                <div className="innerResponseCard">
                    <span className="leftLine"></span>
                    <div>
                        <p>Project Type</p>
                        <p>{props.projectType}</p>
                    </div>

                    <div>
                        <p>Shortlisted</p>
                        <p>{props.isShortListed ? "Yes" : "No"}</p>
                    </div>
                    <div>
                        <p>Quotation Asked</p>
                        <p>{props.isAskedForQuotation ? "Yes" : "No"}</p>
                    </div>
                    <div>
                        <p>Project Creation Date</p>
                        <p>
                            <Moment format="D MMM YYYY" withTitle>
                                {props.createdAt}
                            </Moment>
                        </p>
                    </div>
                    {props.projectEndDate &&
                        <div>
                            <p>Project End Date</p>
                            <p>
                                <Moment format="D MMM YYYY" withTitle>
                                    {props.projectEndDate}
                                </Moment>
                            </p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProjectDetailCard;