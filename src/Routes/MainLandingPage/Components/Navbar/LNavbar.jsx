import React from 'react';
import styles from './LNavbar.module.css';
import LNavLogo from '../../../../assets/images/Logo/Sourcebae-14.svg';
import selectArrow from '../../../../assets/images/LandingPage/SelectArrow.svg';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import {
    AGENCYROUTES,
    CLIENTROUTES,
    USERROUTES
} from '../../../../Navigation/CONSTANTS.js';
export default function LNavbar(props) {
    function handleMenuToggle() {
        let demo = document.getElementById('demo');
        if (demo.style.display === 'flex') demo.style.display = 'none';
        else demo.style.display = 'flex';
    }
    return (
        <>
            <div className={`${styles.navbar_wrap}`}>
                <div
                    className={`${styles.nav_logo} `}
                    onClick={() => (window.location.href = '/')}
                >
                    <img src={LNavLogo} alt="" />
                </div>
                <div className={`${styles.nav_menu_wrap}`}>
                    <div className={`${styles.nav_menu}`}>
                        <Link to="/">Home</Link>
                    </div>
                    <div className={`${styles.nav_menu}`}>
                        {' '}
                        <Link to={USERROUTES.ABOUT_US}>Who We Are</Link>
                    </div>
                    <div
                        className={`${styles.nav_services} ${styles.nav_menu} `}
                    >
                        <span
                            onMouseOver={() =>
                            (document.getElementById(
                                'pop-up'
                            ).style.display = 'block')
                            }
                            style={{ display: 'flex' }}
                        >
                            Services
                            <img
                                src={selectArrow}
                                alt=""
                                className={`${styles.nav_arrow}`}
                            />
                        </span>
                    </div>
                    <div
                        className={`${styles.service_option_wrap}`}
                        id="pop-up"
                    >
                        <div className={`${styles.option_1}`}>
                            <Link to={CLIENTROUTES.REGISTER} className="L_Link">
                                {' '}
                                Hire Agency
                            </Link>
                        </div>
                        <div className={`${styles.option_1}`}>
                            <Link to={CLIENTROUTES.REGISTER} className="L_Link">
                                {' '}
                                Hire Developer
                            </Link>
                        </div>
                        <div className={`${styles.option_1}`}>
                            <Link to={AGENCYROUTES.REGISTER} className="L_Link">
                                {' '}
                                List Your Developer
                            </Link>
                        </div>
                        <div className={`${styles.option_1}`}>
                            <Link to="/active-requirements" className="L_Link">
                                {' '}
                                Active Requirements
                            </Link>
                        </div>
                    </div>
                </div>
                <Link
                    to={AGENCYROUTES.LOGIN}
                    className={`${styles.L_Link} ${styles.nav_login}`}
                >
                    <button
                        className={`${styles.L_login} ${styles.nav_Lbutton}`}
                    >
                        Log In
                    </button>{' '}
                </Link>
                <Link
                    id={'nav_sign_up_btn'}
                    to={AGENCYROUTES.REGISTER}
                    className={`${styles.L_Link} ${styles.nav_signup}`}
                >
                    <button
                        className={`${styles.L_signup} ${styles.nav_Lbutton}`}
                    >
                        Sign Up
                    </button>
                </Link>
                <div
                    className={`${styles.navbar_responsive_icon}`}
                    onClick={handleMenuToggle}
                >
                    <FiMenu size={'2rem'} />
                </div>
            </div>
            <div className={`${styles.responsive_L_navbar_wrap}`} id="demo">
                <ul className={`${styles.responsive_L_navbar_ul}`}>
                    <li className={`${styles.nav_menu}`}>
                        <Link to={USERROUTES.HOME}>Home</Link>
                    </li>
                    <li className={`${styles.nav_menu}`}>
                        <Link to={USERROUTES.ABOUT_US}>Who We Are</Link>
                    </li>
                    <li className={`${styles.nav_menu}`}>Services</li>
                </ul>
            </div>
        </>
    );
}
