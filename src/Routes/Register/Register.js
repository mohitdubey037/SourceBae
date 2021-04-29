/* eslint-disable react-hooks/exhaustive-deps */
//Imports

import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import logotext from '../../assets/images/SignUp/logotext.svg'
import './register.css'
import colors from '../../Constants/colors'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'


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
        borderRadius: `10px`,
        outline:"none",
        textColor: `gray`,
        marginTop: `1vh`,
        paddingLeft:`4%`,
        paddingTop:`1%`,
        width: `50%`,
        height:`60px`,
        

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: `28vw`,
        color: `gray`,
        border:"none",
        background:"none"
    },
    label: {
        color:`gray`,
    }
}));


const Register = () => {

    //Regular Variables
    const dateClasses = dateStyles();

    let { role } = useParams();
    role = helper.capitalize(helper.cleanParam(role))

    //State Variables
    const [linkedIn, setLinkedIn] = useState({
        platformId: "",
        platformLink: ""
    })

    const [site, setSite] = useState({
        platformId: "",
        platformLink: ""
    })

 
    //#######################//


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

    const [signupFormErrors, setSignupFormErrors] = useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        phoneError: false,
        userNameError: false

    })

    const [profileDetails, setProfileDetails] = useState({
        incorporationDate:new Date().toJSON().slice(0,10),
        socialPlatformDetails:[]
    })

    //#######################//

    //Methods

    const handleCreateProfile = (event) => {
        const { name, value } = event.target
        setProfileDetails(
            {
                ...profileDetails,
                [name]:value
            }
        )

    }


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

    //API call methods
    const signUp = async (role, form) => {

        return new Promise((resolve,reject) => {
            instance.post(`/api/${role}/auths/signup`, form)
            .then(function (response) {
                localStorage.removeItem('Authorization')
                localStorage.setItem('Authorization', `Bearer ${response.accessToken}`)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`
                resolve(1)
                console.log(role)
                if(role==="client")
                    window.location.href = "/client-dashboard"
            })
        })
    }


    const createProfileApi = (Role, api_param_const, createForm) => {

        instance.post(`api/${Role}/${api_param_const}/create`, { ...createForm })
        .then(function (response) {
            window.location.replace("/dashboard")
        })
    }

    const handleSubmit = (Role, Form, createForm) => {

        const apiRole = helper.lowerize(Role)
    
        let signUpPromise = signUp(apiRole, Form)
        Promise.all([signUpPromise])
        .then( ()=> {
            let api_param_const = ``
            let api_create_form = createForm
            if (apiRole === `client`)
                api_param_const = `clients`
            else if (apiRole === `agency`){
                api_param_const = `agencies`
                api_create_form = {
                    "stepsCompleted": 1,
                    ...createForm
                }
                
            if(localStorage.getItem('Authorization') !== null && localStorage.getItem('Authorization') !== undefined)

            {
                instance.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');
                createProfileApi(apiRole, api_param_const, api_create_form)
            }
    
            else{
                toast.error("Token not set",{autoClose: 2000})
            }
            }
        })
    }


    const [step, setStep] = useState(1)


    //Methods

    const createRoleString = (role) => {

        role = role.charAt(0).toUpperCase() + role.slice(1)
        if (role === 'Agency')
            return `an ${role}`
        else
            return `a ${role}`
    }


    const toggleForms = direction => {


        if (direction === 'next') {
            setStep(prev => prev + 1)
            if (!signupForm.firstName)
                setSignupFormErrors({
                    ...signupFormErrors,
                    firstnameError: true
                })
            else if (!signupForm.lastName)
                setSignupFormErrors({
                    ...signupFormErrors,
                    lastnameError: true
                })
            else if (!signupForm.userEmail)
                setSignupFormErrors({
                    ...signupFormErrors,
                    emailError: true
                })

            else if (!signupForm.userPhone)
                setSignupFormErrors({
                    ...signupFormErrors,
                    passwordError: true
                })

            else if (!signupForm.password)
                setSignupFormErrors({
                    ...signupFormErrors,
                    passwordError: true
                })
            else{
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

    //#########################//

    useEffect(()=>{
        setProfileDetails({
            ...profileDetails,
            socialPlatformDetails:[site]
            
        })
    },[linkedIn,site])

    useEffect(()=>{
        localStorage.removeItem(`Authorization`)
    },[])

    const roleString = createRoleString(role)
    return (
        <div className='client__registrationContainer'>
            <div className="image__container">
                {/* <img src = {bgimage} alt="" className = 'background__image'/> */}
                <img src={logotext} alt="" />
            </div>

            <div style={{ flex: .37 }}>
            </div>

            <div style={{ flex: .63 }}>
                <div className='form__area'>

                    <div className="client__form">
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '10%' }}>
                            <div className="form__title"><h6>Register as {roleString}</h6></div>
                            <div className="title__subtext"><p>For the purpose of industry regulation, your details <br /> are required</p></div>
                        </div>

                        <div className="client__formsContainer">

                            <form className='client__form form__1' autoComplete='off' >
                                {/* <label htmlFor='firstName'>Your firstname *</label> */}
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder='First Name'
                                    onChange={(e) => setForm(e)}
                                    style={{
                                        border: signupFormErrors.firstNameError ? '2px solid red' : '1px solid gray',
                                        transition: '.3s ease'
                                    }}
                                />

                                {/* <label htmlFor='name'>Your lastname *</label> */}
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder='Last Name'
                                    onChange={(e) => setForm(e)}
                                    style={{
                                        border: signupFormErrors.lastNameError ? '2px solid red' : '1px solid gray',
                                        transition: '.3s ease'
                                    }}
                                />

                                {/* <label htmlFor='name'>Username *</label> */}
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder='Username'
                                    onChange={(e) => setForm(e)}
                                    style={{
                                        border: signupFormErrors.userNameError ? '2px solid red' : '1px solid gray',
                                        transition: '.3s ease'
                                    }}
                                />

                                {/* <label htmlFor='email'>Email Address *</label> */}
                                <input
                                    type="text"
                                    name="userEmail"
                                    placeholder='Email'
                                    onChange={(e) => setForm(e)}
                                    style={{
                                        border: signupFormErrors.emailError ? '2px solid red' : '1px solid gray',
                                        transition: '.3s ease'
                                    }}
                                />

                                {/* <label htmlFor='phone'>Phone No *</label> */}
                                <input
                                    type="text"
                                    name="userPhone"
                                    placeholder='Phone No'
                                    onChange={(e) => setForm(e)}
                                    style={{
                                        border: signupFormErrors.phoneError ? '2px solid red' : '1px solid gray',
                                        transition: '.3s ease'
                                    }}
                                />

                                {/* <label htmlFor='password'>Create Password*</label> */}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Create Password'
                                    onChange={(e) => setForm(e)}
                                    style={{
                                        border: signupFormErrors.passworderror ? '2px solid red' : '1px solid gray',
                                        transition: '.3s ease'
                                    }}
                                />


                                <Button
                                    onClick={() => toggleForms('next')}
                                    style={{ background: colors.PRIMARY_COLOR, marginTop: '5vh', color: colors.WHITE, height: '60px', fontFamily: 'Poppins', fontSize: '1.2rem', width: '50%', borderRadius: '8px' }}
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
                                        {/* <label htmlFor='agencyName'>{role} Name</label> */}
                                        <input
                                            type="text"
                                            name="agencyName"
                                            placeholder='Agency Name'
                                            onChange={(event) => handleCreateProfile(event)} />

                                        {/* <label htmlFor='social'>Team Strength</label> */}
                                        <input
                                            type="number"
                                            name="agencyTeamSize"
                                            placeholder='Team Strength'
                                            onChange={(event) => handleCreateProfile(event)} />


                                        
                                        <form className={dateClasses.container} noValidate>
                                            <label classname = {dateClasses.label} id ="incorporationLabel" htmlFor='social'>Incorporation Date</label>
                                            <input
                                                id="incorporation_date"
                                                type="date"
                                                // label="Birthday"
                                                name="incorporationDate"
                                                defaultValue={profileDetails?.incorporationDate}
                                                value={profileDetails?.incorporationDate}
                                                className={dateClasses.textField}
                                                placeholder = {`Incorporation Date`}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(event) => handleCreateProfile(event)} />
                                        </form>
                                       
                                    </>
                                        :
                                        <>
                                            {/* <label htmlFor='desig'>{role} Name</label> */}

                                            <input type="text" name="userDesignation" placeholder='User Designation'  onChange={(event) => handleCreateProfile(event)} />

                                            {/* <label htmlFor='company'>{role} Location</label> */}
                                            <input type="text" name="companyName" placeholder='Company Name' onChange={(event) => handleCreateProfile(event)} />

                                        </>

                                }


                                {/* <label htmlFor='website'>Website</label> */}
                                <input type="text" name="website" id="606d4fb838ce8802aa8f3b5f" placeholder='Website URL' value={site.platformLink} onChange={(event) => handleSocialPlatform(event)} />

                                <Button
                                    onClick={()=>handleSubmit(role, signupForm, profileDetails)}
                                    style={{ background: colors.PRIMARY_COLOR, marginTop: '5vh', color: colors.WHITE, height: '60px', fontFamily: 'Poppins', fontSize: '1.2rem', width: '50%', borderRadius: '8px', marginBottom: '5%' }}
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
            </div>
        </div>
    )
}


export default (Register)
