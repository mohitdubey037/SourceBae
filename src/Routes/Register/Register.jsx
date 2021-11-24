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
import useIsFirstRender from "../../Utils/useIsFirstRender";
import RegisterClientForm1 from "./ClientRegister/RegisterClientForm1";
import RegisterAgencyForm1 from "./AgencyRegister/RegisterAgencyForm1";
import RegisterAgencyForm2 from "./AgencyRegister/RegisterAgencyForm2";
import RegisterClientForm2 from "./ClientRegister/RegisterClientForm2";
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
  const isFirstRender = useIsFirstRender();
  const dateClasses = dateStyles();
  const [state, setState] = useState("");
  const [errorData, setErrorData] = useState({
    userEmail: true,
    userName: true,
    userPhone: true,
  });

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

  const firstFormErrorValidation = () => {
    const err = {};
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
    if (Object.keys(err).length === 0) return true;
    else return false;
  };

  const handleErrorsValidation = (Role) => {
    const err = {};
    if (Role === "Agency") {
      if (agencyProfileDetails?.agencyName === "") {
        err.agencyNameError = "Agency name is required";
      } else if (agencyProfileDetails?.agencyName.match(/^[0-9]+$/)) {
        err.agencyNameError = "Agency name must be in characters.";
      } else if (agencyProfileDetails?.agencyName.length <= 4) {
        err.agencyNameError = "Agency name must be more than 4 characters.";
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

  const verifyValidation = () => {
    const err = {};
    if (errorData.userEmail === false) {
      err.emailError = "Email already exist";
    }
    if (errorData.userName === false) {
      err.userNameError = "UserName already Exist";
    }
    if (errorData.userPhone === false) {
      err.phoneError = "Phone Number already exist";
    }
    setErrors(err);
    if (Object.keys(err).length === 0) return true;
    else return false;
  };

  useEffect(() => {
    setState(role.toLowerCase());
  }, []);

  useEffect(() => {
    localStorage.setItem("role", state);
    state === "" || state === "agency"
      ? props.history.push("/register:agency")
      : props.history.push("/register:client");
  }, [state]);

  const handleChangeToggle = (name) => {
    setState(name);
    role == "agency" ? <RegisterAgencyForm1 /> : <RegisterClientForm1 />;
  };

  //API call methods
  const verifyInput = (event) => {
    event.preventDefault();
    let { userEmail, userName, userPhone } = signupForm;
    if (firstFormErrorValidation()) {
      instance
        .post(`/api/${role}/auths/verify-signup`, {
          userEmail,
          userName,
          userPhone,
        })
        .then((res) => {
          if (res.userEmail && res.userName && res.userPhone) {
            toggleForms("next");
          } else {
            setErrorData({
              userEmail: res.userEmail,
              userName: res.userName,
              userPhone: res.userPhone,
            });
          }
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (!isFirstRender) verifyValidation();
  }, [errorData]);

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

  useEffect(() => {}, [step, signupForm]);

  useEffect(() => {
    if (token !== null && apiErrors === false) {
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
    if (direction === "next") {
      setStep((prev) => prev + 1);
      let form1 = document.querySelector(".form__1");
      let form2 = document.querySelector(".form__2");
      form1.classList.toggle("hide__form1");
      form1.classList.toggle("display__form1");
      form2.classList.toggle("show__form2");
      form2.classList.toggle("display__form2");
    }
  };

  const backOnForm2 = () => {
    setStep((prev) => prev - 1);
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
                            className={`agencyOrClient as_a_client`}
                          >{` ${roleString}`}</span>
                        </>
                      ) : (
                        <>
                          <span>a</span>
                          <span
                            style={{ fontSize: "25px" }}
                            className={`agencyOrClient as_an_agency`}
                          >{` ${roleString}`}</span>
                        </>
                      )}
                    </h6>
                  </div>
                  {step <= 1 && (
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
                  )}
                </div>
                <div className="client__formsContainer">
                  {role == "agency" || "Agency" ? (
                    <RegisterAgencyForm1
                      step={step}
                      setStep={setStep}
                      setSignupForm={setSignupForm}
                      errors={errors}
                      signupForm={signupForm}
                      setForm={setForm}
                    />
                  ) : (
                    <RegisterClientForm1
                      step={step}
                      setStep={setStep}
                      setSignupForm={setSignupForm}
                      errors={errors}
                      signupForm={signupForm}
                      setForm={setForm}
                    />
                  )}
                  <div className="right_image">
                    <img src={imgRegister} alt="img" />
                  </div>

                  <form autoComplete="off" className="client__form form__2">
                    {role === `Agency` ? (
                        <RegisterAgencyForm2
                          errors={errors}
                          setLinkedIn={setLinkedIn}
                          setSite={setSite}
                          setAgencyProfileDetails={setAgencyProfileDetails}
                          agencyProfileDetails={agencyProfileDetails}
                          site={site}
                          setSite={setSite}
                        />
                    ) : (
                        <RegisterClientForm2
                          errors={errors}
                          setLinkedIn={setLinkedIn}
                          setSite={setSite}
                          setClientProfileDetails={setClientProfileDetails}
                          clientProfileDetails={clientProfileDetails}
                          site={site}
                          setSite={setSite}
                        />
                    )}
                  </form>
                  <div className="already_next_register">
                    {step == 1 ? (
                      <div
                        style={{ width: "15%" }}
                        className={`next_Register ${
                          state === "client"
                            ? "active__buttonclient"
                            : "active_buttonagency"
                        }`}
                        onClick={verifyInput}
                      >
                        <p>NEXT</p>
                      </div>
                    ) : (
                      <div className="navigationButtonsSignup">
                        <div
                          className={`backRegister_onAgency ${
                            state === "client"
                              ? "active__buttonclient"
                              : "active_buttonagency"
                          }`}
                          onClick={() => backOnForm2()}
                        >
                          <p>Back</p>
                        </div>
                        <div
                          className={`next_Register ${
                            state === "client"
                              ? "active__buttonclient"
                              : "active_buttonAgency"
                          }`}
                          onClick={() => handleSubmit(role, signupForm)}
                        >
                          <p>Submit</p>
                        </div>
                      </div>
                    )}
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
                      <p className="existing_accountText">Step {step} of 2</p>
                    </div>
                  </div>
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
