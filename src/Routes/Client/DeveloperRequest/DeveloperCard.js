import React from 'react';
import styles from './DeveloperCard.module.css';
import SizedBox from '../../../Components/SizedBox/SizedBox';

const DeveloperCard = ({ data = {}, titleText }) => {
    const getTechnologies = (data) => {
        let result = '';
        Array.isArray(data) &&
            data.forEach(
                (item, index) =>
                (result =
                    result +
                    item.technologyName +
                    (data?.length !== index + 1 ? ', ' : ''))
            );
        return result;
    };

    const buttonString =
        data?.developerStatus === 1
            ? 'Rejected'
            : data?.developerStatus === 2
                ? 'To be Accepted'
                : 'Accepted';

    const buttonColor =
        data?.developerStatus === 1
            ? 'red'
            : data?.developerStatus === 2
                ? 'blue'
                : 'green';

    const generateExperienceString = (experience) => {
        let result = '';
        let expCount = parseInt(experience);

        if (expCount > 1) {
            result = expCount + ' Years';
        } else if (expCount === 1) {
            result = expCount + ' Year';
        }
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
                        {generateExperienceString(
                            data?.developerId?.developerExperience
                        )}{' '}
                    </span>
                </div>
                <div>
                    <span className={styles.techLabel}>budget</span>
                    <span
                        className={styles.techDescription}
                    >{`$${data?.developerId?.developerPriceRange}/ month`}</span>
                </div>
            </div>

            <SizedBox height={'12px'} />
            {!!titleText && (
                <div style={{ fontSize: '0.7rem' }}>
                    <strong>Status: </strong>
                    <span>{titleText}</span>
                </div>
            )}
            <div
                className={styles.status_container}
                style={{ backgroundColor: buttonColor }}
            >
                <div className={styles.status_label}>{`${buttonString}`}</div>
            </div>
        </div>
    );
};

export default DeveloperCard;
