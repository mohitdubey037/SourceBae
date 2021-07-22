import React from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';
import UserProject from '../../Components/ClientNewestDashboard/LeftSide/UserProject';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';

import HireDeveloperIcon from "../../assets/images/Newestdashboard/LeftSide/HireDeveloper-icon.svg";
import HireAgencyIcon from '../../assets/images/Newestdashboard/LeftSide/HireAgency-icon.svg';
import ShortTermProjectIcon from '../../assets/images/Newestdashboard/LeftSide/ShortTermProject-icon.svg';
import InvestmentIcon from '../../assets/images/Newestdashboard/LeftSide/Investment-icon.svg';
import './ClientNewestDashboard.css'
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';

import { useHistory } from 'react-router-dom';


function ClientNewestDashboard() {

    const routerHistory = useHistory();

    const hireDeveloper = () => {
        routerHistory.push('/hire-developer')
    }
    const hireAgency = () => {
        routerHistory.push('/hire-agency-form-one')
    }
    const shortTermProject = () => {
        routerHistory.push('/short-term')
    }
    const interestedToInvestment = () => {
        // routerHistory.push('/hire-developer')
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="container-body">
                <Navbar />
                <div className="content-body">
                    <div className="content-leftBody">
                        <div className="user-operations">
                            <UserOperations clickHandler={hireDeveloper} text='Hire Developer' img={HireDeveloperIcon} />
                            <UserOperations clickHandler={hireAgency} text="Hire Agency" img={HireAgencyIcon} />
                            <UserOperations clickHandler={shortTermProject} text="Short Term Project" img={ShortTermProjectIcon} />
                            <UserOperations clickHandler={interestedToInvestment} text="Interested To Investment" img={InvestmentIcon} />
                        </div>
                        <div className="graphic">
                            <div className="graphic-illustration-heading">
                                <h6>Project details</h6>
                            </div>
                        </div>
                        <div className="user-project">
                            <div className="user-project-details">
                                <UserProject />
                                <UserProject />
                                <UserProject />
                                <UserProject />
                                <UserProject />
                                <UserProject />
                                <UserProject />
                            </div>
                        </div>
                    </div>
                    <RightSide />
                </div>
            </div>
        </div>
    )
}

export default ClientNewestDashboard;
