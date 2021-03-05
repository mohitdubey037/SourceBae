import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import leftImage from '../assests/Images/onlyphoto.png';
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './homepage59r.css';

const Client = () => {
    const history = useHistory();
    const Id = "6038ecf6b796345b9c82bfbb";
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');

    const verifyingClient = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "name": name, "phone": number, "email": email, "password": password, "role": Id });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://13.235.79.27:8000/users/register", requestOptions)
            .then(response => response.json())
            .then(result => (console.log(result),
                result.status == true ? (
                    toast.success("Successfully Created"),
                    localStorage.setItem("clienttoken", result?.token),
                    setTimeout(() => {
                        history.push('/requirement')
                    }, 1500)
                ) : toast.error("Something went Wrong")
            )
            )
            .catch(error => console.log('error', error));

    };

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
                            <h1>Register as Client </h1>
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
                                    <button className="button-class" to="/client">
                                        <div className="button-text"><a href="/login">Login</a></div>
                                        <div className="button-icon"><i class="fas fa-long-arrow-alt-right previous-icon"></i></div>
                                    </button>
                                    <button onClick={verifyingClient} className="button-class">
                                        <div className="button-text"><a>Next</a></div>
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

export default Client;