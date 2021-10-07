/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./AgencyRespondedDetails.css";

import foods from "../../assets/images/Quotation/foods.png";
import completedImage from '../../assets/images/Newestdashboard/Project_completed/agency_detail_completed.svg'
import dot from '../../assets/images/Newestdashboard/Agency_Details/dot.svg'

import { connect } from "react-redux";
import instance from "../../Constants/axiosConstants";
import { useParams } from "react-router-dom";
import * as helper from "../../shared/helper";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import detailImage from '../../assets/images/details.png';

import AgencyCommentBox from '../Agency/AgencyCommentBox/AgencyCommentBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


function AgencyRespondedDetails(props) {
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
        console.log(response);
        setProject(response);
        setLoading(false);
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
      <div className="mainDetailHeader_agencyRespondedDetails">
        <div className="innerDetailHeader_agencyRespondedDetails">
          <div className="detailHeaderImage_agencyRespondedDetails">
            <div>
              <img src={project?.projectDomainId?.domainIcon} alt="logo" />
            </div>
          </div>
          <div className="headerInformation_agencyRespondedDetails">
            <div className="clientExperience">
              <div className="btnInfoDiv">
                <div className="rightBorder"></div>
                <div className="innerBtnInfoDiv" style={{ marginLeft: "0" }}>
                  <p>
                    {project?.projectName}
                  </p>
                </div>
              </div>
              <div className="innerBtnInfoDiv" style={{ marginLeft: "20px" }}>
                <p style={{ fontSize: '20px', color: '#45A4E4' }}>
                  {project?.projectDomainId?.domainName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="respondDescription_AgencyRespondedDetails">
        <h2 style={{color:"#707070"}}>About Your Project</h2>
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
            <p>{`$${project?.projectProposalCost}`}</p>
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
                  <div className="image_with_logo">
                    <div className="respondedDetails_afterCompletion">
                      <div className="project-details">
                        <h4>Project Details</h4>
                      </div>
                      <div className="project-details_child">
                      <span className="leftLine"></span>
                        <div className="respondedDetails_afterCompletion_child1">
                          <div  style={{marginTop:"2rem" }}>
                            <div className="question"style={{ width: '62%' }}>
                              <p>Client</p>
                            </div>
                            <div className="answer">
                              <p>{project?.clientId?.companyName}</p>
                            </div>
                          </div>

                          <div >
                            <div className="question" style={{ width: '62%' }}>
                              <p>Agency</p>
                            </div>
                            <div className="answer">
                              <p>{project?.projectProposals[0]?.agencyId?.agencyName}</p>
                            </div>
                          </div>

                          <div>
                            <div className="question"  style={{ width: '62%' }}>
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
                          <div className="project_is_completed">
                        <p>Project is completed from both side</p>
                      </div>
                      </div>
                      {/* <div className="project_is_completed">
                        <p>Project is completed from both side</p>
                      </div> */}
                    </div>
                    <div>
                      <img src={completedImage} alt="" />
                    </div>
                  </div>
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
                      )
                    }
                  </>
            }


          </div>

          <div className="agencyQuestions_AgencyRespondedDetails">
            <div className="straightAfterLine">
              <h4>Fixed Budget</h4>
              <ul style={{display:"flex",marginLeft:"-1rem"}}>
              <li style={{listStyle: "none"}}> <img className="dotImg"src={dot} alt="" /> Min ${project.projectProposalCost}</li>
              </ul>
            </div>

            {/* <div className="straightLineParent_agencyRespondedDetails">
              <div className="straightLine_AgencyRespondedDetails"></div>
              <div style={{ left: '0px' }} className="diamond_agencyRespondedDetails"></div>
              <div style={{ right: '0px' }} className="diamond_agencyRespondedDetails"></div>
            </div> */}

            <div className="straightAfterLine">
              <h4>Estimated Timeline</h4>
              <ul style={{display:"flex",marginLeft:"-1rem"}}>
             <li style={{listStyle: "none"}}> <img className="dotImg"src={dot} alt="" /> {`${project?.projectExpectedStartingDays} Days`}</li>
              </ul>
            </div>

            {/* <div className="straightLineParent_agencyRespondedDetails2">
              <div style={{ left: '0px' }} className="diamond_agencyRespondedDetails"></div>
              <div className="straightLine_AgencyRespondedDetails2"></div>
              <div style={{ right: '0px' }} className="diamond_agencyRespondedDetails"></div>
            </div> */}

            <div>
              <h4>Technology</h4>
              <ul style={{display:"grid" ,marginLeft: "-2rem", gridTemplateColumns:"auto"}}>
                {project.projectTechnologiesRequired && project?.projectTechnologiesRequired?.map((p) => {
                  return <li style={{listStyle: "none", display:"flex",alignItems:"flex-end"}}> <img className="dotImg"src={dot} alt="" />{p?.technologyName}</li>;
                })}
              </ul>
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
