import RespondedDetails from './Quotation/RespondedDetails';
import React, { useState } from 'react';
import './ProjectDetails.css'
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import Back from '../../Components/Back/Back';

function ProjectDetails() {

    const [visible, setVisible] = useState(false);

    const notificationVisible = (status) => {
        setVisible(status);
    };

    return (
        <>
            <Sidebar notificationVisible={(status) => notificationVisible(status)} />
            <div className={`details-parent ${visible && "conditionalPosition"}`}>
                <Navbar />
                <Back name="Client Project Details" />
                <RespondedDetails />
            </div>
        </>
    )
}



export default ProjectDetails
