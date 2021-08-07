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
import Not_Found from '../../assets/images/Newestdashboard/Not_found/no_data_icon.jpg';
import { SettingsBackupRestore } from '@material-ui/icons';

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

    const [tab, setTab] = useState(0);
    const [filterTab, setFilterTab] = useState(0);

    const onSearchHandler = () => {
        console.log(statusFilter);
        if (statusFilter === '') {
            instance.get(`/api/${Role}/projects/all?clientId=${clientId}`)
                .then(response => {
                    console.log(response, 'api')
                    setProjects(response.projects);
                })
                .catch((err) => {
                    console.error(err?.response?.data?.message);
                    setErr(err?.response?.data?.message)
                });
        }
        else {
            instance.get(`/api/${Role}/projects/all?projectCurrentStatus=${statusFilter}`)
                .then(response => {
                    setProjects(response.projects);
                })
                .catch((err) => {
                    console.error(err?.response?.data?.message);
                    setErr(err?.response?.data?.message)
                    setProjects([])
                });
        }

    }

    useEffect(() => {
        console.log(projects);
    }, [projects])

    useEffect(() => {
        console.log(tab);
    }, [tab])

    useEffect(() => {
        console.log(filterTab);
    }, [filterTab])

    const filterButton = (num) => {
        setFilterTab(num)
        onSearchHandler();
    }

    const filterFunction = (event) => {
        if (event.target.value === 'Done') {
            setTab(1);
            setStatusFilter(event.target.value);
            onSearchHandler();
        }
        if (event.target.value === 'In Progress') {
            setTab(2)
            setStatusFilter(event.target.value);
            onSearchHandler();
        }
        if (event.target.value === 'Cancelled') {
            setTab(3)
            setStatusFilter(event.target.value);
            onSearchHandler();
        }
        if (event.target.value === '') {
            setTab(0);
            setStatusFilter(event.target.value);
            onSearchHandler();
        }
    }

    useEffect(() => {
        onSearchHandler();
    }, [])

    useEffect(() => {
        console.log(projects, 'effect');
    }, [projects])

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
                                        <div onClick={() => filterButton(1)} className="reset-filter">
                                            <h6 style={{ color: filterTab === 1 && '#FFFFFF', backgroundColor: filterTab === 1 && '#A6C8FF' }}>Reset Filter</h6>
                                        </div>
                                        <div onClick={() => filterButton(2)} className="apply-filter">
                                            <h6 style={{ color: filterTab === 2 && '#FFFFFF', backgroundColor: filterTab === 2 && '#A6C8FF' }}>Apply Filter</h6>
                                        </div>
                                    </div>
                                    <h5>Stages</h5>

                                    <div className="status-checkbox">
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <RadioGroup aria-label="filter" name="filter" onChange={filterFunction}>
                                                <FormControlLabel value="Done" control={<Radio />} label="Completed" />
                                                <FormControlLabel value="In Progress" control={<Radio />} label="Running" />
                                                <FormControlLabel value="Cancelled" control={<Radio />} label="Rejected" />
                                                <FormControlLabel value='' control={<Radio />} label="all" />
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

                                    <div className="search-button">
                                        <div>
                                            Search
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-project_AgencyNewestAllProject">
                                <div className="project-actual-status">
                                    <div className="completed-project" style={{ backgroundColor: tab === 1 ? '#A6C8FF' : '#F9F9F9' }}>
                                        <h6>Completed Project</h6>
                                    </div>
                                    <div className="running-project" style={{ backgroundColor: tab === 2 ? '#A6C8FF' : '#F9F9F9' }}>
                                        <h6>Running Project</h6>
                                    </div>
                                    <div className="rejected-project" style={{ backgroundColor: tab === 3 ? '#A6C8FF' : '#F9F9F9' }}>
                                        <h6>Rejected Project</h6>
                                    </div>
                                </div>
                                <div className="agency-card-parent">
                                    {projects.length === 0 ?
                                        <>
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <img height="300px" src={Not_Found} alt="no_data_img" />
                                                <h6>{err}</h6>
                                            </div>
                                        </>
                                        :
                                        projects.map(p => {
                                            return (
                                                <AllProjectCard {...p} />
                                            )
                                        })
                                    }
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