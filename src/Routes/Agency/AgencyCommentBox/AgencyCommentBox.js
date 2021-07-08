import React, { useEffect, useState } from "react";
import "./AgencyCommentBox.css";

import foods from "../../../assets/images/Quotation/foods.png";

import instance from '../../../Constants/axiosConstants';
import { useParams } from "react-router-dom";
import * as helper from "../../../shared/helper";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

let isRepliedToClient = false;

const AgencyCommentBox = (props) => {
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
            (props.agencyNegotiablePrice === null || props.agencyNegotiablePrice === undefined) && (
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

export default AgencyCommentBox