import React from 'react';
import SizedBox from '../SizedBox/SizedBox';
import { Medium1624 } from '../Text/Texts';
import './IconNText.css';

function IconNText({ icon, text }) {
    return (
        <div className="p-10px rounded-md flex bg-purple-100">
            <img className="INTicon" src={icon} />
            <SizedBox height={'10px'} width={'10px'} />
            <Medium1624 text={text} />
        </div>
    );
}

export default IconNText;
