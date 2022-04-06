import styles from './ConnectPlan.module.css';
import CtaButton from './CtaButton';
const ConnectPlansSection = () => {
    return (
        <section className={styles.connect_plans_section}>
            <div className={styles.connect_text_container}>
                Tell Us About Your Hiring Plans On An Intro Call. We'll Start
                The Matching Process Right Away.
            </div>
            <CtaButton text="Hire Now - it's FREE" />
        </section>
    );
};
export default ConnectPlansSection;
