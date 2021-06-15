import Navbar from './Navbar';
import RespondedDetails from './Quotation/RespondedDetails';
import React, {useState} from 'react'
import ClientNavbar from '../Client/ClientNavbar';

function ProjectDetails(props) {
    const role = localStorage.getItem('role')
    return (
        <>
            {role == 'Client' ? <ClientNavbar/> : <Navbar />}            
            <div style={{ marginTop: '3%' }}></div>
            <RespondedDetails/>
        </>
    )
}



export default ProjectDetails
