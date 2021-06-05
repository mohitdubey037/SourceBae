import React from 'react'
import './RespondedDetails.css'

import foods from '../../../assets/images/Quotation/foods.png'
import leftQuote from '../../../assets/images/Quotation/leftQuote.png'
import rightQuote from '../../../assets/images/Quotation/rightQuote.png'
import agencyLogo from '../../../assets/images/Quotation/cegelec.svg'

function RespondedDetails(props) {
    console.log(props);

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

    const briefQuestions = [
        {
            question: 'What stage of the project are you in now?',
            answer: 'I have detailed requirements in mind that I can provide'
        },
        {
            question: 'Can you name some similar applications or business competitors for reference?',
            answer: 'zomato'
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
                                <h2></h2>
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
                <p>{props.projectDescription}</p>
            </div>


            <div className="respondCards">
                <div className="innerResponseCard">
                    <span className="leftLine"></span>
                    <div>
                        <p>Expected Timeline</p>
                        <p>45days</p>
                    </div>
                    <div>
                        <p>Budget</p>
                        <p style={{ fontWeight: '600' }}>Min $5000</p>
                    </div>
                    <div>
                        <p>Agency Experience</p>
                        <p>1 year</p>
                    </div>
                    <div>
                        <p>Documents</p>
                        <p>-</p>
                    </div>
                </div>
                <div className="innerResponseCard">
                    <span className="leftLine"></span>
                    <div>
                        <p>Mobile Development</p>
                        <p>React Native</p>
                    </div>
                    <div>
                        <p>Cloud-Server Management</p>
                        <p>Google Cloud</p>
                    </div>
                    <div>
                        <p>Testing and Q&A</p>
                        <p>Testing Done</p>
                    </div>
                    <div>
                        <p>Note</p>
                        <p>-</p>
                    </div>
                </div>
            </div>


            <div className="briefDetails">
                <img src={leftQuote} className="leftQuote" alt="" />
                <img src={rightQuote} className="rightQuote" alt="" />
                <div className="innerBriefDetails">
                    <div className="briefHeading">
                        <h2>Brief Details</h2>
                        <div>
                            <p>Set on 04 Apr 2021</p>
                        </div>
                    </div>
                    <div className="briefQuestions">
                        {
                            briefQuestions.map((value) => {
                                return (
                                    <div>
                                        <h4>{value?.question}</h4>
                                        <p>{value?.answer}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="agencyQuotation">
                <div className="innerAgencyQuotation">
                    <div className="quotationleftLine"></div>
                    <div className="agencyQuotationHeader">
                        <div className="agencyQuotationHeading">
                            <h2>Quotation Details</h2>
                        </div>
                        <div className="agencyLogo">
                            <img src={agencyLogo} alt="" />
                        </div>
                    </div>

                    <div className="agencyQuotationDesc">
                        <h4>Agency Comment</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta natus reprehenderit consequatur architecto voluptatibus voluptatum dolores dolore. Cum, eveniet aperiam?</p>
                    </div>

                    <div className="agencyQuestions">
                        <div>
                            <h4>Fixed Budget</h4>
                            <ul>
                                <li>Min $5000</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Estimated Timeline</h4>
                            <ul>
                                <li>45days</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Technology</h4>
                            <ul>
                                {props?.projectTechnologiesRequired?.map(p => {
                                    return <li>{p?.technologyName}</li>
                                })}
                            </ul>
                        </div>
                        <div>
                            <h4>{props?.projectFiles}</h4>
                            <p>-</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RespondedDetails
