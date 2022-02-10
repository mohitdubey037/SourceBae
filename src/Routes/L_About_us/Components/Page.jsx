import React from 'react';
import styles from './Page.module.css';
import L_Footer from '../../MainLandingPage/Components/L_Footer/L_Footer';
import L_CTA_Bottom from '../../MainLandingPage/Components/CTA_Bottom/L_CTA_Bottom';
import About_Banner from './About_Banner_Section/About_Banner';
import About_Info from './About_Info/About_Info';
import About_Career from './About_Career/About_Career';
import About_ProgressBar from './About_ProgressBar/About_ProgressBar';
import LNavbar from '../../MainLandingPage/Components/Navbar/LNavbar';

export default function Page() {
    return (
        <>
            {' '}
            <div className={`${styles.landing_navbar}`}>
                <LNavbar />
            </div>
            <div className={`${styles.about_banner_wrap}`}>
                <About_Banner />
            </div>
            <div className={`${styles.about_info_wrap}`}>
                <About_Info />
            </div>
            <div className={`${styles.about_progress_bar_wrap}`}>
                <About_ProgressBar />
            </div>
            <div className={`${styles.about_career_wrap}`}>
                <About_Career />
            </div>
            <div
                className={`${styles.about_CTA_bottom_padding} CTA_bottom_wrap`}
            >
                <L_CTA_Bottom />
            </div>
            <div className={'L_footer_wrap'}>
                <L_Footer />
            </div>
        </>
    );
}
