import React from 'react'
import './RespondedDetails.css'

import foods from '../../../assets/images/Quotation/foods.png'

function RespondedDetails() {

    const arr = [
        {
            title: 'Food'
        },
        {
            title: 'Meal Subscription'
        },
        {
            title: 'Online Orderdering'
        },
        {
            title: 'Menu & Reviews'
        },
    ]

    return (
        <>
            <div className="mainDetailHeader">
                <div className="innerDetailHeader">
                    <div className="detailHeaderImage">
                        <div>
                            <img src={foods} alt="" />
                        </div>
                    </div>
                    <div className="headerInformation">
                        <div className="clientName">
                            <div>
                                <h2>Rahul Jayker</h2>
                            </div>
                            <div className="detailsButtons">
                                <button>Accept</button>
                                <button>Withdraw</button>
                            </div>
                        </div>
                        <div className="clientExperience">
                            {
                                arr.map((value, index) => {
                                    return (
                                        <div className="btnInfoDiv">
                                            <div className="rightBorder"></div>
                                            <div className="innerBtnInfoDiv" style={{ marginLeft: index == 0 ? '0' : '20px' }}>
                                                <p style={{ backgroundColor: index == 0 ? '#02044a' : 'transparent', padding: index == 0 ? '0.2rem 1rem' : 0, borderRadius: '999px', color: index == 0 ? '#fff' : '#02044a' }}>{value?.title}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="respondDescription">
                <h2>About Your Project</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae dolore officia id expedita rem deleniti labore molestiae sed voluptas, libero quae, sit, quibusdam laboriosam! Pariatur reiciendis consequatur, vel beatae nisi magni maxime inventore, accusamus commodi ipsum dignissimos odio hic officiis.</p>
            </div>
        </>
    )
}

export default RespondedDetails
