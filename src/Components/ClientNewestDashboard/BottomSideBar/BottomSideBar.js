import './BottomSideBar.css';
import dashboardIcon from '../../../assets/images/Newestdashboard/SideBar/home.svg';
import postProjectIcon from '../../../assets/images/Newestdashboard/SideBar/post.svg';
import profileIcon from '../../../assets/images/Newestdashboard/SideBar/profile.svg';
import notificationIcon from '../../../assets/images/Newestdashboard/SideBar/notification.svg';
import developersIcon from '../../../assets/images/Newestdashboard/SideBar/developer-board.svg';
import logoutIcon from '../../../assets/images/Newestdashboard/SideBar/logout.svg';
import { withRouter } from 'react-router';
import cookie from 'react-cookies';
import instance from '../../../Constants/axiosConstants';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AGENCYROUTES, CLIENTROUTES } from '../../../Navigation/CONSTANTS';

function BottomSidebar(props) {
    const Role = localStorage.getItem('role');
    const routerHistory = useHistory();

    const [isNotification, setIsnotification] = useState(false);
    const [notificationData, setNotificationData] = useState([]);

    const notificationPanel = () => {
        setIsnotification(!isNotification);
        props.notificationVisible(!isNotification);
    };

    useEffect(() => {
        instance
            .get(`/api/${Role}/notifications/all`)
            .then((response) => {
                setNotificationData(response);
            })
            .catch((err) => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const agencyProfileHandler = () => {
        if (Role === 'Agency') {
            routerHistory.push(AGENCYROUTES.PROFILE);
        } else {
            routerHistory.push(CLIENTROUTES.PROFILE);
        }
    };

    const handleDashboard = () => {
        if (Role === 'Agency') {
            routerHistory.push(AGENCYROUTES.DASHBOARD);
        } else {
            routerHistory.push(CLIENTROUTES.DASHBOARD);
        }
    };

    const postProject = () => {
        routerHistory.push('/hire-agency-form-one');
    };

    const logout = () => {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('toggle');
        cookie.remove('Authorization');
        cookie.remove('isAgencyVerified');
        cookie.remove('isStepsCompleted');
        routerHistory.push('/');
    };

    return (
        <div className="container-bottom-sidebar">
            <div className="bottom-sidebar-menu">
                <div
                    className="dashboard-icon icons"
                    onClick={() => handleDashboard()}
                >
                    <div>
                        <img
                            style={{
                                filter:
                                    (props.location.pathname ===
                                        CLIENTROUTES.DASHBOARD ||
                                        props.location.pathname ===
                                            AGENCYROUTES.DASHBOARD) &&
                                    'invert(8%) sepia(100%) saturate(7445%) hue-rotate(248deg) brightness(95%) contrast(144%)'
                            }}
                            src={dashboardIcon}
                            alt="dashboard icon"
                        />
                    </div>
                    <p>Dashboard</p>
                </div>
                {Role === 'Client' && (
                    <>
                        <div
                            onClick={() => postProject()}
                            className="postProject-icon icons"
                        >
                            <img src={postProjectIcon} alt="dashboard icon" />
                            <p>Post Project</p>
                        </div>
                        <div
                            onClick={() =>
                                routerHistory.push('/get-client-hire-developer')
                            }
                            className="postProject-icon icons developers-icon"
                        >
                            <img src={developersIcon} alt="developers_icon" />
                            <div style={{ width: '62%', lineHeight: '13px' }}>
                                <p>Resources in demand</p>
                            </div>
                        </div>
                    </>
                )}
                <div
                    onClick={() => agencyProfileHandler()}
                    className="profile-icon icons"
                >
                    <img src={profileIcon} alt="dashboard icon" />
                    <p>Profile</p>
                </div>
                <div
                    className="notification-icon icons"
                    onClick={notificationPanel}
                >
                    <img src={notificationIcon} alt="dashboard icon" />
                    <p>Notification</p>
                </div>
                {Role === 'Agency' && (
                    <div
                        onClick={() =>
                            routerHistory.push(AGENCYROUTES.SHARED_DEVELOPERS)
                        }
                        className="postProject-icon developers-icon icons"
                    >
                        <img src={developersIcon} alt="developers_icon" />
                        <p>Developer Request</p>
                    </div>
                )}
                <div onClick={logout} className="setting-icon icons">
                    <img src={logoutIcon} alt="icon" />
                    <p>Log Out</p>
                </div>
            </div>
            <div className={isNotification ? 'overlay' : null}></div>
            <div
                className={
                    isNotification
                        ? 'notificationPanel open'
                        : 'notificationPanel'
                }
            >
                <div className="innerNotificationPanel">
                    <div className="notificationsCards">
                        <div className="closeNotification">
                            <i
                                onClick={notificationPanel}
                                className="fa fa-times"
                                aria-hidden="true"
                            ></i>
                        </div>
                        <div className="allNotification">
                            <div className="allNotificationText">
                                <p>All Notification</p>
                            </div>
                        </div>
                        <div className="notificationsCard">
                            {notificationData.map((nd) => {
                                return (
                                    <div className="notificationPoint">
                                        <div className="notificationPointIn">
                                            <ul>
                                                <li>
                                                    <p>
                                                        {nd.notificationTitle}
                                                    </p>
                                                    <p>{nd.notificationData}</p>
                                                </li>
                                            </ul>
                                            {/* <i className="fa fa-times" aria-hidden="true" style={{ paddingRight: "1rem", marginTop: "0.8rem" }}></i> */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(BottomSidebar);
