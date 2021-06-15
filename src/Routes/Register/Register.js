/* eslint-disable react-hooks/exhaustive-deps */
//Imports

import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import logotext from '../../assets/images/Logo/logo.png'
import bgImage from '../../assets/images/Logo/bgImage.jpg'
import business from '../../assets/images/Logo/sspp.png'
import growth from '../../assets/images/Logo/growthImage.svg'
import './register.css'
import colors from '../../Constants/colors'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import Spinner from '../../Components/Spinner/Spinner';

// Axios Import
import instance from "../../Constants/axiosConstants"
import * as helper from "../../shared/helper"
import { toast } from 'react-toastify'

//Future Imports
// Step , StepLabel , Stepper , Typography , StepContent , InputLabel , FormControl , TextField , Select , Input , MenuItem

const dateStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        border: `1px solid gray`,
        color: `gray`,
        borderRadius: `10px`,
        outline: "none",
        textColor: `gray`,
        marginTop: `1vh`,
        paddingLeft: `4%`,
        paddingTop: `1%`,
        width: `50%`,
        height: `60px`,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: `28vw`,
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

    let { role } = useParams();
    role = helper.capitalize(helper.cleanParam(role))

    if (!(role === "Agency" || role === "Client"))
        window.location.href = "/page-not-found"

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
        teamStrength: '',
        incorporationDate: new Date().toJSON().slice(0, 10),
        socialPlatformDetails: []
    })

    //Client Profile state varaibles//
    const [clientProfileDetails, setClientProfileDetails] = useState({
        userDesignation: "",
        companyName: "",
        socialPlatformDetails: []
    })

    //SignUp Error state varaible//
    const [signupFormErrors, setSignupFormErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: '',
        phoneError: '',
        userNameError: ''
    })

    //Profile Creation Errors state varaibles//
    const [profileDetailsErrors, setProfileDetailsErrors] = useState({
        agencyNameError: '',
        teamStrengthError: '',
        incorporationDateError: '',
        socialPlatformDetailsError: '',
        userDesignationError: '',
        companyNameError: '',
    })

    //_______ VARIABLES END ________//


    //========= FUNCTIONS =========//


    // Event Handlers


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
        const { name, value } = event.target
        if (role === "Agency")
            setAgencyProfileDetails(
                {
                    ...agencyProfileDetails,
                    [name]: value
                }
            )
        else if (role === "Client")
            setClientProfileDetails(
                {
                    ...clientProfileDetails,
                    [name]: value
                }
            )

    }


    const handleErrorsValidation = (Role) => {

        //this object is for resetting all the errors value to empty before adding a one
        let tempProfileDetails = {
            agencyNameError: '',
            teamStrengthError: '',
            incorporationDateError: '',
            socialPlatformDetailsError: '',
            userDesignationError: '',
            companyNameError: '',
        }

        if (Role === "Agency") {
            if (agencyProfileDetails.agencyName === "") {
                setProfileDetailsErrors(
                    {
                        ...tempProfileDetails,
                        agencyNameError: 'Agency name is required',
                    }
                )
            }
            else if (agencyProfileDetails.agencyName.length < 2) {
                setProfileDetailsErrors(
                    {
                        ...tempProfileDetails,
                        agencyNameError: "Agency name must be between 2 characters.",
                    }
                )
            }
            else if (agencyProfileDetails.agencyTeamSize === "") {
                setProfileDetailsErrors(
                    {
                        ...tempProfileDetails,
                        teamStrengthError: 'Team strength is required',
                    }
                )
            }
            else if (!helper.validateLink(agencyProfileDetails?.socialPlatformDetails[0]?.platformLink)) {
                setProfileDetailsErrors({
                    ...tempProfileDetails,
                    socialPlatformDetailsError: 'Invalid link provided.',
                })
            }
            else {
                return true
            }
            return false
        }
        else if (Role === "Client") {
            if (clientProfileDetails.userDesignation === "") {
                setProfileDetailsErrors(
                    {
                        ...tempProfileDetails,
                        userDesignationError: 'User Designation Field is required',
                    }
                )
            }
            else if (clientProfileDetails.userDesignation.length < 2) {
                setProfileDetailsErrors(
                    {
                        ...tempProfileDetails,
                        userDesignationError: "User Designation must be between 2 characters.",
                    }
                )
            }
            else if (clientProfileDetails.companyName === "") {
                setProfileDetailsErrors(
                    {
                        ...tempProfileDetails,
                        companyNameError: 'Company Name Field is required',
                    }
                )
            }
            else if (clientProfileDetails.companyName.length < 2) {
                setProfileDetailsErrors(
                    {
                        ...tempProfileDetails,
                        agencyNameError: "Company Name must be between 2 characters.",
                    }
                )
            }
            else if (!helper.validateLink(clientProfileDetails?.socialPlatformDetails[0]?.platformLink)) {
                setProfileDetailsErrors({
                    ...tempProfileDetails,
                    socialPlatformDetailsError: 'Invalid link provided.',
                })
            }
            else {
                return true
            }
            return false
        }
    }

    //API call methods
    const signUpApi = async (role, form) => {

        return new Promise((resolve, reject) => {
            instance.post(`/api/${role}/auths/signup`, form)
                .then(function (response) {
                    alert(response._id)
                    localStorage.setItem("userId", response._id)
                    localStorage.removeItem('Authorization')
                    localStorage.setItem('Authorization', `Bearer ${response.accessToken}`)
                    localStorage.setItem('role', role)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`
                    resolve(1)

                })
        })
    }

    const createProfileApi = (Role, api_param_const, createForm) => {
        setLoading(true);
        instance.post(`api/${Role}/${api_param_const}/create`, { ...createForm })
            .then(function (response) {
                console.log(role)
                if (role === "Client") {
                    // window.location.href = "/client-dashboard"
                    props.history.push('/client-dashboard')
                    setLoading(false);
                }
                else if (role === "Agency") {
                    // window.location.replace("/dashboard")
                    props.history.push('/dashboard');
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false)
            })
    }


    const handleSubmit = (Role, Form, createAgencyForm, createClientForm) => {

        if (handleErrorsValidation(Role)) {
            const apiRole = helper.lowerize(Role)
            let signUpPromise = signUpApi(apiRole, Form)
            Promise.all([signUpPromise])
                .then(() => {
                    let api_param_const = ``
                    let api_create_form = {}
                    if (apiRole === `client`) {
                        api_param_const = `clients`
                        api_create_form = {
                            "stepsCompleted": 1,
                            ...createClientForm
                        }
                    }
                    else if (apiRole === `agency`) {
                        api_param_const = `agencies`
                        api_create_form = {
                            "stepsCompleted": 1,
                            ...createAgencyForm
                        }
                    }


                    if (localStorage.getItem('Authorization') !== null && localStorage.getItem('Authorization') !== undefined) {
                        instance.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                        createProfileApi(apiRole, api_param_const, api_create_form)
                    }

                    else {
                        toast.error("Token not set", { autoClose: 2000 })
                    }

                })
        }
    }


    const [step, setStep] = useState(1)


    //Helper Methods

    const createRoleString = (role) => {

        role = role.charAt(0).toUpperCase() + role.slice(1)
        if (role === 'Agency')
            return `an ${role}`
        else
            return `a ${role}`
    }


    const toggleForms = (direction) => {


        if (direction === 'next') {
            setStep(prev => prev + 1)
            if (signupForm.firstName === "") {
                setSignupFormErrors(
                    {
                        firstNameError: "First name is required.",
                        lastNameError: '',
                        emailError: '',
                        passwordError: '',
                        phoneError: '',
                        userNameError: '',
                    }
                )
            }
            else if (signupForm.firstName.length < 2 || signupForm.firstName.length > 12) {
                setSignupFormErrors(
                    {
                        firstNameError: "First name must be between 2-12 characters.",
                        lastNameError: '',
                        emailError: '',
                        passwordError: '',
                        phoneError: '',
                        userNameError: '',
                    }
                )
            }
            else if (signupForm.lastName === "") {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "Last name is required.",
                        emailError: '',
                        passwordError: '',
                        phoneError: '',
                        userNameError: '',
                    }
                )
            }
            else if (signupForm.lastName.length < 2 || signupForm.lastName.length > 12) {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "Last name must be between 2-12 characters.",
                        emailError: '',
                        passwordError: '',
                        phoneError: '',
                        userNameError: '',
                    }
                )
            }
            else if (signupForm.userName === "") {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: '',
                        passwordError: '',
                        phoneError: '',
                        userNameError: "User name is required."
                    }
                )
            }
            else if (signupForm.userName.length < 3 || signupForm.userName.length > 12) {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: '',
                        passwordError: '',
                        phoneError: '',
                        userNameError: "User name must be between 2-12 characters."
                    }
                )
            }
            else if (signupForm.userEmail === "") {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: "Email is required.",
                        passwordError: '',
                        phoneError: '',
                        userNameError: ""
                    }
                )
            }
            else if (!/\S+@\S+\.\S+/.test(signupForm.userEmail)) {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: "Invalid email address.",
                        passwordError: '',
                        phoneError: '',
                        userNameError: ""
                    }
                )
            }
            else if (signupForm.userPhone === "") {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: "",
                        passwordError: '',
                        phoneError: "Phone is required.",
                        userNameError: ""
                    }
                )
            }
            else if (signupForm.userPhone.match(/[^0-9]/g)) {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: "",
                        passwordError: '',
                        phoneError: "Phone number must be digit.",
                        userNameError: ""
                    }
                )
            }
            else if (signupForm.userPhone.length < 10) {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: "",
                        passwordError: '',
                        phoneError: "Phone must be of 10 digits.",
                        userNameError: ""
                    }
                )
            }
            else if (signupForm.password === "") {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: "",
                        passwordError: "Password is required.",
                        phoneError: "",
                        userNameError: ""
                    }
                )
            }
            else if (signupForm.password < 6) {
                setSignupFormErrors(
                    {
                        firstNameError: "",
                        lastNameError: "",
                        emailError: "",
                        passwordError: "Password must be more than 6 characters.",
                        phoneError: "",
                        userNameError: ""
                    }
                )
            }
            else {
                let form1 = document.querySelector('.form__1')
                let form2 = document.querySelector('.form__2')
                form1.classList.toggle('hide__form1')
                form2.classList.toggle('show__form2')
                // setStep(prev => prev + 1)
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

    //__________ METHODS END____________//


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

    useEffect(() => {
        localStorage.removeItem(`Authorization`)
    }, [])

    //__________ USE-EFFECT ENDS ______//

    const roleString = createRoleString(role)
    return (
        <div className='client__registrationContainer'>
            <div className="image__container">
                {/* <img src = {bgimage} alt="" className = 'background__image'/> */}
                <img className="hamaraLogo" src={logotext} alt="" />
                {/* <img className="bgImage" src={bgImage} alt="" /> */}
                {/* <div className="abigcircle"></div> */}
                <img className="businessModals" src={business} alt="" />

            </div>

            <div style={{ flex: .35 }}>

            </div>

            <div style={{ flex: .65 }}>
                {loading ? <Spinner /> :
                    <div className='form__area'>
                        {/* <div className="logoPart">
                        <img src={logotext} alt="" />
                    </div> */}
                        <div className="client__form">
                            <div style={{ width: '100%', textAlign: 'center', marginTop: '5%' }}>
                                <div className="form__title"><h6>Register as <span> {roleString} </span></h6></div>
                                <div className="title__subtext"><p>For the purpose of industry regulation, your details are required</p></div>
                            </div>

                            <div className="client__formsContainer">

                                <form className='client__form form__1' autoComplete='off' >
                                    {/* <label htmlFor='firstName'>Your firstname *</label> */}
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        placeholder='First Name'
                                        value={signupForm.firstName}
                                        onChange={(e) => setForm(e)}
                                    // style={{
                                    //     border: signupFormErrors.firstNameError ? '2px solid red' : '1px solid gray',
                                    //     transition: '.3s ease'
                                    // }}
                                    />
                                    {signupFormErrors.firstNameError !== "" ? <Alert severity="error">{signupFormErrors.firstNameError}</Alert> : ''}
                                    {/* <label htmlFor='name'>Your lastname *</label> */}
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder='Last Name'
                                        value={signupForm.lastName}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {signupFormErrors.lastNameError !== "" && <Alert severity="error">{signupFormErrors.lastNameError}</Alert>}

                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder='Username'
                                        value={signupForm.userName}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {signupFormErrors.userNameError !== "" && <Alert severity="error">{signupFormErrors.userNameError}</Alert>}

                                    <input
                                        type="email"
                                        name="userEmail"
                                        placeholder='Email'
                                        value={signupForm.userEmail}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {signupFormErrors.emailError !== "" && <Alert severity="error">{signupFormErrors.emailError}</Alert>}

                                    <input
                                        type="tel"
                                        name="userPhone"
                                        maxLength='10'
                                        placeholder='Phone No'
                                        value={signupForm.userPhone}
                                        onChange={(e) => setForm(e)}
                                    />

                                    {signupFormErrors.phoneError !== "" && <Alert severity="error">{signupFormErrors.phoneError}</Alert>}

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder='Create Password'
                                        value={signupForm.password}
                                        onChange={(e) => setForm(e)}
                                    />
                                    {signupFormErrors.passwordError !== "" && <Alert severity="error">{signupFormErrors.passwordError}</Alert>}


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

                                            {profileDetailsErrors.agencyNameError !== "" && <Alert severity="error">{profileDetailsErrors.agencyNameError}</Alert>}

                                            <input
                                                type="number"
                                                name="agencyTeamSize"
                                                placeholder='Team Strength'

                                                onChange={(event) => handleCreateProfile(event, role)} />

                                            {profileDetailsErrors.teamStrengthError !== "" && <Alert severity="error">{profileDetailsErrors.teamStrengthError}</Alert>}

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
                                            {profileDetailsErrors.incorporationDateError !== "" && <Alert severity="error">{profileDetailsErrors.incorporationDateError}</Alert>}
                                        </>
                                            :
                                            <>

                                                <input type="text" name="userDesignation" placeholder='User Designation' onChange={(event) => handleCreateProfile(event, role)} />
                                                {profileDetailsErrors.userDesignationError !== "" && <Alert severity="error">{profileDetailsErrors.userDesignationError}</Alert>}
                                                <input type="text" name="companyName" placeholder='Company Name' onChange={(event) => handleCreateProfile(event, role)} />
                                                {profileDetailsErrors.companyNameError !== "" && <Alert severity="error">{profileDetailsErrors.companyNameError}</Alert>}

                                            </>

                                    }

                                    <input type="text" name="website" placeholder='Website URL' value={site.platformLink} onChange={(event) => handleSocialPlatform(event)} />
                                    {profileDetailsErrors.socialPlatformDetailsError !== "" && <Alert severity="error">{profileDetailsErrors.socialPlatformDetailsError}</Alert>}

                                    <Button
                                        onClick={() => handleSubmit(role, signupForm, agencyProfileDetails, clientProfileDetails)}
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
