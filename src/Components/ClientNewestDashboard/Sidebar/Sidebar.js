import './Sidebar.css';
import oneSourcingLogo from "../../../assets/images/Newestdashboard/SideBar/sidebarLogo.svg";
// import TemporaryLogo from '../../../assets/images/temporary_logo.jpeg';
import TemporaryLogo from '../../../assets/images/Logo/temporary_logo.jpeg';
import dashboardIcon from "../../../assets/images/Newestdashboard/SideBar/home.svg";
import postProjectIcon from "../../../assets/images/Newestdashboard/SideBar/post.svg";
import profileIcon from "../../../assets/images/Newestdashboard/SideBar/profile.svg";
import notificationIcon from "../../../assets/images/Newestdashboard/SideBar/notification.svg";
import developersIcon from "../../../assets/images/Newestdashboard/SideBar/developer-board.svg";
import logoutIcon from "../../../assets/images/Newestdashboard/SideBar/logout.svg";
import { withRouter } from "react-router";
import cookie from "react-cookies";
import instance from "../../../Constants/axiosConstants";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Sidebar(props) {
    const Role = localStorage.getItem('role');
    const routerHistory = useHistory();

    const [isNotification, setIsnotification] = useState(false);
    const [notificationData, setNotificationData] = useState([])

    const notificationPanel = () => {
        setIsnotification(!isNotification);
        props.notificationVisible(!isNotification);
    }


    useEffect(() => {
        instance.get(`/api/${Role}/notifications/all?type=push`)
            .then(response => {
                setNotificationData(response);
            })
            .catch(err => {
            })
    }, [])

    useEffect(() => {
    }, [isNotification]);

    const agencyProfileHandler = () => {
        if (Role === 'Agency') {
            routerHistory.push('/agency-profile');
        }
        else {
            routerHistory.push('/client-profile');
        }
    }

    const handleDashboard = () => {
        if (Role === 'Agency') {
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
        localStorage.removeItem('userId');
        localStorage.removeItem('toggle');
        cookie.remove("Authorization");
        cookie.remove("isAgencyVerified");
        cookie.remove("isStepsCompleted");
        routerHistory.push('/');
    }

    return (
        <div className="container-sidebar">
            <div className="temporary_logo">
                <img src= {require('../../../assets/images/Logo/temporary_logo.jpeg').default} alt="logo" />
            </div>
            <div className="sidebar-menu">
                <div className="dashboard-icon icons" onClick={() => handleDashboard()} >
                    <div>
                        <img style={{ filter: (props.location.pathname === '/clientNewestDashboard' || props.location.pathname === '/agencyNewestDashboard') && 'invert(8%) sepia(100%) saturate(7445%) hue-rotate(248deg) brightness(95%) contrast(144%)' }} src={dashboardIcon} alt="dashboard icon" />
                    </div>
                    <p>Dashboard</p>
                </div>
                {Role === "Client" &&
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
                <div className="notification-icon icons" onClick={notificationPanel}>
                    <img src={notificationIcon} alt="dashboard icon" />
                    <p>Notification</p>
                </div>
                {Role === 'Agency' &&
                    <div onClick={() => routerHistory.push('/shared-developers')} className="postProject-icon icons developers-icon">
                        <img src={developersIcon} alt="developers_icon" />
                        <div style={{ width: '62%', lineHeight: '13px' }}>
                            <p>Developer Request</p>
                        </div>
                    </div>
                }
                <div onClick={logout} className="setting-icon icons">
                    <img src={logoutIcon} alt="icon" />
                    <p>Log Out</p>
                </div>
            </div>
            <div className={isNotification ? 'overlay' : null} ></div>
            <div className={isNotification ? 'notificationPanel open' : 'notificationPanel'}>
                <div className="innerNotificationPanel">
                    <div className="notificationsCards">
                        <div className="closeNotification">
                            <i onClick={notificationPanel} className="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <div className="allNotification">
                            <div className="allNotificationText">
                                <p>All Notification</p>
                            </div>

                        </div>
                        <div className="notificationsCard">
                            {
                                notificationData.map((nd) => {
                                    return (
                                        <div className="notificationPoint">
                                            <div className="notificationPointIn">
                                                <ul>
                                                    <li>
                                                        <p>{nd.notificationTitle}</p>
                                                        <p>{nd.notificationData}</p>
                                                    </li>
                                                </ul>
                                                {/* <i className="fa fa-times" aria-hidden="true" style={{ paddingRight: "1rem", marginTop: "0.8rem" }}></i> */}
                                                </div>
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
