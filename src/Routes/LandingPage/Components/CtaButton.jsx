import styles from './CtaButton.module.css';

const CtaButton = ({ text = 'Hire Now', onClick }) => {
    return (
        <button onClick={onClick} className={styles.cta_button}>
            <span>{text}</span>
        </button>
    );
};

export default CtaButton;
