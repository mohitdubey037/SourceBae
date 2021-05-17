import axios from 'axios'
import { config } from "./apiConstants"

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

var url = config.url.API_URL

axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('Authorization')}`;
const instance = axios.create({
    baseURL: url,
    params:{},
    data:{},
})

instance.interceptors.response.use(function (response){
    if(response.status===200){
        return response.data.data
    }
    else if(response.status===201){
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
    else{
        console.log(response)
    }

}, function (error){
    console.log(error)
    if(error?.response?.data?.message==="Bearer Token not found")
        window.location.href="/"
    toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    return Promise.reject(error)
})

export default instance