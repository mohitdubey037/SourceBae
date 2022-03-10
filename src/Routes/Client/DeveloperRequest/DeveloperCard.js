import React from 'react';
import styles from './DeveloperCard.module.css';
import SizedBox from '../../../Components/SizedBox/SizedBox';

const DeveloperCard = (props) => {
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
                >{`${props?.data?.developerId?.firstName} ${props?.data?.developerId?.lastName}`}</div>
            </div>

            <SizedBox height={'16px'} />
            <span className={styles.techLabel}>Techstack</span>
            <div>
                <span className={styles.techDescription}>
                    {getTechnologies(
                        props?.data?.developerId?.developerTechnologies
                    )}
                </span>
            </div>

            <SizedBox height={'16px'} />
            <div className={styles.experienceDiv}>
                <div>
                    <span className={styles.techLabel}>experience</span>
                    <span className={styles.techDescription}>
                        {props?.data?.developerId?.developerExperience}{' '}
                    </span>
                </div>
                <div>
                    <span className={styles.techLabel}>budget</span>
                    <span
                        className={styles.techDescription}
                    >{`₹${props?.data?.developerId?.developerPriceRange}/ month`}</span>
                </div>
            </div>

            <SizedBox height={'12px'} />
            <div className={styles.status_container}>
                <div className={styles.status_label}>Approved</div>
                {/* <Button
                    name={
                        props?.data?.developerStatus === 3
                            ? 'Accepted'
                            : 'Accept'
                    }
                    onClick={props.onAccept}
                    buttonExtraStyle={
                        ({ ...buttonExtraStyle },
                        {
                            backgroundColor:
                                props?.data?.developerStatus === 3
                                    ? 'rgba(0, 123, 64, 0.12)'
                                    : '#015F9A',
                            border: 'none'
                        })
                    }
                    buttonTextStyle={
                        ({ ...buttonTextStyle },
                        {
                            color:
                                props?.data?.developerStatus === 3
                                    ? '#007B40'
                                    : '#ffffff'
                        })
                    }
                /> */}
            </div>
        </div>
    );
};

const buttonExtraStyle = {
    backgroundColor: '#015F9A',
    width: 'min-content',
    padding: '4px 12px 6px 12px',
    borderRadius: '6px'
};

const buttonTextStyle = {
    fontFamily: 'Segoe UI',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    textTransform: 'capitalize'
};

export default DeveloperCard;
