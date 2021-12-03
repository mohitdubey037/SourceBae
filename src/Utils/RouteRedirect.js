import React from 'react';
import { useHistory } from "react-router-dom";

function RouteRedirect(Role) {
    const routerHistory = useHistory();
    if (Role === "Client") {
        routerHistory.replace('/clientNewestDashboard');
    }
    if (Role === "Agency") {
        routerHistory.replace('/agencyNewestDashboard');
    }
}

export default RouteRedirect;