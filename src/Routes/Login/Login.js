/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../Login/login.css';
import { useParams } from 'react-router';
import instance from '../../Constants/axiosConstants';
import axios from 'axios';
import downImage1_agency from '../../assets/images/Newestdashboard/Login/Path11.svg';
import downImage2_agency from '../../assets/images/Newestdashboard/Login/Path12.svg';
import upImage1_agency from '../../assets/images/Newestdashboard/Login/Path13.svg';
import upImage2_agency from '../../assets/images/Newestdashboard/Login/Path14.svg';
import downImage1_client from '../../assets/images/Newestdashboard/Login/Path11_client.svg';
import downImage2_client from '../../assets/images/Newestdashboard/Login/Path12_client.svg';
import upImage1_client from '../../assets/images/Newestdashboard/Login/Path13_client.svg';
import upImage2_client from '../../assets/images/Newestdashboard/Login/Path14_client.svg';
import dotImage from '../../assets/images/Newestdashboard/Login/ab_01.png';
import googleImg from '../../assets/images/Newestdashboard/Login/Icon_google.svg';

import { InputAdornment, TextField } from '@material-ui/core';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import Spinner from '../../Components/Spinner/Spinner';
import cookie from 'react-cookies';
import firebase from '../../firebase';
import { CLIENT, AGENCY, CONTENT } from '../../shared/constants';
import { toast } from 'react-toastify';
import {
    AGENCYROUTES,
    CLIENTROUTES,
    USERROUTES
} from '../../Navigation/CONSTANTS';

import * as mui from '././../../shared/muiConstants';

const { useStyles } = mui;

