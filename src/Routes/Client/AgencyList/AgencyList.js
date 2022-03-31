/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './AgencyList.css';
import 'react-responsive-modal/styles.css';

import { Modal } from 'react-responsive-modal';
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import Sidebar from '../../../Components/ClientNewestDashboard/Sidebar/Sidebar';

import instance from '../../../Constants/axiosConstants';
import { useParams } from 'react-router';
import Spinner from '../../../Components/Spinner/Spinner';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import DownImage from '../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import { CLIENT } from '../../../shared/constants';
import Back2 from '../../../assets/images/Back/Back2.svg';
import { AGENCYROUTES, CLIENTROUTES } from '../../../Navigation/CONSTANTS';

function AgencyList(props) {
    const Role = localStorage.getItem('role');
    let { projectId } = useParams();
    console.log(useParams());
    projectId = projectId || '';
    const [agencyList, setAgencyList] = useState([]);
    const [open, setOpen] = useState(false);
    const [openQuotation, setOpenQuotation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(-1);

    const [project, setProject] = useState([]);
    const [originalAgencyList, setOriginalAgencyList] = useState([]);

    const openShortlistModal = (_id, indexParam) => {
        setOpen(true);
        setIndex(indexParam);
        setShortlistFormData({
            ...shortlistFormData,
            agencyId: _id
        });
    };
    const onCloseModal = () => setOpen(false);

    const onOpenQuotationModel = (_id, indexParam) => {
        setIndex(indexParam);
        setOpenQuotation(true);
        setQuotationFormData({
            ...QuotationFormData,
            agencyId: _id
        });
    };
    const onCloseQuotation = () => setOpenQuotation(false);

    const handleBackOnProfile = () => {
        props.history.goBack();
    };
    const [shortlistFormData, setShortlistFormData] = useState({
        comment: '',
        isShortListed: true
    });

    const [QuotationFormData, setQuotationFormData] = useState({
        isShortListed: true,
        isAskedForQuotation: true,
        negotiablePrice: null,
        comment: ''
    });

    useEffect(() => {
        instance
            .get(`/api/${Role}/projects/${projectId}/agencies`)
            .then(function (response) {
                setAgencyList(response.agencies);
                setOriginalAgencyList(response.agencies);
                setProject(response.project);
                setLoading(false);
            });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setShortlistFormData({
            ...shortlistFormData,
            [name]: value
        });
    };

    const handleQuotationChange = (event) => {
        let { name, value } = event.target;
        if (name === 'negotiablePrice' && value !== '') {
            if (parseInt(value) <= project.projectProposalCost * 2) {
                setQuotationFormData({
                    ...QuotationFormData,
                    [name]: value
                });
            }
        } else {
            setQuotationFormData({
                ...QuotationFormData,
                [name]: value
            });
        }
    };

    const shortlistHandler = () => {
        setLoading(true);
        instance
            .patch(
                `/api/${Role}/projects/propose/${projectId}`,
                shortlistFormData
            )
            .then(function (response) {
                const tempAgencyList = [...agencyList];
                tempAgencyList[index].isAgencyShortListed = true;
                setAgencyList(tempAgencyList);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
        onCloseModal();
    };

    const quotationSubmitHandler = () => {
        setLoading(true);
        instance
            .patch(
                `/api/${Role}/projects/propose/${projectId}`,
                QuotationFormData
            )
            .then(function (response) {
                const tempAgencyList = [...agencyList];
                tempAgencyList[index].isAgencyAskedForQuotation = true;
                setAgencyList(tempAgencyList);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
        onCloseQuotation();
    };

    const notificationVisible = (status) => {
        setVisible(status);
    };

    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText !== '') {
            const tempAgencyList = agencyList.filter((agency) => {
                return agency?.agencyName
                    ?.toLowerCase()
                    ?.includes(searchText?.toLowerCase());
            });
            setAgencyList(tempAgencyList);
        } else {
            setAgencyList(originalAgencyList);
        }
    }, [searchText]);

    return (
        <div classname="mainImageDiv">
            {/* <img className="Image1_agencyList" src={UpImage} alt="upImage" /> */}
            <img
                className="Image2_agencyList"
                src={DownImage}
                alt="downImage"
            />
            <>
                <div className="SidebarAgencyList">
                    <Sidebar
                        notificationVisible={(status) =>
                            notificationVisible(status)
                        }
                    />
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div
                            style={{ zIndex: visible && '-1' }}
                            className="main_parent_agencyList"
                        >
                            <Navbar />

                            <div className="innerProjectDetail_parent">
                                <div
                                    className="backButton-child"
                                    onClick={handleBackOnProfile}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '10%',
                                        marginLeft: '1rem',
                                        marginBottom: '2rem'
                                    }}
                                >
                                    <img src={Back2} alt="back" />
                                    <h6>Back</h6>
                                </div>
                                <div className="innerprojectDetailsInfo_agencyList">
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <p>
                                            {`Project Title:- `}
                                            <span>{project.projectName}</span>
                                        </p>
                                        <p style={{ fontSize: '1rem' }}>
                                            {`Budget:-`}
                                            <span>
                                                ₹ {project.projectProposalCost}
                                            </span>
                                        </p>
                                    </div>

                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                        value={searchText}
                                        placeholder="Search Agency"
                                        className="search_agencyList"
                                    />
                                </div>

                                {agencyList?.length > 0 ? (
                                    <div className="innerAgencyList_agencyList">
                                        <div className="AgencyCardsArea_agencyList">
                                            {agencyList?.length > 0 &&
                                                agencyList?.map(
                                                    (agency, index) => {
                                                        return (
                                                            <div className="agencyPreciseCard_agencyList">
                                                                <div className="agencyCardHeaderInfo agencyListDiv">
                                                                    <div className="agencyImageProfile_agencyList">
                                                                        <div className=" agencyImageArea agencyImageArea_Img  ">
                                                                            <img
                                                                                src={
                                                                                    agency.agencyLogo
                                                                                }
                                                                                alt="agency Logo"
                                                                            />
                                                                        </div>
                                                                        <div className="agencyProfileInfo agencyProfileInfodiv">
                                                                            <h6>
                                                                                {
                                                                                    agency.agencyName
                                                                                }
                                                                            </h6>
                                                                            {agency
                                                                                .agencyServices
                                                                                .length >
                                                                                0 &&
                                                                                agency.agencyServices.map(
                                                                                    (
                                                                                        service
                                                                                    ) => (
                                                                                        <div>
                                                                                            <p>
                                                                                                {
                                                                                                    service?.serviceName
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="profileButton">
                                                                        <p
                                                                            onClick={() =>
                                                                                props.history.push(
                                                                                    {
                                                                                        pathname: `${AGENCYROUTES.PROFILE}/${agency._id}`,
                                                                                        condition:
                                                                                            CLIENT
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            View
                                                                            Profile
                                                                            Details
                                                                            <i
                                                                                class="fa fa-angle-double-right"
                                                                                aria-hidden="true"
                                                                            ></i>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="middleAgencyArea agencylistCont">
                                                                    <div className="agencyAddressTeam addressTeam_AgencyList">
                                                                        <h6
                                                                            style={{
                                                                                fontSize:
                                                                                    '14px'
                                                                            }}
                                                                        >
                                                                            Miscellaneous
                                                                            Info
                                                                        </h6>
                                                                        <div className="agencyAddressArea locationAddressArea">
                                                                            <div className="locationIcon">
                                                                                <i
                                                                                    class="fa fa-globe"
                                                                                    aria-hidden="true"
                                                                                ></i>
                                                                            </div>
                                                                            <div className="locationText">
                                                                                <p>{`${agency?.agencyAddress?.address} ${agency?.agencyAddress?.location}`}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="agencyAddressArea">
                                                                            <div className="teamIcon">
                                                                                <i
                                                                                    class="fa fa-users"
                                                                                    aria-hidden="true"
                                                                                ></i>
                                                                            </div>
                                                                            <div className="teamNumberPart">
                                                                                <p
                                                                                    style={{
                                                                                        fontSize:
                                                                                            '14px'
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        style={{
                                                                                            fontFamily:
                                                                                                'Segoe UI',
                                                                                            color: '#707070',
                                                                                            fontSize:
                                                                                                '14px'
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            agency.agencyTeamSize
                                                                                        }
                                                                                    </span>
                                                                                    members
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="agencyDescInfo agencydiv">
                                                                        <h6>
                                                                            Description
                                                                        </h6>
                                                                        <p>
                                                                            {
                                                                                agency.agencyDescription
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="quotationShortlistButton2 agencyListButton">
                                                                    {agency.isAgencyAskedForQuotation ? (
                                                                        <div
                                                                            onClick={() =>
                                                                                // props.history.push(
                                                                                //     {
                                                                                //         pathname: `${CLIENTROUTES.PROJECT_DETAILS}/${projectId}/${agency._id}`,
                                                                                //         condition:
                                                                                //             CLIENT
                                                                                //     }
                                                                                // )
                                                                                alert(
                                                                                    'ok'
                                                                                )
                                                                            }
                                                                        >
                                                                            <p>
                                                                                Show
                                                                                Details
                                                                            </p>
                                                                        </div>
                                                                    ) : agency.isAgencyShortListed ||
                                                                      agency.isAgencyAskedForQuotation ? (
                                                                        <>
                                                                            <div
                                                                                onClick={() =>
                                                                                    props.history.push(
                                                                                        {
                                                                                            pathname: `${CLIENTROUTES.PROJECT_DETAILS}/${projectId}/${agency._id}`,
                                                                                            condition:
                                                                                                CLIENT
                                                                                        }
                                                                                    )
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    Show
                                                                                    Details
                                                                                </p>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <div
                                                                                className="ShortlistTool"
                                                                                onClick={() =>
                                                                                    openShortlistModal(
                                                                                        agency._id,
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    Shortlist
                                                                                </p>
                                                                            </div>
                                                                            <div
                                                                                className="getQuotationTool"
                                                                                onClick={() =>
                                                                                    onOpenQuotationModel(
                                                                                        agency._id,
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <p>
                                                                                    Get
                                                                                    Quotation
                                                                                </p>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="noDataFound">
                                        <img
                                            src={PageNotFound}
                                            alt="no data found"
                                        />
                                        <h6
                                            style={{
                                                marginTop: '20px',
                                                fontStyle: 'italic'
                                            }}
                                        >
                                            No Agency Found!!!..
                                        </h6>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Modal for shortlist  */}
                <Modal
                    open={open}
                    onClose={onCloseModal}
                    center
                    classNames={{
                        overlay: 'ShortListModalOverlay',
                        modal: 'ShortListModal'
                    }}
                    styles={{
                        closeButton: { outline: 'none' }
                    }}
                >
                    <div className="shortlistModal_agencyList">
                        <h2>ShortList</h2>
                        <div className="shortlistForm comment">
                            <span>Comment Box</span>
                            <textarea
                                style={{ fontSize: '14px' }}
                                onChange={(event) => handleChange(event)}
                                name="comment"
                                id=""
                                cols="30"
                                rows="10"
                                placeholder="Type from here..."
                            ></textarea>
                            <button
                                className="margin-top"
                                onClick={shortlistHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Quotation Modal  */}
                <Modal
                    open={openQuotation}
                    onClose={onCloseQuotation}
                    center
                    classNames={{
                        overlay: 'QuotationModalOverlay',
                        modal: 'QuotationModal'
                    }}
                    styles={{
                        closeButton: { outline: 'none' }
                    }}
                >
                    <div className="QuotationModal">
                        <h2>Quotation</h2>
                        <div className="QuotationModalForm">
                            <div className="innerQuotation">
                                <div className="quotationTable">
                                    <div className="tableHeaderQuotation">
                                        <p>Project Name</p>
                                    </div>
                                    <div className="tableContentQuotation">
                                        <p>{project.projectName}</p>
                                    </div>
                                </div>
                                <div className="quotationTable">
                                    <div className="tableHeaderQuotation">
                                        <p>Budget</p>
                                    </div>
                                    <div className="tableContentQuotation">
                                        <p> ₹ {project.projectProposalCost}</p>
                                    </div>
                                </div>
                                <div className="quotationTable">
                                    <div className="tableHeaderQuotation">
                                        <p>Negotiable Upto</p>
                                    </div>
                                    <div
                                        className="tableContentQuotation"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'nowrap'
                                        }}
                                    >
                                        <i class="fas fa-dollar-sign" />
                                        <input
                                            style={{
                                                marginTop: '0',
                                                marginLeft: '0.5rem',
                                                height: '35px'
                                            }}
                                            name="negotiablePrice"
                                            value={
                                                QuotationFormData.negotiablePrice
                                            }
                                            onChange={handleQuotationChange}
                                            type="number"
                                            placeholder="Text should be number"
                                        />
                                    </div>
                                </div>
                                <div className="quotationTable">
                                    <div className="tableHeaderQuotation">
                                        <p
                                            style={{
                                                position: 'relative',
                                                top: '-4rem'
                                            }}
                                            name="comment"
                                        >
                                            Comment Box
                                        </p>
                                    </div>
                                    <div className="tableContentQuotation">
                                        <textarea
                                            onChange={(event) =>
                                                handleQuotationChange(event)
                                            }
                                            name="comment"
                                            id=""
                                            cols="30"
                                            rows="6"
                                            placeholder="Type from here.."
                                        ></textarea>
                                    </div>
                                </div>

                                <div
                                    className="quotationSubmitButton_agencyList quotation"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {/* <div></div> */}
                                    <button onClick={quotationSubmitHandler}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        </div>
    );
}

export default AgencyList;
