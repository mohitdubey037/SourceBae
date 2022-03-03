import React, { useEffect, useState, useCallback } from 'react';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import styles from './RequirementListing.module.css';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import SearchAndFilter from '../../Dashboard/ActiveRequirements/SearchAndFilter';
import DeveloperListing from './DeveloperListing';
import SearchBar from '../../../Components/SearchBar/SearchBar';
import colors from '../../../Constants/colors';
import buttonStyles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';
import RequirementFilter from '../../../Components/RequirementFilter/RequirementFilter';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import instance from '../../../Constants/axiosConstants';
import Button from '../../../Components/Button/Button';
import FilterSelect from './FilterSelect'

import { AGENCY } from '../../../shared/constants';
import { debounce } from 'lodash';

let currentPage = 1;
const RequirementListing = () => {

  const recentOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ]

  const budgetOptions = [
    { value: '500-1000', label: '500-1000' },
    { value: '1000-2000', label: '1000-2000' },
    { value: '2000-3000', label: '2000-3000' },
    { value: '4000', label: 'More than 4000' }
  ]

  const contractOptions = [
    { value: '3-6', label: '03-06 Months' },
    { value: '6-12', label: '06-12 Months' },
    { value: 'more_than_12', label: 'More Than 12 Months' }
  ]

  const role = AGENCY;
  const agencyId = localStorage.getItem('userId') || '';


  const [requirementsList, setRequirementsList] = useState({ docs: [] });
  const [searchText, setSearchText] = useState('');
  const [filterState, setFilterState] = useState({
    contractPeriod: undefined,
    budget: undefined,
    createdWithin: undefined,
    minBudget: undefined,
    maxBudget: undefined
  });
  const [developersList, setdevelopersList] = useState([])
  const [selectedCard, setselectedCard] = useState('')

  const hireDevApi = async (isParam = false, val) => {
    const url = `/api/${role}/hire-developers/all?agencyId=${agencyId}`;
    const [minBudget, maxBudget] = filterState?.budget?.split('-') ?? [];
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
        setRequirementsList((prevState) => ({
          ...res,
          docs: prevState?.docs
            ? [...prevState?.docs, ...res.docs]
            : [...res.docs]
        }));
      })
      .catch((err) => {
        setRequirementsList({ docs: [] });
      });
  };

  const getDevelopers = async (cardId, agencyId) => {
    const url = `/api/${role}/hire-developers/get/${cardId}/${agencyId}`;
    console.log(url)
    instance
      .get(url)
      .then((res) => { setdevelopersList(res) })
      .catch((err) => { setdevelopersList([]) })
  }

  const shareDeveloperPatchCall = async () => {
    let url = `/api/${role}/hire-developers/share-developer/62177e85639f3794f4293970`
    instance
      .patch(url)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }


  function handlePagination() {
    currentPage++;
    hireDevApi(true);
  }

  const debounceFn = useCallback(debounce(hireDevApi, 1000), []);

  useEffect(() => {
    let cardId = '621df7e2b03bc7d00344fb59'
    hireDevApi();
    getDevelopers(cardId, agencyId)
  }, [role]);

  const onSearch = (text) => { };

  return (
    <div>
      <div className={styles.navbarDiv}>
        <Navbar />
      </div>
      <Back name="Active Requirement" />
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarStyle}>
          <SearchBar
            onChange={onSearch}
            bgColor={colors.WHITE}
            placeholder={'Type keyword here example “react js”'}
          />
        </div>

        <SizedBox width={'30px'} />
        <FilterSelect options={recentOptions} />
        <SizedBox width={'30px'} />
        <FilterSelect options={budgetOptions} />
        <SizedBox width={'30px'} />
        <FilterSelect options={contractOptions} />
        <SizedBox width={'30px'} />

        <button
          className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.searchBtn}`}
        >
          <text>Search</text>
        </button>
        <SizedBox width={'30px'} />
        <div style={{ width: '110px' }}>
        </div>
      </div>
      <div className={styles.partition}>
        <div className={styles.listContainer}>
          {requirementsList?.docs?.map((req, index) => (
            <RequirementsCard
              key={req?._id}
              data={req}
              showButton={false}
              buttonTitle={'Apply now'}
              isSelected={selectedCard === req?._id}
              onClick={id => {
                setselectedCard(id)
                getDevelopers(id, agencyId)
              }}
            />
          ))}
        </div>
        <div className={styles.optionsContainer}>
          <DeveloperListing item={developersList} />
        </div>
      </div>
      {currentPage < requirementsList.totalPages && (
        <div className={`showMorebtn`}>
          <Button
            name="show more"
            buttonExtraStyle={buttonExtraStyle}
            buttonTextStyle={buttonTextStyle}
            onClick={() => handlePagination()}
          />
        </div>
      )}
    </div>
  );
};

const buttonExtraStyle = {
  background: 'rgba(1, 95, 154, 0.12)',
  borderRadius: '6px',
  border: 'none',
  width: '100px'
};

const buttonTextStyle = {
  fontFamily: 'Segoe UI',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '0.4px',
  textTransform: 'capitalize',
  color: '#015F9A'
};

export default RequirementListing;
