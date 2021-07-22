import React from 'react';
import './Sidebar.css';
import oneSourcingLogo from "../../../assets/images/Newestdashboard/SideBar/sidebarLogo.svg";
import helpImg from '../../../assets/images/Newestdashboard/SideBar/help.svg'
import dashboardIcon from "../../../assets/images/Newestdashboard/SideBar/dashboard_icon.svg";
import postProjectIcon from "../../../assets/images/Newestdashboard/SideBar/postProject_icon.svg";
import profileIcon from "../../../assets/images/Newestdashboard/SideBar/profile_icon.svg";
import notificationIcon from "../../../assets/images/Newestdashboard/SideBar/notification_icon.svg";
import settingIcon from "../../../assets/images/Newestdashboard/SideBar/setting_icon.svg";

import { useHistory } from 'react-router-dom';


function Sidebar() {
    const role = localStorage.getItem('role');

    const routerHistory = useHistory();

    const agencyProfileHandler = () => {
        if (role === 'Agency') {
            routerHistory.push('/agency-profile');
        }
    }

    return (
        <div className="container-sidebar">
            <div className="sidebar-logo">
                <img src={oneSourcingLogo} alt="one sroucing logo" />
            </div>
            <div className="sidebar-menu">
                <div className="dashboard-icon icons">
                    <div className="selected-strip" />
                    <img src={dashboardIcon} alt="dashboard icon" />
                    <p>Dashboard</p>
                </div>
                {role === "Client" &&
                    <div className="postProject-icon icons">
                        <img src={postProjectIcon} alt="dashboard icon" />
                        <p>Post Project</p>
                    </div>
                }
                <div onClick={() => agencyProfileHandler()} className="profile-icon icons">
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
    )
}

export default Sidebar;
