/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './ProjectsMatched.css';
import instance from '../../../Constants/axiosConstants';
import Moment from 'react-moment';
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Spinner from '../../../Components/Spinner/Spinner';
import { withRouter } from 'react-router';


function ProjectesMatched(props) {
    const agencyId = localStorage.getItem('userId');
    const Role = localStorage.getItem('role');
    const [err, setErr] = useState();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllReceivedData = () => {
        setLoading(true)
        instance.get(`/api/${Role}/projects/all?agencyId=${agencyId}&projectMatched=1`)
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

    const [open, setOpen] = useState(false);

    const onCloseModal = () => setOpen(false);

    return (
        <>
            {loading ? <Spinner /> :
                <div className="mainProjectsMatched">
                    {err ?
                        <>
                            <div className="page-not-found">
                                <img height="300px" src={PageNotFound} alt="no_data_img" />
                                <h6>{err}</h6>
                            </div>
                        </>
                        :
                        projects?.map((s, index) => {
                            return (
                                <div className="innerProjectsMatched">
                                    <div className="borderRightBorder"></div>
                                    <div className="projectCard">
                                        <div className="projectCardHeading">
                                            <div className="projectHeadingName">
                                                <h4 style={{ textTransform: 'capitalize', fontFamily: "Segoe UI" }}>{s.projectName}</h4>
                                            </div>
                                            <div className="projectHeadingButton">
                                                <div className="showInterestBtn">
                                                    <div className="showDetail_projectMatched" onClick={() => props.history.push({
                                                        pathname: `agency-project-details:${s?._id}`,
                                                        origin: 'project-match'
                                                    })}><p>Show Details</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="projectPostedDetails">
                                            <div>
                                                <p><Moment titleFormat="D MMM YYYY hh:mm a" format="D MMM YYYY" withTitle>{s?.createdAt}</Moment></p>
                                            </div>
                                            <div>
                                                <p>Project Matched at: <Moment titleFormat="D MMM YYYY hh:mm a" format="D MMM YYYY" withTitle>{s?.updatedAt}</Moment></p>
                                            </div>
                                        </div>

                                        <div className="projectDetailsTable">
                                            {s.projectType !== 'Short Term' &&
                                                <div className="projectDetailsTableContainer">
                                                    <div className="projectTableHeading" >
                                                        <p>Industry</p>
                                                    </div>
                                                    <div className="projectTableContent">
                                                        <p>{s?.projectDomainId?.domainName}</p>
                                                    </div>
                                                </div>
                                            }
                                            <div style={{padding: s.projectType === 'Short Term' && '1.23rem 0'}} className="projectDetailsTableContainer">
                                                <div className="projectTableHeading" >
                                                    <p>Fixed Budget</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    <p>$ {s?.projectProposalCost}</p>
                                                </div>
                                            </div>
                                            {s.projectType !== 'Short Term' &&
                                                <div className="projectDetailsTableContainer">
                                                    <div className="projectTableHeading" >
                                                        <p>Expert Categories</p>
                                                    </div>
                                                    <div className="projectTableContent">
                                                        {s?.projectExpertiseRequired?.map(expertise => <p style={{ marginRight: '10px' }}>{expertise?.expertiseName}</p>)}
                                                    </div>
                                                </div>
                                            }
                                            <div style={{padding: s.projectType === 'Short Term' && '1.23rem 0'}} className="projectDetailsTableContainer">
                                                <div className="projectTableHeading" >
                                                    <p>Services</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    {s?.projectServicesRequired?.map(p => {
                                                        return (
                                                            <p style={{ marginRight: '10px' }}>{p?.serviceName}</p>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div style={{padding: s.projectType === 'Short Term' && '1.23rem 0'}} className="projectDetailsTableContainer">
                                                <div className="projectTableHeading" >
                                                    <p>Project Type</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    <p style={{ color: "#45A4EA" }}>{s.projectType}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }



            <Modal open={open} onClose={onCloseModal} center classNames={{
                overlay: 'ShortListModalOverlay',
                modal: 'ShortListModal',
            }}>
                <div className="shortlistModal">
                    <h2>ShortList</h2>
                    <div className="shortlistForm">
                        <span>Comment Box</span>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Type from here..."></textarea>
                        <button>Submit</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default withRouter(ProjectesMatched)
