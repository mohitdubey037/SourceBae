import React from 'react';
import LButton from '../../../MainLandingPage/Components/Button/LButton';
import styles from './About_Career.module.css';
import btnArrow from '../../../../assets/images/LandingPage/RightWhitArrow.svg';
import careerImg from '../../../../assets/images/LandingPage/career-about.png';
export default function About_Career() {
    const onClickEvent = () => {
        window.location.href = 'https://shethink.in/career/';
    };
    return (
        <>
            <div className={`${styles.about_career_img}`}>
                <img src={careerImg} alt="" />
            </div>
            <div className={`${styles.about_career_detail}`}>
                <div className={`${styles.about_career_headig}`}>
                    <span className="span_pink">Careers</span>
                    <h2 className="L_h2"> Shape your career with us</h2>
                </div>
                <div className={`${styles.about_career_info}`}>
                    <p className="L_para">
                        Building a world-class product requires a world-class
                        team. Our team has a very strong belief in the mission
                        and works hard to redefine the future of outsourcing.
                    </p>
                </div>
                <div className={`${styles.about_career_btn}`}>
                    <LButton
                        name="See All position"
                        img={btnArrow}
                        onClickEvent={onClickEvent}
                    />
                </div>
            </div>
        </>
    );
}
