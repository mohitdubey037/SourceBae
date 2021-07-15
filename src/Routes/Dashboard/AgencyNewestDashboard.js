import React from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';

import QuotationIcon from '../../assets/images/Newestdashboard/Agency_Navbar/Vector.svg';
import MobileIcon from "../../assets/images/Newestdashboard/Agency_Navbar/carbon_data-view.svg";
import ThirdIcon from '../../assets/images/Newestdashboard/Agency_Navbar/3Icon.svg';

import './AgencyNewestDashboard.css'
import AgencyProjectCard from '../../Components/AgencyProjectCard/AgencyProjectCard';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';

function agencyNewestDashboard() {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="container-body">
                <Navbar />
                <div className="content-body">
                    <div className="content-leftBody">
                        <div className="user-operations">
                            <UserOperations text='Quotation' img={ThirdIcon} />
                            <UserOperations text="Add Developer" img={MobileIcon} />
                            <UserOperations text="View Product" img={QuotationIcon} />
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

export default agencyNewestDashboard;