import { Button, Step , StepLabel , Stepper , Typography , StepContent , InputLabel , FormControl , TextField , Select , Input , MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import logotext from '../../assets/images/SignUp/logotext.svg'
import './register.css'
import colors from '../../Constants/colors'

const Register = () => {

    const RegisterAgency = () => {

        const [step, setStep] = useState(1)

        const toggleFormTwo = direction => {
            const form1 = document.querySelector('.form__1')
            const form2 = document.querySelector('.form__2')

            if(direction == 'next') {
                setStep(prev => prev + 1)
                form1.classList.toggle('hide__form1')
                form2.classList.toggle('show__form2')
            }

            else {
                setStep(prev => prev - 1)
                form1.classList.toggle('hide__form1')
                form2.classList.toggle('show__form2')
            }
        }

        const toggleFormThree = direction => {
            const form2 = document.querySelector('.form__2')
            const form3 = document.querySelector('.form__3')

            if(direction == 'next') {
                setStep(prev => prev + 1)
                form2.classList.toggle('hide__form2')
                form3.classList.toggle('show__form3')
            }

            else {
                setStep(prev => prev - 1)
                form2.classList.toggle('hide__form2')
                form3.classList.toggle('show__form3')
            }
        }

        const toggleFormFour = direction => {
            const form3 = document.querySelector('.form__3')
            const form4 = document.querySelector('.form__4')

            if(direction == 'next') {
                setStep(prev => prev + 1)
                form3.classList.toggle('hide__form3')
                form4.classList.toggle('show__form4')
            }

            else {
                setStep(prev => prev - 1)
                form3.classList.toggle('hide__form3')
                form4.classList.toggle('show__form4')
            }
        }

        return (
            <div className = 'signup__wrapper'>
                <div className="image__background">
                    <img src = {logotext} alt="" />
                </div>

                <div className="form__area">
                    <div style = {{ display : 'flex' , alignItems : 'flex-end' , justifyContent : 'center' , flexDirection : 'column' }}>
                        <p style = {{ color : '#8692A6' , fontSize : '16px' , margin : 0 , padding : 0 }}>Personal Info</p>
                        <p style = {{ color : '#8692A6' , fontSize : '16px' , margin : 0 , padding : 0 }}>Step {step} of 4</p>
                    </div>

                    <div className="client__formContainer">
                        <div className="form__title"><h6>Register as an Agency</h6></div>
                        <div className="title__subtext"><p>For the purpose of industry regulation, your details <br/> are required</p></div>

                        <div className="forms__container">
                            <form className = 'client__form form__1' autoComplete = 'off'>
                                <label htmlFor = 'name'>Your fullname *</label>
                                <input
                                    type="text" 
                                    name="name" 
                                    placeholder = 'Name'
                                    onChange = {e => {
                                        e.preventDefault()
                                        // setName(e.target.value)
                                        // setNameError(false)
                                    }}
                                    style = {{
                                        // border : nameError ? '2px solid red' : '1px solid gray',
                                        transition : '.3s ease'
                                    }}
                                />

                                <label htmlFor = 'email'>Email Address *</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder = 'Email'
                                    onChange = {e => {
                                        e.preventDefault()
                                        // setEmail(e.target.value)
                                        // setEmailError(false)
                                    }}
                                    style = {{
                                        // border : emailError ? '2px solid red' : '1px solid gray',
                                        transition : '.3s ease'
                                    }}
                                />

                                <label htmlFor = 'password'>Create Password*</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder = 'Create Password'
                                    onChange = {e => {
                                        e.preventDefault()
                                        // setPassword(e.target.value)
                                        // setPassworderror(false)
                                    }}
                                    style = {{
                                        // border : passworderror ? '2px solid red' : '1px solid gray',
                                        transition : '.3s ease'
                                    }}
                                />

                                <Button
                                    onClick = { () => toggleFormTwo('next') }
                                    style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '5vh' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' }}
                                >
                                    NEXT
                                </Button>
                            </form>

                            <form autoComplete = 'off' className="client__form form__2">

                                <Button
                                    onClick = { () => toggleFormTwo('prev') }
                                    style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE }}
                                >
                                    Back
                                </Button>

                                <label htmlFor = 'company'>Company Name</label>
                                <input type="text" name="company" placeholder = 'Company Name'/>

                                <label htmlFor = 'location'>Company Location</label>
                                <input type="text" name="location" placeholder = 'Location'/>

                                <label htmlFor = 'strength'>Team strength</label>
                                <input type="text" name="strength" placeholder = 'Strength'/>

                                <label htmlFor = 'website'>Website</label>
                                <input type="text" name="website" placeholder = 'Website URL'/>

                                <Button
                                    onClick = { () => toggleFormThree('next') }
                                    style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '5vh' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' }}
                                >
                                    NEXT
                                </Button>
                            </form>

                            <form autoComplete = 'off' className="client__form form__3">

                                <Button
                                    onClick = { () => toggleFormThree('prev') }
                                    style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE }}
                                >
                                    Back
                                </Button>

                                <label htmlFor = 'company'>Company Name</label>
                                <input type="text" name="company" placeholder = 'Company Name'/>

                                <label htmlFor = 'location'>Company Location</label>
                                <input type="text" name="location" placeholder = 'Location'/>

                                <label htmlFor = 'strength'>Team strength</label>
                                <input type="text" name="strength" placeholder = 'Strength'/>

                                <label htmlFor = 'website'>Website</label>
                                <input type="text" name="website" placeholder = 'Website URL'/>

                                <Button
                                    onClick = { () => toggleFormFour('next') }
                                    style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '5vh' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' }}
                                >
                                    NEXT
                                </Button>
                            </form>

                            <form autoComplete = 'off' className="client__form form__4">

                                <Button
                                    onClick = { () => toggleFormFour('prev') }
                                    style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE }}
                                >
                                    Back
                                </Button>

                                <label htmlFor = 'company'>Company Name</label>
                                <input type="text" name="company" placeholder = 'Company Name'/>

                                <label htmlFor = 'location'>Company Location</label>
                                <input type="text" name="location" placeholder = 'Location'/>

                                <label htmlFor = 'strength'>Team strength</label>
                                <input type="text" name="strength" placeholder = 'Strength'/>

                                <label htmlFor = 'website'>Website</label>
                                <input type="text" name="website" placeholder = 'Website URL'/>

                                <Button
                                    // onClick = {register}
                                    style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '5vh' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' }}
                                >
                                    SUBMIT
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const RegisterClient = () => {

        const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [nameError, setNameError] = useState(false)
        const [emailError, setEmailError] = useState(false)
        const [passworderror, setPassworderror] = useState(false)

        const toggleForms = direction => {
            let primaryForm = document.querySelector('.client__primaryForm')
            let secondaryForm = document.querySelector('.client__secondaryForm')
    
            if(direction === 'next') {
                if(!name)
                    setNameError(true)
                else if(!email)
                    setEmailError(true)
                else if(!password)
                    setPassworderror(true)
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

        const register = () => {
            console.log()
        }

        return (
            <div className = 'signup__wrapper'>
                <div className="image__background">
                    <img src = {logotext} alt="" />
                </div>

                <div className="form__area">
                    <div style = {{ display : 'flex' , alignItems : 'center' , justifyContent : 'flex-end' }}>
                        <p style = {{ color : '#8692A6' , fontSize : '16px' }}>Personal Info</p> 
                    </div>

                    <div className="client__formContainer">
                        <div className="form__title"><h6>Register as a Client</h6></div>
                        <div className="title__subtext"><p>For the purpose of industry regulation, your details <br/> are required</p></div>

                        <div className="forms__container">
                            <form className = 'client__form client__primaryForm' autoComplete = 'off' >
                                <label htmlFor = 'name'>Your fullname *</label>
                                <input
                                    type="text" 
                                    name="name" 
                                    placeholder = 'Name' 
                                    onChange = {e => {
                                        e.preventDefault()
                                        setName(e.target.value)
                                        setNameError(false)
                                    }}
                                    style = {{
                                        border : nameError ? '2px solid red' : '1px solid gray',
                                        transition : '.3s ease'
                                    }}
                                />

                                <label htmlFor = 'email'>Email Address *</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder = 'Email'
                                    onChange = {e => {
                                        e.preventDefault()
                                        setEmail(e.target.value)
                                        setEmailError(false)
                                    }}
                                    style = {{
                                        border : emailError ? '2px solid red' : '1px solid gray',
                                        transition : '.3s ease'
                                    }}
                                />

                                <label htmlFor = 'password'>Create Password*</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder = 'Create Password'
                                    onChange = {e => {
                                        e.preventDefault()
                                        setPassword(e.target.value)
                                        setPassworderror(false)
                                    }}
                                    style = {{
                                        border : passworderror ? '2px solid red' : '1px solid gray',
                                        transition : '.3s ease'
                                    }}
                                />

                                <Button
                                    onClick = { () => toggleForms('next') }
                                    style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '5vh' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' }}
                                >
                                    NEXT
                                </Button>
                            </form>

                            <form autoComplete = 'off' className="client__form client__secondaryForm">

                                <Button
                                    onClick = { () => toggleForms('prev') }
                                    style = {{ background : colors.GRAY_TEXT , width : '8%' , color : colors.WHITE }}
                                >
                                    Back
                                </Button>

                                <label htmlFor = 'desig'>Designation</label>
                                <input type="text" name="desig" placeholder = 'Designation'/>

                                <label htmlFor = 'company'>Company</label>
                                <input type="text" name="company" placeholder = 'Company'/>

                                <label htmlFor = 'social'>LinkedIn</label>
                                <input type="text" name="social" placeholder = 'LinkedIn profile URL'/>

                                <label htmlFor = 'website'>Website</label>
                                <input type="text" name="website" placeholder = 'Website URL'/>

                                <Button
                                    onClick = {register}
                                    style = {{ background : colors.PRIMARY_COLOR , marginTop : '5vh' , color : colors.WHITE , height : '5vh' , fontFamily : 'Poppins' , fontSize : '1.2rem' , width : '50%' }}
                                >
                                    SUBMIT
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const registerAs = useHistory().location.pathname.charAt(useHistory().location.pathname.length - 1)
    return (
        registerAs === 'y' ? <RegisterAgency /> : <RegisterClient />
    )
}

export default Register
