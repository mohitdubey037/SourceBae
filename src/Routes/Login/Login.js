/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../Login/login.css";
import { useParams } from "react-router";
import instance from "../../Constants/axiosConstants";
import axios from "axios";
import downImage1_agency from "../../assets/images/Newestdashboard/Login/Path11.svg";
import downImage2_agency from "../../assets/images/Newestdashboard/Login/Path12.svg";
import upImage1_agency from "../../assets/images/Newestdashboard/Login/Path13.svg";
import upImage2_agency from "../../assets/images/Newestdashboard/Login/Path14.svg";
import downImage1_client from "../../assets/images/Newestdashboard/Login/Path11_client.svg";
import downImage2_client from "../../assets/images/Newestdashboard/Login/Path12_client.svg";
import upImage1_client from "../../assets/images/Newestdashboard/Login/Path13_client.svg";
import upImage2_client from "../../assets/images/Newestdashboard/Login/Path14_client.svg";
import dotImage from "../../assets/images/Newestdashboard/Login/ab_01.png";
import googleImg from "../../assets/images/Newestdashboard/Login/Icon_google.svg";

import { InputAdornment, TextField, makeStyles } from "@material-ui/core";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import Spinner from "../../Components/Spinner/Spinner";
import cookie from "react-cookies";
import firebase from "../../firebase";
import { CLIENT, AGENCY } from "../../shared/constants";

const borderLight = "rgba(206,212,218, .993)";

