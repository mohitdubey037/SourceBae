import React from 'react';
import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/MainVector.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector.svg';
import CurrentStatusImage from '../../assets/images/Newestdashboard/Agency_Project_Card/CurrentStatus1.svg';
import './AgencyProjectCard.css';

function AgencyProjectCard() {
    return (
        <div className="user-project_agencyNewestDashboard">
            <div className="user-project_heading_agencyNewestDashboard">
                <div className="user-project_child_agencyNewestDashboard">
                    <h5>Bani Thani Design Institute</h5>
                </div>
                <div className="user-project-button_agencyNewestDashboard">
                    <h6>Show Details</h6>
                </div>
            </div>

            <div className="user-project-status">
                <div className='date'>
                    <div className="imageClass">
                        <img src={DateImage} alt="dateImage" />
                    </div>
                    <p>8 july 2021</p>
                </div>
                <div className='matchedDate'>
                    <div className="imageClass">
                        <img src={DateImage2} alt="dateImage2" />
                    </div>
                    <p>Matched On 25 March 2021</p>
                </div>
                <div className='currentStatus'>
                    <div className="imageClass">
                        <img src={CurrentStatusImage} alt="CurrentStatus" />
                    </div>
                    <p>Matched On 25 March 2021</p>
                </div>
            </div>

            <div className="user-project_details">
                <table>
                    <thead>
                        <tr>
                            <td>Industry</td>
                            <td>Edtech</td>
                            <td>Final Budget</td>
                            <td>$2000</td>
                        </tr>
                        <tr>
                            <td>Expert Categories</td>
                            <td>Online File Submission</td>
                            <td>Services</td>
                            <td>App Developement</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default AgencyProjectCard
