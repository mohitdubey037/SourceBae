import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useParams } from "react-router";
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import lock from "../../assets/images/Logo/lock.svg";
import "./EnterEmail.css";
import UpImage from '../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import Spinner from '../../Components/Spinner/Spinner';

import Back from '../../Components/Back/Back';


import instance from '../../Constants/axiosConstants';
import {
    Typography,
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '15rem'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '75%',
        border: '1px solid #45A4EA',
        borderRadius: '0.5rem',
        padding: '0.4rem',
        height: '35px',
        "& .MuiFormControl-marginNormal": {
            // fontSize: '12px',
            verticalAlign: 'initial',
            fontFamily: 'Segoe UI',
            marginTop: '0',
        },
        "& .MuiInputBase-root": {
            fontSize: '12px'
        }
    },
    inputClass: {
        padding: '0'
    }
}));


function EnterEmail(props) {
    let { role } = useParams();

    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    const [state, setState] = useState({
        userEmail: '',
        resetThrough: 'email'
    });

    const sendVerificationLink = () => {
        setLoading(true);
        instance.post(`/api/${role}/auths/send-forget-password-link`, state)
            .then(response => {
                setLoading(false)
                props.history.push(`/login/${role}`)
            })
            .catch(err => {
                setLoading(false);
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    useEffect(() => {
    }, [state])

    return (
        <>
            <div className="image_and_forgot">
                <div className="forgot_parent">
                    <Back name="Forgot Password" />
                </div>
                <img className={`Image1_hireAgency ${role === "client" && 'conditional_colorChange'}`} src={UpImage} alt="upImage" />
                <img className={`Image2_hireAgency ${role === "client" && 'conditional_colorChange'}`} src={DownImage} alt="downImage" />
                {loading ? <Spinner />
                    :
                    <Container component="main">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <img src={lock} alt="" style={{ width: "2rem" }} />
                            <Typography component="h2" variant="h5" style={{ color: "#707070", fontFamily: "Segoe UI Semibold"}}>
                                Send Link
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="Enter Email"
                                    name="userEmail"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => handleChange(e)}
                                    style={{ color: "#707070" }}
                                />
                            </form>
                            <div className="submitButton submitButton_enterEmail">
                                <button onClick={() => sendVerificationLink()}>Submit</button>
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    )
}

export default EnterEmail;