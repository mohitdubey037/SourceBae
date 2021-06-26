/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from '../../Dashboard/Navbar';
import "./GetHireDeveloper.css";

import "react-responsive-modal/styles.css";

import instance from "../../../Constants/axiosConstants";
import Spinner from "../../../Components/Spinner/Spinner";

function HireDeveloper(props) {
  const Role = "agency";
  const userId = localStorage.getItem('userId');

  const [loading, setLoading] = useState(true);

  const [hiredDevelopers, setHiredDevelopers] = useState([])

  useEffect(() => {
    instance.get(`/api/${Role}/hire-developers/all?agencyId=${userId}`)
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
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mainAgencyList">
            <div className="innerAgencyList">
              <div className="AgencyCardsArea">
                {hiredDevelopers?.length > 0 ?
                  hiredDevelopers.map((agency, index) => {
                    return (
                      <div className="agencyPreciseCard">
                        <div className="agencyCardHeaderLine"></div>
                        <div className="agencyCardHeaderInfo">
                          <div className="agencyImageProfile">
                            <div className="agencyProfileInfo">
                              <h6>{agency._id}</h6>
                              <div>
                                <p>Contract Period</p>
                                <p>{agency.contractPeriod}</p>
                              </div>
                            </div>
                          </div>
                          <div className="profileButton">
                            <p onClick={() => props.history.push({
                              pathname: `/get-one-hire-developer:${agency._id}`
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
                                <p>Preferred Billing Mode : {agency.preferredBillingMode}</p>
                              </div>
                            </div>
                            <div className="agencyAddressArea">
                              <div className="teamNumberPart">
                                <p>
                                  <span>Budget : {agency.averageBudget}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="agencyDescInfo">
                            <h6>Developers Role Required</h6>
                            {/* <p>{agency.agencyDescription}</p> */}
                            {console.log(agency)}
                            {hiredDevelopers !== undefined && agency?.developerRolesRequired?.map(drr => <p>{drr}</p>)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                  :
                  <h2>NO DATA FOUND</h2>
                  }
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

export default HireDeveloper;



