import React from 'react';
import styles from './FilterSelect.module.css';
import Select from 'react-select';

export default function FilterSelect({ options, applyFilter, objkey, placeholder }) {
    return (
        <div>
            <Select
                options={options}
                placeholder={placeholder}
                className={styles.selectBox}
                isSearchable={false}
                isClearable
                onChange={(selected) =>
                    applyFilter((prev) => ({
                        ...prev,
                        [objkey]: selected?.value
                    }))
                }
            />
        </div>
    );
}
