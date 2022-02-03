import React, { useEffect, useState } from 'react';
import instance from '../../Constants/axiosConstants';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import Spinner from '../../Components/Spinner/Spinner';

function VerifyModal(props) {
    const [loading, setLoading] = useState(false);

    const [checkEmail, setCheckEmail] = useState(false);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };
    const onCloseModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (props?.isUserVerified) {
            onCloseModal();
        } else if (props?.isUserVerified === false) {
            onOpenModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.isUserVerified]);

    const verifyEmailPhone = () => {
        setLoading(true);
        instance
            .post(`/api/${props.Role}/auths/send-verification-link`, {
                userId: props.id,
                verify: 'email'
            })
            .then(function (response) {
                setLoading(false);
                setCheckEmail(true);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <Modal
                    open={open}
                    closeOnOverlayClick={false}
                    showCloseIcon={false}
                    onClose={() => {
                        onCloseModal();
                    }}
                    classNames={{
                        overlay: 'customOverlayAgencyProduct',
                        modal: 'customModalClientOneHireDeveloper',
                        closeButton: 'customCloseButton'
                    }}
                    styles={{ closeIcon: { top: '2px' } }}
                    center
                >
                    <div className="want_to_accept">
                        {checkEmail ? (
                            <div className="connect_or_not">
                                <p>Please check Your Email</p>
                                <p>Please Reload this page after verifying.</p>
                            </div>
                        ) : (
                            <>
                                <div className="connect_or_not">
                                    <h6>Please Verify Your Email</h6>
                                </div>

                                <div className="interested_or_not verify_or_not">
                                    <div
                                        className="update_now"
                                        onClick={verifyEmailPhone}
                                    >
                                        <p>Verify Now</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default withRouter(VerifyModal);
