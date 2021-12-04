/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./RespondedDetails.css";
import Moment from "react-moment";
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import ClientCommentBox from "../../Client/ClientCommentBox/ClientCommentBox";
// import detailImage from '../../../assets/images/details.png';
import foods from "../../../assets/images/Quotation/foods.png";
import completedImage from "../../../assets/images/Newestdashboard/Project_completed/agency_detail_completed.svg";
import loadingStatus from "../../../assets/images/Newestdashboard/Not_found/loading_status2.jpg";
import dot from "../../../assets/images/Newestdashboard/Agency_Details/dot.svg";
import { useSelector } from "react-redux";
import useIsFirstRender from "../../../Utils/useIsFirstRender";
import ProjectDetailCard from "../../../Components/ProjectDetailCard/ProjectDetailCard";
//RESPONDED DETAILS
function RespondedDetails(props) {
  const isFirstRender = useIsFirstRender();
  const [chatNotification, setChatNotification] = useState(-1);
  useSelector((state) => {
    if (
      !isFirstRender &&
      state?.notification > 0 &&
      chatNotification !== state.notification
    ) {
      setChatNotification(state?.notification);
    }
  });

  let { projectId, agencyId } = useParams();
  const [isRepliedToClient, setRepliedToClient] = useState(false);
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);

  const Role = localStorage.getItem("role");

  const getAllProjects = () => {
    setLoading(true);
    instance
      .get(`api/${Role}/projects/get/${projectId}?agencyId=${agencyId}`)
      .then(function (response) {
        setProject(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => { }, [project]);

  // useEffect(() => {
  //   // if (Object.keys(props["projects"]).length === 0) {
  //   getAllProjects();
  //   // } else {
  //   setProject(props.projects);
  // }
  // [isRepliedToClient]);

  useEffect(() => {
    getAllProjects();
  }, [isRepliedToClient, chatNotification]);

  return (
    <>
      <div className="mainDetailHeader_agencyRespondedDetails">
        <div className="innerDetailHeader_agencyRespondedDetails">
          <div className="detailHeaderImage_agencyRespondedDetails">
            <div>
              <img src={foods} alt="" />
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
                <div
                  className="rightBorder"
                  style={{ backgroundColor: "#ffffff" }}
                ></div>
                <div className="innerBtnInfoDiv project_name">
                  <p>{project?.projectName}</p>
                </div>
              </div>
              {/* <div
                className="innerBtnInfoDiv"
                style={{ marginLeft: "20px", color: "#ffffff" }}
              >
                <p style={{ fontSize: "20px", color: "#ffffff" }}>
                  {project?.projectDomainId?.domainName}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {project.projectProposals &&
        <ProjectDetailCard
          role="Client"
          name={project.projectProposals && project?.projectProposals[0]?.agencyId?.agencyName}
          expectedTimeline={project?.projectExpectedStartingDays}
          projectProposalCost={project?.projectProposalCost}
          agencyExperience={project?.agencyExperience}
          projectType={project?.projectType}
          isShortListed={project.projectProposals[0].isShortListed}
          isAskedForQuotation={project.projectProposals[0].isAskedForQuotation}
          projectCreationDate={project?.createdAt} />
      }

      <div className="ProjectDescriptionRespondedDetails">
        <h4 className="ProjectDescriptionRespondedDetails_heading">Project Description:</h4>
        <p className="ProjectDescriptionRespondedDetails_Paragraph">{project.projectDescription}</p>
      </div>

      <div className="agencyQuotation">
        <div className="innerAgencyQuotation">
          <div className="agencyQuotationDesc_AgencyRespondedDetails">
            {project.projectProposals &&
              project?.projectProposals[0].rejectReasonByClient !== undefined ? (
              <div className="project_rejection">
                <p>Project is rejected by you</p>
              </div>
            ) : project.projectProposals &&
              project?.projectProposals[0].rejectReasonByAgency !==
              undefined ? (
              <div className="project_rejection">
                <p>Project is rejected by the Agency due to following reason</p>
                <ul>
                  <li>{project?.projectProposals[0].rejectReasonByAgency}</li>
                </ul>
              </div>
            ) : project.projectProposals &&
              (project?.projectProposals[0].isQuotationAcceptedByClient ===
                true ||
                project?.projectProposals[0].isQuotationAcceptedByAgency ===
                true) ? (
              <div className="image_with_logo">
                <div className="respondedDetails_afterCompletion">
                  <div className="project-details">
                    <h4>Project Details</h4>
                  </div>
                  <div className="project-details_child">
                    <div className="respondedDetails_afterCompletion_child1">
                      <div>
                        <div className="question" style={{ width: "62%" }}>
                          <p>Client</p>
                        </div>
                        <div className="answer">
                          <p>{project?.clientId?.companyName}</p>
                        </div>
                      </div>

                      <div>
                        <div className="question" style={{ width: "62%" }}>
                          <p>Agency</p>
                        </div>
                        <div className="answer">
                          <p>
                            {project?.projectProposals[0]?.agencyId?.agencyName}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="question" style={{ width: "62%" }}>
                          <p>Final Cost</p>
                        </div>
                        <div className="answer">
                          <p>
                            $ {project?.projectProposals[0].finalCostByClient}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="respondedDetails_afterCompletion_child2">
                      <div>
                        <div className="question after">
                          <p>Project Creation Date</p>
                        </div>
                        <div className="answer">
                          <p>
                            <Moment format="D MMM YYYY" withTitle>
                              {project?.createdAt}
                            </Moment>
                          </p>
                        </div>
                      </div>
                      {project.projectExpectedStartingDays !== 0 && (
                        <div>
                          <div className="question after">
                            <p>Expected Timeline</p>
                          </div>
                          <div className="answer">
                            <p>{`${project?.projectExpectedStartingDays} Days`}</p>
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="question after">
                          <p>Project Type</p>
                        </div>
                        <div className="answer">
                          <p>{project?.projectType}</p>
                        </div>
                      </div>
                    </div>
                    <div className="project_is_completed_parent">
                      <div className="project_is_completed">
                        {project?.projectProposals[0]
                          .isQuotationAcceptedByClient === true &&
                          project?.projectProposals[0].isQuotationAcceptedByAgency ===
                          true ? (
                          <p>Project is started from both side</p>
                        ) : (
                          <p>Please wait for the agency to accept the Quotation</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {project?.projectProposals[0].isQuotationAcceptedByClient ===
                    true &&
                    project?.projectProposals[0].isQuotationAcceptedByAgency ===
                    true ? (
                    <img style={{ width: "70%" }} src={completedImage} alt="" />
                  ) : (
                    <img style={{ width: "70%" }} src={loadingStatus} alt="" />
                  )}
                </div>
              </div>
            ) : project?.projectProposals &&
              project?.projectProposals[0].isQuotationAcceptedByClient ===
              true ? (
              <p>Please wait for the agency to accept the Quotation</p>
            ) : (
              <>
                <h4>Comments and Replies</h4>
                {loading ? (
                  <p style={{ textAlign: "center" }}>Comments are loading...</p>
                ) : project?.projectProposals &&
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
                ) : (
                  project?.projectProposals && (
                    <ClientCommentBox
                      projectId={projectId}
                      agencyId={agencyId}
                      isShortListed={true}
                      s
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
            )}
          </div>

          <div className="agencyQuestions_AgencyRespondedDetails">
            <div className="straightAfterLine">
              <h4>Fixed Budget</h4>
              <ul>
                <li style={{ listStyle: "none" }}>
                  {" "}
                  <img className="dotImg" src={dot} alt="" /> Min $
                  {project.projectProposalCost}
                </li>
              </ul>
            </div>
            <div className="straightAfterLine">
              <h4>Estimated Timeline</h4>
              <ul>
                <img className="dotImg" src={dot} alt="" />
                <li
                  style={{
                    listStyle: "none",
                    display: "flex",
                    marginLeft: "-4rem",
                  }}
                >{`${project?.projectExpectedStartingDays} Days`}</li>
              </ul>
            </div>

            {project?.projectTechnologiesRequired &&
              project?.projectTechnologiesRequired.length > 0 ? (
              <div>
                <h4>Technology</h4>
                <ul>
                  {project?.projectTechnologiesRequired?.map((p) => (
                    <>
                      <img className="dotImg" src={dot} alt="" />
                      <li style={{ listStyle: "none" }}>{p?.technologyName}</li>
                    </>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h4>Services</h4>
                <ul>
                  {project?.projectServicesRequired?.map((p) => (
                    <>
                      <img className="dotImg" src={dot} alt="" />
                      <li style={{ listStyle: "none" }}>{p?.serviceName}</li>
                    </>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     projects: state.projects,
//     condition: state.condition,
//   };
// };

export default RespondedDetails;
