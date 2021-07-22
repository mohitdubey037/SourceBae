// import Navbar from './Navbar';
import React from 'react';
import Navbar from './../../Components/ClientNewestDashboard/Navbar/Navbar';

import AgencyRespondedDetails from './AgencyRespondedDetails';

function ProjectDetails(props) {
    console.log(props);
    return (
        <>
            <Navbar />            
            {/* <div style={{ marginTop: '3%' }}> */}
            <AgencyRespondedDetails/>
            {/* </div> */}
        </>
    )
}



export default ProjectDetails
