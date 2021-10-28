import React, { useState, useEffect } from "react";
import RightSide from "../../Components/ClientNewestDashboard/RightSide/RightSide";
import UserOperations from "../../Components/ClientNewestDashboard/LeftSide/UserOperations";

import QuotationIcon from "../../assets/images/Newestdashboard/Agency_Navbar/q-icon.svg";
import addDeveloperIcon from "../../assets/images/Newestdashboard/Agency_Navbar/add-developer.svg";
import ThirdIcon from "../../assets/images/Newestdashboard/Agency_Navbar/view-product.svg";

import "./AgencyNewestDashboard.css";
import AgencyProjectCard from "../../Components/AgencyProjectCard/AgencyProjectCard";
import Sidebar from "../../Components/ClientNewestDashboard/Sidebar/Sidebar";

import instance from "../../Constants/axiosConstants";
import * as helper from "../../shared/helper";
import NotFound from "../../assets/images/Newestdashboard/Not_found/PageNotFound.svg";
import Navbar from "../../Components/ClientNewestDashboard/Navbar/Navbar";
import cookie from "react-cookies";

function AgencyNewestDashboard(props) {
  const Role = localStorage.getItem("role");
  const agencyId = localStorage.getItem("userId");

  const isAgencyVerified = cookie.load("isAgencyVerified");
  const isStepsCompleted = cookie.load("isStepsCompleted");

  const [agencyProfileData, setAgencyProfileData] = useState([]);
  const [tempStatus, setTempStatus] =
    useState(
      false
    ); /* this is for checking the component first time, if we remove it then the isAgencyVerified and isStepCompleted will take time to store in cookies and hence the check will fail, So don't remove it  */
  // DON'T REMOVE IT //
  const [allProjects, setAllProjects] = useState([]);
  const [steps, setSteps] = useState(0);
  const [verified, setVerified] = useState(true);
  const [isUserEmailVerified, setUserEmailVerified] = useState(true);
  const [isUserPhoneVerified, setUserPhoneVerified] = useState(true);
  const [formRoute, setFormRoute] = useState("/");
  const [visible, setVisible] = useState(false);

  const notificationVisible = (status) => {
    setVisible(status);
  };

  const getAllProjects = () => {
    instance
      .get(
        `api/${Role}/projects/all?agencyId=${agencyId}&projectCurrentStatus=Quotation Accepted`
      )
      .then(function (response) {
        setAllProjects(response);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  // useEffect(() => {

  // }, [agencyProfileData])

  const getStepsCompleted = () => {
    instance
      .get(`api/${Role}/agencies/steps-completed`)
      .then(function (response) {
        if (response.stepsCompleted === response.totalSteps) {
          setSteps(-1);
          localStorage.setItem("isVerified", true);
        } else {
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

  useEffect(() => {}, [tempStatus]);

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
      .then(function (response) {});

    instance
      .post(`/api/${Role}/auths/send-verification-link`, {
        userId: agencyId,
        verify: "phone",
      })
      .then(function (response) {});
  };

  const quotation = (link) => {
    if (!verified || steps !== -1) {
      props.history.push(`${props.history.location.pathname}`);
    } else {
      if (link === "quotation") props.history.push(`/${link}`);

      if (link === "add-developer") props.history.push(`/${link}`);

      if (link === "product-details") {
        props.history.push({
          pathname: `/${link}:${agencyProfileData.productId}`,
          condition: "Agency",
        });
      }
      if (link === "portfolio") {
        props.history.push({
          pathname: "portfolio",
          condition: "Agency",
        });
      }
    }
  };

  return (
    <div className="Navbar-clientDashboard">
      <Sidebar notificationVisible={(status) => notificationVisible(status)} />
      <div style={{ zIndex: visible && "-1" }} className="container-body">
        <Navbar />
        <div className="content-body">
          <div className="content-leftBody">
            {!(isUserEmailVerified && isUserPhoneVerified) && steps === -1 && (
              <div className="mainUpdateVerify">
                <div className="innerMainVerify">
                  <p>
                    Please
                    <span onClick={() => verifyEmailPhone()}>
                      Verify Phone & Email
                    </span>
                    to use our services.
                  </p>
                </div>
              </div>
            )}
            {(!verified || steps !== -1) && (
              //  the major reason of applying tempStatus is that at first event when the agency is verified this check is running becoz isAgencyVerified is storing in cookies a little bit later. so initially we are checking with tempStatus i.e it will be false initially and after the api call it will set to true and hence this check will be verified
              <div className="mainUpdateVerify">
                {!verified && steps !== -1 ? (
                  <div className="innerMainVerify">
                    <p>
                      Please
                      <span onClick={() => props.history.push(formRoute)}>
                        Update
                      </span>
                      your profile to use our services.
                    </p>
                  </div>
                ) : (
                  !verified && (
                    <div
                      className="innerMainVerify"
                      style={{ marginTop: "1rem" }}
                    >
                      <p>Please wait for your profile to be verified by us.</p>
                    </div>
                  )
                )}
              </div>
            )}
            <div
              className={`user-operations ${
                (!verified || steps !== -1) && "conditional_marginTop"
              }`}
            >
              <UserOperations
                disabled={!verified || steps !== -1}
                nextpage={() => quotation("quotation")}
                text="Quotation"
                img={QuotationIcon}
              />

              <UserOperations
                disabled={!verified || steps !== -1}
                nextpage={() => quotation("add-developer")}
                text="Add Developer"
                img={addDeveloperIcon}
              />

              {agencyProfileData.productId ? (
                <UserOperations
                  disabled={!verified || steps !== -1}
                  nextpage={() => quotation("product-details")}
                  text="View Product"
                  img={ThirdIcon}
                />
              ) : (
                <UserOperations
                  disabled={!verified || steps !== -1}
                  nextpage={() => quotation("portfolio")}
                  text="Add Your Portfolio"
                  img={ThirdIcon}
                />
              )}
            </div>
            <div
              className={`${
                (!verified || steps !== -1) && "conditional_opacity"
              }`}
            >
              {allProjects?.projects?.length > 0 && (
                <div className="graphic">
                  <div className="graphic-illustration-heading">
                    <h6>Project details</h6>
                  </div>
                </div>
              )}
              <div className="user-project_parent">
                {/* <div> */}
                {allProjects?.projects?.length > 0 ? (
                  allProjects?.projects?.map((value, index) => {
                    return <AgencyProjectCard key={index} {...value} />;
                  })
                ) : (
                  <div className={`not_found agencyNewestDashboard`}>
                    <img src={NotFound} alt="NotFound" />
                    <p className="no_project_found">No Project Found</p>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
          <RightSide />
        </div>
      </div>
    </div>
  );
}

export default AgencyNewestDashboard;
