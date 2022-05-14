import { combineReducers } from 'redux';

import AgencyForm from './Reducer/AgencyForm';
import notification from './Reducer/notification';
import showNotification from './Reducer/show_notification';
import general from './Reducer/general';
const rootReducer = combineReducers({
    notification: notification,
    showNotification: showNotification,
    AgencyForm: AgencyForm,
    generalReducer: general
});

export default rootReducer;
