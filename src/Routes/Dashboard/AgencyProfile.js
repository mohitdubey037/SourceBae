/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './AgencyProfile.css';
import growth from '../../assets/images/Newestdashboard/Agency-Profile/total_profile_view.svg';
import document from '../../assets/images/Newestdashboard/Agency-Profile/agency_document.svg';
import Back2 from '../../assets/images/Back/Back2.svg';

import verified from '../../assets/images/Newestdashboard/Agency-Profile/verified.svg';
import iicon from '../../assets/images/Newestdashboard/Agency-Profile/informationNew.svg';
import skillImage from '../../assets/images/Newestdashboard/Agency-Profile/skill-advanced.svg';
import AddYourProduct from '../../assets/images/Newestdashboard/Agency-Profile/view_product.svg';
import Location from '../../assets/images/Newestdashboard/Agency-Profile/location.svg';

import DownImage from '../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import Information from './AgencyProfile/Information';
import SkillsSet from './AgencyProfile/SkillsSet';
import Rules from './AgencyProfile/Rules';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeveloperList from './AgencyProfile/DeveloperList';
// import AgencyPortfolio from "./AgencyProfile/AgencyPortfolio";
import ProfilePortfolio from './AgencyProfile/ProfilePortfolio';
import FeatureLink from './AgencyProfile/FeatureLink';

import { useParams } from 'react-router';
import { AGENCY } from '../../shared/constants';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import instance from '../../Constants/axiosConstants';

import Spinner from '../../Components/Spinner/Spinner';
import Moment from 'react-moment';
import { AGENCYROUTES, CLIENTROUTES } from '../../Navigation/CONSTANTS';
import Header from '../../Components/Header/Header';
import doneIcon from '../../assets/images/AgencyProfile/done.svg';
import location from '../../assets/images/AgencyProfile/location.svg';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { typography } from '@mui/system';
import MainBackImage from '../../assets/images/AgencyProfile/ProfileBack.svg';
import { Bold1827, Bold2024, Bold4265, Bold1619, SemiBold1421, SemiBold1624, SemiBold2030 } from '../../Components/Text/Texts';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150
    },
    noLabel: {
        marginTop: theme.spacing(3)
    },
    menuFont: {
        fontFamily: 'Segoe UI'
    },
    inputField: {
        fontFamily: 'Segoe UI',
        border: '1px solid blue',
        borderRadius: '20px'
    },
    radioBox: {
        borderWidth: 1,
        borderColor: '#000'
    },
    noBorderAccordian: {
        boxShadow: 'none',
        margin: '0px !important',
        marginBottom: '0px',
    },
    noPadding: {
        padding: '0',
        margin: '0px',
        borderBottom: '1px solid #B5B5B5',
        '& .MuiTypography-root': {
            fontFamily: 'Segoe UI',
            color: '#1D2434',
            fontSize: '1.2rem'
        }
    },
    typography: {
        fontFamily: 'Segoe UI',
        fontSize: '1.2rem'
    },
    typography2: {
        fontSize: 'Segoe UI',
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    accordianDetails: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 7px',
    }

}));

