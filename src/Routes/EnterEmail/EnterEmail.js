import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import instance from '../../Constants/axiosConstants';
import {
    Typography,
    Switch,
    makeStyles,
    withStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(16),
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
                console.log(response);
                props.history.push(`/login:${Role}`)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        console.log(Role);
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
        console.log(state);
    }, [state])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Send Mail
                </Typography>
                <div style={{marginTop: '20px'}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup aria-label="Role" name="Role" value={Role} onChange={handleRole}>
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
                        label="Enter Email"
                        name="userEmail"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => handleChange(e)}
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
    )
}

export default EnterEmail;