import React from 'react';
import styles from './About_Banner.module.css';
import aboutBanner1 from '../../../../assets/images/LandingPage/about-banner-1.jpg';
import LButton from '../../../MainLandingPage/Components/Button/LButton';
import aboutBanner2 from '../../../../assets/images/LandingPage/banner-2.jpg';
import RightWhitArrow from '../../../../assets/images/LandingPage/RightWhitArrow.svg';

export default function About_Banner() {
    const onClickEvent = () => {
        window.location.href =
            'https://www.google.com/maps/uv?pb=!1s0x396302a97eaaaaab%3A0x47d2f775686fee19!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPONzx7q6f62pbrlgQ8ydDxmDH-QHW6vjYAr2U2%3Dw426-h240-k-no!5sshethink%20private%20limited%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipPONzx7q6f62pbrlgQ8ydDxmDH-QHW6vjYAr2U2&hl=en&sa=X&ved=2ahUKEwiQ8srXsM31AhUYc3AKHZHfAv0Qoip6BAgkEAM';
    };
    return (
        <>
            <div className={`${styles.about_titles_wrap}`}>
                <div className={`${styles.about_main_title}`}>
                    <h2 className={`${styles.about_heading_bg} L_h2`}>
                        About <span>Us</span>
                    </h2>
                </div>
                <div className={`${styles.about_subtitle}`}>
                    <p className="L_para">
                        “Talent wins games, but teamwork and intelligence win
                        championships.”
                        <br />
                        <span className="span_blue">Michael Jordan</span>
                    </p>
                </div>
            </div>
            <div className={`${styles.about_banner_div}`}>
                <div className={`${styles.about_banner_left_div}`}>
                    <img src={aboutBanner1} alt="" />
                </div>
                <div className={`${styles.about_banner_right_div}`}>
                    <div className={`${styles.about_banner_right_img}`}>
                        <img src={aboutBanner2} alt="" />
                    </div>
                    <div className={`${styles.about_banner_btn}`}>
                        <LButton
                            name="See More"
                            img={RightWhitArrow}
                            onClickEvent={onClickEvent}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
