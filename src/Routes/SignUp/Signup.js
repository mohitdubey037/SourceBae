import React from 'react'
import './signup.css'
import bgimage from '../../assets/images/SignUp/containerimage.svg'
import logotext from '../../assets/images/SignUp/logotext.svg'
import Polygon from '../../assets/images/SignUp/polygon.svg'
import user from '../../assets/images/SignUp/user.svg'
import userinpolygon from '../../assets/images/SignUp/userInPolygon.png'
import briefcaseInPolygon from '../../assets/images/SignUp/briefcaseInPolygon.png'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className = 'signup__wrapper'>
            <div className="image__container">
                <img src = {bgimage} alt="" className = 'background__image'/>
                <img src = {logotext} alt="" style = {{ position : 'absolute' , left : '50%' , top : '50%' , transform : 'translate(-50% , -50%)'}}/>
            </div>

            <div className="select__area">
                <div className="existing_accountText">
                    <p>Already have an account?</p> <Link to = '/' style = {{ textDecoration : 'none' }}>Sign In</Link>
                </div>

                <div className="signup__title"><h3>Sign Up!</h3></div>
                <div className="signup__subtext">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <p>Lorem, ipsum dolor.</p>
                </div>

                <div className="signup__methodCard">
                    <div className="method__visual">
                        <img src = {userinpolygon} alt="" className = 'signup__polygon' />
                        {/* <i className = 'fa fa-user' ></i> */}
                        {/* <img
                        src = {user} 
                        alt=""
                        style = {{ position : 'absolute' , background : 'red'}}
                        // style = {{ color : 'red' }}
                        /> */}
                    </div>
                    <div className="role">
                        <p>Client</p>
                        <p>Want to hire an agency for your work</p>
                    </div>
                    <div className="proceed__icon">
                        <i class="fas fa-long-arrow-alt-right" style = {{ color : '#1565D8' , fontSize : '1.4rem' , transform : 'scaleX(1.1)' }}></i>
                    </div>
                </div>

                <div className="signup__methodCard">
                    <div className="method__visual">
                        <img src = {briefcaseInPolygon} alt="" className = 'signup__polygon' />
                        {/* <i className = 'fa fa-user' ></i> */}
                        {/* <img
                        src = {user} 
                        alt=""
                        style = {{ position : 'absolute' , background : 'red'}}
                        // style = {{ color : 'red' }}
                        /> */}
                    </div>
                    <div className="role">
                        <p>Agency</p>
                        <p>Want to work remotely</p>
                    </div>
                    <div className="proceed__icon">
                        <i class="fas fa-long-arrow-alt-right" style = {{ color : '#1565D8' , fontSize : '1.4rem' , transform : 'scaleX(1.1)' }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
