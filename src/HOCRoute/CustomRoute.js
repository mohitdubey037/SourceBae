import React from "react";
import { Route, withRouter } from "react-router-dom";
import { CLIENT, AGENCY } from "../shared/constants";

const CustomRoute = (props) => {
  const role = localStorage.getItem("role");
  let switchCondition = props.condition || props?.location?.condition;
  switch (switchCondition) {
    case AGENCY:
      role === CLIENT && alert(`You are login as a ${role}`);
      return role === AGENCY ? (
        <Route {...props} />
      ) : (
        (window.location.href = "https://sourcebae.com/")
      );
    case CLIENT:
      role === AGENCY && alert(`You are login as a ${role}`);
      return role === CLIENT ? (
        <Route {...props} />
      ) : (
        (window.location.href = "https://sourcebae.com/")
      );
    default:
      window.location.href = "https://sourcebae.com/";
  }
};

export default withRouter(CustomRoute);
