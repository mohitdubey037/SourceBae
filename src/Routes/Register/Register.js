/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './register.css'
import { useParams } from 'react-router'
import logotext from '../../assets/images/Logo/logo.png'
import business from '../../assets/images/Logo/sspp.png'
import colors from '../../Constants/colors'
import { makeStyles, withStyles, FormGroup, Switch, Grid, Typography, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"
import { toast } from 'react-toastify'
import Spinner from '../../Components/Spinner/Spinner';
import cookie from "react-cookies";

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 78,
        height: 26,
        padding: 0,
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

const dateStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        border: `1px solid lightgrey`,
        color: `gray`,
        borderRadius: `10px`,
        outline: "none",
        textColor: `gray`,
        marginTop: `1%`,
        // marginBottom: `1%`,
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
        background: "none"
    },
    label: {
        color: `gray`,
    }
}));

const Register = (props) => {
    //Regular Variables
    const dateClasses = dateStyles();
    const [state, setState] = React.useState({
        checked: JSON.parse(localStorage.getItem("toggle")) || false
    });
    const [token, setToken] = useState(null);
    let { role } = useParams();
    role = helper.capitalize(helper.cleanParam(role))

    if (!(role === "Agency" || role === "Client"))
        props.history.push("/page-not-found")

    //Social Media State Variables
    const [linkedIn, setLinkedIn] = useState({
        platformId: "",
        platformLink: ""
    })

    const [site, setSite] = useState({
        platformId: "",
        platformLink: ""
    })

    const [loading, setLoading] = useState(false);

    //Client state varaibles//
    const [signupForm, setSignupForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        countryCode: "+91",
        password: ""
    })

    //Agency Profile state variables//
    const [agencyProfileDetails, setAgencyProfileDetails] = useState({
        agencyName: '',
        agencyTeamSize: '',
        incorporationDate: new Date().toJSON().slice(0, 10),
        socialPlatformDetails: []
    })

    //Client Profile state varaibles//
    const [clientProfileDetails, setClientProfileDetails] = useState({
        userDesignation: "",
        companyName: "",
        socialPlatformDetails: []
    })

    const [errors, setErrors] = useState({})

    const [step, setStep] = useState(1)

    const handleSocialPlatform = (event) => {
        const { name, value } = event.target
        if (name === "linkedIn") {
            setLinkedIn({
                platformName: name,
                platformLink: value
            })
        }
        else if (name === "website") {
            setSite({
                platformName: name,
                platformLink: value
            })
        }
    }

    const setForm = (event) => {
        const { name, value } = event.target
        setSignupForm(
            {
                ...signupForm,
                [name]: value
            }
        )
    }

    const handleCreateProfile = (event, role) => {
        let { name, value } = event.target

        if (role === "Agency") {
            setAgencyProfileDetails(
                {
                    ...agencyProfileDetails,
                    [name]: value
                }
            )
        }
        else if (role === "Client")
            setClientProfileDetails(
                {
                    ...clientProfileDetails,
                    [name]: value
                }
            )
    }

    const handleErrorsValidation = (Role) => {
        const err = {}
        if (Role === "Agency") {
            if (agencyProfileDetails?.agencyName === "") {
                err.agencyNameError = 'Agency name is required'
            }
            else if (agencyProfileDetails?.agencyName.length < 2) {
                err.agencyNameError = 'Agency name must be between 2 characters.'
            }
            else if (agencyProfileDetails?.agencyTeamSize === '') {
                err.agencyTeamSizeError = 'Team strength is required'
            }
            else if (agencyProfileDetails?.agencyTeamSize !== " " && +agencyProfileDetails?.agencyTeamSize <= 0) {
                err.agencyTeamSizeError = 'Team strength must be greater than 0'
            }
            else if (agencyProfileDetails?.socialPlatformDetails.length === 0) {
                err.socialPlatformDetailsError = 'Website url is required'
            }
            else if (agencyProfileDetails?.socialPlatformDetails?.length > 0 && agencyProfileDetails?.socialPlatformDetails[0]?.platformLink === "") {

                err.socialPlatformDetailsError = 'Website url is required'
            }
            else if (!helper.validateLink(agencyProfileDetails?.socialPlatformDetails[0]?.platformLink)) {
                err.socialPlatformDetailsError = 'Invalid link provided.'
            }
            setErrors(err);
            if (Object.keys(err).length === 0)
                return true
            else
                return false
        }

        else if (Role === "Client") {
            if (clientProfileDetails.userDesignation === "") {
                err.userDesignationError = 'User Designation Field is required'
            }
            else if (clientProfileDetails.userDesignation.length < 2) {
                err.userDesignationError = 'User Designation must be between 2 characters.'
            }
            else if (clientProfileDetails.companyName === "") {
                err.companyNameError = 'Company Name Field is required'
            }
            else if (clientProfileDetails.companyName.length < 2) {
                err.companyNameError = 'Company Name must be between 2 characters.'
            }
            else if (clientProfileDetails.socialPlatformDetails[0].platformLink === "") {
                err.socialPlatformDetailsError = 'Website url is required'
            }
            else if (!helper.validateLink(clientProfileDetails?.socialPlatformDetails[0]?.platformLink)) {
                err.socialPlatformDetailsError = 'Invalid link provided.'
            }
            setErrors(err);
            if (Object.keys(err).length === 0)
                return true
            else
                return false
        }
    }

    useEffect(() => {
        localStorage.setItem('toggle', state.checked);
        state.checked === false ? props.history.push('/register:agency') : props.history.push('/register:client');
    }, [state]);

    const handleChangeToggle = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    };

    //API call methods
    const signUpApi = async (role, form) => {
        return new Promise((resolve, reject) => {
            instance.post(`/api/${role}/auths/signup`, form)
                .then(function (response) {
                    cookie.save(
                        "Authorization",
                        `Bearer ${response.accessToken}`,
                        { path: '/' }
                    );
                    setToken(cookie.load("Authorization"))
                    localStorage.setItem("role", role);
                    localStorage.setItem("userId", `${response._id}`);
                })
        })
    }

    const createProfileApi = (Role, api_param_const, createForm) => {
        setLoading(true);
        instance.post(`api/${Role}/${api_param_const}/create`, { ...createForm })
            .then(function (response) {
                if (role.toLowerCase() === "client") {
                    props.history.push('/client-dashboard');
                    setLoading(false);
                }
                else if (role.toLowerCase() === "agency") {
                    props.history.push('/dashboard');;
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }

    const handleSubmit = (Role, Form) => {
        if (handleErrorsValidation(Role)) {
            signUpApi(Role, Form)
        }
    }

    useEffect(() => {
        if (token !== null) {
            const apiRole = helper.lowerize(role)
            let api_param_const = ``
            let api_create_form = {}
            if (apiRole === `client`) {
                api_param_const = `clients`
                api_create_form = {
                    "stepsCompleted": 1,
                    ...clientProfileDetails
                }
            }
            else if (apiRole === `agency`) {
                api_param_const = `agencies`
                api_create_form = {
                    "stepsCompleted": 1,
                    ...agencyProfileDetails
                }
            }
            if (token !== null) {
                instance.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                createProfileApi(apiRole, api_param_const, api_create_form)
            }
            else {
                toast.error("Token not set", { autoClose: 2000 })
            }
        }
    }, [token])

    const createRoleString = (role) => {
        role = role.charAt(0).toUpperCase() + role.slice(1)
        if (role === 'Agency')
            return `an ${role}`
        else
            return `a ${role}`
    }

    const toggleForms = (direction) => {
        const err = {}
        if (direction === 'next') {
            setStep(prev => prev + 1)
            if (signupForm.firstName === "") {
                err.firstNameError = 'First name is required.'
            }

            else if (signupForm.firstName.length < 2 || signupForm.firstName.length > 12) {
                err.firstNameError = 'First name must be between 2-12 characters.'
            }

            else if (signupForm.lastName === "") {
                err.lastNameError = 'Last name is required.'
            }

            else if (signupForm.lastName.length < 2 || signupForm.lastName.length > 12) {
                err.lastNameError = 'Last name must be between 2-12 characters.'
            }

            else if (signupForm.userName === "") {
                err.userNameError = 'User name is required.'
            }

            else if (/\S+@\S+\.\S+/.test(signupForm.userName)) {
                err.userNameError = 'User name should be only alphanumeric.'
            }

            else if (signupForm.userName.length < 3 || signupForm.userName.length > 50) {
                err.userNameError = "User name must be between 2-50 characters."
            }

            else if (signupForm.userEmail === "") {
                err.emailError = 'Email is required.'
            }

            else if (!/\S+@\S+\.\S+/.test(signupForm.userEmail)) {
                err.emailError = "Invalid email address."
            }

            else if (signupForm.userPhone === "") {
                err.phoneError = "Phone is required."
            }

            else if (signupForm.userPhone.match(/[^0-9]/g)) {
                err.phoneError = "Phone number must be digit."
            }

            else if (signupForm.userPhone.length < 10) {
                err.phoneError = "Phone must be of 10 digits."
            }

            else if (signupForm.password === "") {
                err.passwordError = "Password is required."
            }

            else if (signupForm.password.length < 6) {
                err.passwordError = "Password must be 8 characters in length."
            }
            else if (signupForm.password.length > 64) {
                err.passwordError = "Password cannot be more than 64 characters in length."
            }

            setErrors(err);
            if (Object.keys(err).length === 0) {
                let form1 = document.querySelector('.form__1')
                let form2 = document.querySelector('.form__2')
                form1.classList.toggle('hide__form1')
                form2.classList.toggle('show__form2')
            }
            else {
                return false
            }
        }

        else {
            let form1 = document.querySelector('.form__1')
            let form2 = document.querySelector('.form__2')
            form1.classList.toggle('hide__form1')
            form2.classList.toggle('show__form2')
            setStep(prev => prev - 1)
        }
    }

    //============= USE-EFFECT HOOKS============//

    useEffect(() => {
        if (role === "Agency")
            setAgencyProfileDetails({
                ...agencyProfileDetails,
                socialPlatformDetails: [site]
            })
        else if (role === "Client")
            setClientProfileDetails({
                ...clientProfileDetails,
                socialPlatformDetails: [site]
            })
    }, [linkedIn, site])


    //__________ USE-EFFECT ENDS ______//

    const roleString = createRoleString(role)
    return (
        <div className='client__registrationContainer'>
            <div className="image__container">
                <img className="hamaraLogo" src={logotext} alt="" />
                <img className="businessModals" src={business} alt="" />
            </div>

            <div style={{ flex: .35 }}>
            </div>
            <div style={{ flex: .65 }}>

                {loading ? <Spinner /> :
                    <div className='form__area'>
                        <div className="client__form">
                            <div style={{ width: '100%', textAlign: 'center', marginTop: '5%' }}>
                                <div className="toggleButton">
                                    <FormGroup>
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
                                <div className="form__title"><h6>Register as <span> {roleString} </span></h6></div>
                                <div className="title__subtext"><p>For the purpose of industry regulation, your details are required</p></div>
                            </div>
                            <div className="signUpOption">
                                <p>Already have an account? <span onClick={() => window.location.href = `/login:${role.toLowerCase()}`}>Log In</span></p>
                            </div>
                            <div className="client__formsContainer">
                                <form className='client__form form__1' autoComplete='off' >
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        placeholder='First Name'
                                        value={signupForm.firstName}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {errors.firstNameError && <Alert severity="error">{errors.firstNameError}</Alert>}

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder='Last Name'
                                        value={signupForm.lastName}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {errors.lastNameError && <Alert severity="error">{errors.lastNameError}</Alert>}

                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder='Username'
                                        value={signupForm.userName}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {errors.userNameError && <Alert severity="error">{errors.userNameError}</Alert>}

                                    <input
                                        type="email"
                                        name="userEmail"
                                        placeholder='Email'
                                        value={signupForm.userEmail}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {errors.emailError && <Alert severity="error">{errors.emailError}</Alert>}

                                    <input
                                        type="tel"
                                        name="userPhone"
                                        maxLength='10'
                                        placeholder='Phone No'
                                        value={signupForm.userPhone}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {errors.phoneError && <Alert severity="error">{errors.phoneError}</Alert>}

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='Create Password'
                                        value={signupForm.password}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {errors.passwordError && <Alert severity="error">{errors.passwordError}</Alert>}

                                    <Button
                                        onClick={() => toggleForms('next')}
                                        style={{ background: '#02044a', marginTop: '5vh', marginBottom: '5vh', color: colors.WHITE, height: '60px', fontFamily: 'Poppins', fontSize: '1.2rem', width: '60%', borderRadius: '8px' }}
                                    >
                                        NEXT
                                    </Button>
                                </form>

                                <form autoComplete='off' className="client__form form__2">
                                    <div style={{ width: '80%' }}>
                                        <Button
                                            onClick={() => toggleForms('prev')}
                                            style={{ background: 'none', border: 'none' }}
                                        >
                                            <i className='fa fa-arrow-left' style={{ fontSize: '1.2rem' }}></i>
                                        </Button>
                                    </div>

                                    {
                                        role === `Agency` ? <>
                                            <input
                                                type="text"
                                                name="agencyName"
                                                placeholder='Agency Name'
                                                value={agencyProfileDetails.agencyName}
                                                onChange={(event) => handleCreateProfile(event, role)} />
                                            {errors.agencyNameError && <Alert severity="error">{errors.agencyNameError}</Alert>}

                                            <input
                                                type="number"
                                                name="agencyTeamSize"
                                                placeholder='Team Strength'

                                                onChange={(event) => handleCreateProfile(event, role)} />
                                            {errors.agencyTeamSizeError && <Alert severity="error">{errors.agencyTeamSizeError}</Alert>}

                                            <form className={dateClasses.container} noValidate>
                                                <label classname={dateClasses.label} id="incorporationLabel" htmlFor='social'>Incorporation Date</label>
                                                <input
                                                    id="incorporation_date"
                                                    type="date"
                                                    name="incorporationDate"
                                                    max={new Date().toJSON().slice(0, 10)}
                                                    defaultValue={agencyProfileDetails?.incorporationDate}
                                                    value={agencyProfileDetails?.incorporationDate}
                                                    className={dateClasses.textField}
                                                    placeholder={`Incorporation Date`}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={(event) => handleCreateProfile(event, role)} />
                                            </form>
                                            {errors.incorporationDateError && <Alert severity="error">{errors.incorporationDateError}</Alert>}
                                        </>
                                            :
                                            <>
                                                <input type="text" name="userDesignation" placeholder='User Designation' onChange={(event) => handleCreateProfile(event, role)} />
                                                {errors.userDesignationError && <Alert severity="error">{errors.userDesignationError}</Alert>}

                                                <input type="text" name="companyName" placeholder='Company Name' onChange={(event) => handleCreateProfile(event, role)} />
                                                {errors.companyNameError && <Alert severity="error">{errors.companyNameError}</Alert>}
                                            </>
                                    }

                                    <input style={{ marginTop: '3%' }} type="text" name="website" placeholder='Website URL' value={site.platformLink} onChange={(event) => handleSocialPlatform(event)} />
                                    {errors.socialPlatformDetailsError && <Alert severity="error">{errors.socialPlatformDetailsError}</Alert>}

                                    <Button
                                        onClick={() => handleSubmit(role, signupForm)}
                                        style={{ background: '#02044a', marginTop: '5vh', color: colors.WHITE, height: '60px', fontFamily: 'Poppins', fontSize: '1.2rem', width: '50%', borderRadius: '8px', marginBottom: '5%' }}
                                    >
                                        SUBMIT
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <div className="existing_accountText">
                            <p>Personal Info</p>
                            <p>Step {step} of 4</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default (Register)
