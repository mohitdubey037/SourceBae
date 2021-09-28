import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';

import QuotationIcon from '../../assets/images/Newestdashboard/Agency_Navbar/q-icon.svg';
import addDeveloperIcon from "../../assets/images/Newestdashboard/Agency_Navbar/add-developer.svg";
import ThirdIcon from '../../assets/images/Newestdashboard/Agency_Navbar/view-product.svg';
import notificationIcon from "../../assets/images/Newestdashboard/Navbar/notification_icon.svg";
import downImage1 from '../../assets/images/Newestdashboard/Dashboard/Path1.png';
import downImage2 from '../../assets/images/Newestdashboard/Dashboard/Path2.png';

import './AgencyNewestDashboard.css'
import AgencyProjectCard from '../../Components/AgencyProjectCard/AgencyProjectCard';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import { Modal } from "react-responsive-modal";

import { useHistory } from 'react-router-dom';
import instance from "../../Constants/axiosConstants";
import { Link, NavLink } from "react-router-dom";
import * as helper from "../../shared/helper";
import { Opacity } from '@material-ui/icons';
import NotFound from '../../assets/images/Newestdashboard/Not_found/NotFound_new.svg';


function AgencyNewestDashboard(props) {

    const routerHistory = useHistory();
    const Role = localStorage.getItem('role');
    const agencyId = localStorage.getItem("userId");

    const [agencyProfileData, setAgencyProfileData] = useState([])
    const [allProjects, setAllProjects] = useState([]);
    const [steps, setSteps] = useState(0);
    const [verified, setVerified] = useState(true);
    const [isUserEmailVerified, setUserEmailVerified] = useState(true);
    const [isUserPhoneVerified, setUserPhoneVerified] = useState(true);
    const [formRoute, setFormRoute] = useState("/");
    const [visible, setVisible] = useState(false);
    const [openmodal, setOpenModal] = useState(false);

    const notificationVisible = (status) => {
        setVisible(status);
    };

    const onOpenModal = () => setOpenModal(true);

    const getAllProjects = () => {
        instance.get(`api/${Role}/projects/all?agencyId=${agencyId}&projectCurrentStatus=Quotation Accepted`)
            .then(function (response) {
                setAllProjects(response);
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAgencyProfileData = () => {
        instance.get(`/api/${Role}/agencies/get/${agencyId}`)
            .then(function (response) {
                setAgencyProfileData(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAgencyProfileData();
        getAllProjects();
    }, []);

    useEffect(() => {
        console.log(agencyProfileData);
    }, [agencyProfileData])

    const getStepsCompleted = () => {
        instance
            .get(`api/${Role}/agencies/steps-completed`)
            .then(function (response) {
                if (response.stepsCompleted === response.totalSteps) setSteps(-1);
                else {
                    setSteps(response.stepsCompleted);
                    let route = `/agency-form-${helper.getNumberSpell(
                        response.stepsCompleted
                    )}`;
                    setFormRoute(route);
                }
            });
    };

    const getAgencyProfile = (agencyId) => {
        instance
            .get(`/api/${Role}/agencies/get/${agencyId}`)
            .then(function (response) {
                console.log(response);
                setVerified(response.isAgencyVerified);
                setUserEmailVerified(response.isUserEmailVerified);
                setUserPhoneVerified(response.isUserPhoneVerified);
            });
    };

    const handleLink = (route) => {
        if (verified && steps === -1) {
            if (route === "modal") onOpenModal();
            else props.history.push(route);
        }
    };
    useEffect(() => {
        getStepsCompleted();
        getAgencyProfile(localStorage.getItem("userId"));
    }, []);


    const verifyEmailPhone = () => {
        instance
            .post(`/api/${Role}/auths/send-verification-link`, {
                userId: agencyId,
                verify: "email",
            })
            .then(function (response) { });

        instance
            .post(`/api/${Role}/auths/send-verification-link`, {
                userId: agencyId,
                verify: "phone",
            })
            .then(function (response) { });
    };

    const quotation = (link) => {
        if (!verified || steps !== -1) {
            props.history.push(`${props.history.location.pathname}`);
        }
        else {
            if (link === 'quotation')
                props.history.push(`/${link}`);

            if (link === 'add-developer')
                props.history.push(`/${link}`);

            if (link === 'product-details') {
                props.history.push({
                    pathname: `/${link}:${agencyProfileData.productId}`,
                    condition: 'Agency'
                });
            }
            if (link === 'Add Your Product') {
                props.history.push({
                    pathname: 'product-form',
                    condition: 'Agency'
                })
            }
        }
    }

    return (
        <div className="Navbar-clientDashboard">
            <div className="navbar">
                {/* <div className="navbar-heading">
                    <h1>SourceBae</h1>
                </div> */}
                <div className="navbar-items">
                    {/* <div className="notification-icon nav-left-item">
                        <img src={notificationIcon} alt="notification" />
                    </div> */}
                    {/* <div onClick={logout} className="logout-icon nav-left-item">
                            <div>
                                <ExitToAppIcon />
                            </div>
                            <img src={notificationIcon} alt="notification" />
                        </div> */}
                    <div style={{marginRight: '10px'}} className="username nav-left-item">
                        <p>{agencyProfileData?.agencyName}</p>
                    </div>
                    <div className="userprofile-circle nav-left-item">
                        <img src={agencyProfileData?.agencyLogo} />
                    </div>
                </div>
            </div>
            <Sidebar notificationVisible={(status) => notificationVisible(status)} />
            {/* <div className="dashboard-container"> */}

            {/* <img className="downImage1_agencyDashboard" src={downImage1} alt="hi" /> */}
            {/* <img className="downImage2_agencyDashboard" src={downImage2} alt="hi" /> */}

            <div className="container-body">
                <div className="content-body">
                    <div className="content-leftBody">
                        {!(isUserEmailVerified && isUserPhoneVerified) && steps === -1 && (
                            <div className="mainUpdateVerify">
                                <div className="innerMainVerify">
                                    <p>
                                        Please
                                        <span onClick={() => verifyEmailPhone()}>
                                            Verify Phone & Email
                                        </span>{" "}
                                        to use our services.
                                    </p>
                                </div>
                            </div>
                        )}
                        {(!verified || steps !== -1) && (
                            <div className="mainUpdateVerify">
                                <div className="innerMainVerify">
                                    {!verified && steps !== -1 ? (
                                        <p>
                                            Please
                                            <span onClick={() => props.history.push(formRoute)}>
                                                Update
                                            </span>{" "}
                                            your profile to use our services.
                                        </p>
                                    ) : (
                                        <p>Please wait for your profile to be verified by us.</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className={`user-operations ${(!verified || steps !== -1) && "conditional_marginTop"}`} style={{ marginTop: (!verified && steps !== -1) && '1rem' }}>
                            <UserOperations
                                disabled={!verified || steps !== -1}
                                nextpage={() => quotation("quotation")}
                                text='Quotation'
                                img={QuotationIcon} />

                            <UserOperations
                                disabled={!verified || steps !== -1}
                                nextpage={() => quotation("add-developer")}
                                text="Add Developer"
                                img={addDeveloperIcon} />

                            {agencyProfileData.productId ?
                                <UserOperations disabled={(!verified || steps !== -1)}
                                    nextpage={() => quotation('product-details')}
                                    text="View Product"
                                    img={ThirdIcon} />
                                :
                                <UserOperations disabled={!verified || steps !== -1}
                                    nextpage={() => quotation('Add Your Product')}
                                    text="Add Your Product"
                                    img={ThirdIcon} />
                            }
                        </div>
                        <div className={`${(!verified || steps !== -1) && "conditional_opacity"}`}>
                            {allProjects?.projects?.length > 0 &&
                                <div className="graphic">
                                    <div className="graphic-illustration-heading">
                                        <h6>Project details</h6>
                                    </div>
                                </div>
                            }
                            <div className="user-project agencyNewestDashboard">
                                <div>
                                    {allProjects?.projects?.length > 0 ? (
                                        allProjects?.projects?.map((value, index) => {
                                            return (
                                                <AgencyProjectCard
                                                    key={index}
                                                    {...value}
                                                />
                                            )
                                        })
                                    ) :
                                        // <p>No Projects</p>
                                        <div className={`not_found agencyNewestDashboard ${(verified || steps === -1) && 'conditionalHeight'}`}>
                                            <img src={NotFound} alt="NotFound" />
                                            {/* <p>No Project Available</p> */}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <RightSide />
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default AgencyNewestDashboard;