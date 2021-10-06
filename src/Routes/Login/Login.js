import React, { useEffect, useState } from "react";
import "../Login/login.css";
import * as helper from "../../shared/helper";
import { useParams } from "react-router";
import instance from "../../Constants/axiosConstants";
import axios from "axios";
import downImage1 from "../../assets/images/Newestdashboard/Login/Path 11.svg";
import downImage2 from "../../assets/images/Newestdashboard/Login/Path12.png";
import upImage1 from "../../assets/images/Newestdashboard/Login/Path13.png";
import upImage2 from "../../assets/images/Newestdashboard/Login/Path14.png";
import bgColor from "../../assets/images/Newestdashboard/Login/Rectangle24.png";
import dotImage from "../../assets/images/Newestdashboard/Login/ab_01.png";
import googleImg from "../../assets/images/Newestdashboard/Login/Icon_google.svg";

import { InputAdornment, TextField, makeStyles } from "@material-ui/core";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import Spinner from "../../Components/Spinner/Spinner";
import cookie from "react-cookies";

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
    marginTop: '1rem',
    cursor: 'pointer'
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
      background: 'none'
    },
    "& .MuiFilledInput-root": {
      background: 'none'
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "translate(0px, 10px)",
      fontSize: "14px",
    },
    marginTop: "20px",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  let { role } = useParams();
  role = helper.capitalize(helper.cleanParam(role));
  if (!(role.toLowerCase() === "agency" || role.toLowerCase() === "client"))
    props.history.push("/page-not-found");

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [hidePassword, SetPasswordStatus] = useState(true);
  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  const [token, setToken] = useState(null);

  useEffect(() => {
    localStorage.setItem("toggle", state);
    console.log(state);
    state === "" || state === "agency"
      ? props.history.push("/login:agency")
      : props.history.push("/login:client");
  }, [state]);

  const showPassword = (e) => {
    console.log(e);
    SetPasswordStatus((prevCheck) => !prevCheck);
  };

  const handleChangeToggle = (name) => {
    console.log(name);
    setState(name);
  };

  //Methods

  const createRoleString = () => {
    role = role.charAt(0).toUpperCase() + role.slice(1);
    return role;
  };

  const roleString = createRoleString();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
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
      console.log(axios);
      if (role === "Agency") {
        setLoading(false);
        props.history.push("/agencyNewestDashboard");
      } else if (role === "Client") {
        setLoading(false);
        props.history.push("/clientNewestDashboard");
      } else {
        console.log(localStorage.getItem("Authorization", token));
      }
    }
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
      if (tempRole.toLowerCase() === "agency") {
        props.history.push("/agencyNewestDashboard");
      } else if (tempRole.toLowerCase() === "client") {
        props.history.push("/clientNewestDashboard");
      }
    }
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mainLoginPage">
          <div className="innerLoginPage">
            <div className="loginIllustrator">
              <div className="bg-image">
                <img src={bgColor} alt="image5" />
              </div>
              {/* <img src={loginImage} alt="" /> */}
              <div className="loginImage1">
                <img src={downImage1} alt="image1" />
              </div>
              <div className="loginImage2">
                <img src={downImage2} alt="image2" />
              </div>
              <div className="loginImage3">
                <img src={upImage1} alt="image3" />
              </div>
              <div className="loginImage4">
                <img src={upImage2} alt="image4" />
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
                    <span className="welcome-back_sourceBae">Sourcebae</span>
                  </p>
                </div>
                <div className="loginContent">
                  <div className="mainLoginForm">
                    <div className="login_switch">
                      <button
                        onClick={() => handleChangeToggle("agency")}
                        className={`agency__button ${
                          (state === "" || state === "agency") &&
                          "active__button"
                        }`}
                      >
                        <p>Agency</p>
                      </button>
                      <button
                        onClick={() => handleChangeToggle("client")}
                        className={`client__button ${
                          state === "client" && "active__button"
                        }`}
                      >
                        <p>Client</p>
                      </button>
                    </div>
                    <div className="loginHeading">
                      <h6>
                        Login as{" "}
                        {state === "" ? (
                          <>
                            <span>an</span>
                            <span className="agencyOrClient">{` ${roleString}`}</span>
                          </>
                        ) : (
                          <>
                            <span>a</span>
                            <span className="agencyOrClient">{` ${roleString}`}</span>
                          </>
                        )}
                      </h6>
                    </div>

                    <div className="loginForm">
                      <TextField
                        name="user"
                        id="filled-number"
                        label="Enter an Email"
                        type="text"
                        fullWidth
                        className={classes.input}
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                        type="password"
                        fullWidth
                        className={classes.input}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        variant="filled"
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              {hidePassword ? (
                                <VisibilityOffTwoToneIcon
                                  fontSize="small"
                                  className={classes.passwordEye}
                                  onClick={showPassword}
                                />
                              ) : (
                                <VisibilityTwoToneIcon
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
                        <div
                          className="submit_login"
                          onClick={() => logIn(role, form)}
                          type="submit"
                        >
                          <p>Login</p>
                        </div>
                        <div
                          className="forgot-password_login"
                          onClick={() => props.history.push("/enter-email")}
                        >
                          <p>Forgot Password</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="or_login">
                    <p>Or</p>
                  </div>
                  <div className="signup_toggle">
                    <div className="googleLogin">
                      <img src={googleImg} alt="no_image" />
                      <p>Sign in with Google</p>
                    </div>
                    <div className="signUpOption">
                      <p>
                        Don't have an account?{" "}
                        <span
                          onClick={() =>
                            props.history.push(
                              `/register:${role.toLowerCase()}`
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
