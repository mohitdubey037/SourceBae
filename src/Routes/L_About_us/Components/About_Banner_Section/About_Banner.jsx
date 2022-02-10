import React from 'react';
import styles from './About_Banner.module.css';
import aboutBanner1 from '../../../../assets/images/LandingPage/about-banner-1.jpg';
import LButton from '../../../MainLandingPage/Components/Button/LButton';
import aboutBanner2 from '../../../../assets/images/LandingPage/banner-2.jpg';
import RightWhitArrow from '../../../../assets/images/LandingPage/RightWhitArrow.svg';

export default function About_Banner() {
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
                        <LButton name="See More" img={RightWhitArrow} />
                    </div>
                </div>
            </div>
        </>
    );
}
