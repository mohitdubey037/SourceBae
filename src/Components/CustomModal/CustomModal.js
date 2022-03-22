import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';

function CustomModal({ showModal, message, buttonText, action }) {
    return (
        <>
            <Modal
                open={showModal}
                closeOnOverlayClick={true}
                showCloseIcon={false}
                classNames={{
                    overlay: 'customOverlayAgencyProduct',
                    modal: 'customModalClientOneHireDeveloper'
                }}
                styles={{
                    closeButton: { outline: 'none' }
                }}
                center
            >
                <div className="want_to_accept">
                    <div className="connect_or_not">
                        <h6>{message}</h6>
                    </div>

                    <div className="interested_or_not verify_or_not">
                        <div className="update_now" onClick={action}>
                            <p>{buttonText}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default withRouter(CustomModal);
