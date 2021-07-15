import React from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import AllProjectIcon from '../../assets/images/Newestdashboard/All_Project/Vector.svg';

import './AgencyNewestAllProject.css';
import AllProjectCard from '../../Components/AllProjectCard/AllProjectCard';
import Filter from '../../Components/ClientNewestDashboard/Filter/Filter';

function AgencyNewestAllProject() {
    return (
        <div className="container-body">
            <Navbar />
            <div className="content-body">
                <div className="content-leftBody_AgencyNewestDashboard">

                    <div className="all-project_div">
                        <img src={AllProjectIcon} alt="All Project Icon" />
                        <p>All Project</p>
                    </div>

                    <div className="main-section">
                        <div className='filter-parent'>
                            <Filter />
                        </div>
                        <div className="user-project_AgencyNewestAllProject">
                            <div className="project-actual-status">
                                <div className="completed-project">
                                    <h6>Completed Project</h6>
                                </div>
                                <div className="running-project">
                                    <h6>Running Project</h6>
                                </div>
                                <div className="rejected-project">
                                    <h6>Rejected Project</h6>
                                </div>
                            </div>
                            <div className="agency-card-parent">
                                <AllProjectCard />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgencyNewestAllProject