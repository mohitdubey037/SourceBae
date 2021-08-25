/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../Dashboard/dashboard.css";
import "../Login/login.css";
import * as helper from "../../shared/helper";
import { useParams } from "react-router";
import instance from "../../Constants/axiosConstants";
import loginImage from '../../assets/images/Newestdashboard/Login/LoginBlue.png'
import axios from "axios";
import PersonIcon from '@material-ui/icons/Person';

import google from "../../assets/images/Logo/google.png";
import {
    Typography,
    InputAdornment,
    Input,
    Grid,
    Switch,
    makeStyles,
    withStyles,
    FormGroup,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import Spinner from "../../Components/Spinner/Spinner";
import cookie from "react-cookies";

const borderLight = "rgba(206,212,218, .993)";

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 80,
        height: 32,
        padding: 0,
        // display: 'flex',
        borderColor: "#fff",
    },
    switchBase: {
        padding: 2,
        // color: "#02044a",
        top: -2,
        left: -2,
        color: '#4786FE',
        "&$checked": {
            transform: "translateX(39px)",
            // color: "#7CB9E8",
            color: '#4786FE',
            "& + $track": {
                opacity: 0.82,
                backgroundColor: "white",
            },
            border: "1px solid #EBF5FB",
        },
    },
    thumb: {
        width: 39,
        height: 32,
        boxShadow: "none",
        borderRadius: '46%'
    },
    track: {
        // border: `1px solid #02044a`,
        borderRadius: 78 / 2,
        opacity: 1,
        backgroundColor: "white",
        opacity: 0.82,
        border: '4px solid #BDD4FF',
    },
    checked: {},
}))(Switch);

const useStyles = makeStyles((theme) => ({
    inputs: {
        position: "relative",
        fontFamily: "Cutive Mono, monospace",
        // color: textDark,
        fontSize: "17px",
        padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
        paddingLeft: '1rem',
        borderRadius: "8px",
        border: "1.4px solid",
        boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
        borderColor: borderLight,
        width: '75%',
        marginBottom: '2rem'
    },
    passwordEye: {
        color: "rgba(131,153,167,0.9)",
        opacity: 0.9,
    },
    root: {
        "& .MuiSvgIcon-root": {
            fontSize: '2.5rem'
        },
    }

}));

