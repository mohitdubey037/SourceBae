import React, { useEffect, useState } from "react";
import "./AgencyCommentBox.css";

import foods from "../../../assets/images/Quotation/foods.png";

import instance from '../../../Constants/axiosConstants';
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import bgPic from "../../../assets/images/Quotation/bgPic.svg";
import FileUploadImage from '../../../assets/images/Newestdashboard/Short_Term/short_term.svg';



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  width: {
    width: '100%'
  }
}));

const AgencyCommentBox = (props) => {
  const classes = useStyles();
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
    projectFinalCost: props.projectProposals[0].finalCostByClient,
    projectStartDate: new Date()
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setApiData({
      ...apiData,
      [name]: value,
    });
  };

  const handleChangeDate = (name, value) => {
    setQuotationAcceptForm({
      ...quotationAcceptForm,
      [name]: value
    })
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
      toast.error('Field can"t be empty');
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
        })
    }
  };

  function uploadMedia() {
    if (file) {
      const formData = new FormData();
      formData.append("files", file, "files.pdf");
      instance.post(`api/agency/media/create`, formData)
        .then(function (response) {
          const data = { ...apiData, quotationLink: response[0].mediaURL };
          if (props.isAskedForQuotation) {
            data["isAskedForQuotation"] = true;
          }
          instance.patch(`api/agency/projects/propose/${props.projectId}`, data)
            .then(function (response) {
              props.giveReplies(true);
            });
        })
        .catch((err) => { });
    } else {
      toast.error("Please Pick a File before Uploading.");
    }
  }

  const inputFileChosen = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
  }, [file])

  useEffect(() => {
  }, [apiData])

  useEffect(() => {
  }, [rejectErrors])

  const replyApi = async () => {
    if (props.projectProposals[0].isReplySectionActive &&
      props.projectProposals[0].isAskedForQuotation &&
      (props.projectProposals[0].quotationLink === null ||
        props.projectProposals[0].quotationLink === undefined)) {
      await uploadMedia();
    }
    else {
      const data = apiData;
      if (props.isAskedForQuotation) {
        data["isAskedForQuotation"] = true;
      }
      instance
        .patch(`api/agency/projects/propose/${props.projectId}`, data)
        .then(function (response) {
          props.giveReplies(true);
        });
    }
  };
  return (

    <div style={{ display: "flex" }}>
      <div className="commentBox">
        <div className="topLine" style={{
          backgroundColor: "rgb(69, 164, 228)"
        }}></div>
        <img src={bgPic} alt="img" style={{ position: "absolute", top: "5rem", left: "9rem", zIndex: "-1", opacity: "0.4" }} />
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
                      <div className="chatBox chatBox-left" >
                        <p style={{ backgroundColor: 'rgb(69, 164, 228)' }}>{index.comment}</p>
                        <b>{`${props?.clientId?.companyName}`}</b>
                      </div>
                    )}
                    {index.reply && (
                      <div className="chatBox chatBox-right">
                        <p style={{ backgroundColor: '#eaf3ff' }}>{index.reply}</p>
                        <b>You</b>
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
        <div className='commentParent'>
          {props.projectProposals[0].isReplySectionActive === true && props.projectProposals[0].isAskedForQuotation &&
            (props.projectProposals[0].agencyNegotiablePrice === null || props.projectProposals[0].agencyNegotiablePrice === undefined)
            && (
              <div className="postQuotation" style={{ width: '52%' }}>
                <TextField
                  className={clsx(classes.margin, classes.width)}
                  name="agencyNegotiablePrice"
                  id="outlined-number"
                  type="number"
                  placeholder="Agency Negotiable Price"
                  variant="outlined"
                  onChange={(event) => handleChange(event)}

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
          <div className="price-section" style={{
            width: props.projectProposals[0].isReplySectionActive === true && props.projectProposals[0].agencyNegotiablePrice !== undefined
              ? '96%' :
              props.projectProposals[0].isReplySectionActive === true && props.projectProposals[0].isAskedForQuotation === false
                ? '96%' : '45%'
          }}>
            {props.projectProposals[0].isReplySectionActive && (
              <>
                <TextField
                  className={clsx(classes.margin, classes.width)}
                  id="outlined-size-small"
                  // label="Agency"
                  placeholder="Enter Your Reply"
                  onChange={(event) => handleChange(event)}
                  name="reply"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {props.projectProposals[0].isReplySectionActive &&
                          props.projectProposals[0].isAskedForQuotation &&
                          (props.projectProposals[0].quotationLink === null ||
                            props.projectProposals[0].quotationLink === undefined) &&
                          (
                            <>
                              <input
                                color="primary"
                                type="file"
                                onChange={(event) => inputFileChosen(event)}
                                id="icon-button-file"
                                style={{ display: 'none', }}
                              />
                              {/* <label htmlFor="icon-button-file">
                                <AttachmentIcon onChange={(event) => inputFileChosen(event)} />
                              </label> */}
                            </>
                          )}
                      </InputAdornment>
                    )
                  }}
                />
              </>
            )}
          </div>
          {props.projectProposals[0].isReplySectionActive === true &&
            <div className="sendIcon_clientCommentBox" onClick={() => replyApi()} >
              <SendIcon />
            </div>
          }
        </div>
        {props.projectProposals[0].isQuotationAcceptedByClient === false
          && !props.projectProposals[0].isCommentSectionActive
          && !props.projectProposals[0].isReplySectionActive
          && (
            <>
              <div className="conversation-over">
                <p>Conversation Over.</p>
              </div>
              <div className="please_wait">
                <p>Please wait uptill the client accept the proposal</p>
              </div>
            </>
          )}
      </div>

      <div className='action-wait'>
        <div className="topLine" style={{
          backgroundColor: "rgb(69, 164, 228)"
        }}></div>


        {!(
          props.projectProposals[0].isQuotationAcceptedByAgency && props.projectProposals[0].isQuotationAcceptedByClient
        ) && (
            <div className="proposalCard">
              {props.projectProposals[0].isProposalActionActive ?
                <>
                  {(props.projectProposals[0].isProposalActionActive && props.projectProposals[0].isQuotationAcceptedByClient) &&
                    <div className={`${(props.projectProposals[0].isProposalActionActive && props.projectProposals[0].isQuotationAcceptedByClient) ? 'conditional_acceptOrReject' : 'normal_acceptOrReject'}`}>
                      <p>Accept or Reject the Project.</p>
                    </div>
                  }

                  <div className="postQuotation">
                    {props.projectProposals[0].clientNegotiablePrice && props.projectProposals[0].clientNegotiablePrice !== null && (
                      <div className="detailsButtons md-m10">
                        <p>{`Client Negotiatiable Price: $ ${props.projectProposals[0].clientNegotiablePrice}`}</p>
                      </div>
                    )}

                    {props.projectProposals[0].agencyNegotiablePrice && props.projectProposals[0].agencyNegotiablePrice !== null && (
                      <div className="detailsButtons md-m10" >
                        <p>{`Agency Negotiatiable Price: $ ${props.projectProposals[0].agencyNegotiablePrice}`}</p>
                      </div>
                    )}

                    {props.projectProposals[0].isQuotationAcceptedByClient &&
                      <div className="detailsButtons md-m10" >
                        <p>{`Client Final Price: $ ${props.projectProposals[0].finalCostByClient}`}</p>
                      </div>
                    }

                    {props.projectProposals[0].quotationLink && props.projectProposals[0].quotationLink !== "" && (
                      <div className="detailsButtons md-m10">
                        <a href={props.projectProposals[0].quotationLink} target="new">
                          View Quotation
                        </a>
                      </div>
                    )}

                  </div>

                  {props.projectProposals[0].isProposalActionActive && props.projectProposals[0].isQuotationAcceptedByClient
                    &&
                    <div className="detailsButtons height" style={{ marginBottom: "1rem" }}>
                      <div>
                        <button className="acceptButton" onClick={() => { setOpen(true) }}>
                          Accept
                        </button>
                        <button className="rejectButton" onClick={() => setOpenWithdrawModal(true)}>
                          Reject
                        </button>
                      </div>
                    </div>
                  }
                  {props.projectProposals[0].isReplySectionActive === 'false' &&
                    <p className="color-black">Please provide some reply</p>
                  }
                </>
                :
                props.projectProposals[0].isAskedForQuotation
                  ?
                  file === null ?
                    <div className="quotation_file_upload">
                      <p>Please upload a file of quotation</p>
                      <label htmlFor="icon-button-file" style={{ margin: "25% 33%" }}>
                        <img className="fileUpload_shortTerm" src={FileUploadImage} alt="image"
                          onChange={(event) => inputFileChosen(event)} />
                      </label>
                    </div>
                    :
                    <div className="quotation_file_upload">
                      <p>{file?.name}</p>
                    </div>
                  :
                  null
              }
            </div>
          )}
      </div>


      <Modal
        open={open}
        onClose={() => { setOpen(false) }}
        center
        classNames={{
          overlay: "QuotationModalOverlay",
          modal: "QuotationModal QuotationModal_agencyCommentBox",
        }}
      >
        <div className="QuotationModal acceptance-parent_clientCommentBox">
          <h2>Quotation Acceptance Form</h2>
          <div className="productModalForm">
            <div className="extraDiv">
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Start Date By Client</p>
                </div>
                <div className="tableContentQuotation">
                  <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectProposals[0].projectStartDateByClient}</Moment></p>
                </div>
              </div>

              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Delayed Start Date By Client</p>
                </div>
                <div className="tableContentQuotation">
                  <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectProposals[0].projectDelayedStartDateByClient}</Moment></p>
                </div>
              </div>

              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project End Date By Client</p>
                </div>
                <div className="tableContentQuotation">
                  <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectProposals[0].projectEndDateByClient}</Moment></p>
                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Expected End Date By Client</p>
                </div>
                <div className="tableContentQuotation">
                  <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectProposals[0].projectExpectedEndDateByClient}</Moment></p>
                </div>
              </div>

              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p>Project Start Date By You</p>
                </div>
                <div className="tableContentQuotation">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="MM/dd/yyyy"
                      minDate={new Date(props.projectProposals[0].projectStartDateByClient)}
                      maxDate={new Date(props.projectProposals[0].projectDelayedStartDateByClient)}
                      value={props.projectProposals[0].projectStartDateByClient}
                      onChange={(event) => handleChangeDate('projectStartDate', event)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                </div>
              </div>
              <div className="quotationTable">
                <div className="tableHeaderQuotation">
                  <p >Final Cost </p>
                </div>
                <div className="tableContentQuotation">
                  <p>{props.projectProposals[0].finalCostByClient}</p>
                </div>
              </div>
            </div>
            <div className="quotationSubmitButton quotationSubmit_clientCommentBox">
              <button style={{ textAlign: 'center' }} onClick={handleProjectAcceptance}>Submit</button>
            </div>


          </div>
        </div>
      </Modal>

      <Modal
        open={openWithdrawModal}
        onClose={() => { setOpenWithdrawModal(false) }}
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
            <FormControl component="fieldset" style={{ marginLeft: "25px" }}>
              <RadioGroup
                column
                aria-label="position"
                name="rejectReasonByAgency"
                onChange={onQuotationRejectionChange}
                defaultValue="top">

                <FormControlLabel
                  value="No Matching Requirements"
                  control={<Radio color="primary" />}
                  label="Not Matching Requirement"
                // labelPlacement="start"
                />
                <FormControlLabel
                  value="Taking Too Much Time"
                  control={<Radio color="primary" />}
                  label="Taking Too Much Time"
                // labelPlacement="start"
                />
                <FormControlLabel
                  value="Cost is too low"
                  control={<Radio color="primary" />}
                  label="Cost is too low"
                // labelPlacement="start"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio color="primary" />}
                  label="Other"
                // labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
            {quotationRejectionForm.rejectReasonByAgency !== "No Matching Requirements" &&
              quotationRejectionForm.rejectReasonByAgency !== "Taking Too Much Time" &&
              quotationRejectionForm.rejectReasonByAgency !== "Cost is too low"
              &&
              <div className="detailed_description_clientCommentBox" style={{ display: "grid" }}>
                <label>Detailed description:</label>
                <textarea
                  style={{ padding: "6px", marginTop: "10px", fontSize: "12px", width: "18rem", height: "7rem", borderRadius: "3px", border: "1px solid #707070" }}
                  placeholder="Please type your reason here"
                  name="rejectReasonByAgency"
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

    </div>
  );
};

export default AgencyCommentBox