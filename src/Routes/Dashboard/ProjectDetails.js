import RespondedDetails from './Quotation/RespondedDetails';
import React from 'react';
import './ProjectDetails.css';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../Components/Back/Back';

function ProjectDetails() {
    return (
        <>
            <Sidebar />
            <div className={`details-parent`}>
                <Navbar />
                <Back name="Client Project Details" />
                <RespondedDetails />
            </div>
        </>
    );
}

export default ProjectDetails;
