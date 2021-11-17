import React, { useEffect, useState } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import * as helper from "../shared/helper"
import cookie from "react-cookies";

const CustomRoute = props => {
    const Role = localStorage.getItem('role');
    // console.log(Role);
    // let user;
    // if (Role !== null && Role !== '' && Role !== 'undefined') {
    //     user = helper.capitalize(Role)
    // }
    switch (props.condition) {
        case "Agency":
            return (
                Role === "Agency" ?
                    <Route {...props} />
                    :
                    // token !== 'undefined' ?
                    <Redirect to="/clientNewestDashboard" />
            );
        case "Client":
            return (
                Role === "Client" ? (
                    <Route {...props} />
                ) : (
                    <Redirect to="/agencyNewestDashboard" />
                )
            );
        default:
            return (<Redirect to={`login:${Role}`} />);
    }
};

export default withRouter(CustomRoute);