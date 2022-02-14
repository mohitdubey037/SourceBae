import React, { useState } from 'react';
import styles from './LNavbar.module.css';
import LNavLogo from '../../../../assets/images/Logo/Sourcebae-14.svg';
import selectArrow from '../../../../assets/images/LandingPage/SelectArrow.svg';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
export default function LNavbar() {
    // const onClickFun = () => {
    //     window.location.href = 'https://app.sourcebae.com/register/agency';
    // };
    const [popupShow, setPopupShow] = useState(false);
    function handleMenuToggle() {
        console.log('Hi');
        let demo = document.getElementById('demo');
        console.log(demo);
        if (demo.style.display === 'flex') demo.style.display = 'none';
        else demo.style.display = 'flex';
    }
    return (
        <>
            <div className={`${styles.navbar_wrap}`}>
                <div className={`${styles.nav_logo} `}>
                    <img src={LNavLogo} alt="" />
                </div>
                <div
                    className={`${styles.nav_menu_wrap}`}
                    onClick={() => setPopupShow(false)}
                >
                    <div className={`${styles.nav_menu}`}>
                        <Link to="/">Home</Link>
                    </div>
                    <div className={`${styles.nav_menu}`}>
                        {' '}
                        <Link to="/whoAreYou">Who We Are</Link>
                    </div>
                    <div
                        className={`${styles.nav_services} ${styles.nav_menu} `}
                        onMouseOver={() =>
                            (document.getElementById('pop-up').style.display =
                                'block')
                        }
                    >
                        Services
                        <img
                            src={selectArrow}
                            alt=""
                            className={`${styles.nav_arrow}`}
                        />
                    </div>
                    <div
                        className={`${styles.service_option_wrap}`}
                        id="pop-up"
                    >
                        <div className={`${styles.option_1}`}>
                            <Link to="/register/agency" className="L_Link">
                                {' '}
                                Hire Agency
                            </Link>
                        </div>
                        <div className={`${styles.option_1}`}>
                            <Link to="/register/agency" className="L_Link">
                                {' '}
                                Hire Developer
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`${styles.nav_login} `}>
                    <button
                        className={`${styles.L_login} ${styles.nav_Lbutton}`}
                    >
                        <Link to="/login/agency" className="L_Link">
                            Log In
                        </Link>
                    </button>{' '}
                </div>
                <div className={`${styles.nav_signup} `}>
                    <button
                        className={`${styles.L_signup} ${styles.nav_Lbutton}`}
                    >
                        <Link to="/register/agency" className="L_Link">
                            {' '}
                            Sign Up
                        </Link>
                    </button>
                </div>
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
                        <Link to="/">Home</Link>
                    </li>
                    <li className={`${styles.nav_menu}`}>
                        <Link to="/whoAreYou">Who We Are</Link>
                    </li>
                    <li className={`${styles.nav_menu}`}>Services</li>
                </ul>
            </div>
        </>
    );
}
