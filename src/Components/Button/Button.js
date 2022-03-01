import React from 'react';
import './Button.css';

function Button(props) {
    return (
        <div className="submit-button" style={props?.buttonExtraStyle} >
            <h6 style={props?.buttonTextStyle} >{props.name}</h6>
        </div>
    )
}

export default Button