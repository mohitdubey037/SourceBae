import React from 'react';
import * as helper from '../../../shared/helper';
import { makeStyles } from '@material-ui/core';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';

const useStyles = makeStyles((theme) => ({
    passwordEye: {
        color: 'rgba(131,153,167,0.9)',
        opacity: 0.9,
        marginTop: '1rem',
        cursor: 'pointer'
    }
}));

function RegisterAgencyForm1(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    const classes = useStyles();
    const setForm = (event) => {
        let { name, value } = event.target;

        value = value.trim();
        if (name === 'userEmail') {
            value = value.replaceAll(' ', '');
        } else {
            value = value.replace(/[^\w\s]/gi, '').trim();
        }
        if (name === 'userPhone') {
            if (helper.noTextNumber(value)) {
                props.setSignupForm({
                    ...props.signupForm,
                    [name]: value
                });
            }
        } else if (name === 'firstName' || name === 'lastName') {
            props.setSignupForm({
                ...props.signupForm,
                [name]: value?.charAt(0)?.toUpperCase() + value?.slice(1)
            });
        } else if (name === 'userEmail') {
            props.setSignupForm({
                ...props.signupForm,
                [name]: value.toLowerCase()
            });
        } else {
            props.setSignupForm({
                ...props.signupForm,
                [name]: value
            });
        }
    };

    return (
        <form className="client__form form__1" autoComplete="off">
            <div>
                <div className="input_with_error">
                    <label>
                        First Name
                        <span className="requiredStar">*</span>
                    </label>
                    <input
                        required
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={(e) => setForm(e)}
                        value={props.signupForm.firstName}
                    />
                    <div>
                        {props.errors.firstNameError && (
                            <p className="error_productForm">
                                {props.errors.firstNameError}
                            </p>
                        )}
                    </div>
                </div>

                <div className="input_with_error">
                    <label>
                        Last Name
                        <span className="requiredStar">*</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={(e) => setForm(e)}
                        value={props.signupForm.lastName}
                    />
                    {props.errors.lastNameError && (
                        <p className="error_productForm">
                            {props.errors.lastNameError}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <div className="input_with_error">
                    <label>
                        Email
                        <span className="requiredStar">*</span>
                    </label>
                    <form autoComplete="new-email">
                        <input
                            type="email"
                            name="userEmail"
                            placeholder="Email"
                            onChange={(e) => setForm(e)}
                            value={props.signupForm.userEmail}
                        />
                    </form>
                    {props.errors.emailError && (
                        <p className="error_productForm">
                            {props.errors.emailError}
                        </p>
                    )}
                </div>
                <div className="input_with_error">
                    <label>
                        User Name
                        <span className="requiredStar">*</span>
                    </label>
                    <form autoComplete="user">
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            onChange={(e) => setForm(e)}
                            value={props.signupForm.userName}
                        />
                    </form>
                    {/* <input type="text" name="username" placeholder="Username" style={{ display: 'none' }} /> */}
                    {props.errors.userNameError && (
                        <p className="error_productForm">
                            {props.errors.userNameError}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <div className="input_with_error">
                    <label>
                        Phone number
                        <span className="requiredStar">*</span>
                    </label>
                    <input
                        type="tel"
                        name="userPhone"
                        maxLength="10"
                        placeholder="Phone No"
                        value={props.signupForm.userPhone}
                        onChange={(e) => setForm(e)}
                    />
                    {props.errors.phoneError && (
                        <p className="error_productForm">
                            {props.errors.phoneError}
                        </p>
                    )}
                </div>

                <div className="input_with_error">
                    <form autoComplete="new-password">
                        <label>
                            Create Password
                            <span className="requiredStar">*</span>
                        </label>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative'
                            }}
                        >
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Create Password"
                                value={props.signupForm.password}
                                onChange={(e) => setForm(e)}
                                style={{ paddingRight: '25px' }}
                            />
                            {!showPassword ? (
                                <VisibilityTwoToneIcon
                                    fontSize="small"
                                    className={classes.passwordEye}
                                    onClick={() => setShowPassword(true)}
                                    style={{
                                        position: 'relative',
                                        right: '25px'
                                    }}
                                />
                            ) : (
                                <VisibilityOffTwoToneIcon
                                    fontSize="small"
                                    className={classes.passwordEye}
                                    onClick={() => setShowPassword(false)}
                                    style={{
                                        position: 'relative',
                                        right: '25px'
                                    }}
                                />
                            )}
                        </div>
                    </form>
                    {props.errors.passwordError && (
                        <p className="error_productForm">
                            {props.errors.passwordError}
                        </p>
                    )}
                </div>
            </div>
        </form>
    );
}
export default RegisterAgencyForm1;
