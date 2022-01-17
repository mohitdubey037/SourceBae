import React, { useEffect, useState } from "react";
import "./SharedDevelopers.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import Spinner from "../../../Components/Spinner/Spinner";
import Navbar from "../../../Components/ClientNewestDashboard/Navbar/Navbar";
import Back from "../../../Components/Back/Back";
import UpImage1 from "../../../assets/images/Newestdashboard/Client-one-hire-developer/UpImage1.svg";
import DownImage2 from "../../../assets/images/Newestdashboard/Client-one-hire-developer/DownImage2.svg";
import NotFound from "../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg";

import { Modal } from "react-responsive-modal";

function RespondedDetails(props) {
  const logoLink = "https://api.onesourcing.in/media/images/1637044803259.svg";

  const [initial, setInitial] = useState(5);
  const Role = localStorage.getItem("role").toLowerCase();
  const agencyId = localStorage.getItem("userId");
  const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);
  const showDevelopers = false
  const [loading, setLoading] = useState(false);

  const [devId, setDevId] = useState(null);

  const [open, setOpen] = useState(false);

  const onCloseModal = () => setOpen(false);

  const onOpenModal = (devId) => {
    setOpen(true);
    setDevId(devId);
  };

  const getOneDeveloper = () => {
    setLoading(true);
    // instance.get(`/api/${Role}/hire-developers/get/${hireDeveloperId}?agencyId=${agencyId}`)
    instance
      .get(`/api/agency/hire-developers/all?agencyId=${agencyId}`)
      .then(function (response) {
        setSingleHiredDeveloper(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const agencyAction = (task) => {
    instance
      .patch(`/api/${Role}/hire-developers/update-matched-agency/${devId}`, {
        interested: task,
        agencyId,
      })
      .then((response) => {
        // setDisability(true)
        onCloseModal();
        getOneDeveloper();
      })
      .catch((err) => {});
  };

  const showMore = () => {
    setInitial(initial + 5);
  };

  useEffect(() => {
    getOneDeveloper();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="main_parent_sharedDeveloper">
            <Navbar logoLink={logoLink} />
            <img
              className="upImage1_clientOneHireDeveloper"
              src={UpImage1}
              alt="upImage1"
            />
            {/* <img className="upImage2_clientOneHireDeveloper" src={UpBigImage} alt="upImage1" /> */}
            <img
              className="downImage3_clientOneHireDeveloper"
              src={DownImage2}
              alt="upImage1"
            />
            {/* <img className="downImage4_clientOneHireDeveloper" src={DownBigImage} alt="upImage1" /> */}
            <div className="main-card_SharedDevelopers">
              <Back name="Matched Developer" />
              <div className="respond-card_parent">
                {singleHiredDeveloper?.length > 0 ? (
                  singleHiredDeveloper.map((devData) => {
                    return (
                      <div className=" width innerResponseCard_sharedDeveloper">
                        <div className="sharedDevDetails1">
                          <div className="childDiv1">
                            <div className="parentDivShared">
                              <p>Requirement Name</p>
                              <h2>{devData.requirementName}</h2>
                            </div>

                            <div className="parentDivShared">
                              <p>Agency Average Budget</p>
                              <h2>{devData.averageBudget} </h2>
                            </div>

                            <div className="parentDivShared">
                              <p>Contract Period</p>
                              <h2>{devData.contractPeriod}</h2>
                            </div>

                            <div className="parentDivShared">
                              <p>Developer's Experience Required</p>
                              <h2>{devData.developerExperienceRequired}</h2>
                            </div>
                            <div className="parentDivShared">
                              <p>Project Expected Starting Days</p>
                              <h2>{devData.expectedStartDate}</h2>
                            </div>

                            <div className="parentDivShared">
                              <p>Number Of Resources Required</p>
                              <h2>{devData.numberOfResourcesRequired}</h2>
                            </div>

                            <div className="parentDivShared">
                              <p>Preferred Billing Mode</p>
                              <h2>{devData.preferredBillingMode}</h2>
                            </div>
                          </div>
                          <div className="childDiv2">
                            <div className="technologies">
                              <div>Developer Roles Required</div>
                              <div className="devops">
                                {devData.developerRolesRequired.length > 0 && (
                                  <div>
                                    {devData.developerRolesRequired.map(
                                      (dd) => {
                                        return <p>{dd}</p>;
                                      }
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="technologies">
                              <div>Developer Technologies Required</div>
                              <div className="devops">
                                {devData.developerTechnologiesRequired.length >
                                  0 && (
                                  <div>
                                    {devData.developerTechnologiesRequired.map(
                                      (dt) => {
                                        return <p>{dt.technologyName}</p>;
                                      }
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sharedDevDetails2">
                          <div>
                            {devData.agenciesMatched[0].interested === 0 ? (
                              <>
                                <button
                                  className="acceptButtonShare"
                                  onClick={() => onOpenModal(devData._id)}
                                >
                                  Accept or Reject
                                </button>
                                {/* <button onClick={() => agencyAction(1, devData._id)} className="acceptButtonShare">
                                  Accept
                                </button>
                                <button onClick={() => agencyAction(2, devData._id)} className="rejectButtonShare">
                                  Reject
                                </button> */}
                              </>
                            ) : (
                              <button
                                disabled="true"
                                style={{
                                  backgroundColor:
                                    devData.agenciesMatched[0].interested === 1
                                      ? "green"
                                      : "red",
                                }}
                                className="acceptButtonShare"
                              >
                                {devData.agenciesMatched[0].interested === 1
                                  ? "Accepted"
                                  : "Rejected"}{" "}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="NotFound_SharedDeveloper">
                    <img src={NotFound} alt="not_found" />
                    <p>No Data Found</p>
                  </div>
                )}

                {showDevelopers === true &&
                  singleHiredDeveloper?.agencyMatched !== undefined && (
                    <div className="developers-div">
                      <div className="moreAgencyList new_design_sharedDeveloper">
                        {/* {singleHiredDeveloper?.agenciesMatched?.length > 0 && singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.length >0 && `${JSON.stringify(singleHiredDeveloper?.agenciesMatched[0]?.developersShared[0]?.developerId)}`} */}
                        {singleHiredDeveloper?.agenciesMatched?.length > 0 ? (
                          singleHiredDeveloper?.agenciesMatched[0]
                            ?.developersShared?.length > 0 ? (
                            singleHiredDeveloper?.agenciesMatched[0]?.developersShared
                              ?.slice(0, 5)
                              ?.map((developer) => {
                                return (
                                  <>
                                    <div className="names_of_developer">
                                      <div className="name_circle">
                                        <div>
                                          <p>
                                            {developer?.developerId?.firstName.charAt(
                                              0
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="moreAgencyInfo">
                                        <p
                                          style={{ textAlign: "center" }}
                                        >{`${developer?.developerId?.firstName} ${developer?.developerId?.lastName}`}</p>
                                        <p style={{ textAlign: "center" }}>
                                          {
                                            developer?.developerId
                                              ?.developerDesignation
                                          }
                                        </p>
                                      </div>
                                      {developer?.developerId
                                        ?.developerDocuments?.length > 0 ? (
                                        <div className="view-resume_div">
                                          <a
                                            className="view-resume_child"
                                            href={
                                              developer?.developerId
                                                ?.developerDocuments[0]
                                                .documentLink
                                            }
                                            target="new"
                                          >
                                            Check Resume
                                          </a>
                                        </div>
                                      ) : (
                                        "No resume"
                                      )}
                                    </div>
                                  </>
                                );
                              })
                          ) : (
                            <div>No Developers shared by the Agency.</div>
                          )
                        ) : (
                          <div>No Matched Agency Found.</div>
                        )}

                        {singleHiredDeveloper?.agenciesMatched?.length > 4 &&
                          singleHiredDeveloper?.agenciesMatched?.length >=
                            initial && (
                            <div
                              onClick={() => showMore()}
                              className="show-more_sharedDeveloper"
                            >
                              <p>Show More</p>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onClose={onCloseModal}
            classNames={{
              overlay: "customOverlayAgencyProduct",
              modal: "customModalClientOneHireDeveloper",
            }}
            center
          >
            <div className="want_to_accept">
              <div className="connect_or_not">
                <p>Do you want to accept??</p>
              </div>

              <div className="interested_or_not">
                {/* <div> */}
                <div className="update_now" onClick={() => agencyAction(1)}>
                  <p>Accept</p>
                </div>
                <div className="update_later" onClick={() => agencyAction(2)}>
                  <p>Reject</p>
                </div>
                {/* </div> */}
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    condition: state.condition,
  };
};

export default connect(mapStateToProps)(RespondedDetails);
