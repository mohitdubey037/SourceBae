import React from 'react';
import './AllProjectCard.css';

import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/MainVector.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector.svg';

import Button from '../../Components/Button/Button';

function AllProjectCard() {
    return (
        <div className="user-project_agencyNewestAllProject">
            <div className="user-project_heading_agencyNewestAllProject">
                <div className="user-project_child_agencyNewestAllProject">
                    <h5>Bani Thani Design Institute</h5>
                </div>
                <Button name="Show Details" />
            </div>

            <div className="user-project-status_AgencyNewestAllProject">
                <div className='date_AgencyNewestAllProject'>
                    <div>
                        <img src={DateImage} alt="dateImage" />
                    </div>
                    <p>8 july 2021</p>
                </div>
                <div className='matchedDate_AgencyNewestAllProject'>
                    <div>
                        <img src={DateImage2} alt="dateImage2" />
                    </div>
                    <p>Matched On 25 March 2021</p>
                </div>
            </div>

            <div className="user-project-details_AgencyNewestAllProject">
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

export default AllProjectCard