import React from 'react';
import styles from './NoDataComponent.module.css';
import paperPlane from '../../assets/images/DeveloperRequest/paperPlane.svg';

export default function NoDataComponent({ style, text, heading }) {
    const body = text ?? "We can't seem to find what you're looking for.";
    const head = heading ?? 'Aww shucks';

    return (
        <div style={style} className={styles.mainContainer}>
            <img
                src={paperPlane}
                style={{ height: '100px', width: '100px' }}
                alt="no data"
            />
            <span className={styles.heading}>{head}</span>
            <span className={styles.subText}>{body}</span>
        </div>
    );
}
