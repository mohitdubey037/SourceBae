import React from 'react';
import Hero_section from './Components/Hero_section/Hero_section';
import LNavbar from './Components/Navbar/LNavbar';
import styles from './Page.module.css';
import './Page.css';
import Logo_Row from './Components/Logo_Row/Logo_Row';
import LHire from './Components/Hire_Section/LHire';
import L_Features from './Components/Features/L_Features';
import L_CTA from './Components/CTA/L_CTA';
import L_Hiring_Steps from './Components/Hiring_Steps/L_Hiring_Steps';
import L_CTA_Bottom from './Components/CTA_Bottom/L_CTA_Bottom';
import L_Footer from './Components/L_Footer/L_Footer';
import L_Testimonial from './Components/Testimonial/L_Testimonial';

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
                <Hero_section />
            </div>
            <div className={`${styles.logo_row_wrap}`}>
                <Logo_Row />
            </div>
            <div className={`${styles.hire_section}`}>
                <LHire />
            </div>
            <div className={`${styles.features_wrap}`}>
                <L_Features />
            </div>
            <div className={`${styles.CTA_wrap}`}>
                <L_CTA />
            </div>
            <div className={`${styles.hiring_steps_wrap}`}>
                <L_Hiring_Steps />
            </div>
            <div className={`${styles.testimonial_wrap}`}>
                <L_Testimonial />
            </div>
            <div className="CTA_bottom_wrap">
                <L_CTA_Bottom />
            </div>
            <div className="L_footer_wrap">
                <L_Footer />
            </div>
        </div>
    );
}
