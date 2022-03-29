import React from 'react';
import './SearchBar.css';

const SearchBar = ({
    bgColor,
    placeholder,
    onChange,
    setSearchText,
    height,
    width,
    style
}) => {
    return (
        <div style={style}>
            <input
                onChange={(event) => {
                    setSearchText(event?.target?.value);
                }}
                style={{
                    backgroundColor: bgColor || 'none',
                    height: height || null,
                    width: width || null
                }}
                className="SBstyle"
                placeholder={placeholder || 'Type here'}
            />
        </div>
    );
};

export default SearchBar;
