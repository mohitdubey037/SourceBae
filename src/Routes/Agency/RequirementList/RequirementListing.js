import React, { useEffect, useState, useCallback } from 'react';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import styles from './RequirementListing.module.css';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import DeveloperListing from './DeveloperListing';
import SearchBar from '../../../Components/SearchBar/SearchBar';
import colors from '../../../Constants/colors';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import instance from '../../../Constants/axiosConstants';
import Button from '../../../Components/Button/Button';
import FilterSelect from './FilterSelect';
import cookie from 'react-cookies';

import { AGENCY } from '../../../shared/constants';
import { debounce } from 'lodash';
import NoDataComponent from '../../../Components/NoData/NoDataComponent';
import Spinner from '../../../Components/Spinner/Spinner';
import CustomSwitch from '../../../Components/CustomSwitch/CustomSwitch';
import { useHistory } from 'react-router-dom';

let currentPage = 1;
let recommendedPage = 0;
const RequirementListing = () => {
    const recentOptions = [
        { value: 0, label: 'Today' },
        { value: 7, label: 'This Week' },
        { value: 30, label: 'This Month' }
    ];

    const budgetOptions = [
        { value: '50000-65000', label: '₹50,000 - ₹65,000' },
        { value: '65000-85000', label: '₹65,000 - ₹85,0000' },
        { value: '85000-110000', label: '₹85,000 - ₹1,10,000' },
        { value: '100000', label: 'More than ₹1,00,000' }
    ];

    const contractOptions = [
        { value: 3, label: '03-06 Months' },
        { value: 6, label: '06-12 Months' },
        { value: 12, label: 'More Than 12 Months' }
    ];
    const shortlistedSharedOpt = [
        { value: 1, label: 'Already Applied' },
        { value: 2, label: 'Invited By Client' }
    ];

    const role = AGENCY;
    const agencyId = localStorage.getItem('userId') || '';
    const [requirementsList, setRequirementsList] = useState({ docs: [] });
    const [recommendedList, setRecommendedList] = useState({ docs: [] });
    const routerHistory = useHistory();

    const [searchText, setSearchText] = useState('');
    const [switchValue, setswitchValue] = useState(false);

    const [filterState, setFilterState] = useState({
        contractPeriod: undefined,
        budget: undefined,
        createdWithin: undefined,
        shortlistedOrShared: undefined
    });

    const [developersList, setdevelopersList] = useState([]);
    const [selectedCard, setselectedCard] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const [sharedByYou, setSharedByYou] = useState(false);
    const [shortListedByClient, setShortListedByClient] = useState(false);

    const hireDevApi = async (config, val) => {
        setisLoading(true);
        setselectedCard('');
        setdevelopersList([]);
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

        switchValue && (params.isHotRequest = 1);
        filterState?.shortlistedOrShared === 1 && (params.sharedByYou = 1);
        filterState?.shortlistedOrShared === 2 &&
            (params.shortListedByClient = 1);

        instance
            .get(url, {
                params
            })
            .then((res) => {
                if (!res?.hasNextPage) {
                    recommendedPage = 1;
                    recommendedJobs({ isShowMore: false, isParam: true }, val);
                }
                config?.isShowMore
                    ? setRequirementsList((prevState) => ({
                          ...res,
                          docs: prevState?.docs
                              ? [...prevState?.docs, ...res?.docs]
                              : [...res?.docs]
                      }))
                    : setRequirementsList({ ...res, docs: res?.docs });
            })
            .catch((err) => {
                setRequirementsList({ docs: [] });
            })
            .finally(() => setisLoading(false));
    };

    const recommendedJobs = async (config, val) => {
        setisLoading(true);
        setselectedCard('');
        setdevelopersList([]);
        const url = `/api/${role}/hire-developers/get-recommended?agencyId=${agencyId}`;
        const [minBudget, maxBudget] = filterState?.budget?.split('-') ?? [];
        if (config?.isShowMore) recommendedPage += 1;
        else recommendedPage = 1;

        let params = config?.isParam
            ? {
                  createdWithin: filterState?.createdWithin,
                  contractPeriod: filterState?.contractPeriod,
                  minBudget,
                  maxBudget,
                  page: recommendedPage,
                  searchKeyWord: searchText || val
              }
            : { page: recommendedPage };

        switchValue && (params.isHotRequest = 1);

        instance
            .get(url, {
                params
            })
            .then((res) => {
                config?.isShowMore
                    ? setRecommendedList((prevState) => ({
                          ...res,
                          docs: prevState?.docs
                              ? [...prevState?.docs, ...res?.docs]
                              : [...res?.docs]
                      }))
                    : setRecommendedList({ ...res, docs: res?.docs });
            })
            .catch((err) => {
                setRecommendedList({ docs: [] });
            })
            .finally(() => setisLoading(false));
    };

    const getDevelopers = async (cardId, agencyId) => {
        const url = `/api/${role}/hire-developers/get/${cardId}/${agencyId}`;
        instance
            .get(url)
            .then((res) => {
                setdevelopersList(res);
            })
            .catch((err) => {
                setdevelopersList([]);
            });
    };

    const shareDeveloperPatchCall = async (devs) => {
        let url = `/api/${role}/hire-developers/share-developer/${selectedCard}`;

        const updatedDevsStatus = developersList?.map((dev) => {
            if (devs?.includes(dev?._id))
                return {
                    developerStatus: 2,
                    developerId: dev?._id
                };
            else if (dev?.developerSharedBy?.developerStatus)
                return {
                    developerStatus: dev?.developerSharedBy?.developerStatus,
                    developerId: dev?._id
                };
            return 0;
        });
        let body = {
            agencyId: agencyId,
            developerIds: updatedDevsStatus.filter((dev) => dev)
        };

        instance
            .patch(url, body)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    function handlePagination() {
        hireDevApi({ isParam: true, isShowMore: true });
    }
    function handleRecommendedPagination() {
        recommendedJobs({ isParam: true, isShowMore: true });
    }

    useEffect(() => {
        hireDevApi({ isParam: true, isShowMore: false });
    }, [filterState]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(debounce(hireDevApi, 1000), []);

    const handleSwitch = () => {
        setswitchValue((prev) => !prev);
    };

    useEffect(() => {
        hireDevApi();
        // getDevelopers(cardId, agencyId)
    }, [role]);

    useEffect(() => {
        hireDevApi({ isParam: true, isShowMore: false });
    }, [switchValue, shortListedByClient, sharedByYou]);

    const onApplyClick = (id) => {
        let user = localStorage.getItem('userId');
        let auth = cookie.load('Authorization');

        if (user && auth) {
            if (
                routerHistory.location.pathname ===
                '/agency-requirements-listing'
            ) {
                setselectedCard(id);
                getDevelopers(id, agencyId);
            }
            routerHistory.push(`/agency-requirements-listing`);
        } else {
            alert('Please login to continue');
            routerHistory.push({
                pathname: `login/${AGENCY}`,
                state: { isAgencyRequirement: true }
            });
        }
    };

    return (
        <div>
            <div className={styles.navbarDiv}>
                <Navbar />
            </div>
            <Back name="Active Requirement" />

            <div className={styles.requirement_listing_container}>
                <div className={styles.searchBarContainer}>
                    <div
                        className={styles.searchAndBtnWrapper}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <SearchBar
                            height={'40px'}
                            style={{ width: '100%' }}
                            bgColor={colors.WHITE}
                            placeholder={'Type keyword here example “react js”'}
                            value={searchText}
                            setSearchText={(val) => {
                                setSearchText(val);
                                debounceFn({ isParam: true }, val);
                            }}
                        />
                        <div
                            style={{
                                justifyContent: 'end',
                                display: 'flex'
                            }}
                        >
                            <FilterSelect
                                placeholder={'Applied and Invited'}
                                options={shortlistedSharedOpt}
                                applyFilter={setFilterState}
                                objkey={'shortlistedOrShared'}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '10px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <FilterSelect
                            placeholder={'Posting date'}
                            options={recentOptions}
                            applyFilter={setFilterState}
                            objkey={'createdWithin'}
                        />

                        <FilterSelect
                            placeholder={'Budget'}
                            options={budgetOptions}
                            applyFilter={setFilterState}
                            objkey={'budget'}
                        />

                        <FilterSelect
                            placeholder={'Contract Period'}
                            options={contractOptions}
                            applyFilter={setFilterState}
                            objkey={'contractPeriod'}
                        />
                        <div
                            style={{
                                justifyContent: 'end',
                                display: 'flex'
                            }}
                        >
                            <CustomSwitch
                                label={'Hot Request'}
                                switchValue={switchValue}
                                onChange={handleSwitch}
                            />
                        </div>
                    </div>
                    <SizedBox width={'30px'} />
                </div>
                {isLoading && currentPage === 1 ? (
                    <Spinner />
                ) : (
                    <>
                        <div className={styles.partition}>
                            <div className={styles.listContainer}>
                                {requirementsList?.docs?.length ? (
                                    requirementsList?.docs?.map(
                                        (req, index) => (
                                            <RequirementsCard
                                                key={`${req?._id} ${index}`}
                                                data={req}
                                                showButton={false}
                                                buttonTitle={'Apply now'}
                                                isSelected={
                                                    selectedCard === req?._id
                                                }
                                                onApplyClick={(id) => {
                                                    onApplyClick(id);
                                                }}
                                            />
                                        )
                                    )
                                ) : (
                                    <NoDataComponent />
                                )}
                            </div>
                            <div className={styles.optionsContainer}>
                                <DeveloperListing
                                    item={developersList}
                                    selectedCard={selectedCard}
                                    onApply={(devs) =>
                                        shareDeveloperPatchCall(devs)
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles.showMorebtn}>
                            {currentPage < requirementsList.totalPages &&
                                (isLoading ? (
                                    <Spinner style={{ height: '60px' }} />
                                ) : (
                                    <Button
                                        name="show more"
                                        buttonExtraStyle={buttonExtraStyle}
                                        buttonTextStyle={buttonTextStyle}
                                        onClick={() => handlePagination()}
                                    />
                                ))}
                        </div>
                        {recommendedPage > 0 && (
                            <>
                                <div className={`${styles.recommendedJobs}`}>
                                    <span className="headingText">
                                        Recommended Jobs
                                    </span>
                                </div>
                                <div className={styles.partition}>
                                    <div className={styles.listContainer}>
                                        {recommendedList?.docs?.length ? (
                                            recommendedList?.docs?.map(
                                                (req, index) => (
                                                    <RequirementsCard
                                                        key={`${req?._id} ${index}`}
                                                        data={req}
                                                        showButton={false}
                                                        buttonTitle={
                                                            'Apply now'
                                                        }
                                                        isSelected={
                                                            selectedCard ===
                                                            req?._id
                                                        }
                                                        onApplyClick={(id) => {
                                                            onApplyClick(id);
                                                        }}
                                                    />
                                                )
                                            )
                                        ) : (
                                            <NoDataComponent />
                                        )}
                                    </div>
                                    <div className={styles.optionsContainer}>
                                        <DeveloperListing
                                            item={developersList}
                                            selectedCard={selectedCard}
                                            onApply={(devs) =>
                                                shareDeveloperPatchCall(devs)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={styles.showMorebtn}>
                                    {recommendedPage <
                                        recommendedJobs.totalPages &&
                                        (isLoading ? (
                                            <Spinner
                                                style={{ height: '60px' }}
                                            />
                                        ) : (
                                            <Button
                                                name="show more"
                                                buttonExtraStyle={
                                                    buttonExtraStyle
                                                }
                                                buttonTextStyle={
                                                    buttonTextStyle
                                                }
                                                onClick={() =>
                                                    handleRecommendedPagination()
                                                }
                                            />
                                        ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
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
