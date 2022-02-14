import React from 'react';
import { useEffect } from 'react';
import styles from './About_ProgressBar.module.css';

export default function About_ProgressBar() {
    const progressiveSection = [
        {
            value: 2019,
            title: 'Year of foundation'
        },
        { value: 30 + '+', title: 'Year of foundation' },
        {
            value: 250 + '+',
            title: 'Developers deployed'
        },
        {
            value: 20 + '+',
            title: 'Project completed successfully'
        }
    ];

    useEffect(() => {
        console.log('hi');
    });
    return (
        <>
            <div className={`${styles.about_progress_heading}`}>
                <h2>All in all SourceBae bae has one single goal</h2>
                <h2 className="L_h2">
                    <span className="span_pink">“Simplifying Outsourcing”</span>
                </h2>
            </div>
            <div className={`${styles.about_progress_box}`}>
                {progressiveSection?.map((section, index) => (
                    <div
                        className={`${styles.about_common_progress_box}`}
                        style={{ marginTop: `${index * 3}rem` }}
                    >
                        {}
                        <h2 className="L_h2 span_blue">{section?.value}</h2>
                        <p className="L_para">{section?.title}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
