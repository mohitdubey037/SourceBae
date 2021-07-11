import './UserProject.css';
import projectDetailsStripLong from "../../../assets/images/Newestdashboard/LeftSide/ProjectDetailsStripLong.svg";
import projectDetailsStripShort from "../../../assets/images/Newestdashboard/LeftSide/ProjectDetailsStripShort.svg";
import ProjectStatusIcon from "../../../assets/images/Newestdashboard/LeftSide/projectStatus-icon.svg";
import infoIcon from "../../../assets/images/Newestdashboard/LeftSide/info-icon.svg";
import showProjectDetailsIcon from "../../../assets/images/Newestdashboard/LeftSide/showProjectDetails-icon.svg";

function UserProject() {
    return (
        <div className="user-project">
            <div className="user-project-details">
                <div className="project-details-card">
                    <img src={projectDetailsStripLong} alt="long strip" />
                    <img src={projectDetailsStripShort} alt="short strip" />
                    <div className="detailsCard-header">
                        <div className="header-heading">
                            <h6>Maveric</h6>
                        </div>
                        <div className="header-currentStatus">
                            <div className="currentStatus-text currentStatus-item">
                                Quotation Requested
                            </div>
                            <div className="currentStatus-icon currentStatus-item">
                                <img src={ProjectStatusIcon} alt="project status" />
                            </div>
                        </div>
                    </div>
                    <div className="header-subHeading">
                        <p>Full Term</p>
                    </div>
                    <div className="detailsCard-date">
                        <h6>Last Edit On: 25 june 2021</h6>
                    </div>

                    <div className="detailsCard-statuses">
                        <div className="status-holder">
                            <div className="status-number">1</div>
                            <div className="status-name">Posted</div>
                        </div>
                        <div className="status-holder">
                            <div className="status-number">2</div>
                            <div className="status-name">Posted</div>
                        </div>
                        <div className="status-holder">
                            <div className="status-number">3</div>
                            <div className="status-name">Posted</div>
                        </div>
                        <div className="status-holder">
                            <div className="status-number">4</div>
                            <div className="status-name">Posted</div>
                        </div>
                        <div className="status-holder">
                            <div className="status-number">5</div>
                            <div className="status-name">Posted</div>
                        </div>
                        <div className="status-holder">
                            <div className="status-number">6</div>
                            <div className="status-name">Posted</div>
                        </div>
                        <div className="status-holder">
                            <div className="status-number">7</div>
                            <div className="status-name">Posted</div>
                        </div>
                    </div>
                    <div className="detailsCard-footer">
                        <div className="info-icon">
                            <img src={infoIcon} alt="infoIcon" />
                        </div>
                        <div className="show-project-detail">
                            <div className="projectDetail-text projectDetail-item">
                                Show Project Detail
                            </div>
                            <div className="projectDetail-icon projectDetail-item">
                                <img src={showProjectDetailsIcon} alt="project status"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProject;
