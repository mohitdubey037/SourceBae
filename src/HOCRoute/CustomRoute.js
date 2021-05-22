import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

const CustomRoute = props => {
    const [returnedRoute, setReturnedRoute] = useState("");
    const user = localStorage.getItem('role')

    useEffect(() => {
        switch (props.condition) {
            case "Agency":
                user==="Client" && alert("Invalid")
                return setReturnedRoute(
                    user === "Agency" ? (
                        <Route {...props} />
                    ) : (
                        <Redirect to="/page-not-found" />
                    )
                );
            case "Client":
                user==="Agency" && alert("Invalid url")
                return setReturnedRoute(
                    user === "Client" ? (
                        <Route {...props} />
                    ) : (
                        <Redirect to="/page-not-found" />
                    )
                );
            default:
                return setReturnedRoute(<Route {...props} />);
        }
    }, [user]);
    return <>{returnedRoute}</>;
};

export default CustomRoute;