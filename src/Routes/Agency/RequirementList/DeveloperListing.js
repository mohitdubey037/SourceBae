import React from 'react';
import styles from './DeveloperListing.module.css';
import Button from '../../../Components/Button/Button';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import buttonStyles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';

function DeveloperListing({ item, onApply }) {
    const getTechnologies = (data) => {
        let result = '';
        data.forEach(
            (item, index) =>
                (result =
                    result +
                    item.technologyName +
                    (data?.length !== index + 1 && ', '))
        );
        return result;
    };

    return (
        <div className={styles.developerListingContainer}>
            <span className={styles.heading}>developer listing</span>
            {item?.map((person) => (
                <div className={styles.DLCard}>
                    <SizedBox height={'6px'} />
                    <div className={styles.nameContainer}>
                        <span
                            className={styles.name}
                        >{`${person?.firstName} ${person?.lastName}`}</span>
                        <input
                            type={'checkbox'}
                            checked={person?.isDeveloperShared}
                        />
                    </div>
                    <SizedBox height={'6px'} />
                    <span className={styles.techText}>
                        {getTechnologies(person?.developerTechnologies)}
                    </span>
                    <SizedBox height={'10px'} />
                    <span
                        className={styles.experienceText}
                    >{`experience- ${person?.developerExperience} years`}</span>
                    <SizedBox height={'24px'} />
                    <div style={{ pointerEvents: 'inherit' }}>
                        <Button
                            onClick={() =>
                                window.open(
                                    person?.developerDocuments[0]?.documentLink
                                )
                            }
                            name="View Resume"
                            buttonExtraStyle={{
                                borderColor: '#45A4EA',
                                width: '110px'
                            }}
                            buttonTextStyle={buttonTextStyle}
                        />
                    </div>
                </div>
            ))}
            <SizedBox height={'16px'} />
            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <button
                    onClick={onApply}
                    className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
                >
                    <span>Apply</span>
                </button>
            </div>
            <SizedBox height={'16px'} />
        </div>
    );
}

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
