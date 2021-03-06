import React from 'react';
import './AllProjectCard.css';

import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/vec.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/vec.svg';
import moment from 'moment';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { CLIENTROUTES } from '../../Navigation/CONSTANTS';

function AllProjectCard(props) {
    const dateCreate = moment(props.createdAt).format('MMM Do YY');
    const dateUpdate = moment(props.updatedAt).format('MMM Do YY');

    const routerHistory = useHistory();

    const showDetails = () => {
        routerHistory.push(`${CLIENTROUTES.AGENCIES_LIST}/${props._id}`);
    };

    return (
        <div className="user-project_agencyNewestAllProject allProject">
            <div style={{ flex: '0.5', paddingLeft: '2rem' }}>
                <div className="user-project_heading_agencyNewestAllProject">
                    <div className="user-project_child_agencyNewestAllProject">
                        <h5>{props?.projectName}</h5>
                    </div>
                </div>

                <div className="user-project-status_AgencyNewestAllProject">
                    <div className="date_AgencyNewestAllProject">
                        <div>
                            <img src={DateImage} alt="dateImage" />
                        </div>
                        <div>
                            <p>{dateCreate}</p>
                        </div>
                    </div>
                    {dateCreate !== dateUpdate && (
                        <div className="matchedDate_AgencyNewestAllProject">
                            <div>
                                <img src={DateImage2} alt="dateImage2" />
                            </div>
                            <div>
                                <p>{dateUpdate}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="user-project-details_AgencyNewestAllProject">
                <table>
                    <thead>
                        {props.projectType !== 'Short Term' && (
                            <tr>
                                <td>Industry</td>
                                <td>{props?.projectDomainId?.domainName}</td>
                            </tr>
                        )}

                        {props.projectType !== 'Short Term' && (
                            <tr>
                                <td>Expert Categories</td>
                                <td>
                                    {
                                        props?.projectExpertiseRequired[0]
                                            ?.expertiseName
                                    }
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td>Final Budget</td>
                            <td>
                                {props.projectFinalCost === undefined
                                    ? props.projectProposalCost
                                    : props.projectFinalCost}
                            </td>
                        </tr>
                        <tr>
                            <td>Services</td>
                            <td>
                                {props?.projectServicesRequired[0]?.serviceName}
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div
                onClick={() => showDetails()}
                className="submit-button_allProjectCard"
            >
                <h6>Show Details</h6>
            </div>
        </div>
    );
}

export default withRouter(AllProjectCard);
