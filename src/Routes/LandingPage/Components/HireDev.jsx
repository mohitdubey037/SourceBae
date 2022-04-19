import CtaButton from './CtaButton';
import { developer } from '../Logos';
import styles from './HireDev.module.css';
import { useHistory } from 'react-router-dom';
import { CLIENTROUTES } from '../../../Navigation/CONSTANTS';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const HireDevSection = () => {
    const history = useHistory();
    const [hireDevRef, hireDevRefInView] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px'
    });

    const variants = {
        show: { opacity: 1 }
    };
    return (
        <motion.section
            className={styles.hire_dev}
            ref={hireDevRef}
            style={{ opacity: 0 }}
            animate={hireDevRefInView && 'show'}
            variants={variants}
            transition={{ duration: 1 }}
        >
            <div className={styles.hire_dev_container}>
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
                <CtaButton
                    onClick={() => history.push(CLIENTROUTES.HIRE_DEVELOPER)}
                    text="Hire Now"
                />
            </div>
            <div className={styles.devillusholder}>
                <img src={developer} alt="developer illustration" />
            </div>
        </motion.section>
    );
};

export default HireDevSection;
