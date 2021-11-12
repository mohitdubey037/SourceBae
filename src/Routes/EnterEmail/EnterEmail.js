import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
    button: {
        backgroundColor: 'blue',
        width: '100%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#015F9A"
        },
        " &  .makeStyles-button-3 ": {
            backgroundColor: "red !imporant"
        }
    }
}));


function EnterEmail(props) {

    const classes = useStyles();

    const [state, setState] = useState({
        userEmail: '',
        resetThrough: 'email'
    });

    const [Role, setRole] = React.useState('Agency');

    const sendVerificationLink = () => {
        instance.post(`/api/${Role}/auths/send-forget-password-link`, state)
            .then(response => {
                props.history.push(`/login:${Role}`)
            })
            .catch(err => {
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
            <div className="forgot_parent">
                <Back name="Forgot Password" />
            </div>
            <Container component="main">
                <img className="Image1_hireAgency" src={UpImage} alt="upImage" />
                <img className="Image2_hireAgency" src={DownImage} alt="downImage" />
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={lock} alt="" style={{ width: "2rem" }} />
                    <Typography component="h1" variant="h5" style={{ color: "#707070", fontFamily: "Segoe UI Semibold" }}>
                        Send Mail
                    </Typography>
                    <div style={{ marginTop: '20px' }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{ display: "flex", justifyContent: "center" }}>Role</FormLabel>
                            <RadioGroup aria-label="Role" className="roleform" name="Role" value={Role} onChange={handleRole} style={{ display: "flex", flexDirection: "row" }} style={{ color: '#015F9A' }}>
                                <FormControlLabel value="Agency" control={<Radio />} label="Agency" />
                                <FormControlLabel value="Client" control={<Radio />} label="Client" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
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
                    <Button type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => sendVerificationLink()}>
                        Send Verification Link</Button>
                </div>
            </Container>
        </>
    )
}

export default EnterEmail;