/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./AgencyList.css";
import "react-responsive-modal/styles.css";

import { Modal } from "react-responsive-modal";
import NO_DATA_FOUND from "../../../assets/images/No_Data/noData.jpg";
import Sidebar from "../../../Components/ClientNewestDashboard/Sidebar/Sidebar";

import instance from "../../../Constants/axiosConstants";
import { useParams } from "react-router";
import * as helper from "../../../shared/helper";
import Spinner from "../../../Components/Spinner/Spinner";
import Navbar from "../../../Components/ClientNewestDashboard/Navbar/Navbar";
import Back from "../../../Components/Back/Back";
import UpImage from '../../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';

function AgencyList(props) {
  const Role = localStorage.getItem("role");
  let { projectId } = useParams();

  projectId = projectId ? helper.cleanParam(projectId) : "";
  const [agencyList, setAgencyList] = useState([]);
  const [isOfficeVisit, setOfficeVisit] = useState(false);
  const [isOffsiteTravel, setOffsiteTravel] = useState(false);
  const [open, setOpen] = useState(false);
  const [openQuotation, setOpenQuotation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(-1);

  const [project, setProject] = useState([]);

  const openShortlistModal = (_id, indexParam) => {
    setOpen(true);
    setIndex(indexParam);
    setShortlistFormData({
      ...shortlistFormData,
      agencyId: _id,
    });
  };
  const onCloseModal = () => setOpen(false);

  const onOpenQuotationModel = (_id, indexParam) => {
    setIndex(indexParam);
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
        console.log(response.agencies, "response");
        setAgencyList(response.agencies);
        setProject(response.project);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(project);
  }, [project]);

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
    console.log(agencyList, "agencyList");
    instance
      .patch(`/api/${Role}/projects/propose/${projectId}`, shortlistFormData)
      .then(function (response) {
        console.log(agencyList, Object.keys(agencyList));
        const tempAgencyList = [...agencyList];
        tempAgencyList[index].isAgencyShortListed = true;
        setAgencyList(tempAgencyList);
      })
      .catch((err) => {
        console.log(err);
      });
    onCloseModal();
  };

  const quotationSubmitHandler = () => {
    instance
      .patch(`/api/${Role}/projects/propose/${projectId}`, QuotationFormData)
      .then(function (response) {
        const tempAgencyList = [...agencyList];
        tempAgencyList[index].isAgencyAskedForQuotation = true;
        setAgencyList(tempAgencyList);
      })
      .catch((err) => {
        console.log(err);
      });
    onCloseQuotation();
  };

  const notificationVisible = (status) => {
    setVisible(status);
  };

  useEffect(() => {
    console.log(shortlistFormData);
  }, [shortlistFormData]);

  return (
    <div classname="mainImageDiv">
    <img className="Image1_agencyList" src={UpImage} alt="upImage" />
    <img className="Image2_agencyList" src={DownImage} alt="downImage" />
    <>
    <div className="SidebarAgencyList">
      <Sidebar notificationVisible={(status) => notificationVisible(status)} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div style={{ zIndex: visible && '-1' }} className="main_parent_agencyList">
            <Navbar />
             <div className="innerProjectDetail_parent">
              <div className="innerprojectDetailsInfo_agencyList">
                <p>
                  {`Project Title:- `}
                  <span>{project.projectName}</span>
                </p>
                <p style={{ fontSize: "1rem" }}>
                  {`Budget:-`}
                  <span>{project.projectProposalCost}</span>
                </p>
              </div>
              {/* <div className="mainAgencyList_agencyList"> */}
                {agencyList?.length > 0 ? (
                  <div className="innerAgencyList_agencyList">
                    <div className="AgencyCardsArea_agencyList">
                      {agencyList?.length > 0 &&
                        agencyList?.map((agency, index) => {
                          return (
                            <div className="agencyPreciseCard_agencyList">
                              <div className="agencyCardHeaderInfo agencyListDiv">
                                <div className="agencyImageProfile_agencyList">
                                  <div className=" agencyImageArea agencyImageArea_Img  ">
                                    <img
                                      src={agency.agencyLogo}
                                      alt="agency Logo"
                                    />
                                  </div>
                                  <div className="agencyProfileInfo agencyProfileInfodiv">
                                    <h6>{agency.agencyName}</h6>
                                    <div>
                                      <p>Media & Social</p>
                                      <p>Proficient</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="profileButton">
                                  {agency.productId !== undefined ? (
                                    <p
                                      onClick={() =>
                                        props.history.push({
                                          pathname: `/agency-profile:${agency._id}`,
                                          condition: `Client`,
                                        })
                                      }
                                    >
                                      View Profile Details
                                      <i
                                        class="fa fa-angle-double-right"
                                        aria-hidden="true"
                                      ></i>
                                    </p>
                                  ) : null}
                                </div>
                              </div>

                              <div className="middleAgencyArea agencylistCont">
                                <div className="agencyAddressTeam addressTeam_AgencyList">
                                  <h6 style={{fontSize:"14px"}}>Miscellaneous Info</h6>
                                  <div className="agencyAddressArea">
                                    <div className="locationIcon">
                                      <i
                                        class="fa fa-globe"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                    <div className="locationText">
                                      <p>{`${agency?.agencyAddress?.address} ${agency?.agencyAddress?.location}`}</p>
                                    </div>
                                  </div>
                                  <div className="agencyAddressArea">
                                    <div className="teamIcon">
                                      <i
                                        class="fa fa-users"
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                    <div className="teamNumberPart">
                                      <p style={{ fontSize: "14px" }}>
                                        <span style={{ fontFamily: "Segoe UI", color: "#707070", fontSize: "14px" }}>{agency.agencyTeamSize}</span>
                                        members
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="agencyDescInfo agencydiv">
                                  <h6>Description</h6>
                                  <p>{agency.agencyDescription}</p>
                                </div>
                              </div>

                              <div className="quotationShortlistButton2 agencyListButton">
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
                                ) : agency.isAgencyShortListed ||
                                  agency.isAgencyAskedForQuotation ? (
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
                                    <div
                                      onClick={() =>
                                        openShortlistModal(agency._id, index)
                                      }
                                    >
                                      <p>Shortlist</p>
                                    </div>
                                    <div
                                      onClick={() =>
                                        onOpenQuotationModel(agency._id, index)
                                      }
                                    >
                                      <p>Get Quotation</p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  <div className="noDataFound">
                    <img src={NO_DATA_FOUND} alt="no data found" />
                    <h6 style={{ marginTop: "20px", fontStyle: "italic" }}>
                      No Agency Found!!!..
                    </h6>
                  </div>
                )}
              {/* </div> */}
            </div>
          </div>
        </>
      )}

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
        <div className="shortlistModal_agencyList">
          <h2>ShortList</h2>
          <div className="shortlistForm comment">
            <span>Comment Box</span>
            <textarea
            style={{fontSize:"14px"}}
              onChange={(event) => handleChange(event)}
              name="comment"
              id=""
              cols="30"
              rows="10"
              placeholder="Type from here..."
            ></textarea>
            <button className="margin-top" onClick={shortlistHandler}>
              Submit
            </button>
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
                <div className="tableContentQuotation" >
                  <input
                  style={{marginTop:"0", height:"35px"}}
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
                  <p style={{position:"relative",top:"-4rem"}} name="comment">Comment Box</p>
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

              <div className="quotationSubmitButton_agencyList quotation">
                <div></div>
                <button onClick={quotationSubmitHandler}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      </>
    </div>
  );
}

export default AgencyList;
