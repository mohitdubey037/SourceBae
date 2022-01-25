/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./../register.css";
import { useParams } from "react-router";
import { CLIENT } from "../../../shared/constants";

const RegisterClientForm2 = (props) => {
  let { role } = useParams();


  const handleCreateProfile = (event, role) => {
    let { name, value } = event.target;
    if (role === CLIENT)
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
        <label>User Designation
          <span className="requiredStar">
            *
          </span>
        </label>
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
        <label>Company Name
          <span className="requiredStar">
            *
          </span>
        </label>
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
        <label>Website Url
          <span className="requiredStar">
            *
          </span>
        </label>
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
