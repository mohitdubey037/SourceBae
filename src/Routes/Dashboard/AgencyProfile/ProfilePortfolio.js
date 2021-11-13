/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import * as helper from "../../../shared/helper";

import "./ProfilePortfolio.css"
import instance from "../../../Constants/axiosConstants";
// import Rules_edit from "../../../assets/images/Newestdashboard/Agency-Profile/Agency-Rules_edit.svg";

import check from "../../../assets/images/Newestdashboard/Agency-Profile/check.png";
import cancel from "../../../assets/images/Newestdashboard/Agency-Profile/cancel.png";

import "./Rules.css";

function AgencyPortfolio(props) {
  const routerHistory = useHistory();
  const propsAgencyId = helper.cleanParam(props.id);

  const Role = localStorage.getItem("role");
  const [agencyPortfoliodata, setAgencyPortfoliodata] = useState([]);

  const agencyId = localStorage.getItem('userId')

  const [rules, setRules] = useState([]);
  const [form, setForm] = useState({});
  // const handalLoading = () => {
  //   setEditRules(false);
  // }

  // const handleEditRules = (value) => {
  //   setLoading(true);
  // };

  //   const permanentDisable = (name) => {
  //     if (name === "startTime" || name === "endTime") {
  //       return false;
  //     } else return true;
  //   };

  const getAgencyPortfolio = (profileviewStatus) => {
    instance
      .get(`api/${Role}/portfolios/all?agencyId=${Role === 'Agency' ? agencyId : propsAgencyId}`)
      .then(function (response) {
        setAgencyPortfoliodata(response);
      })
      .catch((err) => {
      });
  };

  // const RedirectNew = (link) => {
  //   window.open(link)
  // }

  useEffect(() => {
    // if (Role === "Agency") {
      getAgencyPortfolio();
    // }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      agencyTiming: {
        ...form.agencyTiming,
        [name]: value,
      },
    });
  };

  const handleRules = (event, rule) => {
    const { value } = event.target;
    let tempArr = [...rules];
    let index = tempArr.indexOf(rule);
    tempArr[index].selection = value === "true" ? true : false;
    setRules(tempArr);
  };


  return (
    <>
      <div className="mainPortfolioDiv">
        <div className="portfolioHeading"><p>PORTFOLIO{agencyPortfoliodata.length > 0 ? "'S" : ""} ({agencyPortfoliodata.length})</p></div>
        <div className="portfolioParent">
          {agencyPortfoliodata.map((data) => {
            return (
              <div className="PortfolioMainDiv">
                <div className="ProjectDataPortfolio">
                  <div className="logoPortfolio">
                    <img src={data.projectLogo} alt="logo" />
                  </div>
                  <div className="detialPortfolio">
                    <p>{data.projectName}</p>
                    <div className="PortfolioPriceAndTimeline">
                      {/* <div>price</div> */}<p style={{ backgroundColor: "#ffffff", padding: "0" }}>Project Timeline</p>
                      <p style={{ marginLeft: "15px" }}>{data.projectTimeline} days</p>
                    </div>
                    <div className="profile_link">
                      <a target="_blank" href={`//${data.projectLink}`}>{data.projectLink}</a>
                    </div>
                  </div>
                </div>
                <div className="ProjectDescriptionPortfolio">
                  <p>{data.projectDescription}</p>
                </div>
              </div>
            )
          })}
          {Role === "Agency" &&
            <div className="No_portfolio" onClick={() => routerHistory.push("/portfolio")}>
              <div className="add-portfolio-parent">
                <h6 className="add-portfolio">Add A Portfolio</h6>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default AgencyPortfolio;
