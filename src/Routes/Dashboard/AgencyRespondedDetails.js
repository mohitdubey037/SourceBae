/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AgencyRespondedDetails.css";

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
import detailImage from '../../assets/images/details.png'

import AgencyCommentBox from '../Agency/AgencyCommentBox/AgencyCommentBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


function AgencyRespondedDetails(props) {
  const routerHistory = useHistory();
  let { projectId } = useParams();
  projectId = helper.cleanParam(projectId);
  console.log(routerHistory);

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

  const goBack = () => {
    routerHistory.push({
      pathname: "/quotation",
      origin: routerHistory.location.origin
    })
  }

  return (
    <>
      {/* <div
        style={{ marginTop: "55px" }}
        className="backArrow"
        onClick={() =>
          routerHistory.replace({
            pathname: "/quotation",
            origin: routerHistory.location.origin,
          })
        }
      >
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </div> */}

      <div className="back-button_newestAddDeveloper">
        <div className="image-div_newestAddDeveloper">
          <div className="hover" onClick={goBack}>
            <ArrowBackIosIcon className="back-icon" />
          </div>
          <h6>Back</h6>
        </div>
        <div className="add-developer-div">
          <h6>Agency Responded Details</h6>
        </div>
      </div>
      <div className="mainDetailHeader_agencyRespondedDetails">
        <div className="innerDetailHeader_agencyRespondedDetails">
          <div className="detailHeaderImage_agencyRespondedDetails">
            <div>
              <img src={project?.projectDomainId?.domainIcon} alt="logo" />
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
                      backgroundColor: "transparent",
                      padding: "0rem 0.5rem",
                      borderRadius: "999px",
                      color: "#000",
                      fontSize: 28
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
                    color: "#3A3A3A",
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
            <p>{`${project?.projectProposals?.length > 0 &&
              project?.projectProposals[0]?.isShortListed
              ? "Yes"
              : "No"
              }`}</p>
          </div>
          <div>
            <p>Quotation Asked</p>
            <p>{`${project?.projectProposals?.length > 0 &&
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

      <div className="detailsContainer">
        <div className="innerDetailsContainer">
          <div className="detailsDiv">
            <img src={detailImage} />
            <h4>Details</h4>
          </div>
        </div>
      </div>
      <div className="agencyQuotation">
        <div className="innerAgencyQuotation">

          <div className="agencyQuotationDesc">
            {project.projectProposals && project?.projectProposals[0].rejectReasonByClient !== undefined ?
              <>
                <p>Project is rejected by the Client due to following reason</p>
                <ul>
                  <li>{project?.projectProposals[0].rejectReasonByClient}</li>
                </ul>
              </>
              :
              project.projectProposals && project?.projectProposals[0].rejectReasonByAgency !== undefined ?
                <p>Project is rejected by you</p>
                :
                project.projectProposals && project?.projectProposals[0].isQuotationAcceptedByClient === true
                  &&
                  project?.projectProposals[0].isQuotationAcceptedByAgency === true ?
                  <p>Project is completed from both side</p>
                  :
                  <>
                    {project.projectProposals && project?.projectProposals[0].isQuotationAcceptedByClient === false &&
                      <h4>Comments and Replies</h4>
                    }
                    {loading ? (
                      <p style={{ textAlign: "center" }}>Comments are loading...</p>
                    ) :
                      project?.projectProposals &&
                        project.projectProposals[0]?.isAskedForQuotation === true ? (
                        <AgencyCommentBox
                          giveReplies={(gr) => {
                            setRepliedToClient(gr);
                          }}
                          comments={project.projectProposals && project.projectProposals[0]?.comments}
                          commentType="Quotation"
                          isReplySectionActive={
                            project.projectProposals &&
                            project.projectProposals[0].isReplySectionActive
                          }
                          projectId={projectId}
                          isAskedForQuotation={true}
                          isShortListed={true}
                          clientNegotiablePrice={
                            project.projectProposals &&
                            project.projectProposals[0].clientNegotiablePrice
                          }
                          agencyNegotiablePrice={
                            project.projectProposals &&
                            project.projectProposals[0].agencyNegotiablePrice
                          }
                          quotationLink={project.projectProposals && project.projectProposals[0].quotationLink}
                          isProposalActionActive={
                            project.projectProposals &&
                            project.projectProposals[0].isProposalActionActive
                          }
                          isQuotationAcceptedByClient={
                            project.projectProposals &&
                            project.projectProposals[0].isQuotationAcceptedByClient
                          }
                          projectStartDateByClient={
                            project.projectProposals &&
                            project.projectProposals[0].projectStartDateByClient
                          }
                          projectDelayedStartDateByClient={
                            project.projectProposals &&
                            project.projectProposals[0].projectDelayedStartDateByClient
                          }
                          projectEndDateByClient={
                            project.projectProposals &&
                            project.projectProposals[0].projectEndDateByClient
                          }
                          projectExpectedEndDateByClient={
                            project.projectProposals &&
                            project.projectProposals[0].projectExpectedEndDateByClient
                          }
                          finalCostByClient={
                            project.projectProposals &&
                            project.projectProposals[0].finalCostByClient
                          }
                          rejectReasonByClient={
                            project.projectProposals &&
                            project.projectProposals[0].rejectReasonByClient
                          }

                        />
                      ) : (
                        project?.projectProposals && (
                          <AgencyCommentBox
                            giveReplies={(gr) => {
                              setRepliedToClient(gr);
                            }}
                            comments={project.projectProposals && project.projectProposals[0]?.comments}
                            commentType="Shortlist"
                            isReplySectionActive={
                              project.projectProposals &&
                              project.projectProposals[0].isReplySectionActive
                            }
                            isCommentSectionActive={
                              project.projectProposals &&
                              project.projectProposals[0].isCommentSectionActive
                            }
                            projectId={projectId}
                            isAskedForQuotation={false}
                            isShortListed={true}
                            clientNegotiablePrice={
                              project.projectProposals &&
                              project.projectProposals[0].clientNegotiablePrice
                            }
                            agencyNegotiablePrice={
                              project.projectProposals &&
                              project.projectProposals[0].agencyNegotiablePrice
                            }
                            quotationLink={project.projectProposals && project.projectProposals[0].quotationLink}
                            isProposalActionActive={
                              project.projectProposals &&
                              project.projectProposals[0].isProposalActionActive
                            }
                            isQuotationAcceptedByClient={
                              project.projectProposals &&
                              project.projectProposals[0].isQuotationAcceptedByClient
                            }
                            isQuotationAcceptedByAgency={
                              project.projectProposals &&
                              project.projectProposals[0].isQuotationAcceptedByAgency
                            }
                            projectStartDateByClient={
                              project.projectProposals &&
                              project.projectProposals[0].projectStartDateByClient
                            }
                            projectDelayedStartDateByClient={
                              project.projectProposals &&
                              project.projectProposals[0].projectDelayedStartDateByClient
                            }
                            projectEndDateByClient={
                              project.projectProposals &&
                              project.projectProposals[0].projectEndDateByClient
                            }
                            projectExpectedEndDateByClient={
                              project.projectProposals &&
                              project.projectProposals[0].projectExpectedEndDateByClient
                            }
                            finalCostByClient={
                              project.projectProposals &&
                              project.projectProposals[0].finalCostByClient
                            }
                            rejectReasonByClient={
                              project.projectProposals &&
                              project.projectProposals[0].rejectReasonByClient
                            }
                          />
                        )
                      )
                    }
                  </>
            }


          </div>

          <div className="agencyQuestions">
            <div className="straightAfterLine">
              <h4>Fixed Budget</h4>
              <ul>
                <li>Min $5000</li>
              </ul>
            </div>
            <div className="straightAfterLine">
              <h4>Estimated Timeline</h4>
              <ul>
                <li>45days</li>
              </ul>
            </div>
            <div>
              <h4>Technology</h4>
              <ul>
                {project.projectTechnologiesRequired && project?.projectTechnologiesRequired?.map((p) => {
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

export default connect(mapStateToProps)(AgencyRespondedDetails);
