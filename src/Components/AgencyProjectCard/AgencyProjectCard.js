import React from 'react';
import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector2.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector2.svg';
import CurrentStatusImage from '../../assets/images/Newestdashboard/Agency_Project_Card/CurrentStatus2.svg';
import { useHistory } from "react-router-dom";
import './AgencyProjectCard.css';

import Moment from 'react-moment';
import moment from 'moment';

function AgencyProjectCard({ key, ...props }) {

    const dateCreate = moment(props.createdAt).format("MMM Do YY");
    const dateUpdate = moment(props.updatedAt).format("MMM Do YY");

    const routerHistory = useHistory();
    return (
        <div className="user-project_agencyNewestDashboard">
            <div className="user-project_heading_agencyNewestDashboard">
                <div className="user-project_child_agencyNewestDashboard">
                    <h5>{props?.projectName}</h5>
                </div>
            </div>

            <div className="user-project-status">
                <div className='date'>
                    <div className="imageClass">
                        <img src={DateImage} alt="dateImage" />
                    </div>
                    <div>
                        <p>{dateCreate}</p>
                    </div>
                    {/* <Moment format="DD MM YYYY" withTitle>
                        <p className="creation_date" style={{ marginLeft: 10 }}>{props?.createdAt}</p>
                    </Moment> */}
                </div>
                {dateCreate !== dateUpdate &&
                    <div className='matchedDate'>
                        <div className="imageClass">
                            <img src={DateImage2} alt="dateImage2" />
                        </div>
                        <div>
                            <p>{dateUpdate}</p>
                        </div>
                        {/* <Moment format="DD MM YYYY" withTitle>
                        <p className="creation_date" style={{ marginLeft: 10 }}>{props?.updatedAt}</p>
                    </Moment> */}
                    </div>
                }
                <div className='currentStatus'>
                    <div className="imageClass">
                        <img style={{ filter: "hue-rotate(-90deg) " }} src={CurrentStatusImage} alt="CurrentStatus" />
                    </div>
                    <p>{props?.projectCurrentStatus}</p>
                </div>
            </div>

            <div style={{ height: props?.projectType === 'Short Term' ? '64%' : "" }} className="user-project_details agencyProjectCard">
                <table>
                    <thead>
                        {props?.projectType != 'Short Term' &&
                            <tr>
                                <td>Industry</td>
                                <td>{props?.projectDomainId?.domainName}</td>
                            </tr>
                        }

                        {props?.projectType != 'Short Term' &&
                            <tr>
                                <td>Expert Categories</td>
                                <td>{props?.projectExpertiseRequired[0]?.expertiseName}</td>
                            </tr>
                        }

                        <tr>
                            <td>Services</td>
                            <td>{props?.projectServicesRequired?.map(a => <span>{a.serviceName}<br></br></span>)}</td>
                        </tr>
                        <tr>
                            <td>Final Budget</td>
                            <td>${props?.projectFinalCost || props?.projectProposalCost || props?.finalCostByClient}</td>
                        </tr>
                        <tr>
                            <td>Project Type</td>
                            <td>{props?.projectType}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div onClick={() =>
                routerHistory.push(`/agency-project-details/${props?._id}`)
            } className="user-project-button_agencyNewestDashboard" style={{ cursor: 'pointer' }}>
                <h6>Show Details</h6>
            </div>
        </div>
    )
}

export default AgencyProjectCard
