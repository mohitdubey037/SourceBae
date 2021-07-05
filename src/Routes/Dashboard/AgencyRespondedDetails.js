/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Quotation/RespondedDetails.css";

import foods from "../../assets/images/Quotation/foods.png";

import { connect } from "react-redux";
import instance from "../../Constants/axiosConstants";
import { useParams } from "react-router-dom";
import * as helper from "../../shared/helper";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

let isRepliedToClient = false;

const CommentBox = (props) => {
  const [apiData, setApiData] = useState({
    agencyId: localStorage.getItem("userId"),
    isShortListed: true,
    reply: "",
  });

  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [finalCost, setFinalCost] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  const handleProjectAcceptance = () => {
    if (finalCost !== null) {
      instance
        .patch(`api/client/projects/proposal-action/${props.projectId}`, {
          agencyId: localStorage.getItem("userId") || "",
          isQuotationAcceptedByAgency: true,
          projectFinalCost: finalCost,
        })
        .then(function (response) {
          setOpen(false);
          window.location.reload()
        });
    } else {
      toast.error("Final cost cannot be empty.");
    }
  };
  const handleProjectRejection = () => {
    instance
      .patch(`api/client/projects/proposal-action/${props.projectId}`, {
        agencyId: localStorage.getItem("userId") || "",
        isQuotationAcceptedByAgency: false,
      })
      .then(function (response) {
        window.location.reload()
      });
  };

  function uploadMedia() {
    if (file) {
      const formData = new FormData();
      formData.append("files", file, "files.pdf");
      instance
        .post(`api/agency/media/create`, formData)
        .then(function (response) {
          setApiData({
            ...apiData,
            quotationLink: response[0].mediaURL,
          });
        })
        .catch((err) => {});
    } else {
      toast.error("Please Pick a File before Uploading.");
    }
  }

  const inputFileChosen = (e) => {
    setFile(e.target.files[0]);
  };


  const replyApi = () => {
    const data = apiData;
    if (props.isAskedForQuotation) {
      data["isAskedForQuotation"] = true;
    }
    instance
      .patch(`api/agency/projects/propose/${props.projectId}`, data)
      .then(function (response) {
        props.giveReplies(true);
      });
  };
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
        {!isRepliedToClient &&
          props.comments.map((index) => {
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
        <div className="postQuotation">
          {props.isAskedForQuotation &&
            (props.agencyNegotiablePrice === null ||
              props.agencyNegotiablePrice === undefined) && (
              <div style={{ display: "flex" }}>
                <b>Agency Negotiatiable Price:</b>
                <div className="negotiablePrice">
                  <input
                    type="number"
                    name="agencyNegotiablePrice"
                    placeholder="negotiable price"
                    value={apiData.agencyNegotiablePrice}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
            )}

          {props.isReplySectionActive &&
            props.isAskedForQuotation &&
            (props.quotationLink === null ||
              props.quotationLink === undefined) && (
              <div style={{ margin: "1rem 0rem" }}>
                <input
                  onChange={inputFileChosen}
                  type="file"
                  accept="application/pdf"
                />
                <button onClick={uploadMedia}>Upload</button>
              </div>
            )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {props.isReplySectionActive && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0rem",
              }}
            >
              <h5>
                <b>Agency: </b>
              </h5>
              <textarea
                rows="5"
                cols="50"
                style={{ margin: "0 1rem" }}
                placeholder="Enter your reply"
                name="reply"
                value={apiData.reply}
                onChange={(event) => handleChange(event)}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30%",
                }}
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
        </div>
        {!props.isCommentSectionActive && !props.isReplySectionActive && (
          <div>
            <p>Coversation Over.</p>
          </div>
        )}
      </div>

      <div className={`action-wait`}>
        <div className="postQuotation">
          {props.clientNegotiablePrice && props.clientNegotiablePrice !== null && (
            <div className="detailsButtons">
              <p>
                <b>{`Client Negotiatiable Price: `}</b>
                {props.clientNegotiablePrice}
              </p>
            </div>
          )}
          {props.agencyNegotiablePrice && props.agencyNegotiablePrice !== null && (
            <div className="detailsButtons">
              <p>
                <b>{`Agency Negotiatiable Price: `}</b>
                {props.agencyNegotiablePrice}
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

        {!(
          props.isQuotationAcceptedByAgency && props.isQuotationAcceptedByClient
        ) && (
          <div
            className={`${
              props.isProposalActionActive && props.isQuotationAcceptedByClient
                ? ""
                : "disabled"
            }`}
          >
            <div>
              <p>Accept or Reject the Project.</p>
            </div>

            <div className="detailsButtons">
              
                <button
                  className="acceptButton"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Accept
                </button>

                <button
                  className="rejectButton"
                  onClick={handleProjectRejection}
                >
                  Withdraw
                </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        classNames={{
          overlay: "customOverlayAgencyProduct",
          modal: "customModalAgencyProduct",
        }}
        center
      >
        <div className="modalHeaderProduct">
          <h2>Accept Project</h2>
        </div>
        <div className="productModalForm">
          <div className="productModalInput">
            <p>Final Project Cost</p>
            <input
              type="number"
              onChange={(event) => {
                setFinalCost(event.target.value);
              }}
              name="finalCost"
            />
          </div>
        </div>
        <div className="connectedButton">
          <p onClick={handleProjectAcceptance}>
            Accept<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
          </p>
        </div>
      </Modal>
    </div>
  );
};

function AgencyRespondedDetails(props) {
  const [isRepliedToClient, setRepliedToClient] = useState(false);
  const routerHistory = useHistory();
  let { projectId } = useParams();
  projectId = helper.cleanParam(projectId);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);

  const Role = localStorage.getItem("role");
  const agencyId = localStorage.getItem("userId");

  const getAllProjects = () => {
    setLoading(true);
    instance
      .get(`api/${Role}/projects/get/${projectId}?agencyId=${agencyId}`)
      .then(function (response) {
        setLoading(false);
        setProject(response);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  useEffect(() => {
    if (Object.keys(props["projects"]).length === 0) {
      getAllProjects();
    } else {
      setProject(props.projects);
    }
  }, [isRepliedToClient]);

  useEffect(() => {
  }, [isRepliedToClient]);
  return (
    <>
      <div
        style={{ marginTop: "55px" }}
        className="backArrow"
        onClick={() =>
          routerHistory.push({
            pathname: "/quotation",
            origin: routerHistory.location.origin,
          })
        }
      >
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      <div className="mainDetailHeader">
        <div className="innerDetailHeader">
          <div className="detailHeaderImage">
            <div>
              <img src={foods} alt="logo" />
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
            <p
              style={{ fontWeight: "600" }}
            >{`$${project?.projectProposalCost}`}</p>
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
            <p>{`${
              project?.projectProposals?.length > 0 &&
              project?.projectProposals[0]?.isShortListed
                ? "Yes"
                : "No"
            }`}</p>
          </div>
          <div>
            <p>Quotation Asked</p>
            <p>{`${
              project?.projectProposals?.length > 0 &&
              project?.projectProposals[0]?.isAskedForQuotation
                ? "Yes"
                : "No"
            }`}</p>
          </div>
          <div>
            <p>Project Creation Date</p>
            <p>
              <Moment format="D MMM YYYY" withTitle>
                {project?.createdAt}
              </Moment>
            </p>
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
                isReplySectionActive={
                  project.projectProposals[0].isReplySectionActive
                }
                projectId={projectId}
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
                isQuotationAcceptedByAgency={
                  project.projectProposals[0].isQuotationAcceptedByAgency
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
                  isReplySectionActive={
                    project.projectProposals[0].isReplySectionActive
                  }
                  isCommentSectionActive={
                    project.projectProposals[0].isCommentSectionActive
                  }
                  projectId={projectId}
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
                  isQuotationAcceptedByAgency={
                    project.projectProposals[0].isQuotationAcceptedByAgency
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
                {project?.projectTechnologiesRequired?.map((p) => {
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

export default connect(mapStateToProps)(AgencyRespondedDetails);
