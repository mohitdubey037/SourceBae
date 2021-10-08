import React from 'react';
import './AllProjectCard.css';

import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/vec.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/vec.svg';
import Moment from 'react-moment';
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom';

function AllProjectCard(props) {
    const routerHistory = useHistory();

    const showDetails = () => {
        routerHistory.push(`/agency-list:${props._id}`)
    }

    return (
        <div className="user-project_agencyNewestAllProject allProject">
        <div style={{flex:"0.5", paddingLeft:"3rem"}}>
            <div className="user-project_heading_agencyNewestAllProject">
                <div className="user-project_child_agencyNewestAllProject">
                    <h5>{props?.projectName}</h5>
                </div>
            </div>

            <div className="user-project-status_AgencyNewestAllProject">
                <div className='date_AgencyNewestAllProject'>
                    <div>
                        <img src={DateImage} alt="dateImage" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p>{props?.createdAt}</p>
                    </Moment>
                    {/* <p>Matched On 25 March 2021</p> */}
                </div>
                <div className='matchedDate_AgencyNewestAllProject'>
                    <div>
                        <img src={DateImage2} alt="dateImage2" />
                    </div>
                    <Moment format="D MMM YYYY" withTitle>
                        <p>{props?.updatedAt}</p>
                    </Moment>
                    {/* <p>Matched On 25 March 2021</p> */}
                </div>
            </div>
            </div>

            <div className="user-project-details_AgencyNewestAllProject">
                <table>
                    <thead>
                        <tr>
                            <td>Industry</td>
                            <td>{props?.projectDomainId?.domainName}</td>
                        </tr>
                       
                        <tr>
                            <td>Expert Categories</td>
                            <td>{props?.projectExpertiseRequired[0]?.expertiseName}</td>
                        </tr>
                        <tr>
                            <td>Final Budget</td>
                            <td>{props.projectFinalCost === undefined ? props.projectProposalCost : props.projectFinalCost}</td>
                        </tr>
                        <tr>    
                            <td>Services</td>
                            <td>{props?.projectServicesRequired[0]?.serviceName}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div onClick={() => showDetails()} className="submit-button_allProjectCard">
                    <h6>Show Details</h6>
                </div>
        </div>
    )
}

export default withRouter(AllProjectCard)