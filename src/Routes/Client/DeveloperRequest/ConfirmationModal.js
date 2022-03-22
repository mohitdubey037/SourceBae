import React from 'react';
import { ACCEPT, DELETE } from './types';
import Modal from 'react-responsive-modal';
import styles from './ConfirmationModal.module.css';
import Button from '../../../Components/Button/Button';
import cross from '../../../assets/images/OtherIcons/crossInCircle.svg';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import acceptSvg from '../../../assets/images/DeveloperRequest/approval.svg';
import deleteSvg from '../../../assets/images/DeveloperRequest/delete.svg';

export default function ConfirmationModal({
    type,
    onCloseModal,
    onAffirmation
}) {
    return (
        <Modal
            center
            open={type === ACCEPT || type === DELETE}
            showCloseIcon={false}
            onClose={onCloseModal}
            classNames={{ modal: styles.modalRoot }}
            styles={{
                closeButton: { outline: 'none' }
            }}
        >
            <div className={styles.modalContainer}>
                <div>
                    <img
                        src={cross}
                        className={styles.crossImage}
                        onClick={onCloseModal}
                        alt="close modal"
                    />
                </div>
                <SizedBox height={'20px'} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        src={type === ACCEPT ? acceptSvg : deleteSvg}
                        alt="accept or delete"
                    />
                </div>
                <SizedBox height={'16px'} />
                <div style={{ display: 'flex' }}>
                    <span className={styles.message}>
                        {type === ACCEPT
                            ? 'Are you sure you want to accept this developer request'
                            : 'Are you sure you want to delete this developer request'}
                    </span>
                </div>

                <div className={styles.btnHolder}>
                    <Button
                        name="No"
                        buttonExtraStyle={{
                            ...buttonExtraStyle,
                            backgroundColor: '#ffffff',
                            borderColor: '#015F9A'
                        }}
                        buttonTextStyle={
                            ({ ...buttonTextStyle }, { color: '#015F9A' })
                        }
                        onClick={onCloseModal}
                    />
                    <Button
                        name="Yes"
                        buttonExtraStyle={{
                            ...buttonExtraStyle,
                            backgroundColor: '#015F9A',
                            border: 'none'
                        }}
                        buttonTextStyle={
                            ({ ...buttonTextStyle }, { color: '#ffffff' })
                        }
                        onClick={onAffirmation}
                    />
                </div>
            </div>
        </Modal>
    );
}

const buttonExtraStyle = {
    padding: '4px 12px 6px 12px',
    borderRadius: '6px',
    width: '70px',
    height: '36px'
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
