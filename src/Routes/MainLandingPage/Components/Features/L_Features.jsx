import React from 'react';
import styles from './L_Features.module.css';
import featureImg1 from '../../../../assets/images/LandingPage/feature-1.png';
import feature2 from '../../../../assets/images/LandingPage/feature-2.png';
import feature3 from '../../../../assets/images/LandingPage/feature-3.png';

export default function L_Features() {
    const featureCards = [
        {
            img: featureImg1,
            heading: '250+',
            subheading: 'Partner agencies',
            des: [
                'Proven track record in your specific industry or domain',
                'Instantly identify agencies or developers',
                'Agencies and developers go through a fool-proof due-diligence process'
            ]
        },
        {
            img: feature2,
            heading: '1000s+',
            subheading: 'Remote developers',
            des: [
                '80+ in-demand Tech',
                'Pre-Screened Profiles, Monthly Timesheet',
                'Fastest Onboarding Time'
            ]
        },
        {
            img: feature3,
            heading: '48-hour',
            subheading: 'Matching',
            des: [
                'Sourcebae handpicks the best-matched candidates from its pool',
                'Hiring 1 or 1000, One Point of Contact',
                'The agreement signed. Experienced engineers. Risk-free Developer'
            ]
        }
    ];
    return (
        <>
            {' '}
            <div className={`${styles.features_heading}`}>
                <h2 className="L_h2">
                    what <span className="span_pink">SourceBae</span> can do for
                    you??
                </h2>
            </div>
            <div className={`${styles.feature_cards_wrap}`}>
                {featureCards?.map((value, index) => {
                    return (
                        <div
                            className={`${styles.feature_main_card} ${
                                index === 0 || index === 2
                                    ? styles.feature_main_card_margin
                                    : ''
                            }`}
                        >
                            <div className={`${styles.feature_card_img}`}>
                                <img src={value.img} alt="" />
                            </div>
                            <div className={`${styles.feature_card_heading}`}>
                                <h2 className="L_h2">{value.heading}</h2>
                            </div>
                            <div
                                className={`${styles.feature_card_subheading}`}
                            >
                                <h3>{value.subheading}</h3>
                            </div>
                            <div className={`${styles.feature_card_des}`}>
                                <ul className={`${styles.feature_card_des_ui}`}>
                                    {value?.des?.map((line) => {
                                        return <li>{line}</li>;
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
