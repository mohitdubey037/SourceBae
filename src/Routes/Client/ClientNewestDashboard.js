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
import NotFound from '../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';

// import { makeStyles, useTheme } from '@material-ui/core/styles';
import instance from '../../Constants/axiosConstants';
import * as actions from '../../Redux/action/addProject';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import { connect } from 'react-redux';

// const MenuProps = {
//     getContentAnchorEl: () => null,
//     PaperProps: {
//         style: {
//             maxHeight: 215,
//             width: 200,
//             top: 360
//         },
//     },
// };

// const useStyles = makeStyles((theme) => ({
//     button: {
//         display: 'block',
//         marginTop: theme.spacing(2),
//     },
//     formControl: {
//         margin: theme.spacing(0),
//         minWidth: 100,
//     },
//     filterValue: {
//         fontWeight: '100',
//     },
//     selectEmpty: {
//         marginTop: theme.spacing(2),
//     }
// }));

// function getStyles(singleTechObject, allTechnologies, theme) {
//     return {
//         fontWeight:
//             allTechnologies.indexOf(singleTechObject) === -1
//                 ? theme.typography.fontWeightRegular
//                 : theme.typography.fontWeightMedium,
//     };
// }

function ClientNewestDashboard(props) {

    // if (props.history.action === 'POP') {
    //     props.history.push('/clientNewestDashboard');
    // }

    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem("userId");

    // const [open, setOpen] = React.useState(false);
    // const [openmodal, setOpenModal] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isUserVerified, setUserVerified] = useState(false);
    const [isUserEmailVerified, setUserEmailVerified] = useState(true);
    const [isUserPhoneVerified, setUserPhoneVerified] = useState(true);

    const handleClientData = () => {
        instance.get(`/api/${Role}/clients/get/${clientId}`)
            .then(function (response) {
                console.log(response[0].isUserEmailVerified);
                console.log(response[0].isUserPhoneVerified);
                setUserVerified(response[0].isUserEmailVerified || response[0].isUserPhoneVerified);
                localStorage.setItem('userVerified', (response[0].isUserEmailVerified || response[0].isUserPhoneVerified))
                setUserEmailVerified(response[0].isUserEmailVerified);
                setUserPhoneVerified(response[0].isUserPhoneVerified);
            })
            .catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        handleClientData();
    }, []);

    const getAllProjects = () => {
        instance.get(`/api/${Role}/projects/all?clientId=${clientId}`)
            .then(function (response) {
                console.log(response);
                setProjects(response.projects);
                setStatuses(response.statuses);
            })
            .catch(err => {
            })
    }

    const notificationVisible = (status) => {
        setVisible(status);
    };


    useEffect(() => {
        getAllProjects();
    }, []);

    return (
        <>
            <Sidebar isUserVerified={isUserVerified} notificationVisible={(status) => notificationVisible(status)} />
            <div style={{ zIndex: visible && '-1', backgroundImage: Role === 'Client' && 'linear-gradient(284deg, rgba(3,118,186,1) 0%, rgba(1,48,77,1) 100%)' }} className="container-body">
                <Navbar />
                <div className="content-body">
                    
                    <div className="content-leftBody">
                        <div className="user-operations">
                            <UserOperations isUserVerified={isUserVerified} nextpage={() => props.history.push({ pathname: "/hire-developer", state:{isUserVerified}})} text='Hire Developer' img={HireDeveloperIcon} />
                            <UserOperations isUserVerified={isUserVerified} nextpage={() => props.history.push({ pathname: "/hire-agency-form-one", state:{isUserVerified}})} text="Hire Agency" img={HireAgencyIcon} />
                            <UserOperations isUserVerified={isUserVerified} nextpage={() => props.history.push({ pathname: "/short-term", state:{isUserVerified}})} text="Short Term Project" img={ShortTermProjectIcon} />
                            <UserOperations isUserVerified={isUserVerified} nextpage={() => props.history.push({ pathname: "/product-agencies", state:{isUserVerified}})} text="Interested To Investment" img={InvestmentIcon} />
                        </div>
                        {projects.length > 0 &&
                            <div className="graphic">
                                <div className="graphic-illustration-heading">
                                    <h6>Project details</h6>
                                </div>
                                {projects.length > 4 &&
                                    <div onClick={() => props.history.push('/agencyNewestAllProject')} className="showDetail_onClientNewestDashboard">
                                        <p>View More Project</p>
                                    </div>
                                }
                            </div>
                        }
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
                                            <p className="no_project_found">No Project Found</p>
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
