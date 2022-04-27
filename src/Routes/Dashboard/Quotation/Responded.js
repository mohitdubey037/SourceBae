import React, { useState, useEffect } from 'react';
import instance from '../../../Constants/axiosConstants';
import './Responded.css';
import RespondedDetails from './RespondedDetails';
import Moment from 'react-moment';
import Spinner from '../../../Components/Spinner/Spinner';
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';
import { withRouter } from 'react-router';
import { AGENCYROUTES } from '../../../Navigation/CONSTANTS';

function Responded(props) {
    const agencyId = localStorage.getItem('userId');
    const Role = localStorage.getItem('role');
    const [err, setErr] = useState();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllReceivedData = () => {
        setLoading(true);
        instance
            .get(
                `/api/${Role}/projects/all?agencyId=${agencyId}&projectResponded=1`
            )
            .then((response) => {
                setLoading(false);
                setProjects(response.projects);
            })
            .catch((err) => {
                setLoading(false);
                setErr(err?.response?.data?.message);
            });
    };

    useEffect(() => {
        getAllReceivedData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isDetail, setIsdetail] = useState(false);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="mainResponded">
                    <div className="innerResponded">
                        {err ? (
                            <>
                                <div className="page-not-found">
                                    <img
                                        height="300px"
                                        src={PageNotFound}
                                        alt="no_data_img"
                                    />
                                    <h6>{err}</h6>
                                </div>
                            </>
                        ) : (
                            projects.map((s) =>
                                !(
                                    s?.projectProposals[0]
                                        ?.rejectReasonByAgency ||
                                    s?.projectProposals[0]
                                        ?.rejectReasonByClient ||
                                    s?.projectCurrentStatus ===
                                    'Quotation Accepted'
                                ) ? (
                                    isDetail === false ? (
                                        <div className="respondedCard">
                                            <div className="leftBorder"></div>
                                            <div className="date_and_time">
                                                <div className="dateCreated">
                                                    <div>
                                                        <p style={{ color: '#000' }} >
                                                            <Moment
                                                                format="hh:mm A"
                                                                withTitle
                                                            >
                                                                {s.updatedAt}
                                                            </Moment>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="dateCreated">
                                                    <div>
                                                        <p style={{ color: '#000' }} >
                                                            <Moment
                                                                format="D MMM YYYY"
                                                                withTitle
                                                            >
                                                                {s.updatedAt}
                                                            </Moment>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="respondCardHeader">
                                                <div className="respondName">
                                                    <h4
                                                        style={{
                                                            textTransform:
                                                                'capitalize',
                                                            color: '#000'
                                                        }}
                                                    >
                                                        {s.projectName}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="respondCardDescription">
                                                <p
                                                    title={s.projectDescription}
                                                >{`${s.projectDescription.slice(
                                                    0,
                                                    80
                                                )}...`}</p>
                                            </div>
                                            <div className="respondCardPoints">
                                                <ul>
                                                    {s.projectServicesRequired.map(
                                                        (p) => {
                                                            return (
                                                                <li>
                                                                    {
                                                                        p.serviceName
                                                                    }
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="respondCardTable">
                                                <div>
                                                    <p>Industry</p>
                                                    <p>Food</p>
                                                </div>
                                                <div>
                                                    <p>Project Proposal Cost</p>
                                                    <p>
                                                        ${' '}
                                                        {s.projectProposalCost}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>Timeline</p>
                                                    <p>
                                                        {
                                                            s?.projectExpectedStartingDays
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>Status</p>
                                                    <p>
                                                        {s.projectCurrentStatus}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>Project Type</p>
                                                    <p>
                                                        {s.projectType}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="respondedCardButton">
                                                <div
                                                    className="showDetail_respondedCardButton"
                                                    onClick={() =>
                                                        props.history.push({
                                                            pathname: `${AGENCYROUTES.PROJECT_DETAILS}/${s._id}`,
                                                            origin: 'received'
                                                        })
                                                    }
                                                >
                                                    <p>Show Details</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mainBackBtn">
                                                <div className="innerBackBtn">
                                                    <div
                                                        onClick={() =>
                                                            setIsdetail(false)
                                                        }
                                                    >
                                                        <i
                                                            className="fa fa-chevron-left"
                                                            aria-hidden="true"
                                                        ></i>
                                                        Back
                                                    </div>
                                                </div>
                                            </div>
                                            <RespondedDetails details={s} />
                                        </>
                                    )
                                ) : null
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default withRouter(Responded);
