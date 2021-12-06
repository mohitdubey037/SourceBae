import React, { useEffect, useState } from 'react';
import instance from '../../../Constants/axiosConstants';
import { withRouter } from 'react-router-dom';
import RouteRedirect from '../../../Utils/RouteRedirect';
import { Popover } from 'react-tiny-popover';
import './Navbar.css';
import { Avatar } from '@material-ui/core';
import cookie from "react-cookies";

function Navbar(props) {

    const logoLink = "https://api.onesourcing.in/media/images/1637044803259.svg";
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const url = props.history.location.pathname;
    const Role = localStorage.getItem('role');
    const roleId = localStorage.getItem("userId");
    const [data, setData] = useState({});

    const myProfileHandler = () => {
        if (Role === "Agency") {
            props.history.push('/agency-profile')
        }
        if (Role === "Client") {
            props.history.push('/client-profile');
        }
    }

    const logoutHandler = () => {
        // localStorage.removeItem("Authorization");
        // localStorage.removeItem('role');
        // localStorage.removeItem('userId');
        // localStorage.removeItem('toggle');
        localStorage.clear();
        cookie.remove("Authorization");
        props.history.replace('/');
    }

    useEffect(() => {
        if (Role === 'Client') {
            instance.get(`/api/${Role}/clients/get/${roleId}`)
                .then(function (response) {
                    setData(response);
                })
                .catch(err => {
                })
        }

        else {
            instance.get(`/api/${Role}/agencies/get/${roleId}`)
                .then(function (response) {
                    setData(response);
                })
                .catch((err) => {
                });
        }
    }, [])

    const RouteRedirect1 = () => {
        if (Role === "Client") {
            props.history.replace('/clientNewestDashboard');
        }
        if (Role === "Agency") {
            props.history.replace('/agencyNewestDashboard');
        }
    }

    return (
        // <div style={{ top: Role === 'Client' && '1rem', justifyContent:props.logoLink && 'space-between'}} className='navbar'>
        <div style={{
            top: (url.includes('/clientNewestDashboard') ||
                url.includes('/agencyNewestDashboard') ||
                url.includes('/quotation') ||
                url.includes('agency-list') ||
                url.includes('/project-details') ||
                url.includes('/agency-project-details') ||
                url.includes('/agencyNewestDashboard') ||
                url.includes('/agencyNewestAllProject')
            ) && '1rem',
            justifyContent: (url.includes('/clientNewestDashboard') ||
                url.includes('/agencyNewestDashboard') ||
                url.includes('/quotation') ||
                url.includes('/agency-list') ||
                url.includes('/project-details') ||
                url.includes('/agency-project-details') ||
                url.includes('/agencyNewestAllProject')
            ) && 'flex-end'
        }} className='navbar'>
            <div style={{
                display: (
                    url.includes('/clientNewestDashboard') ||
                    url.includes('/agencyNewestDashboard') ||
                    url.includes('/quotation') ||
                    url.includes('agency-list') ||
                    url.includes('/project-details') ||
                    url.includes('/agency-project-details') ||
                    url.includes('/agencyNewestAllProject')
                ) && 'none'
            }} className="logoLink_navbar">
                <img onClick={RouteRedirect1} src={logoLink} alt="logo" />

            </div>
            <div className="navbar-items">
                <div style={{ paddingRight: '10px' }} className="username">
                    <p style={{
                        color: (url.includes('/agencyNewestDashboard') ||
                            props.history.location.pathname === '/clientNewestDashboard') ? 'white' : 'blue'
                    }}>{Role === "Client" ? data[0]?.firstName + " " + data[0]?.lastName : data?.agencyName}</p>
                </div>
                <div className="userprofile-circle nav-left-item" >
                    {Role === 'Agency' ?
                        <>
                            <img onMouseEnter={() => setIsPopoverOpen(true)}
                                onClick={() => setIsPopoverOpen(!isPopoverOpen)} src={data?.agencyLogo ? data?.agencyLogo : `https://ui-avatars.com/api/?name=${data?.agencyName}`} />
                            <Popover
                                // className="popover"
                                isOpen={isPopoverOpen}
                                onClickOutside={() => setIsPopoverOpen(false)}
                                positions={['top', 'bottom', 'left', 'right:10']} // preferred positions by priority
                                marginTop={10}
                                content={
                                    <div className="popover_div">
                                        <button onClick={myProfileHandler}>My Profile</button>
                                        <div className="horizontal_div"></div>
                                        <button className="logout_button" onClick={logoutHandler}>Logout</button>
                                    </div>
                                }
                            >
                                <div></div>
                            </Popover>
                        </>
                        :
                        <div onMouseEnter={() => setIsPopoverOpen(true)} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                            <Avatar src={`https://ui-avatars.com/api/?name=${data[0]?.firstName}+${data[0]?.lastName}`} />
                            <Popover
                                isOpen={isPopoverOpen}
                                onClickOutside={() => setIsPopoverOpen(false)}
                                positions={['top', 'bottom', 'left', 'right:10']} // preferred positions by priority
                                marginTop={10}
                                content={
                                    <div className="popover_div">
                                        <button onClick={myProfileHandler}>My Profile</button>
                                        <div className="horizontal_div"></div>
                                        <button className="logout_button" onClick={logoutHandler}>Logout</button>
                                    </div>
                                }
                            >
                                <div></div>
                            </Popover>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default withRouter(Navbar);