import './Sidebar.css';
import oneSourcingLogo from "../../../assets/images/Newestdashboard/SideBar/sidebarLogo.svg";
import helpImg from '../../../assets/images/Newestdashboard/SideBar/help.svg'
import dashboardIcon from "../../../assets/images/Newestdashboard/SideBar/dashboard_icon.svg";
import postProjectIcon from "../../../assets/images/Newestdashboard/SideBar/postProject_icon.svg";
import profileIcon from "../../../assets/images/Newestdashboard/SideBar/profile_icon.svg";
import notificationIcon from "../../../assets/images/Newestdashboard/SideBar/notification_icon.svg";
import developersIcon from "../../../assets/images/Newestdashboard/SideBar/people_icon.svg";
import logoutIcon from "../../../assets/images/Newestdashboard/SideBar/logout_icon.svg";
import settingIcon from "../../../assets/images/Newestdashboard/SideBar/setting_icon.svg";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import { withRouter } from "react-router";
import notification from '../../../assets/images/ClientDashboard/notification.svg';
import { Modal } from 'react-responsive-modal';
import cookie from "react-cookies";

import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

function Sidebar(props) {
    const role = localStorage.getItem('role');
    const routerHistory = useHistory();

    const [isNotification, setIsnotification] = useState(false);

    const notificationPanel = () => {
        setIsnotification(!isNotification);
        props.notificationVisible(!isNotification);
    }

    useEffect(() => {
        console.log(isNotification);
    },[isNotification]);

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    const agencyProfileHandler = () => {
        if (role === 'Agency') {
            routerHistory.push('/agency-profile');
        }
        else {
            routerHistory.push('/client-profile');
        }
    }

    const handleDashboard = () => {
        if (role === 'Agency') {
            routerHistory.push('/agencyNewestDashboard');
        }
        else {
            routerHistory.push('/clientNewestDashboard');
        }
    }

    const postProject = () => {
        routerHistory.push('/hire-agency-form-one')
    }

    const logout = () => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem('role');
        cookie.remove("user");
        routerHistory.push('/');
    }

    return (
        <div className="container-sidebar">
            <div className="sidebar-logo">
                <img src={oneSourcingLogo} alt="one sroucing logo" />
            </div>
            <div className="sidebar-menu">
                <div className="dashboard-icon icons" onClick={() => handleDashboard()} >
                    <div className="selected-strip" />
                    <img style={{ filter: (props.location.pathname === '/clientNewestDashboard' || props.location.pathname === '/agencyNewestDashboard') && 'invert(8%) sepia(100%) saturate(7445%) hue-rotate(248deg) brightness(95%) contrast(144%)' }} src={dashboardIcon} alt="dashboard icon" />
                    <p>Dashboard</p>
                </div>
                {role === "Client" &&
                    <>
                        <div onClick={() => postProject()} className="postProject-icon icons">
                            <img src={postProjectIcon} alt="dashboard icon" />
                            <p>Post Project</p>
                        </div>
                        <div onClick={() => routerHistory.push('/get-client-hire-developer')} className="postProject-icon icons developers-icon">
                            {/* <img src={PeopleRoundedIcon} alt="dashboard icon" /> */}
                            <img src={developersIcon} alt="developers_icon" />
                            <div>
                                <p>Developer</p>
                                <p>Request</p>
                            </div>
                        </div>
                    </>
                }
                <div onClick={() => agencyProfileHandler()} className="profile-icon icons">
                    <img src={profileIcon} alt="dashboard icon" />
                    <p>Profile</p>
                </div>
                <div className="notification-icon icons" onClick={notificationPanel}>
                    <img src={notificationIcon} alt="dashboard icon" />
                    <p>Notification</p>
                </div>
                {/* <div className="setting-icon icons">
                    <img src={settingIcon} alt="dashboard icon" />
                    <p>Setting</p>
                </div> */}
                <div onClick={logout} className="setting-icon icons">
                    {/* <ExitToAppIcon color="#999" /> */}
                    <img src={logoutIcon} alt="icon" />
                    <p>Log Out</p>
                </div>
                {/* <div className="setting-icon icons">
                    <img src={settingIcon} alt="dashboard icon" />
                    <p>Setting</p>
                </div> */}
            </div>
            {/* <div className="sidebar-help">
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
            </div> */}
            <div className={isNotification ? 'overlay' : null} ></div>
            <div className={isNotification ? 'notificationPanel open' : 'notificationPanel'}>
                <div className="innerNotificationPanel">
                    <div className="notificationsCards">
                        <div className="closeNotification">
                            <i onClick={notificationPanel} className="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <div className="allNotification">
                            <div className="allNotificationIcon">
                                <img src={notification} alt="" />
                            </div>
                            <div className="allNotificationText">
                                <p>All Notification</p>
                            </div>

                        </div>
                        <div className="notificationsCard">
                            {
                                arr.map(() => {
                                    return (
                                        <div className="notificationPoint">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et officia laboriosam repellendus, sit impedit.</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Sidebar);