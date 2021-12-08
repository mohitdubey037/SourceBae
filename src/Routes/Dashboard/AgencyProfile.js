/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./AgencyProfile.css";
import growth from '../../assets/images/Newestdashboard/Agency-Profile/total_profile_view.svg';
import document from '../../assets/images/Newestdashboard/Agency-Profile/agency_document.svg';
import Back2 from '../../assets/images/Back/Back2.svg';

import verified from '../../assets/images/Newestdashboard/Agency-Profile/verified.svg';
import iicon from '../../assets/images/Newestdashboard/Agency-Profile/informationNew.svg';
import skillImage from '../../assets/images/Newestdashboard/Agency-Profile/skill-advanced.svg';
import AddYourProduct from '../../assets/images/Newestdashboard/Agency-Profile/view_product.svg'
import Location from '../../assets/images/Newestdashboard/Agency-Profile/location.svg';

import DownImage from '../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import Information from "./AgencyProfile/Information";
import SkillsSet from "./AgencyProfile/SkillsSet";
import Rules from "./AgencyProfile/Rules";
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeveloperList from "./AgencyProfile/DeveloperList";
// import AgencyPortfolio from "./AgencyProfile/AgencyPortfolio";
import ProfilePortfolio from './AgencyProfile/ProfilePortfolio';
import FeatureLink from "./AgencyProfile/FeatureLink";

import { useParams } from "react-router";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import instance from "../../Constants/axiosConstants";
import * as helper from "../../shared/helper";

import Spinner from "../../Components/Spinner/Spinner";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  menuFont: {
    fontFamily: "Segoe UI",
  },
  inputField: {
    fontFamily: "Segoe UI",
    border: '1px solid blue',
    borderRadius: '20px'
  },
  radioBox: {
    borderWidth: 1,
    borderColor: "#000",
  },
}));

