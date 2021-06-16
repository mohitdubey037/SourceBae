// import React from 'react'
import Navbar from './Navbar';
import RespondedDetails from './Quotation/RespondedDetails';
import React, {useState} from 'react'
import ClientNavbar from '../Client/ClientNavbar';
import { connect } from 'react-redux';

function ProjectDetails(props) {
    const state = useState(props.projects)
    const role = props.condition
    return (
        <>
            {role === 'Client' ? <ClientNavbar/> : <Navbar />}            
            <div style={{ marginTop: '3%' }}></div>
            <RespondedDetails key={state?.clientId}/>
        </>
    )
}

const mapStateToProps = state => {
    return {
        projects : state.projects,
        condition : state.condition
    }
}

export default connect(mapStateToProps)(ProjectDetails)
