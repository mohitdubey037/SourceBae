import React from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import AllProjectIcon from '../../assets/images/Newestdashboard/All_Project/Vector.svg';

import './AgencyNewestAllProject.css';
import AllProjectCard from '../../Components/AllProjectCard/AllProjectCard';

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
                        <div className="filter">

                            <div className="filter-button">
                                <div className="reset-filter">
                                    <h6>Reset Filter</h6>
                                </div>
                                <div className="apply-filter">
                                    <h6>Apply Filter</h6>
                                </div>
                            </div>
                            <h5>Stages</h5>

                            <div className="status-checkbox">
                                <div>
                                    <input className="larger-checkbox" type="checkbox" name="Completed" id="project-status" />
                                    <p>Completed</p>
                                </div>
                                <div>
                                    <input className="larger-checkbox" type="checkbox" name="Running" id="project-status" />
                                    <p>Running</p>
                                </div>
                                <div>
                                    <input className="larger-checkbox" type="checkbox" name="Rejected" id="project-status" />
                                    <p>Rejected</p>
                                </div>
                            </div>

                            <div className="search-content">
                                <h6 className="search-name-heading">Search By Name</h6>
                                <input type="text" placeholder="Type Here"/>
                            </div>

                            <div className="search-button">
                                <div>
                                    Search
                                </div>
                            </div>
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