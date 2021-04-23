import axios from 'axios'
import { config } from "./apiConstants"

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

var url = config.url.API_URL

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('Authorization')}`;
const instance = axios.create({
    baseURL: url,
    params:{},
    data:{},
    // cancelToken: new CancelToken(function (cancel) {
    // }),
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
    toast(error?.response?.data?.message, {
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