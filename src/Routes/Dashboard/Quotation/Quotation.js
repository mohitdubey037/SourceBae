import React from 'react'
// import Navbar from '../Navbar'
import './Quotation.css'
import received from '../../../assets/images/Quotation/received.png'
import responded from '../../../assets/images/Quotation/responded.png'
import matched from '../../../assets/images/Quotation/matched.png'
import Received from './Received'
import Responded from './Responded'
import ProjectesMatched from './ProjectesMatched';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import { useRef, useState, useEffect } from 'react';
import Sidebar from '../../../Components/ClientNewestDashboard/Sidebar/Sidebar';

import Back from '../../../Components/Back/Back';

function Quotation(props) {
    const [navigated, setNavigation] = useState(false)
    const receivedRef = useRef(null);
    const respondedRef = useRef(null);
    const projectMatchRef = useRef(null);
    console.log(props.location.origin);
    useEffect(() => {
        if (!navigated && receivedRef !== null && props.location.origin === 'received') {
            // console.log(inputEl);
            receivedRef?.current?.click();
            setNavigation(true)
        }
        if (!navigated && respondedRef !== null && props.location.origin === 'responded') {
            // console.log(inputEl);
            respondedRef?.current?.click();
            setNavigation(true)
        }
        if (!navigated && projectMatchRef !== null && props.location.origin === 'project-match') {
            // console.log(inputEl);
            projectMatchRef?.current?.click();
            setNavigation(true)
        }
        // else if (navigated) {
        //     inputEl?.current?.click()
        // }
    }, [])

    const [visible, setVisible] = useState(false);

    const notificationVisible = (status) => {
        setVisible(status);
    };


    return (
        <>
            <Sidebar notificationVisible={(status) => notificationVisible(status)}/>
            {/* <Navbar headingInfo="Quotation" /> */}
            <div className={`navbar-parent_Quotation ${visible && "conditionalPosition"}`}>
                <Navbar />
            </div>
            <div className={`back-parent ${visible && "conditionalPosition"}`} >
                <Back name="Quotation" />
            </div>

            <div className={`mainQuotation ${visible && "conditionalPosition"}`}>
                <div className="innerQuotation quotation">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" ref={receivedRef}>
                                <img src={received} alt="received" /> Received
                            </button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" ref={respondedRef}>
                                <img src={responded} alt="" /> Responded
                            </button>
                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" ref={projectMatchRef}>
                                <img src={matched} alt="" /> Project Matched
                            </button>
                        </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <Received />
                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <Responded />
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <ProjectesMatched />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quotation
