import React, { useState } from 'react';
import leftImage from '../assests/Images/onlyphoto.png';
import './homepage59r.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginDetails = async (e) => {
        e.preventDefault();
        const agencytoken = await localStorage.getItem("agencytoken");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", `Bearer ${agencytoken}`)

        var raw = JSON.stringify({ "email": email, "password": password });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.onesourcing.in/users/login", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result)
                result.status == true ? toast.success("Completed") : toast.error("Try Again")
            })
            .catch(error => console.log('error', error));

    }

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
                            <h1>Login Here </h1>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p> */}
                            <form>
                                <div className="inputArea">
                                    <label className="labels" for="email">Email</label><br />
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="xyz@mail.com"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="password" name="password">Password</label><br />
                                    <input onChange={(e) => setPassword(e.target.value)} type="password"  ></input><br />
                                </div>

                                <div className="btn-position-agency-client-description">
                                    <button className="button-class" onClick={loginDetails}>
                                        <div className="button-text"><a>Login</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right"></i></div>
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;