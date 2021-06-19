import React, { useState, useEffect } from 'react';
import instance from '../../../Constants/axiosConstants';
import Spinner from '../../../Components/Spinner/Spinner';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';



function Received() {
    const routerHistory = useHistory();
    const agencyId = localStorage.getItem('userId');
    const Role = localStorage.getItem('role');
    console.log(Role);

    const [projects, setProjects] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllReceivedData = () => {
        setLoading(true)
        instance.get(`/api/${Role}/projects/all?agencyId=${agencyId}&projectCurrentStatus=Quotation received`)
            .then(response => {
                setLoading(false);
                console.log(response);
                setProjects(response.projects);
                setStatuses(response.statuses);
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }

    useEffect(() => {
        getAllReceivedData()
    }, [])

    useEffect(() => {
        console.log(projects)
    }, [projects])



    return (
        <>
            {loading ? <Spinner /> :

                <div className="mainResponded">
                    <div className="innerResponded">
                        {
                            projects.map((s) => {
                                return (
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
                                            <p>{s.projectDescription}</p>
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
                                            </div>
                                            <div>
                                                <button>Withdraw</button>
                                                <button onClick={() => {routerHistory.push(`agency-project-details:${s._id}`)}}>Show details</button>
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
    )
}

export default Received
