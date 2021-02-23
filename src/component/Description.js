import React from 'react';
import { NavLink } from 'react-router-dom';
import './homepage59r.css';
import leftImage from '../assests/Images/onlyphoto.png';
import DescriptionSelectbtn from './DescriptionSelectbtn';


const Description = () => {
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
                            {/* <h1>Register as Client </h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p> */}
                            <form className="form-description">
                                <div className="inputArea">
                                    <label className="labels" for="Description" name="Description">Company Description</label><br />
                                    {/* <input type="text" placeholder="describe..." className="input-description"></input><br /> */}
                                    <textarea class="input-description" placeholder="describe..."></textarea>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="Team" name="Team">Team</label><br />
                                    <DescriptionSelectbtn />
                                    {/* <input type="text" placeholder="Jonny Holland"></input><br /> */}
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="email">Location</label><br />
                                    <input type="text" placeholder="Select"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="phone" name="phone">Experience in industry</label><br />
                                    <input type="text" placeholder="Select"></input><br />
                                </div>

                                <div className="btn-position-hp9">
                                    <NavLink className="button-class" to="/requirement">
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

export default Description;