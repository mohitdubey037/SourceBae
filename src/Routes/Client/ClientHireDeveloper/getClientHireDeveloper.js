/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './getClientHireDeveloper.css';
import instance from '../../../Constants/axiosConstants';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Spinner from '../../../Components/Spinner/Spinner';
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import Back from '../../../Components/Back/Back';
import DownImage from '../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import { CLIENT } from '../../../shared/constants';
import VerifyModal from '../../../Components/VerifyModal/VerifyModal';

function ClientHireDeveloper(props) {
    const Role = localStorage.getItem('role');

    const userId = localStorage.getItem('userId');

    const [loading, setLoading] = useState(true);

    const [hiredDevelopers, setHiredDevelopers] = useState({});

    const generateBudgetStr = (budget) =>
        !budget?.min
            ? `Less than INR ${budget?.max ?? ''} per month`
            : `INR ${budget?.min ?? ''} - INR ${budget?.max ?? ''} per month`;

    const requirementApi = () => {
        instance
            .get(`/api/${Role}/hire-developers/all?clientId=${userId}`, {
                params: {
                    page: hiredDevelopers?.nextPage || 1
                }
            })
            .then((response) => {
                setLoading(false);
                setHiredDevelopers((prev) => ({
                    ...response,
                    docs: prev?.docs
                        ? [...prev.docs, ...response.docs]
                        : [...response.docs]
                }));
            })
            .catch((err) => {
                setLoading(false);
            });
    };
    useEffect(() => {
        requirementApi();
    }, []);

    return (
        <div className="MainDevDiv">
            <img
                className="Image2_GetHireDev"
                src={DownImage}
                alt="downImage"
            />
            <>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <Navbar />
                        <div className="mainAgencyList_parent">
                            <Back name="Requested Developers" />
                            {/* <div className="mainAgencyList"> */}
                            <div className="innerAgencyList">
                                <div className="AgencyCardsArea">
                                    {hiredDevelopers?.docs?.length > 0 ? (
                                        hiredDevelopers?.docs?.map(
                                            (
                                                hireDeveloperRequirement,
                                                index
                                            ) => {
                                                return (
                                                    <div
                                                        className="agencyPreciseCard agencyPreciseCard_new"
                                                        key={index}
                                                        style={{}}
                                                    >
                                                        {/* <div className="agencyCardHeaderLine"></div> */}
                                                        <div className="agencyCardHeaderInfo">
                                                            <div className="agencyImageProfile">
                                                                <div className="agencyProfileInfo">
                                                                    <h6>
                                                                        {
                                                                            hireDeveloperRequirement.requirementName
                                                                        }
                                                                    </h6>
                                                                    <div
                                                                        style={{
                                                                            minWidth:
                                                                                '15rem',
                                                                            marginLeft:
                                                                                '1rem'
                                                                        }}
                                                                    >
                                                                        <p>
                                                                            Contract
                                                                            Period
                                                                        </p>
                                                                        <p>
                                                                            {`${hireDeveloperRequirement.contractPeriod} months`}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="profileButton">
                                                                <p
                                                                    onClick={() =>
                                                                        props.history.push(
                                                                            {
                                                                                pathname: `/client-one-hire-developer/${hireDeveloperRequirement._id}`,
                                                                                condition:
                                                                                    CLIENT
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                    Developer
                                                                    Requirements{' '}
                                                                    <i
                                                                        className="fa fa-angle-double-right"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="middleAgencyArea-get">
                                                            <div className="agencyAddressTeam">
                                                                <h6
                                                                    style={{
                                                                        fontSize:
                                                                            '16px',
                                                                        marginTop:
                                                                            '8px',
                                                                        paddingLeft:
                                                                            '2px',
                                                                        fontFamily:
                                                                            'Segoe UI semibold'
                                                                    }}
                                                                >
                                                                    Developers
                                                                    Data
                                                                </h6>
                                                                <div className="agencyAddressArea">
                                                                    <div className="locationIcon">
                                                                        <i
                                                                            className="fa fa-globe"
                                                                            aria-hidden="true"
                                                                        ></i>
                                                                    </div>
                                                                    <div className="locationText">
                                                                        <p>
                                                                            Preferred
                                                                            Billing
                                                                            Mode
                                                                            :{' '}
                                                                            {
                                                                                hireDeveloperRequirement.preferredBillingMode
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="agencyAddressArea">
                                                                    <div className="teamNumberPart">
                                                                        <p>
                                                                            <span>
                                                                                Budget
                                                                                :{' '}
                                                                                {generateBudgetStr(
                                                                                    hireDeveloperRequirement.averageBudget
                                                                                )}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="agencyDescInfo">
                                                                <h6>
                                                                    Developers
                                                                    Role
                                                                    Required
                                                                </h6>
                                                                {hiredDevelopers !==
                                                                    undefined &&
                                                                    hireDeveloperRequirement?.developerRolesRequired?.map(
                                                                        (
                                                                            drr
                                                                        ) => (
                                                                            <p>
                                                                                {
                                                                                    drr
                                                                                }
                                                                            </p>
                                                                        )
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : (
                                        <div className="noDataFound">
                                            <img
                                                src={PageNotFound}
                                                alt="no data found"
                                            />
                                            <h6 style={{ marginTop: '20px' }}>
                                                No Data Found!!!..
                                            </h6>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                        {hiredDevelopers?.hasNextPage && (
                            <div
                                className="loadmore_container"
                                style={{
                                    display: 'flex',
                                    position: 'relative',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: '2'
                                }}
                            >
                                <button
                                    className="loadmore_button"
                                    onClick={requirementApi}
                                >
                                    Load More{' '}
                                </button>
                            </div>
                        )}
                        <VerifyModal
                            Role={Role}
                            id={userId}
                            isUserVerified={null}
                        />
                    </>
                )}
            </>
        </div>
    );
}

export default ClientHireDeveloper;
