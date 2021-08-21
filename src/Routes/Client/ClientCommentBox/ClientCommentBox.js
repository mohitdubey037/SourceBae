import React, { useEffect, useState } from "react";

import instance from "../../../Constants/axiosConstants";
import { useParams, useHistory } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import proposalImage from '../../../assets/images/proposalImage.png';
import './ClientCommentBox.css';
import clsx from 'clsx';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SendIcon from '@material-ui/icons/Send';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ClientCommentBox = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const [openRejectionModal, setOpenRejectionModal] = useState(false);
  const [rejectErrors, setRejectErrors] = useState('');

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
      comment: "Kindly Share the document.",
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

  const checkErrors = () => {
    if (quotationRejectionForm.rejectReasonByClient === '' || quotationRejectionForm.rejectReasonByClient === undefined) {
      setRejectErrors("Field can't be empty");
      return false;
    }
    else {
      return true;
    }
  }

  const handleProjectRejection = () => {
    if (checkErrors()) {
      instance.patch(`api/client/projects/proposal-action/${props.projectId}`, quotationRejectionForm)
        .then(function (response) {
          props.giveReplies(true);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    console.log(apiData.rejectReasonByClient);
  }, [apiData])

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="commentBox">
          <div className="topLine" style={{
          }}></div>
          {props.projectProposals[0].comments.map((index) => {
            if (index.commentType === props.commentType) {
              return (
                <>
                  <div className="chatBox-parent">
                    {index.comment && (
                      <div className="chatBox">
                        <p style={{ backgroundColor: '#93E9FF' }}>{index.comment}</p>
                        <b>You</b>
                      </div>
                    )}

                    {index.reply && (
                      <div className="chatBox chatBox-left">
                        <p style={{ backgroundColor: '#e1f9ff' }}>{index.reply}</p>
                        <b>Agency</b>
                      </div>
                    )}
                  </div>
                </>
              );
            } else {
              return "";
            }
          })}

          {props.projectProposals[0].isAskedForQuotation && props.projectProposals[0].isCommentSectionActive &&
            (
              <div className='commentParent'>
                {(props.projectProposals[0].clientNegotiablePrice === null ||
                  props.projectProposals[0].clientNegotiablePrice === undefined) && (

                    <div className="postQuotation" style={{ width: '55%' }}>
                      {/* <div style={{ display: "flex", alignItems: 'center', marginLeft: '10px' }}> */}
                      {/* <b>Client Negotiatiable Price:</b> */}
                      {/* <div className="negotiablePrice">
                          <input
                            type="number"
                            name="clientNegotiablePrice"
                            placeholder="negotiable price"
                            value={apiData.clientNegotiablePrice}
                            onChange={(event) => handleChange(event)}
                          />
                        </div> */}

                      <TextField
                        className={clsx(classes.margin, classes.width)}
                        name="clientNegotiablePrice"
                        id="outlined-number"
                        type="number"
                        placeholder="Client Negotiable Price"
                        onChange={(event) => handleChange(event)}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <AttachMoneyIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    // </div>
                  )}
                {/* <div style={{ display: "flex", margin: "1rem 0rem" }}> */}
                {/* <h5>
                    <b>Client: </b>
                  </h5> */}
                {/* <textarea
                    rows="5"
                    cols="50"
                    style={{ margin: "0 1rem" }}
                    placeholder="Enter your reply"
                    name="comment"
                    value={apiData.reply}
                    onChange={(event) => handleChange(event)}
                  /> */}
                <div className="price-section" style={{ width: '40%' }}>
                  <TextField
                    className={clsx(classes.margin, classes.width)}
                    id="outlined-size-small"
                    placeholder="Enter Your Reply"
                    onChange={(event) => handleChange(event)}
                    name="comment"
                    multiline
                    maxRows={4}
                    variant="outlined"
                  />
                </div>
                {props.projectProposals[0].isCommentSectionActive === true &&
                  <div className="sendIcon_clientCommentBox">
                    <SendIcon onClick={() => { replyApi() }} />
                  </div>
                }
                {/* </div> */}

                {/* <div className="reply-parent">
                  <button className="reply-button" onClick={() => { replyApi() }}>
                    Reply
                  </button>
                </div> */}
              </div>
            )}
          {!props.projectProposals[0].isCommentSectionActive && !props.projectProposals[0].isReplySectionActive && (
            <div>
              <p>Coversation Over.</p>
            </div>
          )}
          {!props.projectProposals[0].isAskedForQuotation &&
            props.projectProposals[0].isCommentSectionActive &&
            props.isShortListed && (
              <div className="detailsButtons margin-0">
                <button onClick={askForQuotation}>Ask For Quotation</button>
              </div>
            )}
          {props.projectProposals[0].isReplySectionActive && <p style={{ textAlign: 'right' }}>Waiting for the reply from Agency.</p>}
        </div>

        <div className='action-wait'>
          <div className="postQuotation">
            {props.projectProposals[0].agencyNegotiablePrice && props.projectProposals[0].agencyNegotiablePrice !== null && (
              <div className="detailsButtons margin-0">
                <p>{`Agency Negotiatiable Price:`}<i class="fas fa-dollar-sign"></i>{`${props.projectProposals[0].agencyNegotiablePrice}`}</p>

              </div>
            )}

            {props.projectProposals[0].clientNegotiablePrice && props.projectProposals[0].clientNegotiablePrice !== null && (
              <div className="detailsButtons margin-0">
                <p>{`Client Negotiatiable Price:`}<i class="fas fa-dollar-sign"></i>{`${props.projectProposals[0].clientNegotiablePrice}`}</p>

              </div>
            )}

            {props.projectProposals[0].quotationLink && props.projectProposals[0].quotationLink !== "" && (
              <div className="detailsButtons margin-0">
                <a href={props.projectProposals[0].quotationLink} target="new">
                  View Quotation
                </a>
              </div>
            )}
          </div>

          {props.projectProposals[0].isProposalActionActive}
          {/* <div className={`${props.isProposalActionActive ? "" : "disabled"}`}> */}
          <div className="proposalCard">
            <div className="yellowBg">
              <img src={proposalImage} alt="" />
            </div>
            <div style={{ display: `${props.projectProposals[0].isProposalActionActive}` ? '' : 'none' }} className="detailsButtons height">
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
        <div className="QuotationModal acceptance-parent_clientCommentBox">
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

              <div className="quotationSubmitButton quotationSubmit_clientCommentBox">
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
        <div className="rejection_modal_clientCommentBox">
          <div className="reject-reason_label">
            <h2>Reason for Rejection</h2>
          </div>
          <div className="radioButtons_with_textBox">
            <FormControl component="fieldset">
              <RadioGroup
                column
                aria-label="position"
                name="rejectReasonByClient"
                onChange={handleChange}
                defaultValue="top">

                <FormControlLabel
                  value="No Matching Requirements"
                  control={<Radio color="primary" />}
                  label="Not Matching Requirement"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="Taking Too Much Time"
                  control={<Radio color="primary" />}
                  label="Taking Too Much Time"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="Cost is too high"
                  control={<Radio color="primary" />}
                  label="Cost is too high"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio color="primary" />}
                  label="Other"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
            {apiData.rejectReasonByClient === "Other" &&
              <div className="detailed_description_clientCommentBox">
                <label>Detailed description:</label>
                <textarea
                  style={{ padding: '10px', marginLeft: '10px' }}
                  placeholder="Please type your reason here"
                  name="rejectReasonByClient"
                  cols="30"
                  rows="5"
                  onChange={onQuotationRejectionChange} />
                {/* <input type='text' name='rejectReasonByClient' onChange={onQuotationRejectionChange} /> */}
                {rejectErrors !== undefined && (
                  <div>
                    <p className="error_productForm">
                      {rejectErrors}
                    </p>
                  </div>
                )
                }
              </div>
            }
          </div>
        </div>
        <div className='submit-rejection' onClick={() => handleProjectRejection()}>
          <div>
            <p>Submit</p>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default ClientCommentBox;