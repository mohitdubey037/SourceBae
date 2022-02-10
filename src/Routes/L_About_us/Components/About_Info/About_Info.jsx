import React from 'react';
import styles from './About_Info.module.css';

export default function About_Info() {
    const infoPara = [
        {
            para: 'Outsourcing process can require a lot of effort and operational hassle. It is both time consuming as well as lacks proper credibility. SourceBae aids smooth onboarding of developers who fit right into your team. '
        },
        {
            para: 'Our aim is to provide upcoming startups as well as big enterprises with competent and experienced developers who can handle the task at hand with utmost efficiency. SourceBae also aims to provide emerging It startups with a quick and easy way of generating revenue.'
        },
        {
            para: 'We ensure you get thoroughly verified resources from the multiple onboarded vendors. SourceBae streamlines the process of outsourcing into making it efficient and effective. It helps in making the process easy and avoid all the complications.'
        }
    ];
    return (
        <div className={`${styles.about_info_heading}`}>
            <h2 className="L_h2">
                <span className="span_blue">SourceBae</span> is the platform to
                solve all your Outsourcing problems.
            </h2>
            <div className={`${styles.about_info_para}`}>
                {infoPara?.map((value) => {
                    return <p className="L_para">{value.para}</p>;
                })}
            </div>
        </div>
    );
}
