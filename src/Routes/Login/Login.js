import React, { useState } from 'react'
import '../Dashboard/dashboard.css'

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
                    localStorage.setItem('Authorization', response.accessToken)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`
                    resolve(1)
                    window.location.replace("/dashboard")
                })
        })
    }

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
                                <button className='btn' onClick={()=>logIn(role,form)}>Log In</button>
                            </div>

                    </div>


                </div>
            </div>

        </>
    )
}

export default Login