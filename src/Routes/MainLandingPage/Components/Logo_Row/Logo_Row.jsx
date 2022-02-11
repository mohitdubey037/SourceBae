import React from 'react';
import styles from './Logo_Row.module.css';
import logo1 from '../../../../assets/images/LandingPage/L-Logo-1.png';
import logo2 from '../../../../assets/images/LandingPage/L-Logo-2.png';
import logo3 from '../../../../assets/images/LandingPage/L-Logo-3.png';
import logo4 from '../../../../assets/images/LandingPage/L-Logo-4.png';
import logo5 from '../../../../assets/images/LandingPage/L-Logo-5.png';

export default function Logo_Row() {
    const logo_row = [
        { img: logo1 },
        { img: logo2 },
        { img: logo3 },
        { img: logo4 },
        { img: logo5 }
    ];
    return (
        <>
            <div className={`${styles.logo_row_heading_div}`}>
                <h3 className={`${styles.logo_row_heading} L_h2`}>
                    <span className="span_pink">MANY BUSINESSES </span>TRUST US
                    WITH THEIR HIRING AND PROJECT DISTRIBUTION
                </h3>
            </div>
            <div className={`${styles.logo_row_icons}`}>
                {logo_row?.map((item) => {
                    return (
                        <div className={`${styles.logo_icon}`}>
                            <img src={item.img} alt="" />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
