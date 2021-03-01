import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './homepage59r.css';
import leftImage from '../assests/Images/onlyphoto.png';
import RequirementSelectbtn from './RequirementSelectbtn';


const RequirementExtended = () => {

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
                        <div className="right-content right-content-description">
                            <form className="form-description">
                                <div className="inputArea">
                                    <label className="labels" for="projectstage" name="projectstage">Project Stage</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="joiningtime" name="joiningtime">Joining Time</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="typeofhire" name="typeofhire">Type Of Hire</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="contract" name="contract">Contract</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>


                                <div className="btn-position-requirement">
                                    <NavLink className="button-class" to="/client">
                                        <div className="button-text"><a>Previous</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right previous-icon"></i></div>
                                    </NavLink>
                                    <NavLink className="button-class" to="/">
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

export default RequirementExtended;