function AgencyProfile(props) {
    const classes = useStyles();
    const { id } = useParams();
    const role = localStorage.getItem('role');
    const inputEl = useRef(null);
    const inputPort = useRef(null);

    const [open, setOpen] = useState(false);
    const [navigated, setNavigation] = useState(false);
    const [portNavigated, setPortNavigated] = useState(false);
    const [loading, setLoading] = useState(true);

    const [hoverModal, setHoverModal] = useState(false);
    const onCloseModal = () => setOpen(false);

    const [expanded, setExpanded] = useState(false);

    const handleChanges = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [agencyProfileData, setAgencyProfileData] = useState({
        ownerName: '',
        agencyName: '',
        agencyEmail: '',
        agencyPhone: '',
        agencyDescription: '',
        agencyLogo: '',
        incorporationDate: '',
        agencyTeamSize: '',
        isAgencyRegistered: '',
        productId: '',
        isAgencyVerified: '',
        verificationMessage: '',
        agencyAverageRating: '',
        stepsCompleted: '',
        agencyMonthlyBudget: '',
        agencyServices: [],
        agencyTechnologies: [],
        _id: '',
        agencyDomains: [],
        agencyDocuments: [],
        socialPlatformDetails: [],
        projectDetails: [],
        agencyAddress: {
            address: '',
            location: '',
            _id: ''
        },
        createdAt: '',
        updatedAt: ''
    });

    const getAgencyProfile = (agencyId, profileviewStatus) => {
        let addParam = profileviewStatus ? `?agencyProfileView=1` : ``;
        instance
            .get(`/api/${role}/agencies/get/${agencyId}${addParam}`)
            .then(function (response) {
                setAgencyProfileData({ ...response });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const handleBackOnProfile = () => {
        props.history.goBack();
    };

    const [link, setLink] = useState('');

    const handleChange = (event) => {
        // setLink(event.target.value);
        console.log('hii');
    };

    useEffect(() => {
        id !== null && id !== undefined
            ? getAgencyProfile(id, true)
            : getAgencyProfile(localStorage.getItem('userId'), false);
    }, []);

    useEffect(() => {
        if (
            !navigated &&
            inputEl !== null &&
            props.location.origin === 'addingDeveloper'
        ) {
            inputEl?.current?.click();
            setNavigation(true);
        } else if (navigated) {
            inputEl?.current?.click();
        }
    });

    useEffect(() => {
        if (
            !portNavigated &&
            inputPort !== null &&
            props.location.origin === 'portfolio'
        ) {
            inputPort?.current?.click();
            setPortNavigated(true);
        } else if (portNavigated) {
            inputPort?.current?.click();
        }
    });

    return (
        <>
            {/* {loading ? (
                <Spinner />
            ) 
            : agencyProfileData._id !== '' ? ( */}
            <div className="agnecyProfilemainDiv">
                <Header />
                {/* <img
                        className="Image2_AgencyProfile"
                        src={DownImage}
                        alt="downImage"
                    /> */}
                {/* <div className="mainProfileHeaderImage">
                        <div
                            className={`innerProfileHeaderImage ${role === 'Client' && 'conditionalGradient'
                                }`}
                        >
                            <div className="backButtonAgencyProfile">
                                <div
                                    className="backButton-child"
                                    onClick={handleBackOnProfile}
                                >
                                    <img src={Back2} alt="back" />
                                    <h6>Back</h6>
                                </div>
                            </div>
                            {role === AGENCY ? (
                                agencyProfileData.productId === undefined ? (
                                    <>
                                        <span>
                                            Have a product? Get noticed by
                                            investors!
                                        </span>
                                        <button
                                            disabled={
                                                agencyProfileData.isAgencyVerified ===
                                                false && true
                                            }
                                            style={{
                                                filter: `${!agencyProfileData.isAgencyVerified
                                                    ? `grayscale(100%)`
                                                    : `none`
                                                    }`
                                            }}
                                            onClick={() =>
                                                props.history.push({
                                                    pathname:
                                                        AGENCYROUTES.PRODUCT_FORM,
                                                    condition: AGENCY
                                                })
                                            }
                                        >
                                            Describe your product here
                                            <i
                                                class="fa fa-long-arrow-right"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() =>
                                            props.history.push({
                                                pathname: `${role === AGENCY
                                                    ? AGENCYROUTES.PRODUCT_DETAILS
                                                    : CLIENTROUTES.PRODUCT_DETAILS
                                                    }/${agencyProfileData.productId
                                                    }`,
                                                condition:
                                                    id !== ''
                                                        ? 'agency'
                                                        : 'client'
                                            })
                                        }
                                    >
                                        {role === AGENCY ? (
                                            <p>View Your Product</p>
                                        ) : (
                                            <p>View Agency Product</p>
                                        )}
                                        <img
                                            src={AddYourProduct}
                                            alt="add your product"
                                        />
                                    </button>
                                )
                            ) : (
                                <>
                                    <div className="question_icon">
                                        <i
                                            style={{
                                                fontSize: 22,
                                                color: '#fff'
                                            }}
                                            className="fa fa-info-circle"
                                            aria-hidden="true"
                                            onMouseOver={() =>
                                                setHoverModal(true)
                                            }
                                        ></i>
                                    </div>

                                    {agencyProfileData.productId !==
                                        undefined ? (
                                        <button
                                            style={{
                                                backgroundImage:
                                                    'linear-gradient(284deg, rgb(3, 118, 186) 0%, rgb(1, 48, 77) 100%)'
                                            }}
                                            onClick={() =>
                                                props.history.push({
                                                    pathname: `${role === AGENCY
                                                        ? AGENCYROUTES.PRODUCT_DETAILS
                                                        : CLIENTROUTES.PRODUCT_DETAILS
                                                        }/${agencyProfileData.productId
                                                        }`,
                                                    condition:
                                                        id !== ''
                                                            ? 'Agency'
                                                            : 'Client'
                                                })
                                            }
                                        >
                                            {role === AGENCY
                                                ? 'View Your Product'
                                                : 'View Agency Product'}
                                            <i
                                                class="fa fa-long-arrow-right"
                                                aqqria-hidden="true"
                                            ></i>
                                        </button>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div> */}

                <Modal
                    open={open}
                    classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal'
                    }}
                    onClose={onCloseModal}
                    center
                    styles={{
                        closeButton: { outline: 'none' }
                    }}
                >
                    <div className="mainAskQuestion">
                        <div className="innerAskQuestion">
                            <div className="questionAsking">
                                <h1>Have Any Queries..??</h1>
                                <div className="questionFields">
                                    <input
                                        placeholder="Your Question here"
                                        type="text"
                                        name=""
                                        id=""
                                    />
                                    <button>Ask Question</button>
                                </div>
                            </div>

                            <div className="recetlyAskedQuestion">
                                <h2>Recently Asked Questions</h2>
                                <div>
                                    <h3>
                                        Are your developers willing to work
                                        remotely?
                                    </h3>
                                    <p>Yes.</p>
                                </div>
                                <div>
                                    <h3>
                                        Are your developers willing to work
                                        remotely?
                                    </h3>
                                    <p>Yes.</p>
                                </div>
                                <div>
                                    <h3>
                                        Are your developers willing to work
                                        remotely?
                                    </h3>
                                    <p>Yes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    open={hoverModal}
                    classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal'
                    }}
                    onClose={() => setHoverModal(false)}
                    styles={{
                        closeButton: { outline: 'none' }
                    }}
                    center
                >
                    <div className="mainAskQuestion">
                        <div className="questionAsking">
                            <h3>For any Help:</h3>
                            <h5>Support Email: connect@SourceBae.in</h5>
                            <h5>Support Number: +91 95755 17047</h5>
                        </div>
                    </div>
                </Modal>

                {/* <div className="mainAgencyProfileInfo">
                        <div className="innerAgencyProfileInfo">
                            <div className="mainAgencyProfileLogo">
                                <div className="innerAgencyProfileLogo">
                                    <img
                                        src={agencyProfileData.agencyLogo}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="mainAgencyProfileContent">
                                {(id === null || id === undefined) && (
                                    <div className="agencyProfileConstantPoints">
                                        <div className="pointContent">
                                            <p>Incorporation Date</p>
                                            <h4>
                                                {
                                                    <Moment
                                                        format="D MMM YYYY"
                                                        withTitle
                                                    >
                                                        {
                                                            agencyProfileData?.incorporationDate
                                                        }
                                                    </Moment>
                                                }
                                            </h4>
                                        </div>
                                        <div className="pointContent">
                                            <p>Email ID</p>
                                            <h4>
                                                {agencyProfileData.agencyEmail}
                                            </h4>
                                        </div>
                                        <div className="pointContent">
                                            <p>Company Id</p>
                                            <h4>{agencyProfileData._id}</h4>
                                        </div>
                                        {(id === null || id === undefined) && (
                                            <div
                                                className="pointContent"
                                                style={{
                                                    display: 'flex',
                                                    filter: `${!agencyProfileData?.isAgencyVerified
                                                        ? `grayscale(100%)`
                                                        : `none`
                                                        }`
                                                }}
                                            >
                                                <img
                                                    src={verified}
                                                    alt="verified"
                                                />
                                                <p>{`${!agencyProfileData?.isAgencyVerified
                                                    ? agencyProfileData?.verificationMessage
                                                    : `Verified`
                                                    }`}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> */}

                <div
                    className="mainAgencyProfileInfo"
                >
                    {/* <div className="innerAgencyProfileInfo">
                            <div className="agencyName">
                                <div className="agencyNameURL">
                                    <div className="agencyDEtails">
                                        <h2>{agencyProfileData?.agencyName}</h2>
                                        <p>{`${agencyProfileData?.socialPlatformDetails[0]?.platformLink}`}</p>
                                    </div>
                                </div>
                                <div className="agencyAddress">
                                    <img src={Location} alt="location" />
                                    <span>
                                        {`${agencyProfileData?.agencyAddress?.address}, ${agencyProfileData?.agencyAddress?.location}`}{' '}
                                    </span>
                                </div>
                            </div>
                        </div> */}
                </div>

                {/* <div className="mainAgencyProfileDesc">
                        <div className="innerAgencyProfileDesc">
                            <div className="leftAgencyProfileDesc">
                                <div
                                    className={`aboutUs_parent ${role === 'Client' &&
                                        'conditionalGradient'
                                        }`}
                                >
                                    <h2>About us</h2>
                                </div>
                                <div style={{ width: '70%' }}>
                                    <p>{agencyProfileData.agencyDescription}</p>
                                    <div className="agencyProfileIndustry">
                                        {agencyProfileData &&
                                            agencyProfileData?.agencyDomains?.map(
                                                (domain) => {
                                                    return (
                                                        <p>{`${domain?.domainId
                                                            ?.domainName ||
                                                            ''
                                                            }`}</p>
                                                    );
                                                }
                                            )}
                                    </div>
                                </div>
                            </div>
                            {(id === null || id === undefined) && (
                                <div className="rightAgencyProfileDesc">
                                    <div className="monthyView">
                                        <div className="view_image_parent">
                                            <img
                                                className="view_image"
                                                src={growth}
                                                alt=""
                                            />
                                            <h3 style={{ color: '#000' }} >Total Profile View</h3>
                                        </div>
                                        <p className="profile_count">
                                            {
                                                agencyProfileData.agencyProfileViewCount
                                            }
                                        </p>
                                    </div>
                                    <div className="monthyView agencyProfile">
                                        <div className="view_image_parent">
                                            <img
                                                className="view_image"
                                                src={document}
                                                alt=""
                                            />
                                            <h3 style={{ color: '#000' }} >Company Documents</h3>
                                        </div>

                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={link}
                                                onChange={(event) =>
                                                    handleChanges(event)
                                                }
                                                displayEmpty
                                                className={clsx(
                                                    classes.root,
                                                    classes.inputField
                                                )}
                                                style={{
                                                    boxShadow:
                                                        '1px 2px 3px rgb(0 0 0 / 18%)'
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <span
                                                        style={{
                                                            fontFamily:
                                                                'Segoe UI',
                                                            color: '#707070',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        Select from here
                                                    </span>
                                                </MenuItem>
                                                <MenuItem
                                                    value={
                                                        agencyProfileData
                                                            ?.agencyDocuments[0]
                                                            ?.documentLink
                                                    }
                                                >
                                                    Registration Certificate
                                                </MenuItem>
                                                <MenuItem
                                                    value={
                                                        agencyProfileData
                                                            ?.agencyDocuments[1]
                                                            ?.documentLink
                                                    }
                                                >
                                                    Brochure
                                                </MenuItem>
                                                <MenuItem
                                                    value={
                                                        agencyProfileData
                                                            ?.agencyDocuments[2]
                                                            ?.documentLink
                                                    }
                                                >
                                                    Pancard
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        {link === '' ? (
                                            <span
                                                style={{
                                                    color: '#707070',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Nothing Selected
                                            </span>
                                        ) : (
                                            <a
                                                style={{
                                                    textDecoration: 'none'
                                                }}
                                                className="uploadButton"
                                                href={link}
                                                target="new"
                                            >
                                                View Document
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> */}

                <div onClick={handleBackOnProfile} className='mainBack'>
                    <img src={MainBackImage} alt="main_back_image" />
                    {/* <p>Agency Profile Page</p> */}
                    <Bold1827 text={'Agency Profile Page'} style={{ width: '100%', textAlign: 'center' }} />
                </div>

                <div className="mainQuotation_agencyProfile">
                    <div className='select_div'>
                        <div className='profile_img_main'>
                            <div className='profile_img'>
                                <img src={agencyProfileData.agencyLogo} alt="" />
                            </div>
                        </div>
                        <div className='statement_div'>
                            <div className='statements'>
                                <div className='design_statement'>
                                    {/* <p>Design Chocolate</p> */}
                                    <Bold2024 text={'Agency Profile Page'} style={{ width: '100%', textAlign: 'center' }} />
                                    <img src={doneIcon} alt="location" />
                                </div>
                                {/* <p className='design_com'>www.design.com</p> */}
                                <SemiBold1624 text={'design_com'} style={{ width: '100%', textAlign: 'center', color: 'rgba(29, 36, 52, 0.5)', margin: '1rem 0' }} />
                                <div className='location_div'>
                                    <img src={location} alt="location" />
                                    <SemiBold1624 text={'indore'} style={{ width: '100%', textAlign: 'center' }} />
                                    <SemiBold1624 text={'india'} style={{ width: '100%', textAlign: 'center' }} />
                                    {/* <p>indore,</p>
                                    <p>india</p> */}
                                </div>
                                <hr className='horizontal'></hr>
                            </div>
                        </div>
                        <div className='accordians'>

                            <Accordion style={{ borderTop: '1px solid #B5B5B5' }} className={classes.noBorderAccordian} expanded={expanded === 'panel1'} onChange={handleChanges('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    className={classes.noPadding}
                                >
                                    <SemiBold2030 text={'Domain'} />

                                    {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Domain
                                    </Typography> */}
                                </AccordionSummary>
                                <AccordionDetails style={{ paddingLeft: '0px' }}>
                                    {agencyProfileData &&
                                        agencyProfileData?.agencyDomains?.map(
                                            (domain) => {
                                                return (
                                                    // <Typography style={{ paddingLeft: '0px' }} className={classes.typography}>{domain.domainId.domainName}</Typography>
                                                    <SemiBold1624 text={domain?.domainId.domainName} style={{ color: 'rgba(29, 36, 52, 0.5)' }} />

                                                    // <p>{`${domain?.domainId
                                                    //     ?.domainName ||
                                                    //     ''
                                                    //     }`}</p>
                                                );
                                            }
                                        )}
                                    {/* <Typography className={classes.typography}>
                                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                        Aliquam eget maximus est, id dignissim quam.
                                    </Typography> */}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.noBorderAccordian} expanded={expanded === 'panel2'} onChange={handleChanges('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                    className={classes.noPadding}
                                >
                                    <SemiBold2030 text={'Description'} />
                                    {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>Description</Typography> */}

                                </AccordionSummary>
                                <AccordionDetails style={{ paddingLeft: '0px' }} className={classes.accordianDetails}>

                                    {/* <Typography variant='h5' className={classes.typography}>
                                        {agencyProfileData.agencyDescription}
                                    </Typography> */}
                                    <SemiBold1624 text={agencyProfileData.agencyDescription} style={{ color: 'rgba(29, 36, 52, 0.5)' }} />
                                    {/* <Typography variant="h5" className={classes.typography2}>
                                        Email: <span>connect@SourceBae.in</span>
                                    </Typography>
                                    <Typography style={{ marginTop: '1rem' }} variant="h5" className={classes.typography2}>
                                        Support Number: <span>+91 95755 17047</span>
                                    </Typography> */}
                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.noBorderAccordian} expanded={expanded === 'panel3'} onChange={handleChanges('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3bh-content"
                                    id="panel3bh-header"
                                    className={classes.noPadding}
                                >
                                    {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        Agency Document
                                    </Typography> */}
                                    <SemiBold2030 text={'Agency Document'} />
                                </AccordionSummary>
                                <AccordionDetails style={{ paddingLeft: '0rem' }} className={classes.accordianDetails}>
                                    {/* <Typography  className={classes.typography}> */}
                                    <ul className='accordian_ul'>
                                        <li><a href={link}>Registration Certificate</a></li>
                                        <li><a href={link}>Brochure</a></li>
                                        <li><a href={link}>Pancard</a></li>
                                    </ul>

                                    {/* </Typography> */}
                                </AccordionDetails>
                            </Accordion>
                            <div className={'profileViewTypography'}>
                                <SemiBold2030 text={'Total profile view'} />
                                <SemiBold2030 text={agencyProfileData.agencyProfileViewCount} style={{ paddingRight: '5px' }} />

                                {/* <Typography className={classes.typography}>
                                    Total profile view
                                </Typography> */}
                                {/* <Typography className={classes.typography} style={{ marginRight: '7px' }}>
                                    {agencyProfileData.agencyProfileViewCount}
                                </Typography> */}
                            </div>
                        </div>
                    </div>
                    <div className="innerQuotation_agencyProfile">
                        <div
                            class="nav nav-tabs nav-tabs_agencyProfile"
                            id="nav-tab"
                            role="tablist"
                        >
                            <div
                                style={{ marginLeft: '20px' }}
                                id="nav-home-tab"
                                className="nav-link active"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-home"
                                type="button"
                                role="tab"
                                aria-controls="nav-home"
                                aria-selected="true"
                            >
                                {/* <img src={iicon} alt="information" /> */}
                                <button class="nav-button nav-link_agencyProfile">
                                    <SemiBold2030 text={'Information'} />
                                </button>
                            </div>

                            <div
                                id="nav-profile-tab"
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-profile"
                                type="button"
                                role="tab"
                                aria-controls="nav-profile"
                                aria-selected="false"
                            >
                                {/* <img src={skillImage} alt="skills" /> */}
                                <button class="nav-button nav-link_agencyProfile">
                                    <SemiBold2030 text={'Skill Set'} />
                                </button>
                            </div>

                            <div
                                id="nav-contact-tab"
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-contact"
                                type="button"
                                role="tab"
                                aria-controls="nav-contact"
                                aria-selected="false"
                            >
                                {/* <img src={iicon} alt="rules" /> */}
                                <button class="nav-button nav-link_agencyProfile">
                                    {/* Agency Rules */}
                                    <SemiBold2030 text={'Agency Rules'} />
                                </button>
                            </div>

                            <div
                                id="nav-portfolio-tab"
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-portfolio"
                                type="button"
                                role="tab"
                                aria-controls="nav-portfolio"
                                aria-selected="false"
                                ref={inputPort}
                            >
                                {/* <img src={iicon} alt="Portfolio" /> */}
                                <button class="nav-button nav-link_agencyProfile">
                                    {/* Agency Portfolio */}
                                    <SemiBold2030 text={'Agency Portfolio'} />
                                </button>
                            </div>

                            {role === AGENCY && (
                                <div
                                    id="nav-developer-tab"
                                    className="nav-link"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-developer"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-developer"
                                    aria-selected="false"
                                    ref={inputEl}
                                >
                                    {/* <img src={iicon} alt="dev" /> */}
                                    <button class="nav-button nav-link_agencyProfile">
                                        {/* Developers */}
                                        <SemiBold2030 text={'Developers'} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div class="tab-content" id="nav-tabContent">
                            <div
                                class="tab-pane fade show active"
                                id="nav-home"
                                role="tabpanel"
                                aria-labelledby="nav-home-tab"
                            >
                                <Information
                                    data={agencyProfileData}
                                    id={id}
                                />
                            </div>
                            <div
                                class="tab-pane fade"
                                id="nav-profile"
                                role="tabpanel"
                                aria-labelledby="nav-profile-tab"
                            >
                                <SkillsSet
                                    data={agencyProfileData}
                                    id={id}
                                />
                            </div>
                            <div
                                class="tab-pane fade"
                                id="nav-contact"
                                role="tabpanel"
                                aria-labelledby="nav-contact-tab"
                            >
                                <Rules data={agencyProfileData} id={id} />
                            </div>
                            <div
                                class="tab-pane fade"
                                id="nav-developer"
                                role="tabpanel"
                                aria-labelledby="nav-developer-tab"
                            >
                                <DeveloperList
                                    data={agencyProfileData}
                                    id={id}
                                />
                            </div>
                            <div
                                class="tab-pane fade"
                                id="nav-portfolio"
                                role="tabpanel"
                                aria-labelledby="nav-portfolio-tab"
                            >
                                <ProfilePortfolio id={id} />
                            </div>
                            <div
                                class="tab-pane fade"
                                id="nav-review"
                                role="tabpanel"
                                aria-labelledby="nav-review-tab"
                            >
                                <DeveloperList
                                    data={agencyProfileData}
                                    id={id}
                                />
                            </div>
                            <div
                                class="tab-pane fade"
                                id="nav-question"
                                role="tabpanel"
                                aria-labelledby="nav-question-tab"
                            >
                                <FeatureLink id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* )
            : (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh'
                }}
            >
                <h1> No agency found with this ID. </h1>
            </div>
            )} */}
        </>
    );
}

export default AgencyProfile;
