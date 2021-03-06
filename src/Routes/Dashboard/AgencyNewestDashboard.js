import React, { useState, useEffect } from 'react';
import CTAContainer from '../../Components/ClientNewestDashboard/CTAContainer/CTAContainer';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';

import QuotationIcon from '../../assets/images/Newestdashboard/Agency_Navbar/q-icon.svg';
import addDeveloperIcon from '../../assets/images/Newestdashboard/Agency_Navbar/add-developer.svg';
import ThirdIcon from '../../assets/images/Newestdashboard/Agency_Navbar/view-product.svg';

import './AgencyNewestDashboard.css';
import AgencyProjectCard from '../../Components/AgencyProjectCard/AgencyProjectCard';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';

import instance from '../../Constants/axiosConstants';
import NotFound from '../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import BottomSideBar from '../../Components/ClientNewestDashboard/BottomSideBar/BottomSideBar';

import { Modal } from 'react-responsive-modal';

import { AGENCY } from '../../shared/constants';
import { AGENCYROUTES } from '../../Navigation/CONSTANTS';

function AgencyNewestDashboard(props) {
    const [open, setOpen] = useState(false);

    const role = localStorage.getItem('role');
    const agencyId = localStorage.getItem('userId');

    const [allProjects, setAllProjects] = useState([]);
    const [steps, setSteps] = useState(0);
    const [verified, setVerified] = useState(true);
    const [isUserEmailVerified, setUserEmailVerified] = useState(true);
    const [isUserPhoneVerified, setUserPhoneVerified] = useState(true);
    const [formRoute, setFormRoute] = useState('/');
    const [visible, setVisible] = useState(false);

    const onCloseModal = () => setOpen(false);

    const onOpenModal = () => {
        setOpen(true);
    };

    const notificationVisible = (status) => {
        setVisible(status);
    };

    const getAllProjects = () => {
        instance
            .get(
                `api/${role}/projects/all?agencyId=${agencyId}&projectCurrentStatus=In Progress`
            )
            .then(function (response) {
                setAllProjects(response);
            })
            .catch((err) => { });
    };

    useEffect(() => {
        getAllProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStepsCompleted = () => {
        instance
            .get(`api/${role}/agencies/steps-completed`)
            .then(function (response) {
                console.log(response.stepsCompleted, response.totalSteps, 'fdsfdf')
                if (response.stepsCompleted === response.totalSteps) {
                    setSteps(-1);
                } else {
                    setSteps(response.stepsCompleted);
                    let route = `${AGENCYROUTES.AGENCY_UPDATE}/${response.stepsCompleted}`;
                    setFormRoute(route);
                }
            });
    };

    const getAgencyProfile = (agencyId) => {
        if (agencyId)
            instance
                .get(`/api/${role}/agencies/get/${agencyId}`)
                .then(function (response) {
                    setVerified(response.isAgencyVerified);
                    console.log(response.isAgencyVerified)
                    setUserEmailVerified(response.isUserEmailVerified);
                    setUserPhoneVerified(response.isUserPhoneVerified);
                });
    };

    useEffect(() => {
        if (!verified && steps !== -1) {
            onOpenModal();
        }
    }, [verified, steps]);

    useEffect(() => {
        getStepsCompleted();
        getAgencyProfile(localStorage.getItem('userId'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const verifyEmailPhone = () => {
        instance
            .post(`/api/${role}/auths/send-verification-link`, {
                userId: agencyId,
                verify: 'email'
            })
            .then(function (response) { });
    };

    const quotation = (link) => {
        if (!verified || steps !== -1) {
            props.history.push(`${props.history.location.pathname}`);
        } else {
            if (AGENCYROUTES.QUOTATIONS.includes(link))
                props.history.push(AGENCYROUTES.QUOTATIONS);

            if (AGENCYROUTES.ADD_DEVELOPER.includes(link))
                props.history.push(AGENCYROUTES.ADD_DEVELOPER);

            if (AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST.includes(link))
                props.history.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);

            if (AGENCYROUTES.PORTFOLIO.includes(link)) {
                props.history.push({
                    pathname: AGENCYROUTES.PORTFOLIO,
                    condition: AGENCY
                });
            }
        }
    };

    return (
        <>
            <div className="Navbar-clientDashboard">
                <Sidebar
                    notificationVisible={(status) =>
                        notificationVisible(status)
                    }
                />
                <div
                    style={{ zIndex: visible && '-1' }}
                    className="container-body"
                >
                    <Navbar />
                    <div className="content-body">
                        {(!isUserEmailVerified || !verified) && (
                            <div className="verify_update_wait">
                                {!(
                                    isUserEmailVerified && isUserPhoneVerified
                                ) &&
                                    steps === -1 && (
                                        <div className="mainUpdateVerify">
                                            <div className="innerMainVerify please_verify">
                                                <p>
                                                    One last step. We priortise
                                                    your security.
                                                    <span
                                                        onClick={() =>
                                                            verifyEmailPhone()
                                                        }
                                                    >
                                                        Verify Phone & Email
                                                    </span>
                                                    Few more hours for
                                                    verificaion and you are good
                                                    to go.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                {(!verified || steps !== -1) && (
                                    <div className="mainUpdateVerify">
                                        {!verified && steps !== -1 ? (
                                            <div className="innerMainVerify please_update">
                                                <p>
                                                    Please
                                                    <span
                                                        onClick={() =>
                                                            props.history.replace(
                                                                formRoute
                                                            )
                                                        }
                                                    >
                                                        Update
                                                    </span>
                                                    your profile to use our
                                                    services.
                                                </p>
                                            </div>
                                        ) : (
                                            !verified && (
                                                <div className="innerMainVerify please_wait">
                                                    <p>
                                                        Please wait for your
                                                        profile to be verified
                                                        by us.
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                                {((isUserEmailVerified &&
                                    isUserPhoneVerified) ||
                                    !verified ||
                                    steps !== -1) && (
                                        <div className="down_seperator"></div>
                                    )}
                            </div>
                        )}

                        <div className="content-leftBody">
                            <div className={`user-operations`}>
                                <UserOperations
                                    disabled={!verified || steps !== -1}
                                    nextpage={() =>
                                        quotation(
                                            AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST
                                        )
                                    }
                                    text="Current Requirements"
                                    img={QuotationIcon}
                                />
                                <UserOperations
                                    disabled={!verified || steps !== -1}
                                    nextpage={() =>
                                        quotation(AGENCYROUTES.QUOTATIONS)
                                    }
                                    text="Quotation"
                                    img={QuotationIcon}
                                />

                                <UserOperations
                                    disabled={!verified || steps !== -1}
                                    nextpage={() =>
                                        quotation(AGENCYROUTES.ADD_DEVELOPER)
                                    }
                                    text="Add Developer"
                                    img={addDeveloperIcon}
                                />

                                <UserOperations
                                    disabled={!verified || steps !== -1}
                                    nextpage={() =>
                                        quotation(AGENCYROUTES.PORTFOLIO)
                                    }
                                    text="Add Portfolio"
                                    img={ThirdIcon}
                                />
                            </div>
                            <div
                                className={`${(!verified || steps !== -1) &&
                                    'conditional_opacity'
                                    }`}
                            >
                                {allProjects?.projects?.length > 0 && (
                                    <div className="graphic graphic_agencyDashboard">
                                        <div className="graphic-illustration-heading">
                                            <h6>Project details</h6>
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`user-project_parent ${allProjects?.length <= 0 &&
                                        'conditional_flex'
                                        }`}
                                >
                                    {allProjects?.projects?.length > 0 ? (
                                        allProjects?.projects?.map(
                                            (value, index) => {
                                                return (
                                                    <AgencyProjectCard
                                                        uniqueId={index}
                                                        {...value}
                                                    />
                                                );
                                            }
                                        )
                                    ) : (
                                        <div
                                            className={`not_found agencyNewestDashboard`}
                                        >
                                            <img
                                                style={{
                                                    width:
                                                        (!(
                                                            isUserEmailVerified &&
                                                            isUserPhoneVerified
                                                        ) ||
                                                            !verified) &&
                                                        '18rem'
                                                }}
                                                src={NotFound}
                                                alt="NotFound"
                                            />
                                            <p>
                                                Nothing to show here yet! <br />{' '}
                                                Please check again later.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <CTAContainer />
                    </div>
                </div>
                <BottomSideBar />
            </div>

            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: 'customOverlayAgencyProduct',
                    modal: 'customModalClientOneHireDeveloper'
                }}
                styles={{
                    closeButton: { outline: 'none' }
                }}
                center
            >
                <div className="want_to_accept">
                    <div className="connect_or_not">
                        <h6>
                            Complete your verification to move forward. <br />
                            Update company details <br />
                            Upload verification documents
                        </h6>
                    </div>

                    <div className="interested_or_not verify_or_not">
                        <div
                            className="update_now"
                            onClick={() => props.history.replace(formRoute)}
                        >
                            <p>Update now</p>
                        </div>
                        <div className="update_later" onClick={onCloseModal}>
                            <p>Update later</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default AgencyNewestDashboard;
