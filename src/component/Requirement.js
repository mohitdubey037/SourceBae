import React from 'react';
import { NavLink } from 'react-router-dom';
import './homepage59r.css';
import leftImage from '../assests/Images/onlyphoto.png';
import RequirementSelectbtn from './RequirementSelectbtn';



const Requirement = () => {
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
                            <h1>Your Requirement </h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                            <form>
                                <div className="inputArea">
                                    <label className="labels" for="Skills" name="Skills">Skills</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="Experience">Experience</label><br />
                                    <RequirementSelectbtn />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="Budget" name="Budget">Budget per resource</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>

                                <div className="btn-position">
                                    <NavLink className="button-class" to="/next_page">
                                        <div className="button-text"><a>Previous</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right previous-icon"></i></div>
                                    </NavLink>
                                    <NavLink className="button-class" to="/description">
                                        <div className="button-text"><a>Next</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right next-icon"></i></div>
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

export default Requirement;

