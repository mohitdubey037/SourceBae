import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useParams } from "react-router";
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import lock from "../../assets/images/Logo/lock.svg";
import "./EnterEmail.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import UpImage from '../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import Spinner from '../../Components/Spinner/Spinner';
import * as helper from '../../shared/helper';

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
        "& .MuiOutlinedInput-input": {
            paddingLeft: '10px',
            // padding: '11px 14px'
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
    // const [navigated, setNavigation] = useState(false);
    // const [portNavigated, setPortNavigated] = useState(false);

    const [loading, setLoading] = useState(false);
    const [Role, setRole] = React.useState(role);

    const classes = useStyles();

    const [state, setState] = useState({
        userEmail: '',
        resetThrough: 'email'
    });

    // useEffect(() => {
    //     if (!portNavigated && inputPort !== null && props.location.origin === "portfolio") {
    //         inputPort?.current?.click();
    //         setPortNavigated(true);
    //     }
    //     else if (portNavigated) {
    //         inputPort?.current?.click();
    //     }
    // })

    const sendVerificationLink = () => {
        setLoading(true);
        instance.post(`/api/${Role}/auths/send-forget-password-link`, state)
            .then(response => {
                setLoading(false)
                props.history.push(`/login/${Role}`)
            })
            .catch(err => {
                setLoading(false);
            })
    }

    useEffect(() => {
    }, [Role])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleRole = (event) => {
        setRole(event.target.value);
    };

    useEffect(() => {
    }, [state])

    return (
        <>
            <div className="image_and_forgot">
                <div className="forgot_parent">
                    <Back name="Forgot Password" />
                </div>
                <img className={`Image1_hireAgency ${Role === "Client" && 'conditional_colorChange'}`} src={UpImage} alt="upImage" />
                <img className={`Image2_hireAgency ${Role === "Client" && 'conditional_colorChange'}`} src={DownImage} alt="downImage" />
                {loading ? <Spinner />
                    :
                    <Container component="main">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <img src={lock} alt="" style={{ width: "2rem" }} />
                            <Typography component="h1" variant="h5" style={{ color: "#707070", fontFamily: "Segoe UI Semibold" }}>
                                Send Link
                            </Typography>
                            <div style={{ marginTop: '20px' }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" style={{ display: "flex", justifyContent: "center" }}>Role</FormLabel>
                                    <RadioGroup aria-label="Role" className="roleform" name="Role" value={Role} onChange={handleRole} style={{ color: '#015F9A' }}>
                                        <FormControlLabel value="agency" control={<Radio />} label="Agency" />
                                        <FormControlLabel value="client" control={<Radio />} label="Client" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <form className={classes.form} noValidate>
                                <TextField
                                    // className={classes.inputClass}
                                    // variant="outlined"
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
                            {/* <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => sendVerificationLink()}>
                            Send Verification Link</Button> */}
                        </div>
                    </Container>
                }
            </div>
        </>
    )
}

export default EnterEmail;