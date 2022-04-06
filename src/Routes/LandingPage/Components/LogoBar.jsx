import styles from './LogoBar.module.css';
import { sequoia, innovation } from '../Logos';
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

export default LogoBar;
