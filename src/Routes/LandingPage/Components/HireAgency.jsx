import CtaButton from './CtaButton';
import { laptops } from '../Logos';
import styles from './HireAgency.module.css';
import { useHistory } from 'react-router-dom';
import { CLIENTROUTES } from '../../../Navigation/CONSTANTS';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const HireAgencySection = () => {
    const [hireAgencyRef, hireAgencyRefInView] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px'
    });

    const variants = {
        show: { opacity: 1 }
    };

    const history = useHistory();

    return (
        <motion.section
            className={styles.hire_agency}
            ref={hireAgencyRef}
            style={{ opacity: 0 }}
            animate={hireAgencyRefInView && 'show'}
            variants={variants}
            transition={{ duration: 2 }}
        >
            {' '}
            <div className={styles.hire_agency_container}>
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
                <CtaButton
                    onClick={() =>
                        history.push(CLIENTROUTES.HIRE_AGENCY_FOR_PROJECT_1)
                    }
                    text="Hire Now"
                />
            </div>
            <div className={styles.devillusholder}>
                <img src={laptops} alt="developer illustration" />
            </div>
        </motion.section>
    );
};

export default HireAgencySection;
