import React, { useState } from 'react'
import ClientNavbar from '../../Client/ClientNavbar'
import './ProductDetails.css'

import logo from '../../../assets/images/Logo/logo.png'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Moment from 'react-moment';

function ProductDetails(props) {

    console.log(props)
    const details = [props.location.state];

    const detailsInJson = props.location.state;
    console.log(details);


    const brr =
                [
                    {
                        heading: 'Product Stage',
                        content: [
                            {
                                ans: detailsInJson.productCurrentStatus
                            }
                        ]
                    },
                    {
                        heading: 'Customers Accquired',
                        content: [
                            {
                                ans: detailsInJson.productCustomerAccquired
                            }
                        ]
                    },
                    {
                        heading: 'Active Users',
                        content: [
                            {
                                ans: ''
                            }
                        ]
                    },
                    {
                        heading: 'Feature Link',
                        content: [
                            {
                                ans: detailsInJson.productFeatureLink
                            }
                        ]
                    },
                    {
                        heading: 'Platform Link',
                        content: [
                            {
                                ans: detailsInJson.productPlatformLink
                            }
                        ]
                    },
                ]


    const arr =
        [
            {
                heading: 'Product Name',
                content: [
                    {
                        ans: detailsInJson.productName
                    }
                ]
            },
            {
                heading: 'Headquarter',
                content: [
                    {
                        ans: detailsInJson.productCompanyLocation
                    }
                ]
            },
            {
                heading: 'Business Model',
                content: [
                    {
                        ans: detailsInJson.productBusinessModel
                    }
                ]
            },
            {
                heading: 'Business Product',
                content: [
                    {
                        ans: detailsInJson.productDomain.domainName
                    }
                ]
            },
            {
                heading: 'Founding Date',
                content: [
                    {
                        ans: <Moment format="D MMM YYYY" withTitle>{detailsInJson.createdAt}</Moment>
                    }
                ]
            },
            {
                heading: 'Team Size',
                content: [
                    {
                        ans: detailsInJson.productTeamSize
                    }
                ]
            },
            {
                heading: 'Founders',
                content: [
                    {
                        ans: detailsInJson.productFounderLinkedinProfiles
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
            {details.map((value, index) => {
                return (
                    <div className="mainProductDetails">
                        <div className="innerProductDetails">
                            <div className="productDetailsArea">
                                <div className="productDetailsHeader">
                                    <div className="productDetailsImage">
                                        <img src={logo} alt="" />
                                    </div>
                                    <div className="peoductNameTags">
                                        <h1>{value.agencyId.agencyName}</h1>
                                        <span>View Profile</span>
                                        <p>{value.agencyId.agencyDescription}</p>
                                        <div className="productTags">
                                            {value.agencyId.agencyDomains.map(a => {
                                                return (
                                                    <p> <i class="fa fa-tag" aria-hidden="true"></i>{a.domainId.domainName}</p>
                                                )
                                            })}

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
                                                    <img src={value.productLogo} alt="" />
                                                </div>
                                            </div>
                                            <div className="productDescPara">
                                                <p>{value.productDescription}</p>
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
                )
            })}


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
