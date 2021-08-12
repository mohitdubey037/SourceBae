import React, { useEffect, useState } from 'react';

import notificationIcon from "../../../assets/images/Newestdashboard/Navbar/notification_icon.svg";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';

import './Navbar.css';

function Navbar(props) {

    const routerHistory = useHistory()

    const logout = () => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem('role');
        routerHistory.push('/');
    }

    return (
        <div className="navbar">
            <div className="navbar-heading">
                <h1>SourceBae</h1>
            </div>
            <div className="navbar-items">
                <div className="notification-icon nav-left-item">
                    <img src={notificationIcon} alt="notification" />
                </div>
                {/* <div onClick={logout} className="logout-icon nav-left-item">
                    <div>
                        <ExitToAppIcon />
                    </div>
                    <img src={notificationIcon} alt="notification" />
                </div> */}
                <div className="username nav-left-item">
                    <p>Atul Bhatt</p>
                </div>
                <div className="userprofile-circle nav-left-item" />
            </div>
        </div>
    )
}

export default Navbar;