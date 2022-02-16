/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './mainhomepage.css';
import cookie from 'react-cookies';
// import { AGENCY } from '../../shared/constants';

const Mainhomepage = (props) => {
    const auth = cookie.load('Authorization');
    const role = localStorage.getItem('role');

    useEffect(() => {
        localStorage.setItem('toggle', false);
    }, []);

    useEffect(() => {
        if (auth !== null && auth !== undefined) {
            props.history.replace(`/login/${role}`);
        } else {
            window.location.href = '/';
        }
    }, []);

    return (
        <>
            {/* {!auth ? (
                <div className="mainHomePage">
                    <div className="innerHomePage">
                        <div
                            className="HomePageCard"
                            onClick={() =>
                                props.history.push(`/login/${AGENCY}`)
                            }
                        >
                            <span className="leftHomePageBorder"></span>
                            <p>Login</p>
                        </div>
                        <div
                            className="HomePageCard"
                            onClick={() =>
                                props.history.push(`/register/${AGENCY}`)
                            }
                        >
                            <span className="leftHomePageBorder"></span>
                            <p>Sign Up</p>
                        </div>
                    </div>
                </div>
            ) : null} */}
        </>
    );
};

export default Mainhomepage;
