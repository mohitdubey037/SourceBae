import React, { useEffect, useState } from "react";
import "./SharedDevelopers.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import * as helper from "../../../shared/helper";
import Spinner from "../../../Components/Spinner/Spinner";
// import ClientNavbar from '../ClientNavbar';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar'
import Back from "../../../Components/Back/Back";

function RespondedDetails(props) {
  const [initial, setInitial] = useState(5);
  let { hireDeveloperId, agencyId } = useParams();

  console.log(hireDeveloperId, agencyId);
  hireDeveloperId = helper.cleanParam(hireDeveloperId);
  agencyId = helper.cleanParam(agencyId);
  const routerHistory = useHistory();

  const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);
  const [agencyDeveloper, setAgencyDeveloper] = useState([]);

  const [showDevelopers, setShowDevelopers] = useState(false);

  const [loading, setLoading] = useState(false);

  const Role = localStorage.getItem("role");
  const [selectedDevelopers, setSelectedDevelopers] = useState([]);
  const getOneDeveloper = () => {
    setLoading(true);
    instance
      .get(
        `/api/${Role}/hire-developers/get/${hireDeveloperId}?agencyId=${agencyId}`
      )
      .then(function (response) {
        console.log(response);
        setSingleHiredDeveloper(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const shareDeveloper = (hireDevId) => {
    setLoading(true);
    const body = {
      agencyId: localStorage.getItem("userId"),
      reply: "Find the devlopers' Resume",
      developersShared: selectedDevelopers,
    };
    instance
      .patch(`/api/${Role}/hire-developers/share-developer/${hireDevId}`, body)
      .then(function (response) {
        console.log(response);
        setLoading(false);
        props.history.push("/get-hire-developer");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const getAgencyDeveloper = () => {
    instance
      .get(`/api/${Role}/developers/all`)
      .then(function (response) {
        console.log(response);
        setAgencyDeveloper(response);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  };

  // const handleDevelopers = (documents) => { };

  const showMore = () => {
    setInitial(initial + 5);
  }

  useEffect(() => {
    console.log(selectedDevelopers, "selected dev");
  }, [selectedDevelopers]);

  useEffect(() => {
    getOneDeveloper();
    getAgencyDeveloper();
  }, []);

  useEffect(() => {
    console.log(showDevelopers);
  }, [showDevelopers]);

  useEffect(() => {
    console.log(initial);
  }, [initial])

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="conditional_back_parent">
            <Back name="Shared Developer" />
          </div>
          <div className="main-card_SharedDevelopers">
            <div className="respond-card_parent">
              {singleHiredDeveloper?.agenciesMatched?.length > 0 ? (
                <div className="innerResponseCard width">
                  <span className="leftLine"></span>
                  <div>
                    <p>Agency Name</p>
                    <p>{`${singleHiredDeveloper?.agenciesMatched[0]?.agencyId
                      ?.agencyName || ""
                      }`}</p>
                  </div>
                  <div >
                    <p>Agency Description</p>
                    <p style={{ fontWeight: "600" }}>
                      {
                        singleHiredDeveloper?.agenciesMatched[0]?.agencyId
                          ?.agencyDescription
                      }
                    </p>
                  </div>
                  <div>
                    <p>Agency Email</p>
                    <p>
                      {
                        singleHiredDeveloper?.agenciesMatched[0]?.agencyId
                          ?.agencyEmail
                      }
                    </p>
                  </div>
                  <div style={{ paddingBottom: '0px' }}>
                    <p>Agency Phone</p>
                    <p>
                      {
                        singleHiredDeveloper?.agenciesMatched[0]?.agencyId
                          ?.agencyPhone
                      }
                    </p>
                  </div>

                  <div onClick={() => setShowDevelopers(!showDevelopers)} className="moreAgencies_shared new_design no_border">
                    <div style={{ paddingBottom: '0' }}>
                      <h3>Matched Developer</h3>
                    </div>
                    {singleHiredDeveloper?.agencyMatched?.length > 0 && singleHiredDeveloper?.agencyMatched[0]?.developersShared?.length > 0 && <div className="moreAgencySeeMore">
                      <button onClick={() => alert("Agency Selected")}>
                        Select Agency
                      </button>
                    </div>}
                  </div>

                </div>
              ) : (
                "No Data Found"
              )}


              {showDevelopers === true &&
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
                    {arr.length >= initial &&
                      <div onClick={() => showMore()} className="show-more_sharedDeveloper">
                        <p>Show More</p>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
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
