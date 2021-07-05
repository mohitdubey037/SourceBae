/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './ProjectsMatched.css';
import instance from '../../../Constants/axiosConstants';
import Moment from 'react-moment';
import NO_Data_ICON from '../no_data_icon.jpg';
import dot1 from '../../../assets/images/Quotation/dot1.png'
import shape from '../../../assets/images/Quotation/shape.png'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Spinner from '../../../Components/Spinner/Spinner';
import {withRouter} from 'react-router';


function ProjectesMatched(props) {
    const agencyId = localStorage.getItem('userId');
    const Role = localStorage.getItem('role');
    const [err, setErr] = useState();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllReceivedData = () => {
        setLoading(true)
        instance.get(`/api/${Role}/projects/all?AgencyId=${agencyId}&projectMatched=1`)
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
                                <div style={{ textAlign: 'center', width: '100%' }}>
                                    <img height="300px" src={NO_Data_ICON} alt="no_data_img" />
                                    <h6>{err}</h6>
                                </div>
                            </>
                            :
                        projects?.map((s, index) => {
                            return (
                                <div className="innerProjectsMatched">
                                    <div className="projectNumber"><p>{index <= 9 ? `0${index}` : index}</p></div>
                                    <div className="borderRightBorder"></div>
                                    <img src={dot1} className="dotImage" alt="" />
                                    <img src={shape} className="shapeImage" alt="" />
                                    <div className="bgCircles"></div>
                                    <div className="projectCard">
                                        <div className="projectCardHeading">
                                            <div className="projectHeadingName">
                                                <h4>{s?.projectName}</h4>

                                            </div>
                                            <div className="projectHeadingButton">
                                                <div className="showInterestBtn">
                                                    {/* <button onClick={onOpenModal}>Show Interest</button> */}
                                                    <button onClick={() => props.history.push({
                                                        pathname: `agency-project-details:${s?._id}`,
                                                        origin : 'project-match'
                                                    })}>Show Details</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="projectPostedDetails">
                                            <div>
                                                <p><Moment format="D MMM YYYY" withTitle>{s?.updatedAt}</Moment></p>
                                            </div>
                                            <div>
                                                <p>Matched on 24 Mar 2020</p>
                                            </div>
                                        </div>

                                        <div className="projectDetailsTable">
                                            <div>
                                                <div className="projectTableHeading" >
                                                    <p>Industry</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    <p>{s?.projectDomainId?.domainName}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="projectTableHeading" >
                                                    <p>Fixed Budget</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    <p>{s?.projectProposalCost}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="projectTableHeading" >
                                                    <p>Expert Categories</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    {s?.projectExpertiseRequired?.map(expertise => <p style={{marginRight: '10px'}}>{expertise?.expertiseName}</p>)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="projectTableHeading" >
                                                    <p>Services</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    {s?.projectServicesRequired?.map(p => {
                                                        return (
                                                            <p style={{marginRight: '10px'}}>{p?.serviceName}</p>
                                                        )
                                                    })}
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
