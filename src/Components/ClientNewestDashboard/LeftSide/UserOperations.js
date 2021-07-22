import React from 'react';
import './UserOperations.css';

function UserOperations(props) {
    return (
        <div onClick={props.clickHandler} className="operation">
            <div className="operation-logo">
                <img src={props.img} alt="hire developer" />
            </div>
            <div className="operation-name">
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default UserOperations