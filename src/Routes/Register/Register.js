/* eslint-disable react-hooks/exhaustive-deps */
//Imports

import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import logotext from '../../assets/images/SignUp/logotext.svg'
import './register.css'
import colors from '../../Constants/colors'

// Axios Import
import instance from "../../Constants/axiosConstants"

//Future Imports
// Step , StepLabel , Stepper , Typography , StepContent , InputLabel , FormControl , TextField , Select , Input , MenuItem

const Register = () => {

    const registerAs = useHistory().location.pathname.charAt(useHistory().location.pathname.length - 1)

    const AgencyRegistration = () => {


        //State Variables
        const [step, setStep] = useState(1)

        //State Variables to handle Form
        const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            email:"",
            password:"",
        })

        // const [subForms, setSubForms] = useState([])

        //Methods
        const toggleFormTwo = direction => {
            let form1 = document.querySelector('.form__1')
            let form2 = document.querySelector('.form__2')
            form1.classList.toggle('hide__form1')
            form2.classList.toggle('show__form2')

            if(direction === 'next')
                setStep(prev => prev + 1)
            else
                setStep(prev => prev - 1)
        }

        const toggleFormThree = direction => {
            let form2 = document.querySelector('.form__2')
            let form3 = document.querySelector('.form__3')

            form2.classList.toggle('hide__form2')
            form3.classList.toggle('show__form3')

            if(direction === 'next')
                setStep(prev => prev + 1)
            else
                setStep(prev => prev - 1)
        }

        const toggleFormFour = direction => {
            let form3 = document.querySelector('.form__3')
            let form4 = document.querySelector('.form__4')
            form3.classList.toggle('hide__form3')
            form4.classList.toggle('show__form4')

            if(direction === 'next')
                setStep(prev => prev + 1)
            else
                setStep(prev => prev - 1)
        }

        //handle onChange Events
        const handleAgencyFormChange = (event)=>{
            const {name, value} = event.target
            setFormData(
                {
                    ...formData,
                    [name]:value
                }
            )
        }

        //API calls

        //JSX
        return (
            <div className = 'form__area'>
                
                <div className="client__form">
                    <div style = {{ width : '100%' , textAlign : 'center' , marginTop : '10%' }}>
                        <div className="form__title"><h6>Register as an Agency</h6></div>
                        <div className="title__subtext"><p>For the purpose of industry regulation, your details <br/> are required</p></div>
                    </div>

                    <div className="client__formsContainer">
                        <form className = 'client__form form__1' autoComplete = 'off' >
                            <label htmlFor = 'name'>Your firstname *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder = 'FirstName'
                                onChange = {(e) => {
                                handleAgencyFormChange(e)
                                }}
                                style = {{
                                    transition : '.3s ease'
                                }}
                            />

                            <label htmlFor = 'name'>Your lastname *</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder = 'LastName'
                                onChange = {e => {
                                   handleAgencyFormChange(e)
                                }}
                                style = {{
                                    transition : '.3s ease'
                                }}
                            />
                            <label htmlFor = 'email'>Email Address *</label>
                            <input
                                type="text"
                                name="email"
                                placeholder = 'Email'
                                onChange = {e => {
                                   handleAgencyFormChange(e)
                                }}
                                style = {{
                                    transition : '.3s ease'
                                }}
                            />

                            <label htmlFor = 'password'>Create Password*</label>
                            <input
                                type="password"
                                name="password"
                                placeholder = 'Create Password'
                                onChange = {e => {
                                    handleAgencyFormChange(e)
                                }}
                                style = {{
                                    // border : passworderror ? '2px solid red' : '1px solid gray',
                                    transition : '.3s ease'
                                }}
                            />

                            <Button
                                onClick = { () => toggleFormTwo('next') }
                                style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '60px' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' , borderRadius : '8px' }}
                            >
                                NEXT
                            </Button>
                        </form>

                        <form autoComplete = 'off' className="client__form form__2">

                            <div style = {{ width : '80%' }}>
                                <Button
                                    onClick = { () => toggleFormTwo('prev') }
                                    // style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE , height : '30px' , borderRadius : '999px' , border : 'none' }}
                                    style = {{ background : 'none' , border : 'none' }}
                                >
                                    <i className = 'fa fa-arrow-left' style = {{ fontSize : '1.2rem' }}></i>
                                </Button>
                            </div>

                            <label htmlFor = 'desig'>Designation2</label>
                            <input type="text" name="desig" placeholder = 'Designation'/>

                            <label htmlFor = 'company'>Company</label>
                            <input type="text" name="company" placeholder = 'Company'/>

                            <label htmlFor = 'social'>LinkedIn</label>
                            <input type="text" name="social" placeholder = 'LinkedIn profile URL'/>

                            <label htmlFor = 'website'>Website</label>
                            <input type="text" name="website" placeholder = 'Website URL'/>

                            <Button
                                onClick = { () => toggleFormThree('next') }
                                style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '60px' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' , borderRadius : '8px' , marginBottom : '5%' }}
                            >
                                NEXT
                            </Button>
                        </form>

                        <form autoComplete = 'off' className="client__form form__3">

                            <div style = {{ width : '80%' }}>
                                <Button
                                    onClick = { () => toggleFormThree('prev') }
                                    // style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE , height : '30px' , borderRadius : '999px' , border : 'none' }}
                                    style = {{ background : 'none' , border : 'none' }}
                                >
                                    <i className = 'fa fa-arrow-left' style = {{ fontSize : '1.2rem' }}></i>
                                </Button>
                            </div>

                            <label htmlFor = 'desig'>Designation3</label>
                            <input type="text" name="desig" placeholder = 'Designation'/>

                            <label htmlFor = 'company'>Company</label>
                            <input type="text" name="company" placeholder = 'Company'/>

                            <label htmlFor = 'social'>LinkedIn</label>
                            <input type="text" name="social" placeholder = 'LinkedIn profile URL'/>

                            <label htmlFor = 'website'>Website</label>
                            <input type="text" name="website" placeholder = 'Website URL'/>

                            <Button
                                onClick = { () => toggleFormFour('next') }
                                style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '60px' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' , borderRadius : '8px' , marginBottom : '5%' }}
                            >
                                NEXT
                            </Button>
                        </form>

                        <form autoComplete = 'off' className="client__form form__4">

                            <div style = {{ width : '80%' }}>
                                <Button
                                    onClick = { () => toggleFormFour('prev') }
                                    // style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE , height : '30px' , borderRadius : '999px' , border : 'none' }}
                                    style = {{ background : 'none' , border : 'none' }}
                                >
                                    <i className = 'fa fa-arrow-left' style = {{ fontSize : '1.2rem' }}></i>
                                </Button>
                            </div>

                            <label htmlFor = 'desig'>Designation4</label>
                            <input type="text" name="desig" placeholder = 'Designation'/>

                            <label htmlFor = 'company'>Company</label>
                            <input type="text" name="company" placeholder = 'Company'/>

                            <label htmlFor = 'social'>LinkedIn</label>
                            <input type="text" name="social" placeholder = 'LinkedIn profile URL'/>

                            <label htmlFor = 'website'>Wesdvfhsgjdfjhbsite</label>
                            <input type="text" name="website" placeholder = 'Website URL'/>

                            <Button
                                // onClick = {register}
                                style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '60px' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' , borderRadius : '8px' , marginBottom : '5%' }}
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


        //State Variables
        const [clientForm, setClientForm] = useState({
            firstName:"",
            lastName:"",
            userName:"",
            userEmail:"",
            userPhone: "",
            countryCode: "+91",
            password:""
        })

        const [clientFormErrors, setClientFormErrors] = useState({
            firstNameError:false,
            lastNameError:false,
            emailError:false,
            passwordError:false,
            phoneError: false,
            userNameError:false
            
        })

        const [clientSubForm, setClientSubForm] = useState({
            userDesignation: "",
            companyName: "",
            socialPlatformDetails: []
        })

        const [linkedIn, setLinkedIn] = useState({
            platformId:"",
            platformLink:""
        })
        const [site, setSite] = useState({
            platformId:"",
            platformLink:""
        })
    
        const ROLE = 'client'
        //Methods
        const toggleForms = direction => {
            let primaryForm = document.querySelector('.client__primaryForm')
            let secondaryForm = document.querySelector('.client__secondaryForm')
    
            if(direction === 'next') {
                if(!clientForm.firstName)
                    setClientFormErrors({
                        ...clientFormErrors,
                        firstnameError:true
                    })
                else if(!clientForm.lastName)
                    setClientFormErrors({
                        ...clientFormErrors,
                        lastnameError:true
                    })
                else if(!clientForm.userEmail)
                    setClientFormErrors({
                        ...clientFormErrors,
                        emailError:true
                    })

                else if(!clientForm.userPhone)
                      setClientFormErrors({
                        ...clientFormErrors,
                        passwordError:true
                    })

                else if(!clientForm.password)
                      setClientFormErrors({
                        ...clientFormErrors,
                        passwordError:true
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

          //handle onChange Events
        
        const handleClientFormChange = (event)=>{
            const {name, value} = event.target
            
            setClientForm(
                {
                    ...clientForm,
                    [name]:value
                }
            )
        }

        
        const handleSocialPlatform = (event)=>{
            const {name, id, value} = event.target
            if(name==="linkedIn"){
                setLinkedIn({
                    platformId:id,
                    platformLink:value
                })

            }
            else if(name==="website"){

                console.log("hiii")
                setSite({
                    platformId:id,
                    platformLink:value
                })

            }
            
        }

        
        const handleClientSubFormChange=(event)=>{
            const {name, value} = event.target
                setClientSubForm(   {
                    ...clientSubForm,
                    [name]: value
                } )
            }

        
        //API call methods
        const handleClientFormSubmit = ()=>{
            
          
            instance.post(`/api/${ROLE}/auths/signup`,{...clientForm})
            .then(function (response) {
                console.log(response,"signup");
                if(response.status===200 && response.data.status){
                    alert(response.data.message)
                    localStorage.setItem("AUTHORIZATION",response.data.data.accessToken)
                }
              })

            instance.post(`/api/${ROLE}/clients/create`,{...clientSubForm})
            .then(function (response) {
                console.log(response,"create");
                if(response.status===200 && response.data.status){
                    alert(response.data.message)
                }
            })
            console.log(clientForm)
        }

        useEffect(()=>{
            setClientSubForm({
                ...clientSubForm,
                socialPlatformDetails:[linkedIn,site]
            })
        },[linkedIn,site])

        // JSX
        return (
            <div className = 'form__area'>
                
                <div className="client__form">
                    <div style = {{ width : '100%' , textAlign : 'center' , marginTop : '10%' }}>
                        <div className="form__title"><h6>Register as a Client</h6></div>
                        <div className="title__subtext"><p>For the purpose of industry regulation, your details <br/> are required</p></div>
                    </div>

                    <div className="client__formsContainer">
                        <form className = 'client__form client__primaryForm' autoComplete = 'off' >
                            <label htmlFor = 'firstName'>Your firstname *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder = 'First Name'
                                onChange = {(e) => handleClientFormChange(e)}
                                style = {{
                                    border : clientFormErrors.firstNameError ? '2px solid red' : '1px solid gray',
                                    transition : '.3s ease'
                                }}
                            />

                            <label htmlFor = 'name'>Your lastname *</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder = 'Last Name'
                                onChange = {(e) => handleClientFormChange(e)}
                                style = {{
                                    border : clientFormErrors.lastNameError ? '2px solid red' : '1px solid gray',
                                    transition : '.3s ease'
                                }}
                            />

                            <label htmlFor = 'name'>Username *</label>
                            <input
                                type="text"
                                name="userName"
                                placeholder = 'Username'
                                onChange = {(e) => handleClientFormChange(e)}
                                style = {{
                                    border : clientFormErrors.userNameError ? '2px solid red' : '1px solid gray',
                                    transition : '.3s ease'
                                }}
                            />

                            <label htmlFor = 'email'>Email Address *</label>
                            <input
                                type="text"
                                name="userEmail"
                                placeholder = 'Email'
                                onChange = {(e) => handleClientFormChange(e)}
                                style = {{
                                    border : clientFormErrors.emailError ? '2px solid red' : '1px solid gray',
                                    transition : '.3s ease'
                                }}
                            />

                            <label htmlFor = 'phone'>Phone No *</label>
                            <input
                                type="text"
                                name="userPhone"
                                placeholder = 'Phone No'
                                onChange = {(e) => handleClientFormChange(e)}
                                style = {{
                                    border : clientFormErrors.phoneError ? '2px solid red' : '1px solid gray',
                                    transition : '.3s ease'
                                }}
                            />

                            <label htmlFor = 'password'>Create Password*</label>
                            <input
                                type="password"
                                name="password"
                                placeholder = 'Create Password'
                                onChange = {(e) => handleClientFormChange(e)}
                                style = {{
                                    border : clientFormErrors.passworderror ? '2px solid red' : '1px solid gray',
                                    transition : '.3s ease'
                                }}
                            />

                            <Button
                                onClick = { () => toggleForms('next') }
                                style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '60px' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' , borderRadius : '8px' }}
                            >
                                NEXT
                            </Button>
                        </form>

                        <form autoComplete = 'off' className="client__form client__secondaryForm">

                            <div style = {{ width : '80%' }}>
                                <Button
                                    onClick = { () => toggleForms('prev') }
                                    // style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE , height : '30px' , borderRadius : '999px' , border : 'none' }}
                                    style = {{ background : 'none' , border : 'none' }}
                                >
                                    <i className = 'fa fa-arrow-left' style = {{ fontSize : '1.2rem' }}></i>
                                </Button>
                            </div>

                            <label htmlFor = 'userDesignation'>Designation</label>
                            <input type="text" name="userDesignation" placeholder = 'Designation' onChange = {(event)=>handleClientSubFormChange(event)}/>

                            <label htmlFor = 'companyName'>Company</label>
                            <input type="text" name="companyName" placeholder = 'Company' onChange = {(event)=>handleClientSubFormChange(event)}/>

                            <label htmlFor = 'socialPlatformDetails'>LinkedIn</label>
                            <input type="text" name="linkedIn" id = "605cc02bc813cb3d2e96a326" placeholder = 'LinkedIn profile URL' value = {linkedIn.platformLink} onChange = {(event)=>handleSocialPlatform(event)}/>

                            <label htmlFor = 'website'>Website</label>
                            <input type="text" name="website" id = "606d4fb838ce8802aa8f3b5f" placeholder = 'Website URL' value = {site.platformLink} onChange = {(event)=>handleSocialPlatform(event)}/>

                            <Button
                                onClick = {handleClientFormSubmit}
                                style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '60px' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' , borderRadius : '8px' , marginBottom : '5%' }}
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
        <div className = 'client__registrationContainer'>
            <div className="image__container">
                {/* <img src = {bgimage} alt="" className = 'background__image'/> */}
                <img src = {logotext} alt="" />
            </div>

            <div style = {{ flex : .37 }}>
            </div>

            <div style = {{ flex : .63 }}>
                {
                    registerAs === 'y' ? <AgencyRegistration /> : <ClientRegistration />
                }
            </div>
        </div>
    )
}

export default Register
