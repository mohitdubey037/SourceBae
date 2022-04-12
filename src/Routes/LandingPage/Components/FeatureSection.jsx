import styles from './FeatureSection.module.css';
import { plane } from '../Logos';

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
export default FeatureSection;
