import styles from './CTAContainer.module.css';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import HalfCircleProgress from './HalfCircleProgress.svg';
import G2Icon from './G2Icon.svg';
import GoogleIcon from './googleIcon.svg';
import PIcon from './PIcon.svg';
import StarIcon from './starIcon.svg';
import ContactUSBackground from './ContactUsBackground.svg';

function RightSide() {
    const Role = localStorage.getItem('role');

    const [open, setOpen] = useState(false);

    const onCloseModal = () => setOpen(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    return (
        <>
            <div className={styles.content_rightBody_parent}>
                <div className={styles.navigation_item}>
                    <div className={styles.itemContent_heading}>
                        <div className={styles.heading_text}>
                            <img
                                onClick={onOpenModal}
                                className={styles.getInTouch}
                                src={HalfCircleProgress}
                                alt="callIcon"
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                marginTop: '1.5rem'
                            }}
                        >
                            <p>
                                We've{' '}
                                <span style={{ fontWeight: 500 }}>helped</span>{' '}
                                build and scale 100s of successful startups
                            </p>
                        </div>
                    </div>
                    <div className={styles.review_platform_card}>
                        <p> Review us on</p>
                        <div className={styles.review_platforms}>
                            <img src={StarIcon} alt="StarIcon" />
                            <img src={PIcon} alt="PIIcon" />
                            <img src={GoogleIcon} alt="GoogleIcon" />
                            <img src={G2Icon} alt="G2Icon" />
                        </div>
                    </div>
                    <div className={styles.cta_item}>
                        <img
                            src={ContactUSBackground}
                            className={styles.backgroundIllustration}
                            alt="ContactUsBackground"
                        />
                        <div>
                            <p>Contact Us</p>
                        </div>
                        <span className={styles.description}>
                            We always help you in <br /> all way
                        </span>
                        <div className={styles.view_details_btn}>
                            <button
                                onClick={onOpenModal}
                                className={`${
                                    Role === 'Client' && 'conditionalGradient'
                                }`}
                            >
                                Email Us
                            </button>
                            <button
                                onClick={onOpenModal}
                                className={`${
                                    Role === 'Client' && 'conditionalGradient'
                                }`}
                            >
                                Feedback Form
                            </button>
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
                center
            >
                <div className="contact-us">
                    <div>
                        <p className="email_contactUs">Email:</p>
                        <p className="contact_shethink">info@sourcebae.com</p>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <p className="email_contactUs">Contact:</p>
                        <p className="contact_shethink">+91-6260295959</p>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default RightSide;
