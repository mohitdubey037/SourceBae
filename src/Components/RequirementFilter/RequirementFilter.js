import React from 'react';
import styles from './RequirementFilter.module.css';
import SizedBox from '../SizedBox/SizedBox';
import colors from '../../Constants/colors';

export default function RequirementFilter({
    filterState,
    setFilterState,
    filterApplier
}) {
    const handleRadioChecks = (key, value) => {
        setFilterState((prev) => {
            return { ...prev, [key]: value };
        });
    };

    const clearFilter = () => {
        setFilterState({
            contractPeriod: undefined,
            budget: undefined,
            createdWithin: undefined
        });
        filterApplier({ isParam: false });
    };

    const CreatedWithin = 'createdWithin';
    const budget = 'budget';
    const contractPeriod = 'contractPeriod';

    return (
        <div>
            <div className={styles.filterOptionsBox}>
                <FilterTitle title={'Recent'} />
                <SizedBox height={'10px'} />
                <div className={styles.recentFilter}>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() => handleRadioChecks(CreatedWithin, 0)}
                    >
                        <input
                            type="radio"
                            name="recentRadio"
                            checked={filterState[CreatedWithin] === 0}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label>Today</label>
                        </div>
                    </div>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() => handleRadioChecks(CreatedWithin, 7)}
                    >
                        <input
                            type="radio"
                            name="recentRadio"
                            checked={filterState[CreatedWithin] === 7}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label>This Week</label>
                        </div>
                    </div>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() => handleRadioChecks(CreatedWithin, 30)}
                    >
                        <input
                            type="radio"
                            name="recentRadio"
                            checked={filterState[CreatedWithin] === 30}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label> This month</label>
                        </div>
                    </div>
                </div>
                <SizedBox height={'30px'} />

                <FilterTitle title={'Budget'} />
                <SizedBox height={'10px'} />
                <div className={styles.budgetFilter}>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() => handleRadioChecks(budget, '50000')}
                    >
                        <input
                            type="radio"
                            name="budgetRadio"
                            checked={filterState[budget] === '50000'}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label>less than $700</label>
                        </div>
                    </div>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() =>
                            handleRadioChecks(budget, '50000-125000')
                        }
                    >
                        <input
                            type="radio"
                            name="budgetRadio"
                            checked={filterState[budget] === '125000-200000'}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label>$1500-$2500</label>
                        </div>
                    </div>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() =>
                            handleRadioChecks(budget, '20000-99999999')
                        }
                    >
                        <input
                            type="radio"
                            name="budgetRadio"
                            checked={filterState[budget] === '200000-99999999'}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label>More than $2000</label>
                        </div>
                    </div>
                </div>
                <SizedBox height={'30px'} />

                <FilterTitle title={'Contract Filter'} />
                <SizedBox height={'10px'} />
                <div className={styles.budgetFilter}>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() => handleRadioChecks(contractPeriod, 3)}
                    >
                        <input
                            type="radio"
                            name="contractRadio"
                            checked={filterState.contractPeriod === 3}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label>03 months</label>
                        </div>
                    </div>
                    <div
                        class="pretty p-icon p-curve p-pulse"
                        className={styles.radioStyle}
                        onClick={() => handleRadioChecks(contractPeriod, 6)}
                    >
                        <input
                            type="radio"
                            name="contractRadio"
                            checked={filterState.contractPeriod === 6}
                        />
                        <SizedBox width={'8px'} />
                        <div
                            class="state p-info-o"
                            className={styles.radioLabel}
                        >
                            <label>06 months</label>
                        </div>
                    </div>
                </div>
                <div
                    class="pretty p-icon p-curve p-pulse"
                    className={styles.radioStyle}
                    onClick={() => handleRadioChecks(contractPeriod, 12)}
                >
                    <input
                        type="radio"
                        name="contractRadio"
                        checked={filterState.contractPeriod === 12}
                    />
                    <SizedBox width={'8px'} />
                    <div class="state p-info-o" className={styles.radioLabel}>
                        <label>12 months </label>
                    </div>
                </div>
                <SizedBox height={'30px'} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <FilterButton
                            title={'Clear all'}
                            color={colors.RED}
                            onClick={() => clearFilter()}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <SizedBox width={'16px'} />
                        <FilterButton
                            title={'Apply'}
                            color={colors.BLUE}
                            onClick={() => filterApplier({ isParam: true })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export const FilterTitle = ({ title }) => (
    <text className={styles.filterTitle}>{title}</text>
);

export const FilterButton = ({ title, color, onClick }) => (
    <div style={{ cursor: 'pointer' }}>
        <text
            className={styles.filterButton}
            style={{ color }}
            onClick={onClick}
        >
            {title}
        </text>
    </div>
);
