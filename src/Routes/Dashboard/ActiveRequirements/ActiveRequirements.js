import React, { useEffect, useState, useCallback } from 'react';
import './ActiveRequirements.css';
import SearchAndFilter from './SearchAndFilter';
import PromotionalStrip from './PromotionalStrip';
import LNavbar from '../../MainLandingPage/Components/Navbar/LNavbar';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import instance from '../../../Constants/axiosConstants';
import { AGENCY } from '../../../shared/constants';
import Button from '../../../Components/Button/Button';
// eslint-disable-next-line no-unused-vars
import { debounce } from 'lodash';

let currentPage = 1;
export default function ActiveRequirements() {
    const [requirementsList, setRequirementsList] = useState({ docs: [] });
    const role = AGENCY;

    const [searchText, setSearchText] = useState('');

    const [filterState, setFilterState] = useState({
        contractPeriod: undefined,
        budget: undefined,
        createdWithin: undefined,
        minBudget: undefined,
        maxBudget: undefined
    });

    const hireDevApi = async (isParam = false, val) => {
        const url = `/api/${role}/hire-developers/all`;
        const [minBudget, maxBudget] = filterState?.budget?.split('-') ?? [];
        console.log(minBudget);
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

    function handlePagination() {
        currentPage++;
        hireDevApi(true);
    }
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
            </div>
        </>
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
