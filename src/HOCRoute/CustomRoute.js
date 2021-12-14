import React, { useEffect, useState } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import * as helper from "../shared/helper"



const CustomRoute = props => {
    const Role = helper.capitalize(localStorage.getItem('role'));
        switch (props.condition) {
            case "Agency":
                Role === "Client" && alert(`You are login as a ${Role}`)
                return (
                    Role === "Agency" ? (
                        <Route {...props} />
                    ) : (
                        // <Redirect to="/page-not-found" />
                        window.location.href = 'https://sourcebae.com/'
                    )
                );
            case "Client":
                Role === "Agency" && alert(`You are login as a ${Role}`)
                return (
                    Role === "Client" ? (
                        <Route {...props} />
                    ) : (
                        // <Redirect to="/page-not-found" />
                        window.location.href = 'https://sourcebae.com/'
                    )
                );
            default:
                // return (<Redirect to='page-not-found'/>);
                window.location.href = 'https://sourcebae.com/';
        }
};

export default withRouter(CustomRoute);