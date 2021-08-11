import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';

import QuotationIcon from '../../assets/images/Newestdashboard/Agency_Navbar/Vector.svg';
import MobileIcon from "../../assets/images/Newestdashboard/Agency_Navbar/carbon_data-view.svg";
import ThirdIcon from '../../assets/images/Newestdashboard/Agency_Navbar/3Icon.svg';
import notificationIcon from "../../assets/images/Newestdashboard/Navbar/notification_icon.svg";

import './AgencyNewestDashboard.css'
import AgencyProjectCard from '../../Components/AgencyProjectCard/AgencyProjectCard';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';

import { useHistory } from 'react-router-dom';
import instance from "../../Constants/axiosConstants";


function AgencyNewestDashboard(props) {

    const routerHistory = useHistory();
    const Role = localStorage.getItem('role');
    const agencyId = localStorage.getItem("userId");

    const [agencyProfileData, setAgencyProfileData] = useState([])
    const [allProjects, setAllProjects] = useState([]);


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

    return (
        <>
            <div className="Navbar-clientDashboard">
                <div className="navbar">
                    {/* <div className="navbar-heading">
                        <h1>Overview</h1>
                    </div> */}
                    <div className="navbar-items">
                        <div className="notification-icon nav-left-item">
                            <img src={notificationIcon} alt="notification" />
                        </div>
                        {/* <div onClick={logout} className="logout-icon nav-left-item">
                    <div>
                        <ExitToAppIcon />
                    </div>
                    <img src={notificationIcon} alt="notification" />
                </div> */}
                        <div className="username nav-left-item">
                            <p>Atul Bhatt</p>
                        </div>
                        <div className="userprofile-circle nav-left-item" />
                    </div>
                </div>
            </div>
            <div className="dashboard-container">
                <Sidebar />
                <div className="container-body margin-0">
                    <div className="content-body">
                        <div className="content-leftBody">
                            <div className="user-operations">
                                <UserOperations nextpage={() => props.history.push("/quotation")} text='Quotation' img={ThirdIcon} />
                                <UserOperations nextpage={() => props.history.push("/add-developer")} text="Add Developer" img={MobileIcon} />
                                {agencyProfileData.productId ?
                                    <UserOperations nextpage={() => props.history.push({
                                        pathname: `/product-details:${agencyProfileData.productId}`,
                                        condition: 'Agency'
                                    })} text="View Product" img={QuotationIcon} />
                                    :
                                    <UserOperations nextpage={() => props.history.push({
                                        pathname: `/product-form`,
                                        condition: 'Agency'
                                    })} text="Add Your Product" img={QuotationIcon} />
                                }
                            </div>
                            <div className="graphic">
                                <div className="graphic-illustration-heading">
                                    <h6>Project details</h6>
                                </div>
                            </div>
                            <div className="user-project agencyNewestDashboard">
                                <div>
                                    {allProjects?.projects?.length > 0 ? (
                                        allProjects?.projects?.map((value, index) => {
                                            return (
                                                <AgencyProjectCard
                                                    props={props}
                                                    id={value?._id}
                                                    key={index}
                                                    name={value.projectName}
                                                    status={value?.projectCurrentStatus}
                                                    budget={value.projectFinalCost === undefined ? value?.projectProposalCost : value.projectFinalCost}
                                                    creationDate={value?.createdAt}
                                                    updatedAt={value?.updatedAt}
                                                    domainName={value?.projectDomainId.domainName}
                                                    projectType={value?.projectType}
                                                    experties={value?.projectExpertiseRequired}
                                                    services={value?.projectServicesRequired} />
                                            )
                                        })
                                    ) : <p>No Projects</p>}
                                </div>
                            </div>
                        </div>
                        <RightSide />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgencyNewestDashboard;