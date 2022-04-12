import React from 'react';
import styles from './LandingPage.module.css';
import {
    LandingNavbar,
    CtaButton,
    CtaSection,
    IntroSection,
    FeatureSection,
    LogoBar,
    FactCard,
    HireDevSection,
    HireAgencySection,
    SourceBaeProcessSteps,
    ConnectPlansSection,
    TestimonialsSection,
    FooterSection
} from './Components/index';
import { useHistory } from 'react-router-dom';
import { CLIENTROUTES } from '../../Navigation/CONSTANTS';

export default function LandingPage() {

    const history = useHistory()

    return (
        <div className={styles.landing_page_wrapper}>
            <LandingNavbar />
            <div className={styles.intro_container}>
                <IntroSection />
                <CtaSection>
                    <CtaButton onClick={() => history.push(CLIENTROUTES.HIRE_DEVELOPER)} text="Hire Now - it's Free" />
                    <span className={styles.cta_subtext}>
                        Active jobs requirement
                    </span>
                </CtaSection>
            </div>
            <LogoBar />
            <div className={styles.feature_section_wrapper}>
                <FeatureSection />
                <FactCard />
            </div>
            <div className={styles.fact_action}>
                <span className={styles.action_text}>
                    {' '}
                    Get Hiring Done With SourceBae
                </span>
                <span className={styles.text_button}>Hire Now</span>
            </div>
            <HireDevSection />
            <HireAgencySection />
            <SourceBaeProcessSteps />
            <ConnectPlansSection />
            <TestimonialsSection />
            <FooterSection />
        </div>
    );
}
