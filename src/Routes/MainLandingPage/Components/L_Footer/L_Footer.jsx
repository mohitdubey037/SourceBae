import React from 'react';
import styles from './L_Footer.module.css';

export default function L_Footer() {
    return (
        <>
            <div className={`${styles.L_footer_address}`}>
                <h2>Address</h2>
                <p>
                    Plot no. 205, Vijay Nagar, Part II, Scheme Number 136,
                    Indore, Madhya Pradesh 452010
                </p>
            </div>

            <div className={`${styles.L_footer_contact}`}>
                <h2>Contact</h2>
                <p>
                    For any inquirey contact us at <br />
                    info@sourcebae.com
                </p>
            </div>
        </>
    );
}
