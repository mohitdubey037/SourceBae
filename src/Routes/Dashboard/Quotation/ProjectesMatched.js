/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import './ProjectsMatched.css';
import instance from '../../../Constants/axiosConstants';
import Moment from 'react-moment';

import dot1 from '../../../assets/images/Quotation/dot1.png'
import shape from '../../../assets/images/Quotation/shape.png'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Spinner from '../../../Components/Spinner/Spinner';
import { useHistory } from 'react-router-dom';


// const arr = [
//     {
//         title: 'Industry',
//         content: 'Food'
//     },
//     {
//         title: 'Fixed budget',
//         content: '$5, 000 - $10, 000'
//     },
//     {
//         title: 'Expert Categories',
//         content: 'Self-Checkout, Meal Subscriptions, Online Food Ordering, Food Delivery Tracking, Coupons & Loyalty, Menu & Reviews'
//     },
//     {
//         title: 'Services',
//         content: 'Web Development, UI/ UX Design, CMS Development, Database Development, Testing & QA, Cloud - Server Management'
//     },

// ]

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

function ProjectesMatched() {
    const agencyId = localStorage.getItem('userId');
    const routerHistory = useHistory();
    const Role = localStorage.getItem('role');
    console.log(Role);

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllReceivedData = () => {
        setLoading(true)
        instance.get(`/api/${Role}/projects/all?AgencyId=${agencyId}&projectMatched=true`)
            .then(response => {
                setLoading(false);
                console.log(response);
                setProjects(response.projects);
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

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            {loading ? <Spinner /> :
                <div className="mainProjectsMatched">
                    {
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
                                                <h4>{s.projectName}</h4>

                                            </div>
                                            <div className="projectHeadingButton">
                                                <div className="showInterestBtn">
                                                    {/* <button onClick={onOpenModal}>Show Interest</button> */}
                                                    <button onClick={() => {routerHistory.push(`agency-project-details:${s._id}`)}}>Show Details</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="projectPostedDetails">
                                            <div>
                                                <p><Moment format="D MMM YYYY" withTitle>{s.updatedAt}</Moment></p>
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
                                                    <p>mohit</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="projectTableHeading" >
                                                    <p>Fixed Budget</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    <p>{s.projectProposalCost}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="projectTableHeading" >
                                                    <p>Expert Categories</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    <p>mohit</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="projectTableHeading" >
                                                    <p>Services</p>
                                                </div>
                                                <div className="projectTableContent">
                                                    {s.projectServicesRequired.map(p => {
                                                        return (
                                                            <p>{p.serviceName}</p>
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

export default ProjectesMatched
