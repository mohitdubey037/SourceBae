import React, { useState } from 'react';
import './AgencyProjectDashboard.css';
import Navbar from './Navbar';

const moreOptions = ['None', 'Atria', 'Callisto', 'Dione', 'Ganymede'];

function AgencyProjectDashboard(props) {
    const routeRedirecter = (id) => {
        window.location.href = `/agency-project-details:${id}`;
    };

    return (
        <>
            <Navbar />
            {moreOptions.map((p, index) => {
                return (
                    <div className="mainClientProjectStatus">
                        <div className="innerClientProjectStatus">
                            <div className="clientProjectCard">
                                <span className="leftBorderClientProject"></span>
                                <div className="cardTopPart">
                                    <div className="projectName">
                                        {/* <p onClick={() => projectNameNavigator(p)} className="projectDetailsRouter">{p.projectName}</p> */}
                                        <p className="projectDetailsRouter">
                                            {p}
                                        </p>
                                        <em>{p.projectType}</em>
                                    </div>
                                    <div className="projectStatus">
                                        {/* <p>{p.projectCurrentStatus}</p> */}
                                        <p>posted</p>
                                    </div>
                                </div>

                                <div className="projectUpdateDate">
                                    {/* <p>Last Edit on: <span><Moment format="D MMM YYYY" withTitle>{p.updatedAt}</Moment></span> </p> */}
                                    <p>
                                        Last Edit on:{' '}
                                        <span>12 September 2020</span>{' '}
                                    </p>
                                </div>

                                {/* <div className="projectStage">
                                <span className="statusLine"></span>
                            <div>
                            <span style={{ backgroundColor: p.projectCurrentStatus == 'Posted' ? '#5cb85c' : '#626567' }}>01</span>
                            <p>{p.projectCurrentStatus}</p>
                            </div>
                            </div> */}

                                <div className="projectStage">
                                    {/* <span className="statusLine"></span> */}
                                    {/* {statuses.map((s, index, value) => {
                                return (
                                    <div>
                                        <span style={{ backgroundColor: index <= value.indexOf(p.projectCurrentStatus) ? '#5cb85c' : '#626567' }}>{index + 1}</span>
                                        <p>{s}</p>
                                    </div>
                                )
                            })} */}

                                    <div>
                                        <span
                                            style={{
                                                backgroundColor: '#00ffbf'
                                            }}
                                        >
                                            02
                                        </span>
                                        <p>Shortlist Agency</p>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                backgroundColor: '#800000'
                                            }}
                                        >
                                            03
                                        </span>
                                        <p>Request Quotation</p>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                backgroundColor: '#0000ff'
                                            }}
                                        >
                                            04
                                        </span>
                                        <p>Hire the best!</p>
                                    </div>
                                </div>

                                <div className="clientProjectInformation">
                                    <div className="projectStatusInfo">
                                        <i
                                            class="fa fa-info-circle"
                                            aria-hidden="true"
                                        ></i>
                                        <p>
                                            The 1 agencies you have shortlisted
                                            have been notified. Wait for 24-48
                                            hours for their response.
                                        </p>
                                    </div>
                                    <div
                                        className="clientProjectLink"
                                        onClick={() => routeRedirecter(index)}
                                    >
                                        <p>View details </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default AgencyProjectDashboard;
