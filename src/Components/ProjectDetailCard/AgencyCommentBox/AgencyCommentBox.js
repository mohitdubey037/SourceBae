import React, { useState } from 'react';
import './AgencyCommentBox.css';

import instance from '../../../Constants/axiosConstants';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Spinner from '../../../Components/Spinner/Spinner';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import bgPic from '../../../assets/images/Quotation/bgPic.svg';
import FileUploadImage from '../../../assets/images/Newestdashboard/Short_Term/short_term.svg';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    width: {
        width: '100%'
    }
}));

const AgencyCommentBox = (props) => {
    const isRejectOrAccept =
        props.projectProposals[0].rejectReasonByClient ||
        props.projectProposals[0].rejectReasonByAgency ||
        props.projectProposals[0].isQuotationAcceptedByClient ||
        props.projectProposals[0].isQuotationAcceptedByAgency;

    const isReject =
        props.projectProposals[0].rejectReasonByClient ||
        props.projectProposals[0].rejectReasonByAgency;

    const isAccept =
        props.projectProposals[0].isQuotationAcceptedByClient ||
        props.projectProposals[0].isQuotationAcceptedByAgency;

    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const [apiData, setApiData] = useState({
        agencyId: localStorage.getItem('userId'),
        isShortListed: true,
        agencyNegotiablePrice: '',
        reply: ''
    });

    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

    const [quotationAcceptForm, setQuotationAcceptForm] = useState({
        agencyId: localStorage.getItem('userId'),
        isQuotationAcceptedByAgency: true,
        projectFinalCost: props.projectProposals[0].finalCostByClient,
        projectStartDate: new Date(
            props.projectProposals[0].projectStartDateByClient
        )
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'agencyNegotiablePrice') {
            if (
                value >= props?.projectProposalCost &&
                value <= props?.projectProposalCost * 2 &&
                value.length <= 8
            ) {
                setApiData({
                    ...apiData,
                    [name]: value
                });
            } else if (value > props?.projectProposalCost * 2) {
                toast.error(
                    'Negotiable price should be less than twice of the project proposal price'
                );
            } else if (value < props?.projectProposalCost) {
                setApiData({
                    ...apiData,
                    [name]: value
                });
            }
        } else {
            setApiData({
                ...apiData,
                [name]: value
            });
        }
    };

    const handleChangeDate = (name, value) => {
        setQuotationAcceptForm({
            ...quotationAcceptForm,
            [name]: value
        });
    };

    const [quotationRejectionForm, setQuotationRejectionForm] = useState({
        rejectReasonByAgency: '',
        agencyId: localStorage.getItem('userId') || '',
        isQuotationAcceptedByAgency: false
    });

    const onQuotationRejectionChange = (event) => {
        const { name, value } = event.target;
        setQuotationRejectionForm({
            ...quotationRejectionForm,
            [name]: value
        });
    };

    const checkErrors = () => {
        if (
            quotationRejectionForm.rejectReasonByAgency === '' ||
            quotationRejectionForm.rejectReasonByAgency === undefined
        ) {
            setLoading(false);
            toast.error("Field can't be empty");
            return false;
        } else {
            return true;
        }
    };

    const handleProjectAcceptance = () => {
        if (quotationAcceptForm.finalPrice !== null) {
            instance
                .patch(
                    `api/client/projects/proposal-action/${props.projectId}`,
                    quotationAcceptForm
                )
                .then(function (response) {
                    props.giveReplies(true);
                    setOpen(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setOpen(false);
                });
        } else {
            toast.error("Final cost can't be blank.");
        }
    };
    const handleProjectRejection = () => {
        setLoading(true);
        if (checkErrors()) {
            instance
                .patch(
                    `api/client/projects/proposal-action/${props.projectId}`,
                    quotationRejectionForm
                )
                .then(function (response) {
                    props.giveReplies(true);
                    setOpenWithdrawModal(false);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    };

    function uploadMedia() {
        if (file) {
            const formData = new FormData();
            formData.append('files', file, 'files.pdf');
            debugger;
            if (apiData.agencyNegotiablePrice === '') {
                toast.error('Negotiable price can not be empty');
                setLoading(false);
                return;
            } else if (
                `${apiData.agencyNegotiablePrice}`.length ===
                    `${props.projectProposalCost}`.length &&
                apiData.agencyNegotiablePrice < props.projectProposalCost
            ) {
                toast.error(
                    `Negotiable price can't be less than the project proposal price`
                );
                setLoading(false);
                return;
            } else if (
                apiData.agencyNegotiablePrice < props.projectProposalCost ||
                apiData.agencyNegotiablePrice > 2 * props.projectProposalCost
            ) {
                toast.error(
                    `Negotiable price should be between ${
                        props.projectProposalCost
                    } and ${2 * props.projectProposalCost}`
                );
                setLoading(false);
                return;
            } else if (apiData.reply === '') {
                toast.error('Reply can not be empty');
                setLoading(false);
                return;
            }
            instance
                .post(`api/agency/media/create`, formData)
                .then(function (response) {
                    const data = {
                        ...apiData,
                        quotationLink: response[0].mediaURL
                    };
                    if (props.isAskedForQuotation) {
                        data['isAskedForQuotation'] = true;
                    }
                    instance
                        .patch(
                            `api/agency/projects/propose/${props.projectId}`,
                            data
                        )
                        .then(function (response) {
                            props.giveReplies(true);
                            setLoading(false);
                        })
                        .catch(function (error) {
                            console.log(error);
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    setLoading(false);
                });
        } else {
            toast.error('Please pick a file before uploading.');
            setLoading(false);
        }
    }

    const inputFileChosen = (event) => {
        setFile(event.target.files[0]);
    };

    const replyApi = async () => {
        setLoading(true);
        if (
            props.projectProposals[0].isReplySectionActive &&
            props.projectProposals[0].isAskedForQuotation &&
            (props.projectProposals[0].quotationLink === null ||
                props.projectProposals[0].quotationLink === undefined)
        ) {
            await uploadMedia();
        } else {
            const data = apiData;
            if (props.isAskedForQuotation) {
                data['isAskedForQuotation'] = true;
            }
            instance
                .patch(`api/agency/projects/propose/${props.projectId}`, data)
                .then(function (response) {
                    props.giveReplies(true);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        }
    };
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="commentBox_parent">
                    <div
                        className={`commentBox ${
                            isRejectOrAccept && 'conditional_width_commentBox'
                        }`}
                    >
                        <div
                            className="topLine"
                            style={{
                                backgroundColor: 'rgb(69, 164, 228)'
                            }}
                        ></div>
                        <img
                            className="hardcoded_comment_image"
                            src={bgPic}
                            alt="img"
                        />
                        <>
                            <div className="chatBox-parent">
                                {props.projectProposals[0].comments.map(
                                    (index, id) => {
                                        return (
                                            <>
                                                {index.comment && (
                                                    <div className="chatBox chatBox-left">
                                                        <p
                                                            style={{
                                                                backgroundColor:
                                                                    'rgb(69, 164, 228)'
                                                            }}
                                                        >
                                                            {index.comment}
                                                        </p>
                                                        <b>{`${props?.clientId?.companyName}`}</b>
                                                    </div>
                                                )}
                                                {index.reply && (
                                                    <div className="chatBox">
                                                        <p
                                                            style={{
                                                                backgroundColor:
                                                                    '#eaf3ff',
                                                                color: 'black'
                                                            }}
                                                        >
                                                            {index.reply}
                                                        </p>
                                                        <b>You</b>
                                                    </div>
                                                )}
                                                {!isRejectOrAccept &&
                                                    props.projectProposals[0]
                                                        .isCommentSectionActive &&
                                                    id ===
                                                        props
                                                            .projectProposals[0]
                                                            .comments.length -
                                                            1 && (
                                                        <p className="waiting_left">
                                                            Waiting for the
                                                            reply from Client.
                                                        </p>
                                                    )}
                                            </>
                                        );
                                    }
                                )}
                            </div>
                            {!props.projectProposals[0].rejectReasonByClient &&
                                !props.projectProposals[0]
                                    .isQuotationAcceptedByClient && (
                                    <div className="commentParent">
                                        {props.projectProposals[0]
                                            .isReplySectionActive === true &&
                                            props.projectProposals[0]
                                                .isAskedForQuotation &&
                                            (props.projectProposals[0]
                                                .agencyNegotiablePrice ===
                                                null ||
                                                props.projectProposals[0]
                                                    .agencyNegotiablePrice ===
                                                    undefined) && (
                                                <div
                                                    className="postQuotation"
                                                    style={{ width: '100%' }}
                                                >
                                                    <TextField
                                                        className={clsx(
                                                            classes.margin,
                                                            classes.width
                                                        )}
                                                        value={
                                                            apiData.agencyNegotiablePrice
                                                        }
                                                        name="agencyNegotiablePrice"
                                                        id="outlined-number"
                                                        type="number"
                                                        placeholder="Agency Negotiable Price"
                                                        variant="outlined"
                                                        onChange={(event) =>
                                                            handleChange(event)
                                                        }
                                                        InputLabelProps={{
                                                            shrink: true
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
                                        <div className="price-section">
                                            {props.projectProposals[0]
                                                .isReplySectionActive && (
                                                <>
                                                    <TextField
                                                        className={clsx(
                                                            classes.margin,
                                                            classes.width
                                                        )}
                                                        id="outlined-size-small"
                                                        placeholder="Enter Your Reply"
                                                        onChange={(event) =>
                                                            handleChange(event)
                                                        }
                                                        name="reply"
                                                        multiline
                                                        maxRows={4}
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    {props
                                                                        .projectProposals[0]
                                                                        .isReplySectionActive &&
                                                                        props
                                                                            .projectProposals[0]
                                                                            .isAskedForQuotation &&
                                                                        (props
                                                                            .projectProposals[0]
                                                                            .quotationLink ===
                                                                            null ||
                                                                            props
                                                                                .projectProposals[0]
                                                                                .quotationLink ===
                                                                                undefined) && (
                                                                            <>
                                                                                <input
                                                                                    color="primary"
                                                                                    type="file"
                                                                                    accept="application/pdf"
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        inputFileChosen(
                                                                                            event
                                                                                        )
                                                                                    }
                                                                                    id="icon-button-file"
                                                                                    style={{
                                                                                        display:
                                                                                            'none'
                                                                                    }}
                                                                                />
                                                                            </>
                                                                        )}
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        {props.projectProposals[0]
                                            .isReplySectionActive === true && (
                                            <SendIcon
                                                className="sendIcon_clientCommentBox"
                                                onClick={() => replyApi()}
                                            />
                                        )}
                                    </div>
                                )}
                        </>

                        {props.projectProposals[0]
                            .isQuotationAcceptedByClient === false &&
                            !props.projectProposals[0].isCommentSectionActive &&
                            !props.projectProposals[0].isReplySectionActive &&
                            !isReject && (
                                <>
                                    <div className="conversation-over">
                                        <p>Conversation Over.</p>
                                    </div>
                                    <div className="please_wait">
                                        <p>
                                            Please wait uptill the client accept
                                            the proposal
                                        </p>
                                    </div>
                                </>
                            )}
                    </div>

                    {/* // {overallPriceSection && */}
                    <div
                        style={{
                            display:
                                isRejectOrAccept &&
                                !props.projectProposals[0]
                                    .clientNegotiablePrice &&
                                !props.projectProposals[0]
                                    .agencyNegotiablePrice &&
                                !props.projectProposals[0].finalCostByClient &&
                                'none'
                        }}
                        className={`action-wait ${
                            isRejectOrAccept && 'conditional_width_commentBox'
                        }`}
                    >
                        <div className="topLine"></div>
                        <div className="proposalCard">
                            {!isReject &&
                                props.projectProposals[0]
                                    .isProposalActionActive &&
                                props.projectProposals[0]
                                    .isQuotationAcceptedByClient && (
                                    <div
                                        className={`${
                                            props.projectProposals[0]
                                                .isProposalActionActive &&
                                            props.projectProposals[0]
                                                .isQuotationAcceptedByClient
                                                ? 'conditional_acceptOrReject'
                                                : 'normal_acceptOrReject'
                                        }`}
                                    >
                                        <p>Proceed ahead with this company?</p>
                                    </div>
                                )}
                            <div
                                className={`postQuotation ${
                                    isRejectOrAccept && 'is_flex_direction'
                                }`}
                            >
                                {props.projectProposals[0]
                                    .clientNegotiablePrice && (
                                    <div className="detailsButtons md-m10">
                                        <p>
                                            {`Client Negotiable Price: `}₹
                                            {`${props.projectProposals[0].clientNegotiablePrice}`}
                                        </p>
                                    </div>
                                )}

                                {props.projectProposals[0]
                                    .agencyNegotiablePrice && (
                                    <div className="detailsButtons md-m10">
                                        <p>
                                            {`Your Negotiable Price: `}₹
                                            {`${props.projectProposals[0].agencyNegotiablePrice}`}
                                        </p>
                                    </div>
                                )}

                                {props.projectProposals[0]
                                    .isQuotationAcceptedByClient && (
                                    <div className="detailsButtons md-m10">
                                        <p>
                                            {`Client Final Price: `}₹
                                            {`${props.projectProposals[0].finalCostByClient}`}
                                        </p>
                                    </div>
                                )}

                                {props.projectProposals[0].quotationLink &&
                                    props.projectProposals[0].quotationLink !==
                                        '' && (
                                        <div className="detailsButtons md-m10">
                                            <a
                                                href={
                                                    props.projectProposals[0]
                                                        .quotationLink
                                                }
                                                target="new"
                                            >
                                                View Quotation
                                            </a>
                                        </div>
                                    )}
                            </div>
                            {!isReject &&
                                props.projectProposals[0]
                                    .isProposalActionActive &&
                                props.projectProposals[0]
                                    .isQuotationAcceptedByClient && (
                                    <div>
                                        <div
                                            className={`detailsButtons `}
                                            style={{ marginBottom: '1rem' }}
                                        >
                                            <div>
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
                                                    onClick={() =>
                                                        setOpenWithdrawModal(
                                                            true
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                        {props.projectProposals[0]
                                            .isReplySectionActive ===
                                            'false' && (
                                            <p className="color-black">
                                                Please provide some reply
                                            </p>
                                        )}
                                    </div>
                                )}
                            {!isReject &&
                            !isAccept &&
                            props.projectProposals[0].isAskedForQuotation &&
                            !props.projectProposals[0].quotationLink &&
                            file === null ? (
                                <div className="quotation_file_upload">
                                    <p className="upload_file_quoatation">
                                        Please upload a document with the
                                        following details:
                                        <ol>
                                            <li>Price Quotation</li>
                                            <li>Timeline</li>
                                            <li>
                                                Why you are a good fit for the
                                                project
                                            </li>
                                        </ol>
                                    </p>
                                    <label
                                        htmlFor="icon-button-file"
                                        style={{ margin: '25% 33%' }}
                                    >
                                        <img
                                            className="fileUpload_shortTerm"
                                            src={FileUploadImage}
                                            alt="file_upload_icon"
                                            onChange={(event) =>
                                                inputFileChosen(event)
                                            }
                                        />
                                    </label>
                                </div>
                            ) : (
                                props.projectProposals[0]
                                    .isReplySectionActive && (
                                    <div className="upload_file_quoatation">
                                        <p>{file?.name.slice(0, 20)}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <Modal
                        open={open}
                        onClose={() => {
                            setOpen(false);
                        }}
                        center
                        classNames={{
                            overlay: 'QuotationModalOverlay',
                            modal: 'QuotationModal QuotationModal_agencyCommentBox'
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
                                            <span className="dot"></span>
                                            <p>
                                                <Moment
                                                    format="D MMM YYYY"
                                                    withTitle
                                                >
                                                    {
                                                        props
                                                            .projectProposals[0]
                                                            .projectStartDateByClient
                                                    }
                                                </Moment>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="quotationTable">
                                        <div className="tableHeaderQuotation">
                                            <p>
                                                Project Delayed Start Date By
                                                Client
                                            </p>
                                        </div>
                                        <div className="tableContentQuotation">
                                            <span className="dot"></span>
                                            <p>
                                                <Moment
                                                    format="D MMM YYYY"
                                                    withTitle
                                                >
                                                    {
                                                        props
                                                            .projectProposals[0]
                                                            .projectDelayedStartDateByClient
                                                    }
                                                </Moment>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="quotationTable">
                                        <div className="tableHeaderQuotation">
                                            <p>Project End Date By Client</p>
                                        </div>
                                        <div className="tableContentQuotation">
                                            <span className="dot"></span>
                                            <p>
                                                <Moment
                                                    format="D MMM YYYY"
                                                    withTitle
                                                >
                                                    {
                                                        props
                                                            .projectProposals[0]
                                                            .projectEndDateByClient
                                                    }
                                                </Moment>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="quotationTable">
                                        <div className="tableHeaderQuotation">
                                            <p>
                                                Project Expected End Date By
                                                Client
                                            </p>
                                        </div>
                                        <div className="tableContentQuotation">
                                            <span className="dot"></span>{' '}
                                            <p>
                                                <Moment
                                                    format="D MMM YYYY"
                                                    withTitle
                                                >
                                                    {
                                                        props
                                                            .projectProposals[0]
                                                            .projectExpectedEndDateByClient
                                                    }
                                                </Moment>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="quotationTable">
                                        <div className="tableHeaderQuotation">
                                            <p>Project Start Date By You</p>
                                        </div>
                                        <div
                                            style={{ width: '50%' }}
                                            className="tableContentQuotation"
                                        >
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <div
                                                    className="datePickers"
                                                    style={{ width: '100%' }}
                                                >
                                                    <DesktopDatePicker
                                                        inputFormat="dd/MM/yyyy"
                                                        minDate={
                                                            new Date(
                                                                props.projectProposals[0].projectStartDateByClient
                                                            )
                                                        }
                                                        maxDate={
                                                            new Date(
                                                                props.projectProposals[0].projectExpectedEndDateByClient
                                                            )
                                                        }
                                                        value={
                                                            quotationAcceptForm.projectStartDate
                                                        }
                                                        onChange={(event) =>
                                                            handleChangeDate(
                                                                'projectStartDate',
                                                                event
                                                            )
                                                        }
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                onKeyDown={(
                                                                    e
                                                                ) =>
                                                                    e.preventDefault()
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="quotationTable">
                                        <div className="tableHeaderQuotation">
                                            <p>Final Cost </p>
                                        </div>
                                        <div className="tableContentQuotation">
                                            <p>
                                                {
                                                    props.projectProposals[0]
                                                        .finalCostByClient
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="quotationSubmitButton quotationSubmit_clientCommentBox">
                                    <button
                                        style={{ textAlign: 'center' }}
                                        onClick={handleProjectAcceptance}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        open={openWithdrawModal}
                        onClose={() => {
                            setOpenWithdrawModal(false);
                        }}
                        center
                        classNames={{
                            overlay: 'QuotationModalOverlay',
                            modal: 'QuotationModal'
                        }}
                    >
                        <div className="rejection_modal_clientCommentBox">
                            <div className="reject-reason_label">
                                <h2>Reason for Rejection</h2>
                            </div>
                            <div className="radioButtons_with_textBox">
                                <FormControl
                                    component="fieldset"
                                    style={{ marginLeft: '25px' }}
                                >
                                    <RadioGroup
                                        column
                                        aria-label="position"
                                        name="rejectReasonByAgency"
                                        onChange={onQuotationRejectionChange}
                                        defaultValue="top"
                                    >
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
                                {quotationRejectionForm.rejectReasonByAgency !==
                                    'No Matching Requirements' &&
                                    quotationRejectionForm.rejectReasonByAgency !==
                                        'Taking Too Much Time' &&
                                    quotationRejectionForm.rejectReasonByAgency !==
                                        'Cost is too low' && (
                                        <div
                                            className="detailed_description_clientCommentBox"
                                            style={{ display: 'grid' }}
                                        >
                                            <label>Detailed description:</label>
                                            <textarea
                                                className="reject_textArea"
                                                placeholder="Please type your reason here"
                                                name="rejectReasonByAgency"
                                                cols="30"
                                                rows="5"
                                                onChange={
                                                    onQuotationRejectionChange
                                                }
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div
                            className="submit-rejection"
                            onClick={handleProjectRejection}
                        >
                            <div>
                                <p>Submit</p>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default AgencyCommentBox;
