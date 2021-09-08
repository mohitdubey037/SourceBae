import React, { useEffect, useState } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import * as helper from "../shared/helper"



const CustomRoute = props => {
    const temp = localStorage.getItem('role');
    let user = ''
    if (temp !== null && temp !== '' && temp !== 'undefined'){
        user = helper.capitalize(temp)
    }
        switch (props.condition) {
            case "Agency":
                user==="Client" && alert("Invalid urlsss")
                return (
                    user === "Agency" ? (
                        <Route {...props} />
                    ) : (
                        <Redirect to="/page-not-found" />
                    )
                );
            case "Client":
                user==="Agency" && alert("Invalid url")
                return (
                    user === "Client" ? (
                        <Route {...props} />
                    ) : (
                        <Redirect to="/page-not-found" />
                    )
                );
            default:
                return (<Redirect to='page-not-found'/>);
        }
};

export default withRouter(CustomRoute);