import React, { useState } from 'react'
import './Responded.css'
import RespondedDetails from './RespondedDetails';

function Responded() {

    const [isDetail, setIsdetail] = useState(false);
    const arr = [1, 2, 3, 4]

    return (
        <>
            <div className="mainResponded">
                <div className="innerResponded">
                    {
                        isDetail == false ? (
                            arr.map(() => {
                                return (
                                    <div className="respondedCard">
                                        <div className="bgCircle"></div>
                                        <div className="leftBorder"></div>
                                        <div className="respondCardHeader">
                                            <div className="respondName">
                                                <h4>Rahul Jaykar</h4>
                                            </div>
                                            <div className="dateCreated">
                                                <div>
                                                    <p>05 Mar 2021</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="respondCardDescription">
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum sunt dolore ipsam qui quia doloribus, unde possimus reprehenderit! Doloribus, dolore.</p>
                                        </div>
                                        <div className="respondCardPoints">
                                            <ul>
                                                <li>Mobile Development</li>
                                                <li>Cloud-Server Management</li>
                                                <li>Testing & QA</li>
                                            </ul>
                                        </div>
                                        <div className="respondCardTable">
                                            <div>
                                                <p>Industry</p>
                                                <p>Food</p>
                                            </div>
                                            <div>
                                                <p>Fixed Price</p>
                                                <p>Min $5,000</p>
                                            </div>
                                            <div>
                                                <p>Timeline</p>
                                                <p>45</p>
                                            </div>
                                        </div>
                                        <div className="respondedCardButton">
                                            <div>
                                                <button onClick={() => setIsdetail(true)}>Details</button>
                                            </div>
                                            <div>
                                                <button>Withdraw</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                                <>
                                    <div className="mainBackBtn">
                                        <div className="innerBackBtn">
                                            <div onClick={() => setIsdetail(false)}>
                                                <i class="fa fa-chevron-left" aria-hidden="true"></i>Back

                                            </div>
                                        </div>
                                    </div>

                                    <RespondedDetails />
                                </>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default Responded
