/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from '../../Dashboard/Navbar';
import "./getClientHireDeveloper.css";

import "react-responsive-modal/styles.css";
import instance from "../../../Constants/axiosConstants";
import ClientNavbar from '../ClientNavbar';
import Spinner from "../../../Components/Spinner/Spinner";

function ClientHireDeveloper(props) {
  const Role = "client";
  const userId = localStorage.getItem('userId');

  const [loading, setLoading] = useState(true);

  const [hiredDevelopers, setHiredDevelopers] = useState([])

  useEffect(() => {
    instance.get(`/api/${Role}/hire-developers/all?clientId=${userId}`)
      .then(response => {
        setLoading(false);
        console.log(response);
        setHiredDevelopers(response)
      })
      .catch(err => {
        setLoading(false)
        console.log(err);
      })
  }, [])


  return (
    <>
      <ClientNavbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mainAgencyList">
            <div className="innerAgencyList">
              <div className="AgencyCardsArea">
                {hiredDevelopers?.length > 0 ?
                  hiredDevelopers.map((hireDeveloperRequirement, index) => {
                    return (
                      <div className="agencyPreciseCard">
                        <div className="agencyCardHeaderLine"></div>
                        <div className="agencyCardHeaderInfo">
                          <div className="agencyImageProfile">
                            <div className="agencyProfileInfo">
                              <h6>{hireDeveloperRequirement._id}</h6>
                              <div>
                                <p>Contract Period</p>
                                <p>{hireDeveloperRequirement.contractPeriod}</p>
                              </div>
                            </div>
                          </div>
                          <div className="profileButton">
                            <p onClick={() => props.history.push({
                              pathname: `/client-one-hire-developer:${hireDeveloperRequirement._id}`
                            })}>
                              View Developer Requirements{" "}
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
                                <i className="fa fa-globe" aria-hidden="true"></i>
                              </div>
                              <div className="locationText">
                                <p>Preferred Billing Mode : {hireDeveloperRequirement.preferredBillingMode}</p>
                              </div>
                            </div>
                            <div className="agencyAddressArea">
                              <div className="teamNumberPart">
                                <p>
                                  <span>Budget : {hireDeveloperRequirement.averageBudget}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="agencyDescInfo">
                            <h6>Developers Role Required</h6>
                            {/* <p>{agency.agencyDescription}</p> */}
                            {console.log(hireDeveloperRequirement)}
                            {hiredDevelopers !== undefined && hireDeveloperRequirement?.developerRolesRequired?.map(drr => <p>{drr}</p>)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                  :
                  <h2>No Data Found.</h2>
                  }
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default ClientHireDeveloper;



