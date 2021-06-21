import React, { useEffect, useState } from "react";
import "./RespondedDetails.css";

import foods from "../../../assets/images/Quotation/foods.png";
import agencyLogo from "../../../assets/images/Quotation/cegelec.svg";

import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import { Button } from '@material-ui/core'

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
  return (
    <div
      className="commentBox"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "1rem",
        margin: "2rem 1rem 1rem 1rem",
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
          <div
            style={{ display: "flex", flexDirection: "column", width: "30%" }}
          >
            <button
              style={{
                background: "none",
                minWidth: "80px",
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

      {!props.isAskedForQuotation &&
        props.isCommentSectionActive &&
        props.isShortListed && (
          <div className="detailsButtons">
            <button onClick={askForQuotation}>Ask For Quotation</button>
          </div>
        )}

      {props.isReplySectionActive && "Waiting for the reply from Agency."}

      <div className="postQuotation">
        {props.negotiablePrice && props.negotiablePrice !== null && (
          <div className="detailsButtons">
            <b>Negotiatiable Price:</b>
            {props.negotiablePrice}
          </div>
        )}

        {props.quotationLink && props.quotationLink !== "" && (
          <div className="detailsButtons">
            <a href={props.quotationLink} target="new">
              <button>Click to see Quotation</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

function RespondedDetails(props) {
  let { projectId, agencyId } = useParams();
  const routerHistory = useHistory();

  const [isRepliedToClient, setRepliedToClient] = useState(false)
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState()

  const Role = localStorage.getItem("role");
  const arr = [
    {
      title: "Food",
    },
    {
      title: "Meal Subscription",
    },
    {
      title: "Online Orderdering",
    },
    {
      title: "Menu & Reviews",
    },
  ];

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

  // useEffect(() => {
  //   console.log(project, "project");
  //   console.log(project.projectServicesRequired.map(p => console.log(p.serviceName)))
  // }, [project]);
  return (
    <>
      <div className="mainDetailHeader">
        <div className="innerDetailHeader">
          <div className="detailHeaderImage">
            <div>
              <img src={foods} alt="" />
            </div>
          </div>
          <div className="headerInformation">
            <div className="clientName">
              {project?.projectProposals?.length > 0 &&
                project?.projectProposals[0]?.isProposalActionActive && (
                  <div className="detailsButtons">
                    <button>Accept</button>
                    <button>Withdraw</button>
                  </div>
                )}
            </div>
            <div className="clientExperience">
              {arr.map((value, index) => {
                return (
                  <div className="btnInfoDiv">
                    <div className="rightBorder"></div>
                    <div
                      className="innerBtnInfoDiv"
                      style={{ marginLeft: index === 0 ? "0" : "20px" }}
                    >
                      <p
                        style={{
                          backgroundColor:
                            index === 0 ? "#02044a" : "transparent",
                          padding: index === 0 ? "0.2rem 1rem" : 0,
                          borderRadius: "999px",
                          color: index === 0 ? "#fff" : "#02044a",
                        }}
                      >
                        {value?.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '80%', marginTop: '35px' }}>
        <Button
          onClick={() => routerHistory.goBack()}
          style={{ background: 'none', border: 'none' }}
        >
          <i className='fa fa-arrow-left' style={{ fontSize: '1.5rem' }}></i>
        </Button>
      </div>

      <div className="respondDescription">
        <h2>About Your Project</h2>
        <p>{project?.projectName}</p>
      </div>

      <div className="respondCards">
        <div className="innerResponseCard">
          <span className="leftLine"></span>
          <div>
            <p>Expected Timeline</p>
            <p>45days</p>
          </div>
          <div>
            <p>Budget</p>
            {console.log(project)}
            <p style={{ fontWeight: "600" }}>{project?.projectProposalCost}</p>
          </div>
          <div>
            <p>Agency Experience</p>
            <p>{project?.agencyExperience}</p>
          </div>
          <div>
            <p>Documents</p>
            <p>-</p>
          </div>
        </div>
        <div className="innerResponseCard">
          <span className="leftLine"></span>
          <div>
            <p>Service Name</p>
            <p>{project?.projectServicesRequired?.length>0 && project?.projectServicesRequired[0]?.serviceName}</p>
          </div>
          <div>
            <p>Technology Name</p>
            <p>{project?.projectTechnologiesRequired?.length>0 && project?.projectTechnologiesRequired[0]?.technologyName}</p>
          </div>
          <div>
            <p>Testing and Q&A</p>
            <p>Testing Done</p>
          </div>
          <div>
            <p>Note</p>
            <p>{project.projectType}</p>
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
            <div className="agencyLogo">
              <img src={agencyLogo} alt="" />
            </div>
          </div>

          <div className="agencyQuotationDesc">
            <h4>Comments and Replies</h4>
            {loading ? <p style={{ textAlign: 'center' }}>Comments are loading...</p> :
              project?.projectProposals &&
                project.projectProposals[0]?.isAskedForQuotation === true ? (
                <CommentBox
                  giveReplies={(gr) => {
                    setRepliedToClient(gr)
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
                  negotiablePrice={project.projectProposals[0].negotiablePrice}
                  quotationLink={project.projectProposals[0].quotationLink}
                />
              ) : (
                project?.projectProposals && (
                  <CommentBox
                    giveReplies={(gr) => {
                      setRepliedToClient(gr)
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
                    negotiablePrice={project.projectProposals[0].negotiablePrice}
                    quotationLink={project.projectProposals[0].quotationLink}
                  />
                )
              )
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
