import './RightSide.css';
import { useState } from 'react';
import getInTouch from '../../../assets/images/Newestdashboard/RightSide/GetInTouch.svg';
import CallIcon from '../../../assets/images/Newestdashboard/Dashboard/phone_call.svg';
import { Modal } from 'react-responsive-modal';

function RightSide() {
    const Role = localStorage.getItem('role');

    const openAlert = () => {
        alert('Email: mohitdubey037@gmail.com');
    };

    const [open, setOpen] = useState(false);

    const onCloseModal = () => setOpen(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    return (
        <>
            <div className="content-rightBody_parent">
                <div className="navigation-item">
                    <div className="itemContent-1"></div>
                    <div className="itemContent-heading">
                        <div className="heading-text">
                            <p>Get In Touch</p>
                            <img
                                onClick={onOpenModal}
                                className="getInTouch"
                                src={CallIcon}
                                alt="callIcon"
                            />
                        </div>
                    </div>
                    <div className="itemContent-videoCard"></div>
                    <div className="itemContent-cta">
                        <div className="cta-item">
                            <div>
                                <p>Need Any Help?</p>
                            </div>
                            <div className={`view-details-btn`}>
                                <button
                                    onClick={onOpenModal}
                                    className={`${
                                        Role === 'Client' &&
                                        'conditionalGradient'
                                    }`}
                                >
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: 'customOverlayAgencyProduct',
                    modal: 'customModalRightSide'
                }}
                styles={{
                    closeButton: { outline: 'none' }
                }}
                center
            >
                <div className="contact-us">
                    <div>
                        <p className="email_contactUs">Email:</p>
                        <p className="contact_shethink">contact@shethink.in</p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <p className="email_contactUs">Phone-Number:</p>
                        <p className="contact_shethink">+918109517047</p>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default RightSide;
