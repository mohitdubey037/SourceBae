import React from 'react'
import './signup.css'
import bgimage from '../../assets/images/SignUp/containerimage.svg'
import logotext from '../../assets/images/SignUp/logotext.svg'
import Polygon from '../../assets/images/SignUp/polygon.svg'
import user from '../../assets/images/SignUp/user.svg'
import userinpolygon from '../../assets/images/SignUp/userInPolygon.png'
import briefcaseInPolygon from '../../assets/images/SignUp/briefcaseInPolygon.png'
import { Link } from 'react-router-dom'
import colors from '../../Constants/colors'

const Signup = () => {
    return (
        <div className = 'signup__wrapper'>
            <div className="image__container">
                {/* <img src = {bgimage} alt="" className = 'background__image'/> */}
                <img src = {logotext} alt="" />
            </div>

            <div style = {{ flex : .37 }}>
            </div>

            <div style = {{ flex : .63 }} className = 'select__area'>

                <div className="select__registrationMode">

                    <div className="signup__title">
                        <h3>Sign Up!</h3>
                        <div className="signup__subtext">
                            <p>Lorem ipsum dolor sit amet consectetur.</p>  
                            <p>Lorem, ipsum dolor.</p>
                        </div>
                    </div>
                    
                    <div className="register__cards">
                        <Link to = '/register:client' className = 'signup__link' style = {{ marginBottom : '4%' }}>
                            <div className="signup__methodCard">
                                <div className="method__visual">
                                    <img src = {userinpolygon} alt="" className = 'signup__polygon' />
                                </div>
                                <div className="role">
                                    <p style = {{ fontSize : '1.5rem' }}>Client</p>
                                    <p style = {{ fontSize : '.85rem' , color : '#777' }}>Want to hire an agency for your work</p>
                                </div>
                                <div className="proceed__icon">
                                    <i className="fas fa-long-arrow-alt-right" style = {{ color : '#1565D8' , fontSize : '1.4rem' , transform : 'scaleX(1.1)' }}></i>
                                </div>
                            </div>
                        </Link>

                        <Link to = '/register:agency' class = 'signup__link'>
                            <div className="signup__methodCard">
                                <div className="method__visual">
                                    <img src = {briefcaseInPolygon} alt="" className = 'signup__polygon' />
                                </div>
                                <div className="role">
                                    <p style = {{ fontSize : '1.5rem' }}>Agency</p>
                                    <p style = {{ fontSize : '.85rem' , color : '#777' }}>Want to work remotely</p>
                                </div>
                                <div className="proceed__icon">
                                    <i class="fas fa-long-arrow-alt-right" style = {{ color : '#1565D8' , fontSize : '1.4rem' , transform : 'scaleX(1.1)' }}></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="existing_accountText">
                    <p>Already have an account?</p> <Link to = '/' style = {{ textDecoration : 'none' }}>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
