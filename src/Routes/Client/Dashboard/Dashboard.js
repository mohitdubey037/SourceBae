import React, { useState } from 'react'
import ClientNavbar from '../ClientNavbar'

import hireDeveloper from '../../../assets/images/ClientDashboard/hireDeveloper.svg'
import hireAgency from '../../../assets/images/ClientDashboard/hireAgency.svg'
import freelancer from '../../../assets/images/ClientDashboard/freelancer.svg'
import wave from '../../../assets/images/ClientDashboard/wave.svg'
import littleVector from '../../../assets/images/ClientDashboard/littleVector.png'
import dots from '../../../assets/images/ClientDashboard/dots.png'
import info from '../../../assets/images/ClientDashboard/info.png'


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


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
                        <div className="hireDeveloperCard">
                            <div className="leftBorderHireDeveloper"></div>
                            <div className="hireDeveloperImage">
                                <img src={hireDeveloper} alt="" />
                            </div>
                            <div className="hireDeveloperContent">
                                <h4>Hire Developer</h4>
                            </div>
                        </div>
                        <div className="hireAgencyCard">
                            <div className="leftBorderHireDeveloper"></div>
                            <div className="hireAgencyImage">
                                <img src={hireAgency} alt="" />
                            </div>
                            <div className="hireAgencyContent">
                                <h4>Hire Agency</h4>
                            </div>
                        </div>
                        <div className="hireAgencyCard">
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
                                                <MenuItem value="">
                                                    <em>All</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>

                            <div className="allProjectsClients">

                                <div className="clientProjectCard">
                                    <span className="leftBorderClientProject"></span>
                                    <div className="cardTopPart">
                                        <div className="projectName">
                                            <h6>Bandhify</h6>
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

                                </div>


                                <div className="clientProjectCard">
                                    <span className="leftBorderClientProject"></span>
                                    <div className="cardTopPart">
                                        <div className="projectName">
                                            <h6>Bandhify</h6>
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

                                </div>


                            </div>

                        </div>
                    </div>
            }




        </>
    )
}

export default Dashboard
