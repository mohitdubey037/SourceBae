/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './RespondedDetails.css'
import Moment from 'react-moment';
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import ClientCommentBox from "../../Client/ClientCommentBox/ClientCommentBox";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import detailImage from '../../../assets/images/details.png';
import completedImage from '../../../assets/images/Newestdashboard/Project_completed/agency_detail_completed.svg'
//RESPONDED DETAILS
function RespondedDetails(props) {
  console.log(props);
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
        setProject(response);
        console.log(response, 'response');
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
      getAllProjects();
    } else {
      setProject(props.projects);
    }
  }, [isRepliedToClient]);

  return (
    <>
      {/* <div className="back-button_AgencyRespondedDetails">
        <div className="image-div_AgencyRespondedDetails">
          <div className="hover" onClick={() => routerHistory.goBack()}>
            <ArrowBackIosIcon className="back-icon" />
          </div>
          <h6>Back</h6>
        </div>
        <div className="add-developer-div">
          <h6>Responded Details</h6>
        </div>
      </div> */}

      <div className="mainDetailHeader_agencyRespondedDetails">
        <div className="innerDetailHeader_agencyRespondedDetails">
          <div className="detailHeaderImage_agencyRespondedDetails">
            <div>
              <img src={project?.projectDomainId?.domainIcon} alt="" />
            </div>
          </div>
          <div className="headerInformation_agencyRespondedDetails">
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

      <div className="respondDescription_AgencyRespondedDetails">
        <h2>About Your Project</h2>
        <p>{project?.projectName}</p>
      </div>

      <div className="respondCards_AgencyRespondedDetails">
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

      {/* <div className="detailsContainer">
        <div className="innerDetailsContainer">
          <div className="detailsDiv">
            <img src={detailImage} />
            <h4>Details</h4>
          </div>
        </div>
      </div> */}

      <div className="agencyQuotation">
        <div className="innerAgencyQuotation">
          <div className="agencyQuotationDesc_AgencyRespondedDetails">
            {
              project.projectProposals && project?.projectProposals[0].rejectReasonByClient !== undefined ?
                <p>Project is rejected by you</p>
                :
                project.projectProposals && project?.projectProposals[0].rejectReasonByAgency !== undefined ?
                  <>
                    <p>Project is rejected by the Agency due to following reason</p>
                    <ul>
                      <li>{project?.projectProposals[0].rejectReasonByAgency}</li>
                    </ul>
                  </>
                  :
                  project.projectProposals && project?.projectProposals[0].isQuotationAcceptedByClient === true
                    &&
                    project?.projectProposals[0].isQuotationAcceptedByAgency === true ?
                    <div className="image_with_logo">
                      <div className="respondedDetails_afterCompletion">
                        <div className="project-details">
                          <h4>Project Details</h4>
                        </div>
                        <div className="project-details_child">
                          <div className="respondedDetails_afterCompletion_child1">
                            <div style={{ width: '80%' }}>
                              <div className="question">
                                <p>Client</p>
                              </div>
                              <div className="answer">
                                <p>{project?.clientId?.companyName}</p>
                              </div>
                            </div>

                            <div style={{ width: '80%' }}>
                              <div className="question">
                                <p>Agency</p>
                              </div>
                              <div className="answer">
                                <p>{project?.projectProposals[0]?.agencyId?.agencyName}</p>
                              </div>
                            </div>

                            <div style={{ width: '80%' }}>
                              <div className="question">
                                <p>Cost</p>
                              </div>
                              <div className="answer">
                                <p>{project?.projectProposalCost}</p>
                              </div>
                            </div>
                          </div>

                          <div className="respondedDetails_afterCompletion_child2">
                            <div>
                              <div className="question after">
                                <p>Project Creation Date</p>
                              </div>
                              <div className="answer">
                                <p><Moment format="D MMM YYYY" withTitle>{project?.createdAt}</Moment></p>
                              </div>
                            </div>
                            <div>
                              <div className="question after">
                                <p>Expected Timeline</p>
                              </div>
                              <div className="answer">
                                <p>{`${project?.projectExpectedStartingDays} Days`}</p>
                              </div>
                            </div>
                            <div>
                              <div className="question after">
                                <p>Project Type</p>
                              </div>
                              <div className="answer">
                                <p>{project?.projectType}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="project_is_completed">
                          <p>Project is completed from both side</p>
                        </div>
                      </div>
                      <div>
                        <img src={completedImage} alt="" />
                      </div>
                    </div>
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
                                {...project}
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
                                    {...project}
                                    isAskedForQuotation={false}
                                    commentType="Shortlist"
                                  />
                                )
                              )}
                      </>
            }
          </div>

          <div className="agencyQuestions_AgencyRespondedDetails">
            <div className="straightAfterLine">
              <h4>Fixed Budget</h4>
              <ul>
                <li>Min ${project.projectProposalCost}</li>
              </ul>
            </div>
            <div className="straightAfterLine">
              <h4>Estimated Timeline</h4>
              <ul>
                <li>{`${project?.projectExpectedStartingDays} Days`}</li>
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
            {/* <div>
              <h4>{props?.projectFiles}</h4>
              <p>-</p>
            </div> */}
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
