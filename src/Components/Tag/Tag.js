import React from 'react';
import { SemiBold1421 } from '../Text/Texts';
import './Tag.css';

const Tag = ({ title }) => {
    return (
        <div className="py-2 mr-3 px-3 rounded-md border border-1e1e1e">
            <SemiBold1421 text={title} />
        </div>
    );
};

export default Tag;
