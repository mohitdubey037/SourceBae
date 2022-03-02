import React, { useEffect, useState, useCallback } from 'react';
import './ActiveRequirements.css';
import SearchAndFilter from './SearchAndFilter';
import PromotionalStrip from './PromotionalStrip';
import LNavbar from '../../MainLandingPage/Components/Navbar/LNavbar';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import instance from '../../../Constants/axiosConstants';
import { AGENCY } from '../../../shared/constants';
// eslint-disable-next-line no-unused-vars
import { debounce } from 'lodash';

export default function ActiveRequirements() {
  const [requirementsList, setRequirementsList] = useState([]);
  const role = AGENCY;

  const [searchText, setSearchText] = useState('');

  const [filterState, setFilterState] = useState({
    contractPeriod: undefined,
    budget: undefined,
    createdWithin: undefined,
    minBudget: undefined,
    maxBudget: undefined
  });

  let currentPage = 1;

  const hireDevApi = async (isParam = false, val) => {
    const url = `/api/${role}/hire-developers/all`;
    const [minBudget, maxBudget] = filterState?.budget?.split('-') ?? []
    console.log(minBudget)
    instance
      .get(url, {
        params: isParam
          ? {
            contractPeriod: filterState.contractPeriod,
            createdWithin: filterState.createdWithin,
            searchKeyWord: searchText || val,
            minBudget,
            maxBudget,
            page: currentPage
          }
          : { page: currentPage }
      })
      .then((res) => {
        setRequirementsList(res);
      })
      .catch((err) => {
        setRequirementsList([]);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(hireDevApi, 1000), []);

  useEffect(() => {
    hireDevApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <>
      <LNavbar />
      <PromotionalStrip />
      <div className="bodyWrapper">
        <div className="greyCard">
          <h1 className="heading">Current Requirements</h1>
          <div className="partition">
            <div className="listContainer">
              {requirementsList?.docs?.map((req, index) => (
                <RequirementsCard
                  key={req?._id}
                  data={req}
                  showButton={false}
                  buttonTitle={'Apply now'}
                />
              ))}
            </div>
            <div className="optionsContainer">
              <SearchAndFilter
                searchText={searchText}
                setSearchText={(val) => {
                  setSearchText(val);
                  debounceFn(true, val);
                }}
                filterState={filterState}
                setFilterState={setFilterState}
                filterApplier={hireDevApi}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
