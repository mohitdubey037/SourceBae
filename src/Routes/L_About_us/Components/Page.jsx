import React from 'react';
import styles from './Page.module.css';
import LFooter from '../../MainLandingPage/Components/L_Footer/L_Footer';
import LCTABottom from '../../MainLandingPage/Components/CTA_Bottom/L_CTA_Bottom';
import AboutBanner from './About_Banner_Section/About_Banner';
import AboutInfo from './About_Info/About_Info';
import AboutCareer from './About_Career/About_Career';
import AboutProgressBar from './About_ProgressBar/About_ProgressBar';
import LNavbar from '../../MainLandingPage/Components/Navbar/LNavbar';

export default function Page() {
    return (
        <div
            onClick={() =>
                (document.getElementById('pop-up').style.display = 'none')
            }
        >
            {' '}
            <div className={`${styles.landing_navbar}`}>
                <LNavbar />
            </div>
            <div className={`${styles.about_banner_wrap}`}>
                <AboutBanner />
            </div>
            <div className={`${styles.about_info_wrap}`}>
                <AboutInfo />
            </div>
            <div className={`${styles.about_progress_bar_wrap}`}>
                <AboutProgressBar />
            </div>
            <div className={`${styles.about_career_wrap}`}>
                <AboutCareer />
            </div>
            <div
                className={`${styles.about_CTA_bottom_padding} CTA_bottom_wrap`}
            >
                <LCTABottom />
            </div>
            <div className={'L_footer_wrap'}>
                <LFooter />
            </div>
        </div>
    );
}
