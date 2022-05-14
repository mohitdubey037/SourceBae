import React, { useEffect, useState, useCallback } from 'react';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import styles from './RequirementListing.module.css';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import DeveloperListing from './Components/DeveloperListing';
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
import { useHistory, useLocation } from 'react-router-dom';
import { AGENCYROUTES } from '../../../Navigation/CONSTANTS';
import buttonStyles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';
import Modal from 'react-responsive-modal';
import clientTag from '../../../assets/images/general/clientTag.svg'
import agencyTag from '../../../assets/images/general/agencyTag.svg'
import paperPlane from '../../../assets/images/DeveloperRequest/paperPlane.svg';
import Select from 'react-select';
import Header from '../../../Components/Header/Header';
import { Bold1619, Bold2401, Bold3248, Medium1422, Regular1218, SemiBold1219, SemiBold1421 } from '../../../Components/Text/Texts';
import { Images } from '../../../assets/images';
import ButtonFilled from '../../../Components/Button/ButtonFilled';
import CheckBox from '../../../Components/CheckBox/CheckBox';
import ButtonOutlined from '../../../Components/Button/ButtonOutlined';

let currentPage = 1;
let recommendedPage = 0;
const RequirementListing = () => {

  let query = new URLSearchParams(useLocation().search);
  let requirementId = query.get('requirementId')

  const recentOptions = [
    { value: 0, label: 'Today' },
    { value: 7, label: 'This Week' },
    { value: 30, label: 'This Month' }
  ];

  const budgetOptions = [
    { value: '700-900', label: '$700 - $900' },
    { value: '900-1100', label: '$900 - $1100' },
    { value: '1100-1400', label: '$1100 - $1400' },
    { value: '1300', label: 'More than $1300' }
  ];

  const contractOptions = [
    { value: 3, label: '03-06 Months' },
    { value: 6, label: '06-12 Months' },
    { value: 12, label: 'More Than 12 Months' }
  ];

  const conversationOptions = [
    { value: 1, label: 'sharedByYou' },
    { value: 2, label: 'shortListedByClient' }
  ]

  const tabs = [
    { title: 'Active', value: 0, key: '', linkKey: '' },
    { title: 'On Conversation', value: 1, key: 'sharedByYou', linkKey: 'onConversation' },
    { title: 'Shortlisted', value: 2, key: 'shortListedByClient', linkKey: 'shortlisted' }
  ]

  const reviewUs = [
    { platform: 'LinkedIn', icon: Images.linkedIn, link: 'www.shethink.in' },
    { platform: 'G2', icon: Images.g2, link: 'www.shethink.in' },
    { platform: 'Google', icon: Images.google, link: 'www.shethink.in' },
  ]

  const style = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #e1e1e1',
      borderRadius: '6px',
      width: `${window.innerWidth * 0.13}px`,
      height: '48px',
      overflow: 'hidden'
    }),
    placeholder: (base) => ({
      ...base,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      letterSpacing: '0.4px',
      textTransform: 'capitalize',
    })
  }

  const role = AGENCY;
  const agencyId = localStorage.getItem('userId') || '';
  const [requirementsList, setRequirementsList] = useState({ docs: [] });
  const [recommendedList, setRecommendedList] = useState({ docs: [] });
  const routerHistory = useHistory();
  const [selectedTab, setselectedTab] = useState(0)
  const [selectedTechnology, setselectedTechnology] = useState()
  const [sharedBy, setsharedBy] = useState('')
  const [allTechnologies, setallTechnologies] = useState([])
  const [redirectedList, setRedirectedList] = useState({ docs: [] });

  const [searchText, setSearchText] = useState('');
  const [switchValue, setswitchValue] = useState(false);

  const [filterState, setFilterState] = useState({
    contractPeriod: undefined,
    budget: undefined,
    createdWithin: undefined,
    shortlistedOrShared: undefined
  });

  const [developersList, setdevelopersList] = useState([]);
  const [filterDevList, setfilterDevList] = useState([])
  const [selectedCard, setselectedCard] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [isResourceNeedSatified, setIsResourceNeedSatified] = useState(false)
  const [modal, setmodal] = useState({ open: false, data: null })
  const [selectedDevs, setselectedDevs] = useState([]);

  // const redirectedRequirement = async () => {
  //     if (redirectRequirementId) {
  //         setisLoading(true);
  //         setdevelopersList([]);
  //         const url = `/api/${role}/hire-developers/all?agencyId=${agencyId}`;
  //         const response = await instance
  //             .get(url, { id: redirectRequirementId })
  //             .then((res) => res.data);
  //         setRedirectedList(response);
  //         setisLoading(false);
  //     }
  // };

  const hireDevApi = async (config, val) => {
    setisLoading(true);
    setselectedCard('');
    setdevelopersList([]);
    setfilterDevList([])
    let url = `/api/${role}/hire-developers/all?agencyId=${agencyId}`;

    if (tabs[selectedTab].linkKey == tabs[1].linkKey) {
      url = `/api/${role}/hire-developers/all?agencyId=${agencyId}&&${tabs[selectedTab].linkKey}=1`
    } else if (tabs[selectedTab].linkKey == tabs[2].linkKey) {
      url = `/api/${role}/hire-developers/all?agencyId=${agencyId}&&${tabs[selectedTab].linkKey}=1`
    }

    if (requirementId) url = `${url}&&requirementId=${requirementId}`

    console.log(url)

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
    filterState?.shortlistedOrShared === 2 && (params.shortListedByClient = 1);

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
    setfilterDevList([])
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

  const filterDev = data => {
    setmodal({ open: true })
    let dev = data?.filter(item => item.isDeveloperShared)
    setdevelopersList(dev)
    setfilterDevList(dev)
  }

  const getDevelopers = async (cardId, agencyId) => {
    const url = `/api/${role}/hire-developers/get/${cardId}/${agencyId}`;
    instance
      .get(url)
      .then((res) => {
        setdevelopersList(res);
        setfilterDevList(res)
        selectedTab == 0 && setmodal({ open: true })
        selectedTab == 1 && filterDev(res)
      })
      .catch((err) => {
        setdevelopersList([]);
        setfilterDevList([])
      });
  };

  const shareDeveloperPatchCall = async (devs) => {
    let url = `/api/${role}/hire-developers/share-developer/${selectedCard}`;

    const updatedDevsStatus = filterDevList?.map((dev) => {
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

  const debounceFn = useCallback(debounce(hireDevApi, 1000), []);

  useEffect(() => {
    hireDevApi();
  }, [role]);

  useEffect(() => {
    hireDevApi({ isParam: true, isShowMore: false });
  }, [switchValue]);


  const onApplyClick = (id) => {
    let user = localStorage.getItem('userId');
    let auth = cookie.load('Authorization');

    if (user && auth) {
      if (
        routerHistory.location.pathname ===
        AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST
      ) {
        setselectedCard(id);
        getDevelopers(id, agencyId);
      }
      routerHistory.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
    } else {
      alert('Please login to continue');
      routerHistory.push({
        pathname: AGENCYROUTES.LOGIN,
        state: { isAgencyRequirement: true }
      });
    }
  };

  React.useEffect(() => {
    if (selectedCard) {
      let rData = requirementsList?.docs || []
      let currentRequirement = rData?.filter(
        (item) => item._id === selectedCard
      );
      if (currentRequirement?.length > 0) {
        setIsResourceNeedSatified(
          currentRequirement[0]?.numberOfAcceptedResources >=
          currentRequirement[0]?.numberOfResourcesRequired
        );
      }
    }
  }, [requirementsList?.docs || [], selectedCard]);

  const onHotRequirementClick = () => { setswitchValue((prev) => !prev) }

  const functionChooser = (item) => {
    setFilterState((prev) => ({
      ...prev,
      'shortlistedOrShared': item.value
    }))
  }

  const onTabClick = (item) => {
    setselectedTab(item.value)
    functionChooser(item)
  }

  const onCloseModal = () => {
    setmodal({ open: false })
    setsharedBy(null)
  }

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

  const isAlreadyShared = (id) => selectedDevs?.some((devId) => devId === id);

  const getTechnologies = (data) => {
    let result = data.map((item) => item.technologyName)?.join(', ');
    return result;
  };

  function acceptOrReject(accept, developer) {
    let url = `/api/${AGENCY}/hire-developers/share-developer/${selectedCard}`;
    let body = {
      agencyId: agencyId,
      developerSharedByAgency: [
        { developerStatus: accept, developerId: developer?._id }
      ]
    };
    instance
      .patch(url, body)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  const fetchTechnologies = () => {
    let url = `/api/${role}/technologies/all`
    instance.get(url)
      .then((res) => {
        let _temp = []
        res?.forEach(item => {
          _temp.push({
            label: item?.technologyName,
            value: item?._id
          })
        })
        setallTechnologies(_temp)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    if (sharedBy) {
      let dev = developersList?.filter(item => item?.developerSharedBy?.developerSharedBy == sharedBy.value)
      setfilterDevList(dev)
    } else {
      setfilterDevList(developersList)
    }
  }, [sharedBy])

  useEffect(() => {
    fetchTechnologies()
  }, [])

  const filterDevsOnTech = tech => {
    if (!tech) return setfilterDevList(developersList)
    let _temp = (!sharedBy ? developersList : filterDevList)?.filter(item => item.developerTechnologies.some(ele => ele?.technologyName == tech.label))
    setfilterDevList(_temp)
  }

  return (
    <div className='flex flex-col' >
      <Header />
      <div className='flex' >
        <div className=' w-3/4 px-7' >
          <div className='flex flex-col w-full justify-center' >

            {/* top tabs section */}
            <div className='flex justify-center my-2' >
              {
                tabs?.map(item => {
                  let color = item.value === selectedTab ? 'border-purple-700 text-purple-700' : 'border-transparent text-black-350'
                  return (
                    <div
                      className={`px-5 py-3 m-3 border-b-2 ${color} cursor-pointer`}
                      onClick={() => onTabClick(item)}
                    >
                      <Bold1619 text={item.title} className={`${color}`} />
                    </div>
                  )
                })
              }
            </div>

            <SizedBox height={'12px'} />
            <div className='flex justify-evenly items-center w-full' >
              <FilterSelect
                placeholder={'Budget'}
                options={budgetOptions}
                applyFilter={setFilterState}
                objkey={'budget'}
                style={style}
              />
              <FilterSelect
                placeholder={'Posting date'}
                options={recentOptions}
                applyFilter={setFilterState}
                objkey={'createdWithin'}
                style={style}
              />
              <FilterSelect
                placeholder={'Contract'}
                options={contractOptions}
                applyFilter={setFilterState}
                objkey={'contractPeriod'}
                style={style}
              />
              <div
                className='flex bg-white h-12 justify-between px-4 items-center rounded-md border cursor-pointer'
                style={{ width: `${window.innerWidth * 0.13}px` }}
                onClick={onHotRequirementClick}
              >
                <p style={{ fontSize: '16px', fontWeight: '400', fontFamily: 'MulishRegular' }} >
                  Filter by
                </p>
                <img src={Images.filter} />
              </div>
            </div>

            <div>
              {isLoading && currentPage === 1 ? (
                <Spinner />
              ) : (
                <div>
                  <div >
                    {requirementsList?.docs?.length ? (
                      requirementsList?.docs?.map(
                        (req, index) => (
                          <RequirementsCard
                            key={`${req?._id} ${index}`}
                            data={req}
                            tab={selectedTab}
                            showButton={false}
                            showNote={true}
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
                  {/* <div className={styles.optionsContainer}>
                    {console.log(filterDevList)}
                    <DeveloperListing
                      item={filterDevList}
                      selectedTab={selectedTab}
                      selectedCard={selectedCard}
                      onApply={(devs) =>
                        shareDeveloperPatchCall(devs)
                      }
                      requirementData={
                        requirementsList?.docs || []
                      }
                    />
                  </div> */}
                </div>)}
            </div>

          </div>
        </div>



        <div className='w-1/4 my-4 mr-4'>

          <div className='bg-ffffff h-fit rounded-10 py-3 border-1e1e1e border px-3 shadow-[0_25px_35px_rgba(0,0,0,0.07)] flex flex-col' >
            <Bold2401 text={'Our Top Agency'} style={{ width: '100%', textAlign: 'center' }} />
            <SizedBox height={'10px'} />
            {
              Array(3).fill('maq').map(item =>
                <div className='my-2' >
                  <AgencyCard />
                </div>
              )
            }
          </div>

          <SizedBox height={'30px'} />
          <div className='bg-ffffff h-fit w-fit overflow-hidden rounded-10 border-1e1e1e border shadow-[0_25px_35px_rgba(0,0,0,0.07)] flex flex-col relative justify-center items-center' >
            <img src={Images.reviewUsBG} />
            <div className='flex flex-col items-center justify-center w-full h-full absolute' >
              <Bold2401 text={'Review us on'} style={{ color: colors.WHITE }} />
              <SizedBox height={'1.245rem'} />
              <div className='flex justify-evenly w-full' >
                {
                  reviewUs?.map(item => (
                    <div className='flex items-center flex-col' >
                      <img src={item.icon} />
                      <SizedBox height={'10px'} />
                      <SemiBold1219 text={item.platform} style={{ color: colors.WHITE }} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <SizedBox height={'30px'} />
          <div className='bg-ffffff h-fit w-full rounded-10 border-1e1e1e border shadow-[0_25px_35px_rgba(0,0,0,0.07)] flex items-center py-2' >
            <img src={Images.earth} />
            <div className='flex flex-col  justify-center w-full h-full' >
              <Bold2401 text={'Contact us'} />
              <Regular1218 text={'We always help you in all way'} />
              <SizedBox height={'3rem'} />
              <div className='flex justify-evenly' >
                <div
                  className='bg-purple-100 p-2 w-fit rounded-md cursor-pointer justify-center items-center flex'
                  onClick={() => { }}
                >
                  <Medium1422 text={'Email us'} style={{ color: colors.PURPLE_700 }} />
                </div>
                <div
                  className='bg-purple-100 p-2 w-fit rounded-md cursor-pointer justify-center items-center flex'
                  onClick={() => { }}
                >
                  <Medium1422 text={'Feedback form'} style={{ color: colors.PURPLE_700 }} />
                </div>
              </div>
            </div>
          </div>

        </div>




      </div>
      {/* <div>
        <div className='flex mx-16 mt-7' >
          {
            tabs?.map(item => {
              let color = item.value === selectedTab ? 'border-blue-700 text-blue-700' : 'border-white text-black-500'
              return (
                <div key={item.value.toString()} className='flex flex-col mr-4' >
                  <div className={`px-5 m-3 border-b-2 ${color} cursor-pointer`} onClick={() => onTabClick(item)} >
                    <p className={`font-semibold text-2xl text-center ${color}`} >{item.title}</p>
                  </div>
                  {item.value === selectedTab &&
                    <div className='flex' >
                      <div className='bg-blue-100 w-4 self-end h-4' >
                        <div className='bg-white w-4 self-end h-4 rounded-br-xl' />
                      </div>
                      <div className='bg-blue-100 w-11/12 self-center rounded-t-xl h-7' >
                      </div>
                      <div className='bg-blue-100 w-4 self-end h-4' >
                        <div className='bg-white w-4 self-end h-4 rounded-bl-xl' />
                      </div>
                    </div>
                  }
                </div>
              )
            })
          }
        </div>

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
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: '10px',
                justifyContent: 'space-between',
                alignItems: 'center',
                // flexWrap: 'wrap'
              }}
            >

              <FilterSelect
                placeholder={'Budget'}
                options={budgetOptions}
                applyFilter={setFilterState}
                objkey={'budget'}
                style={style}
              />

              <FilterSelect
                placeholder={'Posting date'}
                options={recentOptions}
                applyFilter={setFilterState}
                objkey={'createdWithin'}
                style={style}
              />

              <FilterSelect
                placeholder={'Contract'}
                options={contractOptions}
                applyFilter={setFilterState}
                objkey={'contractPeriod'}
                style={style}
              />
              <div
                className='flex bg-white h-9 justify-center items-center rounded border cursor-pointer'
                style={{ width: `${window.innerWidth * 0.13}px`, fontSize: '0.9vw', fontWeight: '400', backgroundImage: switchValue ? 'linear-gradient(to right, #f0a0ad , #bd54fd)' : 'linear-gradient(to right, #fff ,#fff)' }}
                onClick={onHotRequirementClick}
              >
                Hot Requirement 🔥
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
                          tab={selectedTab}
                          showButton={false}
                          showNote={true}
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
                  {console.log(filterDevList)}
                  <DeveloperListing
                    item={filterDevList}
                    selectedTab={selectedTab}
                    selectedCard={selectedCard}
                    onApply={(devs) =>
                      shareDeveloperPatchCall(devs)
                    }
                    requirementData={
                      requirementsList?.docs || []
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
                        item={filterDevList}
                        selectedTab={selectedTab}
                        selectedCard={selectedCard}
                        onApply={(devs) => shareDeveloperPatchCall(devs)}
                        requirementData={
                          requirementsList?.docs || []
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
                          onClick={() => handleRecommendedPagination()}
                        />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
                        </div>*/}

      <Modal
        center
        open={modal?.open}
        showCloseIcon={false}
        onClose={onCloseModal}
        classNames={{ modal: styles.modalRoot }}
        styles={{
          closeButton: { outline: 'none' },
        }}
      >
        <div className={styles.modalContainer} >
          <div className='flex justify-between' >
            <div className='flex flex-col' >
              <Bold3248 text={'Developer Listing'} />
              <SizedBox height={'10px'} />
              <Regular1218
                text={'Your developer list, Choose right one based on project need'}
                style={{ color: colors.BLACK_500 }}
              />
            </div>
            <img
              src={Images.crossInCircle}
              onClick={onCloseModal}
              className='cursor-pointer'
            />
            {/* {selectedTab == 1 && <div className='w-1/4' >
              <Select
                options={conversationOptions}
                placeholder={"Shared by..."}
                onChange={setsharedBy}
                isClearable
              />
            </div>}
            <div className='w-1/4 ml-4 mx-4' >
              <Select
                options={allTechnologies}
                placeholder={"Technologies"}
                onChange={tech => {
                  setselectedTechnology(tech)
                  filterDevsOnTech(tech || null)
                }}
                isClearable
              />
            </div> */}
            {/* <div className='flex h-10 items-center' >
              <p
                onClick={() => routerHistory.push(AGENCYROUTES.ADD_DEVELOPER)}
                className='flex min-w-fit text-blue-700 font-semibold'
              >
                Add Developer
              </p>
              <button
                onClick={() => shareDeveloperPatchCall(selectedDevs)}
                className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn} mx-4`}
              >
                <span>Apply</span>
              </button>
            </div> */}
          </div>

          <div className='relative my-3' >
            <input
              type="text"
              className='bg-fafafb w-full pl-10 pr-10px h-10 rounded text-xs font-Mulish-Regular '
              placeholder='Search Developer'
            />
            <img
              src={Images.search}
              className='absolute h-10 w-10 top-0 left-0 p-10px flex justify-center items-center'
            />
          </div>

          {(filterDevList)?.length ? (
            <div className='' >
              {(filterDevList)?.map((person) => {
                let statusText = person?.isDeveloperShared
                  ? person?.developerSharedBy?.developerStatus === 3
                    ? 'Accepted'
                    : person?.developerSharedBy?.developerStatus ===
                      1
                      ? 'Rejected'
                      : 'Shared'
                  : 'Not Shared';
                return (
                  <div className={styles.DLCard} key={person?._id} style={{}} >
                    <div className='flex' >
                      <div className='flex h-8 w-8 mx-2 justify-center items-center rounded bg-fafafb' >
                        <CheckBox
                          isChecked={isAlreadyShared(person?._id)}
                          onClick={() => selectedMyDev(person?._id)}
                        />
                      </div>
                      <div className='ml-2 pt-1' >
                        {selectedTab == 1 && person?.developerSharedBy?.developerSharedBy == 1 &&
                          <div className='flex justify-center relative' >
                            <img src={agencyTag} height='24px' />
                            <p className='absolute top-1 text-white text-xs' >Shared by You</p>
                          </div>
                        }
                        {selectedTab == 1 && person?.developerSharedBy?.developerSharedBy == 2 &&
                          <div className='flex justify-center relative' >
                            <img src={clientTag} height='24px' />
                            <p className='absolute top-1 text-white text-xs' >Shared by Client</p>
                          </div>
                        }
                        <div
                          className={styles.nameContainer}
                          style={{
                            pointerEvents: person?.isDeveloperShared
                              ? 'none'
                              : 'all'
                          }}
                        >

                          <Bold1619 text={`${person?.firstName} ${person?.lastName}`} />
                          {/* <span
                          className={styles.name}
                        >{`${person?.firstName} ${person?.lastName}`}</span> */}

                          {/* {isResourceNeedSatified === false &&
                          person?.isDeveloperShared === false ? (
                          <input
                            type={'checkbox'}
                            checked={isAlreadyShared(
                              person?._id
                            )}
                            onChange={() =>
                              selectedMyDev(person?._id)
                            }
                          />
                        ) : <p className='text-sm text-green-700' >Shared</p>
                        } */}
                        </div>
                        <SizedBox height={'6px'} />
                        <Regular1218
                          text={getTechnologies(person?.developerTechnologies)}
                          style={{ color: colors.BLACK_500 }}
                        />
                        {/* <div className='w-8/12' >
                        <span className={styles.techText}>
                          {getTechnologies(
                            person?.developerTechnologies
                          )}
                        </span>
                      </div> */}
                        {/* <span
                      className={styles.experienceText}
                    >{`experience- ${person?.developerExperience} years`}
                    </span> */}
                      </div>
                    </div>
                    <div
                      style={{
                        pointerEvents: 'inherit',
                        display: 'flex'
                      }}
                    >
                      {(selectedTab == 0 || selectedTab == 2) &&
                        <ButtonOutlined
                          label={'View Resume'}
                          onClick={() => window.open(
                            person?.developerDocuments[0]
                              ?.documentLink
                          )}
                          style={{ height: '36px', paddingInline: '8px', borderRadius: '4px', marginRight: '10px' }}
                          medium
                        />
                        // <Button
                        //   onClick={() =>
                        //     window.open(
                        //       person?.developerDocuments[0]
                        //         ?.documentLink
                        //     )
                        //   }
                        //   name="View Resume"
                        //   buttonExtraStyle={{
                        //     borderColor: '#45A4EA',
                        //     width: '110px'
                        //   }}
                        //   buttonTextStyle={buttonTextStyle}
                        // />
                      }

                      {!isResourceNeedSatified &&
                        person?.isDeveloperShared &&
                        person?.developerSharedBy
                          ?.isAnswered === false &&
                        person?.developerSharedBy
                          ?.developerSharedBy === 2 &&
                        selectedTab === 1 &&
                        (
                          <>
                            <div className='flex justify-evenly w-full' >
                              <Button
                                onClick={() => { acceptOrReject(3, person) }}
                                name="Accept"
                                buttonExtraStyle={{
                                  width: '110px',
                                  border: '1px solid #5C6DFF',
                                  backgroundColor: '#5C6DFF'
                                }}
                                buttonTextStyle={{ color: '#fff', fontWeight: '700' }}
                              />
                              <Button
                                onClick={() => { acceptOrReject(1, person) }}
                                name="Reject"
                                buttonExtraStyle={{
                                  width: '110px',
                                  border: '1px solid #5C6DFF',
                                  backgroundColor: '#fff'
                                }}
                                buttonTextStyle={{ color: '#5C6DFF', fontWeight: '700' }}
                              />
                            </div>
                          </>
                        )}
                      {
                        selectedTab === 1 && person.developerSharedBy.isAnswered && (<>
                          {person.developerSharedBy.developerStatus == 1 && <p className='text-red-400' >Rejected</p>}
                          {person.developerSharedBy.developerStatus == 3 && <p className='text-green-700' >Selected</p>}
                        </>)
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.paperPlane}>
              <img
                src={paperPlane}
                style={{ height: '140px', width: '140px' }}
                alt="no data"
              />
              {!selectedCard ? (
                <span className={styles.noDataMsg}>
                  select one of the available requirement then select
                  your developer
                </span>
              ) : (
                <>
                  <p
                    className={styles.noDataMsg}
                    style={{
                      textTransform: 'unset',
                      marginBottom: '20px'
                    }}
                  >
                    Looks like you haven't added any developers
                    matches with the requirement
                  </p>
                  <button
                    onClick={() =>
                      routerHistory.push(AGENCYROUTES.ADD_DEVELOPER)
                    }
                    className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
                  >
                    <span>Add Developers</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
};

export const AgencyCard = () => (
  <div className='flex border border-1e1e1e rounded-xl items-center p-10px'  >
    <div className='h-14 w-14 rounded-full border border-1e1e1e bg-black-350' />
    <SizedBox height={'16px'} width={'16px'} />
    <div>
      <SemiBold1421 text={'RoboSoft Technologies'} />
      <SizedBox height={'2px'} width={'16px'} />
      <Regular1218 text={'Generated more than'} />
      <Regular1218 text={'25k$'} />
    </div>
  </div>
)

const buttonExtraStyle = {
  background: 'rgba(1, 95, 154, 0.12)',
  borderRadius: '6px',
  border: 'none',
  width: '100px'
};

export const buttonTextStyle = {
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