function AgencyProfile(props) {
  const classes = useStyles();
  const { id } = useParams();
  const Role = localStorage.getItem('role');
  const inputEl = useRef(null);
  const inputPort = useRef(null);

  const [open, setOpen] = useState(false);
  const [navigated, setNavigation] = useState(false);
  const [portNavigated, setPortNavigated] = useState(false);
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

  const handleBackOnProfile = () => {
    if (Role === "Agency")
      props.history.replace('agencyNewestDashboard');
    else
      props.history.goBack();
  }

  const [link, setLink] = useState('');

  const handleChange = (event) => {
    setLink(event.target.value);
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

  useEffect(() => {
    console.log(props.location.origin == 'portfolio');
    if (!portNavigated && inputPort !== null && props.location.origin == "portfolio") {
      inputPort?.current?.click();
      setPortNavigated(true);
    }
    else if (portNavigated) {
      inputPort?.current?.click();
    }
  })


  return (
    <>
      {loading ? (
        <Spinner />
      ) : agencyProfileData._id !== "" ? (
        <div className="agnecyProfilemainDiv">
          <img className="Image2_AgencyProfile" src={DownImage} alt="downImage" />
          <div className="mainProfileHeaderImage">
            <div className={`innerProfileHeaderImage ${Role === 'Client' && 'conditionalGradient'}`}>
              <div className='backButtonAgencyProfile'>
                <div className='backButton-child' onClick={handleBackOnProfile}>
                  <img src={Back2} alt="back" />
                  <h6>Back</h6>
                </div>
              </div>
              {Role === "Agency" ? (
                agencyProfileData.productId === undefined ? (
                  <>
                    <span>You haven't added any product.</span>
                    <button
                      disabled={agencyProfileData.isAgencyVerified === false && true}
                      style={{ filter: `${!agencyProfileData.isAgencyVerified ? `grayscale(100%)` : `none`}` }}
                      onClick={() => props.history.push({ pathname: `/product-form`, condition: "Agency" })}>
                      Add Your Product
                      <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => props.history.push({
                      pathname: `/product-details:${agencyProfileData.productId}`,
                      condition: id !== '' ? 'Agency' : 'Client'
                    })
                    }>
                    <p>View Your Product</p>
                    <img src={AddYourProduct} alt="add your product" />
                  </button>
                )
              ) : (
                <>
                  <div className="question_icon">
                    <i
                      style={{ fontSize: 22, color: "#fff" }}
                      className="fa fa-info-circle"
                      aria-hidden="true"
                      onMouseOver={() => setHoverModal(true)}
                    ></i>
                  </div>

                  {agencyProfileData.productId !== undefined ? (
                    <button
                      style={{ backgroundImage: 'linear-gradient(284deg, rgb(3, 118, 186) 0%, rgb(1, 48, 77) 100%)' }}
                      onClick={() => props.history.push({
                        pathname: `/product-details:${agencyProfileData.productId}`,
                        condition: id !== '' ? 'Agency' : 'Client'
                      })
                      }
                    >
                      View Your Product
                      <i class="fa fa-long-arrow-right" aqqria-hidden="true"></i>
                    </button>) : null}
                </>
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
              <div className="questionAsking">
                <h3>For any Help:</h3>
                <h5>Support Email: connect@SourceBae.in</h5>
                <h5>Support Number: +91 95755 17047</h5>
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
                        <img src={verified} alt="verified" />
                        <p>{`${!agencyProfileData?.isAgencyVerified
                          ? agencyProfileData?.verificationMessage
                          : `Verified`
                          }`}</p>
                      </div>
                    )}
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
                  <img src={Location} alt="location" />
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
                <div className={`aboutUs_parent ${Role === 'Client' && 'conditionalGradient'}`}>
                  <h2>About us</h2>
                </div>
                <div style={{ width: '70%' }}>
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
                    <div className="view_image_parent">
                      <img className="view_image" src={growth} alt="" />
                      <h3>Total Profile View</h3>
                    </div>
                    <p className="profile_count">{agencyProfileData.agencyProfileViewCount}</p>
                  </div>
                  <div className="monthyView agencyProfile">
                    <div className="view_image_parent">
                      <img className="view_image" src={document} alt="" />
                      <h3>Agency Document</h3>
                    </div>

                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={link}
                        onChange={(event) => handleChange(event)}
                        displayEmpty
                        className={clsx(classes.root, classes.inputField)}
                        style={{ boxShadow: "1px 2px 3px rgb(0 0 0 / 18%)" }}
                      >
                        <MenuItem value="">
                          <span style={{ fontFamily: "Segoe UI", color: "#707070", fontSize: '14px' }}>
                            Select from here
                          </span>
                        </MenuItem>
                        <MenuItem value={agencyProfileData?.agencyDocuments[0]?.documentLink}>Registration Certificate</MenuItem>
                        <MenuItem value={agencyProfileData?.agencyDocuments[1]?.documentLink}>Brochure</MenuItem>
                        <MenuItem value={agencyProfileData?.agencyDocuments[2]?.documentLink}>Pancard</MenuItem>
                      </Select>
                    </FormControl>
                    <a style={{ textDecoration: 'none' }} className="uploadButton" href={link} target="new">
                      View Document
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mainQuotation_agencyProfile">
            <div className="innerQuotation_agencyProfile">
              <div class="nav nav-tabs nav-tabs_agencyProfile" id="nav-tab" role="tablist">
                <div id="nav-home-tab"
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true">
                  <img src={iicon} alt="information" />
                  <button class="nav-button nav-link_agencyProfile">
                    Information
                  </button>
                </div>

                <div id="nav-profile-tab"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false">
                  <img src={skillImage} alt="skills" />
                  <button class="nav-button nav-link_agencyProfile">
                    Skills Set
                  </button>
                </div>

                <div id="nav-contact-tab"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false">
                  <img src={iicon} alt="rules" />
                  <button class="nav-button nav-link_agencyProfile">
                    Agency Rules
                  </button>
                </div>

                <div id="nav-portfolio-tab"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-portfolio"
                  type="button"
                  role="tab"
                  aria-controls="nav-portfolio"
                  aria-selected="false"
                  ref={inputPort}>
                  <img src={iicon} alt="Portfolio" />
                  <button class="nav-button nav-link_agencyProfile">
                    Agency Portfolio
                  </button>
                </div>

                {Role === "Agency" &&
                  <div id="nav-developer-tab"
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-developer"
                    type="button"
                    role="tab"
                    aria-controls="nav-developer"
                    aria-selected="false"
                    ref={inputEl}>
                    <img src={iicon} alt="dev" />
                    <button class="nav-button nav-link_agencyProfile">
                      Developers
                    </button>
                  </div>
                }


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
                  <DeveloperList data={agencyProfileData} id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-portfolio"
                  role="tabpanel"
                  aria-labelledby="nav-portfolio-tab"
                >
                  <ProfilePortfolio id={id} />
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-review"
                  role="tabpanel"
                  aria-labelledby="nav-review-tab"
                >
                  <DeveloperList data={agencyProfileData} id={id} />
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
      )
      }
    </>
  );
}

export default AgencyProfile;
