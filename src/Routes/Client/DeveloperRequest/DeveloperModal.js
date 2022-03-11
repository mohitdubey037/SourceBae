import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import instance from '../../../Constants/axiosConstants';
import { CLIENT } from '../../../shared/constants';
import ConfirmationModal from './ConfirmationModal';
import DeveloperCard from './DeveloperCard';
import styles from './DeveloperModal.module.css';
import { ACCEPT, DELETE } from './types';

export default function DeveloperModal({ modal, onCloseModal, selectedCard }) {
    const [developerIds, setDeveloperIds] = useState([]);
    const [confirmationModalType, setconfirmationModalType] = useState('');
    const role = CLIENT;

    const selectedMyDev = (newDevId) => {
        console.log(developerIds, 'developerIds selectd');
        const updatedDev = developerIds?.map((item) => {
            if (item.developerId === newDevId) {
                if (item.developerStatus === 1 || item.developerStatus === 2) {
                    item.developerStatus = 3;
                } else {
                    item.developerStatus = 1;
                }
            }
            return item;
        });

        console.log(updatedDev, 'updatedDev');
        setDeveloperIds(updatedDev);
        // let isAlreadyChecked = developerIds?.some(
        //     (devId) => devId === newDevId
        // );
        // isAlreadyChecked
        //     ? setDeveloperIds(() =>
        //           developerIds?.filter((devId) => devId !== newDevId)
        //       )
        //     : setDeveloperIds([...developerIds, newDevId]);
    };

    useEffect(() => {
        setDeveloperIds(
            modal?.data?.developersShared?.map((item) => ({
                developerStatus: item?.developerStatus,
                developerId: item?.developerId?._id
            }))
        );
        console.log(developerIds, 'developerIds');
    }, [modal?.data?.developersShared]);
    const acceptMyDevsPatchCall = async () => {
        let url = `/api/${role}/hire-developers/share-developer/${selectedCard}`;
        let body = {
            updateStatusByClient: '1',
            developerIds: developerIds
        };
        instance.patch(url, body).then(() => {
            window.location.reload();
        });
    };

    return (
        <Modal
            center
            open={modal?.open}
            showCloseIcon={false}
            onClose={onCloseModal}
            classNames={{ modal: styles.modalRoot }}
        >
            <div className={styles.modalContainer}>
                <div className={styles.header_holder}>
                    <DeveloperListingTag label={'developer listing:'} />
                    <button
                        className={styles.apply_now}
                        onClick={() => setconfirmationModalType(ACCEPT)}
                    >
                        Apply
                    </button>
                </div>

                <SizedBox height={'20px'} />
                {modal?.data?.developersShared?.length ? (
                    <div className={styles.cardHolder}>
                        {modal?.data?.developersShared?.map((item) => {
                            const sharedbyClient =
                                item?.developerStatus === 3 ? true : false;
                            return (
                                <div className={styles.cardContainer}>
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            selectedMyDev(
                                                item?.developerId?._id
                                            )
                                        }
                                        className={styles.developer_checkbox}
                                        defaultChecked={sharedbyClient}
                                    />
                                    <DeveloperCard
                                        data={item}
                                        developerIds={developerIds}
                                        onDelete={() =>
                                            setconfirmationModalType(DELETE)
                                        }
                                        onAccept={() =>
                                            setconfirmationModalType(ACCEPT)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.noDevsShared}>
                        No developers shared yet:
                    </div>
                )}
            </div>

            <ConfirmationModal
                type={confirmationModalType}
                onAffirmation={() =>
                    confirmationModalType === ACCEPT
                        ? acceptMyDevsPatchCall()
                        : {}
                }
                onCloseModal={() => setconfirmationModalType('')}
            />
        </Modal>
    );
}

export const DeveloperListingTag = ({ label }) => (
    <div>
        <span className={styles.listingLabel}>{label}</span>
    </div>
);
