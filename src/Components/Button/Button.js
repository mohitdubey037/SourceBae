import React from 'react';
import './Button.css';

function Button(props) {
    return (
        <div className="submit-button" style={props?.buttonExtraStyle} onClick={props.onClick} >
            <h6 style={props?.buttonTextStyle} >{props.name}</h6>
        </div>
    )
}

export default Button