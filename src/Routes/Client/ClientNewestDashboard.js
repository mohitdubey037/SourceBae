import React from 'react';
import SideBar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';
import UserProject from '../../Components/ClientNewestDashboard/LeftSide/UserProject';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';
import './ClientNewestDashboard.css'

function ClientNewestDashboard() {
    return (
        <div className='dashboard-container'>
            <SideBar />
            <div className="container-body">
                <Navbar />
                <div className="content-body">
                    <div className="content-leftBody">
                        <UserOperations />
                        <UserProject />
                    </div>
                    <RightSide/>
                </div>
            </div>
        </div>
    )
}

export default ClientNewestDashboard;
