/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './PasswordReset.css';
import * as helper from "../../shared/helper";
import instance from "../../Constants/axiosConstants";
import { useParams, useHistory, useLocation } from "react-router-dom";
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
import UpImage from '../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../assets/images/Newestdashboard/Short_Term/DownImage.svg';
import Spinner from "../../Components/Spinner/Spinner";

import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
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
        marginBottom: "1rem",
        height: "3rem",
    },
    passwordEye: {
        color: "rgba(131,153,167,0.9)",
        opacity: 0.9,
        zIndex: 1,
        cursor: 'pointer'
    },
}));

const ForgotPassword = (props) => {

    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token')
    let role = new URLSearchParams(search).get('role');

    const classes = useStyles();

    const [hidePassword, SetPasswordStatus] = useState(true);
    const [loading, setLoading] = useState(false);

    const [Role, setRole] = useState(role)

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

    const changePassword = () => {
        setLoading(true);
        instance
            .patch(`/api/${role}/auths/reset-password`, form)
            .then(response => {
                setLoading(false)
                props.history.push(`/login/${role}`);
            })
            .catch((err) => {
                setLoading(false);
            });
    };


    return (
        <>
            <div className="mainLoginPage_Parent">
                <div style={{ marginTop: '20px' }}>
                    <img className="Image1_hireAgency" src={UpImage} alt="upImage" />
                    <img className="Image2_hireAgency" src={DownImage} alt="downImage" />
                </div>
                {loading ? <Spinner /> :
                    <div className="mainLoginPage">
                        <div className="innerLoginPage">
                            <div className="ForgetContent">
                                <div className="HeadingForgetPassword">Reset Password </div>
                                <div className="mainLoginForm">
                                    <div style={{ marginTop: '0px' }} className="loginForm">
                                        <p style={{ marginLeft: "-7rem", marginBottom: "10px" }}>Enter New Password Here</p>
                                        <Input
                                            className={classes.inputs}
                                            placeholder="Enter a Password"
                                            variant="outlined"
                                            type={hidePassword ? "password" : "text"}
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
                                                <InputAdornment position="end">
                                                    {hidePassword ? (
                                                        <VisibilityTwoToneIcon
                                                            fontSize="small"
                                                            className={classes.passwordEye}
                                                            onClick={showPassword}
                                                        />
                                                    ) : (
                                                        <VisibilityOffTwoToneIcon
                                                            fontSize="small"
                                                            className={classes.passwordEye}
                                                            onClick={showPassword}
                                                        />
                                                    )}
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
                }
            </div>
        </>
    );
};

export default ForgotPassword;
