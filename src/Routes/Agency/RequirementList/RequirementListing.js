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
import FilterSelect from './FilterSelect';

import { AGENCY } from '../../../shared/constants';
// eslint-disable-next-line no-unused-vars
import { debounce } from 'lodash';

let currentPage = 1;
const RequirementListing = () => {
    const recentOptions = [
        { value: 0, label: 'Today' },
        { value: 7, label: 'This Week' },
        { value: 30, label: 'This Month' }
    ];

    const budgetOptions = [
        { value: '500-1000', label: '500-1000' },
        { value: '1000-2000', label: '1000-2000' },
        { value: '2000-3000', label: '2000-3000' },
        { value: '4000', label: 'More than 4000' }
    ];

    const contractOptions = [
        { value: 3, label: '03-06 Months' },
        { value: 6, label: '06-12 Months' },
        { value: 12, label: 'More Than 12 Months' }
    ];

    const [requirementsList, setRequirementsList] = useState({ docs: [] });
    const role = AGENCY;
    const agencyId = localStorage.getItem('userId') || '';

    const [searchText, setSearchText] = useState('');

    const [filterState, setFilterState] = useState({
        contractPeriod: undefined,
        budget: undefined,
        createdWithin: undefined
    });

    const hireDevApi = async (config, val) => {
        const url = `/api/${role}/hire-developers/all?agencyId=${agencyId}`;
        const [minBudget, maxBudget] = filterState?.budget?.split('-') ?? [];
        if (config?.isShowMore) currentPage += 1;
        else currentPage = 1;

        let params = config?.isParam
            ? {
                  createdWithin: filterState?.createdWithin,
                  contractPeriod: filterState?.contractPeriod,
                  minBudget,
                  maxBudget,
                  page: currentPage,
                  searchKeyWord: searchText || val
              }
            : { page: currentPage };

        instance
            .get(url, {
                params
            })
            .then((res) => {
                config?.isShowMore
                    ? setRequirementsList((prevState) => ({
                          ...res,
                          docs: prevState?.docs
                              ? [...prevState?.docs, ...res.docs]
                              : [...res.docs]
                      }))
                    : setRequirementsList({ ...res });
            })
            .catch((err) => {
                setRequirementsList({ docs: [] });
            });
    };
    function handlePagination() {
        currentPage++;
        hireDevApi({ isParam: true });
    }
    useEffect(() => {
        hireDevApi({ isParam: true, isShowMore: false });
    }, [filterState]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(debounce(hireDevApi, 1000), []);

    useEffect(() => {
        hireDevApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    const onSearch = (text) => {};

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
                        value={searchText}
                        setSearchText={(val) => {
                            setSearchText(val);
                            debounceFn({ isParam: true }, val);
                        }}
                    />
                </div>

                <SizedBox width={'30px'} />
                <FilterSelect
                    options={recentOptions}
                    applyFilter={setFilterState}
                    objkey={'createdWithin'}
                />
                <SizedBox width={'30px'} />
                <FilterSelect
                    options={budgetOptions}
                    applyFilter={setFilterState}
                    objkey={'budget'}
                />
                <SizedBox width={'30px'} />
                <FilterSelect
                    options={contractOptions}
                    applyFilter={setFilterState}
                    objkey={'contractPeriod'}
                />
                <SizedBox width={'30px'} />

                <button
                    className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.searchBtn}`}
                >
                    <span>Search</span>
                </button>
                <SizedBox width={'30px'} />
            </div>
            <div className={styles.partition}>
                <div className={styles.listContainer}>
                    {requirementsList?.docs?.map((req, index) => (
                        <RequirementsCard
                            key={`${req?._id} ${index}`}
                            data={req}
                            showButton={false}
                            buttonTitle={'Apply now'}
                        />
                    ))}
                </div>
                <div className={styles.optionsContainer}>
                    <DeveloperListing />
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
