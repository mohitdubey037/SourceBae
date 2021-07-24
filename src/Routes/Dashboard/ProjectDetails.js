import RespondedDetails from './Quotation/RespondedDetails';
import React from 'react';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
// import ClientNavbar from '../Client/ClientNavbar';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';

function ProjectDetails() {
    return (
        <>
            <Sidebar />
            <div className="details-parent">
                <Navbar />
                <RespondedDetails />
            </div>
        </>
    )
}



export default ProjectDetails
