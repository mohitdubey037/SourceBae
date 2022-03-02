import React from 'react';
import './Tag.css';

const Tag = ({ title }) => {
    return (
        <div className="tag_container">
            <span className="tag_text">{title}</span>
        </div>
    );
};

export default Tag;
