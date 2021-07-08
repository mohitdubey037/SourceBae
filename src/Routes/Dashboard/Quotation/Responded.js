/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import instance from '../../../Constants/axiosConstants';
import './Responded.css'
import RespondedDetails from './RespondedDetails';
import Moment from 'react-moment';
import Spinner from '../../../Components/Spinner/Spinner';
import NO_Data_ICON from '../no_data_icon.jpg';
import {withRouter} from 'react-router';

function Responded(props) {
    const agencyId = localStorage.getItem('userId');
    const Role = localStorage.getItem('role');
    const [err, setErr] = useState();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllReceivedData = () => {
        setLoading(true)
        instance.get(`/api/${Role}/projects/all?agencyId=${agencyId}&projectResponded=1`)
            .then(response => {
                setLoading(false);
                setProjects(response.projects);
            })
            .catch(err => {
                setLoading(false)
                setErr(err?.response?.data?.message)
            })

    }

    useEffect(() => {
        getAllReceivedData()
    }, [])

    const [isDetail, setIsdetail] = useState(false);

    return (
        <>
            {loading ? <Spinner /> :
                <div className="mainResponded">
                    <div className="innerResponded">
                        {err ?
                            <>
                                <div style={{ textAlign: 'center', width: '100%' }}>
                                    <img height="300px" src={NO_Data_ICON} alt="no_data_img" />
                                    <h6>{err}</h6>
                                </div>
                            </>
                            :
                            projects.map((s) => {
                                return (
                                    isDetail === false ? (
                                        <div className="respondedCard">
                                            <div className="bgCircle"></div>
                                            <div className="leftBorder"></div>
                                            <div className="respondCardHeader">
                                                <div className="respondName">
                                                    <h4>{s.projectName}</h4>

                                                </div>
                                                <div className="dateCreated">
                                                    <div>
                                                        <p><Moment format="D MMM YYYY" withTitle>{s.updatedAt}</Moment></p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="respondCardDescription">
                                                <p title={s.projectDescription}>{`${(s.projectDescription).slice(0, 100)}...`}</p>
                                            </div>
                                            <div className="respondCardPoints">
                                                <ul>
                                                    {s.projectServicesRequired.map(p => {
                                                        return (
                                                            <li>{p.serviceName}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="respondCardTable">
                                                <div>
                                                    <p>Industry</p>
                                                    <p>Food</p>
                                                </div>
                                                <div>
                                                    <p>Fixed Price</p>
                                                    <p>{s.projectProposalCost}</p>

                                                </div>
                                                <div>
                                                    <p>Timeline</p>
                                                    <p>45</p>
                                                </div>
                                            </div>
                                            <div className="respondedCardButton">
                                                <div>
                                                    {/* <button onClick={() => setIsdetail(true)}>Details</button> */}
                                                    <button onClick={() => props.history.push({
                                                        pathname: `agency-project-details:${s._id}`,
                                                        origin: 'responded'
                                                    })
                                                    }>Show details</button>
                                                </div>
                                                <div>
                                                    <button>Withdraw</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mainBackBtn">
                                                <div className="innerBackBtn">
                                                    <div onClick={() => setIsdetail(false)}>
                                                        <i className="fa fa-chevron-left" aria-hidden="true"></i>Back

                                                    </div>
                                                </div>
                                            </div>
                                            <RespondedDetails details={s} />
                                        </>
                                    )
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default withRouter(Responded)
