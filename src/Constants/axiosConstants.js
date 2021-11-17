import axios from "axios";
import { config } from "./apiConstants";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from "react-cookies";

var url = config.url.API_URL;

axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
  "Authorization"
)}`;
const instance = axios.create({
  baseURL: url,
  params: {},
  data: {},
});

instance.interceptors.request.use(function (request) {
  if (!request.url.includes("login")) {
    request.headers["Authorization"] = cookie.load("Authorization");
  }
  return request;
});
const customToast = new toast()
instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return response.data.data;
    } else if (
      response.status === 201 ||
      response.status === 206 ||
      response.status === 204
    ) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return response.data.data;
    } else {
    }
  },
  function (error) {
    let trueError = "";
    if (error?.response?.status !== 404) {
      if (error?.response?.data?.message === "Bearer Token not found")
        window.location.href = "/";

      else {
        const errors = error?.response?.data?.error ?? {};
        const errorName = Object.keys(errors);
        if (typeof errors === "object" && errorName.length > 0) {
          trueError = trueError + errors[errorName[0]][0];
        } else {
          trueError = error?.response?.data?.message;
        }
        if(trueError==="" || trueError===undefined||trueError===null){
          trueError = "Something went wrong. Please try again later."
        }
        toast.error(trueError, {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
    else if (error?.response?.status === 404 && error?.response?.config?.url?.includes("login")) {
      toast.error(error?.response?.data?.message)
    }
    return Promise.reject(error);
  }
);

export default instance;
