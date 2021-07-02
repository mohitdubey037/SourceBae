/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ClientNavbar from "../ClientNavbar";
import "./AgencyList.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import NO_DATA_FOUND from '../../../assets/images/No_Data/noData.jpg';

import instance from "../../../Constants/axiosConstants";
import { useParams } from "react-router";
import * as helper from "../../../shared/helper";
import Spinner from "../../../Components/Spinner/Spinner";

function AgencyList(props) {
  const Role = localStorage.getItem('role')
  let { projectId } = useParams();


  projectId = projectId ? helper.cleanParam(projectId) : "";
  const [agencyList, setAgencyList] = useState([]);
  const [isOfficeVisit, setOfficeVisit] = useState(false);
  const [isOffsiteTravel, setOffsiteTravel] = useState(false);
  const [open, setOpen] = useState(false);
  const [openQuotation, setOpenQuotation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1)

  const openShortlistModal = (_id, indexParam) => {
    setOpen(true);
    setIndex(indexParam)
    setShortlistFormData({
      ...shortlistFormData,
      agencyId: _id,
    });
  };
  const onCloseModal = () => setOpen(false);

  const onOpenQuotationModel = (_id, indexParam) => {
    setIndex(indexParam)
    setOpenQuotation(true);
    setQuotationFormData({
      ...QuotationFormData,
      agencyId: _id,
    });
  };
  const onCloseQuotation = () => setOpenQuotation(false);

  const [shortlistFormData, setShortlistFormData] = useState({
    comment: "",
    isShortListed: true,
  });

  const [QuotationFormData, setQuotationFormData] = useState({
    isShortListed: true,
    isAskedForQuotation: true,
    negotiablePrice: "",
    comment: "",
  });

  useEffect(() => {
    instance
      .get(`/api/${Role}/projects/${projectId}/agencies`)
      .then(function (response) {
        console.log(response, "response");
        setAgencyList(response);
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShortlistFormData({
      ...shortlistFormData,
      [name]: value,
    });
  };

  const handleQuotationChange = (event) => {
    const { name, value } = event.target;
    setQuotationFormData({
      ...QuotationFormData,
      [name]: value,
    });
  };

  const shortlistHandler = () => {
    instance
      .patch(`/api/${Role}/projects/propose/${projectId}`, shortlistFormData)
      .then(function (response) {
        const tempAgencyList = [...agencyList]
        tempAgencyList[index].isAgencyShortListed = true
        setAgencyList(tempAgencyList)
      })
      .catch((err) => {
        console.log(err);
      });
    onCloseModal()
  };

  const quotationSubmitHandler = () => {
    instance
      .patch(`/api/${Role}/projects/propose/${projectId}`, QuotationFormData)
      .then(function (response) {
        const tempAgencyList = [...agencyList]
        tempAgencyList[index].isAgencyAskedForQuotation = true
        setAgencyList(tempAgencyList)
      })
      .catch((err) => {
        console.log(err);
      });
    onCloseQuotation();
  };

  useEffect(() => {
    console.log(shortlistFormData)
  }, [shortlistFormData]);

  return (
    <>
      <ClientNavbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            className="backArrow_agencyList"
            onClick={() => {
              props.history.goBack();
            }}
          >
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </div>
          <div className="innerprojectDetailsInfo_agencyList">
            <p>One Sourcing</p>
            <span>
              {" "}
              <em> Buget:-</em> $5000-$1000
            </span>
          </div>
          <div className="mainAgencyList_agencyList">
            {agencyList?.length > 0 ?
              < div className="innerAgencyList_agencyList">
                <div className="AgencyCardsArea_agencyList">
                  {agencyList?.length > 0 &&
                    agencyList.map((agency, index) => {
                      console.log(agency._id);
                      return (
                        <div className="agencyPreciseCard_agencyList">
                          <div className="agencyCardHeaderInfo">
                            <div className="agencyImageProfile">
                              <div className="agencyImageArea">
                                <img src={agency.agencyLogo} alt="agency Logo" />
                              </div>
                              <div className="agencyProfileInfo">
                                <h6>{agency.agencyName}</h6>
                                <div>
                                  <p>Media & Social</p>
                                  <p>Proficient</p>
                                </div>
                              </div>
                            </div>
                            <div className="profileButton">
                              {agency.productId !== undefined ? 
                              <p onClick={() => props.history.push({
                                pathname: `/product-details:${agency.productId}`,
                                condition: `Client`
                              })}>
                                View Agency Product{" "}
                                <i
                                  class="fa fa-angle-double-right"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              : null  
                            }
                              
                            </div>
                          </div>

                          <div className="middleAgencyArea">
                            <div className="agencyAddressTeam">
                              <h6>Miscellaneous Info</h6>
                              <div className="agencyAddressArea">
                                <div className="locationIcon">
                                  <i class="fa fa-globe" aria-hidden="true"></i>
                                </div>
                                <div className="locationText">
                                  <p>{`${agency?.agencyAddress?.address} ${agency?.agencyAddress?.location}`}</p>
                                </div>
                              </div>
                              <div className="agencyAddressArea">
                                <div className="teamIcon">
                                  <i class="fa fa-users" aria-hidden="true"></i>
                                </div>
                                <div className="teamNumberPart">
                                  <p>
                                    <span>{agency.agencyTeamSize}</span>members
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="agencyDescInfo">
                              <h6>Description</h6>
                              <p>{agency.agencyDescription}</p>
                            </div>
                          </div>

                          <div className="quotationShortlistButton">
                            {agency.isAgencyAskedForQuotation ? (
                              <div
                                onClick={() =>
                                  props.history.push({
                                    pathname: `/project-details/${projectId}/${agency._id}`,
                                    condition: "Client",
                                  })
                                }
                              >
                                <p>Show Details</p>
                              </div>
                            ) : agency.isAgencyShortListed || agency.isAgencyAskedForQuotation ? (
                              <>
                                <div
                                  onClick={() =>
                                    props.history.push({
                                      pathname: `/project-details/${projectId}/${agency._id}`,
                                      condition: "Client",
                                    })
                                  }
                                >
                                  <p>Show Details</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div onClick={() => openShortlistModal(agency._id, index)}>
                                  <p>Shortlist</p>
                                </div>
                                <div onClick={() => onOpenQuotationModel(agency._id, index)}>
                                  <p>Get Quotation</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="agencyFilterArea_agencyList">
                  <div className="filterForm">
                    <div className="filterHeading">
                      <p className="filterText">Filter</p>
                      <div>
                        <p>Clear All</p>
                      </div>
                    </div>

                    <div className="locationFilter">
                      <p>Location</p>
                      <input
                        type="text"
                        placeholder="Type here.."
                        name=""
                        id=""
                      />
                    </div>

                    <div className="officeVisitFilter">
                      <p>Office Visit</p>
                      <div
                        className="officeVisitRadio"
                        onClick={() => setOfficeVisit(!isOfficeVisit)}
                      >
                        <div
                          className="officeVisitRadioImage"
                          style={{
                            backgroundColor: isOfficeVisit ? "#3498DB" : "#fff",
                          }}
                        >
                          {isOfficeVisit ? (
                            <i
                              style={{ color: isOfficeVisit ? "#fff" : "#000" }}
                              class="fa fa-check"
                              aria-hidden="true"
                            ></i>
                          ) : null}
                        </div>
                        <div>
                          <span>Allowed</span>
                        </div>
                      </div>
                    </div>

                    <div className="officeVisitFilter">
                      <p>Offsite Travel</p>
                      <div
                        className="officeVisitRadio"
                        onClick={() => setOffsiteTravel(!isOffsiteTravel)}
                      >
                        <div
                          className="officeVisitRadioImage"
                          style={{
                            backgroundColor: isOffsiteTravel ? "#3498DB" : "#fff",
                          }}
                        >
                          {isOffsiteTravel ? (
                            <i
                              style={{ color: isOffsiteTravel ? "#fff" : "#000" }}
                              class="fa fa-check"
                              aria-hidden="true"
                            ></i>
                          ) : null}
                        </div>
                        <div>
                          <span>Allowed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='noDataFound'>
                <img src={NO_DATA_FOUND} alt='no data found' />
                <p style={{marginTop: '20px', fontStyle: 'italic' }}>No Agency Found!!!..</p>
              </div>
            }
          </div>
        </>
      )
      }

      {/* Modal for shortlist  */}
      <Modal
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
      </Modal>

      {/* Quotation Modal  */}
      <Modal
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
      </Modal>
    </>
  );
}

export default AgencyList;
