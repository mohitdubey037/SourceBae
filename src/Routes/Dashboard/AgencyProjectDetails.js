import Navbar from './Navbar';
import React, {useState} from 'react'

import AgencyRespondedDetails from './AgencyRespondedDetails';

function ProjectDetails(props) {
    console.log(props);
    return (
        <>
            <Navbar />            
            <div style={{ marginTop: '3%' }}>
            <AgencyRespondedDetails/>
            </div>
        </>
    )
}



export default ProjectDetails
