import React from 'react';
import './Button.css';

function Button(props) {
    return (
        <div className="submit-button">
            <h6>{props.name}</h6>
        </div>
    )
}

export default Button 