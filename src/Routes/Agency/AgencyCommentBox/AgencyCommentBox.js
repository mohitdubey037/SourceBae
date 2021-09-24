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
import clsx from 'clsx';

import proposalImage from '../../../assets/images/proposalImage.png';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { event } from "react-ga";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

let isRepliedToClient = false;

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
    projectFinalCost: props.projectProposals[0].finalCostByClient
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
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
          console.log(err)
        })
    }
  };

  function uploadMedia() {
    if (file) {
      const formData = new FormData();
      formData.append("files", file, "files.pdf");
      instance.post(`api/agency/media/create`, formData)
        .then(function (response) {
          // setApiData({
          //   ...apiData,
          //   quotationLink: response[0].mediaURL,
          // });
          console.log(response[0].mediaURL);
          const data = { ...apiData, quotationLink: response[0].mediaURL };
          console.log(data);
          if (props.isAskedForQuotation) {
            data["isAskedForQuotation"] = true;
          }
          instance.patch(`api/agency/projects/propose/${props.projectId}`, data)
            .then(function (response) {
              console.log('chala ki nhi');
              props.giveReplies(true);
            });
        })
        .catch((err) => { });
    } else {
      toast.error("Please Pick a File before Uploading.");
    }
  }

  const inputFileChosen = (event) => {
    console.log(event);
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    console.log(file);
  }, [file])

  useEffect(() => {
    console.log(apiData)
  }, [apiData])

  useEffect(() => {
    console.log(apiData.rejectReasonByAgency);
  }, [apiData])

  useEffect(() => {
    console.log(rejectErrors);
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
          console.log('chala ki nhi');
          props.giveReplies(true);
        });
    }
  };
  return (

    <div style={{ display: "flex" }}>
      <div className="commentBox">
        <div className="topLine" style={{ backgroundColor:"rgb(69, 164, 228)"
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
                      <div className="chatBox chatBox-left" >
                        <p style={{ backgroundColor: 'rgb(69, 164, 228)' }}>{index.comment}</p>
                        <b>Client</b>
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
                                // accept="pdf"
                                type="file"
                                onChange={(event) => inputFileChosen(event)}
                                id="icon-button-file"
                                style={{ display: 'none', }}
                              />
                              <label htmlFor="icon-button-file">
                                <AttachmentIcon onChange={(event) => inputFileChosen(event)} />
                              </label>
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
            <div className="sendIcon_clientCommentBox">
              <SendIcon onClick={() => replyApi()} />
            </div>
          }
        </div>
        {/* </div> */}
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
      <div className="topLine" style={{ backgroundColor:"rgb(69, 164, 228)"
        }}></div>
        

        {!(
          props.projectProposals[0].isQuotationAcceptedByAgency && props.projectProposals[0].isQuotationAcceptedByClient
        ) && (
            <div className="proposalCard">
              {/* className={`${props.isProposalActionActive && props.isQuotationAcceptedByClient
                ? ""
                : "disabled"}`}> */}
              {/* <div className="yellowBg" style={{ height: props.projectProposals[0].isProposalActionActive !== true && props.projectProposals[0].isQuotationAcceptedByAgency !== true && '50%' }}> */}
                {/* <img src={proposalImage} alt="" /> */}
              {/* </div> */}
              {props.projectProposals[0].isProposalActionActive ?
                <>
                  <div className={`${(props.projectProposals[0].isProposalActionActive && props.projectProposals[0].isQuotationAcceptedByClient) ? 'conditional_acceptOrReject' : 'normal_acceptOrReject'}`}>
                    <p>Accept or Reject the Project.</p>
                  </div>

                  <div className="postQuotation">
          {props.projectProposals[0].clientNegotiablePrice && props.projectProposals[0].clientNegotiablePrice !== null && (
            <div className="detailsButtons md-m10 margin-0">
              {/* <p> */}
              <p>{`Client Negotiatiable Price:`}<i class="fas fa-dollar-sign"></i>{`${props.projectProposals[0].clientNegotiablePrice}`}</p>

              {/* </p> */}
            </div>
          )}
          {props.projectProposals[0].agencyNegotiablePrice && props.projectProposals[0].agencyNegotiablePrice !== null && (
            <div className="detailsButtons md-m10 margin-0" >
              {/* <p> */}
              <p>{`Agency Negotiatiable Price:`} <i class="fas fa-dollar-sign"></i>{`${props.projectProposals[0].agencyNegotiablePrice}`}</p>

              {/* </p> */}
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

                  <div style={{ display: `${props.projectProposals[0].isProposalActionActive && props.projectProposals[0].isQuotationAcceptedByClient}` ? '' : 'none' }} className="detailsButtons height">
                    <div>
                      <button className="acceptButton" onClick={() => { setOpen(true) }}>
                        Accept
                      </button>
                      <button className="rejectButton" onClick={() => setOpenWithdrawModal(true)}>
                        Reject
                      </button>
                    </div>
                  </div>
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
          modal: "QuotationModal",
        }}
      >
        <div className="QuotationModal acceptance-parent_clientCommentBox">
          <h2>Quotation Acceptance Form</h2>
          <div className="productModalForm">
            <div className="quotationTable">
              <div className="tableHeaderQuotation">
                <p style={{paddingLeft:"2.3rem" ,fontSize:"1.2rem"}}>Final Cost </p>
              </div>
              <div className="tableContentQuotation">
                <p>{props.projectProposals[0].finalCostByClient}</p>
              </div>
            </div>
              <div className="extraDiv">
              <div className="extraDiv2" style={{marginRight:"2rem"}}>
            <div className="quotationTable">
              <div className="tableHeaderQuotation">
                <p>Project Start Date By Client</p>
              </div>
              <div className="tableContentQuotation">
              <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectStartDateByClient}</Moment></p>
              </div>
            </div>

            <div className="quotationTable">
              <div className="tableHeaderQuotation">
                <p>Project Delayed Start Date By Client</p>
              </div>
              <div className="tableContentQuotation">
              <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectDelayedStartDateByClient}</Moment></p>
              </div>
            </div>

            <div className="quotationTable">
              <div className="tableHeaderQuotation">
                <p>Project End Date By Client</p>
              </div>
              <div className="tableContentQuotation">
              <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectEndDateByClient}</Moment></p>
              </div>
            </div>
              </div>
              <div className="extraDiv3" style={{marginLeft:"10.5rem"}}>
            <div className="quotationTable">
              <div className="tableHeaderQuotation">
                <p>Project Expected End Date By Client</p>
              </div>
              <div className="tableContentQuotation">
              <span className="dot"></span> <p><Moment format="D MMM YYYY" withTitle>{props.projectExpectedEndDateByClient}</Moment></p>
              </div>
            </div>
            
            <div className="quotationTable">
              <div className="tableHeaderQuotation">
                <p style={{width:"75%"}}>Project Start Date By You</p>
              </div>
              <div className="tableContentQuotation">
                <input type='date' name='projectStartDate' onChange={onQuotationAcceptChange} />
              </div>
            </div>
            </div>
            </div>
            <div className="quotationSubmitButton quotationSubmit_clientCommentBox">
              <button style={{ textAlign: 'center' }} onClick={handleProjectAcceptance}>Submit</button>
            </div>
            
            
          </div>
        </div>
      </Modal>



      {/* <Modal open={open} onClose={() => { setOpen(false) }}
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
      </Modal> */}

      {/* <Modal open={openWithdrawModal} onClose={() => { setOpenWithdrawModal(false) }}
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
      </Modal> */}

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
            <FormControl component="fieldset" style={{marginLeft:"25px"}}>
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
            {/* <div style={{display:"flex"}}>
              <span>Detailed description</span>
              <input style={{ marginLeft:"10px", width:"14rem", height:"7rem", borderRadius:"7px",border:"2px solid #707070"}}/>
            </div> */}
            {quotationRejectionForm.rejectReasonByAgency !== "No Matching Requirements" &&
              quotationRejectionForm.rejectReasonByAgency !== "Taking Too Much Time" &&
              quotationRejectionForm.rejectReasonByAgency !== "Cost is too low"
              &&
              <div className="detailed_description_clientCommentBox" style={{display:"grid"}}>
                <label>Detailed description:</label>
                <textarea
                  style={{padding:"6px", marginTop:"10px", fontSize:"12px",width:"18rem", height:"7rem", borderRadius:"3px",border:"1px solid #707070"}}
                  placeholder="Please type your reason here"
                  name="rejectReasonByAgency"
                  cols="30"
                  rows="5"
                  onChange={onQuotationRejectionChange} />
                {/* <input type='text' name='rejectReasonByClient' onChange={onQuotationRejectionChange} /> */}
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