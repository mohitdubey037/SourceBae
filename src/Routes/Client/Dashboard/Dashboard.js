import React, { useState, useEffect } from 'react'
import ClientNavbar from '../ClientNavbar'
import Moment from 'react-moment';

import hireDeveloper from '../../../assets/images/ClientDashboard/hireDeveloper.svg'
import hireAgency from '../../../assets/images/ClientDashboard/hireAgency.svg'
import freelancer from '../../../assets/images/ClientDashboard/freelancer.svg'
import wave from '../../../assets/images/ClientDashboard/wave.svg'
import littleVector from '../../../assets/images/ClientDashboard/littleVector.png'
import dots from '../../../assets/images/ClientDashboard/dots.png'
import info from '../../../assets/images/ClientDashboard/info.png'
import { withRouter } from "react-router";
import { NavLink, useHistory, Link } from 'react-router-dom';



import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import instance from '../../../Constants/axiosConstants';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 100,
    },
    filterValue: {
        fontWeight: '100',
    }
}));

function Dashboard() {


    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [projects, setProjects] = useState([])
    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        getAllProjects();
    }, [])

    const getAllProjects = () => {
        instance.get(`api/client/projects/all?&quotationReceived=`)
            .then(function (response) {
                setProjects(response.projects);
                setStatuses(response.statuses);
                console.log(response);
            });
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const getVisibility = (value) => {
        setIsVisible(value);
    }

    const routeRedirecter = (id) => {
        window.location.href = `/agency-list:${id}`;
    }

    useEffect(() => {
        // console.log(statuses);
    }, [statuses])

    statuses.map(st => console.log(st));


    return (
        <>
            <ClientNavbar isVisible={getVisibility} />
            {
                isVisible ? <div className="mainClientCards">
                    <img src={littleVector} className="littleVector" alt="" />
                    <img src={wave} className="wave" alt="" />
                    <img src={dots} className="dots" alt="" />
                    <p>Lets Go..!!!</p>
                    <h5>How shall you like to continue.?</h5>
                    <div className="innerClientCards">
                        <div className="hireDeveloperCard" onClick={() => window.location.href = "/hire-developer"} >
                            <div className="leftBorderHireDeveloper"></div>
                            <div className="hireDeveloperImage">
                                <img src={hireDeveloper} alt="" />
                            </div>
                            <div className="hireDeveloperContent">
                                <h4>Hire Developer</h4>
                            </div>
                        </div>
                        <div className="hireAgencyCard" onClick={() => window.location.href = "/hire-agency-form-one"} >
                            <div className="leftBorderHireDeveloper"></div>
                            <div className="hireAgencyImage">
                                <img src={hireAgency} alt="" />
                            </div>
                            <div className="hireAgencyContent">
                                <h4>Hire Agency</h4>
                            </div>
                        </div>
                        <div className="hireAgencyCard" onClick={() => window.location.href = "/short-term"} >
                            <div className="leftBorderHireDeveloper"></div>
                            <div className="hireAgencyImage">
                                <img src={freelancer} alt="" />
                            </div>
                            <div className="hireAgencyContent">
                                <h4>Short Term Project</h4>
                            </div>
                        </div>
                    </div>
                </div> : <div className="mainClientProjectStatus">
                    <div className="innerClientProjectStatus">
                        <div className='topHeading'>
                            <div className="dashboardText">
                                <h4>Dashboard</h4>
                            </div>
                            <div className="filterClientProjects">
                                {/* <div>
                                <p>Filter</p>
                            </div> */}
                                <div className="filterOptions">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel className={classes.filterValue} id="demo-controlled-open-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={age}
                                            onChange={handleChange}
                                        >
                                            {statuses.map(st => <MenuItem>{st}</MenuItem> )}
                                            {/* <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        <div className="allProjectsClients">
                            {projects.map(p => {
                                // const statusColor = 'blue'
                                // if (p.projectCurrentStatus === 'Posted'){
                                //     console.log('h');
                                //     statusColor = '#5cb85c'
                                // }
                                return (
                                    <div className="clientProjectCard">
                                        <span className="leftBorderClientProject"></span>
                                        <div className="cardTopPart">
                                            <div className="projectName">
                                                {/* <h6 onClick={() => <NavLink to ={{
                                                                    pathname: "/dsfdsfjgdsjfsjfgj-details",
                                                                    state: {...p}
                                                                }}/>
                                                                }>{p.projectName}</h6> */}
                                                <NavLink className="projectDetailsRouter" to={{
                                                    pathname: "/project-details",
                                                    state: { ...p },
                                                    condition: 'Client',
                                                }}
                                                >{p.projectName}
                                                </NavLink>
                                                <em>{p.projectType}</em>
                                            </div>
                                            <div className="projectStatus">
                                                <p>No agencies picked</p>
                                            </div>
                                        </div>


                                        <div className="projectUpdateDate">
                                            <p>Last Edit on: <span><Moment format="D MMM YYYY" withTitle>{p.updatedAt}</Moment></span> </p>
                                        </div>

                                        {/* <div className="projectStage">
                                            <span className="statusLine"></span>
                                            <div>
                                                <span style={{ backgroundColor: p.projectCurrentStatus == 'Posted' ? '#5cb85c' : '#626567' }}>01</span>
                                                <p>{p.projectCurrentStatus}</p>
                                            </div>
                                        </div> */}

                                        <div className="projectStage">
                                            <span className="statusLine"></span>
                                            <div>
                                                <span style={{ backgroundColor: p.projectCurrentStatus === 'Posted' ? '#5cb85c' : '#626567' }}>01</span>
                                                <p>{p.projectCurrentStatus}</p>
                                            </div>
                                            {/* <div>
                                                <span style={{ backgroundColor: '#00ffbf' }}>02</span>
                                                <p>Shortlist Agency</p>
                                            </div>
                                            <div>
                                                <span style={{ backgroundColor: '#800000' }}>03</span>
                                                <p>Request Quotation</p>
                                            </div>
                                            <div>
                                                <span style={{ backgroundColor: '#0000ff' }}>04</span>
                                                <p>Hire the best!</p>
                                            </div> */}
                                        </div>

                                        <div className="clientProjectInformation">
                                            <div className="projectStatusInfo">
                                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                                                <p>The 1 agencies you have shortlisted have been notified. Wait for 24-48 hours for their response.</p>
                                            </div>
                                             {/* <div className="clientProject"> */}
                                                {/* <div onClick={() => routeRedirecter(p._id)}><p>View Proposal</p></div> */}
                                                <div className='clientProjectLink' onClick={() => routeRedirecter(p._id)}><p>Visit More Agency </p></div>
                                                <div className='clientProjectLink'><p>Visit Selected Agency</p></div>
                                            {/* </div> */}
                                        </div>

                                    </div>
                                )
                            })}

                            {/* <div className="clientProjectCard">
                                <span className="leftBorderClientProject"></span>
                                <div className="cardTopPart">
                                    <div className="projectName">
                                        <h6>Bandhify</h6>
                                        <em>Hire Agency</em>
                                    </div>
                                    <div className="projectStatus">
                                        <p>No agencies picked</p>
                                    </div>
                                </div>


                                <div className="projectUpdateDate">
                                    <p>Last Edit on: <span>17 Apr 2021</span> </p>
                                </div>


                                <div className="projectStage">
                                    <span className="statusLine"></span>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>01</span>
                                        <p>Post Project</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#626567' }}>02</span>
                                        <p>Shortlist Agency</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#626567' }}>03</span>
                                        <p>Request Quotation</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#626567' }}>04</span>
                                        <p>Hire the best!</p>
                                    </div>
                                </div>

                                <div className="clientProjectInformation">
                                    <div className="projectStatusInfo">
                                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        <p>The 1 agencies you have shortlisted have been notified. Wait for 24-48 hours for their response.</p>
                                    </div>
                                    <div className="clientProject">
                                        <div><p>View Proposal</p></div>
                                    </div>
                                </div>

                            </div> */}


                            {/* <div className="clientProjectCard">
                                <span className="leftBorderClientProject"></span>
                                <div className="cardTopPart">
                                    <div className="projectName">
                                        <h6>Bandhify</h6>
                                        <em>Hire Agency</em>
                                    </div>
                                    <div className="projectStatus">
                                        <p style={{ backgroundColor: '#5cb85c' }}>awaiting proposals</p>
                                    </div>
                                </div>


                                <div className="projectUpdateDate">
                                    <p>Last Edit on: <span>17 Apr 2021</span> </p>
                                </div>


                                <div className="projectStage">
                                    <span className="statusLine"></span>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>01</span>
                                        <p>Post Project</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>02</span>
                                        <p>Shortlist Agency</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>03</span>
                                        <p>Request Quotation</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#626567' }}>04</span>
                                        <p>Hire the best!</p>
                                    </div>
                                </div>

                                <div className="clientProjectInformation">
                                    <div className="projectStatusInfo">
                                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        <p>You have been matched with some expert agencies for your requirement.</p>
                                    </div>
                                    <div className="clientProject">
                                        <div><p>View Proposal</p></div>
                                    </div>
                                </div>

                            </div> */}



                            {/* <div className="clientProjectCard">
                                <span className="leftBorderClientProject"></span>
                                <div className="cardTopPart">
                                    <div className="projectName">
                                        <h6>Zomato</h6>
                                        <em>Hire Developer</em>
                                    </div>
                                    <div className="projectStatus">
                                        <p style={{ backgroundColor: '#f0ad4e' }}>Searching Developer</p>
                                    </div>
                                </div>
                                <div className="projectUpdateDate">
                                    <p>Last Edit on: <span>17 Apr 2021</span> </p>
                                </div>
                                <div className="projectStage">
                                    <span className="statusLine"></span>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>01</span>
                                        <p>Post Developer Form</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#626567' }}>02</span>
                                        <p>Hire the best!</p>
                                    </div>
                                </div>
                                <div className="clientProjectInformation">
                                    <div className="projectStatusInfo">
                                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        <p>We are working in finding the suitable developer for your projects</p>
                                    </div>
                                    <div className="clientProject">
                                        <div><p>View Proposal</p></div>
                                    </div>
                                </div>
                            </div> */}


                            {/* <div className="clientProjectCard">
                                <span className="leftBorderClientProject"></span>
                                <div className="cardTopPart">
                                    <div className="projectName">
                                        <h6>Swiggy</h6>
                                        <em>Short Term Project</em>
                                    </div>
                                    <div className="projectStatus">
                                        <p style={{ backgroundColor: '#5cb85c' }}>awaiting proposals</p>
                                    </div>
                                </div>


                                <div className="projectUpdateDate">
                                    <p>Last Edit on: <span>17 Apr 2021</span> </p>
                                </div>


                                <div className="projectStage">
                                    <span className="statusLine"></span>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>01</span>
                                        <p>Post Project</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>02</span>
                                        <p>Shortlist Agency</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#5cb85c' }}>03</span>
                                        <p>Request Quotation</p>
                                    </div>
                                    <div>
                                        <span style={{ backgroundColor: '#626567' }}>04</span>
                                        <p>Hire the best!</p>
                                    </div>
                                </div>

                                <div className="clientProjectInformation">
                                    <div className="projectStatusInfo">
                                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        <p>You have been matched with some expert agencies for your requirement.</p>
                                    </div>
                                    <div className="clientProject">
                                        <div><p>View Proposal</p></div>
                                    </div>
                                </div>

                            </div> */}


                        </div>

                    </div>
                </div>
            }




        </>
    )
}

export default withRouter(Dashboard)