const Login = (props) => {
    const logoLink =
        'https://sourcebae.s3.amazonaws.com/image/1638354759751.svg';

    let isRequirement = props?.location?.state?.isAgencyRequirement;

    const classes = useStyles();
    let { role } = useParams();
    let { roles } = props;
    if (!role) {
        role = roles;
    }
    if (!(role === AGENCY || role === CLIENT))
        props.history.replace(USERROUTES.NOT_FOUND);

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState('');
    const [hidePassword, SetPasswordStatus] = useState(true);
    const [form, setForm] = useState({
        user: '',
        password: ''
    });

    const [token, setToken] = useState(null);
    const [device_token, setDevice_token] = useState('');

    useEffect(() => {
        if (window.Notification.permission === 'granted') {
            const messaging = firebase.messaging();
            messaging.getToken().then((token) => {
                setDevice_token(token);
            });
        }
    }, []);

    useEffect(() => {
        if (state !== '') {
            if (state === CLIENT) {
                props.history.push(CLIENTROUTES.LOGIN);
            } else if (state === AGENCY) {
                props.history.push(AGENCYROUTES.LOGIN);
            }
        }
    }, [state]);

    const showPassword = (e) => {
        SetPasswordStatus((prevCheck) => !prevCheck);
    };

    const handleChangeToggle = (name) => {
        setState(name);
    };

    //Methods

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'user') {
            setForm({
                ...form,
                [name]: value
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleImageClick = () => {
        window.location.href = '/';
    };

    const logIn = async (event) => {
        event.preventDefault();
        if (form.user === '' || form.password === '') {
            toast.error('Username and Password are required');
            return;
        }
        let apiRole = role;

        instance
            .post(`/api/${apiRole}/auths/login`, {
                ...form,
                notificationDeviceToken: device_token
            })
            .then(function (response) {
                cookie.save('Authorization', `Bearer ${response.accessToken}`, {
                    path: '/'
                });
                setToken(cookie.load('Authorization'));
                localStorage.setItem('role', role);
                localStorage.setItem('userId', `${response._id}`);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
            if (role === AGENCY) {
                setLoading(false);
                if (isRequirement)
                    props.history.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
                else props.history.replace(AGENCYROUTES.DASHBOARD);
            } else if (role === CLIENT) {
                setLoading(false);
                props.history.push(CLIENTROUTES.DASHBOARD);
            } else {
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        const tempRole = localStorage.getItem('role');
        const auth = cookie.load('Authorization');
        if (
            auth !== null &&
            auth !== undefined &&
            tempRole !== null &&
            tempRole !== undefined
        ) {
            if (tempRole === AGENCY) {
                props.history.replace(AGENCYROUTES.DASHBOARD);
            } else if (tempRole === CLIENT) {
                props.history.replace(CLIENTROUTES.DASHBOARD);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="mainLoginPage">
                    <div onClick={handleImageClick} className="sourceBae_logo">
                        <img src={logoLink} alt="sourceBae-log" />
                    </div>
                    <div className="innerLoginPage">
                        <div
                            className={`loginIllustrator ${role === CLIENT && 'conditional_background'
                                }`}
                        >
                            <div className="loginImage1">
                                <img
                                    src={
                                        role === CLIENT
                                            ? downImage1_client
                                            : downImage1_agency
                                    }
                                    alt="image1"
                                />
                            </div>
                            <div className="loginImage2">
                                <img
                                    src={
                                        role === CLIENT
                                            ? downImage2_client
                                            : downImage2_agency
                                    }
                                    alt="image2"
                                />
                            </div>
                            <div className="loginImage3">
                                <img
                                    src={
                                        role === CLIENT
                                            ? upImage1_client
                                            : upImage1_agency
                                    }
                                    alt="image3"
                                />
                            </div>
                            <div className="loginImage4">
                                <img
                                    src={
                                        role === CLIENT
                                            ? upImage2_client
                                            : upImage2_agency
                                    }
                                    alt="image4"
                                />
                            </div>
                            <div className="dot-image">
                                <img src={dotImage} alt="" />
                            </div>
                            <div className="loginCards-wrapper">
                                <div className="welcome-back_loginIllustrator">
                                    <p>
                                        Welcome back<br></br>
                                        <span>to</span>
                                        <br />
                                        <span className="welcome-back_sourceBae">
                                            {CONTENT.SOURCEBAE}
                                        </span>{' '}
                                        <br />
                                    </p>
                                </div>
                                <div className="loginContent">
                                    <div className="mainLoginForm">
                                        <div className="login_switch">
                                            <button
                                                onClick={() =>
                                                    handleChangeToggle(AGENCY)
                                                }
                                                className={`agency__button ${role === AGENCY &&
                                                    'active__buttonagency'
                                                    }`}
                                            >
                                                <p className="capitalize">
                                                    {AGENCY}
                                                </p>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleChangeToggle(CLIENT)
                                                }
                                                className={`client__button ${role === CLIENT &&
                                                    'active__buttonclient'
                                                    }`}
                                            >
                                                <p className="capitalize">
                                                    {CLIENT}
                                                </p>
                                            </button>
                                        </div>
                                        <div className="loginHeading">
                                            <h6>
                                                Login as
                                                {role === AGENCY ? (
                                                    <>
                                                        <span>{` an`}</span>
                                                        <span className="agencyOrClient">{` Agency`}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>&nbsp;a</span>
                                                        <span className="agencyOrClient conditional_color">{` Client`}</span>
                                                    </>
                                                )}
                                            </h6>
                                        </div>

                                        <form
                                            onSubmit={logIn}
                                            className="loginForm"
                                        >
                                            <TextField
                                                name="user"
                                                id="filled-number"
                                                label="Email/Username"
                                                type="text"
                                                fullWidth
                                                className={classes.input}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                placeholder={
                                                    CONTENT.USER_IDENTIFIER_PLACEHOLDER
                                                }
                                                variant="filled"
                                            />
                                            <TextField
                                                style={{ marginTop: '30px' }}
                                                name="password"
                                                placeholder="••••••••"
                                                id="filled-number"
                                                label="Password"
                                                type={
                                                    hidePassword
                                                        ? 'password'
                                                        : 'text'
                                                }
                                                fullWidth
                                                className={classes.input}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                variant="filled"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {hidePassword ? (
                                                                <VisibilityTwoToneIcon
                                                                    fontSize="small"
                                                                    className={
                                                                        classes.passwordEye
                                                                    }
                                                                    onClick={
                                                                        showPassword
                                                                    }
                                                                />
                                                            ) : (
                                                                <VisibilityOffTwoToneIcon
                                                                    fontSize="small"
                                                                    className={
                                                                        classes.passwordEye
                                                                    }
                                                                    onClick={
                                                                        showPassword
                                                                    }
                                                                />
                                                            )}
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <div className="button_action_login">
                                                <button
                                                    className={`submit_login ${role === CLIENT &&
                                                        'conditional_backgroundSubmit'
                                                        }`}
                                                    type="submit"
                                                >
                                                    <p>{CONTENT.LOGIN}</p>
                                                </button>
                                                <div
                                                    className={`forgot-password_login ${role === CLIENT &&
                                                        'conditional_color'
                                                        }`}
                                                    onClick={() =>
                                                        props.history.push(
                                                            `/enter-email/${role}`
                                                        )
                                                    }
                                                >
                                                    <p>
                                                        {
                                                            CONTENT.FORGOT_PASSWORD
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="or_login">
                                        <p>Or</p>
                                    </div>
                                    <div className="signup_toggle">
                                        <div
                                            className={`googleLogin ${role === CLIENT &&
                                                'conditional_backgroundGoogle'
                                                }`}
                                        >
                                            <img
                                                src={googleImg}
                                                alt="no_image"
                                            />
                                            <p>Sign in with Google</p>
                                        </div>
                                        <div className="signUpOption">
                                            <p>
                                                {CONTENT.NO_ACCOUNT_MESSAGE}{' '}
                                                <span
                                                    onClick={() =>
                                                        props.history.replace(
                                                            role === AGENCY
                                                                ? AGENCYROUTES.REGISTER
                                                                : CLIENTROUTES.REGISTER
                                                        )
                                                    }
                                                >
                                                    {CONTENT.SIGN_UP}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
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
