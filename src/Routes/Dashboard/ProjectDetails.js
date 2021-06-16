import Navbar from './Navbar';
import RespondedDetails from './Quotation/RespondedDetails';
import React, {useState} from 'react'
import ClientNavbar from '../Client/ClientNavbar';

function ProjectDetails(props) {
<<<<<<< HEAD
    const role = localStorage.getItem('role')
=======
    const state = useState(props.projects)
    const role = props.condition
>>>>>>> 0ad33d05c82c54c649c0f22ef4918bfa5f016ac5
    return (
        <>
            {role === 'Client' ? <ClientNavbar/> : <Navbar />}            
            <div style={{ marginTop: '3%' }}></div>
<<<<<<< HEAD
            <RespondedDetails/>
=======
            <RespondedDetails state= {state} key={state?.clientId}/>
>>>>>>> 0ad33d05c82c54c649c0f22ef4918bfa5f016ac5
        </>
    )
}



export default ProjectDetails
