/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {Link} from "react-router-dom"
import "./mainhomepage.css";
import waves from '../../assets/images/LandingPage/Vector.svg'
import dotsleft from '../../assets/images/LandingPage/dotsleft.png'
import dotsright from '../../assets/images/LandingPage/dotsright.svg'
import logo from '../../assets/images/Logo/logo.png'
import { Button } from "@material-ui/core";
import colors from "../../Constants/colors";
import clientlogin from '../../assets/images/LandingPage/clientlogin.svg'
import agencylogin from '../../assets/images/LandingPage/agencylogin.svg'

const loginButtonStyle = {
    background : colors.PRIMARY_COLOR,
    position : 'absolute',
    bottom : 0,
    left : 0,
    width : '100%',
    borderBottomLeftRadius : '18px',
    borderBottomRightRadius : '18px',
    color : colors.WHITE,
    fontFamily : 'Poppins',
    fontSize : '1.14rem'
}

// images link
// import secondIllustration from '../../assests/images/LandingPage/secondSlideImage.svg'
// import logo2 from "../../assests/images/LandingPage/logo-crop.png";
// import illustration from "../../assests/images/LandingPage/ill3.png";
// import main_dots from "../../assests/images/LandingPage/main_dots.png";
// import work2 from "../../assests/images/LandingPage/work2.png";
// import work4 from "../../assests/images/LandingPage/work4.png";
// import work from "../../assests/images/LandingPage/work.png";
// import work3 from "../../assests/images/LandingPage/work3.png";
// import work5 from "../../assests/images/LandingPage/work5.png";


// import e_commerce from "../../assests/images/LandingPage/ecom.gif";
// import erp from "../../assests/images/LandingPage/erp.gif";
// import e_learning from "../../assests/images/LandingPage/Edtech.gif";
// import food from "../../assests/images/LandingPage/foodtech.gif";
// import projectMgmt from "../../assests/images/LandingPage/ProjectManagementTool.gif";
// import travel from "../../assests/images/LandingPage/travel.gif";
// import crypto from "../../assests/images/LandingPage/crypto.gif";

// import entertainment from "../../assests/images/LandingPage/entertainment.gif";
// import chatbots from "../../assests/images/LandingPage/Chatbots.gif"
// import healthcare from "../../assests/images/LandingPage/healthcare.gif";
// import logistics from "../../assests/images/LandingPage/Logistics.gif";
// import fintech from "../../assests/images/LandingPage/fintech.gif";
// import ripple from "../../assests/images/LandingPage/ripple.gif";
// import layer from "../../assests/images/LandingPage/layer.svg";
// import dollar from "../../assests/images/LandingPage/dollar.svg";
// import documents from "../../assests/images/LandingPage/documents.svg";
// import svg4 from "../../assests/images/LandingPage/svg4.svg";
// import svg5 from "../../assests/images/LandingPage/svg5.svg";
// import svg6 from "../../assests/images/LandingPage/svg6.svg";
// import hangouts from "../../assests/images/LandingPage/hangouts.png";
// import hangouts_middle from "../../assests/images/LandingPage/hangouts_middle.png";
// import samadhan from "../../assests/images/LandingPage/samadhan.png";
// import mernPlus from "../../assests/images/LandingPage/mp.png";
// import tealBox from "../../assests/images/LandingPage/tealBox.jpg";
// import clients from "../../assests/images/LandingPage/clients.gif";
// import faq from "../../assests/images/LandingPage/faq.png";
// import { Link } from "react-router-dom";
// import { LaptopWindows } from "@material-ui/icons";
// import twitter from "../assests/img/twitter.png";
// import facebook from "../assests/img/facebook.png";
// import linkedin from "../assests/img/linkedin.png";

const Mainhomepage = () => {

    return (
        <div className = 'wrapper'>
            <div className = 'waves__wrapper'>
                <img src={waves} alt="" className = 'wave' />
            </div>

            <div className="dots__leftWrapper">
                <img src = {dotsleft} alt="" style = {{ zIndex : 2 , width : '120%' }}/>
            </div>

            <div className="dots__rightWrapper">
                <img src = {dotsright} alt="" style = {{ zIndex : 2 , width : '105%' }}/>
            </div>

            <nav className = 'logo_container'>
                <img src = {logo} alt="" className = 'logo__image' />
            </nav>

            <div className="main__wrapper">

                <div className="details">
                    <div className="details__wrapper">

                        <div className="title"><h3>Trust us with your <br/>Project</h3></div>
                        <div className="subtext"><p>Lorem ipsum dolor sit amet consectetur adipisicing. <br/> Lorem, ipsum dolor.</p></div>

                        <div className="button__area">
                            <Button style = {{ background : colors.PRIMARY_COLOR , color : colors.WHITE , fontSize : '1.2rem' }}>Get started</Button>
                        </div>

                    </div>
                </div>

                <div className="card__area">
                    <div className="card__innerWrapper">

                        <div className="login__card">
                            <div className="img__area">
                                <img src = {clientlogin} alt="" />
                            </div>
                            <h3>Login as a client</h3>
                            <Link to ="/login:client">
                                <Button style = {loginButtonStyle}>Login</Button>
                            </Link>
                        </div>

                        <div className="login__card">
                            <div className="img__area">
                                <img src = {agencylogin} alt="" />
                            </div>
                            <h3>Login as an agency</h3>
                            <Link to ="/login:agency">
                             <Button style = {loginButtonStyle}>Login</Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mainhomepage