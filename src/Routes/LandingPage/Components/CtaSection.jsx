import styles from './CtaSection.module.css';

const CtaSection = ({ children }) => {
    return <div className={styles.cta_section}>{children}</div>;
};

export default CtaSection;
