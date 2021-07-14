import React from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';
import AgencyProjectCard from '../../Components/AgencyProjectCard/AgencyProjectCard';
import AllProjectIcon from '../../assets/images/Newestdashboard/All_Project/Vector.svg';

import DateImage from '../../assets/images/Newestdashboard/Agency_Project_Card/MainVector.svg';
import DateImage2 from '../../assets/images/Newestdashboard/Agency_Project_Card/Vector.svg';
import CurrentStatusImage from '../../assets/images/Newestdashboard/Agency_Project_Card/CurrentStatus1.svg';

import './AgencyNewestAllProject.css';
import Button from '../../Components/Button/Button';

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

                                <div className="user-project_agencyNewestAllProject">
                                    <div className="user-project_heading_agencyNewestAllProject">
                                        <div className="user-project_child_agencyNewestAllProject">
                                            <h5>Bani Thani Design Institute</h5>
                                        </div>
                                        <Button name="Show Details" />
                                    </div>

                                    <div className="user-project-status_AgencyNewestAllProject">
                                        <div className='date_AgencyNewestAllProject'>
                                            <div>
                                                <img src={DateImage} alt="dateImage" />
                                            </div>
                                            <p>8 july 2021</p>
                                        </div>
                                        <div className='matchedDate_AgencyNewestAllProject'>
                                            <div>
                                                <img src={DateImage2} alt="dateImage2" />
                                            </div>
                                            <p>Matched On 25 March 2021</p>
                                        </div>
                                    </div>

                                    <div className="user-project-details_AgencyNewestAllProject">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>Industry</td>
                                                    <td>Edtech</td>
                                                    <td>Final Budget</td>
                                                    <td>$2000</td>
                                                </tr>
                                                <tr>
                                                    <td>Expert Categories</td>
                                                    <td>Online File Submission</td>
                                                    <td>Services</td>
                                                    <td>App Developement</td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <RightSide /> */}
            </div>
        </div>
    )
}

export default AgencyNewestAllProject