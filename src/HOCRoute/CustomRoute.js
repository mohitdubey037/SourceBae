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
                Role == undefined ?
                    <Redirect to="/" />
                    :
                    Role === "Agency" && <Route {...props} />
                        // :
                        // <Redirect to="/agencyNewestDashboard" />
            );
        case "Client":
            return (
                Role == undefined ?
                    <Redirect to="/" />
                    :
                    Role === "Client" && <Route {...props} />
                        // :
                        // <Redirect to="/clientNewestDashboard" />
            );

        case "None":
            return <Redirect exact to="/" />

        default:
            return <Redirect exact to='/' />;
    }
};


// switch (props.condition) {
//     case "Agency":
//         user==="Client" && alert("Invalid urlsss")
//         return (
//             user === "Agency" ? (
//                 <Route {...props} />
//             ) : (
//                 <Redirect to="/page-not-found" />
//             )
//         );
//     case "Client":
//         user==="Agency" && alert("Invalid url")
//         return (
//             user === "Client" ? (
//                 <Route {...props} />
//             ) : (
//                 <Redirect to="/page-not-found" />
//             )
//         );
//     default:
//         return (<Redirect to='page-not-found'/>);
// }

export default withRouter(CustomRoute);