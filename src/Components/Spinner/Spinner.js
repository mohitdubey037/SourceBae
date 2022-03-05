import React from 'react';
import './Spinner.css'
const Spinner = ({ style }) => {
    const role = localStorage.getItem('role');
    return (
        // <div className="Loader_parent">
        //     <div className="Loader">Loading...</div>
        // </div>
        <div style={style} className="loader">
            <div className={`circle c1 ${role === 'agency' ? 'conditional_loader_agency' : 'conditional_loader_client'}`}></div>
            <div className={`circle c2 ${role === 'agency' ? 'conditional_loader_agency' : 'conditional_loader_client'}`}></div>
            <div className={`circle c3 ${role === 'agency' ? 'conditional_loader_agency' : 'conditional_loader_client'}`}></div>
            <div className={`circle c4 ${role === 'agency' ? 'conditional_loader_agency' : 'conditional_loader_client'}`}></div>
        </div>
    );
}

export default Spinner;