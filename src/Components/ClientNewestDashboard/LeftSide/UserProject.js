import './UserProject.css';
import ProjectStatusIcon from "../../../assets/images/Newestdashboard/LeftSide/projectStatus-icon.svg";
import infoIcon from "../../../assets/images/Newestdashboard/LeftSide/info-icon.svg";
import showProjectDetailsIcon from "../../../assets/images/Newestdashboard/LeftSide/showProjectDetails-icon.svg";
import CenterImage from '../../../assets/images/Newestdashboard/Center/center_image.png';
import Moment from 'react-moment'
import {useHistory} from 'react-router-dom';

function UserProject({name, type, status, lastEdit, detailId},props) {
    const routerHistory = useHistory();
    console.log(props);

    const showDetail = () => {
        routerHistory.push(`/agency-list:${detailId}`)
    }

    return (
        <div className="project-details-card">
            <div className="projectDetailsStrip_long"></div>
            <div className="projectDetailsStrip_short"></div>
            <div className="detailsCard-header">
                <div className="header-heading">
                    <h6>{name}</h6>
                </div>
                <img src={infoIcon} alt="infoIcon" />
            </div>
            <div className="detailsCard-date">
                <h6>Last Edit On: <span className="date-color"><Moment format="D MMM YYYY" withTitle>{lastEdit}</Moment></span></h6>
            </div>

            <div className="centerImage">
                <img src={CenterImage} alt='centerIcon' />
                <div>
                    <p>{status}</p>
                </div>
            </div>

            <div className="projectDetail">
                <div className="header-currentStatus">
                    <div className="currentStatus-text currentStatus-item">
                        <p>Quotation Requested</p>
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
