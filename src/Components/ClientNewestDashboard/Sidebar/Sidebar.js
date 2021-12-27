import './Sidebar.css';
import dashboardIcon from "../../../assets/images/Newestdashboard/SideBar/home.svg";
import postProjectIcon from "../../../assets/images/Newestdashboard/SideBar/post.svg";
import profileIcon from "../../../assets/images/Newestdashboard/SideBar/profile.svg";
import notificationIcon from "../../../assets/images/Newestdashboard/SideBar/notification.svg";
import developersIcon from "../../../assets/images/Newestdashboard/SideBar/developer-board.svg";
import logoutIcon from "../../../assets/images/Newestdashboard/SideBar/logout.svg";
import { withRouter } from "react-router";
import cookie from "react-cookies";
import React from 'react';
import { useHistory } from 'react-router-dom';
import NotificationPanel from '../../Notification/NotificationPanel';
import { useDispatch } from 'react-redux';
import { AGENCY, CLIENT } from '../../../shared/constants';

function Sidebar(props) {
    const dispatch = useDispatch();

    const role = localStorage.getItem('role');
    const routerHistory = useHistory();

    const handleShowNotification = () => {
        dispatch({ type: 'SHOW_NOTIFICATION' });
    }

    const agencyProfileHandler = () => {
        if (role === AGENCY) {
            routerHistory.push('/agency-profile');
        }
        else {
            routerHistory.push('/client-profile');
        }
    }

    const postProject = () => {
        routerHistory.push('/hire-agency-form-one')
    }

    const RouteRedirect1 = () => {
        if (role === CLIENT) {
            props.history.replace('/clientNewestDashboard');
        }
        if (role === AGENCY) {
            props.history.replace('/agencyNewestDashboard');
        }
    }

    const handleLogout = () => {
        cookie.remove("Authorization");
        localStorage.clear();
        window.location.href = 'https://sourcebae.com/';
    }

    return (
        <div className="container-sidebar">
            <div onClick={RouteRedirect1} className="temporary_logo">
                {/* <img src= 'https://api.onesourcing.in/media/images/1636785308442.jpeg' alt="logo" /> */}
                <img src='https://sourcebae.s3.ap-south-1.amazonaws.com/staging/image/Sourcebae-14.svg' alt="logo" />
            </div>
            <div className="sidebar-menu">
                <div className="dashboard-icon icons" onClick={RouteRedirect1} >
                    <div>
                        <img style={{ filter: (props.location.pathname === '/clientNewestDashboard' || props.location.pathname === '/agencyNewestDashboard') && 'invert(8%) sepia(100%) saturate(7445%) hue-rotate(248deg) brightness(95%) contrast(144%)' }} src={dashboardIcon} alt="dashboard icon" />
                    </div>
                    <p>Dashboard</p>
                </div>
                {role === CLIENT &&
                    <>
                        <div onClick={() => postProject()} className="postProject-icon icons">
                            <img src={postProjectIcon} alt="dashboard icon" />
                            <p>Post Project</p>
                        </div>
                        <div onClick={() => routerHistory.push('/get-client-hire-developer')} className="postProject-icon icons developers-icon">
                            <img src={developersIcon} alt="developers_icon" />
                            <div style={{ width: '62%', lineHeight: '13px' }}>
                                <p>Developer Request</p>
                            </div>
                        </div>
                    </>
                }
                <div onClick={() => agencyProfileHandler()} className="profile-icon icons">
                    <img src={profileIcon} alt="dashboard icon" />
                    <p>Profile</p>
                </div>
                <div className="notification-icon icons" onClick={handleShowNotification}>
                    <img src={notificationIcon} alt="dashboard icon" />
                    <p>Notification</p>
                </div>
                {role === CLIENT &&
                    <div onClick={() => routerHistory.push('/shared-developers')} className="postProject-icon icons developers-icon">
                        <img src={developersIcon} alt="developers_icon" />
                        <div style={{ width: '62%', lineHeight: '13px' }}>
                            <p>Developer Request</p>
                        </div>
                    </div>
                }
                <div onClick={handleLogout} className="setting-icon icons">
                    <img src={logoutIcon} alt="icon" />
                    <p>Log Out</p>
                </div>
            </div>
            <NotificationPanel />
        </div>
    )
}

export default withRouter(Sidebar);
