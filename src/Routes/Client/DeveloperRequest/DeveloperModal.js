import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import instance from '../../../Constants/axiosConstants';
import { CLIENT } from '../../../shared/constants';
import ConfirmationModal from './ConfirmationModal';
import DeveloperCard from './DeveloperCard';
import styles from './DeveloperModal.module.css';
import { ACCEPT, DELETE } from './types';

export default function DeveloperModal({ modal, onCloseModal }) {
    const [selectedDevs, setselectedDevs] = useState([]);
    const [confirmationModalType, setconfirmationModalType] = useState('');
    const role = CLIENT;

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

    const acceptMyDevsPatchCall = async (id) => {
        let url = `/api/${role}/hire-developers/share-developer/${id}`;
        let body = {
            developerIds: selectedDevs,
            developerStatus: '3'
        };
        instance
            .patch(url, body)
            .then((res) => {
                console.log(res, 'dfdgsddffdggs');
            })
            .catch((err) => console.log(err, 'u8r9we89fsa89d9'));
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
                        {modal?.data?.developersShared?.map((item) => (
                            <div className={styles.cardContainer}>
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        selectedMyDev(item?.developerId?._id)
                                    }
                                    className={styles.developer_checkbox}
                                />
                                <DeveloperCard
                                    data={item}
                                    onDelete={() =>
                                        setconfirmationModalType(DELETE)
                                    }
                                    onAccept={() =>
                                        setconfirmationModalType(ACCEPT)
                                    }
                                />
                            </div>
                        ))}
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
