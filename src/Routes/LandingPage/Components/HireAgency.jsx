import CtaButton from './CtaButton';
import { laptops } from '../Logos';
import styles from './HireAgency.module.css';
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
            <div className={styles.devillusholder}>
                <img src={laptops} alt="developer illustration" />
            </div>
        </section>
    );
};

export default HireAgencySection;
