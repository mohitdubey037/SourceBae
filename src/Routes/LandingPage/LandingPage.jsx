import React from 'react';
import styles from './LandingPage.module.css';
import logo from './sourcebae_white.svg';
import MenuIcon from '@material-ui/icons/Menu';

const LandingNavbar = () => {
    return (
        <div className={styles.landing_page_nav}>
            <div className={styles.nav_logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.nav_menu}>
                <MenuIcon htmlColor="#554dde" />
            </div>
        </div>
    );
};

const CtaButton = () => {
    return (
        <button className={styles.cta_button}>
            <span>Hire Now - it’s FREE</span>
        </button>
    );
};

const CtaSection = (props) => {
    return <div className={styles.cta_section}></div>;
};

const IntroSection = () => {
    return (
        <section className={styles.intro_section}>
            <div className={styles.intro_section_heading}>
                <span>India's #1 Marketplace For Hiring Remote Developer</span>
            </div>
            <div className={styles.intro_section_subheading}>
                <span>
                    SourceBae is a Marketplace that connects you with IT
                    Agencies and Dedicated Remote Developers from around the
                    world.
                </span>
            </div>
        </section>
    );
};
export default function LandingPage() {
    return (
        <div className={styles.landing_page_wrapper}>
            <LandingNavbar />
            <IntroSection />
            <CtaButton />
        </div>
    );
}
