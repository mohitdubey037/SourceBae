import styles from './FooterSection.module.css';
import { brandLogo } from '../Logos';
const FooterSection = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.centered_logo}>
                <img src={brandLogo} alt="logo" />
            </div>
            <div className={styles.footer_details}>
                <div className={styles.detail_block}>
                    <span className={styles.block_heading}>Address</span>
                    <span className={styles.block_content}>
                        No.1, Street, City, State, Country
                    </span>
                </div>
                <div className={styles.detail_block}>
                    <span className={styles.block_heading}>Contact</span>
                    <span className={styles.block_content}>
                        For any queries, please contact us at:
                        <br />
                        info@sourcebae.com
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
