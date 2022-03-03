import React from 'react';
import styles from './FilterSelect.module.css';
import Select from 'react-select';

export default function FilterSelect({ options, applyFilter, objkey }) {
    return (
        <div>
            <Select
                options={options}
                className={styles.selectBox}
                isSearchable={false}
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
