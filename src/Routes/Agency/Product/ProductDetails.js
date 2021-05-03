import React, { useState } from 'react'
import ClientNavbar from '../../Client/ClientNavbar'
import './ProductDetails.css'

import logo from '../../../assets/images/Logo/logo.png'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


function ProductDetails() {

    const brr = [
        {
            heading: 'Product Stage',
            content: [
                {
                    ans: 'Running in Market'
                }
            ]
        },
        {
            heading: 'Customers Accquired',
            content: [
                {
                    ans: '300 customers'
                }
            ]
        },
        {
            heading: 'Active Users',
            content: [
                {
                    ans: '100 users'
                }
            ]
        },
        {
            heading: 'Feature Link',
            content: [
                {
                    ans: 'https://www.facebook.com/'
                }
            ]
        },
        {
            heading: 'Platform Link',
            content: [
                {
                    ans: 'https://www.google.com/'
                }
            ]
        },
    ]

    const arr = [
        {
            heading: 'Product Name',
            content: [
                {
                    ans: 'Swiggy'
                }
            ]
        },
        {
            heading: 'Headquarter',
            content: [
                {
                    ans: 'Bangalore, Karnataka, India'
                }
            ]
        },
        {
            heading: 'Business Model',
            content: [
                {
                    ans: 'B2B , B2C'
                }
            ]
        },
        {
            heading: 'Business Product',
            content: [
                {
                    ans: 'Healthcare'
                }
            ]
        },
        {
            heading: 'Founding Date',
            content: [
                {
                    ans: 'Aug 2012'
                }
            ]
        },
        {
            heading: 'Team Size',
            content: [
                {
                    ans: 'More than 100'
                }
            ]
        },
        {
            heading: 'Founders',
            content: [
                {
                    ans: 'https://www.linkedin.com/in/mohd-zaid-19951518b/'
                },
                {
                    ans: 'https://www.linkedin.com/in/mohd-zaid-19951518b/'
                }
            ]
        },

    ]

    const crr = [1, 2, 3, 4];
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            <ClientNavbar />

            <div className="mainProductDetails">
                <div className="innerProductDetails">
                    <div className="productDetailsArea">
                        <div className="productDetailsHeader">
                            <div className="productDetailsImage">
                                <img src={logo} alt="" />
                            </div>
                            <div className="peoductNameTags">
                                <h1>Agency Name</h1>
                                <span>View Profile</span>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita nobis fuga consequuntur facere deleniti architecto! Maxime ducimus velit placeat aut!</p>
                                <div className="productTags">
                                    <p> <i class="fa fa-tag" aria-hidden="true"></i>E-commerce</p>
                                    <p><i class="fa fa-tag" aria-hidden="true"></i>Healthcare</p>
                                </div>
                            </div>
                        </div>
                        <div className="connectButton">
                            <div></div>
                            <div onClick={onOpenModal}>
                                <p>Connect <i class="fa fa-long-arrow-right" aria-hidden="true"></i></p>
                            </div>
                        </div>


                        <div className="productDetailsDiv">
                            <div className="headerInformation">
                                <h3>Product Information</h3>
                                <div className="productDesc">
                                    <div className="productDescImage">
                                        <div>
                                            <img src={logo} alt="" />
                                        </div>
                                    </div>
                                    <div className="productDescPara">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore vitae amet inventore quidem quo nobis. Facilis labore et, culpa corrupti quo officiis iusto voluptas totam id, similique fuga accusantium dolorem. Lorem ipsum,</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="allPoints">

                            {
                                arr.map((value, index) => {
                                    return (
                                        <div className="allPointsCard">
                                            <div className="allPointCardHeading">
                                                <p>{value?.heading}</p>
                                                <div className="barricade">
                                                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div className="allPointsCardContent">

                                                {
                                                    value?.content.map((val) => {
                                                        return (
                                                            <>
                                                                {
                                                                    value?.heading == 'Founders' ?
                                                                        <><a target="_blank" href={val?.ans}>{val?.ans}</a> <br /> <br /> </>
                                                                        :
                                                                        <p>{val?.ans}</p>
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>


                        <div className="productFunding">
                            <div>
                                <h3>Funding</h3>
                            </div>
                            <div className="innerProductFunding">
                                <div className="totalRevenue">
                                    <span className="middleLine"></span>
                                    <div>
                                        <span>Total Revenue</span>
                                        <p>₹100k</p>
                                    </div>
                                </div>
                                <div className="totalFunding">
                                    <span className="middleLine"></span>
                                    <div>
                                        <span>Total Funding</span>
                                        <p>₹5000k</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="workingStatus">
                            <div className="workingStatusHeading">
                                <h3>Product Status</h3>
                            </div>
                            <div className="workingStatusInfo">
                                {
                                    brr.map((value, index) => {
                                        return (
                                            <div className="allPointsCard">
                                                <div className="allPointCardHeading">
                                                    <p>{value?.heading}</p>
                                                    <div className="barricade">
                                                        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                                <div className="allPointsCardContent">

                                                    {
                                                        value?.content.map((val) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        value?.heading == 'Feature Link' || value?.heading == 'Platform Link' ?
                                                                            <><a target="_blank" href={val?.ans}>{val?.ans}</a> <br /> <br /> </>
                                                                            :
                                                                            <p>{val?.ans}</p>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className="moreAgencies">
                        <div className="innerMoreAgencies">
                            <div className="moreAgencyHeading">
                                <h3>Similar Agencies</h3>
                            </div>
                            <div className="moreAgencyList">
                                {
                                    crr.map(() => {
                                        return (
                                            <div className="moreAgencyCard">
                                                <div className="moreAgencyLogo">
                                                    <div>
                                                        <img src={logo} alt="" />
                                                    </div>
                                                </div>
                                                <div className="moreAgencyInfo">
                                                    <h6>Farhme India</h6>
                                                    <p>Lorem ipsum dolor sit amet. Lorem, ipsum.</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="moreAgencySeeMore">
                                <p>See More</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={onCloseModal} classNames={{
                overlay: 'customOverlayAgencyProduct',
                modal: 'customModalAgencyProduct',
            }} center>
                <div className="modalHeaderProduct">
                    <h2>Get Connected</h2>
                </div>
                <div className="productModalForm">
                    <p className="toText">To : Founder at SheThink</p>

                    <div className="productModalInput">
                        <p>Subject</p>
                        <input type="text" placeholder="Enter your subject" />
                    </div>
                    <div className="productModalInput">
                        <p>Message</p>
                        <textarea cols="30" rows="6" type="text" placeholder="Enter your message here" />
                    </div>
                    <div className="productModalInput">
                        <p>Email ID</p>
                        <input type="text" placeholder="Enter your email" />
                    </div>
                    <div className="productModalInput">
                        <p>Linkedin URL</p>
                        <input type="text" placeholder="Enter your url" />
                    </div>
                </div>
                <div className="connectedButton">
                    <p>Get connected to the Company <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></p>
                </div>
            </Modal>
        </>
    )
}

export default ProductDetails
