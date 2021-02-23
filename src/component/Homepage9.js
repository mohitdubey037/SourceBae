import React from 'react';
import { NavLink } from 'react-router-dom';

import leftImage from '../assests/Images/onlyphoto.png';
import './homepage59r.css';

const Homepage9 = () => {
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
                        <div className="right-content">
                            <h1>Register as Agency </h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                            <form>
                                <div className="inputArea">
                                    <label className="labels" for="fname" name="fname">Name</label><br />
                                    <input type="text" placeholder="Jonny Holland"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="email">Email</label><br />
                                    <input type="email" name="email" placeholder="xyz@mail.com"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="phone" name="phone">Mobile No.</label><br />
                                    <input type="tel" placeholder="9876556765" pattern="[0-9]{10}"></input><br />
                                </div>

                                <div className="btn-position-hp9">
                                    <NavLink className="button-class" to="/next_page">
                                        <div className="button-text"><a>Next</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right"></i></div>
                                    </NavLink>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage9;