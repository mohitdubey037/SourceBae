import React, { useEffect, useState } from 'react';
import instance from '../../../Constants/axiosConstants';
import { withRouter } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import './Navbar.css';
import { Avatar } from '@material-ui/core';
import cookie from "react-cookies";
import { CLIENT, AGENCY } from "../../../shared/constants"

function Navbar(props) {

    const logoLink = "https://sourcebae.s3.ap-south-1.amazonaws.com/staging/image/Sourcebae-14.svg";
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const url = props.history.location.pathname;
    const role = localStorage.getItem('role');
    const roleId = localStorage.getItem("userId");
    const [data, setData] = useState({});

    const myProfileHandler = () => {
        if (role === AGENCY) {
            props.history.push('/agency-profile')
        }
        if (role === CLIENT) {
            props.history.push('/client-profile');
        }
    }

    const logoutHandler = () => {
        localStorage.clear();
        cookie.remove("Authorization");
        window.location.href = 'https://sourcebae.com/';
    }

    useEffect(() => {
        if (role === CLIENT) {
            instance.get(`/api/${role}/clients/get/${roleId}`)
                .then(function (response) {
                    setData(response);
                })
                .catch(err => {
                })
        }

        else {
            instance.get(`/api/${role}/agencies/get/${roleId}`)
                .then(function (response) {
                    setData(response);
                })
                .catch((err) => {
                });
        }
    }, [])

    const RouteRedirect1 = () => {
        if (role === CLIENT) {
            props.history.replace('/clientNewestDashboard');
        }
        if (role === AGENCY) {
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
                    <p>{role === "client" ? data[0]?.firstName + " " + data[0]?.lastName : data?.agencyName}</p>
                </div>
                <div className="userprofile-circle nav-left-item" >
                    {role === AGENCY ?
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