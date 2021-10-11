import React, { useState, useEffect } from 'react';
import instance from '../../../Constants/axiosConstants';
import Spinner from '../../../Components/Spinner/Spinner';
import Moment from 'react-moment';
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg'
import { withRouter } from 'react-router';
import './Received.css'

function Received(props) {
    const agencyId = localStorage.getItem('userId');
    const Role = localStorage.getItem('role');

    const [projects, setProjects] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState();

    const getAllReceivedData = () => {
        setLoading(true)
        instance.get(`/api/${Role}/projects/all?agencyId=${agencyId}&quotationReceived=1`)
            .then(response => {
                setLoading(false);
                setProjects(response.projects);
                setStatuses(response.statuses);
            })
            .catch(err => {
                setLoading(false)
                setErr(err?.response?.data?.message)
            })

    }

    useEffect(() => {
        getAllReceivedData()
    }, [])


    return (
        <>
            {loading ? <Spinner /> :

                <div className="mainResponded">
                    <div className="innerResponded">
                        {err ?
                            <>
                                <div className="page-not-found">
                                    <img height="300px" src={PageNotFound} alt="no_data_img" />
                                    <h6>{err}</h6>
                                </div>
                            </>
                            :
                            projects.map((s) => {
                                return (
                                    <div className="respondedCard">
                                        <div className="leftBorder"></div>
                                        <div className="date_and_time">
                                            <div className="dateCreated">
                                                <div>
                                                    <p><Moment format="HH:MM A" withTitle>{s.updatedAt}</Moment></p>
                                                </div>
                                            </div>
                                            <div className="dateCreated">
                                                <div>
                                                    <p><Moment format="D MMM YYYY" withTitle>{s.updatedAt}</Moment></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="respondCardHeader">
                                            <div className="respondName">
                                                <h4 style={{ textTransform: 'capitalize' }}>{s.projectName}</h4>
                                            </div>
                                        </div>
                                        <div className="respondCardDescription">
                                            <p title={s.projectDescription}>{`${(s.projectDescription).slice(0, 40)}...`}</p>
                                        </div>
                                        <div className="respondCardPoints">
                                            <ul>
                                                {s.projectServicesRequired.map(p => {
                                                    return (
                                                        <>
                                                            <li>{p.serviceName}</li>
                                                        </>
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
                                            <div className="showDetail_receivedCardButton" onClick={() => props.history.push({
                                                pathname: `agency-project-details:${s._id}`,
                                                origin: 'received'
                                            })}>
                                                <p>
                                                    Show details
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })


                        }
                    </div>
                </div>
            }
        </>
    );
}

export default withRouter(Received)
