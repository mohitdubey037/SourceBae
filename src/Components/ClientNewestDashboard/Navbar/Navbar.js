import React, { useEffect, useState } from 'react';
import instance from '../../../Constants/axiosConstants';
import { withRouter } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import './Navbar.css';
import cookie from 'react-cookies';
import { CLIENT, AGENCY } from '../../../shared/constants';
import { AGENCYROUTES, CLIENTROUTES } from '../../../Navigation/CONSTANTS';

function Navbar(props) {
    const logoLink =
        'https://sourcebae.s3.ap-south-1.amazonaws.com/staging/image/Sourcebae-14.svg';
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const url = props.history.location.pathname;
    const role = localStorage.getItem('role');
    const roleId = localStorage.getItem('userId');
    const [data, setData] = useState({});

    const myProfileHandler = () => {
        if (role === AGENCY) {
            props.history.push(AGENCYROUTES.PROFILE);
        }
        if (role === CLIENT) {
            props.history.push(CLIENTROUTES.PROFILE);
        }
    };

    const logoutHandler = () => {
        localStorage.clear();
        cookie.remove('Authorization');
        window.location.href = '/';
    };

    useEffect(() => {
        if (role === CLIENT) {
            instance
                .get(`/api/${role}/clients/get/${roleId}`)
                .then(function (response) {
                    setData(response);
                })
                .catch((err) => {});
        } else {
            instance
                .get(`/api/${role}/agencies/get/${roleId}`)
                .then(function (response) {
                    setData(response);
                })
                .catch((err) => {});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const RouteRedirect1 = () => {
        if (role === CLIENT) {
            props.history.replace(CLIENTROUTES.DASHBOARD);
        }
        if (role === AGENCY) {
            props.history.replace(AGENCYROUTES.DASHBOARD);
        }
    };

    return (
        <div
            style={{
                top:
                    (url.includes(CLIENTROUTES.DASHBOARD) ||
                        url.includes(AGENCYROUTES.DASHBOARD) ||
                        url.includes(AGENCYROUTES.QUOTATIONS) ||
                        url.includes('agency-list') ||
                        url.includes('/project-details') ||
                        url.includes(AGENCYROUTES.PROJECT_DETAILS) ||
                        url.includes(AGENCYROUTES.DASHBOARD) ||
                        url.includes(CLIENTROUTES.PROJECT_LIST)) &&
                    '1rem',
                justifyContent:
                    (url.includes(CLIENTROUTES.DASHBOARD) ||
                        url.includes(AGENCYROUTES.DASHBOARD) ||
                        url.includes(AGENCYROUTES.QUOTATIONS) ||
                        url.includes('/agency-list') ||
                        url.includes('/project-details') ||
                        url.includes(AGENCYROUTES.PROJECT_DETAILS) ||
                        url.includes(CLIENTROUTES.PROJECT_LIST)) &&
                    'flex-end'
            }}
            className="navbar"
        >
            <div
                style={{
                    display:
                        (url.includes(CLIENTROUTES.DASHBOARD) ||
                            url.includes(AGENCYROUTES.DASHBOARD) ||
                            url.includes(AGENCYROUTES.QUOTATIONS) ||
                            url.includes('agency-list') ||
                            url.includes('/project-details') ||
                            url.includes(AGENCYROUTES.PROJECT_DETAILS) ||
                            url.includes(CLIENTROUTES.PROJECT_LIST)) &&
                        'none'
                }}
                className="logoLink_navbar"
            >
                <img onClick={RouteRedirect1} src={logoLink} alt="logo" />
            </div>
            <div className="navbar-items">
                <div style={{ paddingRight: '10px' }} className="username">
                    <p>
                        {role === 'client'
                            ? data[0]?.firstName + ' ' + data[0]?.lastName
                            : data?.agencyName}
                    </p>
                </div>
                <div className="userprofile-circle nav-left-item">
                    {role === AGENCY ? (
                        <>
                            <img
                                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                                src={
                                    data?.agencyLogo
                                        ? data?.agencyLogo
                                        : `https://ui-avatars.com/api/?name=${data?.agencyName}`
                                }
                                alt="a logo"
                            />
                            <Popover
                                isOpen={isPopoverOpen}
                                onClickOutside={() => setIsPopoverOpen(false)}
                                positions={[
                                    'top',
                                    'bottom',
                                    'left',
                                    'right:10'
                                ]} // preferred positions by priority
                                marginTop={10}
                                content={
                                    <div className="popover_div">
                                        <button onClick={myProfileHandler}>
                                            My Profile
                                        </button>
                                        <div className="horizontal_div"></div>
                                        <button
                                            className="logout_button"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                }
                            >
                                <div></div>
                            </Popover>
                        </>
                    ) : (
                        <>
                            <img
                                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                                src={
                                    data?.[0]?.clientLogo
                                        ? data?.[0]?.clientLogo
                                        : `https://ui-avatars.com/api/?name=${data[0]?.firstName}+${data[0]?.lastName}`
                                }
                                alt="client logo"
                            />
                            <Popover
                                isOpen={isPopoverOpen}
                                onClickOutside={() => setIsPopoverOpen(false)}
                                positions={[
                                    'top',
                                    'bottom',
                                    'left',
                                    'right:10'
                                ]} // preferred positions by priority
                                marginTop={10}
                                content={
                                    <div className="popover_div">
                                        <button onClick={myProfileHandler}>
                                            My Profile
                                        </button>
                                        <div className="horizontal_div"></div>
                                        <button
                                            className="logout_button"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                }
                            >
                                <div></div>
                            </Popover>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withRouter(Navbar);
