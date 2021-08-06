import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import AllProjectIcon from '../../assets/images/Newestdashboard/All_Project/Vector.svg';
import { makeStyles } from '@material-ui/core/styles';
import './AgencyNewestAllProject.css';
import AllProjectCard from '../../Components/AllProjectCard/AllProjectCard';
import Filter from '../../Components/ClientNewestDashboard/Filter/Filter';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import instance from '../../Constants/axiosConstants';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
      marginLeft: theme.spacing(1.5)
    }
  }));  

function AgencyNewestAllProject() {
    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem("userId");

    const classes = useStyles();

    const [projects, setProjects] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [err, setErr] = useState();

    const handleChange = (event) => {
        setStatusFilter(event.target.value);
      };

    // const getAllProjects = () => {
    //     instance.get(`/api/${Role}/projects/all?clientId=${clientId}`)
    //         .then(function (response) {
    //             setProjects(response.projects);
    //             // setStatuses(response.statuses);
    //             console.log(response);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    useEffect(() => {
        console.log(projects);
    },[projects])

    const onSearchHandler = () => {
        if (statusFilter === '') {
            instance.get(`/api/${Role}/projects/all?clientId=${clientId}`)
                .then(response => {
                    setProjects(response.projects);
                })
                .catch((err) => {
                    console.error(err?.response?.data?.message);
                });
        }
        else {
            instance.get(`/api/${Role}/products/clientId=${clientId}/projectCurrentStatus=${statusFilter}`)
                .then(response => {
                    setProjects(response.projects);
                })
                .catch((err) => {
                    console.error(err?.response?.data?.message);
                });
        }

    }

    useEffect(() => {
        onSearchHandler();
    }, [])

    return (
        <div className="dashboard-container">
            <Sidebar />
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
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <RadioGroup aria-label="filter" name="filter" onChange={handleChange}>
                                                <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                                                <FormControlLabel value="running" control={<Radio />} label="Running" />
                                                <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
                                            </RadioGroup>
                                        </FormControl>

                                        {/* <div>
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
                                        </div> */}
                                    </div>

                                    <div className="search-content">
                                        <h6 className="search-name-heading">Search By Name</h6>
                                        <input type="text" placeholder="Type Here" />
                                    </div>

                                    <div onClick={onSearchHandler} className="search-button">
                                        <div>
                                            Search
                                        </div>
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
                                    {projects.map(p => {
                                        return (
                                            <AllProjectCard {...p} />
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgencyNewestAllProject