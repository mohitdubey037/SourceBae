import CtaButton from './CtaButton';
import { developer } from '../Logos';
import styles from './HireDev.module.css';

const HireDevSection = () => {
    return (
        <section className={styles.hire_dev}>
            <div className={styles.hire_dev_title}>Hire Developer</div>
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
            <div className={styles.devillusholder}>
                <img src={developer} alt="developer illustration" />
            </div>
        </section>
    );
};

export default HireDevSection;
