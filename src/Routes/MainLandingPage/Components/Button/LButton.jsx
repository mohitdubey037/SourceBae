import React from 'react';
import styles from './LButton.module.css';

export default function LButton(props) {
    return (
        <div className={`${styles.LButton}`} onClick={props?.onClickEvent}>
            <h6>{props.name}</h6>
            {props?.img && <img src={props.img} alt="" />}
        </div>
    );
}
