import styles from './IntroSection.module.css';
const IntroSection = () => {
    return (
        <section className={styles.intro_section}>
            <div className={styles.intro_section_heading}>
                <span className={styles.intro_heading}>
                    India's #1 Marketplace For Hiring Remote Developer
                </span>
                <span className={styles.intro_heading_web}>
                    India's Leading Marketplace For Hiring Remote Developer
                </span>
            </div>
            <div className={styles.intro_section_subheading}>
                <span className={styles.intro_section_subtitle}>
                    SourceBae is a Marketplace that connects you with IT
                    Agencies and Dedicated Remote Developers from around the
                    world.
                </span>
                <span className={styles.intro_section_subtitle_web}>
                    SourceBae is a Marketplace that connects you with IT
                    Agencies and Dedicated Remote Developers from around the
                    world. We make it easy for you to find an agency to build
                    MVP at a fixed cost or hire Developers on a monthly
                    contract.
                </span>
            </div>
        </section>
    );
};

export default IntroSection;
