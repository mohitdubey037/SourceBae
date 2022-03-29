import { combineReducers } from 'redux';

import notification from './Reducer/notification';
import showNotification from './Reducer/show_notification';
import AgencyForm from './Reducer/AgencyForm';
const rootReducer = combineReducers({
    notification: notification,
    showNotification: showNotification,
    AgencyForm: AgencyForm
});

export default rootReducer;
