import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";

import ClientNavbar from '../../Client/ClientNavbar'
import './ProductDetails.css'
import * as helper from "../../../shared/helper";
import logo from '../../../assets/images/Logo/logo.png'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Moment from 'react-moment';
import instance from '../../../Constants/axiosConstants';

function ProductDetails(props) {
    let { productId } = useParams();
    productId = productId ? helper.cleanParam(productId) : "";

    // let productId = _id;
    const Role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId')
    // let details = [props.location.state];
    const [details, setDetails] = useState()
    const [detailsInJson, setDetailsInJson] = useState({})

    const getProduct = () => {
        instance.get(`/api/${Role}/products/get/${productId}`)
            .then(response => {
                setDetails([response.product]);
                setDetailsInJson(response.product)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getProduct()
    }, [productId])

    useEffect(() => {
        console.log(details);
        console.log(detailsInJson);
        console.log(detailsInJson.length)
    },[details, detailsInJson])

    const brr =
        [
            {
                heading: 'Product Stage',
                content: [
                    {
                        ans: detailsInJson && detailsInJson?.productCurrentStatus
                    }
                ]
            },
            {
                heading: 'Customers Accquired',
                content: [
                    {
                        ans: detailsInJson?.productCustomerAccquired
                    }
                ]
            },
            {
                heading: 'Active Users',
                content: [
                    {
                        ans: detailsInJson?.productActiveUsers
                    }
                ]
            },
            {
                heading: 'Feature Link',
                content: [
                    {
                        ans: detailsInJson?.productFeatureLink
                    }
                ]
            },
            {
                heading: 'Platform Link',
                content: [
                    {
                        ans: detailsInJson?.productPlatformLink
                    }
                ]
            },
        ]

        console.log(brr);


    const arr =
        [
            {
                heading: 'Product Name',
                content: [
                    {
                        ans: detailsInJson?.productName
                    }
                ]
            },
            {
                heading: 'Headquarter',
                content: [
                    {
                        ans: detailsInJson?.productCompanyLocation
                    }
                ]
            },
            {
                heading: 'Business Model',
                content: [
                    {
                        ans: detailsInJson?.productBusinessModel
                    }
                ]
            },
            {
                heading: 'Business Product',
                content: [
                    {
                        ans: detailsInJson?.productDomain !== undefined ? detailsInJson?.productDomain?.domainName : null
                    }
                ]
            },
            {
                heading: 'Founding Date',
                content: [
                    {
                        ans: <Moment format="D MMM YYYY" withTitle>{detailsInJson?.createdAt}</Moment>
                    }
                ]
            },
            {
                heading: 'Team Size',
                content: [
                    {
                        ans: detailsInJson?.productTeamSize
                    }
                ]
            },
            {
                heading: 'Founders',
                content: [
                    {
                        ans: detailsInJson?.productFounderLinkedinProfiles
                    }
                ]
            },

        ]

    const crr = [1, 2, 3, 4];
    const [open, setOpen] = useState(false);
    const [modalForm, setModalForm] = useState({});

    const formHandler = (event) => {
        const { name, value } = event.target
        setModalForm({
            ...modalForm,
            [name]: value
        })
    }

    const dummyForm = {
        userId,
        productId
    }

    const postSubmitHandler = () => {
        instance.post(`/api/${Role}/investments/create`, dummyForm)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            <ClientNavbar />
            {details !== undefined && details?.map((value, index) => {
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
                    <p onChange={formHandler} name='founderName' className="toText">To : Founder at SheThink</p>

                    <div className="productModalInput">
                        <p>Subject</p>
                        <input onChange={formHandler} name="subject" type="text" placeholder="Enter your subject" />
                    </div>
                    <div className="productModalInput">
                        <p>Message</p>
                        <textarea onChange={formHandler} name="message" cols="30" rows="6" type="text" placeholder="Enter your message here" />
                    </div>
                    <div className="productModalInput">
                        <p>Email ID</p>
                        <input onChange={formHandler} name='emailId' type="text" placeholder="Enter your email" />
                    </div>
                    <div className="productModalInput">
                        <p>Linkedin URL</p>
                        <input onChange={formHandler} name="linkedInUrl" type="text" placeholder="Enter your url" />
                    </div>
                </div>
                <div className="connectedButton">
                    <p onClick={postSubmitHandler}>Get connected to the Company <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></p>
                </div>
            </Modal>
        </>
    )
}

export default ProductDetails
