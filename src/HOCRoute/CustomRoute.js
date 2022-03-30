import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { CLIENT, AGENCY } from '../shared/constants';
import cookie from 'react-cookies';
import {
    AGENCYROUTES,
    CLIENTROUTES,
    USERROUTES
} from '../Navigation/CONSTANTS';

const CustomRoute = (props) => {
    const role = localStorage.getItem('role');
    let switchCondition = props.condition || props?.location?.condition;
    debugger;
    switch (switchCondition) {
        case AGENCY:
            if (role === AGENCY) {
                return <Route {...props} />;
            } else if (role === CLIENT) {
                // if (!cookie.load('Authorization')) {
                //     return <Redirect to={`/login/${role}`} />;
                // } else {
                //     return <Redirect to={`/login/${role}`} />;
                // }
                return role === AGENCY ? (
                    <Redirect to={AGENCYROUTES.LOGIN} />
                ) : (
                    <Redirect to={CLIENTROUTES.LOGIN} />
                );
            } else {
                return <Redirect to={USERROUTES.ACTIVE_REQUIREMENTS} />;
            }

        case CLIENT:
            if (role === CLIENT) {
                return <Route {...props} />;
            } else if (role === AGENCY) {
                // if (!cookie.load('Authorization')) {
                //     return <Redirect to={`/login/${role}`} />;
                // } else {
                //     return <Redirect to={`/login/${role}`} />;
                // }
                return role === AGENCY ? (
                    <Redirect to={AGENCYROUTES.LOGIN} />
                ) : (
                    <Redirect to={CLIENTROUTES.LOGIN} />
                );
            } else {
                return <Redirect to={USERROUTES.ACTIVE_REQUIREMENTS} />;
            }

        default:
            return (window.location.href = '/');
    }
};

export default withRouter(CustomRoute);
