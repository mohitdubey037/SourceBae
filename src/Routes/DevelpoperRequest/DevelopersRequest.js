import React, { useState } from 'react';
import Back from '../../Components/Back/Back';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import styles from './DeveloperRequest.module.css';
import document from '../../assets/images/OtherIcons/detail.svg';
import SizedBox from '../../Components/SizedBox/SizedBox';
import DeveloperCard from './DeveloperCard';
import Button from '../../Components/Button/Button';
import DetailsModal from './DetailsModal';
import ConfirmationModal from './ConfirmationModal';
import { ACCEPT, DELETE } from './types';

const DevelopersRequest = () => {
    const [open, setopen] = useState(false);
    const [confirmationModalType, setconfirmationModalType] = useState('');

    return (
        <div>
            <div className={styles.navbarDiv}>
                <Navbar />
            </div>
            <Back name={'Developer Request'} />

            <div className={styles.ListingContainer}>
                <ListingContainer
                    header={'React js requirement'}
                    onClick={() => setopen(true)}
                >
                    <DeveloperListingTag label={'developer listing:'} />
                    <SizedBox height={'20px'} />
                    <div className={styles.cardHolder}>
                        {Array(4)
                            .fill('maq1')
                            .map((item) => (
                                <div className={styles.cardContainer}>
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
                    <div className={styles.showMorebtn}>
                        <Button
                            name="show more"
                            buttonExtraStyle={buttonExtraStyle}
                            buttonTextStyle={buttonTextStyle}
                        />
                    </div>
                </ListingContainer>

                <SizedBox height={'60px'} />
                <ListingContainer
                    header={'React js requirement'}
                    onClick={() => setopen(true)}
                >
                    <DeveloperListingTag label={'developer listing:'} />
                    <SizedBox height={'20px'} />
                    <div className={styles.cardHolder}>
                        {Array(8)
                            .fill('maq')
                            .map((item) => (
                                <div className={styles.cardContainer}>
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
                    <div className={styles.showMorebtn}>
                        <Button
                            name="show more"
                            buttonExtraStyle={buttonExtraStyle}
                            buttonTextStyle={buttonTextStyle}
                        />
                    </div>
                </ListingContainer>

                <SizedBox height={'60px'} />
                <ListingContainer
                    header={'React js requirement'}
                    onClick={() => setopen(true)}
                >
                    <DeveloperListingTag label={'developer listing:'} />
                    <SizedBox height={'20px'} />
                    <div className={styles.cardHolder}>
                        {Array(8)
                            .fill('maq')
                            .map((item) => (
                                <div className={styles.cardContainer}>
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
                    <div className={styles.showMorebtn}>
                        <Button
                            name="show more"
                            buttonExtraStyle={buttonExtraStyle}
                            buttonTextStyle={buttonTextStyle}
                        />
                    </div>
                </ListingContainer>
            </div>

            <DetailsModal open={open} onCloseModal={() => setopen(!open)} />

            <ConfirmationModal
                type={confirmationModalType}
                onCloseModal={() => setconfirmationModalType('')}
            />
        </div>
    );
};

const ListingContainer = (props) => (
    <div className={styles.RLContainer}>
        {props.children}
        <div className={styles.listingHeader}>
            {props.header}
            <img
                src={document}
                onClick={props.onClick}
                className={styles.headerIcon}
                alt="document"
            />
        </div>
    </div>
);

const DeveloperListingTag = ({ label }) => (
    <div>
        <span className={styles.listingLabel}>{label}</span>
    </div>
);

const buttonExtraStyle = {
    background: 'rgba(1, 95, 154, 0.12)',
    borderRadius: '6px',
    border: 'none',
    width: '100px'
};

const buttonTextStyle = {
    fontFamily: 'Segoe UI',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.4px',
    textTransform: 'capitalize',
    color: '#015F9A'
};

export default DevelopersRequest;
