import React from 'react';
import colors from '../../Constants/colors';
import './SearchBar.css';

const SearchBar = ({ bgColor, placeholder, onChange, setSearchText, height }) => {
    return (
        <div >
            <input
                onChange={(event) => {
                    setSearchText(event?.target?.value);
                }}
                style={{ backgroundColor: bgColor || 'none', height: height || null }}
                className="SBstyle"
                placeholder={placeholder || 'Type here'}
            />
        </div>
    );
};

export default SearchBar;
