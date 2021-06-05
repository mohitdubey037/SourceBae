// import React from 'react'
import Navbar from './Navbar';
import RespondedDetails from './Quotation/RespondedDetails';
import React, {useState} from 'react'
import ClientNavbar from '../Client/ClientNavbar';

function ProjectDetails(props) {
    console.log(props.location.state);
    const [state, setState] = useState(props.location.state)
    const role = localStorage.getItem('role')
    // console.log(state);
    return (
        <>
            {role == 'Client' ? <ClientNavbar/> : <Navbar />}            
            <div style={{ marginTop: '3%' }}></div>
            <RespondedDetails {...state} key={state?.clientId}/>
        </>
    )
}

export default ProjectDetails