const useStyles = makeStyles((theme) => ({
  inputs: {
    position: "relative",
    fontFamily: "Segoe UI",
    fontSize: "17px",
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    paddingLeft: "1rem",
    borderRadius: "8px",
    border: "1.4px solid",
    borderColor: borderLight,
    width: "100%",
    marginTop: "-5px",
  },
  passwordEye: {
    color: "rgba(131,153,167,0.9)",
    opacity: 0.9,
    marginTop: "1rem",
    cursor: "pointer",
  },
  root: {
    "& .MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
  input: {
    "& .MuiFilledInput-input": {
      padding: "37px 0px 10px",
      fontSize: "14px",
      background: "none",
    },
    "& .MuiFilledInput-root": {
      background: "none",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "translate(0px, 10px)",
      fontSize: "14px",
    },
    marginTop: "20px",
  },
}));

const Login = (props) => {
  const logoLink = "https://sourcebae.s3.amazonaws.com/image/1638354759751.svg";

  const classes = useStyles();
  let { role } = useParams();
  console.log(role);
  if (!(role === AGENCY || role === CLIENT))
    props.history.replace("/page-not-found");

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [hidePassword, SetPasswordStatus] = useState(true);
  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  const [token, setToken] = useState(null);
  const [device_token, setDevice_token] = useState("");

  useEffect(() => {
    if (window.Notification.permission === "granted") {
      const messaging = firebase.messaging();
      messaging.getToken().then((token) => {
        setDevice_token(token);
      });
    }
  }, []);

  useEffect(() => {
    debugger
    if (state !== "") {
      if (state === CLIENT) {
        props.history.push(`/login/${CLIENT}`)
      } else if (state === AGENCY) {
        props.history.push(`/login/${AGENCY}`);
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
    if (name === "user") {
      setForm({
        ...form,
        [name]: value.toLowerCase(),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleImageClick = () => {
    window.location.href = "https://sourcebae.com/";
  };

  const logIn = async (event) => {
    event.preventDefault();
    let apiRole = role
    return new Promise((resolve, reject) => {
      instance
        .post(`/api/${apiRole}/auths/login`, {
          ...form,
          notificationDeviceToken: device_token,
        })
        .then(function (response) {
          cookie.save("Authorization", `Bearer ${response.accessToken}`, {
            path: "/",
          });
          setToken(cookie.load("Authorization"));
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
      if (role === AGENCY) {
        setLoading(false);
        props.history.replace("/agencyNewestDashboard");
      } else if (role === CLIENT) {
        setLoading(false);
        props.history.push(`/clientNewestDashboard`);
      } else {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const tempRole = localStorage.getItem("role");
    const auth = cookie.load("Authorization");
    if (
      auth !== null &&
      auth !== undefined &&
      tempRole !== null &&
      tempRole !== undefined
    ) {
      if (tempRole === AGENCY) {
        props.history.replace("/agencyNewestDashboard");
      } else if (tempRole === CLIENT) {
        props.history.replace("/clientNewestDashboard");
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
              className={`loginIllustrator ${role === "Client" && "conditional_background"
                }`}
            >
              <div className="loginImage1">
                <img
                  src={
                    role === "Client"
                      ? downImage1_client
                      : downImage1_agency
                  }
                  alt="image1"
                />
              </div>
              <div className="loginImage2">
                <img
                  src={
                    role === "Client"
                      ? downImage2_client
                      : downImage2_agency
                  }
                  alt="image2"
                />
              </div>
              <div className="loginImage3">
                <img
                  src={
                    role === "Client" ? upImage1_client : upImage1_agency
                  }
                  alt="image3"
                />
              </div>
              <div className="loginImage4">
                <img
                  src={
                    role === CLIENT ? upImage2_client : upImage2_agency
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
                      Sourcebae
                    </span>{" "}
                  </p>
                </div>
                <div className="loginContent">
                  <div className="mainLoginForm">
                    <div className="login_switch">
                      <button
                        onClick={() => handleChangeToggle(AGENCY)}
                        className={`agency__button ${role === AGENCY && "active__buttonagency"
                          }`}
                      >
                        <p>Agency</p>
                      </button>
                      <button
                        onClick={() => handleChangeToggle(CLIENT)}
                        className={`client__button ${role === CLIENT && "active__buttonclient"
                          }`}
                      >
                        <p>Client</p>
                      </button>
                    </div>
                    <div className="loginHeading">
                      <h6>
                        Login as
                        {role === AGENCY ? (
                          <>
                            <span>{` an`}</span>
                            <span className="agencyOrClient">{` ${role}`}</span>
                          </>
                        ) : (
                          <>
                            <span>&nbsp;a</span>
                            <span className="agencyOrClient conditional_color">{` ${role}`}</span>
                          </>
                        )}
                      </h6>
                    </div>

                    <form onSubmit={logIn} className="loginForm">
                      <TextField
                        name="user"
                        id="filled-number"
                        label="Enter an Email"
                        type="text"
                        fullWidth
                        className={classes.input}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder="Enter an email"
                        variant="filled"
                      />
                      <TextField
                        style={{ marginTop: "30px" }}
                        name="password"
                        placeholder="••••••••"
                        id="filled-number"
                        label="Enter a password"
                        type={hidePassword ? "password" : "text"}
                        fullWidth
                        className={classes.input}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        variant="filled"
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              {hidePassword ? (
                                <VisibilityTwoToneIcon
                                  fontSize="small"
                                  className={classes.passwordEye}
                                  onClick={showPassword}
                                />
                              ) : (
                                <VisibilityOffTwoToneIcon
                                  fontSize="small"
                                  className={classes.passwordEye}
                                  onClick={showPassword}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                      <div className="button_action_login">
                        <button
                          className={`submit_login ${role === CLIENT &&
                            "conditional_backgroundSubmit"
                            }`}
                          type="submit"
                        >
                          <p>Login</p>
                        </button>
                        <div
                          className={`forgot-password_login ${role === CLIENT && "conditional_color"
                            }`}
                          onClick={() => props.history.push(`/enter-email/${role}`)}
                        >
                          <p>Forgot Password</p>
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
                        "conditional_backgroundGoogle"
                        }`}
                    >
                      <img src={googleImg} alt="no_image" />
                      <p>Sign in with Google</p>
                    </div>
                    <div className="signUpOption">
                      <p>
                        Don't have an account?{" "}
                        <span
                          onClick={() =>
                            props.history.replace(
                              `/register/${role.toLowerCase()}`
                            )
                          }
                        >
                          Sign Up
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
