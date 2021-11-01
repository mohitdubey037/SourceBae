/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './ForgotPassword.css'
import * as helper from "../../shared/helper";
import { useParams } from "react-router";
import instance from "../../Constants/axiosConstants";
import {
    InputAdornment,
    Input,
    makeStyles,
} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import loginImage from "../../assets/images/Logo/loginImage.png";
import UpImage from '../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const borderLight = "rgba(206,212,218, .993)";


const useStyles = makeStyles((theme) => ({
    inputs: {
        position: "relative",
        fontFamily: "Segoe UI Semibold, monospace",
        fontSize: "16px",
        padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
        borderRadius: "8px",
        border: "2px solid #45a4ea",
        marginBottom:"1rem",
        height: "3rem",
    },
    passwordEye: {
        color: "rgba(131,153,167,0.9)",
        opacity: 0.9,
        zIndex:1,
    },
}));

const ForgotPassword = (props) => {
    const classes = useStyles();

    let {token} = useParams();
    token = token.slice(1);

    const [hidePassword, SetPasswordStatus] = useState(true);

    const [Role, setRole] = useState('agency')

    const [form, setForm] = useState({
        password: "",
        token: token
    });

    
    const showPassword = (e) => {
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

    const changePassword = () => {
        // setLoading(true);
        instance
            .patch(`/api/${Role}/auths/reset-password`, form)
            .then(response => {
                props.history.push('/');
            })
            .catch((err) => {
            });
    };


    return (
        <>
            <div style={{ marginTop: '20px' }}>
            <img className="Image1_hireAgency" src={UpImage} alt="upImage" />
            <img className="Image2_hireAgency" src={DownImage} alt="downImage" />
            </div>
            <div className="mainLoginPage">
                <div className="innerLoginPage">
                    {/* <div className="loginIllustrator">
                        <img src={loginImage} alt="" />
                    </div> */}
                    <div className="ForgetContent">
                    <div className="HeadingForgetPassword">Reset Password </div>
                        <div className="mainLoginForm">
                            <FormControl component="fieldset" className="roleRadio">
                                <FormLabel className='role' component="legend">Role</FormLabel>
                                <RadioGroup style ={{display:"flex"}} aria-label="Role" name="Role" value={Role} onChange={handleRole}>
                                    <FormControlLabel value="agency" control={<Radio />} label="Agency" />
                                    <FormControlLabel value="client" control={<Radio />} label="Client" />
                                </RadioGroup>
                            </FormControl>
                            <div style={{ marginTop: '0px' }} className="loginForm">
                                <p style={{marginLeft:"-7rem", marginBottom: "10px" }}>Enter New Password Here</p>
                                <Input
                                    className={classes.inputs}
                                    placeholder="Enter a Password"
                                    variant="outlined"
                                    type="password"
                                    value={form.password}
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
