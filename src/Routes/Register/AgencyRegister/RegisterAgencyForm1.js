import React from 'react'
import { useEffect, useState } from "react";
import instance from "../../../Constants/axiosConstants";
import { useParams } from "react-router";
import * as helper from '../../../shared/helper';

function RegisterAgencyForm1(props) {

  const setForm = (event) => {
    let { name, value } = event.target;
    if (name === 'userPhone') {
      if (helper.noTextNumber(value)) {
        props.setSignupForm({
          ...props.signupForm,
          [name]: value,
        });
      }
    }
    else if (name === "firstName" || name === "lastName" || name === "userEmail") {
      props.setSignupForm({
        ...props.signupForm,
        [name]: value.toLowerCase(),
      });
    } else {
      props.setSignupForm({
        ...props.signupForm,
        [name]: value,
      });
    }
  };

  return (
    <form className="client__form form__1" autoComplete="off">
      <div>
        <div className="input_with_error">
          <label>First Name</label>
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={(e) => setForm(e)}
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
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => setForm(e)}
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
          <label>Email</label>
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            onChange={(e) => setForm(e)}
          />
          {props.errors.emailError && (
            <p className="error_productForm">
              {props.errors.emailError}
            </p>
          )}
        </div>
        <div className="input_with_error">
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={(e) => setForm(e)}
          />
          <input type="text" name="username" placeholder="Username" style={{ display: 'none' }} />
          {props.errors.userNameError && (
            <p className="error_productForm">
              {props.errors.userNameError}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="input_with_error">
          <label>Phone number</label>
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
          <label>Create Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={props.signupForm.password}
            onChange={(e) => setForm(e)}
          />
          {props.errors.passwordError && (
            <p className="error_productForm">
              {props.errors.passwordError}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
export default RegisterAgencyForm1;