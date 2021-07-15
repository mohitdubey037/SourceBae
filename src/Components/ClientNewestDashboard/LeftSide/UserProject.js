import './UserProject.css';
import ProjectStatusIcon from "../../../assets/images/Newestdashboard/LeftSide/projectStatus-icon.svg";
import infoIcon from "../../../assets/images/Newestdashboard/LeftSide/info-icon.svg";
import showProjectDetailsIcon from "../../../assets/images/Newestdashboard/LeftSide/showProjectDetails-icon.svg";
import CenterImage from '../../../assets/images/Newestdashboard/Center/center_image.png';

function UserProject() {
    return (
        <div className="project-details-card">
            <div className="projectDetailsStrip_long"></div>
            <div className="projectDetailsStrip_short"></div>
            <div className="detailsCard-header">
                <div className="header-heading">
                    <h6>Maveric</h6>
                </div>
                <img src={infoIcon} alt="infoIcon" />
            </div>
            <div className="detailsCard-date">
                <h6>Last Edit On: <span className="date-color">25 june 2021</span></h6>
            </div>

            <div className="centerImage">
                <img src={CenterImage} alt='centerIcon' />
                <div>
                    <p>Project Status</p>
                </div>
            </div>

            <div className="projectDetail">
                <div className="header-currentStatus">
                    <div className="currentStatus-text currentStatus-item">
                        <p>Quotation Requested</p>
                    </div>
                    <img src={ProjectStatusIcon} alt="project status" />
                </div>

                <div className="show-project-detail">
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
