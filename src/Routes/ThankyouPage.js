import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leftImage from '../assests/Images/onlyphoto.png';
import thankyou from '../assests/thankyou.gif';
import './homepage59r.css';

const ThankyouPage = () => {
    return (
        <>
            <div className="main-container">
                <div className="inner-container">
                    <div className="left-inner-container">
                        <div className="circle-1"></div>
                        <div className="circle-2"></div>
                        <div className="circle-3"></div>
                        <div className="circle-4"></div>
                        <div className="photo">
                            <img src={leftImage} alt="photo" />
                        </div>
                    </div>
                    <div className="right-inner-container">
                        <div className="right-content thank-you-content">
                            <i class="fas fa-star fa-2x star1"></i>
                            <i class="fas fa-star fa-3x star2"></i>
                            <i class="fas fa-star fa-3x star3"></i>
                            <i class="fas fa-star star4"></i>
                            <div className="thankyou-text">
                                <h1>Thank You</h1>
                                <h1>For Registration</h1>
                                <div className="thankyou_Image">
                                    <img src={thankyou} className="thankyou_gif" />
                                </div>
                                {/* <i class="fas fa-check-circle fa-7x tick"></i> */}
                                <p>Need help right now?</p>
                                <p>Use the chat window below to talk to an expert developer.</p>
                            </div>
                            <div className="btn-position-agency-client-description thanku-btn">
                                <button className="button-class">
                                    <div className="button-text"><a href="/">Continue</a></div>
                                    <div className="button-icon"><i class="fas fa-long-arrow-alt-right"></i></div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ThankyouPage;