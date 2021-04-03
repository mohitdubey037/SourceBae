import { Button, Step , StepLabel , Stepper , Typography , StepContent , InputLabel , FormControl , TextField , Select , Input , MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import logotext from '../../assets/images/SignUp/logotext.svg'
import './register.css'
import colors from '../../Constants/colors'
// impot

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

        const [subForms, setSubForms] = useState([])

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
        const handleChange = (event)=>{
            // console.log(event.target)
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
                                handleChange(e)
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
                                   handleChange(e)
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
                                   handleChange(e)
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
                                    handleChange(e)
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

        return (
            <div className = 'form__area'>
                
                <div className="client__form">
                    <div style = {{ width : '100%' , textAlign : 'center' , marginTop : '10%' }}>
                        <div className="form__title"><h6>Register as a Client</h6></div>
                        <div className="title__subtext"><p>For the purpose of industry regulation, your details <br/> are required</p></div>
                    </div>

                    <div className="client__formsContainer">
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

                            <label htmlFor = 'desig'>Designation</label>
                            <input type="text" name="desig" placeholder = 'Designation'/>

                            <label htmlFor = 'company'>Company</label>
                            <input type="text" name="company" placeholder = 'Company'/>

                            <label htmlFor = 'social'>LinkedIn</label>
                            <input type="text" name="social" placeholder = 'LinkedIn profile URL'/>

                            <label htmlFor = 'website'>Website</label>
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
