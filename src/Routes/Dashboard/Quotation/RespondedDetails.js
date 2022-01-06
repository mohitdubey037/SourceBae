/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./RespondedDetails.css";
import instance from "../../../Constants/axiosConstants";
import { useParams } from "react-router-dom";
import ClientCommentBox from "../../../Components/ProjectDetailCard/ClientCommentBox/ClientCommentBox";
import foods from "../../../assets/images/Quotation/foods.png";
import { useSelector } from "react-redux";
import useIsFirstRender from "../../../Utils/useIsFirstRender";
import ProjectDetailCard from "../../../Components/ProjectDetailCard/UpBar/ProjectDetailCard";
import DownTechnologyDetail from "../../../Components/ProjectDetailCard/DownBar/DownTechnologyDetail";
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

  const Role = localStorage.getItem("role");

  const getAllProjects = () => {
    instance
      .get(`api/${Role}/projects/get/${projectId}?agencyId=${agencyId}`)
      .then(function (response) {
        setProject(response);
      })
  };


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
          isShortListed={project?.projectProposals[0].isShortListed}
          isAskedForQuotation={project?.projectProposals[0].isAskedForQuotation}
          projectCreationDate={project?.createdAt} />
      }

      <div className="ProjectDescriptionRespondedDetails">
        <h4 className="ProjectDescriptionRespondedDetails_heading">Project Description:</h4>
        <p className="ProjectDescriptionRespondedDetails_Paragraph">{project.projectDescription}</p>
      </div>

      <div className="agencyQuotation">
        <div className="innerAgencyQuotation">
          <div className="agencyQuotationDesc_AgencyRespondedDetails">
            {
              project?.projectProposals &&
                project?.projectProposals[0]?.rejectReasonByClient !== undefined ? (
                <>
                  <div className="project_rejection">
                    <p>Project is rejected by you</p>
                  </div>
                </>
              ) :
                project.projectProposals &&
                project?.projectProposals[0]?.rejectReasonByAgency !== undefined && (
                  <>
                    <div className="project_rejection">
                      <p>Project is rejected by the Agency due to following reason</p>
                      <ul>
                        <li>{project?.projectProposals[0]?.rejectReasonByAgency}</li>
                      </ul>
                    </div>
                  </>
                )
            }
            {/* project.projectProposals &&
            (project?.projectProposals[0]?.isQuotationAcceptedByClient === true ||
            project?.projectProposals[0]?.isQuotationAcceptedByAgency === true) ? (
            <ClientCommentBox 
              //     projectId={projectId}
              //     agencyId={agencyId}
              //     isShortListed={true}
              //     giveReplies={(gr) => {
              //       setRepliedToClient(gr);
              //     }}
              //     {...project}
              //     isAskedForQuotation={true}
              //     commentType="Quotation"
              //   />
              // ) :
              {
                    // project?.projectProposals &&
              // project?.projectProposals[0]?.isQuotationAcceptedByClient ===
              // true ?
              // <p>Please wait for the agency to accept the Quotation</p>
              // :
              // (
              //   <>
              //     <h4>Comments and Replies</h4>
              //     {loading ? <p className="comments_are_loading">Comments are loading...</p> :
              */}
            {project?.projectProposals &&
              <ClientCommentBox
                projectId={projectId}
                agencyId={agencyId}
                // isShortListed={true}
                giveReplies={(gr) => {
                  setRepliedToClient(gr);
                }}
                {...project}
                // isAskedForQuotation={true}
                // commentType="Quotation"
              />
            }
          </div>

          <DownTechnologyDetail
            projectProposalCost={project?.projectProposalCost}
            estimatedTimeline={project?.projectExpectedStartingDays}
            projectTechnologiesRequired={project?.projectTechnologiesRequired}
            services={project?.projectServicesRequired} />

        </div>
      </div>
    </>
  );
}

export default RespondedDetails;
