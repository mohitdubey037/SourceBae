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
// import BottomSideBar from "../../Components/ClientNewestDashboard/BottomSideBar/BottomSideBar";
import BottomSideBar from '../../Components/ClientNewestDashboard/BottomSideBar/BottomSideBar';

import { Modal } from 'react-responsive-modal';

function AgencyNewestDashboard(props) {

  if (props.history.action === 'POP') {
    props.history.push('/agencyNewestDashboard');
  }

  // useEffect(() => {
  //   console.log(props.history.action === 'POP');
  // }, [props])

  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  const onOpenModal = () => {
    setOpen(true);
  }

  const Role = localStorage.getItem("role");
  const agencyId = localStorage.getItem("userId");

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
      .catch((err) => { });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  const getStepsCompleted = () => {
    instance
      .get(`api/${Role}/agencies/steps-completed`)
      .then(function (response) {
        if (response.stepsCompleted === response.totalSteps) {
          setSteps(-1);
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

  useEffect(() => {
    if (!verified && steps !== -1) {
      onOpenModal();
    }
  }, [verified, steps])

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

  const quotation = (link) => {
    if (!verified || steps !== -1) {
      props.history.push(`${props.history.location.pathname}`);
    } else {
      if (link === "quotation") props.history.push(`/${link}`);

      if (link === "add-developer") props.history.push(`/${link}`);

      if (link === "portfolio") {
        props.history.push({
          pathname: "portfolio",
          condition: "Agency",
        });
      }
    }
  };

  return (
    <>
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
                <div className="mainUpdateVerify">
                  {!verified && steps !== -1 ? (
                    <div className="innerMainVerify">
                      <p>
                        Please
                        <span onClick={() => props.history.replace(formRoute)}>
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
              <div className={`user-operations ${(!verified || steps !== -1) && "conditional_marginTop"}`}>
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

                <UserOperations
                  disabled={!verified || steps !== -1}
                  nextpage={() => quotation("portfolio")}
                  text="Add Your Portfolio"
                  img={ThirdIcon}
                />

              </div>
              <div className={`${(!verified || steps !== -1) && "conditional_opacity"}`}>
                {allProjects?.projects?.length > 0 && (
                  <div className="graphic">
                    <div className="graphic-illustration-heading">
                      <h6>Project details</h6>
                    </div>
                  </div>
                )}
                <div className="user-project_parent">
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
              </div>
            </div>
            <RightSide />
          </div>
        </div>
        <BottomSideBar />
      </div>

      <Modal open={open} onClose={onCloseModal} classNames={{
        overlay: 'customOverlayAgencyProduct',
        modal: 'customModalClientOneHireDeveloper',
      }} center>

        <div className="want_to_accept">
          <div className="connect_or_not">
            <h6>Please Update Your Profile</h6>
          </div>

          <div className='interested_or_not verify_or_not'>
            <div className="update_now" onClick={() => props.history.replace('/agency-form-one')}>
              <p>Update Now</p>
            </div>
            <div className="update_later" onClick={onCloseModal}>
              <p>Update Later</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AgencyNewestDashboard;
