/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom"
import "./mainhomepage.css";
import waves from '../../assets/images/LandingPage/Vector.svg'
import dotsleft from '../../assets/images/LandingPage/dotsleft.png'
import dotsright from '../../assets/images/LandingPage/dotsright.svg'
import logo from '../../assets/images/Logo/logo.png'
import { Button } from "@material-ui/core";
import colors from "../../Constants/colors";
import clientlogin from '../../assets/images/LandingPage/clientlogin.svg'
import agencylogin from '../../assets/images/LandingPage/agencylogin.svg'
import styled from 'styled-components';


const Mainhomepage = () => {

    //Styled Components
    const AgencyButton = styled.button`
    background: ${colors.PRIMARY_COLOR2};
    padding: 5px 0px;
    position: absolute;
    bottom: 20px;
    left: 0px;
    width: 100%;
    border: 0;
    // borderTopRightRadius: '0px',
    color: ${colors.WHITE};
    font-family: 'Poppins';
    font-size: 1.14rem;
    &:hover {
      color: #ffffff;
      background: #f6b93b;
      border-color: #f6b93b;
      transition: all 0.4s ease 0s;
    }
  `;

    const ClientButton = styled.button`
    background: ${colors.PRIMARY_COLOR};
    padding: 5px 0px;
    position: absolute;
    bottom: -12px;
    left: 0px;
    width: 100%;
    border: 0;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    color: ${colors.WHITE};
    font-family: 'Poppins';
    font-size: 1.14rem;
    &:hover {
      color: #ffffff;
      background: #f6b93b;
      border-color: #f6b93b;
      transition: all 0.4s ease 0s;
    }
    `;

    return (
        <div className='wrapper'>
            <div className='waves__wrapper'>
                <img src={waves} alt="" className='wave' />
            </div>

            <div className="dots__leftWrapper">
                <img src={dotsleft} alt="" style={{ zIndex: 2, width: '85%' }} />
            </div>

            <div className="dots__rightWrapper">
                <img src={dotsright} alt="" style={{ zIndex: 2, width: '105%' }} />
            </div>

            <nav className='logo_container'>
                <img src={logo} alt="" className='logo__image' />
            </nav>

            <div className="main__wrapper">

                <div className="details">
                    <div className="details__wrapper">

                        <div className="title"><h3>Trust us with your <br />Project</h3></div>
                        <div className="subtext"><p>Lorem ipsum dolor sit amet consectetur adipisicing. <br /> Lorem, ipsum dolor.</p></div>

                        <div className="button__area">
                            <Button style={{ background: colors.PRIMARY_COLOR, color: colors.WHITE, fontSize: '1.2rem' }} onClick = {()=>window.location.href="/client-dashboard"}>Get started</Button>
                        </div>

                    </div>
                </div>

                <div className="card__area">
                    <div className="card__innerWrapper">

                        <div className="login__card">
                            <div className="img__area">
                                <img src={clientlogin} height = "130" width="200" alt="" />
                            </div>
                            <h3>Login</h3>
                            <Link to="/login:client">
                                <ClientButton>Client</ClientButton>
                            </Link>
                            <Link to="/login:agency">
                                <AgencyButton>Agency</AgencyButton>
                            </Link>
                        </div>

                        <div className="login__card">
                            <div className="img__area">
                                <img src={agencylogin} height = "130px" width="200px" alt="" />
                            </div>
                            <h3>SignUp</h3>
                            <Link to="/register:client">
                                <ClientButton>Client</ClientButton>
                            </Link>
                            <Link to="/register:agency">
                                <AgencyButton>Agency</AgencyButton>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mainhomepage