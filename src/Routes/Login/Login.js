/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../Dashboard/dashboard.css";
import "../Login/login.css";
import * as helper from "../../shared/helper";
import { useParams } from "react-router";
import instance from "../../Constants/axiosConstants";
import axios from "axios";

import google from "../../assets/images/Logo/google.png";
import loginImage from "../../assets/images/Logo/loginImage.png";
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
        width: 78,
        height: 26,
        padding: 0,
        // display: 'flex',
        borderColor: "#fff",
    },
    switchBase: {
        padding: 2,
        color: "#02044a",
        "&$checked": {
            transform: "translateX(52px)",
            color: "#7CB9E8",
            "& + $track": {
                opacity: 1,
                backgroundColor: "#02044a",
                borderColor: "#EBF5FB",
            },
            boder: "1px solid #EBF5FB",
        },
    },
    thumb: {
        width: 22,
        height: 22,
        boxShadow: "none",
    },
    track: {
        // border: `1px solid #02044a`,
        borderRadius: 78 / 2,
        opacity: 1,
        backgroundColor: "#7CB9E8",
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
        borderRadius: "8px",
        border: "1.4px solid",
        boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
        borderColor: borderLight,
    },
    passwordEye: {
        color: "rgba(131,153,167,0.9)",
        opacity: 0.9,
    },
}));

const Login = (props) => {
    const classes = useStyles();

    let { role } = useParams();
    role = helper.capitalize(helper.cleanParam(role));
    if (!(role.toLowerCase() === "agency" || role.toLowerCase() === "client"))
        props.history.push("/page-not-found");

    const [loading, setLoading] = useState(false);
    const [state, setState] = React.useState({
        checked: JSON.parse(localStorage.getItem("toggle")) || false,
    });
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

    const createRoleString = (role) => {
        role = role.charAt(0).toUpperCase() + role.slice(1);
        if (role === "Agency") return `an ${role}`;
        else return `a ${role}`;
    };

    const roleString = createRoleString(role);

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

    useEffect(()=>{

        const tempRole = localStorage.getItem('role')
        const auth =cookie.load("Authorization")
        if(auth!==null && auth!==undefined && tempRole!==null && tempRole!==undefined){
            if(tempRole.toLowerCase()==="agency")
            props.history.push("/dashboard")
            else if(tempRole.toLowerCase()==="client")
            props.history.push("agency")
            else{
                props.history.push("/login:agency")
            }
        }
        else{
            props.history.push("/login:agency")
        }
    },[])
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="mainLoginPage">
                    <div className="innerLoginPage">
                        <div className="loginIllustrator">
                            <img src={loginImage} alt="" />
                        </div>
                        <div className="loginContent">
                            <div className="mainLoginForm">
                                <div className="toggleButton">
                                    <FormGroup>
                                        <Typography component="div">
                                            <Grid
                                                component="label"
                                                container
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <Grid
                                                    item
                                                    style={{ fontWeight: "lighter", fontSize: 22 }}
                                                >
                                                    Agency
                                                </Grid>
                                                <Grid item>
                                                    <AntSwitch
                                                        checked={state.checked}
                                                        onChange={handleChangeToggle}
                                                        name="checked"
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    style={{ fontWeight: "lighter", fontSize: 22 }}
                                                >
                                                    Client
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    </FormGroup>
                                </div>
                                <div className="loginHeading">
                                    <h6>
                                        Login as <span> {roleString} </span>
                                    </h6>
                                </div>
                                <div className="signUpOption">
                                    <p>
                                        Don't have an account?{" "}
                                        <span
                                            onClick={() =>
                                                props.history.push(`/register:${role.toLowerCase()}`)
                                            }
                                        >
                                            Sign Up
                                        </span>
                                    </p>
                                </div>
                                <div className="loginForm">
                                    <p style={{ marginBottom: "10px" }}>Email</p>
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
                                        endAdornment={
                                            <InputAdornment>
                                                <AccountCircleRoundedIcon fontSize="default" />
                                            </InputAdornment>
                                        }
                                    />
                                    <p style={{ marginTop: "20px", marginBottom: "10px" }}>
                                        Password
                                    </p>
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
                                        endAdornment={
                                            hidePassword ? (
                                                <InputAdornment position="end">
                                                    <VisibilityOffTwoToneIcon
                                                        fontSize="default"
                                                        className={classes.passwordEye}
                                                        onClick={showPassword}
                                                    />
                                                </InputAdornment>
                                            ) : (
                                                <InputAdornment position="end">
                                                    <VisibilityTwoToneIcon
                                                        fontSize="default"
                                                        className={classes.passwordEye}
                                                        onClick={showPassword}
                                                    />
                                                </InputAdornment>
                                            )
                                        }
                                    />
                                    <button onClick={() => logIn(role, form)} type="submit">
                                        Login
                                    </button>
                                    <span onClick={() => props.history.push('/enter-email')}>I forgot my password</span>
                                </div>
                            </div>
                            <div className="googleLogin">
                                <img src={google} alt="" />
                                <p>Sign in with Google</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Login;
