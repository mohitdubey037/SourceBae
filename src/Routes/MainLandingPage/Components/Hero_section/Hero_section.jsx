import React from 'react';
import LButton from '../Button/LButton';
import styles from './Hero_section.module.css';
import RightWhitArrow from '../../../../assets/images/LandingPage/RightWhitArrow.svg';

export default function Hero_section() {
    const onClickEvent = () => {
        window.location.href = 'https://app.sourcebae.com/register/agency';
    };
    return (
        <div className={`${styles.hero_section_wrap}`}>
            <div className={`${styles.hero_first_heading}`}>
                <h2>
                    Introducing{' '}
                    <span className={'span_yellow'}> SourceBae</span>
                </h2>
            </div>
            <div className={`${styles.hero_subheading}`}>
                <h5>
                    Marketplace For Hiring Remote Developers And IT Agencies!
                </h5>
            </div>
            <div className={`${styles.hero_main_heading}`}>
                <h1>Hire?</h1>
                <div className={`{'span_yellow'} ${styles.L_animated_text}`}>
                    <ul className={`${styles.flip4}`}>
                        <li>Remote Development Team</li>
                        <li> Short Term Project Developer</li>
                        <li>Dedicated Remote Developer</li>
                        <li>IT Agency</li>
                    </ul>
                </div>
            </div>
            <div className={`${styles.hero_description}`}>
                <p className={`L_para`}>
                    <span className={'span_pink'}>SourceBae </span>
                    is a Marketplace that connects you with{' '}
                    <span className={'span_pink'}>IT Agencies </span> and{' '}
                    <span className={'span_pink'}>
                        Dedicated Remote Developer{' '}
                    </span>
                    from around the world. We make it easy for you to find an
                    agency to build MVP at a fixed cost or hire Developers on a
                    monthly contract.
                </p>
            </div>
            <div className={`${styles.hero_btn_div}`}>
                <LButton
                    name="Get Started - it’s FREE "
                    img={RightWhitArrow}
                    className={`${styles.hero_btn}`}
                    onClickEvent={onClickEvent}
                />
            </div>
        </div>
    );
}
