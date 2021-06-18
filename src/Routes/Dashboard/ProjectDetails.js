import RespondedDetails from './Quotation/RespondedDetails';
import React, {useState} from 'react'
import ClientNavbar from '../Client/ClientNavbar';

function ProjectDetails() {
    return (
        <>
            <ClientNavbar/>       
            <div style={{ marginTop: '3%' }}></div>
            <RespondedDetails/>
        </>
    )
}



export default ProjectDetails
