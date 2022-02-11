import React, { useState } from 'react';
import styles from './LNavbar.module.css';
import LNavLogo from '../../../../assets/images/Logo/Sourcebae-14.svg';
import selectArrow from '../../../../assets/images/LandingPage/SelectArrow.svg';
import { Link } from 'react-router-dom';
export default function LNavbar() {
    const onClickFun = () => {
        window.location.href = 'https://app.sourcebae.com/register/agency';
    };
    const [popupShow, setPopupShow] = useState(false);
    return (
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
                <div className={`${styles.service_option_wrap}`} id="pop-up">
                    <div className={`${styles.option_1}`} onClick={onClickFun}>
                        Hire Agency
                    </div>
                    <div className={`${styles.option_1}`} onClick={onClickFun}>
                        Hire Developer
                    </div>
                </div>
            </div>
            <div className={`${styles.nav_login} `}>
                <button
                    className={`${styles.L_login} ${styles.nav_Lbutton}`}
                    onClick={() => {
                        window.location.href =
                            'https://app.sourcebae.com/login/agency';
                    }}
                >
                    Log In
                </button>
            </div>
            <div className={`${styles.nav_signup} `}>
                <button
                    className={`${styles.L_signup} ${styles.nav_Lbutton}`}
                    onClick={onClickFun}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
