import React from 'react'

function RegisterClientForm1(props) {

  const setForm = (event) => {
    let { name, value } = event.target;
    if (name === "firstName" || name === "lastName" || name === "userEmail") {
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
          <label>First Name
            <span className="requiredStar">
              *
            </span>
          </label>
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
          <label>Last Name
            <span className="requiredStar">
              *
            </span>
          </label>
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
          <label>Email
            <span className="requiredStar">
              *
            </span>
          </label>
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
          <label>User Name
            <span className="requiredStar">
              *
            </span>
          </label>
          <form autoComplete="user">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              onChange={(e) => setForm(e)}
            />
          </form>
          {props.errors.userNameError && (
            <p className="error_productForm">
              {props.errors.userNameError}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="input_with_error">
          <label>Phone number
            <span className="requiredStar">
              *
            </span>
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
          <label>Create Password
            <span className="requiredStar">
              *
            </span>
          </label>
          <form autoComplete="password">
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={props.signupForm.password}
              onChange={(e) => setForm(e)}
            />
          </form>
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
export default RegisterClientForm1;