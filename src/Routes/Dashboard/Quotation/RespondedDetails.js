import React, {useEffect, useState} from "react";
import "./RespondedDetails.css";

import foods from "../../../assets/images/Quotation/foods.png";
import agencyLogo from "../../../assets/images/Quotation/cegelec.svg";

import {connect} from 'react-redux'
import instance from "../../../Constants/axiosConstants"
const CommentBox = (props) => {
  return (
    <div
      className="commentBox"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "1rem",
        margin: "2rem 1rem 1rem 1rem",
      }}
    >
      {props.comments.map((index) => {
        if (true) {
          if (index.comment && index.reply) {
            return (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <h5>
                    <b>Client: </b>
                    {index.comment}
                  </h5>
                </div>
                <div>
                  <h5>
                    <b>Agency: </b>
                    {index.reply}
                  </h5>
                </div>
              </div>
            );
          } else if (index.comment && index.reply === undefined) {
            return (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <h5>
                    <b>Client: </b>
                    {index.comment}
                  </h5>
                </div>
                <div style={{ display: "flex" }}>
                  <h5>
                    <b>Agency: </b>
                  </h5>
                  <textarea rows="5" cols = "50" style={{margin:"0 1rem"}} placeholder="Enter your reply"/>
                  <button style={{background:"none", minWidth:"80px", border:"2px solid black", borderRadius:"4px"}}>Reply</button>
                </div>
              </div>
            );
          }
        } else {
          return "";
        }
      })}
    </div>
  );
};

function RespondedDetails(props) {
  console.log(props,"props");
  const [project, setProject] = useState({})

  const Role = localStorage.getItem('role')
  const userId = localStorage.getItem('userId')
  const arr = [
    {
      title: "Food",
    },
    {
      title: "Meal Subscription",
    },
    {
      title: "Online Orderdering",
    },
    {
      title: "Menu & Reviews",
    },
  ];

  const getAllProjects = () => {
    const apiParam = Role==="client"?"clientId":"agencyId"
    instance.get(`api/${Role}/projects/all?${apiParam}=${userId}&quotationReceived=`)
        .then(function (response) {
            setProject(response);
        })
        .catch(err => {
            console.log(err);
        })
}
  useEffect(()=>{
    if(Object.keys(props["projects"]).length===0){
      console.log("empty")
      getAllProjects()
    }
    else{
      console.log("Not empty")
      setProject(props.projects)
    }
   
  },[])

  useEffect(()=>{
    console.log(project,"project")
  },[project])
  return (
    <>
      <div className="mainDetailHeader">
        <div className="innerDetailHeader">
          <div className="detailHeaderImage">
            <div>
              <img src={foods} alt="" />
            </div>
          </div>
          <div className="headerInformation">
            <div className="clientName">
              <div className="detailsButtons">
                <button>Accept</button>
                <button>Withdraw</button>
              </div>
            </div>
            <div className="clientExperience">
              {arr.map((value, index) => {
                return (
                  <div className="btnInfoDiv">
                    <div className="rightBorder"></div>
                    <div
                      className="innerBtnInfoDiv"
                      style={{ marginLeft: index == 0 ? "0" : "20px" }}
                    >
                      <p
                        style={{
                          backgroundColor:
                            index == 0 ? "#02044a" : "transparent",
                          padding: index == 0 ? "0.2rem 1rem" : 0,
                          borderRadius: "999px",
                          color: index == 0 ? "#fff" : "#02044a",
                        }}
                      >
                        {value?.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="respondDescription">
        <h2>About Your Project</h2>
        <p>{props.projectDescription}</p>
      </div>

      <div className="respondCards">
        <div className="innerResponseCard">
          <span className="leftLine"></span>
          <div>
            <p>Expected Timeline</p>
            <p>45days</p>
          </div>
          <div>
            <p>Budget</p>
            <p style={{ fontWeight: "600" }}>Min $5000</p>
          </div>
          <div>
            <p>Agency Experience</p>
            <p>1 year</p>
          </div>
          <div>
            <p>Documents</p>
            <p>-</p>
          </div>
        </div>
        <div className="innerResponseCard">
          <span className="leftLine"></span>
          <div>
            <p>Mobile Development</p>
            <p>React Native</p>
          </div>
          <div>
            <p>Cloud-Server Management</p>
            <p>Google Cloud</p>
          </div>
          <div>
            <p>Testing and Q&A</p>
            <p>Testing Done</p>
          </div>
          <div>
            <p>Note</p>
            <p>-</p>
          </div>
        </div>
      </div>

      <div className="agencyQuotation">
        <div className="innerAgencyQuotation">
          <div className="quotationleftLine"></div>
          <div className="agencyQuotationHeader">
            <div className="agencyQuotationHeading">
              <h2>Quotation Details</h2>
            </div>
            <div className="agencyLogo">
              <img src={agencyLogo} alt="" />
            </div>
          </div>

          <div className="agencyQuotationDesc">
            <h4>Comments and Replies</h4>
            
            {props?.projectProposals && props.projectProposals[0]?.isAskedForQuotation === true && (
              <CommentBox
                comments={props.projectProposals[0]?.comments}
                commentType="Shortlist"
              />
            )}
          </div>

          <div className="agencyQuestions">
            <div>
              <h4>Fixed Budget</h4>
              <ul>
                <li>Min $5000</li>
              </ul>
            </div>
            <div>
              <h4>Estimated Timeline</h4>
              <ul>
                <li>45days</li>
              </ul>
            </div>
            <div>
              <h4>Technology</h4>
              <ul>
                {props?.projectTechnologiesRequired?.map((p) => {
                  return <li>{p?.technologyName}</li>;
                })}
              </ul>
            </div>
            <div>
              <h4>{props?.projectFiles}</h4>
              <p>-</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
      projects : state.projects,
      condition : state.condition
  }
}

export default connect(mapStateToProps)(RespondedDetails);
