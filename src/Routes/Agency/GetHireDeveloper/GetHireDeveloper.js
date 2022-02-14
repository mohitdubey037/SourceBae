/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Navbar from '../../Dashboard/Navbar';
import './GetHireDeveloper.css';

import 'react-responsive-modal/styles.css';
import instance from '../../../Constants/axiosConstants';
import Spinner from '../../../Components/Spinner/Spinner';

import { AGENCY } from '../../../shared/constants';

function HireDeveloper(props) {
    const Role = AGENCY;
    const userId = localStorage.getItem('userId');

    const [loading, setLoading] = useState(true);

    const [hiredDevelopers, setHiredDevelopers] = useState([]);

    useEffect(() => {
        if (userId)
            instance
                .get(`/api/${Role}/hire-developers/all?agencyId=${userId}`)
                .then((response) => {
                    setLoading(false);
                    setHiredDevelopers(response);
                })
                .catch((err) => {
                    setLoading(false);
                });
        setLoading(false);
    }, []);

    return (
        <>
            <Navbar />
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className="mainAgencyList">
                        <div className="innerAgencyList">
                            <div className="AgencyCardsArea">
                                {hiredDevelopers?.length > 0 ? (
                                    hiredDevelopers.map((agency, index) => {
                                        return (
                                            <div className="agencyPreciseCard">
                                                <div className="agencyCardHeaderLine"></div>
                                                <div className="agencyCardHeaderInfo">
                                                    <div className="agencyImageProfile">
                                                        <div className="agencyProfileInfo">
                                                            <h6>
                                                                {
                                                                    agency.requirementName
                                                                }
                                                            </h6>
                                                            <div>
                                                                <p>
                                                                    Contract
                                                                    Period
                                                                </p>
                                                                <p>
                                                                    {
                                                                        agency.contractPeriod
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="profileButton">
                                                        <p
                                                            onClick={() =>
                                                                props.history.push(
                                                                    {
                                                                        pathname: `/get-one-hire-developer:${agency._id}`
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            View Developer
                                                            Requirements{' '}
                                                            <i
                                                                className="fa fa-angle-double-right"
                                                                aria-hidden="true"
                                                            ></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="middleAgencyArea">
                                                    <div className="agencyAddressTeam">
                                                        <h6>Developers Data</h6>
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
                                                                    Billing Mode
                                                                    :{' '}
                                                                    {
                                                                        agency.preferredBillingMode
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="agencyAddressArea">
                                                            <div className="teamNumberPart">
                                                                <p>
                                                                    <span>
                                                                        Budget :{' '}
                                                                        {
                                                                            agency.averageBudget
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="agencyDescInfo">
                                                        <h6>
                                                            Developers Role
                                                            Required
                                                        </h6>
                                                        {/* <p>{agency.agencyDescription}</p> */}
                                                        {hiredDevelopers !==
                                                            undefined &&
                                                            agency?.developerRolesRequired?.map(
                                                                (drr) => (
                                                                    <p>{drr}</p>
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <h2>NO DATA FOUND</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default HireDeveloper;
