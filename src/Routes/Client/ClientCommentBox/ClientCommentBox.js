import React, { useEffect, useState } from "react";

import foods from "../../../assets/images/Quotation/foods.png";
import Moment from 'react-moment';
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import proposalImage from '../../../assets/images/proposalImage.png';
import './ClientCommentBox.css';

const ClientCommentBox = (props) => {
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const [openRejectionModal, setOpenRejectionModal] = useState(false);

  const [quotationFormData, setQuotationFormData] = useState({
    agencyId: props?.agencyId || "",
    isQuotationAcceptedByClient: true
  })

  const [quotationRejectionForm, setQuotationRejectionForm] = useState({
    rejectReasonByClient: '',
    agencyId: props?.agencyId || "",
    isQuotationAcceptedByClient: false,
  })

  const onQuotationChange = (event) => {
    const { name, value } = event.target;
    setQuotationFormData({
      ...quotationFormData,
      [name]: value
    })
  }

  const onQuotationRejectionChange = (event) => {
    const { name, value } = event.target
    setQuotationRejectionForm({
      ...quotationRejectionForm,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(quotationFormData);
  }, [quotationFormData])

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
      isAskedForQuotation: true,
      negotiablePrice: "",
      comment: "Please provide a Quotation.",
    };
    instance.patch(`api/client/projects/propose/${props.projectId}`, quotationData)
      .then(function (response) {
        props.giveReplies(true);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleProjectAcceptance = () => {
    instance.patch(`api/client/projects/proposal-action/${props.projectId}`, quotationFormData)
      .then(function (response) {
        props.giveReplies(true);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleProjectRejection = () => {
    instance.patch(`api/client/projects/proposal-action/${props.projectId}`, quotationRejectionForm)
      .then(function (response) {
        props.giveReplies(true);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          className="commentBox"
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            margin: "2rem 1rem 1rem 1rem",
            width: "100%",
            boxShadow: '0 1px 2px 1px rgba(0,0,0,0.2)',
            height: '400px',
            overflow: 'scroll',
            position: 'relative'
          }}
        >
          <div className="topLine" style={{
          }}></div>
          {props.comments.map((index) => {
            if (index.commentType === props.commentType) {
              return (
                <>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {index.comment && (
                      <div className="chatBox" style={{ textAlign: 'right', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <b>Client </b>
                        <p style={{ backgroundColor: '#93E9FF' }}>{index.comment}</p>
                      </div>
                    )}

                    {index.reply && (
                      <div className="chatBox" style={{ textAlign: 'left', justifyContent: 'flex-start', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <b>Agency </b>
                        <p style={{ backgroundColor: '#e1f9ff' }}>{index.reply}</p>
                      </div>
                    )}
                  </div>
                </>
              );
            } else {
              return "";
            }
          })}

          {props.isAskedForQuotation && props.isCommentSectionActive &&
            (
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
                {(props.clientNegotiablePrice === null ||
                  props.clientNegotiablePrice === undefined) && (
                    <div className="postQuotation">
                      <div style={{ display: "flex" }}>
                        <b>Client Negotiatiable Price:</b>
                        <div className="negotiablePrice">
                          <input
                            type="number"
                            name="clientNegotiablePrice"
                            placeholder="negotiable price"
                            value={apiData.clientNegotiablePrice}
                            onChange={(event) => handleChange(event)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                <div
                  style={{ display: "flex", flexDirection: "column", width: "30%" }}
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
          {!props.isCommentSectionActive && !props.isReplySectionActive && (
            <div>
              <p>Coversation Over.</p>
            </div>
          )}
          {!props.isAskedForQuotation &&
            props.isCommentSectionActive &&
            props.isShortListed && (
              <div className="detailsButtons margin-0">
                <button onClick={askForQuotation}>Ask For Quotation</button>
              </div>
            )}
          {props.isReplySectionActive && <p style={{textAlign: 'right'}}>Waiting for the reply from Agency.</p>}
        </div>

        <div className={`action-wait`}>
          <div className="postQuotation">
            {props.agencyNegotiablePrice && props.agencyNegotiablePrice !== null && (
              <div className="detailsButtons margin-0">
                <p>
                  <b>{`Agency Negotiatiable Price: `}</b>
                  {props.agencyNegotiablePrice}
                </p>
              </div>
            )}

            {props.clientNegotiablePrice && props.clientNegotiablePrice !== null && (
              <div className="detailsButtons margin-0">
                <p>
                  <b>{`Client Negotiatiable Price: `}</b>
                  {props.clientNegotiablePrice}
                </p>
              </div>
            )}

            {props.quotationLink && props.quotationLink !== "" && (
              <div className="detailsButtons margin-0">
                <a href={props.quotationLink} target="new">
                  Click to see Quotation
                </a>
              </div>
            )}
          </div>

          {props.isProposalActionActive}
          {/* <div className={`${props.isProposalActionActive ? "" : "disabled"}`}> */}
            <div className="proposalCard">
              <div className="yellowBg">
                <img src={proposalImage} alt="" />
              </div>
              <div style={{ display: `${props.isProposalActionActive}` ? '' : 'none' }} className="detailsButtons height">
                <div>
                  <p>Accept or Reject the Project.</p>
                </div>
                <div>
                <button className="acceptButton" onClick={() => { setOpen(true) }}>
                  Accept
                </button>
                <button className="rejectButton" onClick={() => setOpenRejectionModal(true)}>
                  Reject
                </button>
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "QuotationModalOverlay",
          modal: "QuotationModal",
        }}
      >
        <div className="QuotationModal">
          <h2>Quotation Acceptance Form</h2>
          <div className="QuotationModalForm">
            <div className="innerQuotation">
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Name</p>
                </div>
                <div className="tableContentQuotation">
                  <p>One Sourcing</p>
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Start Date</p>

                </div>
                <div className="tableContentQuotation">
                  <input type='date' name='projectStartDateByClient' onChange={onQuotationChange} />
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Delayed Start Date</p>
                </div>
                <div className="tableContentQuotation">
                  <input type='date' name='projectDelayedStartDateByClient' onChange={onQuotationChange} />
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project End Date</p>
                </div>
                <div className="tableContentQuotation">
                  <input type='date' name='projectEndDateByClient' onChange={onQuotationChange} />
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Expected End Date</p>
                </div>
                <div className="tableContentQuotation">
                  <input type='date' name='projectExpectedEndDateByClient' onChange={onQuotationChange} />
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Final Cost </p>
                </div>
                <div className="tableContentQuotation">
                  <input type="number" name="finalCostByClient" onChange={onQuotationChange} />
                </div>
              </div>

              <div className="quotationSubmitButton">
                <div></div>
                <button style={{ textAlign: 'center' }} onClick={handleProjectAcceptance}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={openRejectionModal}
        onClose={() => setOpenRejectionModal(false)}
        center
        classNames={{
          overlay: "QuotationModalOverlay",
          modal: "QuotationModal",
        }}
      >
        <div className="quotationTable">
          <div className="tableHeaderQuotation">
            <p>Reason for Rejection</p>
          </div>
          <div className="tableContentQuotation">
            <input type='text' name='rejectReasonByClient' onChange={onQuotationRejectionChange} />
          </div>
        </div>
        <button style={{
          color: 'white',
          background: 'burlywood',
          padding: '2px',
          textAlign: 'center'
        }} onClick={() => handleProjectRejection()}>Yes</button>
      </Modal>
    </>

  );
};

export default ClientCommentBox;