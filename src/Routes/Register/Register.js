/* eslint-disable react-hooks/exhaustive-deps */
//Imports

import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import logotext from '../../assets/images/SignUp/logotext.svg'
import './register.css'
import colors from '../../Constants/colors'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



// Axios Import
import instance from "../../Constants/axiosConstants"

//Future Imports
// Step , StepLabel , Stepper , Typography , StepContent , InputLabel , FormControl , TextField , Select , Input , MenuItem

const dateStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        outline: `auto`,
        border: `1px solid gray`,
        color: `gray`,
        textColor: `gray`,
        marginTop: `1vh`,
        padding: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: `28vw`,
        textColor: `gray`

    },
}));

const Register = () => {

    //Regular Variables
    const dateClasses = dateStyles();
    const registerAs = useHistory().location.pathname.charAt(useHistory().location.pathname.length - 1)


    //State Variables
    const [linkedIn, setLinkedIn] = useState({
        platformId: "",
        platformLink: ""
    })

    const [site, setSite] = useState({
        platformId: "",
        platformLink: ""
    })

    // Agency State Variables//
    const [agencyForm, setAgencyForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        countryCode: "+91",
        password: ""
    })

    const [createAgencyForm, setCreateAgencyForm] = useState({
        agencyName: "",
        agencyTeamSize: "",
        incorporationDate: "",
        socialPlatformDetails: []
    })

    const [agencyFormErrors, setAgencyFormErrors] = useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        phoneError: false,
        userNameError: false

    })
    //#######################//
   

    //Client state varaibles//
    const [clientForm, setClientForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        userEmail: "",
        userPhone: "",
        countryCode: "+91",
        password: ""
    })

    const [createClientForm, setCreateClientForm] = useState({
        userDesignation: "",
        companyName: "",
        socialPlatformDetails: []
    })

    const [clientFormErrors, setClientFormErrors] = useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        phoneError: false,
        userNameError: false

    })

    //#######################//

    //Methods
  
    const handleCreateProfile = (event, Role) => {
        const { name, value } = event.target

        if(Role==='agency'){
            setCreateAgencyForm({
                ...createAgencyForm,
                [name]: value
            })
        }

        else if(Role==='client'){
            setCreateClientForm({
                ...createClientForm,
                [name]: value
            })
        }
    }


    const handleSocialPlatform = (event) => {
        const { name, id, value } = event.target
        if (name === "linkedIn") {
            setLinkedIn({
                platformId: id,
                platformLink: value
            })

        }
        else if (name === "website") {

            console.log("hiii")
            setSite({
                platformId: id,
                platformLink: value
            })

        }

    }

   

    const setForm = (event, Role) => {
        console.log("set Form", Role)
        const { name, value } = event.target
        if (Role === 'agency') {

            console.log("in agency", Role)
            setAgencyForm(
                {
                    ...agencyForm,
                    [name]: value
                }
            )
        }

        else if (Role === 'client') {
            setClientForm({
                ...clientForm,
                [name]: value
            })
        }
    }

    //API call methods
    const signUp = (role, form) => {

        instance.post(`/api/${role}/auths/signup`, form)
            .then(function (response) {
                localStorage.setItem('AUTHORIZATION', response.token)
            })
    }

    
    const createProfileApi = (Role, api_param_const, createForm) => {
        instance.post(`/api/${Role}/${api_param_const}/create`, { ...createForm })
            .then(function (response) {
                console.log(response, "create");

            })
    }

    const handleSubmit = (Role, Form, createForm) => {


        signUp(Role, Form)

        let api_param_const = ``

        if (Role === `client`)
            api_param_const = `clients`
        else if (Role === `agency`)
            api_param_const = `agencies`

        localStorage.getItem('AUTHORIZATION') && createProfileApi(Role, api_param_const, createForm)

    }




    const AgencyRegistration = () => {

        const Role = `agency`
        //State Variables
        const [step, setStep] = useState(1)


        //Methods
        const toggleFormTwo = direction => {

            let form1 = document.querySelector('.form__1')
            let form2 = document.querySelector('.form__2')
            form1.classList.toggle('hide__form1')
            form2.classList.toggle('show__form2')

            if (direction === 'next') {
                setStep(prev => prev + 1)
                if (!agencyForm.firstName)
                    setAgencyFormErrors({
                        ...agencyFormErrors,
                        firstnameError: true
                    })
                else if (!agencyForm.lastName)
                    setAgencyFormErrors({
                        ...agencyFormErrors,
                        lastnameError: true
                    })
                else if (!agencyForm.userEmail)
                    setAgencyFormErrors({
                        ...agencyFormErrors,
                        emailError: true
                    })

                else if (!agencyForm.userPhone)
                    setAgencyFormErrors({
                        ...agencyFormErrors,
                        passwordError: true
                    })

                else if (!agencyForm.password)
                    setAgencyFormErrors({
                        ...agencyFormErrors,
                        passwordError: true
                    })
            }
            else
                setStep(prev => prev - 1)
        }


        //JSX
        return (
            <div className='form__area'>

                <div className="client__form">
                    <div style={{ width: '100%', textAlign: 'center', marginTop: '10%' }}>
                        <div className="form__title"><h6>Register as an Agency</h6></div>
                        <div className="title__subtext"><p>For the purpose of industry regulation, your details <br /> are required</p></div>
                    </div>

                    <div className="client__formsContainer">
                        <form className='client__form form__1' autoComplete='off' >
                            <label htmlFor='firstName'>Your firstname *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder='First Name'
                                onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: agencyFormErrors.firstNameError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='name'>Your lastname *</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder='Last Name'
                                onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: agencyFormErrors.lastNameError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='name'>Username *</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder='Username'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: agencyFormErrors.userNameError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='email'>Email Address *</label>
                            <input
                                type="text"
                                name="userEmail"
                                placeholder='Email'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: agencyFormErrors.emailError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='phone'>Phone No *</label>
                            <input
                                type="text"
                                name="userPhone"
                                placeholder='Phone No'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: agencyFormErrors.phoneError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='password'>Create Password*</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Create Password'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: agencyFormErrors.passworderror ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />


                            <Button
                                onClick={() => toggleFormTwo('next')}
                                style={{ background: colors.PRIMARY_COLOR, marginTop: '5vh', color: colors.WHITE, height: '60px', fontFamily: 'Poppins', fontSize: '1.2rem', width: '50%', borderRadius: '8px' }}
                            >
                                NEXT
                            </Button>
                        </form>

                        <form autoComplete='off' className="client__form form__2">

                            <label htmlFor='desig'>Agency Name</label>
                            <input type="text" name="desig" placeholder='Designation' />

                            <label htmlFor='company'>Agency Location</label>
                            <input type="text" name="company" placeholder='Company' />

                            <label htmlFor='social'>Team Strength</label>
                            <input type="number" name="social" placeholder='Team Strength' />

                            <label htmlFor='social'>Incorporation Date</label>
                            <form className={dateClasses.container} noValidate>
                                <TextField
                                    id="incorporation_date"
                                    type="date"
                                    name="incorporationDate"
                                    defaultValue="2017-05-24"
                                    value={createAgencyForm.incorporationDate}
                                    className={dateClasses.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event, Role) => { setForm(event, Role) }}
                                />
                            </form>
                            <label htmlFor='website'>Website</label>
                            <input type="text" name="website" placeholder='Website URL' />

                            <Button
                                onClick={handleSubmit(Role, agencyForm, createAgencyForm)}
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
        )
    }

    const ClientRegistration = () => {

        const Role = `client`
        //Methods
        const toggleForms = direction => {
            let primaryForm = document.querySelector('.client__primaryForm')
            let secondaryForm = document.querySelector('.client__secondaryForm')

            if (direction === 'next') {
                if (!clientForm.firstName)
                    setClientFormErrors({
                        ...clientFormErrors,
                        firstnameError: true
                    })
                else if (!clientForm.lastName)
                    setClientFormErrors({
                        ...clientFormErrors,
                        lastnameError: true
                    })
                else if (!clientForm.userEmail)
                    setClientFormErrors({
                        ...clientFormErrors,
                        emailError: true
                    })

                else if (!clientForm.userPhone)
                    setClientFormErrors({
                        ...clientFormErrors,
                        passwordError: true
                    })

                else if (!clientForm.password)
                    setClientFormErrors({
                        ...clientFormErrors,
                        passwordError: true
                    })


                else {
                    primaryForm.classList.toggle('hide__primaryForm')
                    secondaryForm.classList.toggle('show__secondaryForm')
                }
            }

            else {
                primaryForm.classList.toggle('hide__primaryForm')
                secondaryForm.classList.toggle('show__secondaryForm')
            }
        }

     
        // JSX
        return (
            <div className='form__area'>

                <div className="client__form">
                    <div style={{ width: '100%', textAlign: 'center', marginTop: '10%' }}>
                        <div className="form__title"><h6>Register as a Client</h6></div>
                        <div className="title__subtext"><p>For the purpose of industry regulation, your details <br /> are required</p></div>
                    </div>

                    <div className="client__formsContainer">
                        <form className='client__form client__primaryForm' autoComplete='off' >
                            <label htmlFor='firstName'>Your firstname *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder='First Name'
                                onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: clientFormErrors.firstNameError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='name'>Your lastname *</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder='Last Name'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: clientFormErrors.lastNameError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='name'>Username *</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder='Username'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: clientFormErrors.userNameError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='email'>Email Address *</label>
                            <input
                                type="text"
                                name="userEmail"
                                placeholder='Email'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: clientFormErrors.emailError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='phone'>Phone No *</label>
                            <input
                                type="text"
                                name="userPhone"
                                placeholder='Phone No'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: clientFormErrors.phoneError ? '2px solid red' : '1px solid gray',
                                    transition: '.3s ease'
                                }}
                            />

                            <label htmlFor='password'>Create Password*</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Create Password'
                                 onChange={(e) => setForm(e,Role)}
                                style={{
                                    border: clientFormErrors.passworderror ? '2px solid red' : '1px solid gray',
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

                        <form autoComplete='off' className="client__form client__secondaryForm">

                            <div style={{ width: '80%' }}>
                                <Button
                                    onClick={() => toggleForms('prev')}
                                    // style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE , height : '30px' , borderRadius : '999px' , border : 'none' }}
                                    style={{ background: 'none', border: 'none' }}
                                >
                                    <i className='fa fa-arrow-left' style={{ fontSize: '1.2rem' }}></i>
                                </Button>
                            </div>

                            <label htmlFor='userDesignation'>Designation</label>
                            <input type="text" name="userDesignation" placeholder='Designation' onChange={(event, Role) => handleCreateProfile(event, Role)} />

                            <label htmlFor='companyName'>Company</label>
                            <input type="text" name="companyName" placeholder='Company' onChange={(event, Role) => handleCreateProfile(event, Role)} />

                            <label htmlFor='socialPlatformDetails'>LinkedIn</label>
                            <input type="text" name="linkedIn" id="605cc02bc813cb3d2e96a326" placeholder='LinkedIn profile URL' value={linkedIn.platformLink} onChange={(event,Role) => handleSocialPlatform(event, Role)} />

                            <label htmlFor='website'>Website</label>
                            <input type="text" name="website" id="606d4fb838ce8802aa8f3b5f" placeholder='Website URL' value={site.platformLink} onChange={(event, Role) => handleSocialPlatform(event, Role)} />

                            <Button
                                onClick={() => { handleSubmit(Role, clientForm, createClientForm) }}
                                style={{ background: colors.PRIMARY_COLOR, marginTop: '5vh', color: colors.WHITE, height: '60px', fontFamily: 'Poppins', fontSize: '1.2rem', width: '50%', borderRadius: '8px', marginBottom: '5%' }}
                            >
                                SUBMIT
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="existing_accountText">
                    <p>Personal Info</p>
                </div>
            </div>
        )
    }
    return (
        <div className='client__registrationContainer'>
            <div className="image__container">
                {/* <img src = {bgimage} alt="" className = 'background__image'/> */}
                <img src={logotext} alt="" />
            </div>

            <div style={{ flex: .37 }}>
            </div>

            <div style={{ flex: .63 }}>
                {
                    registerAs === 'y' ? <AgencyRegistration /> : <ClientRegistration />
                }
            </div>
        </div>
    )
}

export default React.memo(Register)
