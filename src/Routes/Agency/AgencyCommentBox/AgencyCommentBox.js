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

import proposalImage from '../../../assets/images/proposalImage.png'

let isRepliedToClient = false;

const AgencyCommentBox = (props) => {
  console.log(props);
  const [apiData, setApiData] = useState({
    agencyId: localStorage.getItem("userId"),
    isShortListed: true,
    reply: "",
  });

  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [rejectErrors, setRejectErrors] = useState('');

  const [quotationAcceptForm, setQuotationAcceptForm] = useState({
    agencyId: localStorage.getItem("userId"),
    isQuotationAcceptedByAgency: true,
    projectFinalCost: props.finalCostByClient
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  const [quotationRejectionForm, setQuotationRejectionForm] = useState({
    rejectReasonByAgency: '',
    agencyId: localStorage.getItem("userId") || "",
    isQuotationAcceptedByAgency: false,
  })

  const onQuotationRejectionChange = (event) => {
    const { name, value } = event.target
    setQuotationRejectionForm({
      ...quotationRejectionForm,
      [name]: value
    })
  }

  const onQuotationAcceptChange = (event) => {
    const { name, value } = event.target
    setQuotationAcceptForm({
      ...quotationAcceptForm,
      [name]: value
    })
  }

  const checkErrors = () => {
    if (quotationRejectionForm.rejectReasonByAgency === '' || quotationRejectionForm.rejectReasonByAgency === undefined) {
      setRejectErrors("Field can't be empty");
      return false;
    }
    else {
      return true;
    }
  }

  const handleProjectAcceptance = () => {
    if (quotationAcceptForm.finalPrice !== null) {
      instance
        .patch(`api/client/projects/proposal-action/${props.projectId}`, quotationAcceptForm)
        .then(function (response) {
          props.giveReplies(true);
        });
    } else {
      toast.error("Final cost cannot be empty.");
    }
  };
  const handleProjectRejection = () => {
    if (checkErrors()) {
      instance
        .patch(`api/client/projects/proposal-action/${props.projectId}`, quotationRejectionForm)
        .then(function (response) {
          props.giveReplies(true);
        })
        .catch(err => {
          console.log(err)
        })
    }
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
        .catch((err) => { });
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
      <div className="commentBox">
        <div className="topLine" style={{
        }}></div>
        {props.projectProposals[0].isQuotationAcceptedByClient === true ?
          <p>Quotation accepted by client!!.Waiting for your side</p>
          :
          !props.projectProposals[0].isRepliedToClient &&
          props.projectProposals[0].comments &&
          props.projectProposals[0].comments.map((index) => {
            if (index.commentType === props.commentType) {
              return (
                <>
                  <div className="chatBox-parent">
                    {index.comment && (
                      <div className="chatBox" >
                        <p style={{ backgroundColor: '#93E9FF' }}>{index.comment}</p>
                        <b>Client </b>
                      </div>
                    )}
                    {index.reply && (
                      <div className="chatBox chatBox-left">
                        <p style={{ backgroundColor: '#e1f9ff' }}>{index.reply}</p>
                        <b>Agency </b>
                      </div>
                    )}
                  </div>
                </>
              );
            } else {
              return "";
            }
          })
        }

        <div className="postQuotation">
          {props.projectProposals[0].isAskedForQuotation &&
            (props.projectProposals[0].agencyNegotiablePrice === null || props.projectProposals[0].agencyNegotiablePrice === undefined) && (
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

          {props.projectProposals[0].isReplySectionActive &&
            props.projectProposals[0].isAskedForQuotation &&
            (props.projectProposals[0].quotationLink === null ||
              props.projectProposals[0].quotationLink === undefined) && (
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
          {props.projectProposals[0].isReplySectionActive && (
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
              <div className="reply-parent">
                <button className="reply-button" onClick={() => { replyApi() }}>
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
        {props.projectProposals[0].isQuotationAcceptedByClient === false
          && !props.projectProposals[0].isCommentSectionActive
          && !props.projectProposals[0].isReplySectionActive
          && (
            <div>
              <p>Conversation Over.</p>
            </div>
          )}
      </div>

      <div className='action-wait'>
        <div className="postQuotation">
          {props.projectProposals[0].clientNegotiablePrice && props.projectProposals[0].clientNegotiablePrice !== null && (
            <div className="detailsButtons md-m10">
              <p>
                <b>{`Client Negotiatiable Price: `}</b>
                {props.projectProposals[0].clientNegotiablePrice}
              </p>
            </div>
          )}
          {props.projectProposals[0].agencyNegotiablePrice && props.projectProposals[0].agencyNegotiablePrice !== null && (
            <div className="detailsButtons md-m10" >
              <p>
                <b>{`Agency Negotiatiable Price: `}</b>
                {props.projectProposals[0].agencyNegotiablePrice}
              </p>
            </div>
          )}

          {props.projectProposals[0].quotationLink && props.projectProposals[0].quotationLink !== "" && (
            <div className="detailsButtons md-m10">
              <a href={props.projectProposals[0].quotationLink} target="new">
                View Quotation
              </a>
            </div>
          )}
        </div>

        {!(
          props.projectProposals[0].isQuotationAcceptedByAgency && props.projectProposals[0].isQuotationAcceptedByClient
        ) && (
            <div className="proposalCard">
              {/* className={`${props.isProposalActionActive && props.isQuotationAcceptedByClient
                ? ""
                : "disabled"}`}> */}
              <div className="yellowBg">
                <img src={proposalImage} alt="" />
              </div>
              <div style={{ display: `${props.projectProposals[0].isProposalActionActive && props.projectProposals[0].isQuotationAcceptedByClient}` ? '' : 'none' }} className="detailsButtons /*md-flex*/ height">
                {props.projectProposals[0].isProposalActionActive ?
                  <>
                    <div>
                      <p>Accept or Reject the Project.</p>
                    </div>
                    <div>
                      <button className="acceptButton" onClick={() => { setOpen(true) }}>
                        Accept
                      </button>
                      <button className="rejectButton" onClick={() => setOpenWithdrawModal(true)}>
                        Reject
                      </button>
                    </div>
                  </>
                  :
                  props.projectProposals[0].isReplySectionActive === 'false' &&
                  <p className="color-black">Please provide some reply</p>
                }
              </div>
            </div>
          )}
      </div>
      <Modal open={open} onClose={() => { setOpen(false) }}
        classNames={{ overlay: "customOverlayAgencyProduct", modal: "customModalAgencyProduct" }}
        center
      >
        <div className="modalHeaderProduct">
          <h2>Accept Project</h2>
        </div>
        <div className="productModalForm">
          <div className="quotationTable">
            <div className="tableHeaderQuotation">
              <p>Final Cost </p>
            </div>
            <div className="tableContentQuotation">
              <p>{props.projectProposals[0].finalCostByClient}</p>
            </div>
          </div>

          <div className="quotationTable">
            <div className="tableHeaderQuotation">
              <p>Project Start Date By Client</p>
            </div>
            <div className="tableContentQuotation">
              <p><Moment format="D MMM YYYY" withTitle>{props.projectStartDateByClient}</Moment></p>
            </div>
          </div>

          <div className="quotationTable">
            <div className="tableHeaderQuotation">
              <p>Project Delayed Start Date By Client</p>
            </div>
            <div className="tableContentQuotation">
              <p><Moment format="D MMM YYYY" withTitle>{props.projectDelayedStartDateByClient}</Moment></p>
            </div>
          </div>

          <div className="quotationTable">
            <div className="tableHeaderQuotation">
              <p>Project End Date By Client</p>
            </div>
            <div className="tableContentQuotation">
              <p><Moment format="D MMM YYYY" withTitle>{props.projectEndDateByClient}</Moment></p>
            </div>
          </div>

          <div className="quotationTable">
            <div className="tableHeaderQuotation">
              <p>Project Expected End Date By Client</p>
            </div>
            <div className="tableContentQuotation">
              <p><Moment format="D MMM YYYY" withTitle>{props.projectExpectedEndDateByClient}</Moment></p>
            </div>
          </div>

          <div className="quotationTable">
            <div className="tableHeaderQuotation">
              <p>Project Start Date By You</p>
            </div>
            <div className="tableContentQuotation">
              <input type='date' name='projectStartDate' onChange={onQuotationAcceptChange} />
            </div>
          </div>
        </div>
        <div className="connectedButton">
          <p onClick={handleProjectAcceptance}>
            Accept<i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
          </p>
        </div>
      </Modal>

      <Modal open={openWithdrawModal} onClose={() => { setOpenWithdrawModal(false) }}
        classNames={{ overlay: "customOverlayAgencyProduct", modal: "customModalAgencyProduct" }}
        center>
        <div className="quotationTable">
          <div className="tableHeaderQuotation">
            <p>Reason for Rejection</p>
          </div>
          <div className="tableContentQuotation">
            <input type='text' name='rejectReasonByAgency' onChange={onQuotationRejectionChange} />
            {rejectErrors !== undefined && (
              <p
                style={{
                  color: "red",
                  fontWeight: "normal",
                  fontSize: "14px",
                }}
              >
                {rejectErrors}
              </p>
            )
            }
          </div>
        </div>
        <button onClick={() => handleProjectRejection()}>Yes</button>
      </Modal>

    </div>
  );
};

export default AgencyCommentBox