/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../Dashboard/dashboard.css";
import "../Login/login.css";
import * as helper from "../../shared/helper";
import { useParams } from "react-router";
import instance from "../../Constants/axiosConstants";
import {
    Typography,
    InputAdornment,
    Input,
    Grid,
    Switch,
    makeStyles,
    withStyles,
    FormGroup,
} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import loginImage from "../../assets/images/Logo/loginImage.png";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import cookie from "react-cookies";

const borderLight = "rgba(206,212,218, .993)";


const useStyles = makeStyles((theme) => ({
    inputs: {
        position: "relative",
        fontFamily: "Cutive Mono, monospace",
        // color: textDark,
        fontSize: "17px",
        padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
        borderRadius: "8px",
        border: "1.4px solid",
        boxShadow: "1px 2px 20px rgba(169,198,217,0.29457423) ",
        borderColor: borderLight,
    },
    passwordEye: {
        color: "rgba(131,153,167,0.9)",
        opacity: 0.9,
    },
}));

const ForgotPassword = (props) => {
    const classes = useStyles();

    const token = useParams();

    const [hidePassword, SetPasswordStatus] = useState(true);

    const [Role, setRole] = useState('Agency')

    const [form, setForm] = useState({
        password: "",
        token: token
    });

    const showPassword = (e) => {
        console.log(e);
        SetPasswordStatus((prevCheck) => !prevCheck);
    };

    //Methods

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleRole = (event) => {
        setRole(event.target.value);
    };

    const changePassword = (form) => {
        // setLoading(true);
        instance
            .patch(`/api/${Role}/auths/reset-password`, form)
            .then(response => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup aria-label="Role" name="Role" value={Role} onChange={handleRole}>
                        <FormControlLabel value="Agency" control={<Radio />} label="Agency" />
                        <FormControlLabel value="Client" control={<Radio />} label="Client" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div className="mainLoginPage">
                <div className="innerLoginPage">
                    <div className="loginIllustrator">
                        <img src={loginImage} alt="" />
                    </div>
                    <div className="loginContent">
                        <div className="mainLoginForm">
                            <div style={{ marginTop: '0px' }} className="loginForm">
                                <p style={{ marginBottom: "10px" }}>Password</p>
                                <Input
                                    className={classes.inputs}
                                    placeholder="Enter a Password"
                                    variant="outlined"
                                    type="password"
                                    disableUnderline={true}
                                    required
                                    fullWidth
                                    name="password"
                                    autoComplete="password"
                                    autoFocus
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    endAdornment={
                                        <InputAdornment>
                                            <AccountCircleRoundedIcon fontSize="default" />
                                        </InputAdornment>
                                    }
                                />
                                {/* <p style={{ marginTop: "20px", marginBottom: "10px" }}>
                                    Confirm Password
                                </p>
                                <Input
                                    placeholder="Enter a Confirm Password"
                                    className={classes.inputs}
                                    variant="outlined"
                                    // margin="normal"
                                    type={hidePassword ? "password" : "text"}
                                    required
                                    fullWidth
                                    disableUnderline={true}
                                    name="confirm password"
                                    autoComplete="confirm password"
                                    autoFocus
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    endAdornment={
                                        hidePassword ? (
                                            <InputAdornment position="end">
                                                <VisibilityOffTwoToneIcon
                                                    fontSize="default"
                                                    className={classes.passwordEye}
                                                    onClick={showPassword}
                                                />
                                            </InputAdornment>
                                        ) : (
                                            <InputAdornment position="end">
                                                <VisibilityTwoToneIcon
                                                    fontSize="default"
                                                    className={classes.passwordEye}
                                                    onClick={showPassword}
                                                />
                                            </InputAdornment>
                                        )
                                    }
                                /> */}
                                <button onClick={() => changePassword()} type="submit">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
