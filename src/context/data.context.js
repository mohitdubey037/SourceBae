import React, { useState } from 'react';
import instance from '../Constants/axiosConstants';

export const DataContext = React.createContext(null);

export const DataContextProvider = (props) => {
    const [agencyCurrentRequirementsList, setAgencyRequirementsList] = useState(
        { docs: [] }
    );
    const [recommendedRequirementsList, setRecommendedRequirementsList] =
        useState({ docs: [] });
    const [loading, setLoading] = React.useState(true);

    function getAgencyRequirementsList(
        url,
        params,
        config,
        val,
        recommendedPage
    ) {
        instance
            .get(url, {
                params
            })
            .then((res) => {
                if (!res?.hasNextPage) {
                    recommendedPage = 1;
                    getRecommendedRequirementsForAgency(
                        { isShowMore: false, isParam: true },
                        val
                    );
                }
                config?.isShowMore
                    ? setAgencyRequirementsList((prevState) => ({
                          ...res,
                          docs: prevState?.docs
                              ? [...prevState?.docs, ...res?.docs]
                              : [...res?.docs]
                      }))
                    : setAgencyRequirementsList({ ...res, docs: res?.docs });
            })
            .catch((err) => {
                setAgencyRequirementsList({ docs: [] });
            })
            .finally(() => setLoading(false));
    }

    const getRecommendedRequirementsForAgency = async (
        role,
        config,
        val,
        filterState,
        agencyId,
        recommendedPage,
        searchText,
        switchValue
    ) => {
        setLoading(true);
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
                    ? setRecommendedRequirementsList((prevState) => ({
                          ...res,
                          docs: prevState?.docs
                              ? [...prevState?.docs, ...res?.docs]
                              : [...res?.docs]
                      }))
                    : setRecommendedRequirementsList({
                          ...res,
                          docs: res?.docs
                      });
            })
            .catch((err) => {
                setRecommendedRequirementsList({ docs: [] });
            })
            .finally(() => setLoading(false));
    };
    return (
        <DataContext.Provider
            value={{
                loading,
                setLoading,
                agencyCurrentRequirementsList,
                recommendedRequirementsList,
                getAgencyRequirementsList
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};
