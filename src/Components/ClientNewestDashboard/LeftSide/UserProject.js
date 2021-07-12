import './UserProject.css';
import projectDetailsStripLong from "../../../assets/images/Newestdashboard/LeftSide/ProjectDetailsStripLong.svg";
import projectDetailsStripShort from "../../../assets/images/Newestdashboard/LeftSide/ProjectDetailsStripShort.svg";
import ProjectStatusIcon from "../../../assets/images/Newestdashboard/LeftSide/projectStatus-icon.svg";
import infoIcon from "../../../assets/images/Newestdashboard/LeftSide/info-icon.svg";
import showProjectDetailsIcon from "../../../assets/images/Newestdashboard/LeftSide/showProjectDetails-icon.svg";
import CenterImage from '../../../assets/images/Newestdashboard/Center/center_image.png';

function UserProject() {
    return (
        <div className="project-details-card">
            <div className="projectDetailsStrip_long">
                {/* <img src={projectDetailsStripLong} alt="long strip" /> */}
            </div>
            <div className="projectDetailsStrip_short">
                {/* <img src={projectDetailsStripShort} alt="short strip" /> */}
            </div>
            <div className="detailsCard-header">
                <div className="header-heading">
                    <h6>Maveric</h6>
                </div>
                <div className="info-icon">
                    <img src={infoIcon} alt="infoIcon" />
                </div>
            </div>
            <div className="detailsCard-date">
                <h6>Last Edit On: <span className="date-color">25 june 2021</span></h6>
            </div>

            <div className="centerImage">
                <img src={CenterImage} alt='centerIcon' />
                <div>
                    Project Status
                </div>
            </div>

            <div className="projectDetail">
                <div className="header-currentStatus">
                    <div className="currentStatus-text currentStatus-item">
                        Quotation Requested
                    </div>
                    <div className="currentStatus-icon currentStatus-item">
                        <img src={ProjectStatusIcon} alt="project status" />
                    </div>
                </div>

                <div className="show-project-detail">
                    <div className="projectDetail-text projectDetail-item">
                        Show Project Detail
                    </div>
                    <div className="projectDetail-icon projectDetail-item">
                        <img src={showProjectDetailsIcon} alt="project status" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProject;
