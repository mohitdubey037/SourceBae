import styles from './CtaButton.module.css';

const CtaButton = ({ text = 'Hire Now' }) => {
    return (
        <button className={styles.cta_button}>
            <span>{text}</span>
        </button>
    );
};

export default CtaButton;
