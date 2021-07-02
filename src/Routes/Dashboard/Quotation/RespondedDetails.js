/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import foods from "../../../assets/images/Quotation/foods.png";
import Moment from 'react-moment';
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";

const CommentBox = (props) => {
  const [apiData, setApiData] = useState({
    agencyId: props.agencyId,
    isShortListed: true,
    negotiablePrice: "",
    comment: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  const replyApi = () => {
    instance
      .patch(`api/client/projects/propose/${props.projectId}`, apiData)
      .then(function (response) {
        console.log(response);
        props.giveReplies(true);
      });
  };

  const askForQuotation = () => {
    const quotationData = {
      agencyId: props.agencyId,
      isShortListed: true,
      isAskedForQuotation: true,
      negotiablePrice: "",
      comment: "Please provide a Quotation.",
    };
    instance
      .patch(`api/client/projects/propose/${props.projectId}`, quotationData)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      });
  };

  const handleProjectAcceptance = ()=>{
    instance.patch(`api/client/projects/proposal-action/${props.projectId}`,{
      agencyId: props?.agencyId || "",
      isQuotationAcceptedByClient: true,
    })
    .then(function(response){
      window.location.reload()
    })
  }

  const handleProjectRejection = ()=>{
    instance.patch(`api/client/projects/proposal-action/${props.projectId}`,{
      agencyId: props?.agencyId || "",
      isQuotationAcceptedByClient: false,
    })
    .then(function(response){
      window.location.reload()
    })
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        className="commentBox"
        style={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid black",
          borderRadius: "8px",
          padding: "1rem",
          margin: "2rem 1rem 1rem 1rem",
          width: "100%",
        }}
      >
        {props.comments.map((index) => {
          if (index.commentType === props.commentType) {
            return (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {index.comment && (
                    <div>
                      <h5>
                        <b>Client: </b>
                        {index.comment}
                      </h5>
                    </div>
                  )}
                  {index.reply && (
                    <div>
                      <h5>
                        <b>Agency: </b>
                        {index.reply}
                      </h5>
                    </div>
                  )}
                </div>
              </>
            );
          } else {
            return "";
          }
        })}

        {props.isAskedForQuotation && props.isCommentSectionActive && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", margin: "1rem 0rem" }}>
              <h5>
                <b>Client: </b>
              </h5>
              <textarea
                rows="5"
                cols="50"
                style={{ margin: "0 1rem" }}
                placeholder="Enter your reply"
                name="comment"
                value={apiData.reply}
                onChange={(event) => handleChange(event)}
              />
            </div>
            {(props.clientNegotiablePrice === null ||
              props.clientNegotiablePrice === undefined) && (
              <div className="postQuotation">
                <div style={{ display: "flex" }}>
                  <b>Client Negotiatiable Price:</b>
                  <div className="negotiablePrice">
                    <input
                      type="number"
                      name="clientNegotiablePrice"
                      placeholder="negotiable price"
                      value={apiData.clientNegotiablePrice}
                      onChange={(event) => handleChange(event)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div
              style={{ display: "flex", flexDirection: "column", width: "30%" }}
            >
              <button
                style={{
                  background: "none",
                  minWidth: "40px",
                  maxWidth: "80px",
                  border: "2px solid black",
                  borderRadius: "4px",
                }}
                onClick={() => {
                  replyApi();
                }}
              >
                Reply
              </button>
            </div>
           
          </div>
        )}
        {!props.isCommentSectionActive && !props.isReplySectionActive && (
              <div>
                <p>Coversation Over.</p>
              </div>
            )}
        {!props.isAskedForQuotation &&
          props.isCommentSectionActive &&
          props.isShortListed && (
            <div className="detailsButtons">
              <button onClick={askForQuotation}>Ask For Quotation</button>
            </div>
          )}

        {props.isReplySectionActive && "Waiting for the reply from Agency."}
      </div>

      <div className={`action-wait`}>
        <div className="postQuotation">
          {props.agencyNegotiablePrice && props.agencyNegotiablePrice !== null && (
            <div className="detailsButtons">
              <p>
                <b>{`Agency Negotiatiable Price: `}</b>
                {props.agencyNegotiablePrice}
              </p>
            </div>
          )}

          {props.clientNegotiablePrice && props.clientNegotiablePrice !== null && (
            <div className="detailsButtons">
              <p>
                <b>{`Client Negotiatiable Price: `}</b>
                {props.clientNegotiablePrice}
              </p>
            </div>
          )}

          {props.quotationLink && props.quotationLink !== "" && (
            <div className="detailsButtons">
              <a href={props.quotationLink} target="new">
                Click to see Quotation
              </a>
            </div>
          )}
        </div>

        <div className={`${props.isProposalActionActive ? "" : "disabled"}`}>
          <div>
            <p>Accept or Reject the Project.</p>
          </div>

          <div className="detailsButtons">
          <button className="acceptButton" onClick = {handleProjectAcceptance}>Accept</button> 
          <button className="rejectButton" onClick={handleProjectRejection}>Reject</button> 
          </div>
        </div>
      </div>
    </div>
  );
};

//RESPONDED DETAILS
function RespondedDetails(props) {
  let { projectId, agencyId } = useParams();
  const routerHistory = useHistory();

  const [isRepliedToClient, setRepliedToClient] = useState(false);
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState();

  const Role = localStorage.getItem("role");

  const getAllProjects = () => {
    setLoading(true);
    instance
      .get(`api/${Role}/projects/get/${projectId}?agencyId=${agencyId}`)
      .then(function (response) {
        console.log(response.projectServicesRequired[0].serviceName);
        setProject(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (Object.keys(props["projects"]).length === 0) {
      console.log("empty");
      getAllProjects();
    } else {
      console.log("Not empty");
      setProject(props.projects);
    }
  }, [isRepliedToClient]);

  return (
    <>
      <div
        style={{ marginTop: "55px" }}
        className="backArrow"
        onClick={() => routerHistory.goBack()}
      >
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      <div className="mainDetailHeader">
        <div className="innerDetailHeader">
          <div className="detailHeaderImage">
            <div>
              <img src={foods} alt="" />
            </div>
          </div>
          <div className="headerInformation">
            <div className="clientName">
              {project.isProposalActionActive && (
                <div className="detailsButtons">
                  <button>Accept</button>
                  <button>Withdraw</button>
                </div>
              )}
            </div>
            <div className="clientExperience">
              <div className="btnInfoDiv">
                <div className="rightBorder"></div>
                <div className="innerBtnInfoDiv" style={{ marginLeft: "0" }}>
                  <p
                    style={{
                      backgroundColor: "#02044a",
                      padding: "0.2rem 1rem",
                      borderRadius: "999px",
                      color: "#fff",
                    }}
                  >
                    {project?.projectName}
                  </p>
                </div>
              </div>
              <div className="innerBtnInfoDiv" style={{ marginLeft: "20px" }}>
                <p
                  style={{
                    backgroundColor: "transparent",
                    padding: "0",
                    borderRadius: "999px",
                    color: "#02044a",
                  }}
                >
                  {project?.projectDomainId?.domainName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="respondDescription">
        <h2>About Your Project</h2>
        <p>{project?.projectName}</p>
      </div>

      <div className="respondCards">
        <div className="innerResponseCard">
          <span className="leftLine"></span>
          <div>
            <p>Client</p>
            <p>{`${project?.clientId?.companyName}`}</p>
          </div>
          <div>
            <p>Expected Timeline</p>
            <p>{`${project?.projectExpectedStartingDays} Days`}</p>
          </div>
          <div>
            <p>Project Proposal Cost</p>
            <p style={{ fontWeight: "600" }}>{`$${project?.projectProposalCost}`}</p>
          </div>
          <div>
            <p>Agency Experience</p>
            <p>{`${project?.agencyExperience}`}</p>
          </div>
        </div>
        <div className="innerResponseCard">
          <span className="leftLine"></span>
          <div>
            <p>Project Type</p>
            <p>{`${project?.projectType}`}</p>
            
          </div>

          <div>
            <p>Shortlisted</p>
            <p>{`${(project?.projectProposals?.length>0 && project?.projectProposals[0]?.isShortListed) ? "Yes":"No"}`}</p>
            
          </div>
          <div>
            <p>Quotation Asked</p>
            <p>{`${(project?.projectProposals?.length>0 && project?.projectProposals[0]?.isAskedForQuotation) ? "Yes":"No"}`}</p>
          </div>
          <div>
            <p>Project Creation Date</p>
            <p><Moment format="D MMM YYYY" withTitle>{project?.createdAt}</Moment></p>
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
          </div>

          <div className="agencyQuotationDesc">
            <h4>Comments and Replies</h4>
            {loading ? (
              <p style={{ textAlign: "center" }}>Comments are loading...</p>
            ) : project?.projectProposals &&
              project.projectProposals[0]?.isAskedForQuotation === true ? (
              <CommentBox
                giveReplies={(gr) => {
                  setRepliedToClient(gr);
                }}
                comments={project.projectProposals[0]?.comments}
                commentType="Quotation"
                isCommentSectionActive={
                  project.projectProposals[0].isCommentSectionActive
                }
                isReplySectionActive={
                  project.projectProposals[0].isReplySectionActive
                }
                projectId={projectId}
                agencyId={agencyId}
                isAskedForQuotation={true}
                isShortListed={true}
                clientNegotiablePrice={
                  project.projectProposals[0].clientNegotiablePrice
                }
                agencyNegotiablePrice={
                  project.projectProposals[0].agencyNegotiablePrice
                }
                quotationLink={project.projectProposals[0].quotationLink}
                isProposalActionActive={
                  project.projectProposals[0].isProposalActionActive
                }
                isQuotationAcceptedByClient={
                  project.projectProposals[0].isQuotationAcceptedByClient
                }
                
              />
            ) : (
              project?.projectProposals && (
                <CommentBox
                  giveReplies={(gr) => {
                    setRepliedToClient(gr);
                  }}
                  comments={project.projectProposals[0]?.comments}
                  commentType="Shortlist"
                  isCommentSectionActive={
                    project.projectProposals[0].isCommentSectionActive
                  }
                  isReplySectionActive={
                    project.projectProposals[0].isReplySectionActive
                  }
                  projectId={projectId}
                  agencyId={agencyId}
                  isAskedForQuotation={false}
                  isShortListed={true}
                  clientNegotiablePrice={
                    project.projectProposals[0].clientNegotiablePrice
                  }
                  agencyNegotiablePrice={
                    project.projectProposals[0].agencyNegotiablePrice
                  }
                  quotationLink={project.projectProposals[0].quotationLink}
                  isProposalActionActive={
                    project.projectProposals[0].isProposalActionActive
                  }
                  isQuotationAcceptedByClient={
                    project.projectProposals[0].isQuotationAcceptedByClient
                  }
                />
              )
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

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    condition: state.condition,
  };
};

export default connect(mapStateToProps)(RespondedDetails);
