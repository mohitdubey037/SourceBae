/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from '../../Dashboard/Navbar';
import "./getClientHireDeveloper.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import instance from "../../../Constants/axiosConstants";
import { useParams } from "react-router";
import * as helper from '../../../shared/helper';
import ClientNavbar from '../ClientNavbar';
import Spinner from "../../../Components/Spinner/Spinner";

function ClientHireDeveloper(props) {
  const Role = "client";
  const userId = localStorage.getItem('userId');
  let { projectId } = useParams();

  projectId = projectId ? helper.cleanParam(projectId) : "";
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
                {hiredDevelopers?.length > 0 &&
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
                  })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal for shortlist  */}
      {/* <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "ShortListModalOverlay",
          modal: "ShortListModal",
        }}
      >
        <div className="shortlistModal">
          <h2>ShortList</h2>
          <div className="shortlistForm">
            <span>Comment Box</span>
            <textarea
              onChange={(event) => handleChange(event)}
              name="comment"
              id=""
              cols="30"
              rows="10"
              placeholder="Type from here..."
            ></textarea>
            <button onClick={shortlistHandler}>Submit</button>
          </div>
        </div>
      </Modal> */}

      {/* Quotation Modal  */}
      {/* <Modal
        open={openQuotation}
        onClose={onCloseQuotation}
        center
        classNames={{
          overlay: "QuotationModalOverlay",
          modal: "QuotationModal",
        }}
      >
        <div className="QuotationModal">
          <h2>Quotation</h2>
          <div className="QuotationModalForm">
            <div className="innerQuotation">
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Name</p>
                </div>
                <div className="tableContentQuotation">
                  <p>One Sourcing</p>
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Budget</p>
                </div>
                <div className="tableContentQuotation">
                  <p>$5000- $10000</p>
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Tech</p>
                </div>
                <div className="tableContentQuotation">
                  <p>ReactJs </p>
                  <p>React Native</p>
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Time</p>
                </div>
                <div className="tableContentQuotation">
                  <p>90 days </p>
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Business Type</p>
                </div>
                <div className="tableContentQuotation">
                  <p>B2B</p>
                  <p>B2C</p>
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Negotiable Upto</p>
                </div>
                <div className="tableContentQuotation">
                  <input
                    name="negotiablePrice"
                    onChange={handleQuotationChange}
                    type="number"
                    placeholder="Text should be number"
                    min="0"
                  />
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p name="comment">Comment Box</p>
                </div>
                <div className="tableContentQuotation">
                  <textarea
                    onChange={(event) => handleQuotationChange(event)}
                    name="comment"
                    id=""
                    cols="30"
                    rows="6"
                    placeholder="Type from here.."
                  ></textarea>
                </div>
              </div>

              <div className="quotationSubmitButton">
                <div></div>
                <button onClick={quotationSubmitHandler}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
}

export default ClientHireDeveloper;



