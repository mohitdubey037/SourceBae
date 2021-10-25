import { combineReducers } from "redux";

import registerReducer from "./Register/register.reducer";
import notification from "./Reducer/notification";
// import clientProjects from "./Reducer/clientProjects";
const rootReducer = combineReducers({
  notification: notification,
  // register: registerReducer,
  // clientProjects: clientProjects,
});

export default rootReducer;
