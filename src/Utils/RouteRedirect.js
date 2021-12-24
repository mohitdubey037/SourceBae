import { useHistory } from "react-router-dom";
import { AGENCY, CLIENT } from "../shared/constants";

function RouteRedirect(Role) {
    const routerHistory = useHistory();
    if (Role === CLIENT) {
        routerHistory.replace('/clientNewestDashboard');
    }
    if (Role ===AGENCY) {
        routerHistory.replace('/agencyNewestDashboard');
    }
}

export default RouteRedirect;