import React, { useEffect, useState, useCallback } from 'react';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import styles from './DeveloperRequest.module.css';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import DeveloperListing from './DeveloperListing';
import SearchBar from '../../../Components/SearchBar/SearchBar';
import colors from '../../../Constants/colors';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import instance from '../../../Constants/axiosConstants';
import Button from '../../../Components/Button/Button';
import FilterSelect from './FilterSelect';

import { AGENCY } from '../../../shared/constants';
import NoDataComponent from '../../../Components/NoData/NoDataComponent';
import Spinner from '../../../Components/Spinner/Spinner';
import CustomSwitch from '../../../Components/CustomSwitch/CustomSwitch';
import DeveloperModal from './DeveloperModal';

let currentPage = 1;
const DeveloperRequest = () => {
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

    const role = AGENCY;
    const clientId = localStorage.getItem('userId') || '';
    const [requirementsList, setRequirementsList] = useState({ docs: [] });
    const [modal, setmodal] = useState({ open: false, data: null });

    const [searchText, setSearchText] = useState('');
    const [switchValue, setswitchValue] = useState(false);
    const [fetchedRequirement, setfetchedRequirement] = useState([]);

    const [filterState, setFilterState] = useState({
        contractPeriod: undefined,
        budget: undefined,
        createdWithin: undefined
    });

    const [developersList, setdevelopersList] = useState([]);
    const [selectedCard, setselectedCard] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const [nextPage, setnextPage] = useState(1);
    const [selectedDevs, setselectedDevs] = useState([]);

    const handleSwitch = () => setswitchValue((preV) => !preV);

    useEffect(() => {
        hireDevApi();
    }, []);

    const hireDevApi = async () => {
        setisLoading(true);
        const url = `/api/${role}/hire-developers/all?clientId=${clientId}`;
        instance
            .get(url)
            .then((res) => {
                const sharedDevsEntryOnly = res?.docs?.filter(
                    (item) => item?.developersShared?.length
                );
                setfetchedRequirement([
                    ...fetchedRequirement,
                    ...sharedDevsEntryOnly
                ]);
                setnextPage(res?.nextPage);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setisLoading(false));
    };

    const acceptMyDevsPatchCall = async (id) => {
        let url = `/api/${role}/hire-developers/share-developer/${id}`;
        let body = {
            clientId: id,
            developerIds: selectedDevs,
            developerStatus: '3'
        };
        instance
            .patch(url, body)
            .then((res) => {
                console.log(res, 'dfdgsddffdggs');
            })
            .catch((err) => console.log(err, 'u8r9we89fsa89d9'));
    };

    const selectedMyDev = (newDevId) => {
        let isAlreadyChecked = selectedDevs?.some(
            (devId) => devId === newDevId
        );
        isAlreadyChecked
            ? setselectedDevs(() =>
                  selectedDevs?.filter((devId) => devId !== newDevId)
              )
            : setselectedDevs([...selectedDevs, newDevId]);
    };

    return (
        <div>
            <div className={styles.navbarDiv}>
                <Navbar />
            </div>
            <Back name="Developer Request" />

            <>
                <div className={styles.searchBarContainer}>
                    <div className={styles.searchAndBtnWrapper}>
                        <div className={styles.searchBarStyle}>
                            <SearchBar
                                height={'40px'}
                                bgColor={colors.WHITE}
                                placeholder={
                                    'Type keyword here example “react js”'
                                }
                                value={searchText}
                                setSearchText={(val) => {
                                    setSearchText(val);
                                }}
                            />
                        </div>
                        <div
                            style={{
                                width: '200px',
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
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '20px',
                            justifyContent: 'space-between',
                            width: '75%'
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
                    </div>
                    <SizedBox width={'30px'} />
                </div>
                {isLoading && currentPage === 1 ? (
                    <Spinner />
                ) : (
                    <>
                        <div className={styles.partition}>
                            <div className={styles.listContainer}>
                                {fetchedRequirement ? (
                                    Array(10)
                                        .fill(fetchedRequirement[0])
                                        ?.map((req, index) => (
                                            <RequirementsCard
                                                key={`${req?._id}${index}`}
                                                data={req}
                                                showButton={true}
                                                buttonTitle={'Detail'}
                                                isSelected={
                                                    selectedCard === req?._id
                                                }
                                                onApplyClick={() =>
                                                    setmodal({
                                                        open: true,
                                                        data: req
                                                    })
                                                }
                                            />
                                        ))
                                ) : (
                                    <NoDataComponent />
                                )}
                            </div>
                            <div className={styles.optionsContainer}>
                                <DeveloperListing
                                    item={developersList}
                                    selectedCard={selectedCard}
                                    onApply={(devs) => {}}
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
                                        onClick={() => {}}
                                    />
                                ))}
                        </div>
                    </>
                )}
            </>

            <DeveloperModal
                modal={modal}
                onCloseModal={() => setmodal({ open: false })}
            />
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

export default DeveloperRequest;
