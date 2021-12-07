import { combineReducers } from "redux";

import registerReducer from "./Register/register.reducer";
import notification from "./Reducer/notification";
import showNotification from "./Reducer/show_notification";
// import clientProjects from "./Reducer/clientProjects";
const rootReducer = combineReducers({
  notification: notification,
  showNotification: showNotification
  // register: registerReducer,
  // clientProjects: clientProjects,
});

export default rootReducer;
