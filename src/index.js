import React,{useEffect} from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Components/ClientNewestDashboard/Sidebar/Sidebar";
import * as serviceWorker from "./serviceWorker";
import firebaseConfig from "./firebase";
//REDUX

import store from './Redux/Store/store';
import {Provider} from 'react-redux'


// const gettingReduxState = useSelector((state) => {
// });

// const msg = firebaseConfig.messaging();
//     if (window.Notification.permission !== "denied") {
//       msg.onMessage((message) => {
//         console.log("in dispatch")
//         store.dispatch({
//                 type: "NOTIFICATION",
//                 notification: 1,
//               });
//       });
//     }

// navigator.serviceWorker.addEventListener("message", (message) => {
//   console.log("message in dis");
//   if (message?.data?.data?.type === "chat") {
//     console.log("store")
//     store.dispatch({
//       type: "NOTIFICATION",
//       notification: 1,
//     });
//   }
// });

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
