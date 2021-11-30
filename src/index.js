import React, { Suspence } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorker";
import store from "./Redux/Store/store";
import { Provider } from "react-redux";
import Spinner from "./Components/Spinner/Spinner";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer/>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
