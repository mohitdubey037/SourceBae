import React, { useEffect, useState } from 'react';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';
import UserProject from '../../Components/ClientNewestDashboard/LeftSide/UserProject';
import RightSide from '../../Components/ClientNewestDashboard/RightSide/RightSide';

import HireDeveloperIcon from "../../assets/images/Newestdashboard/LeftSide/hire_developer.svg";
import HireAgencyIcon from '../../assets/images/Newestdashboard/LeftSide/hire_agency.svg';
import ShortTermProjectIcon from '../../assets/images/Newestdashboard/LeftSide/short_term.svg';
import InvestmentIcon from '../../assets/images/Newestdashboard/LeftSide/interest_to_investment.svg';
import './ClientNewestDashboard.css'
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';
import notificationIcon from "../../assets/images/Newestdashboard/Navbar/notification_icon.svg";
import NotFound from '../../assets/images/Newestdashboard/Not_found/NotFound_new.svg';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import instance from '../../Constants/axiosConstants';
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

    console.log(props)

    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem("userId");

    const [open, setOpen] = React.useState(false);
    const [openmodal, setOpenModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [visible, setVisible] = useState(false);

    const [clientData, setClientData] = useState({
        firstName: "",
        lastName: ""
    })

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

    const notificationVisible = (status) => {
        setVisible(status);
    };

    const getClientProfileApi = () => {
        instance.get(`/api/${Role}/clients/get/${clientId}`)
            .then(function (response) {
                console.log(response);
                setClientData({
                    firstName: response[0].firstName,
                    lastName: response[0].lastName,
                });
            })
            .catch(err => {
                console.log(err?.response?.data?.message)
            })
    };


    useEffect(() => {
        console.log(projects);
        console.log(visible);
    }, [statuses, projects, visible])

    useEffect(() => {
        getAllProjects();
        getClientProfileApi();
    }, [])

    useEffect(() => {
        console.log(visible);
    }, [visible])

    return (
        <>

            <Sidebar notificationVisible={(status) => notificationVisible(status)} />
            <div style={{zIndex: visible === 'true' && '-1'}} className="container-body">
                <div style={{top: '1rem'}} className="navbar">
                    <div className="navbar-items">
                        <div style={{ paddingRight: '10px' }} className="username">
                            <p>{clientData.firstName} {clientData.lastName}</p>
                        </div>
                        <div className="userprofile-circle nav-left-item">
                            <img src={" "} />
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    <div style={{ zIndex: visible && '-1' }} className="content-leftBody">
                        <div className="user-operations">
                            <UserOperations nextpage={() => props.history.push("/hire-developer")} text='Hire Developer' img={HireDeveloperIcon} />
                            <UserOperations nextpage={() => props.history.push("/hire-agency-form-one")} text="Hire Agency" img={HireAgencyIcon} />
                            <UserOperations nextpage={() => props.history.push("/short-term")} text="Short Term Project" img={ShortTermProjectIcon} />
                            <UserOperations nextpage={() => props.history.push("/product-agencies")} text="Interested To Investment" img={InvestmentIcon} />
                        </div>
                        <div className="graphic">
                            {projects.length > 0 &&
                                <div className="graphic-illustration-heading">
                                    <h6>Project details</h6>
                                </div>
                            }
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
                                                <UserProject
                                                    {...p}
                                                    index={index} />
                                            </>
                                        )
                                    }) :
                                        <div className="not_found clientNewestDashboard">
                                            <img src={NotFound} alt="NotFound" />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <RightSide />
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
