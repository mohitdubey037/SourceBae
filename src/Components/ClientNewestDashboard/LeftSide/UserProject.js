import './UserProject.css';
import React, { useEffect, useState } from "react";
import CenterImage from '../../../assets/images/Newestdashboard/Dashboard/Center_Image.svg';
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom';
import Tooltip from "react-power-tooltip";
import QuotationAccept from '../../../assets/images/Newestdashboard/Dashboard/quotation_req.svg';
import ShowProject from '../../../assets/images/Newestdashboard/Dashboard/detail_show.svg';
import MessageReceived from '../../../assets/images/Newestdashboard/Dashboard/message_received.svg';
import MessageRejected from '../../../assets/images/Newestdashboard/Dashboard/rejected.jpg';

function UserProject({index,...rest}) {
    
    let props=rest;
    const routerHistory = useHistory();

    const showDetail = () => {
        if (props?.projectProposals[0]?.isQuotationAcceptedByClient === true && props?.projectProposals[0]?.isQuotationAcceptedByAgency === true) {
            routerHistory.push(`/project-details/${props._id}/${props.projectProposals[0].agencyId._id}`);
        }
        else {
            routerHistory.push(`/agency-list/${props._id}`)
        }
    }

    const [isPopover, setIsPopover] = useState(false);
    const [popindex, setPopIndex] = useState("");

    return (
        <div onClick={showDetail} style={{marginTop: index < 2 ? '1rem' : '0'}} className="project-details-card">
            <div className="detailsCard-header">
                <div className="header-heading">
                    <h6>{props?.projectName}</h6>
                </div>
                {props?.projectProposals[0]?.isQuotationAcceptedByClient === true && props?.projectProposals[0]?.isQuotationAcceptedByAgency &&
                    <i className="projectCompleted_userProject fas fa-check"></i>
                }
            </div>
            <div className="detailsCard-date">
                <h6>Last Edit On: <span className="date-color"><Moment format="D MMM YYYY" withTitle>{props?.updatedAt}</Moment></span></h6>
            </div>

            <div className="centerImage">
                {(props?.projectProposals[0]?.isQuotationAcceptedByClient && props?.projectProposals[0]?.isQuotationAcceptedByAgency) ?
                    <img className="receivedImage" src={MessageReceived} alt="centerIcon" />
                    :
                    (props.projectProposals[0]?.rejectReasonByClient != undefined || props.projectProposals[0]?.rejectReasonByAgency != undefined)
                        ?
                        // <img src={CenterImage} alt='centerIcon' />
                        <img className="rejectedImage" src={MessageRejected} alt="centerIcon" />
                        :
                        <img className="receivedImage" src={CenterImage} alt='centerIcon' />

                }
                <div>
                    {props?.projectProposals[0]?.isCommentSectionActive ?
                        <div className="message_received">
                            <p style={{ color: '#007eff' }}>New Message is Received</p>
                            <i className="newMessageReceived_icon fas fa-envelope-open"></i>
                        </div>
                        :
                        props.projectProposals[0]?.rejectReasonByClient != undefined ?
                            <p className="anyoneRejected">Rejected By You</p>
                            :
                            props.projectProposals[0]?.rejectReasonByAgency != undefined ?
                                <p className="anyoneRejected">Rejected By Agency</p>
                                :
                                <p>{props.projectCurrentStatus}</p>
                    }
                </div>
            </div>

            <div className="projectDetail">
                {/* {props.projectProposals[0]?.rejectReasonByClient != undefined || props.projectProposals[0].rejectReasonByAgency != undefined ?
                    <div className="header-currentStatus">
                        <FaBan className="project_status_image"/>
                        <div className="currentStatus-text currentStatus-item">
                            <p>Rejected</p>
                        </div>
                    </div>
                    :
                    <div className="header-currentStatus">
                        <img className="project_status_image" src={QuotationAccept} alt="project status" />
                        <div className="currentStatus-text currentStatus-item">
                            <p>{props?.projectCurrentStatus}</p>
                        </div>
                    </div>
                } */}

                <div onClick={() => showDetail()} className="show-project-detail">
                    <div className="projectDetail-text projectDetail-item">
                        <p>Show Project Detail</p>
                    </div>
                    <img src={ShowProject} alt="project status" />
                </div>
            </div>
        </div>
    )
}

export default UserProject;
