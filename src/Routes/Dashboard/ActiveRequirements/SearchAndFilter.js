import React from 'react';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import './SearchAndFilter.css';
import RequirementFilter from '../../../Components/RequirementFilter/RequirementFilter';

export default function SearchAndFilter({
  searchText,
  setSearchText,
  filterState,
  setFilterState,
  filterApplier
}) {
  return (
    <div className="searchBoxAR">
      <text className="searchText">Search</text>
      <SizedBox height={'26px'} />
      <div className="searchWrapper">
        <div>
          <text className="searchTitle">job title or keyword</text>
        </div>
        <SizedBox height={'14px'} />
        <div>
          <input
            onChange={(event) => {
              setSearchText(event?.target?.value);
            }}
            className="SBstyle"
            placeholder={'Type here'}
            value={searchText}
          />
        </div>
      </div>
      <SizedBox height={'36px'} />
      <text className="searchText">filter</text>
      <SizedBox height={'14px'} />
      <RequirementFilter
        filterState={filterState}
        setFilterState={setFilterState}
        filterApplier={filterApplier}
      />
    </div>
  );
}
