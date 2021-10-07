import RespondedDetails from './Quotation/RespondedDetails';
import React, { useState } from 'react';
import './ProjectDetails.css'
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';

function ProjectDetails() {

    const [visible, setVisible] = useState(false);

    const notificationVisible = (status) => {
        setVisible(status);
    };

    return (
        <>
            <Sidebar notificationVisible={(status) => notificationVisible(status)} />
            <Navbar />
            <div className={`details-parent ${visible && "conditionalPosition"}`}>
                <RespondedDetails />
            </div>
        </>
    )
}



export default ProjectDetails
