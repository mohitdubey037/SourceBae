import React from 'react';
import notificationIcon from "../../../assets/images/Newestdashboard/Navbar/notification_icon.svg";
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-heading">
                <h1>Overview</h1>
            </div>
            <div className="navbar-items">
                <div className="notification-icon nav-left-item">
                    <img src={notificationIcon} alt="notification" />
                </div>
                <div className="username nav-left-item">
                    <p>Atul Bhatt</p>
                </div>
                <div className="userprofile-circle nav-left-item" />
            </div>
        </div>
    )
}

export default Navbar;