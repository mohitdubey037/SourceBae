import React, { useEffect, useState } from 'react'
import '../Dashboard/dashboard.css'

import styled from "styled-components"
import colors from "../../Constants/colors"
import Navbar from '../Dashboard/Navbar'
// Axios Import
import axios from 'axios'
import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"
import "../Login/login.css"

import google from '../../assets/images/Logo/google.png'
import loginImage from '../../assets/images/Logo/loginImage.png'

import { useParams } from 'react-router'
import id from 'date-fns/esm/locale/id/index.js'


import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom'



const AntSwitch = withStyles((theme) => ({
    root: {
        width: 78,
        height: 26,
        padding: 0,
        // display: 'flex',
        borderColor: '#fff',
    },
    switchBase: {
        padding: 2,
        color: '#02044a',
        '&$checked': {
            transform: 'translateX(52px)',
            color: '#7CB9E8',
            '& + $track': {
                opacity: 1,
                backgroundColor: '#02044a',
                borderColor: '#EBF5FB',
            },
            boder: '1px solid #EBF5FB'
        },
    },
    thumb: {
        width: 22,
        height: 22,
        boxShadow: 'none',
    },
    track: {
        // border: `1px solid #02044a`,
        borderRadius: 78 / 2,
        opacity: 1,
        backgroundColor: '#7CB9E8',
    },
    checked: {},
}))(Switch);

const Login = () => {
    const routerHistory = useHistory();
    const [state, setState] = React.useState({
        checked: JSON.parse(localStorage.getItem("toggle")) || false
    });
    const [flag, setFlag] = useState(false);

    React.useEffect(() => {
        console.log("first", state.checked)
        localStorage.setItem('toggle', state.checked);
        console.log("state", state.checked)

        state.checked == false ? routerHistory.push('/login:agency') : routerHistory.push('/login:client');

    }, [state]);

    const handleChangeToggle = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
        console.log("statechecked", state.checked)
    };

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
                    console.log(response, "response")
                    localStorage.removeItem('Authorization')
                    localStorage.setItem('Authorization', `Bearer ${response.accessToken}`)
                    localStorage.setItem('userId', `${response._id}`)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`
                    resolve(1)

                    if (role === "Agency")
                        window.location.replace("/dashboard")

                    else if (role === "Client")
                        window.location.replace("/client-dashboard")

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


            {/* <div className="mainClientsOptions">
                <div className="innerClientsOptions">
                    <div className="client__form">
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '10%' }}>
                            <div className="form__title"><h6>Login as <span> {roleString} </span></h6></div>
                            <div className="title__subtext"><p>For the purpose of industry regulation, your details <br /> are required</p></div>
                        </div>

                        <h4>Welcome Back!</h4>
                        <div className='form-group row'>
                            <input
                                className='input'
                                type='text'
                                placeholder='Email'
                                name="user"
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
                            <LoginButton onClick={() => logIn(role, form)}>Log In</LoginButton>
                        </div>

                    </div>


                </div>
            </div> */}

            <div className="mainLoginPage">
                <div className="innerLoginPage">
                    <div className="loginIllustrator">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="loginContent">
                        <div className="mainLoginForm">
                            <div className="toggleButton">
                                <FormGroup>
                                    {/* <FormControlLabel
                                    control={<IOSSwitch checked={state.checkedB} onChange={handleChangeToggle} name="checkedB" />}
                                    label="iOS style"
                                /> */}
                                    <Typography component="div">
                                        <Grid component="label" container alignItems="center" spacing={1}>
                                            <Grid item style={{ fontWeight: 'lighter', fontSize: 22 }} >Agency</Grid>
                                            <Grid item>
                                                <AntSwitch checked={state.checked} onChange={handleChangeToggle} name="checked" />
                                            </Grid>
                                            <Grid item style={{ fontWeight: 'lighter', fontSize: 22 }}>Client</Grid>
                                        </Grid>
                                    </Typography>
                                </FormGroup>
                            </div>
                            <div className="loginHeading">
                                <h6>Login as <span> {roleString} </span></h6>
                            </div>
                            <div className="signUpOption">
                                <p>Don't have an account? <span>Sign Up</span></p>
                            </div>
                            <div className="loginForm">
                                <div className="emailLogin">
                                    <p>Email</p>
                                    <input name="user"
                                        value={form.user}
                                        onChange={(e) => { handleChange(e) }} type="text" placeholder="Type your email here.." />
                                </div>
                                <div className="passwordLogin">
                                    <p>Password</p>
                                    <input name="password"
                                        value={form.password}
                                        onChange={(e) => { handleChange(e) }} type="password" placeholder="Type your password here.." />
                                </div>

                                <button onClick={() => logIn(role, form)} type="submit">Login</button>
                                <span>I forgot my password</span>
                            </div>
                        </div>

                        <div className="googleLogin">
                            <img src={google} alt="" />
                            <p>Sign in with Google</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )


}

export default Login