import React from 'react'
import './ProjectsMatched.css'

import dot1 from '../../../assets/images/Quotation/dot1.png'
import shape from '../../../assets/images/Quotation/shape.png'

function ProjectesMatched() {

    const arr = [
        {
            title: 'Industry',
            content: 'Food'
        },
        {
            title: 'Fixed budget',
            content: '$5, 000 - $10, 000'
        },
        {
            title: 'Expert Categories',
            content: 'Self-Checkout, Meal Subscriptions, Online Food Ordering, Food Delivery Tracking, Coupons & Loyalty, Menu & Reviews'
        },
        {
            title: 'Services',
            content: 'Web Development, UI/ UX Design, CMS Development, Database Development, Testing & QA, Cloud - Server Management'
        },

    ]

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return (
        <>
            <div className="mainProjectsMatched">
                {
                    cards.map((index) => {
                        console.log(index)
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
                                            <h2>Food Delivery</h2>
                                        </div>
                                        <div className="projectHeadingButton">
                                            <div className="showInterestBtn">
                                                <button>Show Interest</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="projectPostedDetails">
                                        <div>
                                            <p>Posted on 24 Mar 2020</p>
                                        </div>
                                        <div>
                                            <p>Matched on 24 Mar 2020</p>
                                        </div>
                                    </div>

                                    <div className="projectDetailsTable">
                                        {
                                            arr.map((value) => {
                                                return (
                                                    <div>
                                                        <div className="projectTableHeading" >
                                                            <p>{value?.title}</p>
                                                        </div>
                                                        <div className="projectTableContent">
                                                            <p>{value?.content}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ProjectesMatched
