/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AgencyRespondedDetails.css";

import foods from "../../assets/images/Quotation/foods.png";
import completedImage from "../../assets/images/Newestdashboard/Project_completed/agency_detail_completed.svg";
import dot from "../../assets/images/Newestdashboard/Agency_Details/dot.svg";

import { connect } from "react-redux";
import instance from "../../Constants/axiosConstants";
import { useParams } from "react-router-dom";
import * as helper from "../../shared/helper";
import { useHistory } from "react-router-dom";
import "react-responsive-modal/styles.css";
import detailImage from "../../assets/images/details.png";

import AgencyCommentBox from "../../Components/ProjectDetailCard/AgencyCommentBox/AgencyCommentBox";
import { useSelector } from "react-redux";
import useIsFirstRender from "../../Utils/useIsFirstRender";
import ProjectDetailCard from "../../Components/ProjectDetailCard/UpBar/ProjectDetailCard";
import afterAcceptOrReject from "../../Components/ProjectDetailCard/AfterAcceptOrReject/AfterAcceptOrReject";
import DownTechnologyDetail from "../../Components/ProjectDetailCard/DownBar/DownTechnologyDetail";

function AgencyRespondedDetails(props) {
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
  const routerHistory = useHistory();
  let { projectId } = useParams();
  projectId = helper.cleanParam(projectId);

  const Role = localStorage.getItem("role");
  const agencyId = localStorage.getItem("userId");

  const [isRepliedToClient, setRepliedToClient] = useState(false);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    getAllProjects();
  }, [isRepliedToClient, chatNotification]);

  return (
    <>
      <div
        className="mainDetailHeader_agencyRespondedDetails"
        style={{ backgroundImage: "none" }}
      >
        <div className="innerDetailHeader_agencyRespondedDetails">
          <div className="detailHeaderImage_agencyRespondedDetails">
            <div>
              <img src={foods} alt="logo" />
            </div>
          </div>
          <div className="headerInformation_agencyRespondedDetails">
            <div className="clientExperience">
              <div className="btnInfoDiv">
                <div className="rightBorder"></div>
                <div className="innerBtnInfoDiv project_name">
                  <p>{project?.projectName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="respondDescription_AgencyRespondedDetails">
        <h2 style={{ color: "#707070" }}>About Your Project</h2>
      </div>

      <ProjectDetailCard
        role="Agency"
        name={project?.clientId?.companyName}
        expectedTimeline={project?.projectExpectedStartingDays}
        projectProposalCost={project?.projectProposalCost}
        agencyExperience={project?.agencyExperience}
        projectType={project?.projectType}
        isShortListed={project?.projectProposals && project?.projectProposals[0]?.isShortListed}
        isAskedForQuotation={project?.projectProposals && project?.projectProposals[0]?.isAskedForQuotation}
        projectCreationDate={project?.createdAt} />

      <div className="ProjectDescriptionRespondedDetails">
        <h4 className="ProjectDescriptionRespondedDetails_heading">
          Project Description:
        </h4>
        <p className="ProjectDescriptionRespondedDetails_Paragraph">
          {project.projectDescription}
        </p>
      </div>

      <div className="agencyQuotation">
        <div className="innerAgencyQuotation">
          <div className="agencyQuotationDesc_AgencyRespondedDetails">
            {project.projectProposals &&
              project?.projectProposals[0].rejectReasonByClient !== undefined ? (
              <>
                <div className="project_rejection">
                  <p>Project is rejected by the Client due to following reason</p>
                  <ul>
                    <li>{project?.projectProposals[0].rejectReasonByClient}</li>
                  </ul>
                </div>
                <afterAcceptOrReject
                  role="Client"
                  companyName={project?.clientId?.companyName}
                  agencyOrClientName={project?.projectProposals[0]?.agencyId?.agencyName}
                  finalCost={project?.projectProposals[0]?.finalCostByClient}
                  projectCreationDate={project?.createdAt}
                  expectedTimeline={project?.projectExpectedStartingDays}
                  projectType={project?.projectType}
                  isQuotationAcceptedByClient={project.projectProposals[0].isQuotationAcceptedByClient}
                  isQuotationAcceptedByAgency={project?.projectProposals[0].isQuotationAcceptedByAgency}
                />
              </>
            ) : project.projectProposals && project?.projectProposals[0].rejectReasonByAgency !== undefined ? (
              <>
                <div className="project_rejection">
                  <p>Project is rejected by you</p>
                </div>
                <afterAcceptOrReject
                  role="Client"
                  companyName={project?.clientId?.companyName}
                  agencyOrClientName={project?.projectProposals[0]?.agencyId?.agencyName}
                  finalCost={project?.projectProposals[0]?.finalCostByClient}
                  projectCreationDate={project?.createdAt}
                  expectedTimeline={project?.projectExpectedStartingDays}
                  projectType={project?.projectType}
                  isQuotationAcceptedByClient={project.projectProposals[0].isQuotationAcceptedByClient}
                  isQuotationAcceptedByAgency={project?.projectProposals[0].isQuotationAcceptedByAgency}
                />
              </>
            ) : project.projectProposals &&
              project?.projectProposals[0].isQuotationAcceptedByClient === true &&
              project?.projectProposals[0].isQuotationAcceptedByAgency === true ? (
              <div className="image_with_logo">
                <afterAcceptOrReject
                  role="Client"
                  companyName={project?.clientId?.companyName}
                  agencyOrClientName={project?.projectProposals[0]?.agencyId?.agencyName}
                  finalCost={project?.projectProposals[0]?.finalCostByClient}
                  projectCreationDate={project?.createdAt}
                  expectedTimeline={project?.projectExpectedStartingDays}
                  projectType={project?.projectType}
                  isQuotationAcceptedByClient={project.projectProposals[0].isQuotationAcceptedByClient}
                  isQuotationAcceptedByAgency={project?.projectProposals[0].isQuotationAcceptedByAgency}
                />
                {/* <div className="respondedDetails_afterCompletion">
                  <div className="project-details">
                    <h4>Project Details</h4>
                  </div>
                  <div className="project-details_child">
                    <span className="leftLine"></span>
                    <div className="respondedDetails_afterCompletion_child1">
                      <div style={{ marginTop: "2rem" }}>
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
                    <div className="project_is_completed_parent">
                      <div className="project_is_completed">
                        <p>Project is started from both side</p>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div style={{ display: "flex", justifyContent: "center" }} className="completedImage">
                  <img src={completedImage} alt="" />
                </div>
              </div>
            ) : (
              <>
                {project.projectProposals &&
                  project?.projectProposals[0].isQuotationAcceptedByClient === false &&
                  <h4>Comments and Replies</h4>
                }
                {loading ? (
                  <p style={{ textAlign: "center" }}>Comments are loading...</p>
                ) : project?.projectProposals &&
                  project.projectProposals[0]?.isAskedForQuotation === true ? (
                  <AgencyCommentBox
                    giveReplies={(gr) => {
                      setRepliedToClient(gr);
                    }}
                    projectId={projectId}
                    isAskedForQuotation={true}
                    isShortListed={true}
                    commentType="Quotation"
                    {...project}
                  />
                ) : (
                  project?.projectProposals && (
                    <AgencyCommentBox
                      giveReplies={(gr) => {
                        setRepliedToClient(gr);
                      }}
                      projectId={projectId}
                      isAskedForQuotation={false}
                      isShortListed={true}
                      commentType="Shortlist"
                      {...project}
                    />
                  )
                )}
              </>
            )}
          </div>

          <DownTechnologyDetail
            projectProposalCost={project?.projectProposalCost}
            estimatedTimeline={project?.projectExpectedStartingDays}
            projectTechnologiesRequired={project?.projectTechnologiesRequired}
            services={project?.projectServicesRequired} />

          {/* <div className="agencyQuestions_AgencyRespondedDetails">
            <div className="straightAfterLine">
              <h4>Fixed Budget</h4>
              <ul style={{ display: "flex", marginLeft: "-1rem" }}>
                <li style={{ listStyle: "none" }}>
                  {" "}
                  <img className="dotImg" src={dot} alt="" /> Min $
                  {project.projectProposalCost}
                </li>
              </ul>
            </div>

            <div className="straightAfterLine">
              <h4>Espected Timeline</h4>
              <ul style={{ display: "flex", marginLeft: "-1rem" }}>
                <li style={{ listStyle: "none" }}>
                  {" "}
                  <img className="dotImg" src={dot} alt="" />{" "}
                  {`${project?.projectExpectedStartingDays} Days`}
                </li>
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
            )} */}
          {/* <div>
              <h4>Technology</h4>
              <ul style={{ display: "grid", marginLeft: "-2rem", gridTemplateColumns: "auto" }}>
                {project.projectTechnologiesRequired && project?.projectTechnologiesRequired?.map((p) => {
                  return <li style={{ listStyle: "none", display: "flex", alignItems: "flex-end" }}> <img className="dotImg" src={dot} alt="" />{p?.technologyName}</li>;
                })}
              </ul>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.notification,
  };
};

export default connect(mapStateToProps)(AgencyRespondedDetails);
