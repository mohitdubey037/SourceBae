import React, { useEffect, useState } from 'react';
import UserOperations from '../../Components/ClientNewestDashboard/LeftSide/UserOperations';
import UserProject from '../../Components/ClientNewestDashboard/LeftSide/UserProject';
import RequestedDevCard from '../../Components/ClientNewestDashboard/LeftSide/RequestedDevCard';
import CTA from '../../Components/ClientNewestDashboard/CTAContainer/CTAContainer';

import HireDeveloperIcon from '../../assets/images/Newestdashboard/LeftSide/hire_developer.svg';
import HireAgencyIcon from '../../assets/images/Newestdashboard/LeftSide/hire_agency.svg';
import ShortTermProjectIcon from '../../assets/images/Newestdashboard/LeftSide/short_term.svg';
import InvestmentIcon from '../../assets/images/Newestdashboard/LeftSide/interest_to_investment.svg';
import './ClientNewestDashboard.css';
import Sidebar from '../../Components/ClientNewestDashboard/Sidebar/Sidebar';

import instance from '../../Constants/axiosConstants';
import * as actions from '../../Redux/action/addProject';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import { connect } from 'react-redux';
import { CLIENTROUTES } from '../../Navigation/CONSTANTS';

function ClientNewestDashboard(props) {
    const Role = localStorage.getItem('role');
    const clientId = localStorage.getItem('userId');

    const [projects, setProjects] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isUserVerified, setUserVerified] = useState(false);
    const [hiredDevelopers, setHiredDevelopers] = useState([]);
    const userId = localStorage.getItem('userId');

    const handleClientData = () => {
        instance
            .get(`/api/${Role}/clients/get/${clientId}`)
            .then(function (response) {
                setUserVerified(
                    response[0].isUserEmailVerified ||
                        response[0].isUserPhoneVerified
                );
                localStorage.setItem(
                    'userVerified',
                    response[0].isUserEmailVerified ||
                        response[0].isUserPhoneVerified
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleClientData();
        instance
            .get(`/api/${Role}/hire-developers/all?clientId=${userId}`)
            .then((response) => {
                setHiredDevelopers(response);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllProjects = () => {
        instance
            .get(`/api/${Role}/projects/all?clientId=${clientId}`)
            .then(function (response) {
                setProjects(response.projects);
            })
            .catch((err) => {});
    };

    const notificationVisible = (status) => {
        setVisible(status);
    };

    useEffect(() => {
        getAllProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Sidebar
                isUserVerified={isUserVerified}
                notificationVisible={(status) => notificationVisible(status)}
            />
            <div
                style={{
                    zIndex: visible && '-1',
                    backgroundImage:
                        Role === 'Client' &&
                        'linear-gradient(284deg, rgba(3,118,186,1) 0%, rgba(1,48,77,1) 100%)'
                }}
                className="container-body"
            >
                <Navbar />
                <div className="content-body">
                    <div className="content-leftBody">
                        <div className="user-operations">
                            <UserOperations
                                isUserVerified={isUserVerified}
                                nextpage={() =>
                                    props.history.push({
                                        pathname: CLIENTROUTES.HIRE_DEVELOPER,
                                        state: { isUserVerified }
                                    })
                                }
                                text="Hire Remote Developer"
                                img={HireDeveloperIcon}
                            />
                            <UserOperations
                                isUserVerified={isUserVerified}
                                nextpage={() =>
                                    props.history.push({
                                        pathname: '/developer-request',
                                        state: { isUserVerified }
                                    })
                                }
                                text="Received Applications"
                                img={HireDeveloperIcon}
                            />
                            <UserOperations
                                isUserVerified={isUserVerified}
                                nextpage={() =>
                                    props.history.push({
                                        pathname: '/hire-agency-form-one',
                                        state: { isUserVerified }
                                    })
                                }
                                text="Hire Agency"
                                img={HireAgencyIcon}
                            />
                            <UserOperations
                                isUserVerified={isUserVerified}
                                nextpage={() =>
                                    props.history.push({
                                        pathname:
                                            CLIENTROUTES.CREATE_SHORT_TERM_PROJECT,
                                        state: { isUserVerified }
                                    })
                                }
                                text="Short Term Project"
                                img={ShortTermProjectIcon}
                            />
                            <UserOperations
                                isUserVerified={isUserVerified}
                                nextpage={() =>
                                    props.history.push({
                                        pathname: '/product-agencies',
                                        state: { isUserVerified }
                                    })
                                }
                                text="Investment Opportunities"
                                img={InvestmentIcon}
                            />
                        </div>
                        {projects.length > 0 && (
                            <div className="graphic">
                                <div className="graphic-illustration-heading">
                                    <h6>Project details</h6>
                                </div>
                                {projects.length > 2 && (
                                    <div
                                        onClick={() =>
                                            props.history.push(
                                                '/agency-newest-all-project'
                                            )
                                        }
                                        className="showDetail_onClientNewestDashboard"
                                    >
                                        <p>View More Project</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="user-project position">
                            <div className="user-project-details">
                                {projects.length > 0 &&
                                    projects.slice(0, 2).map((p, index) => {
                                        return (
                                            <>
                                                <UserProject
                                                    {...p}
                                                    index={index}
                                                />
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
                        {hiredDevelopers.length > 0 && (
                            <div className="graphic">
                                <div className="graphic-illustration-heading">
                                    <h6>Developers Requirement</h6>
                                </div>
                                {hiredDevelopers.length > 2 && (
                                    <div
                                        onClick={() =>
                                            props.history.push(
                                                '/get-client-hire-developer'
                                            )
                                        }
                                        className="showDetail_onClientNewestDashboard"
                                    >
                                        <p>View More Requirements</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="user-project position">
                            <div className="user-project-details">
                                {hiredDevelopers.length > 0 &&
                                    hiredDevelopers
                                        .slice(0, 2)
                                        .map((dev, index) => {
                                            return (
                                                <>
                                                    <RequestedDevCard
                                                        {...dev}
                                                        index={index}
                                                    />
                                                </>
                                            );
                                        })}
                            </div>
                        </div>
                    </div>
                    <CTA />
                </div>
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddProject: (projects) => dispatch(actions.addProject(projects))
    };
};

export default connect(null, mapDispatchToProps)(ClientNewestDashboard);
