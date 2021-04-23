import React, { useState } from 'react'
import '../Dashboard/dashboard.css'

import styled from "styled-components"
import colors from "../../Constants/colors"
import Navbar from '../Dashboard/Navbar'
// Axios Import
import axios from 'axios'
import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"
import "../Login/login.css"


import { useParams } from 'react-router'

const Login = () => {



    let { role } = useParams();
    role = helper.capitalize(helper.cleanParam(role))

    //#######################//

    const [form, setForm] = useState({
        user: "",
        password: ""
    })

    //Methods

    const createRoleString = (role) => {

        role = role.charAt(0).toUpperCase() + role.slice(1)
        if (role === 'Agency')
            return `an ${role}`
        else
            return `a ${role}`
    }
    const roleString = createRoleString(role)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    };

    const logIn = async (role, form) => {

        let apiRole = helper.lowerize(role)
        return new Promise((resolve, reject) => {

            instance.post(`/api/${apiRole}/auths/login`, form)
                .then(function (response) {
                    console.log(response,"response")
                    localStorage.removeItem('Authorization')
                    localStorage.setItem('Authorization', `Bearer ${response.accessToken}`)
                    localStorage.setItem('userId', `${response._id}`)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`
                    resolve(1)
                    window.location.replace("/dashboard")
                })
        })
    }

    const LoginButton = styled.button`
    background: ${colors.PRIMARY_COLOR2};
    margin: 10px 5px;
    padding: 5px 5px;
    border-radius:4px;
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
        <>
            {/* Navbar  */}
            <Navbar headingInfo="Login" />

            <div className="mainClientsOptions">
                <div className="innerClientsOptions">
                    <div className="client__form">
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '10%' }}>
                            <div className="form__title"><h6>Login as {roleString}</h6></div>
                            <div className="title__subtext"><p>For the purpose of industry regulation, your details <br /> are required</p></div>
                        </div>

                            <h4>Welcome Back!</h4>
                            <div className='form-group row'>
                                <input 
                                    className='input' 
                                    type='text' 
                                    placeholder='Email' 
                                    name= "user"
                                    value={form.user} 
                                    onChange={(e) => { handleChange(e) }} 
                                />
                            </div>

                            <div className='form-group row'>
                                <input 
                                    className='input' 
                                    type='password' 
                                    placeholder='Password' 
                                    name="password"
                                    value={form.password} 
                                    onChange={(e) => { handleChange(e) }} 
                                />
                            </div>

                            <div className='form-group row'>
                                <LoginButton onClick={()=>logIn(role,form)}>Log In</LoginButton>
                            </div>

                    </div>


                </div>
            </div>

        </>
    )

    
}

export default Login