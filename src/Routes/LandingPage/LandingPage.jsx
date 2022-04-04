import React from 'react';
import styles from './LandingPage.module.css';
import { sequoia, innovation, plane, hireDevUpGradient } from './Logos';
import { LandingNavbar } from './Components/index';

const CtaButton = ({ text = 'Hire Now' }) => {
    return (
        <button className={styles.cta_button}>
            <span>{text}</span>
        </button>
    );
};

const CtaSection = ({ children }) => {
    return <div className={styles.cta_section}>{children}</div>;
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

const FeatureSection = () => {
    return (
        <section className={styles.feature_section}>
            <div className={styles.feature_question}>
                <div className={styles.illustration}>
                    <img src={plane} alt="plane" />
                </div>
                <div className={styles.question}>
                    What{' '}
                    <span className={styles.emphasize_blue}>SourceBae</span> Can
                    Do For You?
                </div>
            </div>
        </section>
    );
};

const LogoBar = () => {
    return (
        <section className={styles.logobar_container}>
            <div className={styles.logobar_intro_text}>
                <span className={styles.emphasize}>Many Businesses</span> Trust
                Us With Their Hiring And Project Distribution
            </div>
            <div className={styles.logo_row}>
                <img src={sequoia} alt="sequoia" />
                <img src={innovation} alt="sequoia" />
            </div>
        </section>
    );
};

const FactCard = () => {
    return (
        <div className={styles.fact_card}>
            <div className={styles.card_left}>
                <span className={styles.card_left_text}>
                    250+ Partner Agencies
                </span>
            </div>
            <div className={styles.card_right}>
                <ul>
                    <li>
                        Proven Track Record In Your Specific Industry or Domain
                    </li>
                    <li>Instantly identify Agencies or Developers</li>
                    <li>
                        Agencies and Developers go Through a Fool-Proof
                        Due-Diligence Process
                    </li>
                </ul>
            </div>
        </div>
    );
};

const HireDevSection = () => {
    return (
        <section className={styles.hire_dev}>
            <div
                className={styles.hire_dev_title}
                style={{ backgroundImage: `url(${hireDevUpGradient})` }}
            >
                Hire Developer
            </div>
            <div className={styles.hire_dev_features_list}>
                <ul>
                    <li>Handpicked Agencies Bench Resources</li>
                    <li>Monthly Payments NDA Protected</li>
                    <li>
                        Engineers With Experience At Top Brands In Many
                        Industries
                    </li>
                    <li>
                        NO Individual Freelancers, We Only Work With Registered
                        IT Agencies
                    </li>
                    <li>Experienced Engineers, Available From NEXT Day</li>
                </ul>
            </div>
            <CtaButton text="Hire Now" />
        </section>
    );
};
export default function LandingPage() {
    return (
        <div className={styles.landing_page_wrapper}>
            <LandingNavbar />
            <IntroSection />
            <CtaSection>
                <CtaButton text="Hire Now - it's Free" />
                <span className={styles.cta_subtext}>
                    Active jobs requirement
                </span>
            </CtaSection>
            <LogoBar />
            <FeatureSection />
            <FactCard />
            <div className={styles.fact_action}>
                <span className={styles.action_text}>
                    {' '}
                    Get Hiring Done With SourceBae
                </span>
                <span className={styles.text_button}>Hire Now</span>
            </div>
            <HireDevSection />
        </div>
    );
}
