import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import AllProjectIcon from '../../assets/images/Newestdashboard/All_Project/app.svg';
import './AgencyNewestAllProject.css';
import AllProjectCard from '../../Components/AllProjectCard/AllProjectCard';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import instance from '../../Constants/axiosConstants';
import NotFound from '../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';

function AgencyNewestAllProject(props) {
    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem('userId');

    const [projects, setProjects] = useState([]);
    const [err, setErr] = useState(false);

    const [tab, setTab] = useState(4);

    const getInitialData = () => {
        instance
            .get(`/api/${Role}/projects/all?clientId=${clientId}`)
            .then((response) => {
                setProjects(response.projects);
            })
            .catch((err) => {
                setErr(err?.response?.data?.message);
                setTab(0);
            });
    };

    const onSearchHandler = (status) => {
        if (status === 'all') {
            instance
                .get(`/api/${Role}/projects/all?clientId=${clientId}`)
                .then((response) => {
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
        } else {
            instance
                .get(`/api/${Role}/projects/all?projectCurrentStatus=${status}`)
                .then((response) => {
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
    };

    useEffect(() => {
        getInitialData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="dashboard-container" style={{ overflow: 'hidden' }}>
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
                                    <div
                                        onClick={() => onSearchHandler('all')}
                                        className={`completed-project ${
                                            tab === 4 && 'blueConditional'
                                        }`}
                                    >
                                        <h6>All Project</h6>
                                    </div>
                                    <div
                                        onClick={() =>
                                            onSearchHandler('In Progress')
                                        }
                                        className={`running-project ${
                                            tab === 2 && 'yellowConditional'
                                        }`}
                                    >
                                        <h6>Running Project</h6>
                                    </div>
                                    <div
                                        onClick={() => onSearchHandler('Done')}
                                        className={`completed-project ${
                                            tab === 1 && 'greenConditional'
                                        }`}
                                    >
                                        <h6>Completed Project</h6>
                                    </div>
                                    <div
                                        onClick={() =>
                                            onSearchHandler('Cancelled')
                                        }
                                        className={`rejected-project ${
                                            tab === 3 && 'redConditional'
                                        }`}
                                    >
                                        <h6>Rejected Project</h6>
                                    </div>
                                </div>
                                <div
                                    className="agency-card-parent"
                                    style={{
                                        height: err === true ? '100%' : '44%'
                                    }}
                                >
                                    {err === true ? (
                                        <>
                                            <div
                                                style={{ textAlign: 'center' }}
                                            >
                                                <img
                                                    style={{
                                                        marginTop: '3rem'
                                                    }}
                                                    height="300px"
                                                    src={NotFound}
                                                    alt="no_data_img"
                                                />
                                                <p className="no_project_found no_project_agencyNewestAllProject">
                                                    Nothing here yet! Please
                                                    check again later.
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        projects.map((p) => {
                                            return <AllProjectCard {...p} />;
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgencyNewestAllProject;
