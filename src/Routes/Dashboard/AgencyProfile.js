/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
// import Navbar from "./Navbar";
import "./AgencyProfile.css";
import growth from "../../assets/images/AgencyProfile/growth.png";
import document from "../../assets/images/AgencyProfile/pdf.png";
import received from "../../assets/images/Quotation/received.png";
import responded from "../../assets/images/Quotation/responded.png";
import matched from "../../assets/images/Quotation/matched.png";
import Information from "./AgencyProfile/Information";
import SkillsSet from "./AgencyProfile/SkillsSet";
import Rules from "./AgencyProfile/Rules";

import { FilePicker } from "react-file-picker";
import DeveloperList from "./AgencyProfile/DeveloperList";
import Portfolio from "./AgencyProfile/Portfolio";
import FeatureLink from "./AgencyProfile/FeatureLink";

import { useParams } from "react-router";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import instance from "../../Constants/axiosConstants";
import * as helper from "../../shared/helper";
import ClientNavbar from "../Client/ClientNavbar";

import Spinner from "../../Components/Spinner/Spinner";
import Moment from "react-moment";
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';

function AgencyProfile(props) {
  const { id } = useParams();
  const Role = localStorage.getItem('role');
  const inputEl = useRef(null);

  const [open, setOpen] = useState(false);
  const [navigated, setNavigation] = useState(false);
  const [loading, setLoading] = useState(true);

  const [hoverModal, setHoverModal] = useState(false)
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [agencyProfileData, setAgencyProfileData] = useState({
    ownerName: "",
    agencyName: "",
    agencyEmail: "",
    agencyPhone: "",
    agencyDescription: "",
    agencyLogo: "",
    incorporationDate: "",
    agencyTeamSize: "",
    isAgencyRegistered: "",
    productId: "",
    isAgencyVerified: "",
    verificationMessage: "",
    agencyAverageRating: "",
    stepsCompleted: "",
    agencyMonthlyBudget: "",
    agencyServices: [],
    agencyTechnologies: [],
    _id: "",
    agencyDomains: [],
    agencyDocuments: [],
    socialPlatformDetails: [],
    projectDetails: [],
    agencyAddress: {
      address: "",
      location: "",
      _id: "",
    },
    createdAt: "",
    updatedAt: "",
  });

  const getAgencyProfile = (agencyId, profileviewStatus) => {
    let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
    instance.get(`/api/${Role}/agencies/get/${agencyId}${addParam}`)
      .then(function (response) {
        setAgencyProfileData({ ...response });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    id !== null && id !== undefined
      ? getAgencyProfile(helper.cleanParam(id), true)
      : getAgencyProfile(localStorage.getItem("userId"), false);
  }, []);

  useEffect(() => {
    if (!navigated && inputEl !== null && props.location.origin === "addingDeveloper") {
      inputEl?.current?.click();
      setNavigation(true);
    }
    else if (navigated) {
      inputEl?.current?.click();
    }
  });

  return (
    <>
      {/* {id ? <ClientNavbar /> : <Navbar headingInfo="Agency Profile" />} */}
      {loading ? (
        <Spinner />
      ) : agencyProfileData._id !== "" ? (
        <div>
          <div className="mainProfileHeaderImage">
            <div className="innerProfileHeaderImage">
              {Role === "Agency" ? (
                agencyProfileData.productId === undefined ? (
                  <>
                    <span>You haven't added any product.</span>
                    <button
                      disabled={agencyProfileData.isAgencyVerified === false && true}
                      style={{
                        filter: `${!agencyProfileData.isAgencyVerified ? `grayscale(100%)` : `none`
                          }`,
                      }}
                      onClick={() =>
                        props.history.push({
                          pathname: `/product-form`,
                          condition: "Agency",
                        })
                      }
                    >
                      Add Your Product{" "}
                      <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      props.history.push({
                        pathname: `/product-details:${agencyProfileData.productId}`,
                        condition: id !== '' ? 'Agency' : 'Client'
                      })
                    }
                  >
                    View Your Product{" "}
                    <i class="fa fa-long-arrow-right" aqqria-hidden="true"></i>
                  </button>
                )
              ) : (
                <div>
                  {/* <p onClick={onOpenModal}>
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                    Have a Question..?
                  </p> */}
                  <i
                    style={{ fontSize: 22, color: "#fff" }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                    onMouseOver={() => setHoverModal(true)}
                  // onMouseLeave={()=>onCloseModal()}
                  ></i>
                </div>
              )}
            </div>
          </div>

          <Modal
            open={open}
            classNames={{
              overlay: "customOverlay",
              modal: "customModal",
            }}
            onClose={onCloseModal}
            center
          >
            <div className="mainAskQuestion">
              <div className="innerAskQuestion">
                <div className="questionAsking">
                  <h1>Have Any Queries..??</h1>
                  <div className="questionFields">
                    <input
                      placeholder="Your Question here"
                      type="text"
                      name=""
                      id=""
                    />
                    <button>Ask Question</button>
                  </div>
                </div>

                <div className="recetlyAskedQuestion">
                  <h2>Recently Asked Questions</h2>
                  <div>
                    <h3>Are your developers willing to work remotely?</h3>
                    <p>Yes.</p>
                  </div>
                  <div>
                    <h3>Are your developers willing to work remotely?</h3>
                    <p>Yes.</p>
                  </div>
                  <div>
                    <h3>Are your developers willing to work remotely?</h3>
                    <p>Yes.</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            open={hoverModal}
            classNames={{
              overlay: "customOverlay",
              modal: "customModal",
            }}
            onClose={() => setHoverModal(false)}
            center
          >
            <div className="mainAskQuestion">
              <div className="innerAskQuestion">
                <div className="questionAsking">
                  <h1>For any Help:</h1>

                  <h3>Support Email: connect@onesourcing.in</h3>
                  <h3>Support Number: +91 95755 17047</h3>
                </div>

              </div>
            </div>
          </Modal>

          <div className="mainAgencyProfileInfo">
            <div className="innerAgencyProfileInfo">
              <div className="mainAgencyProfileLogo">
                <div className="innerAgencyProfileLogo">
                  <img src={agencyProfileData.agencyLogo} alt="" />
                </div>
              </div>
              <div className="mainAgencyProfileContent">
                {(id === null || id === undefined) && (
                  <div className="agencyProfileConstantPoints">
                    <div className="pointContent">
                      <p>Incorporation Date</p>
                      <h4>
                        {
                          <Moment format="D MMM YYYY" withTitle>
                            {agencyProfileData?.incorporationDate}
                          </Moment>
                        }
                      </h4>
                    </div>
                    <div className="pointContent">
                      <p>Email ID</p>
                      <h4>{agencyProfileData.agencyEmail}</h4>
                    </div>
                    <div className="pointContent">
                      <p>Agency Id</p>
                      <h4>{agencyProfileData._id}</h4>
                    </div>
                    {(id === null || id === undefined) && (
                      <div className="pointContent" style={{
                        display: 'flex', filter: `${!agencyProfileData?.isAgencyVerified
                          ? `grayscale(100%)`
                          : `none`
                          }`,
                      }}>
                        <i style={{ marginRight: 10 }} class="fa fa-check-circle" aria-hidden="true"></i>
                        <p>{`${!agencyProfileData?.isAgencyVerified
                          ? agencyProfileData?.verificationMessage
                          : `Verified`
                          }`}</p>
                      </div>
                    )}
                    {/* <div className="pointContent">
                      <p>Total Profile Views</p>
                      <h4>{agencyProfileData.agencyProfileViewCount}</h4>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mainAgencyProfileInfo" style={{ marginBottom: '5%' }}>
            <div className="innerAgencyProfileInfo">
              <div className="agencyName">
                <div className="agencyNameURL">
                  <div className="agencyDEtails">
                    <h2>{agencyProfileData?.agencyName}</h2>
                    <p>{`${agencyProfileData?.socialPlatformDetails[0]?.platformLink}`}</p>
                  </div>
                </div>
                <div className="agencyAddress">
                  <i class="fa fa-thumb-tack" aria-hidden="true"></i>
                  <span>
                    {`${agencyProfileData?.agencyAddress?.address}, ${agencyProfileData?.agencyAddress?.location}`}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mainAgencyProfileDesc">
            <div className="innerAgencyProfileDesc">
              <div className="leftAgencyProfileDesc">
                <h2>About us</h2>
                <div style={{ width: '100%', paddingRight: 20 }}>
                  <p>{agencyProfileData.agencyDescription}</p>
                  <div className="agencyProfileIndustry">
                    {agencyProfileData &&
                      agencyProfileData?.agencyDomains?.map((domain) => {
                        return <p>{`${domain?.domainId?.domainName || ""}`}</p>;
                      })}
                  </div>
                </div>
              </div>
              {(id === null || id === undefined) && (
                <div className="rightAgencyProfileDesc">
                  <div className="monthyView">
                    {/* <div className="monthBorder"></div> */}
                    {/* <img src={growth} alt="" /> */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img style={{ width: 25, height: 25, marginRight: 5, objectFit: 'contain' }} src={growth} alt="" />
                      <h3>Total Profile View</h3>
                    </div>
                    <p>{agencyProfileData.agencyProfileViewCount}</p>
                  </div>
                  <div className="monthyView">
                    {/* <div className="monthBorder"></div> */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img style={{ width: 25, height: 25, marginRight: 5, objectFit: 'contain' }} src={document} alt="" />
                      <h3>Agency Document</h3>
                    </div>

                    {/* <button> */}
                    {/* <img
                      style={{ position: "relative" }}
                      src={document}
                      alt=""
                    /> */}

                    <FilePicker
                      extensions={["pdf"]}
                      onChange={(FileObject) => { }}
                      onError={(errMsg) => { }}
                    >
                      <button className="uploadButton">
                        Upload
                      </button>
                    </FilePicker>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mainQuotation">
            <div className="innerQuotation marginLeft">
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    class="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    <img src={received} alt="information" /> Information
                  </button>
                  <button
                    class="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    <img src={responded} alt="skills" /> Skills Set
                  </button>
                  <button
                    class="nav-link"
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    <img src={matched} alt="rules" /> Agency Rules
                  </button>
                  <button
                    class="nav-link"
                    id="nav-developer-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-developer"
                    type="button"
                    role="tab"
                    aria-controls="nav-developer"
                    aria-selected="false"
                    ref={inputEl}
                  >
                    <img src={matched} alt="dev" /> Developers
                  </button>
                  <button
                    class="nav-link"
                    id="nav-portfolio-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-portfolio"
                    type="button"
                    role="tab"
                    aria-controls="nav-portfolio"
                    aria-selected="false"
                  >
                    <img src={matched} alt="portfolio" /> Portfolio
                  </button>
                  {/* <button class="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">
                                            <img src={matched} alt="Reviews" /> Reviews
                            </button> */}
                  {/* <button
                    class="nav-link"
                    id="nav-question-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-question"
                    type="button"
                    role="tab"
                    aria-controls="nav-question"
                    aria-selected="false"
                  >
                    <img src={matched} alt="Feature Link" /> Feature Link
                  </button> */}
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <Information data={agencyProfileData} id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <SkillsSet data={agencyProfileData} id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-contact"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <Rules data={agencyProfileData} id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-developer"
                  role="tabpanel"
                  aria-labelledby="nav-developer-tab"
                >
                  <DeveloperList id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-portfolio"
                  role="tabpanel"
                  aria-labelledby="nav-portfolio-tab"
                >
                  <Portfolio id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-review"
                  role="tabpanel"
                  aria-labelledby="nav-review-tab"
                >
                  <DeveloperList id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-question"
                  role="tabpanel"
                  aria-labelledby="nav-question-tab"
                >
                  <FeatureLink id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <h1> No agency found with this ID. </h1>
        </div>
      )}
    </>
  );
}

export default AgencyProfile;
