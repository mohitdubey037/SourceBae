import React from 'react';
import './IconNText.css';

function IconNText({ icon, text }) {
    return (
        <div className="INTcontainer">
            <img className="INTicon" src={icon} alt="" />
            <div style={{ marginLeft: '10px' }}>
                <span className="INTtextStyle">{text}</span>
            </div>
        </div>
    );
}

export default IconNText;
