import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';

import QuotationIcon from '../../assets/images/Newestdashboard/Agency_Navbar/Vector.svg';
import MobileIcon from "../../assets/images/Newestdashboard/Agency_Navbar/carbon_data-view.svg";
import ThirdIcon from '../../assets/images/Newestdashboard/Agency_Navbar/3Icon.svg';

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

    const getAgencyProfileData = () => {
        instance.get(`api/${Role}/projects/all?agencyId=${agencyId}&projectCurrentStatus=Quotation Accepted`)
            .then(function (response) {
                console.log("allProjects", response)
                setAgencyProfileData(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAgencyProfileData();
    }, []);

    return (
        <>
            <div className="Navbar-clientDashboard">
                <Navbar />
            </div>
            <div className="dashboard-container">
                <Sidebar />
                <div className="container-body">
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
                            <div className="user-project">
                                <div>
                                    {agencyProfileData?.projects?.length > 0 ? (
                                        agencyProfileData?.projects?.map((value, index) => {
                                            return (
                                                <AgencyProjectCard props={props} id={value?._id} key={index} name={value.projectName} status={value?.projectCurrentStatus} budget={value?.projectProposalCost} creationDate={value?.createdAt} projectType={value?.projectType} experties={value?.projectExpertiseRequired} services={value?.projectServicesRequired} />
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