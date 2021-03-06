import React, { useState, useRef } from 'react';

import instance from '../../../Constants/axiosConstants';
import { Modal } from 'react-responsive-modal';
import './ClientCommentBox.css';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import moment from 'moment';

import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import bgPic from '../../../assets/images/Quotation/bgPic.svg';
import Spinner from '../../Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        width: '100%'
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    },
    root: {
        '& .MuiFormControl-root': {
            width: '100%'
        }
    }
}));

const ClientCommentBox = (props) => {
    const isRejectOrAccept =
        props.projectProposals[0].rejectReasonByClient ||
        props.projectProposals[0].rejectReasonByAgency ||
        props.projectProposals[0].isQuotationAcceptedByClient ||
        props.projectProposals[0].isQuotationAcceptedByAgency;

    const isReject =
        props.projectProposals[0].rejectReasonByClient ||
        props.projectProposals[0].rejectReasonByAgency;

    const [loading, setLoading] = useState(false);
    const projectStartDateByClientRef = useRef();

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const onCloseModal = () => setOpen(false);
    const [openRejectionModal, setOpenRejectionModal] = useState(false);

    const [quotationFormData, setQuotationFormData] = useState({
        agencyId: props?.agencyId || '',
        isQuotationAcceptedByClient: true,
        projectStartDateByClient: new Date(),
        projectDelayedStartDateByClient: '',
        projectEndDateByClient: '',
        projectExpectedEndDateByClient: '',
        finalCostByClient: ''
    });

    const [quotationRejectionForm, setQuotationRejectionForm] = useState({
        rejectReasonByClient: '',
        agencyId: props?.agencyId || '',
        isQuotationAcceptedByClient: false
    });

    const handleChangeDate = (name, value) => {
        if (value === null) {
            quotationFormData.projectStartDateByClient = null;
            quotationFormData.projectDelayedStartDateByClient = null;
            quotationFormData.projectEndDateByClient = null;
            quotationFormData.projectExpectedEndDateByClient = null;
        }
        setQuotationFormData({
            ...quotationFormData,
            [name]: value
        });
    };

    const onQuotationChange = (event) => {
        const { name, value } = event.target;
        if (name === 'finalCostByClient') {
            if (value > 2 * props?.projectProposalCost) {
                toast.error(
                    'Final cost cannot be greater than the twice the proposal cost'
                );
                return;
            }
        }
        setQuotationFormData({
            ...quotationFormData,
            [name]: value
        });
    };

    const onQuotationRejectionChange = (event) => {
        const { name, value } = event.target;
        setQuotationRejectionForm({
            ...quotationRejectionForm,
            [name]: value
        });
    };

    const [apiData, setApiData] = useState({
        agencyId: props.agencyId,
        isShortListed: true,
        negotiablePrice: '',
        comment: '',
        clientNegotiablePrice: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        // setApiData({
        //   ...apiData,
        //   [name]: value,
        // });
        if (name === 'clientNegotiablePrice') {
            if (
                value.length <= 8 &&
                value <= props.projectProposals[0].agencyNegotiablePrice * 2
            ) {
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

    const replyApi = () => {
        setLoading(true);
        instance
            .patch(`api/client/projects/propose/${props.projectId}`, apiData)
            .then(function (response) {
                props.giveReplies(true);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const askForQuotation = () => {
        setLoading(true);
        const quotationData = {
            agencyId: props.agencyId,
            isShortListed: true,
            isAskedForQuotation: true,
            negotiablePrice: '',
            comment: 'Kindly Share the Quotation document.'
        };
        instance
            .patch(
                `api/client/projects/propose/${props.projectId}`,
                quotationData
            )
            .then(function (response) {
                props.giveReplies(true);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const validateForm = () => {
        setLoading(false);
        if (
            quotationFormData.projectStartDateByClient === '' ||
            quotationFormData.projectStartDateByClient === null
        ) {
            toast.error("Start date can't be blank");
            return false;
        } else if (
            quotationFormData.projectDelayedStartDateByClient === '' ||
            quotationFormData.projectDelayedStartDateByClient === null
        ) {
            toast.error("Delayed date can't be blank");
            return false;
        } else if (
            quotationFormData.projectEndDateByClient === '' ||
            quotationFormData.projectEndDateByClient === null
        ) {
            toast.error("End date can't be blank");
            return false;
        } else if (
            quotationFormData.projectExpectedEndDateByClient === '' ||
            quotationFormData.projectExpectedEndDateByClient === ''
        ) {
            toast.error("Expected End-Date can't be blank");
            return false;
        } else if (quotationFormData.finalCostByClient === '') {
            toast.error("Price can't be blank");
        } else {
            return true;
        }
    };

    const handleProjectAcceptance = () => {
        setLoading(true);
        if (validateForm()) {
            instance
                .patch(
                    `api/client/projects/proposal-action/${props.projectId}`,
                    quotationFormData
                )
                .then(function (response) {
                    props.giveReplies(true);
                    onCloseModal();
                    setLoading(false);
                    setOpenRejectionModal(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setOpenRejectionModal(false);
                });
        }
    };

    const checkErrors = () => {
        if (
            quotationRejectionForm.rejectReasonByClient === '' ||
            quotationRejectionForm.rejectReasonByClient === undefined
        ) {
            setLoading(false);
            toast.error('Field can"t be empty');
            return false;
        } else {
            return true;
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
                    setLoading(false);
                    setOpenRejectionModal(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setOpenRejectionModal(false);
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
                        className={`commentBox ${isRejectOrAccept && 'conditional_width_commentBox'
                            }`}
                    >
                        <div className="topLine"></div>
                        <img
                            className="hardcoded_comment_image"
                            src={bgPic}
                            alt="img"
                        />
                        <div className="chatBox-parent">
                            {props.projectProposals[0].comments.map((index) => {
                                return (
                                    <>
                                        {index.comment && (
                                            <div className="chatBox">
                                                <p
                                                    style={{
                                                        backgroundColor:
                                                            'rgb(69, 164, 228)'
                                                    }}
                                                >
                                                    {index.comment}
                                                </p>
                                                <b>You</b>
                                            </div>
                                        )}
                                        {index.reply && (
                                            <div className="chatBox chatBox-left">
                                                <p
                                                    style={{
                                                        backgroundColor:
                                                            'rgb(234, 243, 255)',
                                                        color: 'black'
                                                    }}
                                                >
                                                    {index.reply}
                                                </p>
                                                <b>{`${props.projectProposals[0]?.agencyId?.agencyName}`}</b>
                                            </div>
                                        )}
                                        {!isReject &&
                                            props.projectProposals[0]
                                                .isReplySectionActive &&
                                            index.reply === undefined && (
                                                <p className="waiting_left">
                                                    Waiting for the reply from
                                                    Agency.
                                                </p>
                                            )}
                                        {!props.projectProposals[0]
                                            .isAskedForQuotation &&
                                            props.projectProposals[0]
                                                .isCommentSectionActive &&
                                            props.projectProposals[0]
                                                .isShortListed &&
                                            !props.projectProposals[0]
                                                .isQuotationAcceptedByClient &&
                                            !props.projectProposals[0]
                                                .rejectReasonByClient && (
                                                <div className="detailsButtons margin-0">
                                                    <button
                                                        onClick={
                                                            askForQuotation
                                                        }
                                                    >
                                                        Ask For Quotation
                                                    </button>
                                                </div>
                                            )}
                                    </>
                                );
                            })}
                        </div>

                        {!isRejectOrAccept &&
                            props.projectProposals[0].isAskedForQuotation &&
                            props.projectProposals[0]
                                .isCommentSectionActive && (
                                <div className="commentParent">
                                    {!props.projectProposals[0]
                                        .clientNegotiablePrice && (
                                            <div
                                                className="postQuotation"
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                <TextField
                                                    className={clsx(
                                                        classes.margin,
                                                        classes.width
                                                    )}
                                                    name="clientNegotiablePrice"
                                                    id="outlined-number"
                                                    type="text"
                                                    placeholder="Client Negotiable Price"
                                                    onChange={(event) =>
                                                        handleChange(event)
                                                    }
                                                    variant="outlined"
                                                    value={
                                                        apiData.clientNegotiablePrice
                                                    }
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                $
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </div>
                                        )}
                                    <div className="price-section">
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
                                            name="comment"
                                            multiline
                                            maxRows={4}
                                            variant="outlined"
                                        />
                                    </div>
                                    {props.projectProposals[0]
                                        .isCommentSectionActive === true && (
                                            <SendIcon
                                                className="sendIcon_clientCommentBox"
                                                onClick={() => {
                                                    replyApi();
                                                }}
                                            />
                                        )}
                                </div>
                            )}

                        {!props.projectProposals[0].isCommentSectionActive &&
                            !props.projectProposals[0].isReplySectionActive &&
                            !isReject &&
                            props?.projectProposals[0]
                                ?.agencyNegotiablePrice && (
                                <>
                                    <div className="conversation-over">
                                        <p>Coversation Over.</p>
                                    </div>
                                    <div className="please_wait">
                                        <p>Proceed ahead with this company?</p>
                                    </div>
                                </>
                            )}
                    </div>

                    {/* {overallPriceSection && */}

                    <div
                        style={{
                            display:
                                ((isRejectOrAccept &&
                                    !props.projectProposals[0]
                                        .clientNegotiablePrice &&
                                    !props.projectProposals[0]
                                        .agencyNegotiablePrice &&
                                    !props.projectProposals[0]
                                        .finalCostByClient) ||
                                    !props.projectProposals[0].quotationLink) &&
                                'none'
                        }}
                        className={`action-wait ${isRejectOrAccept
                            ? 'conditional_width_commentBox'
                            : ''
                            }`}
                    >
                        <div className="topLine"></div>
                        <div className="proposalCard">
                            {!isRejectOrAccept && (
                                <div
                                    className={`${props.projectProposals[0]
                                        .isProposalActionActive
                                        ? 'conditional_acceptOrReject'
                                        : 'normal_acceptOrReject_clientCommentBox'
                                        }`}
                                >
                                    <p>Proceed ahead with this company?</p>
                                </div>
                            )}

                            <div
                                className={`postQuotation ${isRejectOrAccept && 'is_flex_direction'
                                    }`}
                            >
                                {props.projectProposals[0]
                                    .agencyNegotiablePrice && (
                                        <div className="detailsButtons margin-0">
                                            <p>
                                                {`Agency Negotiable Price: `}$
                                                {`${props.projectProposals[0].agencyNegotiablePrice}`}
                                            </p>
                                        </div>
                                    )}

                                {props.projectProposals[0]
                                    .clientNegotiablePrice && (
                                        <div className="detailsButtons margin-0">
                                            <p>
                                                {`Your Negotiable Price: `}$
                                                {`${props.projectProposals[0].clientNegotiablePrice}`}
                                            </p>
                                        </div>
                                    )}

                                {props.projectProposals[0]
                                    .finalCostByClient && (
                                        <div className="detailsButtons margin-0">
                                            <p>
                                                {`Your Final Price: `}$
                                                {`${props.projectProposals[0].finalCostByClient}`}
                                            </p>
                                        </div>
                                    )}

                                {props.projectProposals[0].quotationLink && (
                                    <div className="detailsButtons margin-0">
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
                            {!isRejectOrAccept && (
                                <div
                                    className={`detailsButtons ${isRejectOrAccept} && isRejectOrAccept`}
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
                                                setOpenRejectionModal(true)
                                            }
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* } */}
                </div>
            )}

            <Modal
                open={open}
                onClose={onCloseModal}
                center
                classNames={{
                    overlay: 'QuotationModalOverlay',
                    modal: 'QuotationModal QuotationModal_clientCommentBox'
                }}
                styles={{
                    closeButton: { outline: 'none' }
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
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <div className="datePickers">
                                            <DesktopDatePicker
                                                className={classes.root}
                                                inputFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                ref={
                                                    projectStartDateByClientRef
                                                }
                                                value={
                                                    quotationFormData.projectStartDateByClient
                                                }
                                                onChange={(event) =>
                                                    handleChangeDate(
                                                        'projectStartDateByClient',
                                                        event
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        onKeyDown={(e) =>
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
                                    <p>Project Delayed Start Date</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <div
                                            className={`datePickers ${quotationFormData.projectStartDateByClient ===
                                                '' &&
                                                'conditional_datePicker'
                                                }`}
                                        >
                                            <DesktopDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                minDate={
                                                    new Date(
                                                        moment(
                                                            quotationFormData.projectStartDateByClient
                                                        ).add('1', 'days')
                                                    )
                                                }
                                                value={
                                                    quotationFormData.projectDelayedStartDateByClient
                                                }
                                                disabled={
                                                    quotationFormData.projectStartDateByClient ===
                                                        ''
                                                        ? true
                                                        : quotationFormData.projectStartDateByClient ===
                                                            'Invalid Date'
                                                            ? true
                                                            : quotationFormData.projectStartDateByClient ===
                                                                null
                                                                ? true
                                                                : false
                                                }
                                                onChange={(event) =>
                                                    handleChangeDate(
                                                        'projectDelayedStartDateByClient',
                                                        event
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        onKeyDown={(e) =>
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
                                    <p>Project End Date</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <div
                                            className={`datePickers ${quotationFormData.projectStartDateByClient ===
                                                '' &&
                                                'conditional_datePicker'
                                                }`}
                                        >
                                            <DesktopDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                disabled={
                                                    quotationFormData.projectDelayedStartDateByClient ===
                                                        ''
                                                        ? true
                                                        : quotationFormData.projectDelayedStartDateByClient ===
                                                            'Invalid Date'
                                                            ? true
                                                            : quotationFormData.projectDelayedStartDateByClient ===
                                                                null
                                                                ? true
                                                                : false
                                                }
                                                minDate={
                                                    new Date(
                                                        moment(
                                                            quotationFormData.projectDelayedStartDateByClient
                                                        ).add('1', 'days')
                                                    )
                                                }
                                                value={
                                                    quotationFormData.projectEndDateByClient
                                                }
                                                onChange={(event) =>
                                                    handleChangeDate(
                                                        'projectEndDateByClient',
                                                        event
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        onKeyDown={(e) =>
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
                                    <p>Project Expected End Date</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <div
                                            className={`datePickers ${quotationFormData.projectStartDateByClient ===
                                                '' &&
                                                'conditional_datePicker'
                                                }`}
                                        >
                                            <DesktopDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                disabled={
                                                    quotationFormData.projectEndDateByClient ===
                                                        ''
                                                        ? true
                                                        : quotationFormData.projectEndDateByClient ===
                                                            'Invalid Date'
                                                            ? true
                                                            : quotationFormData.projectEndDateByClient ===
                                                                null
                                                                ? true
                                                                : false
                                                }
                                                minDate={
                                                    new Date(
                                                        moment(
                                                            quotationFormData.projectEndDateByClient
                                                        ).add('1', 'days')
                                                    )
                                                }
                                                value={
                                                    quotationFormData.projectExpectedEndDateByClient
                                                }
                                                onChange={(event) =>
                                                    handleChangeDate(
                                                        'projectExpectedEndDateByClient',
                                                        event
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        onKeyDown={(e) =>
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
                                <div className="tableContentQuotation finalCost">
                                    <input
                                        maxLength="8"
                                        type="tel"
                                        name="finalCostByClient"
                                        value={
                                            quotationFormData.finalCostByClient
                                        }
                                        onChange={onQuotationChange}
                                    />
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
                </div>
            </Modal>

            <Modal
                open={openRejectionModal}
                onClose={() => setOpenRejectionModal(false)}
                center
                classNames={{
                    overlay: 'QuotationModalOverlay',
                    modal: 'QuotationModal'
                }}
                styles={{
                    closeButton: { outline: 'none' }
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
                                defaultValue="top"
                            >
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

                        {quotationRejectionForm.rejectReasonByClient !==
                            'No Matching Requirements' &&
                            quotationRejectionForm.rejectReasonByClient !==
                            'Taking Too Much Time' &&
                            quotationRejectionForm.rejectReasonByClient !==
                            'Cost is too high' && (
                                <div className="detailed_description_clientCommentBox">
                                    <label>Detailed description:</label>
                                    <textarea
                                        className="reject_textArea"
                                        placeholder="Please type your reason here"
                                        name="rejectReasonByClient"
                                        cols="30"
                                        rows="5"
                                        onChange={onQuotationRejectionChange}
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
        </>
    );
};

export default ClientCommentBox;
