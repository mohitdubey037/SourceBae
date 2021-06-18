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
import { NavLink, useHistory, Link } from 'react-router-dom';

import Input from "@material-ui/core/Input";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import instance from '../../../Constants/axiosConstants';
import * as helper from '../../../shared/helper';
import clsx from 'clsx';

import * as actions from '../../../Redux/action/addProject';
import { connect } from 'react-redux';

const MenuProps = {
    getContentAnchorEl: () => null,
    PaperProps: {
        style: {
            maxHeight: 215,
            width: 200,
            top: 360
        },
    },
};


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
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
}));

function getStyles(singleTechObject, allTechnologies, theme) {
    return {
        fontWeight:
            allTechnologies.indexOf(singleTechObject) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function Dashboard(props) {

    const Role = helper.lowerize(localStorage.getItem('role'));
    const clientId = localStorage.getItem("userId")

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [projects, setProjects] = useState([])
    const [statuses, setStatuses] = useState([])
    const [selectedStatus, setSelectedStatus] = React.useState('');

    const theme = useTheme();


    const getAllProjects = () => {
        instance.get(`/api/${Role}/projects/all?clientId=${clientId}`)
            .then(function (response) {
                setProjects(response.projects);
                setStatuses(response.statuses);
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getAllProjects();
    }, [])

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
        console.log(event.target.value);
        instance.get(`/api/${Role}/projects/all?clientId=${clientId}&projectCurrentStatus=${event.target.value}`)
            .then(response => {
                console.log(response);
                setProjects(response.projects);
            })
            .catch(error => {
                setProjects([]);
                console.log(error);
            })
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
        props.history.push(`/agency-list:${id}`);
    }

    const projectNameNavigator = (p) => {
        console.log(p)
        props.onAddProject(p);
        props.history.push('/project-details');
    }

    useEffect(() => {
        console.log(projects);
    }, [statuses, projects])

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
                        <div className="hireDeveloperCard" onClick={() => props.history.push("/hire-developer")} >
                            <div className="leftBorderHireDeveloper"></div>
                            <div className="hireDeveloperImage">
                                <img src={hireDeveloper} alt="" />
                            </div>
                            <div className="hireDeveloperContent">
                                <h4>Hire Developer</h4>
                            </div>
                        </div>
                        <div className="hireAgencyCard" onClick={() => props.history.push("/hire-agency-form-one")} >
                            <div className="leftBorderHireDeveloper"></div>
                            <div className="hireAgencyImage">
                                <img src={hireAgency} alt="" />
                            </div>
                            <div className="hireAgencyContent">
                                <h4>Hire Agency</h4>
                            </div>
                        </div>
                        <div className="hireAgencyCard" onClick={() => props.history.push("/short-term")} >
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
                                <div className="filterOptions">

                                    <FormControl className={classes.formControl}>
                                        <h6>Status</h6>                                        
                                        <Select
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            displayEmpty
                                            value={selectedStatus}
                                            MenuProps={MenuProps}
                                            className={classes.selectEmpty}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>All</em>
                                            </MenuItem>
                                            {statuses.map((st) => {
                                                return (
                                                    <MenuItem
                                                        className={clsx('SelectClass', classes.selectOptions)}
                                                        value={st}
                                                        style={getStyles(st, selectedStatus, theme)}>{st}</MenuItem>
                                                )
                                            })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        <div className="allProjectsClients">
                            { projects.length>0 
                            ?
                            
                            projects.map(p => {
                                return (
                                    <div className="clientProjectCard">
                                        <span className="leftBorderClientProject"></span>
                                        <div className="cardTopPart">
                                            <div className="projectName">
                                                <p onClick={() => projectNameNavigator(p)} className="projectDetailsRouter">{p.projectName}</p>
                                                {/* <NavLink className="projectDetailsRouter" to={{
                                                    pathname: "/project-details",
                                                    state: { ...p },
                                                    condition: 'Client',
                                                }}
                                                >{p.projectName}
                                                </NavLink> */}
                                                <em>{p.projectType}</em>
                                            </div>
                                            <div className="projectStatus">
                                                <p>{p.projectCurrentStatus}</p>
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
                                            {statuses.map((s, index, value) => {
                                                if(index<7)
                                                return (
                                                    <div>
                                                        <span style={{ backgroundColor: index <= value.indexOf(p.projectCurrentStatus) ? '#5cb85c' : '#626567' }}>{index + 1}</span>
                                                        <p>{s}</p>
                                                    </div>
                                                )
                                                else
                                                    return ""
                                            })}


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
                                            <div className='clientProjectLink' onClick={() => routeRedirecter(p._id)}><p>Show Project Details</p></div>
                                            {/* </div> */}
                                        </div>

                                    </div>
                                )
                            })
                            
                            :
                            <h3>No Data Available.</h3>
                            }
                            


                        </div>

                    </div>
                </div>
            }




        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAddProject : (projects) => dispatch(actions.addProject(projects))
    }
}

export default connect(null, mapDispatchToProps)(Dashboard)
