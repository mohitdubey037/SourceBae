import React from 'react';
import styles from './LButton.module.css';

export default function LButton(props) {
    return (
        <div className={`${styles.LButton}`}>
            <h6>{props.name}</h6>
            <img src={props.img} alt="" />
        </div>
    );
}
