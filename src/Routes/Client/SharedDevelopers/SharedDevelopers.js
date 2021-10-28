import React, { useEffect, useState } from "react";
import "./SharedDevelopers.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import * as helper from "../../../shared/helper";
import Spinner from "../../../Components/Spinner/Spinner";
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from "../../../Components/Back/Back";
import UpImage1 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/UpImage1.svg';
import DownImage2 from '../../../assets/images/Newestdashboard/Client-one-hire-developer/DownImage2.svg';
import UpBigImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/UpBigImage.svg';
import DownBigImage from '../../../assets/images/Newestdashboard/Client-one-hire-developer/DownBigImage.svg';
import DownArrow from '../../../assets/images/Newestdashboard/Agency-Profile/Arrow-button.svg'

function RespondedDetails(props) {
  const [initial, setInitial] = useState(5);

  const agencyId = localStorage.getItem('userId');

  const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);
  const [agencyDeveloper, setAgencyDeveloper] = useState([]);

  const [disability, setDisability] = useState(false);

  const [showDevelopers, setShowDevelopers] = useState(false);

  const [loading, setLoading] = useState(false);

  const Role = localStorage.getItem("role").toLowerCase();
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);

  const getOneDeveloper = () => {
    setLoading(true);
    // instance.get(`/api/${Role}/hire-developers/get/${hireDeveloperId}?agencyId=${agencyId}`)
    instance.get(`/api/agency/hire-developers/all?agencyId=${agencyId}`)
      .then(function (response) {
        console.log(response);
        setSingleHiredDeveloper(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // const shareDeveloper = (hireDevId) => {
  //   setLoading(true);
  //   const body = {
  //     agencyId: localStorage.getItem("userId"),
  //     reply: "Find the devlopers' Resume",
  //     developersShared: selectedDevelopers,
  //   };
  //   instance
  //     .patch(`/api/${Role}/hire-developers/share-developer/${hireDevId}`, body)
  //     .then(function (response) {
  //       setLoading(false);
  //       props.history.push("/get-hire-developer");
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });
  // };

  // const getAgencyDeveloper = () => {
  //   instance
  //     .get(`/api/${Role}/developers/all`)
  //     .then(function (response) {
  //       setAgencyDeveloper(response);
  //     })
  //     .catch((err) => {
  //     });
  // };

  const showMore = () => {
    setInitial(initial + 5);
  }

  useEffect(() => {
  }, [selectedDevelopers]);

  useEffect(() => {
    getOneDeveloper();
    // getAgencyDeveloper();
  }, []);

  // useEffect(() => {
  // }, [showDevelopers]);


  useEffect(() => {
  }, [initial])

  const agencyAction = (task, hireDeveloperId) => {
    instance.patch(`/api/${Role}/hire-developers/update-matched-agency/${hireDeveloperId}`, { interested: task, agencyId })
      .then(response => {
        setDisability(true)
      })
      .catch(err => {

      })
  }


  return (
    <>
      {loading ? <Spinner /> :
        <div className='main_parent_sharedDeveloper'>
          <Navbar />
          <img className="upImage1_clientOneHireDeveloper" src={UpImage1} alt="upImage1" />
          <img className="upImage2_clientOneHireDeveloper" src={UpBigImage} alt="upImage1" />
          <img className="downImage3_clientOneHireDeveloper" src={DownImage2} alt="upImage1" />
          <img className="downImage4_clientOneHireDeveloper" src={DownBigImage} alt="upImage1" />
          <div className="main-card_SharedDevelopers">
            <Back name="Matched Developer" />
            <div className="respond-card_parent">
              {singleHiredDeveloper?.length > 0 ?
                singleHiredDeveloper.map(devData => {
                  return (
                    <div className="innerResponseCard width innerResponseCard_sharedDeveloper">
                      <div className="parentDivShared">
                        <p>Agency Average Budget</p>
                        <p>{devData.averageBudget} </p>
                      </div>

                      <div className="parentDivShared">
                        <p>Contract Period</p>
                        <p>{devData.contractPeriod}</p>
                      </div>

                      <div className="parentDivShared">
                        <p>Developer Experience Required</p>
                        <p>
                          {devData.developerExperienceRequired}
                        </p>
                      </div>
                      <div className="parentDivShared">
                        <p>Project Expected Starting Days</p>
                        <p>{devData.expectedStartDate}</p>
                      </div>

                      <div className="parentDivShared">
                        <p>Number Of Resources Required</p>
                        <p>{devData.numberOfResourcesRequired}</p>
                      </div>

                      <div className="parentDivShared">
                        <p>Preferred Billing Mode</p>
                        <p>{devData.preferredBillingMode}</p>
                      </div>

                      <div className="parentDivShared">
                        <p>Requirement Name</p>
                        <p>{devData.requirementName}</p>
                      </div>

                      <div className="technologies">
                        <div style={{ width: "30%" }}>Developer Roles Required</div>
                        <div className="devops">
                          {devData.developerRolesRequired.length > 0 &&
                            <div style={{ marginLeft: "1rem" }}>
                              {devData.developerRolesRequired.map(dd => {
                                return (
                                  <p>{dd}</p>
                                )
                              })}
                            </div>
                          }
                        </div>
                      </div>

                      <div className="technologies">
                        <div style={{ width: "30%" }}>Developer Technologies Required</div>
                        <div className="devops">
                          {/* {console.log(devData.developerTechnologiesRequired,"tech required")} */}
                          {devData.developerTechnologiesRequired.length > 0 &&
                            <div style={{ marginLeft: "1rem" }} >
                              {devData.developerTechnologiesRequired.map(dt => {
                                return (
                                  <p>{dt.technologyName}</p>
                                )
                              })
                              }
                            </div>
                          }
                          {/* {devData.developerTechnologiesRequired.length > 0 &&
                          <ul>
                            {devData.developerTechnologiesRequired.map(dt => {
                              return (
                                <li>{dt}</li>
                              )
                            })}
                          </ul>
                        } */}
                        </div>
                      </div>
                      <div>
                        <div>
                          { devData.agenciesMatched[0].interested === 0 ? <>
                            <button onClick={() => agencyAction(1, devData._id)} className="acceptButtonShare" /*onClick={}*/>
                              Accept
                            </button>
                            <button onClick={() => agencyAction(2,devData._id)} className="rejectButtonShare" /*onClick={}*/>
                              Reject
                            </button></> : <>
                            <button disabled="true" className="acceptButtonShare" >
                             {devData.agenciesMatched[0].interested===1?"Accepted":"Rejected" } </button>
                            </>
                          }
                          </div>
                      </div>

                      </div>
                      )
                })
                      : (
                      "No Data Found"
                )}


                      {(showDevelopers === true && singleHiredDeveloper?.agencyMatched !== undefined) &&
                        <div className="developers-div">
                          <div className="moreAgencyList new_design_sharedDeveloper">
                            {/* {singleHiredDeveloper?.agenciesMatched?.length > 0 && singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.length >0 && `${JSON.stringify(singleHiredDeveloper?.agenciesMatched[0]?.developersShared[0]?.developerId)}`} */}
                            {singleHiredDeveloper?.agenciesMatched?.length > 0 ? (
                              singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.length > 0 ?
                                singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.slice(0, 5)?.map(
                                  developer => {
                                    return (
                                      <>
                                        <div className="names_of_developer">
                                          <div className="name_circle">
                                            <div>
                                              <p>{developer?.developerId?.firstName.charAt(0)}</p>
                                            </div>
                                          </div>
                                          <div className="moreAgencyInfo">
                                            <p style={{ textAlign: 'center' }}>{`${developer?.developerId?.firstName} ${developer?.developerId?.lastName}`}</p>
                                            <p style={{ textAlign: 'center' }}>{developer?.developerId?.developerDesignation}</p>
                                          </div>
                                          {developer?.developerId?.developerDocuments?.length > 0 ? (
                                            <div className="view-resume_div">
                                              <a className="view-resume_child" href={developer?.developerId?.developerDocuments[0].documentLink} target="new">
                                                Check Resume
                                              </a>
                                            </div>
                                          ) : (
                                            "No resume"
                                          )}
                                        </div>
                                      </>
                                    );
                                  }
                                )
                                : <div>No Developers shared by the Agency.</div>
                            )
                              : <div>No Matched Agency Found.</div>
                            }

                            {singleHiredDeveloper?.agenciesMatched?.length > 4 &&
                              singleHiredDeveloper?.agenciesMatched?.length >= initial &&
                              <div onClick={() => showMore()} className="show-more_sharedDeveloper">
                                <p>Show More</p>
                              </div>
                            }
                          </div>
                        </div>
                      }
                    </div>
          </div>
          </div>
      }
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
