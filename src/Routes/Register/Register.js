/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./register.css";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core";
import instance from "../../Constants/axiosConstants";
import * as helper from "../../shared/helper";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner/Spinner";
import cookie from "react-cookies";
import imgRegister from "../../assets/images/Newestdashboard/Register/img_register.svg";
import Signup1 from "../../assets/images/Newestdashboard/Register/signup_up.svg";
import Signup2 from "../../assets/images/Newestdashboard/Register/signup_down.svg";

const dateStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    border: `1px solid lightgrey`,
    color: `gray`,
    borderRadius: `10px`,
    outline: "none",
    textColor: `gray`,
    marginTop: `1%`,
    paddingLeft: `4%`,
    paddingTop: `1%`,
    width: `60%`,
    height: `60px`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: `100%`,
    color: `gray`,
    border: "none",
    background: "none",
  },
  label: {
    color: `gray`,
  },
}));

const Register = (props) => {
  //Regular Variables
  const dateClasses = dateStyles();
  const [state, setState] = useState("");
  const [token, setToken] = useState(null);
  let { role } = useParams();
  role = helper.capitalize(helper.cleanParam(role));
  if (!(role === "Agency" || role === "Client"))
    props.history.push("/page-not-found");
  //Social Media State Variables
  const [linkedIn, setLinkedIn] = useState({
    platformId: "",
    platformLink: "",
  });

  const [site, setSite] = useState({
    platformId: "",
    platformLink: "",
  });

  const [loading, setLoading] = useState(false);

  //Client state varaibles//
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    countryCode: "+91",
    password: "",
  });

  //Agency Profile state variables//
  const [agencyProfileDetails, setAgencyProfileDetails] = useState({
    agencyName: "",
    agencyTeamSize: "",
    incorporationDate: new Date().toJSON().slice(0, 10),
    socialPlatformDetails: [],
  });

  //Client Profile state varaibles//
  const [clientProfileDetails, setClientProfileDetails] = useState({
    userDesignation: "",
    companyName: "",
    socialPlatformDetails: [],
  });

  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState(false);

  const [step, setStep] = useState(1);

  const handleSocialPlatform = (event) => {
    const { name, value } = event.target;
    if (name === "linkedIn") {
      setLinkedIn({
        platformName: name,
        platformLink: value,
      });
    } else if (name === "website") {
      setSite({
        platformName: name,
        platformLink: value,
      });
    }
  };

  useEffect(() => {}, [apiErrors]);

  const setForm = (event) => {
    let { name, value } = event.target;
    if (name === "firstName" || name === "lastName" || name === "userEmail") {
      setSignupForm({
        ...signupForm,
        [name]: value.toLowerCase(),
      });
    } else {
      setSignupForm({
        ...signupForm,
        [name]: value,
      });
    }
  };

  const handleCreateProfile = (event, role) => {
    let { name, value } = event.target;

    if (role === "Agency") {
      setAgencyProfileDetails({
        ...agencyProfileDetails,
        [name]: value,
      });
    } else if (role === "Client")
      setClientProfileDetails({
        ...clientProfileDetails,
        [name]: value,
      });
  };

  const handleErrorsValidation = (Role) => {
    const err = {};
    if (Role === "Agency") {
      if (agencyProfileDetails?.agencyName === "") {
        err.agencyNameError = "Agency name is required";
      } else if (agencyProfileDetails?.agencyName.match(/^[0-9]+$/)) {
        err.agencyNameError = "Agency name must be in characters.";
      } else if (agencyProfileDetails?.agencyName.length < 2) {
        err.agencyNameError = "Agency name must be between 2 characters.";
      } else if (agencyProfileDetails?.agencyTeamSize === "") {
        err.agencyTeamSizeError = "Team strength is required";
      } else if (
        agencyProfileDetails?.agencyTeamSize !== " " &&
        +agencyProfileDetails?.agencyTeamSize <= 0
      ) {
        err.agencyTeamSizeError = "Team strength must be greater than 0";
      } else if (agencyProfileDetails?.socialPlatformDetails.length === 0) {
        err.socialPlatformDetailsError = "Website url is required";
      } else if (
        agencyProfileDetails?.socialPlatformDetails?.length > 0 &&
        agencyProfileDetails?.socialPlatformDetails[0]?.platformLink === ""
      ) {
        err.socialPlatformDetailsError = "Website url is required";
      } else if (
        !helper.validateLink(
          agencyProfileDetails?.socialPlatformDetails[0]?.platformLink
        )
      ) {
        err.socialPlatformDetailsError = "Invalid link provided.";
      }
      setErrors(err);
      if (Object.keys(err).length === 0) return true;
      else return false;
    } else if (Role === "Client") {
      if (clientProfileDetails.userDesignation === "") {
        err.userDesignationError = "User Designation Field is required";
      } else if (clientProfileDetails.userDesignation.length < 2) {
        err.userDesignationError =
          "User Designation must be between 2 characters.";
      } else if (clientProfileDetails.companyName === "") {
        err.companyNameError = "Company Name Field is required";
      } else if (clientProfileDetails.companyName.length < 2) {
        err.companyNameError = "Company Name must be between 2 characters.";
      } else if (
        clientProfileDetails.socialPlatformDetails[0].platformLink === ""
      ) {
        err.socialPlatformDetailsError = "Website url is required";
      } else if (
        !helper.validateLink(
          clientProfileDetails?.socialPlatformDetails[0]?.platformLink
        )
      ) {
        err.socialPlatformDetailsError = "Invalid link provided.";
      }
      setErrors(err);
      if (Object.keys(err).length === 0) return true;
      else return false;
    }
  };

  useEffect(() => {
    setState(role.toLowerCase());
  }, []);

  useEffect(() => {
    role.toLowerCase() === "agency" || state === "agency"
      ? props.history.push("/register:agency")
      : props.history.push("/register:client");
  }, [state]);

  const handleChangeToggle = (name) => {
    console.log(name);
    setState(name);
  };

  //API call methods
  const signUpApi = async (role, form) => {
    return new Promise((resolve, reject) => {
      instance
        .post(`/api/${role}/auths/signup`, form)
        .then(function (response) {
          cookie.save("Authorization", `Bearer ${response.accessToken}`, {
            path: "/",
          });
          setApiErrors(false);
          setToken(cookie.load("Authorization"));
          localStorage.setItem("role", role);
          localStorage.setItem("userId", `${response._id}`);
        })
        .catch((err) => {
          console.log(err);
          setApiErrors(true);
          localStorage.removeItem("Authorization");
          localStorage.removeItem("role");
          cookie.remove("user");
        });
    });
  };

  const createProfileApi = (Role, api_param_const, createForm) => {
    setLoading(true);
    instance
      .post(`api/${Role}/${api_param_const}/create`, { ...createForm })
      .then(function (response) {
        if (role.toLowerCase() === "client") {
          props.history.push("/clientNewestDashboard");
          setLoading(false);
        } else if (role.toLowerCase() === "agency") {
          props.history.push("/agencyNewestDashboard");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSubmit = (Role, Form) => {
    if (handleErrorsValidation(Role)) {
      signUpApi(Role, Form);
    }
  };

  useEffect(() => {
    console.log("token use effect called");
    if (token !== null && apiErrors === false) {
      console.log("token is not null");
      const apiRole = helper.lowerize(role);
      let api_param_const = ``;
      let api_create_form = {};
      if (apiRole === `client`) {
        api_param_const = `clients`;
        api_create_form = {
          stepsCompleted: 1,
          ...clientProfileDetails,
        };
      } else if (apiRole === `agency`) {
        api_param_const = `agencies`;
        api_create_form = {
          stepsCompleted: 1,
          ...agencyProfileDetails,
        };
      }
      if (token !== null) {
        instance.defaults.headers.common["Authorization"] =
          localStorage.getItem("Authorization");
        createProfileApi(apiRole, api_param_const, api_create_form);
      } else {
        toast.error("Token not set", { autoClose: 2000 });
      }
    }
  }, [token, apiErrors]);

  const createRoleString = (role) => {
    role = role.charAt(0).toUpperCase() + role.slice(1);
    return role;
  };

  const toggleForms = (direction) => {
    const err = {};
    if (direction === "next") {
      setStep((prev) => prev + 1);
      if (signupForm.firstName === "") {
        err.firstNameError = "First name is required.";
      } else if (
        signupForm.firstName.length < 2 ||
        signupForm.firstName.length > 12
      ) {
        err.firstNameError = "First name must be between 2-12 characters.";
      } else if (signupForm.lastName === "") {
        err.lastNameError = "Last name is required.";
      } else if (
        signupForm.lastName.length < 2 ||
        signupForm.lastName.length > 12
      ) {
        err.lastNameError = "Last name must be between 2-12 characters.";
      } else if (signupForm.userName === "") {
        err.userNameError = "User name is required.";
      } else if (/\S+@\S+\.\S+/.test(signupForm.userName)) {
        err.userNameError = "User name should be only alphanumeric.";
      } else if (
        signupForm.userName.length < 3 ||
        signupForm.userName.length > 50
      ) {
        err.userNameError = "User name must be between 2-50 characters.";
      } else if (signupForm.userEmail === "") {
        err.emailError = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(signupForm.userEmail)) {
        err.emailError = "Invalid email address.";
      } else if (signupForm.userPhone === "") {
        err.phoneError = "Phone is required.";
      } else if (signupForm.userPhone.match(/[^0-9]/g)) {
        err.phoneError = "Phone number must be digit.";
      } else if (signupForm.userPhone.length < 10) {
        err.phoneError = "Phone must be of 10 digits.";
      } else if (signupForm.password === "") {
        err.passwordError = "Password is required.";
      } else if (signupForm.password.length < 6) {
        err.passwordError = "Password must be 8 characters in length.";
      } else if (signupForm.password.length > 64) {
        err.passwordError =
          "Password cannot be more than 64 characters in length.";
      }

      setErrors(err);
      if (Object.keys(err).length === 0) {
        let form1 = document.querySelector(".form__1");
        let form2 = document.querySelector(".form__2");
        form1.classList.toggle("hide__form1");
        form1.classList.toggle("display__form1");
        form2.classList.toggle("show__form2");
        form2.classList.toggle("display__form2");
      } else {
        return false;
      }
    } else {
      let form1 = document.querySelector(".form__1");
      let form2 = document.querySelector(".form__2");
      form1.classList.toggle("hide__form1");
      form1.classList.toggle("display__form1");
      form2.classList.toggle("show__form2");
      form2.classList.toggle("display__form2");
      setStep((prev) => prev - 1);
    }
  };

  const backOnForm2 = () => {
    let form1 = document.querySelector(".form__1");
    let form2 = document.querySelector(".form__2");
    form1.classList.toggle("hide__form1");
    form1.classList.toggle("display__form1");
    form2.classList.toggle("show__form2");
    form2.classList.toggle("display__form2");
  };

  //============= USE-EFFECT HOOKS============//

  useEffect(() => {
    if (role === "Agency")
      setAgencyProfileDetails({
        ...agencyProfileDetails,
        socialPlatformDetails: [site],
      });
    else if (role === "Client")
      setClientProfileDetails({
        ...clientProfileDetails,
        socialPlatformDetails: [site],
      });
  }, [linkedIn, site]);

  //__________ USE-EFFECT ENDS ______//

  const roleString = createRoleString(role);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="client__registrationContainer">
            <img
              className={`Image1 ${
                state === "client" && "conditional_colorChange"
              }`}
              src={Signup1}
              alt="signup"
            />
            <img
              className={`Image2 ${
                state === "client" && "conditional_colorChange"
              } `}
              src={Signup2}
              alt="signup"
            />
            <div className="form__area">
              <div className="client__form">
                <div className="toggleButton register">
                  <div className="form__title">
                    <h6>
                      Register as{" "}
                      {state === "" || state === "agency" ? (
                        <>
                          <span>an</span>
                          <span
                            style={{ fontSize: "25px" }}
                            className="agencyOrClient"
                          >{` ${roleString}`}</span>
                        </>
                      ) : (
                        <>
                          <span>a</span>
                          <span
                            style={{ fontSize: "25px" }}
                            className="agencyOrClient"
                          >{` ${roleString}`}</span>
                        </>
                      )}
                    </h6>
                  </div>

                  <div className="login_switch signup_switch">
                    <button
                      onClick={() => handleChangeToggle("agency")}
                      className={`agency__button ${
                        (state === "" || state === "agency") &&
                        "active__buttonagency"
                      }`}
                    >
                      <p>Agency</p>
                    </button>
                    <button
                      onClick={() => handleChangeToggle("client")}
                      className={`client__button ${
                        state === "client" && "active__buttonclient"
                      }`}
                    >
                      <p>Client</p>
                    </button>
                  </div>
                </div>
                <div className="client__formsContainer">
                  <form className="client__form form__1" autoComplete="off">
                    <div>
                      <div className="input_with_error">
                        <label>First Name</label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          // value={signupForm.firstName}
                          onChange={(e) => setForm(e)}
                        />
                        <div>
                          {errors.firstNameError && (
                            <p className="error_productForm">
                              {errors.firstNameError}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="input_with_error">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          // value={signupForm.lastName}
                          onChange={(e) => setForm(e)}
                        />
                        {errors.lastNameError && (
                          <p className="error_productForm">
                            {errors.lastNameError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="input_with_error">
                        <label>Email</label>
                        <input
                          type="email"
                          name="userEmail"
                          placeholder="Email"
                          value={signupForm.userEmail}
                          onChange={(e) => setForm(e)}
                        />
                        {errors.emailError && (
                          <p className="error_productForm">
                            {errors.emailError}
                          </p>
                        )}
                      </div>
                      <div className="input_with_error">
                        <label>User Name</label>
                        <input
                          type="text"
                          name="userName"
                          placeholder="Username"
                          value={signupForm.userName}
                          onChange={(e) => setForm(e)}
                        />
                        {errors.userNameError && (
                          <p className="error_productForm">
                            {errors.userNameError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="input_with_error">
                        <label>Phone number</label>
                        <input
                          type="tel"
                          name="userPhone"
                          maxLength="10"
                          placeholder="Phone No"
                          value={signupForm.userPhone}
                          onChange={(e) => setForm(e)}
                        />
                        {errors.phoneError && (
                          <p className="error_productForm">
                            {errors.phoneError}
                          </p>
                        )}
                      </div>

                      <div className="input_with_error">
                        <label>Create Password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="Create Password"
                          value={signupForm.password}
                          onChange={(e) => setForm(e)}
                        />
                        {errors.passwordError && (
                          <p className="error_productForm">
                            {errors.passwordError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="already_next_register">
                      <div
                        className={`next_Register ${
                          state === "client" && "active__buttonclient"
                        }`}
                        onClick={() => toggleForms("next")}
                      >
                        <p>NEXT</p>
                      </div>
                      <div className="registerOption">
                        <p>
                          Already have an account?{" "}
                          <span
                            onClick={() =>
                              props.history.push(`/login:${role.toLowerCase()}`)
                            }
                          >
                            Log In
                          </span>
                        </p>
                        <p className="existing_accountText">Step {step} of 4</p>
                      </div>
                    </div>
                  </form>

                  <div className="right_image">
                    <img src={imgRegister} alt="img" />
                  </div>

                  <form autoComplete="off" className="client__form form__2">
                    {role === `Agency` ? (
                      <>
                        <div>
                          <div className="input_with_error">
                            <label>Agency Name</label>
                            <input
                              type="text"
                              name="agencyName"
                              placeholder="Agency Name"
                              value={agencyProfileDetails.agencyName}
                              onChange={(event) =>
                                handleCreateProfile(event, role)
                              }
                            />
                            {errors.agencyNameError && (
                              <p className="error_productForm">
                                {errors.agencyNameError}
                              </p>
                            )}
                          </div>

                          <div className="input_with_error">
                            <label>Team Strength</label>
                            <input
                              type="number"
                              min="1"
                              name="agencyTeamSize"
                              placeholder="Team Strength"
                              value={agencyProfileDetails.agencyTeamSize}
                              onChange={(event) =>
                                handleCreateProfile(event, role)
                              }
                            />
                            {errors.agencyTeamSizeError && (
                              <p className="error_productForm">
                                {errors.agencyTeamSizeError}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="input_with_error">
                          <label
                            className={dateClasses.label}
                            id="incorporationLabel"
                            htmlFor="social"
                          >
                            Incorporation Date
                          </label>
                          <input
                            style={{
                              width: "39%",
                              paddingLeft: "2.5%",
                              paddingRight: "2%",
                            }}
                            id="incorporation_date"
                            type="date"
                            name="incorporationDate"
                            max={new Date().toJSON().slice(0, 10)}
                            className={dateClasses.textField}
                            onChange={(event) =>
                              handleCreateProfile(event, role)
                            }
                          />
                          {errors.incorporationDateError && (
                            <p className="error_productForm">
                              {errors.incorporationDateError}
                            </p>
                          )}
                        </div>

                        <div className="input_with_error">
                          <label>Website Url</label>
                          <input
                            style={{ width: "39%", paddingLeft: "2.5%" }}
                            type="text"
                            name="website"
                            placeholder="Website URL"
                            value={site.platformLink}
                            onChange={(event) => handleSocialPlatform(event)}
                          />
                          {errors.socialPlatformDetailsError && (
                            <p className="error_productForm">
                              {errors.socialPlatformDetailsError}
                            </p>
                          )}
                        </div>

                        <div>
                          <div className="registerParent_onAgency">
                            <div
                              className="backRegister_onAgency"
                              onClick={() => backOnForm2()}
                            >
                              <p>Back</p>
                            </div>
                            <div
                              className="nextRegister_onAgency"
                              onClick={() => handleSubmit(role, signupForm)}
                            >
                              <p>Submit</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="input_with_error">
                          <label>User Designation</label>
                          <input
                            style={{ width: "39%", paddingLeft: "2.5%" }}
                            type="text"
                            name="userDesignation"
                            placeholder="User Designation"
                            onChange={(event) =>
                              handleCreateProfile(event, role)
                            }
                          />
                          {errors.userDesignationError && (
                            <p className="error_productForm">
                              {errors.userDesignationError}
                            </p>
                          )}
                        </div>

                        <div className="input_with_error">
                          <label>Company Name</label>
                          <input
                            style={{ width: "39%", paddingLeft: "2.5%" }}
                            type="text"
                            name="companyName"
                            value={clientProfileDetails.companyName}
                            placeholder="Company Name"
                            onChange={(event) =>
                              handleCreateProfile(event, role)
                            }
                          />
                          {errors.companyNameError && (
                            <p className="error_productForm">
                              {errors.companyNameError}
                            </p>
                          )}
                        </div>
                        <div className="input_with_error">
                          <label>Website Url</label>
                          <input
                            style={{ width: "39%", paddingLeft: "2.5%" }}
                            type="text"
                            name="website"
                            placeholder="Website URL"
                            value={site.platformLink}
                            onChange={(event) => handleSocialPlatform(event)}
                          />
                          {errors.socialPlatformDetailsError && (
                            <p className="error_productForm">
                              {errors.socialPlatformDetailsError}
                            </p>
                          )}
                        </div>
                        <div>
                          <div className="registerParent_onClient">
                            <div
                              className="backRegister_onClient"
                              onClick={() => backOnForm2()}
                            >
                              <p>Back</p>
                            </div>
                            <div
                              className="nextRegister_onClient"
                              onClick={() => handleSubmit(role, signupForm)}
                            >
                              <p>Submit</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* <div className="input_with_error">
    const roleString = createRoleString(role)
    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <div className='client__registrationContainer'>
                        <img className={`Image1 ${state === 'client' && 'conditional_colorChange'}`} src={Signup1} alt="signup" />
                        <img className={`Image2 ${state === 'client' && 'conditional_colorChange'} `} src={Signup2} alt="signup" />
                        <div className='form__area'>
                            <div className="client__form">
                                <div className="toggleButton register">
                                    <div className="form__title">
                                        <h6>
                                            Register as {
                                                (state === '' || state === "agency") ?
                                                    <><span>an</span><span style={{ fontSize: '25px' }} className="agencyOrClient">{` ${roleString}`}</span></>
                                                    :
                                                    <><span>a</span><span style={{ fontSize: '25px' }} className="agencyOrClient">{` ${roleString}`}</span></>
                                            }
                                        </h6>

                                    </div>

                                    <div className="login_switch signup_switch">
                                        <button onClick={() => handleChangeToggle('agency')} className={`agency__button ${(state === '' || state === 'agency') && "active__buttonagency"}`}><p>Agency</p></button>
                                        <button onClick={() => handleChangeToggle('client')} className={`client__button ${(state === 'client' && "active__buttonclient")}`}><p>Client</p></button>
                                    </div>
                                </div>
                                <div className="client__formsContainer">
                                    <form className='client__form form__1' autoComplete="off" >
                                        <div>
                                            <div className="input_with_error">
                                                <label>First Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="firstName"
                                                    placeholder='First Name'
                                                    // value={signupForm.firstName}
                                                    onChange={(e) => setForm(e)}
                                                />
                                                <div>
                                                    {
                                                        errors.firstNameError &&
                                                        <p className="error_productForm">
                                                            {errors.firstNameError}
                                                        </p>
                                                    }
                                                </div>
                                            </div>

                                            <div className="input_with_error">
                                                <label>Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder='Last Name'
                                                    // value={signupForm.lastName}
                                                    onChange={(e) => setForm(e)}
                                                />
                                                {
                                                    errors.lastNameError &&
                                                    <p className="error_productForm">
                                                        {errors.lastNameError}
                                                    </p>
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <div className="input_with_error">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    name="userEmail"
                                                    placeholder='Email'
                                                    value={signupForm.userEmail}
                                                    onChange={(e) => setForm(e)}
                                                />
                                                {
                                                    errors.emailError &&
                                                    <p className="error_productForm">
                                                        {errors.emailError}
                                                    </p>
                                                }
                                            </div>
                                            <div className="input_with_error">
                                                <label>User Name</label>
                                                <input type="text" name="user" style={{display:"none"}}/>
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    placeholder='Username'
                                                    value={signupForm.userName}
                                                    onChange={(e) => setForm(e)}
                                                />
                                                {
                                                    errors.userNameError &&
                                                    <p className="error_productForm">
                                                        {errors.userNameError}
                                                    </p>
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <div className="input_with_error">
                                                <label>Phone number</label>
                                                <input
                                                    type="tel"
                                                    name="userPhone"
                                                    maxLength='10'
                                                    placeholder='Phone No'
                                                    value={signupForm.userPhone}
                                                    onChange={(e) => setForm(e)}
                                                />
                                                {
                                                    errors.phoneError &&
                                                    <p className="error_productForm">
                                                        {errors.phoneError}
                                                    </p>
                                                }
                                            </div>

                                            <div className="input_with_error">
                                                <label>Create Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder='Create Password'
                                                    value={signupForm.password}
                                                    onChange={(e) => setForm(e)}
                                                />
                                                {
                                                    errors.passwordError &&
                                                    <p className="error_productForm">
                                                        {errors.passwordError}
                                                    </p>
                                                }
                                            </div>
                                        </div>

                                        <div className="already_next_register">
                                            <div className={`next_Register ${(state === 'client' && "active__buttonclient")}`} onClick={() => toggleForms('next')}>
                                                <p>NEXT</p>
                                            </div>
                                            <div className="registerOption">
                                                <p>Already have an account? <span onClick={() => props.history.push(`/login:${role.toLowerCase()}`)}>Log In</span></p>
                                                <p className="existing_accountText">Step {step} of 4</p>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="right_image">
                                        <img src={imgRegister} alt="img" />
                                    </div>

                                    <form autoComplete='off' className="client__form form__2">
                                        {
                                            role === `Agency` ?
                                                <>
                                                    <div>
                                                        <div className="input_with_error">
                                                            <label>Agency Name</label>
                                                            <input
                                                                type="text"
                                                                name="agencyName"
                                                                placeholder='Agency Name'
                                                                value={agencyProfileDetails.agencyName}
                                                                onChange={(event) => handleCreateProfile(event, role)} />
                                                            {
                                                                errors.agencyNameError &&
                                                                <p className="error_productForm">
                                                                    {errors.agencyNameError}
                                                                </p>
                                                            }
                                                        </div>

                                                        <div className="input_with_error">
                                                            <label>Team Strength</label>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                name="agencyTeamSize"
                                                                placeholder='Team Strength'
                                                                value={agencyProfileDetails.agencyTeamSize}
                                                                onChange={(event) => handleCreateProfile(event, role)} />
                                                            {
                                                                errors.agencyTeamSizeError &&
                                                                <p className="error_productForm">
                                                                    {errors.agencyTeamSizeError}
                                                                </p>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="input_with_error">
                                                        <label className={dateClasses.label} id="incorporationLabel" htmlFor='social'>Incorporation Date</label>
                                                        <input
                                                            style={{ width: '39%', paddingLeft: '2.5%', paddingRight: '2%' }}
                                                            id="incorporation_date"
                                                            type="date"
                                                            name="incorporationDate"
                                                            max={new Date().toJSON().slice(0, 10)}
                                                            className={dateClasses.textField}
                                                            onChange={(event) => handleCreateProfile(event, role)} />
                                                        {
                                                            errors.incorporationDateError &&
                                                            <p className="error_productForm">
                                                                {errors.incorporationDateError}
                                                            </p>
                                                        }
                                                    </div>

                                                    <div className="input_with_error">
                                                        <label>Website Url</label>
                                                        <input
                                                            style={{ width: '39%', paddingLeft: '2.5%' }}
                                                            type="text"
                                                            name="website"
                                                            placeholder='Website URL'
                                                            value={site.platformLink}
                                                            onChange={(event) => handleSocialPlatform(event)} />
                                                        {
                                                            errors.socialPlatformDetailsError &&
                                                            <p className="error_productForm">
                                                                {errors.socialPlatformDetailsError}
                                                            </p>
                                                        }
                                                    </div>

                                                    <div>
                                                        <div className="registerParent_onAgency">
                                                            <div className="backRegister_onAgency" onClick={() => backOnForm2()}>
                                                                <p>Back</p>
                                                            </div>
                                                            <div className="nextRegister_onAgency" onClick={() => handleSubmit(role, signupForm)}>
                                                                <p>Submit</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="input_with_error">
                                                        <label>User Designation</label>
                                                        <input
                                                            style={{ width: '39%', paddingLeft: '2.5%' }}
                                                            type="text"
                                                            name="userDesignation"
                                                            placeholder='User Designation'
                                                            onChange={(event) => handleCreateProfile(event, role)} />
                                                        {
                                                            errors.userDesignationError &&
                                                            <p className="error_productForm">
                                                                {errors.userDesignationError}
                                                            </p>
                                                        }
                                                    </div>

                                                    <div className="input_with_error">
                                                        <label>Company Name</label>
                                                        <input
                                                            style={{ width: '39%', paddingLeft: '2.5%' }}
                                                            type="text"
                                                            name="companyName"
                                                            value={clientProfileDetails.companyName}
                                                            placeholder='Company Name'
                                                            onChange={(event) => handleCreateProfile(event, role)} />
                                                        {
                                                            errors.companyNameError &&
                                                            <p className="error_productForm">
                                                                {errors.companyNameError}
                                                            </p>
                                                        }
                                                    </div>
                                                    <div className="input_with_error">
                                                        <label>Website Url</label>
                                                        <input
                                                            style={{ width: '39%', paddingLeft: '2.5%' }}
                                                            type="text"
                                                            name="website"
                                                            placeholder='Website URL'
                                                            value={site.platformLink}
                                                            onChange={(event) => handleSocialPlatform(event)} />
                                                        {
                                                            errors.socialPlatformDetailsError &&
                                                            <p className="error_productForm">
                                                                {errors.socialPlatformDetailsError}
                                                            </p>
                                                        }
                                                    </div>
                                                    <div>
                                                        <div className="registerParent_onClient">
                                                            <div className="backRegister_onClient" onClick={() => backOnForm2()}>
                                                                <p>Back</p>
                                                            </div>
                                                            <div className="nextRegister_onClient" onClick={() => handleSubmit(role, signupForm)}>
                                                                <p>Submit</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                        {/* <div className="input_with_error">
                                            <label>Website Url</label>
                                            <input
                                                style={{ width: '39%', paddingLeft: '2.5%' }}
                                                type="text"
                                                name="website"
                                                placeholder='Website URL'
                                                value={site.platformLink}
                                                onChange={(event) => handleSocialPlatform(event)} />
                                            {
                                                errors.socialPlatformDetailsError &&
                                                <p className="error_productForm">
                                                    {errors.socialPlatformDetailsError}
                                                </p>
                                            }
                                        </div> */}

                    <div className="already_next_register">
                      {/* <div className="next_Register" onClick={() => handleSubmit(role, signupForm)}>
                                                <p>Submit</p>
                                            </div> */}
                      <div className="registerOption">
                        <p>
                          Already have an account?{" "}
                          <span
                            onClick={() =>
                              props.history.push(`/login:${role.toLowerCase()}`)
                            }
                          >
                            Log In
                          </span>
                        </p>
                        <p className="existing_accountText">Step {step} of 4</p>
                      </div>
                    </div>
                  </form>
                  {/* <div className="existing_accountText">
                                        <p>Step {step} of 4</p>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Register;
