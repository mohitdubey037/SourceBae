import { useHistory } from 'react-router-dom';
import { AGENCY, CLIENT } from '../shared/constants';

function RouteRedirect(Role) {
    const routerHistory = useHistory();
    if (Role === CLIENT) {
        routerHistory.replace('/client-newest-dashboard');
    }
    if (Role === AGENCY) {
        routerHistory.replace('/agency-newest-dashboard');
    }
}

export default RouteRedirect;
