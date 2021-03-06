import './Sidebar.css';
import dashboardIcon from '../../../assets/images/Newestdashboard/SideBar/home.svg';
import postProjectIcon from '../../../assets/images/Newestdashboard/SideBar/post.svg';
import profileIcon from '../../../assets/images/Newestdashboard/SideBar/profile.svg';
import notificationIcon from '../../../assets/images/Newestdashboard/SideBar/notification.svg';
import developersIcon from '../../../assets/images/Newestdashboard/SideBar/developer-board.svg';
import logoutIcon from '../../../assets/images/Newestdashboard/SideBar/logout.svg';
import { withRouter } from 'react-router';
import cookie from 'react-cookies';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationPanel from '../../Notification/NotificationPanel';
import { useDispatch } from 'react-redux';
import { AGENCY, CLIENT } from '../../../shared/constants';
import { AGENCYROUTES, CLIENTROUTES } from '../../../Navigation/CONSTANTS';

function Sidebar(props) {
    const dispatch = useDispatch();

    const role = localStorage.getItem('role');
    const routerHistory = useHistory();

    const handleShowNotification = () => {
        dispatch({ type: 'SHOW_NOTIFICATION' });
    };

    const agencyProfileHandler = () => {
        if (role === AGENCY) {
            routerHistory.push(AGENCYROUTES.PROFILE);
        } else {
            routerHistory.push({
                pathname: CLIENTROUTES.PROFILE,
                state: props.isUserVerified
            });
        }
    };

    const handleGetClientHireDeveloper = () => {
        routerHistory.push({
            pathname: CLIENTROUTES.DEVELOPER_HIRE_REQUIREMENTS,
            state: props.isUserVerified
        });
    };

    const postProject = () => {
        routerHistory.push({
            pathname: CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1,
            state: props.isUserVerified
        });
    };

    const RouteRedirect1 = () => {
        if (role === CLIENT) {
            props.history.replace(CLIENTROUTES.DEVELOPER_REQUESTS);
        }
        if (role === AGENCY) {
            props.history.replace(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
        }
    };

    const handleLogout = () => {
        cookie.remove('Authorization');
        localStorage.clear();
        window.location.href = '/';
    };

    const [notificationCount, setNotificationCount] = useState(0);

    const activeNotificationStyle = {
        backgroundColor: '#7fff7f',
        borderRadius: '50%',
        width: '25px',
        height: '25px',
        padding: '5px'
    };
    return (
        <div className="container-sidebar">
            <div onClick={RouteRedirect1} className="temporary_logo">
                {/* <img src= 'https://api.onesourcing.in/media/images/1636785308442.jpeg' alt="logo" /> */}
                <img
                    src="https://sourcebae.s3.ap-south-1.amazonaws.com/staging/image/Sourcebae-14.svg"
                    alt="logo"
                />
            </div>
            <div className="sidebar-menu">
                <div className="dashboard-icon icons" onClick={RouteRedirect1}>
                    <div>
                        <img
                            style={{
                                filter:
                                    (props.location.pathname ===
                                        CLIENTROUTES.DEVELOPER_REQUESTS ||
                                        props.location.pathname ===
                                        AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST) &&
                                    'invert(8%) sepia(100%) saturate(7445%) hue-rotate(248deg) brightness(95%) contrast(144%)'
                            }}
                            src={dashboardIcon}
                            alt="dashboard icon"
                        />
                    </div>
                    <p>Dashboard</p>
                </div>
                {role === CLIENT && (
                    <>
                        <div
                            onClick={postProject}
                            className="postProject-icon icons"
                        >
                            <img src={postProjectIcon} alt="dashboard icon" />
                            <p>Post Project</p>
                        </div>
                        <div
                            onClick={handleGetClientHireDeveloper}
                            className="postProject-icon icons developers-icon"
                        >
                            <img src={developersIcon} alt="developers_icon" />
                            <div style={{ width: '62%', lineHeight: '13px' }}>
                                <p>Job Posted</p>
                            </div>
                        </div>
                    </>
                )}
                <div
                    onClick={agencyProfileHandler}
                    className="profile-icon icons"
                >
                    <img src={profileIcon} alt="dashboard icon" />
                    <p>Profile</p>
                </div>
                <div
                    className="notification-icon icons"
                    onClick={handleShowNotification}
                >
                    <img
                        src={notificationIcon}
                        style={
                            notificationCount > 0
                                ? activeNotificationStyle
                                : null
                        }
                        alt="dashboard icon"
                    />
                    <p>Notification</p>
                </div>

                <div onClick={handleLogout} className="setting-icon icons">
                    <img src={logoutIcon} alt="icon" />
                    <p>Log Out</p>
                </div>
            </div>
            <NotificationPanel setNotificationCount={setNotificationCount} />
        </div>
    );
}

export default withRouter(Sidebar);
