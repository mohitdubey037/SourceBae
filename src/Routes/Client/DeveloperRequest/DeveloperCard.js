import React from 'react';
import styles from './DeveloperCard.module.css';
import SizedBox from '../../../Components/SizedBox/SizedBox';

const DeveloperCard = ({ data = {}, onAccept, onReject, selectedDevs }) => {
    const getTechnologies = (data) => {
        let result = '';
        Array.isArray(data) &&
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
        <div className={styles.mainContainer}>
            <div className={styles.nameBar}>
                <div
                    className={styles.name}
                >{`${data?.developerId?.firstName} ${data?.developerId?.lastName}`}</div>
            </div>

            <SizedBox height={'16px'} />
            <span className={styles.techLabel}>Techstack</span>
            <div>
                <span className={styles.techDescription}>
                    {getTechnologies(data?.developerId?.developerTechnologies)}
                </span>
            </div>

            <SizedBox height={'16px'} />
            <div className={styles.experienceDiv}>
                <div>
                    <span className={styles.techLabel}>experience</span>
                    <span className={styles.techDescription}>
                        {data?.developerId?.developerExperience}{' '}
                    </span>
                </div>
                <div>
                    <span className={styles.techLabel}>budget</span>
                    <span
                        className={styles.techDescription}
                    >{`₹${data?.developerId?.developerPriceRange}/ month`}</span>
                </div>
            </div>

            <SizedBox height={'12px'} />
            <div className={styles.status_container}>
                <div className={styles.status_label}>Approved</div>
            </div>
        </div>
    );
};

export default DeveloperCard;
