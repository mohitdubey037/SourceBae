import React from 'react';
import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector2.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector2.svg';
import CurrentStatusImage from '../../assets/images/Newestdashboard/Agency_Project_Card/CurrentStatus2.svg';
import { useHistory } from "react-router-dom";
import './AgencyProjectCard.css';

import Moment from 'react-moment'

function AgencyProjectCard({ key, ...props }) {
    // console.log(name, status, budget, creationDate,projectType)
    console.log(key);
    console.log(props);
    const routerHistory = useHistory();
    return (
        <div className="user-project_agencyNewestDashboard">
            <div className="user-project_heading_agencyNewestDashboard">
                <div className="user-project_child_agencyNewestDashboard">
                    <h5>{props?.projectName}</h5>
                </div>
                {/* <div onClick={() =>
                    routerHistory.push(`/agency-project-details:${props?._id}`)
                } className="user-project-button_agencyNewestDashboard" style={{ cursor: 'pointer' }}>
                    <h6>Show Details</h6>
                </div> */}
            </div>

            <div className="user-project-status">
                <div className='date'>
                    <div className="imageClass" style={{ marginRight: 10 }}>
                        <img src={DateImage} alt="dateImage" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p className="creation_date" style={{ marginLeft: 10 }}>{props?.createdAt}</p>
                    </Moment>
                </div>
                <div className='matchedDate'>
                    <div className="imageClass">
                        <img src={DateImage2} alt="dateImage2" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p className="creation_date" style={{ marginLeft: 10 }}>{props?.updatedAt}</p>
                    </Moment>
                </div>
                <div className='currentStatus'>
                    <div className="imageClass">
                        <img src={CurrentStatusImage} alt="CurrentStatus" />
                    </div>
                    <p>{props?.projectCurrentStatus}</p>
                </div>
            </div>

            <div className="user-project_details agencyProjectCard">
                <table>
                    <thead>
                        <tr>
                            <td>Industry</td>
                            <td>{props?.projectDomainId?.domainName}</td>
                            <td>Final Budget</td>
                            <td>${props?.projectFinalCost === undefined ? props?.projectProposalCost : props?.projectFinalCost}</td>
                        </tr>
                        <tr>
                            <td>Expert Categories</td>
                            <td>{props?.projectExpertiseRequired[0]?.expertiseName}</td>
                            <td>Services</td>
                            <td>{props?.projectServicesRequired?.map(a => <span>{a.serviceName}<br></br></span>)}</td>
                        </tr>
                    </thead>
                </table>
            </div>
             <div onClick={() =>
                    routerHistory.push(`/agency-project-details:${props?._id}`)
                } className="user-project-button_agencyNewestDashboard" style={{ cursor: 'pointer' }}>
                    <h6>Show Details</h6>
                </div>
        </div>
    )
}

export default AgencyProjectCard
