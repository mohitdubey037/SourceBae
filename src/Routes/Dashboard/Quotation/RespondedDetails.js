/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './RespondedDetails.css'
import foods from "../../../assets/images/Quotation/foods.png";
import Moment from 'react-moment';
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import ClientCommentBox from "../../Client/ClientCommentBox/ClientCommentBox";

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
    console.log('hii');
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
            <p>{`${(project?.projectProposals?.length > 0 && project?.projectProposals[0]?.isShortListed) ? "Yes" : "No"}`}</p>

          </div>
          <div>
            <p>Quotation Asked</p>
            <p>{`${(project?.projectProposals?.length > 0 && project?.projectProposals[0]?.isAskedForQuotation) ? "Yes" : "No"}`}</p>
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
            {
              project.projectProposals && project?.projectProposals[0].rejectReasonByClient !== undefined ?
                <p>Project is rejected by you</p>
                :
                project.projectProposals && project?.projectProposals[0].rejectReasonByAgency !== undefined ?
                  <>
                    <p>Project is rejected by the Client due to following reason</p>
                    <ul>
                      <li>{project?.projectProposals[0].rejectReasonByAgency}</li>
                    </ul>
                  </>
                  :
                  project.projectProposals && project?.projectProposals[0].isQuotationAcceptedByClient === true ?
                    <p>Please wait for the agency to accept the Quotation</p>
                    :
                    <>
                      <h4>Comments and Replies</h4>
                      {
                        loading ? <p style={{ textAlign: "center" }}>Comments are loading...</p>
                          :
                          project?.projectProposals &&
                            project.projectProposals[0]?.isAskedForQuotation === true ? (
                              <ClientCommentBox
                                projectId={projectId}
                                agencyId={agencyId}
                                isShortListed={true}
                                giveReplies={(gr) => {
                                  setRepliedToClient(gr);
                                }}
                                isQuotationAcceptedByClient={project.projectProposals[0].isQuotationAcceptedByClient}
                                comments={project.projectProposals[0]?.comments}
                                isCommentSectionActive={
                                  project.projectProposals[0].isCommentSectionActive
                                }
                                isReplySectionActive={
                                  project.projectProposals[0].isReplySectionActive
                                }

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


                                isAskedForQuotation={true}
                                commentType="Quotation"


                              />
                            )
                            :
                            (
                              project?.projectProposals && (
                                <ClientCommentBox
                                  projectId={projectId}
                                  agencyId={agencyId}
                                  isShortListed={true}
                                  giveReplies={(gr) => {
                                    setRepliedToClient(gr);
                                  }}
                                  isQuotationAcceptedByClient={project.projectProposals[0].isQuotationAcceptedByClient}
                                  comments={project.projectProposals[0]?.comments}
                                  isCommentSectionActive={
                                    project.projectProposals[0].isCommentSectionActive
                                  }
                                  isReplySectionActive={
                                    project.projectProposals[0].isReplySectionActive
                                  }


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

                                  isAskedForQuotation={false}
                                  commentType="Shortlist"

                                />
                              )
                            )}
                    </>

            }


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
