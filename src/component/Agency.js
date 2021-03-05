import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import leftImage from '../assests/Images/onlyphoto.png';
import './homepage59r.css';

const Agency = () => {
    const history = useHistory();
    const Id = "6038ecf6b796345b9c82bfbb";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    const verifyingAgency = (e) => {
        e.preventDefault();  //page refresh na ho
        // toast.error('danger')
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "name": name, "phone": number, "email": email, "password": password, "role": Id });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("http://13.235.79.27:8000/users/register", requestOptions)
            .then(response => response.json())
            .then((result) => (
                console.log(result),
                result.status == true ? (
                    toast.success("Successfully Created"),
                    localStorage.setItem("agencytoken", result?.token),
                    setTimeout(() => {
                        history.push('/description')
                    }, 1500)
                ) : toast.error("Something went Wrong")
            )
            )
            .catch(error => console.log('error', error));

    };
    const loginAgency = (e) => {
        e.preventDefault();  //page refresh na ho
        // toast.error('danger')
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "name": name, "phone": number, "email": email, "password": password, "role": Id });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("http://13.235.79.27:8000/users/register", requestOptions)
            .then(response => response.json())
            .then((result) => (
                console.log(result),
                result.status == true ? (
                    toast.success("Successfully Created"),
                    localStorage.setItem("agencytoken", result?.token),
                    setTimeout(() => {
                        history.push('/login')
                    }, 1500)
                ) : toast.error("Something went Wrong")
            )
            )
            .catch(error => console.log('error', error));

    };

    return (
        <>
            {/* <ToastContainer /> */}
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
                                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Jonny Holland"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="email">Email</label><br />
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="xyz@mail.com"></input>
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="phone" name="phone">Mobile No.</label><br />
                                    <input maxLength={10} onChange={(e) => setNumber(e.target.value)} type="tel" placeholder="9876556765" pattern="[0-9]{10}"></input><br />
                                </div>
                                <div className="inputArea">
                                    <label className="labels" for="password" name="passward">Password</label><br />
                                    <input onChange={(e) => setPassword(e.target.value)} type="password"  ></input><br />
                                </div>

                                <div className="btn-position-agency-client-description">
                                    <button className="button-class" onClick={loginAgency}>
                                        <div className="button-text"><a href="/login">Login</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right previous-icon"></i></div>
                                    </button>
                                    <button className="button-class" onClick={verifyingAgency}>
                                        <div className="button-text"><a href="/description">Next</a></div>
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

export default Agency;