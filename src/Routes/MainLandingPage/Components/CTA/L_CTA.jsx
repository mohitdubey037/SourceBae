import React from 'react';
import LButton from '../Button/LButton';
import styles from './L_CTA.module.css';
import hireBtnImg from '../../../../assets/images/LandingPage/hirebtn.svg';

export default function L_CTA() {
    return (
        <>
            <div className={`${styles.CTA_heading}`}>
                <h2 className="L_h2">
                    SourceBae solves short-term technical hiring And IT Partner
                    Hiring for fast-growing companies
                </h2>
            </div>
            <div className={`${styles.CTA_btn}`}>
                <LButton name="Hire Now" img={hireBtnImg} />
            </div>
        </>
    );
}
