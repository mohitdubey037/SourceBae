import React from 'react';
import styles from './LNavbar.module.css';
import LNavLogo from '../../../../assets/images/Logo/Sourcebae-14.svg';
import selectArrow from '../../../../assets/images/LandingPage/SelectArrow.svg';
export default function LNavbar() {
    return (
        <div className={`${styles.navbar_wrap}`}>
            <div className={`${styles.nav_logo} `}>
                <img src={LNavLogo} alt="" />
            </div>
            <div className={`${styles.nav_menu_wrap}`}>
                <div className={`${styles.nav_menu}`}>Home</div>
                <div className={`${styles.nav_menu}`}>Who We Are</div>
                <div className={`${styles.nav_services} ${styles.nav_menu} `}>
                    Services
                    <img
                        src={selectArrow}
                        alt=""
                        className={`${styles.nav_arrow}`}
                    />
                </div>
                <div className={`${styles.service_option_wrap}`}>
                    <div className={`${styles.option_1}`}>Hire Agency</div>
                    <div className={`${styles.option_1}`}>Hire Developer</div>
                </div>
            </div>
            <div className={`${styles.nav_login} `}>
                <button className={`${styles.L_login} ${styles.nav_Lbutton}`}>
                    Log In
                </button>
            </div>
            <div className={`${styles.nav_signup} `}>
                <button className={`${styles.L_signup} ${styles.nav_Lbutton}`}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}
