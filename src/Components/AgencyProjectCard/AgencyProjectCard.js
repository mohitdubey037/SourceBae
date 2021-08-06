import React from 'react';
import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/MainVector.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector.svg';
import CurrentStatusImage from '../../assets/images/Newestdashboard/Agency_Project_Card/CurrentStatus1.svg';
import './AgencyProjectCard.css';

import Moment from 'react-moment'

function AgencyProjectCard({ id, name, status, budget, creationDate, updatedAt, projectType, experties, services, props }) {
    // console.log(name, status, budget, creationDate,projectType)
    return (
        <div className="user-project_agencyNewestDashboard">
            <div className="user-project_heading_agencyNewestDashboard">
                <div className="user-project_child_agencyNewestDashboard">
                    <h5>{name}</h5>
                </div>
                <div onClick={() =>
                    props.history.push(`/agency-project-details:${id}`)
                } className="user-project-button_agencyNewestDashboard" style={{ cursor: 'pointer' }}>
                    <h6>Show Details</h6>
                </div>
            </div>

            <div className="user-project-status">
                <div className='date'>
                    <div className="imageClass" style={{ marginRight: 10 }}>
                        <img src={DateImage} alt="dateImage" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p className="creation_date" style={{ marginLeft: 10 }}>{creationDate}</p>
                    </Moment>
                </div>
                <div className='matchedDate'>
                    <div className="imageClass">
                        <img src={DateImage2} alt="dateImage2" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p className="creation_date" style={{ marginLeft: 10 }}>{updatedAt}</p>
                    </Moment>
                    <p>Matched On 25 March 2021</p>
                </div>
                <div className='currentStatus'>
                    <div className="imageClass">
                        <img src={CurrentStatusImage} alt="CurrentStatus" />
                    </div>
                    <p>{status}</p>
                </div>
            </div>

            <div className="user-project_details">
                <table>
                    <thead>
                        <tr>
                            <td>Industry</td>
                            <td>Edtech</td>
                            <td>Final Budget</td>
                            <td>${budget}</td>
                        </tr>
                        <tr>
                            <td>Expert Categories</td>
                            <td>{experties[0].expertiseName}</td>
                            <td>Services</td>
                            <td>{services[0].serviceName}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default AgencyProjectCard
