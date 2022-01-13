/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AgencyRespondedDetails.css";

import foods from "../../assets/images/Quotation/foods.png";

import { connect } from "react-redux";
import instance from "../../Constants/axiosConstants";
import { useParams } from "react-router-dom";
import "react-responsive-modal/styles.css";

import AgencyCommentBox from "../../Components/ProjectDetailCard/AgencyCommentBox/AgencyCommentBox";
import { useSelector } from "react-redux";
import useIsFirstRender from "../../Utils/useIsFirstRender";
import ProjectDetailCard from "../../Components/ProjectDetailCard/UpBar/ProjectDetailCard";
import AfterAcceptOrRejectComponent from "../../Components/ProjectDetailCard/AfterAcceptOrReject/AfterAcceptOrReject";
import DownTechnologyDetail from "../../Components/ProjectDetailCard/DownBar/DownTechnologyDetail";
import { AGENCY } from "../../shared/constants";

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
  let { projectId } = useParams();

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
        role={AGENCY}
        name={project?.clientId?.companyName}
        expectedTimeline={project?.projectExpectedStartingDays}
        projectProposalCost={project?.projectProposalCost}
        agencyExperience={project?.agencyExperience}
        projectType={project?.projectType}
        isShortListed={project?.projectProposals && project?.projectProposals[0]?.isShortListed}
        isAskedForQuotation={project?.projectProposals && project?.projectProposals[0]?.isAskedForQuotation}
        projectCreationDate={project?.createdAt} 
        projectStartDate = {project?.projectProposals?.[0]?.projectStartDateByClient}
        projectDelayedStartDateByClient = {project?.projectProposals?.[0]?.projectDelayedStartDateByClient}
        projectEndDate = {project?.projectProposals?.[0]?.projectEndDateByClient} 
        projectExpectedEndDateByClient = {project?.projectProposals?.[0]?.projectExpectedEndDateByClient}
        agencyStartDate = {project?.projectStartDate} 
        />

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
              <div className="project_rejection">
                <p>Project is rejected by the Client due to following reason</p>
                <ul>
                  <li>{project?.projectProposals[0].rejectReasonByClient}</li>
                </ul>
              </div>
            ) : project.projectProposals &&
            project?.projectProposals[0].rejectReasonByAgency !== undefined && (
              <div className="project_rejection">
                <p>Project is rejected by you</p>
              </div>
            )
            }
          
            {project?.projectProposals &&
              <AgencyCommentBox
                giveReplies={(gr) => {
                  setRepliedToClient(gr);
                }}
                replyToClient={isRepliedToClient}
                projectId={projectId}
                commentType="Quotation"
                {...project}
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

const mapStateToProps = (state) => {
  return {
    projects: state.notification,
  };
};

export default connect(mapStateToProps)(AgencyRespondedDetails);
