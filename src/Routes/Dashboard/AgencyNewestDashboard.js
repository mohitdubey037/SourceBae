import React, { useState, useEffect } from 'react';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';

import QuotationIcon from '../../assets/images/Newestdashboard/Agency_Navbar/q-icon.svg';
import addDeveloperIcon from "../../assets/images/Newestdashboard/Agency_Navbar/add-developer.svg";
import ThirdIcon from '../../assets/images/Newestdashboard/Agency_Navbar/view-product.svg';

import './AgencyNewestDashboard.css'
import AgencyProjectCard from '../../Components/AgencyProjectCard/AgencyProjectCard';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';

import instance from "../../Constants/axiosConstants";
import * as helper from "../../shared/helper";
import NotFound from '../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import cookie from "react-cookies";

function AgencyNewestDashboard(props) {
    const Role = localStorage.getItem('role');
    const agencyId = localStorage.getItem("userId");

    const isAgencyVerified = cookie.load("isAgencyVerified");
    const isStepsCompleted = cookie.load("isStepsCompleted");

    const [agencyProfileData, setAgencyProfileData] = useState([])
    const [tempStatus, setTempStatus] = useState(false); /* this is for checking the component first time, if we remove it then the isAgencyVerified and isStepCompleted will take time to store in cookies and hence the check will fail, So don't remove it  */
    // DON'T REMOVE IT //
    const [allProjects, setAllProjects] = useState([]);
    const [steps, setSteps] = useState(0);
    const [verified, setVerified] = useState(true);
    const [isUserEmailVerified, setUserEmailVerified] = useState(true);
    const [isUserPhoneVerified, setUserPhoneVerified] = useState(true);
    const [formRoute, setFormRoute] = useState("/");
    const [visible, setVisible] = useState(false);

    const notificationVisible = (status) => {
        setVisible(status);
    };

    const getAllProjects = () => {
        instance.get(`api/${Role}/projects/all?agencyId=${agencyId}&projectCurrentStatus=Quotation Accepted`)
            .then(function (response) {
                setAllProjects(response);
                console.log(response);
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        getAllProjects();
    }, []);

    // useEffect(() => {

    // }, [agencyProfileData])

    const getStepsCompleted = () => {
        instance.get(`api/${Role}/agencies/steps-completed`)
            .then(function (response) {
                if (response.stepsCompleted === response.totalSteps) {
                    setSteps(-1);
                    cookie.save("isStepsCompleted", true);
                    setTempStatus(false);
                    console.log('h2');
                }
                else {
                    setSteps(response.stepsCompleted);
                    let route = `/agency-form-${helper.getNumberSpell(
                        response.stepsCompleted
                    )}`;
                    setFormRoute(route);
                }
            });
    };

    const getAgencyProfile = () => {
        instance
            .get(`/api/${Role}/agencies/get/${agencyId}`)
            .then(function (response) {
                console.log('h1');
                cookie.save("isAgencyVerified", response.isAgencyVerified);
                setTempStatus(true)
                setVerified(response.isAgencyVerified);
                setUserEmailVerified(response.isUserEmailVerified);
                setUserPhoneVerified(response.isUserPhoneVerified);
            });
    };

    useEffect(() => {
        console.log(tempStatus);
    }, [tempStatus])

    useEffect(() => {
        // console.log(isAgencyVerified)
        if (isAgencyVerified != 'true') {
            console.log('object1')
            getAgencyProfile();
        }
        if (isStepsCompleted != 'true') {
            console.log('object2')
            getStepsCompleted();
        }
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
        if (isAgencyVerified != 'true' || isStepsCompleted != 'true') {
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
            <Sidebar notificationVisible={(status) => notificationVisible(status)} />
            <div style={{ zIndex: visible && '-1' }} className="container-body">
                <Navbar />
                <div className="content-body">
                    <div className="content-leftBody">
                        {!(isUserEmailVerified && isUserPhoneVerified) && isStepsCompleted == 'true' && (
                            <div className="mainUpdateVerify">
                                <div className="innerMainVerify">
                                    <p>
                                        Please
                                        <span onClick={() => verifyEmailPhone()}>
                                            Verify Phone & Email
                                        </span>
                                        to use our services.
                                    </p>
                                </div>
                            </div>
                        )}
                        {((isAgencyVerified != 'true' || isStepsCompleted != 'true') && tempStatus === false) && (
                            //  the major reason of applying tempStatus is that at first event when the agency is verified this check is running becoz isAgencyVerified is storing in cookies a little bit later. so initially we are checking with tempStatus i.e it will be false initially and after the api call it will set to true and hence this check will be verified
                            <div className="mainUpdateVerify">
                                {isAgencyVerified != 'true' && isStepsCompleted != 'true' ? (
                                    <div className="innerMainVerify">
                                        <p>
                                            Please
                                            <span onClick={() => props.history.push(formRoute)}>
                                                Update
                                            </span>
                                            your profile to use our services.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="innerMainVerify" style={{ marginTop: '1rem' }}>
                                        <p>Please wait for your profile to be verified by us.</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={`user-operations ${((isAgencyVerified != 'true' || isStepsCompleted != 'true') && tempStatus === false) && "conditional_marginTop"}`}>
                            <UserOperations
                                disabled={(isAgencyVerified != 'true' || isStepsCompleted != 'true') && tempStatus === false}
                                nextpage={() => quotation("quotation")}
                                text='Quotation'
                                img={QuotationIcon} />

                            <UserOperations
                                disabled={(isAgencyVerified != 'true' || isStepsCompleted != 'true') && tempStatus === false}
                                nextpage={() => quotation("add-developer")}
                                text="Add Developer"
                                img={addDeveloperIcon} />

                            {agencyProfileData.productId ?
                                <UserOperations disabled={(isAgencyVerified != 'true' || isStepsCompleted != 'true') && tempStatus === false}
                                    nextpage={() => quotation('product-details')}
                                    text="View Product"
                                    img={ThirdIcon} />
                                :
                                <UserOperations disabled={(isAgencyVerified != 'true' || isStepsCompleted != 'true') && tempStatus === false}
                                    nextpage={() => quotation('Add Your Product')}
                                    text="Add Your Product"
                                    img={ThirdIcon} />
                            }
                        </div>
                        <div className={`${((isAgencyVerified != 'true' || isStepsCompleted != 'true') && tempStatus === false) && "conditional_opacity"}`}>
                            {allProjects?.projects?.length > 0 &&
                                <div className="graphic">
                                    <div className="graphic-illustration-heading">
                                        <h6>Project details</h6>
                                    </div>
                                </div>
                            }
                            <div className="user-project_parent">
                                {/* <div> */}
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
                                    <div className={`not_found agencyNewestDashboard`}>
                                        <img src={NotFound} alt="NotFound" />
                                        <p className="no_project_found">No Project Found</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <RightSide />
                </div>
            </div>
        </div >
    )
}

export default AgencyNewestDashboard;