// import Navbar from './Navbar';
import React from 'react';
import Navbar from './../../Components/ClientNewestDashboard/Navbar/Navbar';

import AgencyRespondedDetails from './AgencyRespondedDetails';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import './AgencyProjectDetails.css';


function ProjectDetails(props) {
    console.log(props);
    return (
        <>
            <Sidebar />
            <div className="details-parent">
                <Navbar />
                <AgencyRespondedDetails />
            </div>
        </>
    )
}



export default ProjectDetails
