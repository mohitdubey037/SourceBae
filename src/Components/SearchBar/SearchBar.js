import React from 'react';
import colors from '../../Constants/colors';
import './SearchBar.css';

const SearchBar = ({ bgColor, placeholder, onChange }) => {
    return (
        <div>
            <input
                onChange={onChange}
                style={{ backgroundColor: bgColor || 'none' }}
                className="SBstyle"
                placeholder={placeholder || 'Type here'}
            />
        </div>
    );
};

export default SearchBar;
