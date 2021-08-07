import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';
import UserProject from '../../Components/ClientNewestDashboard/LeftSide/UserProject';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';

import HireDeveloperIcon from "../../assets/images/Newestdashboard/LeftSide/HireDeveloper-icon.svg";
import HireAgencyIcon from '../../assets/images/Newestdashboard/LeftSide/HireAgency-icon.svg';
import ShortTermProjectIcon from '../../assets/images/Newestdashboard/LeftSide/ShortTermProject-icon.svg';
import InvestmentIcon from '../../assets/images/Newestdashboard/LeftSide/Investment-icon.svg';
import './ClientNewestDashboard.css'
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import notificationIcon from "../../assets/images/Newestdashboard/Navbar/notification_icon.svg";

import Input from "@material-ui/core/Input";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import instance from '../../Constants/axiosConstants';
import * as helper from '../../shared/helper';
import * as actions from '../../Redux/action/addProject';
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

function ClientNewestDashboard(props) {

    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem("userId")

    const [open, setOpen] = React.useState(false);
    const [openmodal, setOpenModal] = useState(false);
    const [projects, setProjects] = useState([])
    const [statuses, setStatuses] = useState([])

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


    useEffect(() => {
        console.log(projects);
    }, [statuses, projects])

    return (
        <>
            <div className="Navbar-clientDashboard">
                {/* <Navbar /> */}
                <div className="navbar">
                    {/* <div className="navbar-heading">
                        <h1>Overview</h1>
                    </div> */}
                    <div className="navbar-items">
                        <div className="notification-icon nav-left-item">
                            <img src={notificationIcon} alt="notification" />
                        </div>
                        {/* <div onClick={logout} className="logout-icon nav-left-item">
                    <div>
                        <ExitToAppIcon />
                    </div>
                    <img src={notificationIcon} alt="notification" />
                </div> */}
                        <div className="username nav-left-item">
                            <p>Atul Bhatt</p>
                        </div>
                        <div className="userprofile-circle nav-left-item" />
                    </div>
                </div>
            </div>
            <div className="dashboard-container">
                <Sidebar />
                <div className="container-body margin-0">
                    <div className="content-body">
                        <div className="content-leftBody">
                            <div className="user-operations">
                                <UserOperations nextpage={() => props.history.push("/hire-developer")} text='Hire Developer' img={HireDeveloperIcon} />
                                <UserOperations nextpage={() => props.history.push("/hire-agency-form-one")} text="Hire Agency" img={HireAgencyIcon} />
                                <UserOperations nextpage={() => props.history.push("/short-term")} text="Short Term Project" img={ShortTermProjectIcon} />
                                <UserOperations nextpage={() => props.history.push("/product-agencies")} text="Interested To Investment" img={InvestmentIcon} />
                            </div>
                            <div className="graphic">
                                <div className="graphic-illustration-heading">
                                    <h6>Project details</h6>
                                </div>
                                <div onClick={() => props.history.push('/agencyNewestAllProject')} className="showDetail_onClientNewestDashboard">
                                    {projects.length > 4 &&
                                        <p>View More Project</p>
                                    }
                                </div>
                            </div>
                            <div className="user-project position">
                                <div className="user-project-details">
                                    {
                                        projects.length > 0 ? projects.slice(0, 4).map((p, index) => {
                                            return (
                                                <>
                                                    <UserProject name={p.projectName} type={p.projectType} status={p.projectCurrentStatus} lastEdit={p.updatedAt} detailId={p._id} index={index} />
                                                </>
                                            )
                                        }) : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                            <h4 style={{ color: '#999' }}>No projects available</h4>
                                        </div>
                                    }
                                </div>
                                {/* <div onClick={() => props.history.push('/agencyNewestAllProject')} className="showDetail_onClientNewestDashboard">
                                    <p>Show Detail</p>
                                </div> */}
                            </div>
                        </div>
                        <RightSide />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAddProject: (projects) => dispatch(actions.addProject(projects))
    }
}

export default connect(null, mapDispatchToProps)(ClientNewestDashboard);
