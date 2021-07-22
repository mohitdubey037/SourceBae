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


function AgencyNewestDashboard() {

    const routerHistory = useHistory();
    const Role = localStorage.getItem('role');
    const agencyId = localStorage.getItem("userId");

    const [agencyProfileData, setAgencyProfileData] = useState([])

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
    }, []);

    const quotation = () => {
        routerHistory.push('/quotation')
    }

    const addDeveloper = () => {
        routerHistory.push('add-developer');
    }

    const viewProduct = () => {
        if (agencyProfileData.productId !== '' || agencyProfileData.productId != undefined) {
            routerHistory.push({
                pathname : `/product-details:${agencyProfileData.productId}`,
                condition : 'Agency'
            })
        }
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="container-body">
                <Navbar />
                <div className="content-body">
                    <div className="content-leftBody">
                        <div className="user-operations">
                            <UserOperations clickHandler={quotation} text='Quotation' img={ThirdIcon} />
                            <UserOperations clickHandler={addDeveloper} text="Add Developer" img={MobileIcon} />
                            <UserOperations clickHandler={viewProduct} text="View Product" img={QuotationIcon} />
                        </div>
                        <div className="graphic">
                            <div className="graphic-illustration-heading">
                                <h6>Project details</h6>
                            </div>
                        </div>
                        <div className="user-project">
                            <div>
                                <AgencyProjectCard />
                                <AgencyProjectCard />
                            </div>
                        </div>
                    </div>
                    <RightSide />
                </div>
            </div>
        </div>
    )
}

export default AgencyNewestDashboard;