import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Components/ClientNewestDashboard/Sidebar/Sidebar";
import * as serviceWorker from "./serviceWorker";

//REDUX

import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Redux/rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const gettingReduxState = useSelector((state) => {
//   console.log("state", state);
// });

navigator.serviceWorker.addEventListener("message", (message) => {
  if (message?.data?.data?.type === "chat") {
    store.dispatch({
      type: "NOTIFICATION",
      notification: 1,
    });
  }
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
