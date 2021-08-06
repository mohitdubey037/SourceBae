import React from 'react';
import './AllProjectCard.css';

import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/MainVector.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector.svg';
import Moment from 'react-moment'

import Button from '../../Components/Button/Button';

function AllProjectCard(props) {
    console.log(props);
    return (
        <div className="user-project_agencyNewestAllProject">
            <div className="strip green-strip"></div>
            <div className="strip red-strip"></div>
            <div className="strip yellow-strip"></div>
            <div className="user-project_heading_agencyNewestAllProject">
                <div className="user-project_child_agencyNewestAllProject">
                    <h5>{props.projectName}</h5>
                </div>
                <Button name="Show Details" />
            </div>

            <div className="user-project-status_AgencyNewestAllProject">
                <div className='date_AgencyNewestAllProject'>
                    <div>
                        <img src={DateImage} alt="dateImage" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p>{props.createdAt}</p>
                    </Moment>
                    {/* <p>Matched On 25 March 2021</p> */}
                </div>
                <div className='matchedDate_AgencyNewestAllProject'>
                    <div>
                        <img src={DateImage2} alt="dateImage2" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p>{props.updatedAt}</p>
                    </Moment>
                    {/* <p>Matched On 25 March 2021</p> */}
                </div>
            </div>

            <div className="user-project-details_AgencyNewestAllProject">
                <table>
                    <thead>
                        <tr>
                            <td>Industry</td>
                            <td>{props.projectDomainId.domainName}</td>
                            <td>Final Budget</td>
                            <td>{props.projectFinalCost === undefined ? props.projectProposalCost : props.projectFinalCost}</td>
                        </tr>
                        <tr>
                            <td>Expert Categories</td>
                            <td>{props.projectExpertiseRequired[0].expertiseName}</td>
                            <td>Services</td>
                            <td>{props.projectServicesRequired[0].serviceName}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default AllProjectCard