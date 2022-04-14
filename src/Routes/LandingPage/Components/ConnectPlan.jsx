import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import styles from './ConnectPlan.module.css';
import CtaButton from './CtaButton';
const ConnectPlansSection = () => {
    const [connectPlanRef, connectPlanRefInView] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px'
    });

    const variants = {
        show: { opacity: 1 }
    };
    return (
        <motion.section
            className={styles.connect_plans_section}
            ref={connectPlanRef}
            style={{ opacity: 0 }}
            animate={connectPlanRefInView && 'show'}
            variants={variants}
            transition={{ duration: 1 }}
        >
            <div className={styles.connect_plans_container}>
                <div className={styles.connect_text_container}>
                    Tell Us About Your Hiring Plans On An Intro Call. We'll
                    Start The Matching Process Right Away.
                </div>
                <CtaButton text="Hire Now - it's FREE" />
            </div>
        </motion.section>
    );
};
export default ConnectPlansSection;
