import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import AllProjectIcon from '../../assets/images/Newestdashboard/All_Project/app.svg';
import { makeStyles } from '@material-ui/core/styles';
import './AgencyNewestAllProject.css';
import AllProjectCard from '../../Components/AllProjectCard/AllProjectCard';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import instance from '../../Constants/axiosConstants';
import NotFound from '../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';

import UpImage from '../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../assets/images/Newestdashboard/Short_Term/DownImage.svg';


const useStyles = makeStyles((theme) => ({
    formControl: {
        marginLeft: theme.spacing(1.5)
    },
    marginRight: {
        marginRight: theme.spacing(4.7)
    }
}));

function AgencyNewestAllProject(props) {
    const classes = useStyles();

    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem("userId");

    const [projects, setProjects] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [err, setErr] = useState(false);

    const [tab, setTab] = useState(0);
    const [filterTab, setFilterTab] = useState(0);

    const getInitialData = () => {
        instance.get(`/api/${Role}/projects/all?clientId=${clientId}`)
            .then(response => {
                setProjects(response.projects);
            })
            .catch((err) => {
                setErr(err?.response?.data?.message)
                setTab(0);
            });
    }

    const onSearchHandler = (status) => {
        if (status === 'all') {
            instance.get(`/api/${Role}/projects/all?clientId=${clientId}`)
                .then(response => {
                    if (status === 'Done') {
                        setTab(1);
                    }
                    if (status === 'In Progress') {
                        setTab(2);
                    }
                    if (status === 'Cancelled') {
                        setTab(3);
                    }
                    if (status === 'all') {
                        setTab(4);
                    }
                    setProjects(response.projects);
                    setErr(false);
                })
                .catch((err) => {
                    setErr(true);
                    if (status === 'Done') {
                        setTab(1);
                    }
                    if (status === 'In Progress') {
                        setTab(2);
                    }
                    if (status === 'Cancelled') {
                        setTab(3);
                    }
                    if (status === '') {
                        setTab(4);
                    }
                });
        }
        else {
            instance.get(`/api/${Role}/projects/all?projectCurrentStatus=${status}`)
                .then(response => {
                    if (status === 'Done') {
                        setTab(1);
                    }
                    if (status === 'In Progress') {
                        setTab(2);
                    }
                    if (status === 'Cancelled') {
                        setTab(3);
                    }
                    if (status === '') {
                        setTab(4);
                    }
                    setProjects(response.projects);
                })
                .catch((err) => {
                    setErr(true);
                    if (status === 'Done') {
                        setTab(1);
                    }
                    if (status === 'In Progress') {
                        setTab(2);
                    }
                    if (status === 'Cancelled') {
                        setTab(3);
                    }
                    if (status === '') {
                        setTab(4);
                    }
                });
        }
    }

    useEffect(() => {
        getInitialData()
    }, [])

    useEffect(() => {
    }, [tab])

    useEffect(() => {
    }, [filterTab])

    useEffect(() => {
    }, [err])

    const filterButton = (num) => {
        setFilterTab(num)
        onSearchHandler();
    }

    const filterFunction = (event) => {
        setStatusFilter(event.target.value);
        onSearchHandler();
    }

    useEffect(() => {
    }, [projects])

    return (
        <div className="dashboard-container" style={{ overflow: "hidden" }}>
            <img className="Image1_AgencyNewest" src={UpImage} alt="upImage" />
            {/* <img className="Image2_AgencyNewest" src={DownImage} alt="downImage" /> */}
            <Sidebar />
            <div className="container-body container-body_agencyNewestAllProject">
                <Navbar />
                <div className="content-body">
                    <div className="content-leftBody_AgencyNewestDashboard">
                        <div className="all-project_div">
                            <img src={AllProjectIcon} alt="All Project Icon" />
                            <p>All Projects</p>
                        </div>

                        <div className="main-section">
                            <div className="user-project_AgencyNewestAllProject">
                                <div className="project-actual-status">
                                    <div onClick={() => onSearchHandler("all")} className={`completed-project ${tab === 4 && "blueConditional"}`}>
                                        <h6>All Project</h6>
                                    </div>
                                    <div onClick={() => onSearchHandler("Done")} className={`completed-project ${tab === 1 && "greenConditional"}`}>
                                        <h6>Completed Project</h6>
                                    </div>
                                    <div onClick={() => onSearchHandler("In Progress")} className={`running-project ${tab === 2 && "yellowConditional"}`}>
                                        <h6>Running Project</h6>
                                    </div>
                                    <div onClick={() => onSearchHandler("Cancelled")} className={`rejected-project ${tab === 3 && "redConditional"}`}>
                                        <h6>Rejected Project</h6>
                                    </div>
                                </div>
                                <div className="agency-card-parent" style={{height:err === true ?"100%":"39%"}}>
                                    {err === true ?
                                        <>
                                            <div style={{ textAlign: 'center'}}>
                                                <img style={{marginTop: '3rem'}} height="300px" src={NotFound} alt="no_data_img" />
                                                <p className="no_project_found">No Project Found</p>
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