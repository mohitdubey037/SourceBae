import './UserProject.css';
import React, { useEffect, useState } from "react";
import ProjectStatusIcon from "../../../assets/images/Newestdashboard/LeftSide/projectStatus-icon.svg";
import infoIcon from "../../../assets/images/Newestdashboard/LeftSide/info-icon.svg";
import showProjectDetailsIcon from "../../../assets/images/Newestdashboard/LeftSide/showProjectDetails-icon.svg";
import CenterImage from '../../../assets/images/Newestdashboard/Center/center_image.png';
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom';
import Tooltip from "react-power-tooltip";

function UserProject(props, index) {
    console.log(props);
    const routerHistory = useHistory();
    console.log(props);

    const showDetail = () => {
        if (props?.projectProposals[0]?.isQuotationAcceptedByClient === true && props?.projectProposals[0]?.isQuotationAcceptedByAgency === true) {
            routerHistory.push(`/project-details/${props._id}/${props.projectProposals[0].agencyId._id}`);
        }
        else {
            routerHistory.push(`/agency-list:${props._id}`)
        }
    }

    const [isPopover, setIsPopover] = useState(false);
    const [popindex, setPopIndex] = useState("");

    return (
        <div onClick={showDetail} className="project-details-card">
            <div className="projectDetailsStrip_long"></div>
            <div className="projectDetailsStrip_short"></div>
            <div className="detailsCard-header">
                <div className="header-heading">
                    <h6>{props?.projectName}</h6>
                </div>
                {/* <img src={infoIcon} alt="infoIcon" /> */}
                {props?.projectProposals[0]?.isQuotationAcceptedByClient === true && props?.projectProposals[0]?.isQuotationAcceptedByAgency ?
                    <i className="projectCompleted_userProject fas fa-check"></i>
                    :
                    <div className="tooltip_class"
                        onMouseOver={() => {
                            setIsPopover(true);
                            setPopIndex(index);
                        }}
                        onMouseLeave={() => setIsPopover(false)}
                    >
                        <i style={{ fontSize: 22, color: '#F57359' }} className="fa fa-info-circle"
                            aria-hidden="true"
                        ></i>
                        {/* ADD TOOLTIP HERE */}
                        {isPopover && popindex === index && (
                            <Tooltip
                                show={true}
                                position="bottom center"
                                textBoxWidth="120px"
                                animation="bounce"
                            >
                                <span>Some text</span>
                            </Tooltip>
                        )}
                    </div>
                }
            </div>
            <div className="detailsCard-date">
                <h6>Last Edit On: <span className="date-color"><Moment format="D MMM YYYY" withTitle>{props?.updatedAt}</Moment></span></h6>
            </div>

            <div className="centerImage">
                <img className={`${(props?.projectProposals[0]?.isQuotationAcceptedByClient && props?.projectProposals[0]?.isQuotationAcceptedByAgency) && "conditional_image_change"}`} src={CenterImage} alt='centerIcon' />
                <div>
                    {props?.projectProposals[0]?.isCommentSectionActive ?
                        <div className="message_received">
                            <p>New Message is Received</p>
                            <i className="newMessageReceived_icon fas fa-envelope-open"></i>
                        </div>
                        :
                        <p>{props?.projectCurrentStatus}</p>
                    }
                </div>
            </div>

            <div className="projectDetail">
                <div className="header-currentStatus">
                    <div className="currentStatus-text currentStatus-item">
                        <p>{props?.projectCurrentStatus}</p>
                    </div>
                    <img src={ProjectStatusIcon} alt="project status" />
                </div>

                <div onClick={() => showDetail()} className="show-project-detail">
                    <div className="projectDetail-text projectDetail-item">
                        <p>Show Project Detail</p>
                    </div>
                    <img src={showProjectDetailsIcon} alt="project status" />
                </div>
            </div>
        </div>
    )
}

export default UserProject;
