import styles from './CTAContainer.module.css';
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import HalfCircleProgress from './HalfCircleProgress.svg';
import G2Icon from './G2Icon.svg';
import ProductHuntIcon from './producthunt.svg';
import TrustPilot from './trustpilot.svg';
import GoogleIcon from './google.svg';
import ContactUSBackground from './ContactUsBackground.svg';
import { AGENCY, CLIENT } from '../../../shared/constants';

function RightSide() {
    const role = localStorage.getItem('role');

    const [open, setOpen] = useState(false);

    const onCloseModal = () => setOpen(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    const topAgencies = [
        {
            name: 'CoodeIT Solutions Pvt Ltd',
            revenue: '25k$',
            logoUrl:
                'https://sourcebae.s3.amazonaws.com/staging/image/1642750955591.jpeg'
        },
        {
            name: 'Gyizer Systems Private Limited',
            revenue: '55k$',
            logoUrl:
                'https://sourcebae.s3.amazonaws.com/staging/image/1642750890774.jpeg'
        },
        {
            name: 'Syscort',
            revenue: '42k$',
            logoUrl:
                'https://sourcebae.s3.amazonaws.com/staging/image/1642750848457.jpeg'
        }
    ];

    return (
        <>
            <div className={styles.content_rightBody_parent}>
                <div className={styles.navigation_item}>
                    <div className={styles.itemContent_heading}>
                        <div className={styles.heading_text}>
                            {role === CLIENT ? (
                                <img
                                    onClick={onOpenModal}
                                    className={styles.getInTouch}
                                    src={HalfCircleProgress}
                                    alt="callIcon"
                                />
                            ) : (
                                <h3
                                    style={{
                                        marginBottom: '0',
                                        color: '#3A3A3A',
                                        fontWeight: 700
                                    }}
                                >
                                    Our top Agencies
                                </h3>
                            )}
                        </div>
                        {role === AGENCY ? (
                            <div className={styles.flex_column}>
                                {topAgencies.map((agency) => (
                                    <div
                                        style={{
                                            display: 'flex',
                                            marginTop: '0.8rem',
                                            gap: '1rem',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <img
                                            src={agency?.logoUrl}
                                            alt="unsplash"
                                            className={styles.agencyLogo}
                                        />
                                        <div>
                                            <p
                                                className={
                                                    styles.technology_detail
                                                }
                                            >
                                                {agency?.name}
                                            </p>
                                            <p>
                                                generated more than <br></br>{' '}
                                                {agency?.revenue}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    marginTop: '1.5rem'
                                }}
                            >
                                <p>
                                    We've{' '}
                                    <span style={{ fontWeight: 500 }}>
                                        helped
                                    </span>{' '}
                                    build and scale 100s of successful startups
                                </p>
                            </div>
                        )}
                        {/* </div> */}
                    </div>
                    <div className={styles.review_platform_card}>
                        <p> Review us on</p>
                        <div className={styles.review_platforms}>
                            <img
                                src={TrustPilot}
                                style={{ minHeight: '36px' }}
                                width="40px"
                                alt="TrustPilot"
                            />
                            <img
                                src={ProductHuntIcon}
                                style={{ minHeight: '36px' }}
                                width="40px"
                                alt="PIIcon"
                            />
                            <img
                                src={GoogleIcon}
                                style={{ minHeight: '36px' }}
                                width="40px"
                                alt="GoogleIcon"
                            />
                            <img
                                src={G2Icon}
                                style={{ minHeight: '36px' }}
                                width="40px"
                                alt="G2Icon"
                            />
                        </div>
                    </div>
                    <div
                        className={styles.cta_item}
                        style={{
                            background: `${
                                role === CLIENT ? '#0276BA' : '#6C63FF'
                            }`
                        }}
                    >
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
                                    role === 'Client' && 'conditionalGradient'
                                }`}
                            >
                                Email Us
                            </button>
                            <button
                                onClick={onOpenModal}
                                className={`${
                                    role === 'Client' && 'conditionalGradient'
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