const Login = (props) => {
    const classes = useStyles();
    let { role } = useParams();
    console.log(role);
    role = helper.capitalize(helper.cleanParam(role));
    if (!(role.toLowerCase() === "agency" || role.toLowerCase() === "client"))
        props.history.push("/page-not-found");

    const [loading, setLoading] = useState(false);
    const [state, setState] = React.useState({
        checked: JSON.parse(localStorage.getItem("toggle")) || false,
    });
    console.log(state.checked);
    const [hidePassword, SetPasswordStatus] = useState(true);
    const [form, setForm] = useState({
        user: "",
        password: "",
    });

    const [token, setToken] = useState(null);

    useEffect(() => {
        localStorage.setItem("toggle", state.checked);
        state.checked === false
            ? props.history.push("/login:agency")
            : props.history.push("/login:client");
    }, [state]);

    const showPassword = (e) => {
        console.log(e);
        SetPasswordStatus((prevCheck) => !prevCheck);
    };

    const handleChangeToggle = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    //Methods

    const createRoleString = () => {
        role = role.charAt(0).toUpperCase() + role.slice(1);
        // if (state.checked === false) {
        //     console.log('agency chala');
        //     return `an ${role}`;
        // }
        // if (state.checked === true) {
        //     console.log('client chala')
        //     return `a ${role}`;
        // }
        return role
    };

    const roleString = createRoleString();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const logIn = async (role, form) => {
        // setLoading(true);
        let apiRole = helper.lowerize(role);
        return new Promise((resolve, reject) => {
            instance
                .post(`/api/${apiRole}/auths/login`, form)
                .then(function (response) {
                    console.log(response, "response");
                    cookie.save(
                        "Authorization",
                        `Bearer ${response.accessToken}`,
                        { path: '/' }
                    );
                    setToken(cookie.load("Authorization"))
                    localStorage.setItem("role", role);
                    localStorage.setItem("userId", `${response._id}`);
                })
                .catch((err) => {
                    setLoading(false);
                });
        });
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `${token}`;
            console.log(axios)
            if (role === "Agency") {
                setLoading(false);
                props.history.push("/agencyNewestDashboard");
                // window.location.href = '/dashboard'
            } else if (role === "Client") {
                setLoading(false);
                props.history.push("/clientNewestDashboard");
            }

            else {
                console.log(localStorage.getItem('Authorization', token))
            }
        }

    }, [token]);

    useEffect(() => {
        const tempRole = localStorage.getItem('role')
        const auth = cookie.load("Authorization")
        if (auth !== null && auth !== undefined && tempRole !== null && tempRole !== undefined) {
            if (tempRole.toLowerCase() === "agency") {
                props.history.push("/agencyNewestDashboard");
            }
            else if (tempRole.toLowerCase() === "client") {
                props.history.push("/clientNewestDashboard")
            }
            // else{
            //     console.log('ye chala');
            //     props.history.push("/login:client")
            // }
        }
        // else{
        //     props.history.push(`/login:${role.toLowerCase()}`)
        // }
    }, [])
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="mainLoginPage">
                    <div className="innerLoginPage">
                        <div className="loginIllustrator">
                            <img src={loginImage} alt="" />
                            <div className="welcome-back_loginIllustrator">
                                <p>Welcome back<br></br><span>to</span><br></br><span className="welcome-back_sourceBae">Sourcebae</span></p>
                            </div>

                            <div className="www_loginIllustrator">
                                <div className="white-color_loginIllustrator"></div>
                                <a style={{ color: 'blue' }}>www.sourceBae.com</a>
                            </div>
                        </div>
                        <div className="loginContent">
                            <div className="mainLoginForm">
                                <div className="mainLoginForm_child">
                                    <div>
                                        <h4>SourceBae</h4>
                                    </div>
                                    <div className="toggleButton login">
                                        <FormGroup>
                                            <Typography component="div">
                                                <Grid
                                                    component="label"
                                                    container
                                                    alignItems="center"
                                                    spacing={1}
                                                >
                                                    <Grid item style={{ fontWeight: "lighter", fontSize: 22 }}>
                                                        Agency
                                                    </Grid>
                                                    <Grid item>
                                                        <AntSwitch
                                                            checked={state.checked}
                                                            onChange={handleChangeToggle}
                                                            name="checked"
                                                        />
                                                    </Grid>
                                                    <Grid item style={{ fontWeight: "lighter", fontSize: 22 }}>
                                                        Client
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="loginHeading">
                                    <h6>

                                        Login as {
                                            state.checked === false ?
                                                `an ${<span>{roleString} </span>}`
                                                :
                                                `a ${<span> {roleString} </span>}`
                                        }
                                    </h6>
                                </div>

                                <div className="loginForm">
                                    {/* <p style={{ marginBottom: "10px" }}>Email</p> */}
                                    <Input
                                        className={classes.inputs}
                                        placeholder="Enter an email"
                                        variant="outlined"
                                        type="email"
                                        // margin="normal"
                                        disableUnderline={true}
                                        required
                                        fullWidth
                                        name="user"
                                        autoComplete="userEmail"
                                        autoFocus
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PersonIcon fontSize="large" />
                                            </InputAdornment>
                                        }
                                    />
                                    {/* <p style={{ marginTop: "20px", marginBottom: "10px" }}>
                                        Password
                                    </p> */}
                                    <Input
                                        placeholder="Enter a password"
                                        className={classes.inputs}
                                        variant="outlined"
                                        // margin="normal"
                                        type={hidePassword ? "password" : "text"}
                                        required
                                        fullWidth
                                        disableUnderline={true}
                                        name="password"
                                        autoComplete="password"
                                        autoFocus
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        startAdornment={
                                            hidePassword ? (
                                                <InputAdornment position="start">
                                                    <VisibilityOffTwoToneIcon
                                                        fontSize="large"
                                                        className={classes.passwordEye}
                                                        onClick={showPassword}
                                                    />
                                                </InputAdornment>
                                            ) : (
                                                <InputAdornment position="start">
                                                    <VisibilityTwoToneIcon
                                                        fontSize="large"
                                                        className={classes.passwordEye}
                                                        onClick={showPassword}
                                                    />
                                                </InputAdornment>
                                            )
                                        }
                                    />
                                    <div className="button_action_login">
                                        <div className="submit_login" onClick={() => logIn(role, form)} type="submit">
                                            <div className="blur_submit_login">

                                            </div>
                                            <p>
                                                Login
                                            </p>
                                        </div>
                                        <div className="forgot-password_login" onClick={() => props.history.push('/enter-email')}>
                                            <p>
                                                Forgot Password
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="or_login">
                                <p>Or</p>
                            </div>
                            <div className="signup_toggle">
                                <div className="googleLogin">
                                    <img src={google} alt="" />
                                    <p>Sign in with Google</p>
                                </div>
                                <div className="signUpOption">
                                    <p>
                                        Don't have an account?{" "}
                                        <span onClick={() => props.history.push(`/register:${role.toLowerCase()}`)}>
                                            Sign Up
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Login;
