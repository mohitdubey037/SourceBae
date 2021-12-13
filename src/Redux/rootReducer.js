import { combineReducers } from "redux";

import registerReducer from "./Register/register.reducer";
import notification from "./Reducer/notification";
import showNotification from "./Reducer/show_notification";
import AgencyForm from './Reducer/AgencyForm';
// import initialAgencyFormApi from './Reducer/initialAgencyFormApi';

// import clientProjects from "./Reducer/clientProjects";
const rootReducer = combineReducers({
  notification: notification,
  showNotification: showNotification,
  AgencyForm: AgencyForm,
  // initialAgencyFormApi: initialAgencyFormApi
  // register: registerReducer,
  // clientProjects: clientProjects,
});

export default rootReducer;
