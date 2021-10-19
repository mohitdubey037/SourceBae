import React, { useEffect, useState } from "react";

import instance from "../../../Constants/axiosConstants";
import { Modal } from "react-responsive-modal";
import './ClientCommentBox.css';
import clsx from 'clsx';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { toast } from "react-toastify";

import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import bgPic from "../../../assets/images/Quotation/bgPic.svg";


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
  const [singleRejectError, setSingleRejectError] = useState('');

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
        onCloseModal();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const checkErrors = () => {
    if (quotationRejectionForm.rejectReasonByClient === '' || quotationRejectionForm.rejectReasonByClient === undefined) {
      setRejectErrors("Field can't be empty");
      toast.error('Field can"t be empty');
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
    console.log(quotationRejectionForm.rejectReasonByClient);
  }, [quotationRejectionForm])

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="commentBox">
          <div className="topLine" style={{
          }}></div>
          <img src={bgPic} alt="img" style={{position:"absolute", top:"5rem",left:"9rem", zIndex:"-1",opacity:"0.4"}}/>
          {props.projectProposals[0].comments.map((index) => {
            if (index.commentType === props.commentType) {
              return (
                <>
                  <div className="chatBox-parent">
                    {index.comment && (
                      <div className="chatBox">
                        <p style={{ backgroundColor: 'rgb(69, 164, 228)' }}>{index.comment}</p>
                        <b>You</b>
                      </div>
                    )}

                    {index.reply && (
                      <div className="chatBox chatBox-left">
                        <p style={{ backgroundColor: 'rgb(234, 243, 255)' }}>{index.reply}</p>
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
                  )}
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
              </div>
            )}
          {!props.projectProposals[0].isCommentSectionActive && !props.projectProposals[0].isReplySectionActive && (
            <div className="conversation-over">
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
          {props.projectProposals[0].isReplySectionActive && <p style={{ textAlign: 'right', marginTop: '-13px' }}>Waiting for the reply from Agency.</p>}
        </div>

        <div className='action-wait'>
        <div className="topLine" style={{
          backgroundColor: "rgb(69, 164, 228)"
        }}></div>
          {props.projectProposals[0].isProposalActionActive}
          <div className="proposalCard">
            <div className={`${props.projectProposals[0].isProposalActionActive ? 'conditional_acceptOrReject' : 'normal_acceptOrReject_clientCommentBox'}`}>
              <p>Accept or Reject the Project.</p>
            </div>
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
            <div style={{ display: `${props.projectProposals[0].isProposalActionActive}` ? '' : 'none' }} className="detailsButtons height" style={{ marginBottom: "1rem" }}>
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
                  <p>{props.projectName}</p>
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
                onChange={onQuotationRejectionChange}
                defaultValue="top">

                <FormControlLabel
                  value="No Matching Requirements"
                  control={<Radio color="primary" />}
                  label="Not Matching Requirement"
                />
                <FormControlLabel
                  value="Taking Too Much Time"
                  control={<Radio color="primary" />}
                  label="Taking Too Much Time"
                />
                <FormControlLabel
                  value="Cost is too high"
                  control={<Radio color="primary" />}
                  label="Cost is too high"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio color="primary" />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            {quotationRejectionForm.rejectReasonByClient !== "No Matching Requirements" &&
              quotationRejectionForm.rejectReasonByClient !== "Taking Too Much Time" &&
              quotationRejectionForm.rejectReasonByClient !== "Cost is too high"
              &&
              <div className="detailed_description_clientCommentBox">
                <label>Detailed description:</label>
                <textarea
                  style={{ padding: '10px', margin: '1rem 0rem', width: '70%', fontSize: "12px", maxHeight: "6rem", borderRadius: '4px' }}
                  placeholder="Please type your reason here"
                  name="rejectReasonByClient"
                  cols="30"
                  rows="5"
                  onChange={onQuotationRejectionChange} />
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