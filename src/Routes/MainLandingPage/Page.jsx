import React from 'react';
import HeroSection from './Components/Hero_section/Hero_section';
import LNavbar from './Components/Navbar/LNavbar';
import styles from './Page.module.css';
import './Page.css';
import LogoRow from './Components/Logo_Row/Logo_Row';
import LHire from './Components/Hire_Section/LHire';
import LFeatures from './Components/Features/L_Features';
import LCTA from './Components/CTA/L_CTA';
import LHiringSteps from './Components/Hiring_Steps/L_Hiring_Steps';
import LCTABottom from './Components/CTA_Bottom/L_CTA_Bottom';
import LFooter from './Components/L_Footer/L_Footer';
import LTestimonial from './Components/Testimonial/L_Testimonial';

export default function Page() {
    return (
        <div
            onClick={() =>
                (document.getElementById('pop-up').style.display = 'none')
            }
        >
            <div className={`${styles.landing_navbar}`}>
                <LNavbar />
            </div>
            <div className={`${styles.hero_section}`}>
                <HeroSection />
            </div>
            <div className={`${styles.logo_row_wrap}`}>
                <LogoRow />
            </div>
            <div className={`${styles.hire_section}`}>
                <LHire />
            </div>
            <div className={`${styles.features_wrap}`}>
                <LFeatures />
            </div>
            <div className={`${styles.CTA_wrap}`}>
                <LCTA />
            </div>
            <div className={`${styles.hiring_steps_wrap}`}>
                <LHiringSteps />
            </div>
            {/* <div className={`${styles.testimonial_wrap}`}>
                <LTestimonial />
            </div> */}
            <div className="CTA_bottom_wrap">
                <LCTABottom />
            </div>
            <div className="L_footer_wrap">
                <LFooter />
            </div>
        </div>
    );
}
