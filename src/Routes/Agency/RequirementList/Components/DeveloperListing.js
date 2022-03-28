import React, { useState } from 'react';
import styles from './DeveloperListing.module.css';
import Button from '../../../../Components/Button/Button';
import SizedBox from '../../../../Components/SizedBox/SizedBox';
import paperPlane from '../../../../assets/images/DeveloperRequest/paperPlane.svg';
import buttonStyles from '../../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';
import { useHistory } from 'react-router-dom';
import { AGENCY } from '../../../../shared/constants';
import instance from '../../../../Constants/axiosConstants';

const agencyId = localStorage.getItem('userId') || '';
function DeveloperListing({ item, onApply, selectedCard, requirementData }) {
    const [selectedDevs, setselectedDevs] = useState([]);
    const history = useHistory();
    const [isResourceNeedSatified, setIsResourceNeedSatified] = useState(false);
    const getTechnologies = (data) => {
        let result = data.map((item) => item.technologyName)?.join(', ');
        return result;
    };

    const isAlreadyShared = (id) => selectedDevs?.some((devId) => devId === id);

    const selectedMyDev = (newDevId) => {
        let isAlreadyChecked = selectedDevs?.some(
            (devId) => devId === newDevId
        );
        isAlreadyChecked
            ? setselectedDevs(() =>
                  selectedDevs?.filter((devId) => devId !== newDevId)
              )
            : setselectedDevs([...selectedDevs, newDevId]);
    };

    function acceptOrReject(accept, developer) {
        let url = `/api/${AGENCY}/hire-developers/share-developer/${selectedCard}`;
        let body = {
            agencyId: agencyId,
            developerSharedByAgency: [
                { developerStatus: accept, developerId: developer?._id }
            ]
        };
        instance
            .patch(url, body)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    React.useEffect(() => {
        if (selectedCard) {
            let currentRequirement = requirementData?.filter(
                (item) => item._id === selectedCard
            );
            if (currentRequirement?.length > 0) {
                setIsResourceNeedSatified(
                    currentRequirement[0]?.numberOfAcceptedResources >=
                        currentRequirement[0]?.numberOfResourcesRequired
                );
            }
        }
    }, [requirementData, selectedCard]);
    return (
        <div className={styles.developerListingContainer}>
            <span className={styles.heading}>My Resources</span>
            {item?.length ? (
                <div style={{ minWidth: '260px' }}>
                    {item?.map((person) => {
                        let statusText = person?.isDeveloperShared
                            ? person?.developerSharedBy?.developerStatus === 3
                                ? 'Accepted'
                                : person?.developerSharedBy?.developerStatus ===
                                  1
                                ? 'Rejected'
                                : 'Shared'
                            : 'Not Shared';
                        return (
                            <div className={styles.DLCard} key={person?._id}>
                                <SizedBox height={'6px'} />
                                <div
                                    className={styles.nameContainer}
                                    style={{
                                        pointerEvents: person?.isDeveloperShared
                                            ? 'none'
                                            : 'all'
                                    }}
                                >
                                    <span
                                        className={styles.name}
                                    >{`${person?.firstName} ${person?.lastName}`}</span>

                                    {isResourceNeedSatified === false &&
                                        person?.isDeveloperShared === false && (
                                            <input
                                                type={'checkbox'}
                                                checked={isAlreadyShared(
                                                    person?._id
                                                )}
                                                onChange={() =>
                                                    selectedMyDev(person?._id)
                                                }
                                            />
                                        )}
                                </div>
                                <SizedBox height={'6px'} />
                                <span className={styles.techText}>
                                    {getTechnologies(
                                        person?.developerTechnologies
                                    )}
                                </span>
                                <SizedBox height={'10px'} />
                                <span
                                    className={styles.experienceText}
                                >{`experience- ${person?.developerExperience} years`}</span>
                                {person?.isDeveloperShared ? (
                                    <div
                                        className={`${styles['status-text']} ${
                                            styles[`status-text-${statusText}`]
                                        }`}
                                    >{`Shared Status- ${statusText}`}</div>
                                ) : (
                                    <div
                                        className={`${styles[`status-text`]}`}
                                    >{`Shared Status- ${statusText}`}</div>
                                )}
                                <SizedBox height={'24px'} />
                                <div
                                    style={{
                                        pointerEvents: 'inherit',
                                        display: 'flex'
                                    }}
                                >
                                    <Button
                                        onClick={() =>
                                            window.open(
                                                person?.developerDocuments[0]
                                                    ?.documentLink
                                            )
                                        }
                                        name="View Resume"
                                        buttonExtraStyle={{
                                            borderColor: '#45A4EA',
                                            width: '110px'
                                        }}
                                        buttonTextStyle={buttonTextStyle}
                                    />
                                    {!isResourceNeedSatified &&
                                        person?.isDeveloperShared &&
                                        person?.developerSharedBy
                                            ?.isAnswered === false &&
                                        person?.developerSharedBy
                                            ?.developerSharedBy === 2 && (
                                            <>
                                                <button
                                                    className={`${styles.accept_reject_dev_btn}`}
                                                    title={'Accept Developer'}
                                                    onClick={() => {
                                                        acceptOrReject(
                                                            3,
                                                            person
                                                        );
                                                    }}
                                                >
                                                    ✔{/* accept checkbox */}
                                                </button>
                                                <button
                                                    className={`${styles.accept_reject_dev_btn}`}
                                                    title={'Reject Developer'}
                                                    onClick={() => {
                                                        acceptOrReject(
                                                            1,
                                                            person
                                                        );
                                                    }}
                                                >
                                                    ❌
                                                </button>
                                            </>
                                        )}
                                </div>
                            </div>
                        );
                    })}
                    <SizedBox height={'16px'} />
                    <div
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <button
                            onClick={() => history.push('/add-developer')}
                            className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
                            style={{ marginBottom: '1rem' }}
                        >
                            <span>Add Developers</span>
                        </button>
                        <button
                            onClick={() => onApply(selectedDevs)}
                            className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
                        >
                            <span>Apply</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.paperPlane}>
                    <img
                        src={paperPlane}
                        style={{ height: '140px', width: '140px' }}
                        alt="no data"
                    />
                    {!selectedCard ? (
                        <span className={styles.noDataMsg}>
                            select one of the available requirement then select
                            your developer
                        </span>
                    ) : (
                        <>
                            <p
                                className={styles.noDataMsg}
                                style={{
                                    textTransform: 'unset',
                                    marginBottom: '20px'
                                }}
                            >
                                Looks like you haven't added any developers
                                matches with the requirement
                            </p>
                            <button
                                onClick={() => history.push('/add-developer')}
                                className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
                            >
                                <span>Add Developers</span>
                            </button>
                        </>
                    )}
                </div>
            )}
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
