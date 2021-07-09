/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import quotation from "../../assets/images/Logo/quotation.png";
import addDeveloper from "../../assets/images/Logo/addDeveloper.png";
import teamCreation from "../../assets/images/Logo/teamCreation.png";

//material-ui
import Navbar from "./Navbar";

import Tooltip from "react-power-tooltip";
import { Link, NavLink } from "react-router-dom";
import instance from "../../Constants/axiosConstants";
import * as helper from "../../shared/helper";
import Moment from "react-moment";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import NO_Data_ICON from "./no_data_icon.jpg";

const Dashboard = (props) => {
  const Role = "agency";
  const agencyId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(false);

  const [steps, setSteps] = useState(0);
  const [formRoute, setFormRoute] = useState("/");
  const [isPopover, setIsPopover] = useState(false);
  const [popindex, setPopIndex] = useState("");
  const [agencyProfileData, setAgencyProfileData] = useState([])

  const [verified, setVerified] = useState(true);
  const [isUserEmailVerified, setUserEmailVerified] = useState(true);
  const [isUserPhoneVerified, setUserPhoneVerified] = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [openmodal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const getAllProjects = () => {
    instance.get(`api/${Role}/projects/all?agencyId=${agencyId}&projectCurrentStatus=Quotation Accepted`)
      .then(function (response) {
        setAllProjects(response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAgencyProfileData = () => {
    setLoading(true)
    instance.get(`/api/${Role}/agencies/get/${agencyId}`)
      .then(function (response) {
        setAgencyProfileData(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllProjects();
    getAgencyProfileData();
  }, []);


  const cardsArray = [
    {
      title: "Quotation",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: quotation,
      borderColor: `#28B3F3`,
      route: "/quotation",
    },
    {
      title: "Add Developers",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: addDeveloper,
      borderColor: "#F57359",
      route: "/add-developer",
    },
    agencyProfileData.productId ?
      {
        title: "View Your Product",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: teamCreation,
        borderColor: "#AC92F5",
        route: {
          pathname: `/product-details:${agencyProfileData.productId}`,
          condition: 'Agency'
        }
      }
      :
      {
        title: "Add Your Product",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: teamCreation,
        borderColor: "#AC92F5",
        route: "modal",
      }
  ];

  const getStepsCompleted = () => {
    instance
      .get(`api/${Role}/agencies/steps-completed`)
      .then(function (response) {
        if (response.stepsCompleted === response.totalSteps) setSteps(-1);
        else {
          setSteps(response.stepsCompleted);
          let route = `/agency-form-${helper.getNumberSpell(
            response.stepsCompleted
          )}`;
          setFormRoute(route);
        }
      });
  };

  const getAgencyProfile = (agencyId) => {
    instance
      .get(`/api/${Role}/agencies/get/${agencyId}`)
      .then(function (response) {
        setVerified(response.isAgencyVerified);
        setUserEmailVerified(response.isUserEmailVerified);
        setUserPhoneVerified(response.isUserPhoneVerified);
      });
  };

  const handleLink = (route) => {
    if (verified && steps === -1) {
      if (route === "modal") onOpenModal();
      else props.history.push(route);
    }
  };
  useEffect(() => {
    getStepsCompleted();
    getAgencyProfile(localStorage.getItem("userId"));
  }, []);


  const verifyEmailPhone = () => {
    instance
      .post(`/api/${Role}/auths/send-verification-link`, {
        userId: agencyId,
        verify: "email",
      })
      .then(function (response) { });

    instance
      .post(`/api/${Role}/auths/send-verification-link`, {
        userId: agencyId,
        verify: "phone",
      })
      .then(function (response) { });
  };

  return (
    <>
      {/* Navbar  */}
      <Navbar headingInfo="Dashboard" />

      {!(isUserEmailVerified && isUserPhoneVerified) && steps === -1 && (
        <div className="mainUpdateVerify">
          <div className="innerMainVerify">
            <p>
              Please
              <span onClick={() => verifyEmailPhone()}>
                Verify Phone & Email
              </span>{" "}
              to use our services.
            </p>
          </div>
        </div>
      )}

      {(!verified || steps !== -1) && (
        <div className="mainUpdateVerify">
          <div className="innerMainVerify">
            {!verified && steps !== -1 ? (
              <p>
                Please
                <span onClick={() => props.history.push(formRoute)}>
                  Update
                </span>{" "}
                your profile to use our services.
              </p>
            ) : (
              <p>Please wait for your profile to be verified by us.</p>
            )}
          </div>
        </div>
      )}

      <div className="mainClientsOptions">
        <div className="innerClientsOptions">
          {cardsArray.map((value, index) => {
            return (
              <div
                className="mainQuotationCard"
                key={index}
                onClick={() => handleLink(value.route)}
                style={{
                  filter: `${!verified || steps !== -1 ? `grayscale(100%)` : `none`
                    }`,
                }}
              >
                <div
                  className="leftLine"
                  style={{
                    backgroundColor: value?.borderColor,
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    zIndex: "999",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onMouseOver={() => {
                    setIsPopover(true);
                    setPopIndex(index);
                  }}
                  onMouseLeave={() => setIsPopover(false)}
                >
                  <i
                    style={{ fontSize: 22, color: value?.borderColor }}
                    className="fa fa-info-circle"
                    aria-hidden="true"
                  ></i>
                  {/* ADD TOOLTIP HERE */}
                  {isPopover && popindex === index && (
                    <Tooltip
                      show={true}
                      position="bottom center"
                      textBoxWidth="120px"
                      animation="bounce"
                    >
                      <span>Some text</span>
                    </Tooltip>
                  )}
                </div>
                <div className="innerQuotationCard">
                  <div className="quotationImage">
                    <img src={value?.image} alt="" />
                  </div>
                  <div className="quotationInfo">
                    <h2>
                      <Link style={{ textDecoration: "none" }}>
                        {value?.title}
                      </Link>
                    </h2>
                    <p>{value?.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mainProjects">
        <div className="innerProjects">
          <div className="allProjects">
            {allProjects?.projects?.length > 0 ? (
              allProjects?.projects?.map((value, index) => {
                return (
                  <div
                    className="mainProjectCard"
                    onClick={() =>
                      props.history.push(`/agency-project-details:${value._id}`)
                    }
                  >
                    <div className="innerProjectCard">
                      <div className="projectInformation">
                        <div className="projectDetails">
                          <div className="projectName">
                            <p className="projectN">{value.projectName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="projectDescription">
                        <p title={value?.projectDescription}>
                          {(value?.projectDescription).slice(0, 100)}...
                        </p>
                      </div>
                      <div className="projectTable">
                        <div style={{ borderBottom: "1px solid #d3d3d3" }}>
                          <h6>Project Status</h6>
                          <h6
                            style={{
                              color:
                                value?.projectCurrentStatus === "Live"
                                  ? "#5cb85c"
                                  : value?.projectCurrentStatus === "Completed"
                                    ? "#f0ad4e"
                                    : "#d9534f",
                              fontWeight: "bold",
                            }}
                          >
                            {value?.projectCurrentStatus}
                          </h6>
                        </div>
                        <div style={{ borderBottom: "1px solid #d3d3d3" }}>
                          <h6>Budget</h6>
                          <h6>{value?.projectProposalCost}</h6>
                        </div>
                        <div style={{ borderBottom: "1px solid #d3d3d3" }}>
                          <h6>Creation Date</h6>
                          <Moment format="D MMM YYYY" withTitle>
                            <h6>{value?.createdAt}</h6>
                          </Moment>
                        </div>
                        <div style={{ borderBottom: "1px solid #d3d3d3" }}>
                          <h6>Duration</h6>
                          <h6>45</h6>
                        </div>
                        <div>
                          <h6>Project type</h6>
                          <h6>{value?.projectType}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center" }}>
                <img height="300px" src={NO_Data_ICON} alt="no_data_img" />
                <h6>No Running Project</h6>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={openmodal}
        onClose={onCloseModal}
        classNames={{
          overlay: "NavbarModalLayer",
          modal: "NavbarModalStyle",
        }}
        center
      >
        <h2 className="addyourproductext">Add your Product</h2>
        <div className="newFeatureDiv">
          <p>
            What's <span>NEW</span> in this..?
            <i class="fa fa-level-down" aria-hidden="true"></i>
          </p>

          <p className="productText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, necessitatibus! Provident, nemo. Aperiam fugiat quo
            earum dignissimos. Aliquid, nostrum dolorem!
          </p>

          <ul>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </ul>
        </div>
        <div className="modalButton">
          <NavLink
            className="modalNavLink"
            to={{
              pathname: "/product-form",
            }}
          >
            Interested
          </NavLink>
          <button
            style={{ marginTop: 0, marginBottom: 0 }}
            onClick={onCloseModal}
          >
            Not Interested
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
