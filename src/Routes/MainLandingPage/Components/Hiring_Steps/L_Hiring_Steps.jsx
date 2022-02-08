import React from 'react';
import styles from './L_Hiring_Steps.module.css';
import step1Img from '../../../../assets/images/LandingPage/step-1.svg';
import step2Img from '../../../../assets/images/LandingPage/step-2.svg';
import step3Img from '../../../../assets/images/LandingPage/step-3.svg';
import step4Img from '../../../../assets/images/LandingPage/step-4.svg';
import step5Img from '../../../../assets/images/LandingPage/step-5.svg';

export default function L_Hiring_Steps() {
    const hiringStepsCard = [
        {
            img: step1Img,
            step: 'First Step',
            heading: 'Select Hire Type',
            hireAgency: '',
            hireDeveloper: ''
        },
        {
            img: step2Img,
            step: 'Second Step',
            heading: 'Choose your preferences',
            hireAgency:
                'Select Technology or Budget Rangeto find agencies on range etc',
            hireDeveloper:
                'Will match suitable candidates. Or you can choose Manual.'
        },
        {
            img: step3Img,
            step: 'Third Step',
            heading: 'Post Job',
            hireAgency:
                'Select Service type Web, mobile, design, etc and post.',
            hireDeveloper:
                'Best-matched engineers, Industry Experience Developers.'
        },
        {
            img: step4Img,
            step: 'Fourth Step',
            heading: 'Ask for Proposal',
            hireAgency:
                'Connect directly: chat / zoom / whatsapp, sourcebae helps you in agreements or negotiations.',
            hireDeveloper:
                'Customer Success team will contact you for further processes like agreements, payment terms, candidate interviews.'
        },
        {
            img: step5Img,
            step: 'Fifth Step',
            heading: 'Amazing Support!',
            hireAgency: '',
            hireDeveloper: ''
        }
    ];
    return (
        <>
            <div className={`${styles.hiring_steps_main_heading}`}>
                <h2 className="L_h2">
                    Using <span className="span_pink">SourceBae</span> for your
                    Remote Hiring is <span className="span_pink">easy</span>
                </h2>
            </div>
            <div className={`${styles.hiring_steps_cards_wrap}`}>
                {hiringStepsCard?.map((hiringStepCard, index) => {
                    return (
                        <div className={`${styles.hiring_steps_main_card}`}>
                            <div
                                className={`${styles.hiring_steps_card_heading}`}
                            >
                                <img src={hiringStepCard.img} alt="" />
                                <h4 className="span_pink">
                                    {hiringStepCard.step}
                                </h4>
                            </div>
                            <div className={`${styles.hiring_step_name}`}>
                                <h2>{hiringStepCard.heading}</h2>
                            </div>
                            {index === 0 &&
                                'Choose your Hire type our Handpicked Verified Agency'}
                            <div className={`${styles.hiring_step_des}`}>
                                {index !== 4 && (
                                    <ul
                                        className={`${styles.hiring_step_des_ul}`}
                                    >
                                        <li>Hire Agency</li>
                                        <p
                                            className={`${styles.hiring_step_para}`}
                                        >
                                            {hiringStepCard.hireAgency}
                                        </p>
                                        <li>Hire Remote Developer</li>
                                        <p
                                            className={`${styles.hiring_step_para}`}
                                        >
                                            {hiringStepCard.hireDeveloper}
                                        </p>
                                    </ul>
                                )}
                                {index === 4 && (
                                    <ul
                                        className={`${styles.hiring_step_des_ul}`}
                                    >
                                        <li>Available 24/7</li>
                                        <p
                                            className={`${styles.hiring_step_para}`}
                                        >
                                            Whatsapp <br /> Email <br /> Call
                                        </p>
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
