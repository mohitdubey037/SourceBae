/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./../register.css";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core";
import instance from "../../../Constants/axiosConstants";
import * as helper from "../../../shared/helper";
import { toast } from "react-toastify";
import Spinner from "../../../Components/Spinner/Spinner";
import cookie from "react-cookies";
import imgRegister from "../../../assets/images/Newestdashboard/Register/img_register.svg";
import Signup1 from "../../../assets/images/Newestdashboard/Register/signup_up.svg";
import Signup2 from "../../../assets/images/Newestdashboard/Register/signup_down.svg";
import useIsFirstRender from '../../../Utils/useIsFirstRender';
const dateStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    border: `1px solid lightgrey`,
    color: `gray`,
    borderRadius: `10px`,
    outline: "none",
    textColor: `gray`,
    marginTop: `1%`,
    paddingLeft: `4%`,
    paddingTop: `1%`,
    width: `60%`,
    height: `60px`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: `100%`,
    color: `gray`,
    border: "none",
    background: "none",
  },
  label: {
    color: `gray`,
  },
}));

const RegisterClientForm2 = (props) => {
  const isFirstRender = useIsFirstRender();
  let { role } = useParams();
  role = helper.capitalize(helper.cleanParam(role));


  const handleCreateProfile = (event, role) => {
    let { name, value } = event.target;
      if (role === "Client")
      props.setClientProfileDetails({
        ...props.clientProfileDetails,
        [name]: value,
      });
  };
  const handleSocialPlatform = (event) => {
    const { name, value } = event.target;
    if (name === "linkedIn") {
      props.setLinkedIn({
        platformName: name,
        platformLink: value,
      });
    } else if (name === "website") {
      props.setSite({
        platformName: name,
        platformLink: value,
      });
    }
  };
  
  return (
    <div className="clientSignupForm2Parent">
    <div className="input_with_error">
      <label>User Designation</label>
      <input
        type="text"
        name="userDesignation"
        placeholder="User Designation"
        onChange={(event) =>
          handleCreateProfile(event, role)
        }
      />
      {props.errors.userDesignationError && (
        <p className="error_productForm">
          {props.errors.userDesignationError}
        </p>
      )}
    </div>

    <div className="input_with_error">
      <label>Company Name</label>
      <input
        type="text"
        name="companyName"
        value={props.clientProfileDetails.companyName}
        placeholder="Company Name"
        onChange={(event) =>
          handleCreateProfile(event, role)
        }
      />
      {props.errors.companyNameError && (
        <p className="error_productForm">
          {props.errors.companyNameError}
        </p>
      )}
    </div>
    <div className="input_with_error">
      <label>Website Url</label>
      <input
        type="text"
        name="website"
        placeholder="Website URL"
        value={props.site.platformLink}
        onChange={(event) => handleSocialPlatform(event)}
      />
      {props.errors.socialPlatformDetailsError && (
        <p className="error_productForm">
          {props.errors.socialPlatformDetailsError}
        </p>
      )}
    </div>
  </div>
  )
};
export default RegisterClientForm2;
