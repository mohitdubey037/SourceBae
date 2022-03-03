import React from 'react';
import colors from '../../Constants/colors';
import './SearchBar.css';

const SearchBar = ({ bgColor, placeholder, onChange, setSearchText }) => {
    return (
        <div>
            <input
                onChange={(event) => {
                    setSearchText(event?.target?.value);
                }}
                style={{ backgroundColor: bgColor || 'none' }}
                className="SBstyle"
                placeholder={placeholder || 'Type here'}
            />
        </div>
    );
};

export default SearchBar;
