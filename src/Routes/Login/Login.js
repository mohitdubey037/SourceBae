import React, { useEffect, useState } from 'react'
import './login.css'
import './loginMedia.css'
// import logo from "../../assests/images/Login/logo.svg"
// import register from '../../assests/images/Login/register.svg'
import colors from '../../Constants/colors'
// import client from '../../assests/images/Login/client.svg'
// import agency from '../../assests/images/Login/agency.svg'
import { Button, Step, StepLabel, Stepper , Typography , StepContent , TextField, Select, Input, InputLabel, FormControl } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'
import MultiSelect from "react-multi-select-component"
import { TextFields } from '@material-ui/icons'

const getSteps = () => {
    return ['A','B','C']
}

const Login = () => {
    const history = useHistory()

    const [signInButton, setSignInButton] = useState(undefined)
    const [signUpButton, setSignUpButton] = useState(undefined)
    const [container, setContainer] = useState(undefined)
    const [initialRender, setInitialRender] = useState('signup')
    const [showAgencyForm, setShowAgencyForm] = useState(false)
    const [showClientForm, setShowClientForm] = useState(false)
    const [locationKeys, setLocationKeys] = useState([])
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set())
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [selected, setSelected] = useState([
        { label : 'MEAN' , value : 'MEAN' },
        { label : 'MERN' , value : 'MERN' },
        { label : '.NET' , value : '.NET' }
    ])
    const [selectedValue, setSelectedValue] = useState([])

    const getStepContent = step => {

        const textFieldStyle = {
            marginBottom : '15px'
        }

        switch(step) {
            case 0:
                return <>
                    <div className="input__field">
                        <i className = 'fa fa-user'></i>
                        <input 
                            type = "text"
                            name=""
                            id = ""
                            placeholder = 'User Name'
                        />
                    </div>
                    <div className="input__field">
                        <i className = 'fa fa-envelope'></i>
                        <input 
                            type = "text"
                            name=""
                            id = ""
                            placeholder = 'Email'
                        />
                    </div>
                    <div className="input__field">
                        <i className = 'fa fa-mobile'></i>
                        <input 
                            type = "text"
                            name=""
                            id = ""
                            placeholder = 'Phone number'
                        />
                    </div>
                    <div className="input__field">
                        <i className = 'fa fa-building'></i>
                        <input 
                            type = "text"
                            name=""
                            id = ""
                            placeholder = 'Company Name'
                        />
                    </div>
                    <div className="input__field">
                        <i className = 'fa fa-globe'></i>
                        <input 
                            type = "text"
                            name=""
                            id = ""
                            placeholder = 'Website'
                        />
                    </div>
            </>
            case 1:
                return <div style = {{ display : 'flex' , flexDirection : 'column' , minHeight : '40vh'  }}>
                    {/* <div className="input__field"> */}
                        {/* <i className = 'fa fa-user'></i> */}
                        <TextField label = 'Company Age' style = {textFieldStyle}/>
                        <TextField label = 'Employee Strength' style = {textFieldStyle}/>
                        <TextField label = 'LinkedIn profile' style = {textFieldStyle}/>
                        <TextField label = 'Portfolio' style = {textFieldStyle}/>
                        <TextField label = 'Ranking on other website' style = {textFieldStyle}/>
                        <TextField label = 'Featured anywhere?' style = {textFieldStyle}/>
                        <FormControl style = {textFieldStyle}>
                            <InputLabel>--Select--</InputLabel>
                            <Select
                                input = {<Input />}
                                multiple
                                labelId = 'sdnjdhfgdjk'
                                value = {selectedValue}
                                onChange = {e => console.log(e)}
                            >
                                {
                                    selected.map(item => (
                                        <MenuItem key = {item.label} value = {item.value}>{item.label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {/* <input 
                            type = "text"
                            name=""
                            id = ""
                            placeholder = 'User Name'
                        /> */}
                    {/* </div> */}
                </div>
            case 2:
                return <div style = {{ display : 'flex' , flexDirection : 'column' }}>
                    <label for = 'logo'>Choose a logo : </label>
                    <input type="file" name="logo" accept = 'image/png , image/jpg' />

                    <label for = 'certificate'>Select company certificate : </label>
                    <input type="file" name="certificate" accept = 'image/png , image/jpg' />

                    <label for = 'pancard'>Upload PanCard : </label>
                    <input type="file" name="pancard" accept = 'image/png , image/jpg' />

                    <label for = 'aadhar'>Upload Aadhar Card : </label>
                    <input type="file" name="aadhar" accept = 'image/png , image/jpg' />

                    <TextField label = 'About Company' style = {textFieldStyle}/>
                    <TextField label = 'Location' style = {textFieldStyle} />
                </div>
            default:
                return 'Unknown'
        }
    }

    const steps = getSteps()

    const handleSignUpButtonClick = () => {
        setTimeout( () => {
            setShowLoginForm(false)
        }, 1200)
        container.classList.add('signup__mode')
    }

    const handleSignInButtonClick = () => {
        setTimeout(() => {
            setShowAgencyForm(false)
            setShowClientForm(false)
        }, 1200);
        container.classList.remove('signup__mode')
    }

    const isStepOptional = step => step === 1

    const isStepSkipped = step => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if(isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep(prev => prev + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep(prev => prev - 1)
    }

    useEffect( () => {
        setSignInButton(document.querySelector('#signin__button'))
        setSignUpButton(document.querySelector('#signup__button'))
        setContainer(document.querySelector('.login__container'))
    },[])

    const CardComponent = ({ as , method }) => {
        return (
            <div
                className = 'inner__card' 
                onClick = { e => {
                    if(as == 'Client' && method === 'register') {
                        console.log('yessss')
                        e.preventDefault()
                        setShowClientForm(true)
                    }
                    else if(as == 'Agency' && method === 'register'){
                        e.preventDefault()
                        setShowAgencyForm(true)
                    }
                    else if(method === 'login')
                        setShowLoginForm(true)
                }}
            >
                <div className="card__imageArea">
                    {/* <p>{as}</p> */}
                    {/* <img src= {as == 'Client' ? client : agency} alt=""/> */}
                </div>
                <div className="card__textArea">
                    {/* <p>{method} as {as}</p> */}
                    <button onClick = { e => {
                        console.log('method',method)
                        if(as == 'Client' && method === 'register') {
                            console.log('yessss')
                            e.preventDefault()
                            setShowClientForm(true)
                        }
                        else if(as == 'Agency' && method === 'register'){
                            e.preventDefault()
                            setShowAgencyForm(true)
                        }
                        else if(method === 'login')
                            setShowLoginForm(true)
                    }}>{method == 'login' ? 'Log In' : 'Sign Up'} as {as}</button>
                </div>
            </div>
        )
    }

    const AgencyForm = () => {
        return (
            <div style = {{ width : '70%' }}>
                <h2 className="title">Sign Up as Agency</h2>
                <Stepper activeStep={activeStep} orientation = 'vertical'>
                    {steps.map((label, index) => (
                        <Step key = {label}>
                            <StepLabel>{index+1}</StepLabel>
                            <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div>
                                <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                                </div>
                            </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                <p className = 'registeras__agency'
                    onClick = { e => {
                        e.preventDefault()
                        setShowClientForm(true)
                        setShowAgencyForm(false)
                    }}
                    style = {{ color : colors.PRIMARY_COLOR , marginTop : '2%' , cursor : 'pointer' }}
                >Register as a Client instead?</p>
            </div>
        )
    }

    const ClientForm = () => (
            <>
                <h2 className="title">Sign Up as a Client</h2>
                <div className="input__field">
                    <i className = 'fa fa-envelope'></i>
                    <input 
                        type = "text"
                        name=""
                        id = ""
                        placeholder = 'Email'
                    />
                </div>
                <div className="input__field">
                    <i className = 'fa fa-mobile'></i>
                    <input 
                        type = "text"
                        name=""
                        id = ""
                        placeholder = 'Phone Number'
                        maxLength = {10}
                    />
                </div>
                <div className="input__field">
                    <i className = 'fa fa-user'></i>
                    <input 
                        type = "text"
                        name=""
                        id = ""
                        placeholder = 'Business Name'
                    />
                </div>
                <div className="input__field">
                    <i className = 'fas fa-pen-fancy'></i>
                    <input 
                        type = "text"
                        name=""
                        id = ""
                        placeholder = 'Designation'
                    />
                </div>
                <div className="input__field">
                    <i className = 'fas fa-pen-fancy'></i>
                    <input 
                        type = "text"
                        name=""
                        id = ""
                        placeholder = 'Website'
                    />
                </div>
                <div className="input__field">
                    <i className = 'fa fa-linkedin'></i>
                    <input 
                        type = "text"
                        name=""
                        id = ""
                        placeholder = 'LlinkedIn Profile Link'
                    />
                </div>
                <Button 
                    style = {{ background : colors.PRIMARY_COLOR , color : colors.WHITE , width : '45%' , height : '15%' , borderRadius : '5px' , border : 'none' , fontFamily : 'Poppins , sans-serif' , fontSize : '1.5rem' , marginTop : '3%' , textTransform : 'none' }}
                    onClick = { e => e.preventDefault() }
                >
                    <span>Submit</span>
                </Button>
                <p className = 'registeras__agency'
                    onClick = { e => {
                        e.preventDefault()
                        setShowClientForm(false)
                        setShowAgencyForm(true)
                    }}
                    style = {{ color : colors.PRIMARY_COLOR , marginTop : '2%' , cursor : 'pointer' }}
                >Register as an Agency instead?</p>
            </>
    )

    return (
        <div className="login__container">
            <div className="forms__container">
                <div className="signin__signup">
                    <form action="" className="signin__form">
                        {
                            !showLoginForm
                                &&
                            <div style = {{ display : 'flex' , width : '100%' , justifyContent : 'space-evenly' , padding : '3% 0'}}>
                                <CardComponent as = 'Client' method = 'login' />
                                <CardComponent as = 'Agency' method = 'login' />
                            </div>
                        }
                        {
                            showLoginForm && 
                            <>
                                <h2 style = {{ fontFamily : 'Poppins , sans-serif' }}>SIGN IN</h2>
                                {/* <div className="input__field">
                                    <i className = 'fa fa-user'></i>
                                        <input 
                                        type = "text"
                                        name=""
                                        id = ""
                                        placeholder = 'Username'
                                    />
                                </div> */}
                                <div className="input__field">
                                    <i className = 'fa fa-envelope'></i>
                                    <input 
                                        type = "text"
                                        name=""
                                        id = ""
                                        placeholder = 'Email'
                                    />
                                </div>
                                <div className="input__field">
                                    <i className = 'fa fa-lock'></i>
                                    <input 
                                        type = "text"
                                        name=""
                                        id = ""
                                        placeholder = 'Password'
                                    />
                                </div>
                                <input type = "submit" value = "Sign Up" className = 'btn solid' />
                                <p className="social__text">Or sign up with social platforms</p>
                                <div className="social__media">
                                    <a href="#" className="social__icon"></a>
                                    <a href="#" className="social__icon"></a>
                                </div>
                            </>
                        }
                        {/* <h2 className="title">Sign In</h2>
                        <div className="input__field">

                            <i className = 'fa fa-user'></i>
                            <input 
                                type = "text"
                                name=""
                                id = ""
                                placeholder = 'Username'
                            />
                        </div>
                        <div className="input__field">
                            <i className = 'fa fa-lock'></i>
                            <input 
                                type = "text"
                                name=""
                                id = ""
                                placeholder = 'Password'
                            />
                        </div>
                        <input type = "submit" value = "Login" className = 'btn solid' />
                        <p className="social__text">Or sign in with social platforms</p>
                        <div className="social__media">
                            <a href="#" className="social__icon">
                                <i className = 'fa fa-facebook-f'></i>
                            </a>
                            <a href="#" className="social__icon">
                                <i className = 'fa fa-google'></i>
                            </a>
                        </div> */}
                    </form>

                    <form action="" className="signup__form">
                        {
                            (!showAgencyForm && !showClientForm)
                                &&
                            <div style = {{ display : 'flex' , width : '100%' , justifyContent : 'space-evenly' , padding : '3% 0' }}>
                                <CardComponent as = 'Client' method = 'register' />
                                <CardComponent as = 'Agency' method = 'register' />
                            </div>
                        }
                        {
                            showAgencyForm && <AgencyForm />
                        }
                        {
                            showClientForm && <ClientForm />
                        }
                        
                        
                    </form>
                </div>
            </div>

            <div className="panels__container">
                <div className="panel left__panel">
                    <div className="content">
                        <h3>New here?</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, animi. Et quae similique dignissimos est?</p>
                        <button className="btn transparent" id="signup__button" onClick = {handleSignUpButtonClick}>Sign Up</button>
                    </div>
                    {/* <img src={logo} alt="" className = 'image'/> */}
                </div>
                <div className="panel right__panel">
                    <div className="content">
                        <h3>One of us??</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, animi. Et quae similique dignissimos est?</p>
                        <button className="btn transparent" id="signin__button" onClick = {handleSignInButtonClick}>Sign in</button>
                    </div>
                    {/* <img src={register} alt="" className = 'image'/> */}
                </div>
            </div>
        </div>
    )
}

export default Login