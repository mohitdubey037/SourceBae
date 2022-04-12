import styles from './FactCard.module.css';
const FactCard = () => {
    return (
        <div className={styles.fact_card}>
            <div className={styles.card_left}>
                <span className={styles.card_left_text}>
                    250+ Partner Agencies
                </span>
            </div>
            <div className={styles.card_right}>
                <ul>
                    <li>
                        Proven Track Record In Your Specific Industry or Domain
                    </li>
                    <li>Instantly identify Agencies or Developers</li>
                    <li>
                        Agencies and Developers go Through a Fool-Proof
                        Due-Diligence Process
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default FactCard;
