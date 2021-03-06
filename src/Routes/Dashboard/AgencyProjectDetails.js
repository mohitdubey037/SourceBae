// import Navbar from './Navbar';
import React, { useState } from 'react';
import Navbar from './../../Components/ClientNewestDashboard/Navbar/Navbar';
import AgencyRespondedDetails from './AgencyRespondedDetails';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import './AgencyProjectDetails.css';
import Back from '../../Components/Back/Back';

function ProjectDetails(props) {
    const [visible, setVisible] = useState(false);

    const notificationVisible = (status) => {
        setVisible(status);
    };

    return (
        <>
            <Sidebar notificationVisible={(status) => notificationVisible(status)} />
            <div className={`details-parent ${visible && "conditionalPosition"}`}>
                <Navbar />
                <Back name="Agency Project Details" />
                <AgencyRespondedDetails />
            </div>
        </>
    )
}



export default ProjectDetails
