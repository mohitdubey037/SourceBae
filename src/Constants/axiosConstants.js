import axios from 'axios'
import { config } from "./apiConstants"

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

var url = config.url.API_URL

const instance = axios.create({
    baseURL: url,
    params:{},
    data:{},
    // cancelToken: new CancelToken(function (cancel) {
    // }),
})

axios
  .interceptors
  .request
  .use(function (config) {
    if (localStorage.getItem('Authorization')) {

        console.log("hi")
        instance.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`
    }
    else{
        console.log(localStorage.getItem('Authorization'),"token")
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (response){
    if(response.status===201){
        toast.success(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
        return response.data.data
    }
    else
        toast(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
}, function (error){
    
    return Promise.reject(error)
})

export default instance