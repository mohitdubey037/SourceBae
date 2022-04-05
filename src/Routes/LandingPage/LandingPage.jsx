import React from 'react';
import styles from './LandingPage.module.css';
import {
    sequoia,
    innovation,
    plane,
    hireDevUpGradient,
    hireSectionEndGradient,
    developer,
    laptops,
    step1,
    step2,
    step3,
    step4,
    step5
} from './Logos';
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
                    <li>
                        <span className={styles.emphasize_golden}>
                            Monthly Payments
                        </span>{' '}
                        NDA Protected
                    </li>
                    <li>
                        Engineers With Experience At Top Brands In Many
                        Industries
                    </li>
                    <li>
                        <span className={styles.emphasize_golden}>
                            {' '}
                            NO Individual Freelancers,
                        </span>{' '}
                        We Only Work With Registered IT Agencies
                    </li>
                    <li>Experienced Engineers, Available From NEXT Day</li>
                </ul>
            </div>
            <CtaButton text="Hire Now" />
        </section>
    );
};
const HireAgencySection = () => {
    return (
        <section className={styles.hire_agency}>
            <div className={styles.hire_agency_title}>Hire Agency</div>
            <div className={styles.hire_agency_features_list}>
                <ul>
                    <li>
                        <span className={styles.emphasize_golden}>
                            NDA Protected, ZERO Commisions
                        </span>{' '}
                        Or Hidden Costs
                    </li>
                    <li>Thousand's Of Reviews By Clients</li>
                    <li>Many Companies Checks into Agency's</li>
                    <li>Hire Domain Expertise Agency</li>
                    <li>
                        Save Time, Save Cost,
                        <span className={styles.emphasize_golden}>
                            {' '}
                            Hire In Just 4 Steps
                        </span>
                    </li>
                </ul>
            </div>
            <CtaButton text="Hire Now" />
        </section>
    );
};

const SourceBaeProcessSteps = () => {
    return (
        <section className={styles.steps_section}>
            <div className={styles.steps_title}>
                <span className={styles.title}>
                    Using SourceBae For Your Remote Hiring Is
                </span>
                <span className={styles.adjective_easy}>Easy</span>
            </div>
            <div className={styles.steps_frame}>
                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step1} alt="step1" />
                            <span className={styles.step_number}>
                                First Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Select Hire Type
                            </span>
                            <span className={styles.step_description}>
                                Choose Your Hire Type From Our Handpicked
                                Verified Agency
                            </span>
                            <div className={styles.step_options}>
                                <ul>
                                    <li>Hire Agency</li>
                                    <li>Hire Developer</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step2} alt="step2" />
                            <span className={styles.step_number}>
                                Second Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Choose Your Preferences
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Agency{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Select Technology Or Budget
                                                Range To Find Agencies On Range
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Remote Developer{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Will Match Suitable Candidates.
                                                Or You Can Choose Manual.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step3} alt="step2" />
                            <span className={styles.step_number}>
                                Third Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Post Job
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Agency{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Select Service Type - Web,
                                                Mobile, Design, etc and Post.
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Remote Developer{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Best-Matched Engineers, Industry
                                                Experienced Developers.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step4} alt="step2" />
                            <span className={styles.step_number}>
                                Fourth Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Ask For Proposal
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Agency{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Connect Directly: Chat / Zoom /
                                                WhatsApp. SourceBae Helps You in
                                                Agreements Or Negotitations.
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Hire Remote Developer{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                Customer Success Team Will
                                                Contact You For Further
                                                Processes Like Agreements,
                                                Payment Terms, Candidate
                                                interviews.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.step_container}>
                    <div className={styles.left_bar} />
                    <div className={styles.step_content}>
                        <div className={styles.step_number_indicator}>
                            <img src={step5} alt="step2" />
                            <span className={styles.step_number}>
                                Fifth Step
                            </span>
                        </div>
                        <div className={styles.step_text}>
                            <span className={styles.step_heading}>
                                Amazing Support!
                            </span>

                            <div className={styles.step_options}>
                                <ul>
                                    <li>
                                        <div className={styles.list_item}>
                                            <span
                                                className={
                                                    styles.list_item_text
                                                }
                                            >
                                                Available 24/7{' '}
                                            </span>

                                            <span
                                                className={
                                                    styles.list_item_description
                                                }
                                            >
                                                WhatsApp, Email, Call
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <div className={styles.devillusholder}>
                <img src={developer} alt="developer illustration" />
            </div>
            <HireAgencySection />
            <div className={styles.devillusholder}>
                <img src={laptops} alt="developer illustration" />
            </div>
            <div className={styles.hire_dev_title}>
                <img
                    src={hireSectionEndGradient}
                    alt="end_gradient"
                    width="100%"
                />
            </div>

            <SourceBaeProcessSteps />
        </div>
    );
}
