import React, { useEffect, useState } from "react";

import foods from "../../../assets/images/Quotation/foods.png";
import Moment from 'react-moment';
import { connect } from "react-redux";
import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";

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
            border: "2px solid black",
            borderRadius: "8px",
            padding: "1rem",
            margin: "2rem 1rem 1rem 1rem",
            width: "100%",
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
              <div className="detailsButtons">
                <button onClick={askForQuotation}>Ask For Quotation</button>
              </div>
            )}
          {props.isReplySectionActive && "Waiting for the reply from Agency."}
        </div>

        <div className={`action-wait`}>
          <div className="postQuotation">
            {props.agencyNegotiablePrice && props.agencyNegotiablePrice !== null && (
              <div className="detailsButtons">
                <p>
                  <b>{`Agency Negotiatiable Price: `}</b>
                  {props.agencyNegotiablePrice}
                </p>
              </div>
            )}

            {props.clientNegotiablePrice && props.clientNegotiablePrice !== null && (
              <div className="detailsButtons">
                <p>
                  <b>{`Client Negotiatiable Price: `}</b>
                  {props.clientNegotiablePrice}
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

          {props.isProposalActionActive}
          <div className={`${props.isProposalActionActive ? "" : "disabled"}`}>
            <div>
              <p>Accept or Reject the Project.</p>
            </div>

            <div className="detailsButtons">
              <button className="acceptButton" onClick={() => setOpen(true)}>Accept</button>
              <button className="rejectButton" onClick={() => setOpenRejectionModal(true)}>Reject</button>
            </div>
          </div>
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
          textAlign: 'center'}} onClick={() => handleProjectRejection()}>Yes</button>
    </Modal>
    </>

  );
};

export default ClientCommentBox;