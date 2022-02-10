import React from 'react';
import LButton from '../Button/LButton';
import styles from './L_CTA_Bottom.module.css';
import ctaImg from '../../../../assets/images/LandingPage/CTA-bottom.svg';
import hireBtnImg from '../../../../assets/images/LandingPage/hirebtn.svg';

export default function L_CTA_Bottom() {
    return (
        <div className={`${styles.CTA_bottom}`}>
            <div className={`${styles.CTA_bottom_img}`}>
                <img src={ctaImg} alt="" />
            </div>
            <div className={`${styles.CTA_bottom_heading}`}>
                <h2 className="L_h2">
                    Tell us about your Hiring plans on an intro call <br />—
                    we’ll start the matching process right away.
                </h2>
            </div>
            <div className={`${styles.CTA_bottom_btn}`}>
                <LButton name="Get Started" img={hireBtnImg} />
            </div>
        </div>
    );
}
