import React from 'react';
import styles from './L_Hiring_Steps.module.css';

export default function L_Hiring_Steps() {
    return (
        <>
            <div className={`${styles.hiring_steps_heading}}`}>
                <h2 className="L_h2">
                    Using <span className="span_pink">SourceBae</span> for your
                    Remote Hiring is <span className="span_pink">easy</span>
                </h2>
            </div>
            <div className={`${styles.hiring_steps_cards_wrap}`}></div>
        </>
    );
}
