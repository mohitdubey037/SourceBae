import React from "react";
import "./NewDashboard.css";
import "./ContainerBody.css";
import oneSourcingLogo from "./sidebarLogo.svg";
import helpImg from "./help.svg";

import dashboardIcon from "./dashboard_icon.svg";
import postProjectIcon from "./postProject_icon.svg";
import profileIcon from "./profile_icon.svg";
import notificationIcon from "./notification_icon.svg";
import settingIcon from "./setting_icon.svg";

import HireDeveloperIcon from "./HireDeveloper-icon.svg";
import HireAgencyIcon from "./HireAgency-icon.svg";
import ShortTermProjectIcon from "./ShortTermProject-icon.svg";
import InvestmentIcon from "./Investment-icon.svg";
import ProjectDetailIllustration from "./ProjectDetailIllustration.svg";
import ProjectStatusIcon from "./projectStatus-icon.svg";
import infoIcon from "./info-icon.svg";
import showProjectDetailsIcon from "./showProjectDetails-icon.svg"

const NewDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="container-sidebar">
        <div className="sidebar-logo">
          <img src={oneSourcingLogo} alt="one sroucing logo" />
        </div>
        <div className="sidebar-menu">
          <div className="dashboard-icon icons">
            <img src={dashboardIcon} alt="dashboard icon" />
            <p>Dashboard</p>
          </div>
          <div className="postProject-icon icons">
            <img src={postProjectIcon} alt="dashboard icon" />
            <p>Post Project</p>
          </div>
          <div className="profile-icon icons">
            <img src={profileIcon} alt="dashboard icon" />
            <p>Profile</p>
          </div>
          <div className="notification-icon icons">
            <img src={notificationIcon} alt="dashboard icon" />
            <p>Notification</p>
          </div>
          <div className="setting-icon icons">
            <img src={settingIcon} alt="dashboard icon" />
            <p>Setting</p>
          </div>
        </div>
        <div className="sidebar-help">
          <div className="help-img">
            <img src={helpImg} alt="help" />
          </div>
          <div className="help-desc">
            <p>any confusion</p>
            <p>reach out us</p>
          </div>
          <div className="help-button">
            <button>Help</button>
          </div>
        </div>
      </div>
      <div className="container-body">
        <div className="navbar">
          <div className="navbar-heading">
            <h1>Overview</h1>
          </div>
          <div className="navbar-items">
            <img src={notificationIcon} alt="notification" />
            <img src={notificationIcon} alt="notification" />
            <img src={notificationIcon} alt="notification" />
          </div>
        </div>
        <div className="user-operations">
          <div className="operation">
            <div className="operation-logo">
              <img src={HireDeveloperIcon} alt="hire developer" />
            </div>
            <div className="operation-name">
              <p>Hire Developer</p>
            </div>
          </div>

          <div className="operation">
            <div className="operation-logo">
              <img src={HireAgencyIcon} alt="hire developer" />
            </div>
            <div className="operation-name">
              <p>Hire agency</p>
            </div>
          </div>

          <div className="operation">
            <div className="operation-logo">
              <img src={ShortTermProjectIcon} alt="hire developer" />
            </div>
            <div className="operation-name">
              <p>Short Term Project</p>
            </div>
          </div>

          <div className="operation">
            <div className="operation-logo">
              <img src={InvestmentIcon} alt="hire developer" />
            </div>
            <div className="operation-name">
              <p>Interested to Investment</p>
            </div>
          </div>
        </div>
        <div className="user-project">
          <div className="user-project-details">
            <div className="graphic">
              <div className="graphic-illustration">
                <img
                  src={ProjectDetailIllustration}
                  alt="project Details illustration"
                />
              </div>
              <div className="graphic-illustration-heading">
                <h6>Project details</h6>
              </div>
            </div>
            <div className="project-details-card">
              <div className="detailsCard-header">
                <div className="header-heading">
                  <h6>Maveric</h6>
                  <p>Full Term</p>
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
                    <img src={showProjectDetailsIcon} alt="project status" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-extras"></div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
