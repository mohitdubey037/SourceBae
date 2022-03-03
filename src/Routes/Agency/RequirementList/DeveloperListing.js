import React from 'react';
import styles from './DeveloperListing.module.css';
import Button from '../../../Components/Button/Button';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import buttonStyles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';

function DeveloperListing() {
    return (
        <div className={styles.developerListingContainer}>
            <span className={styles.heading}>developer listing</span>
            {Array(3)
                .fill('maq')
                ?.map((item, index) => (
                    <DeveloperListingCard key={3 * index} />
                ))}
            <SizedBox height={'33px'} />
            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <button
                    className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
                >
                    <span>Apply</span>
                </button>
            </div>
            <SizedBox height={'16px'} />
        </div>
    );
}

export const DeveloperListingCard = () => (
    <div className={styles.DLCard}>
        <SizedBox height={'6px'} />
        <div className={styles.nameContainer}>
            <span className={styles.name}>Mujahid AQ</span>
            <input type={'checkbox'} />
        </div>
        <SizedBox height={'6px'} />
        <span className={styles.techText}>quantum, atomic, nuclear </span>
        <SizedBox height={'10px'} />
        <span className={styles.experienceText}>experience- 3+ years</span>
        <SizedBox height={'24px'} />
        <div style={{ pointerEvents: 'inherit' }}>
            <Button
                name="View Resume"
                buttonExtraStyle={{ borderColor: '#45A4EA', width: '110px' }}
                buttonTextStyle={buttonTextStyle}
            />
        </div>
    </div>
);

export const buttonTextStyle = {
    fontFamily: 'Segoe UI',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '19px',
    textTransform: 'capitalize',
    color: '#45A4EA'
};

export default DeveloperListing;
