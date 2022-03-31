import './UserProject.css';
import React from 'react';
import CenterImage from '../../../assets/images/Newestdashboard/Dashboard/Center_Image.svg';
import { useHistory } from 'react-router-dom';
import ShowProject from '../../../assets/images/Newestdashboard/Dashboard/detail_show.svg';
import { CLIENTROUTES } from '../../../Navigation/CONSTANTS';

function RequestedDevCard({ index, ...rest }) {
    let props = rest;
    const routerHistory = useHistory();

    const showDetail = () => {
        routerHistory.push(`${CLIENTROUTES.SHORTLIST_DEVELOPER}/${props?._id}`);
    };

    return (
        <div
            onClick={showDetail}
            style={{ marginTop: index < 2 ? '1rem' : '0' }}
            className="project-details-card"
        >
            <div className="detailsCard-header">
                <div className="header-heading">
                    <h6>{props?.requirementName}</h6>
                </div>
            </div>
            <div className="detailsCard-date">
                <h6>
                    Contract Period:{' '}
                    <span className="date-color">{props?.contractPeriod}</span>
                </h6>
            </div>

            <div className="centerImage">
                <img
                    src={CenterImage}
                    alt="centerIcon"
                    style={{ height: '1.25rem', width: '1.25rem' }}
                />
            </div>

            <div className="detailsCard-date">
                <h6>
                    Dev Experience:{' '}
                    <span className="date-color">
                        {props?.developerExperienceRequired}
                    </span>
                </h6>
            </div>

            <div className="projectDetail">
                <div
                    onClick={() => showDetail()}
                    className="show-project-detail"
                >
                    <div className="projectDetail-text projectDetail-item">
                        <p>Show Requirement Details</p>
                    </div>
                    <img src={ShowProject} alt="project status" />
                </div>
            </div>
        </div>
    );
}

export default RequestedDevCard;
