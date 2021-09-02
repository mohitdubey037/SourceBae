import React from 'react';
import './UserOperations.css';

function UserOperations(props) {
    console.log(props.disabled);
    return (
        <div onClick={props.nextpage} className={`operation ${props.disabled && "conditional_disabled"}`}>
            <div className="operation-logo">
                <img src={props.img} alt="hire developer" />
            </div>
            <div className="operation-name">
                <p style={{filter: props.disabled && 'greyscale(100%)'}} >{props.text}</p>
            </div>
        </div>
    )
}

export default UserOperations