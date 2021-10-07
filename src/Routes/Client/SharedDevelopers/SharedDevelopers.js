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
  let { hireDeveloperId, agencyId } = useParams();

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
    instance.get(`/api/${Role}/hire-developers/get/${hireDeveloperId}?agencyId=${agencyId}`)
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
    console.log('1');
  }, [initial])

  console.log(agencyDeveloper.length);

  return (
    <div className='main_parent_sharedDeveloper'>
      <Navbar />
      <img className="upImage1_clientOneHireDeveloper" src={UpImage1} alt="upImage1" />
      <img className="upImage2_clientOneHireDeveloper" src={UpBigImage} alt="upImage1" />
      <img className="downImage3_clientOneHireDeveloper" src={DownImage2} alt="upImage1" />
      <img className="downImage4_clientOneHireDeveloper" src={DownBigImage} alt="upImage1" />
      {loading ? (
        <Spinner />
      ) : (
        <>
        <div style={{paddingTop:"5rem"}}>
          <Back name="Matched Developer" />
          <div className="main-card_SharedDevelopers">
            <div className="respond-card_parent">
              {singleHiredDeveloper?.agenciesMatched?.length > 0 ? (
                <div className="innerResponseCard width innerResponseCard_sharedDeveloper">
                  {/* <span className="leftLine"></span> */}
                  <div>
                    <p>Agency Name</p>
                    <p>{`${singleHiredDeveloper?.agenciesMatched[0]?.agencyId
                      ?.agencyName || ""
                      }`}</p>
                  </div>
                  <div style={{ width: '83.5%' }} >
                    <p>Agency Description</p>
                    <p style={{ width: '342px' }}>
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

                  <div style={{ display: singleHiredDeveloper?.agencyMatched === undefined && 'none' }} onClick={() => setShowDevelopers(!showDevelopers)} className="moreAgencies_shared new_design no_border">
                    <div style={{ paddingBottom: '0' }}>
                      <h3>Matched Developer</h3>
                      <i style={{ display: singleHiredDeveloper?.agencyMatched === undefined && 'none' }} className={`fas fa-chevron-down ${showDevelopers && "conditionalRotate"}`}></i>
                    </div>

                    {(singleHiredDeveloper?.agencyMatched?.length > 0
                      && singleHiredDeveloper?.agencyMatched[0]?.developersShared?.length > 0)
                      &&
                      <div className="moreAgencySeeMore">
                        <button onClick={() => alert("Agency Selected")}>
                          Select Agency
                        </button>
                      </div>
                    }
                  </div>
                </div>
              ) : (
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
        </>
      )}
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    condition: state.condition,
  };
};

export default connect(mapStateToProps)(RespondedDetails);
