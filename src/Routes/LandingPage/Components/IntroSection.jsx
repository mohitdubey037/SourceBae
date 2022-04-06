import styles from './IntroSection.module.css';
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

export default IntroSection;
