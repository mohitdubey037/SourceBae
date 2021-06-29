import React, { useEffect, useState } from "react";
import "./SharedDevelopers.css";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import * as helper from "../../../shared/helper";
import Spinner from "../../../Components/Spinner/Spinner";
import ClientNavbar from '../ClientNavbar';

function RespondedDetails(props) {
  let { hireDeveloperId, agencyId } = useParams();

  console.log(hireDeveloperId, agencyId);
  hireDeveloperId = helper.cleanParam(hireDeveloperId);
  agencyId = helper.cleanParam(agencyId);
  const routerHistory = useHistory();

  const [singleHiredDeveloper, setSingleHiredDeveloper] = useState([]);
  const [agencyDeveloper, setAgencyDeveloper] = useState([]);

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

  const handleDevelopers = (documents) => {};

  useEffect(() => {
    console.log(selectedDevelopers, "selected dev");
  }, [selectedDevelopers]);
  useEffect(() => {
    getOneDeveloper();
    getAgencyDeveloper();
  }, []);

  return (
    <>
      <ClientNavbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{ marginTop: "55px" }}
            className="backArrow"
            onClick={() => routerHistory.goBack()}
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </div>
          <div className="respondCards">
            {singleHiredDeveloper?.agenciesMatched?.length > 0 ? (
              <div className="innerResponseCard">
                <span className="leftLine"></span>
                <div>
                  <p>Agency Name</p>
                  <p>{`${
                    singleHiredDeveloper?.agenciesMatched[0]?.agencyId
                      ?.agencyName || ""
                  }`}</p>
                </div>
                <div>
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
                <div>
                  <p>Agency Phone</p>
                  <p>
                    {
                      singleHiredDeveloper?.agenciesMatched[0]?.agencyId
                        ?.agencyPhone
                    }
                  </p>
                </div>
              </div>
            ) : (
              "No Data Found"
            )}
            <div className="moreAgencies_shared">
              <div className="innerMoreAgencies">
                <div className="moreAgencyHeading">
                  <h3>Matched Developer</h3>
                </div>
                <div className="moreAgencyList">
                {/* {singleHiredDeveloper?.agenciesMatched?.length > 0 && singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.length >0 && `${JSON.stringify(singleHiredDeveloper?.agenciesMatched[0]?.developersShared[0]?.developerId)}`} */}
                  {singleHiredDeveloper?.agenciesMatched?.length > 0 ? (
                    singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.length >0 ?
                    singleHiredDeveloper?.agenciesMatched[0]?.developersShared?.map(
                      (developer) => {
                        return (
                          <div className="moreAgencyCard">
                            <div className="moreAgencyInfo">
                              <h6>{`${developer?.developerId?.firstName} ${developer?.developerId?.lastName}`}</h6>
                              <p>{developer?.developerId?.developerDesignation}</p>
                            </div>
                            <div className="moreAgencyLogo">
                              {developer?.developerId?.developerDocuments?.length > 0 ? (
                                <button>
                                  <a
                                    href={
                                      developer?.developerId?.developerDocuments[0]
                                        .documentLink
                                    }
                                    target="new"
                                  >
                                    View Resume
                                  </a>
                                </button>
                              ) : (
                                "No resume"
                              )}
                            </div>
                          </div>
                        );
                      }
                    ):
                    <div>No Developers shared by the Agency.</div>
                  ) : (
                    <div>No Matched Agency Found.</div>
                  )}
                </div>
                {singleHiredDeveloper?.agencyMatched?.length > 0 && singleHiredDeveloper?.agencyMatched[0]?.developersShared?.length >0  &&<div className="moreAgencySeeMore">
                  <button onClick={() => alert("Agency Selected")}>
                    Select Agency
                  </button>
                </div>}
              </div>
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
