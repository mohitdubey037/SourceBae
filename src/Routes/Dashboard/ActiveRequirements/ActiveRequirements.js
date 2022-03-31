import React, { useEffect, useState, useCallback } from 'react';
import './ActiveRequirements.css';
import SearchAndFilter from './SearchAndFilter';
import PromotionalStrip from './PromotionalStrip';
import LNavbar from '../../MainLandingPage/Components/Navbar/LNavbar';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import instance from '../../../Constants/axiosConstants';
import Button from '../../../Components/Button/Button';
import { AGENCY } from '../../../shared/constants';
import cookie from 'react-cookies';
// eslint-disable-next-line no-unused-vars
import { debounce } from 'lodash';
import NoDataComponent from '../../../Components/NoData/NoDataComponent';
import Spinner from '../../../Components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';
import { AGENCYROUTES } from '../../../Navigation/CONSTANTS';

let currentPage = 1;
export default function ActiveRequirements() {
    const [requirementsList, setRequirementsList] = useState({ docs: [] });
    const routerHistory = useHistory();
    const role = AGENCY;

    const [searchText, setSearchText] = useState('');
    const [isLoading, setisLoading] = useState(true);

    const [filterState, setFilterState] = useState({
        contractPeriod: undefined,
        budget: undefined,
        createdWithin: undefined
    });

    const hireDevApi = async (config, val) => {
        setisLoading(true);
        const url = `/api/${role}/hire-developers/all`;
        const [minBudget, maxBudget] = filterState?.budget?.split('-') ?? [];
        if (config?.isShowMore) currentPage += 1;
        else currentPage = 1;
        instance
            .get(url, {
                params: config?.isParam
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
            })
            .finally(() => setisLoading(false));
    };

    function handlePagination() {
        hireDevApi({ isParam: true, isShowMore: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceFn = useCallback(debounce(hireDevApi, 1000), []);

    useEffect(() => {
        hireDevApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role]);

    const onApplyClick = () => {
        let user = localStorage.getItem('userId');
        let auth = cookie.load('Authorization');

        if (user && auth) {
            routerHistory.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
        } else {
            alert('Please login to continue');
            routerHistory.push({
                pathname: `login/${AGENCY}`,
                state: { isAgencyRequirement: true }
            });
        }
    };

    return (
        <div
            onClick={() =>
                (document.getElementById('pop-up').style.display = 'none')
            }
        >
            <LNavbar />
            <PromotionalStrip />(
            <div className="bodyWrapper">
                <div className="greyCard">
                    <h1 className="heading">Current Requirements</h1>
                    <div className="partition">
                        {isLoading && currentPage === 1 ? (
                            <Spinner style={{ width: '100%' }} />
                        ) : (
                            <div className="listContainer">
                                {requirementsList?.docs?.length ? (
                                    requirementsList?.docs?.map(
                                        (req, index) => (
                                            <RequirementsCard
                                                key={req?._id}
                                                data={req}
                                                showButton={false}
                                                buttonTitle={'Apply now'}
                                                onApplyClick={onApplyClick}
                                            />
                                        )
                                    )
                                ) : (
                                    <NoDataComponent />
                                )}
                            </div>
                        )}
                        <div className="optionsContainer">
                            <SearchAndFilter
                                filterState={filterState}
                                setFilterState={setFilterState}
                                filterApplier={() =>
                                    hireDevApi({ isParam: true })
                                }
                                setSearchText={(val) => {
                                    setSearchText(val);
                                    debounceFn({ isParam: true }, val);
                                }}
                            />
                        </div>
                    </div>
                    <div className={`showMorebtn`}>
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
                </div>
            </div>
            )
        </div>
    );
}
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
