import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import instance from '../../../Constants/axiosConstants';
import { CLIENT } from '../../../shared/constants';
import ConfirmationModal from './ConfirmationModal';
import DeveloperCard from './DeveloperCard';
import styles from './DeveloperModal.module.css';
import infoIcon from './informationNew.svg';
import { ACCEPT, DELETE } from './types';
import { toast } from 'react-toastify';

let limitReached = false;
export default function DeveloperModal({ modal, onCloseModal, selectedCard }) {
    const [developerIds, setDeveloperIds] = useState([]);
    const [confirmationModalType, setconfirmationModalType] = useState('');

    const role = CLIENT;

    let requiredResources = modal?.data?.numberOfResourcesRequired;
    //if developerStatus = 3 then it means required resource is accepted
    console.log(modal, 'modal');

    const selectedMyDev = (newDevId) => {
        limitReached = false;
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

        let acceptedDevs = updatedDev?.filter(
            (item) => item.developerStatus === 3
        );

        console.log(acceptedDevs?.length, 'accepted devs', requiredResources);
        if (acceptedDevs?.length > requiredResources) {
            toast.error(
                'Only ' + requiredResources + ' developers are required'
            );
            limitReached = true;
            return;
        }
        console.log(updatedDev, acceptedDevs.length, 'count');

        setDeveloperIds(updatedDev);
    };

    useEffect(() => {
        requiredResources = modal?.data?.numberOfResourcesRequired;
    }, [modal?.data?.numberOfResourcesRequired]);
    useEffect(() => {
        setDeveloperIds(
            modal?.data?.developersShared?.map((item) => ({
                developerStatus: item?.developerStatus,
                developerId: item?.developerId?._id
            }))
        );
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

    function checkedOrNot(developerId) {
        let checked = false;
        if (!limitReached)
            developerIds?.forEach((item) => {
                if (item.developerId === developerId) {
                    if (item.developerStatus === 3) {
                        checked = true;
                    }
                }
            });

        return checked;
    }

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
                    {modal?.data?.developersShared?.length > 0 && (
                        <button
                            className={styles.apply_now}
                            onClick={() => setconfirmationModalType(ACCEPT)}
                        >
                            Apply
                        </button>
                    )}
                </div>

                <SizedBox height={'20px'} />
                {modal?.data?.developersShared?.length ? (
                    <div className={styles.cardHolder}>
                        {modal?.data?.developersShared?.map((item) => {
                            const isNotShortlistedByClient =
                                item?.developerSharedBy === 2 ? false : true;

                            let titleText = '';
                            if (item?.developerSharedBy === 2) {
                                if (item?.isAnswered) {
                                    if (item?.developerStatus === 1)
                                        titleText =
                                            'Agency rejected the developer request';
                                    else if (item?.developerStatus === 3)
                                        titleText =
                                            'Agency accepted the developer request';
                                } else {
                                    if (item?.isAnswered === false)
                                        if (item?.developerStatus === 2)
                                            titleText =
                                                'Waiting for the response from the Agency';
                                }
                            }
                            let isChecked = checkedOrNot(
                                item?.developerId?._id
                            );
                            return (
                                <div className={styles.cardContainer}>
                                    {isNotShortlistedByClient ? (
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                selectedMyDev(
                                                    item?.developerId?._id
                                                )
                                            }
                                            className={
                                                styles.developer_checkbox
                                            }
                                            checked={isChecked}
                                        />
                                    ) : (
                                        <span
                                            className={
                                                styles.developer_checkbox
                                            }
                                            title={titleText}
                                        >
                                            {' '}
                                            <img
                                                width={20}
                                                src={infoIcon}
                                                alt=""
                                            />
                                        </span>
                                    )}
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
