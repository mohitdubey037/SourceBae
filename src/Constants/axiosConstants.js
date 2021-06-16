import axios from 'axios'
import { config } from "./apiConstants"

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

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
    const routerHistory = useHistory(); 
    console.log(error)
    let trueError = ""
    if(error?.response?.data?.message==="Bearer Token not found")
        routerHistory.push('/');
        const errors = error?.response?.data?.error ?? {}
        const errorName = Object.keys(errors)
        console.log(typeof errors)
        if(typeof errors === "object" && errorName.length>0){
            
                trueError = trueError+errors[errorName[0]][0]
            
        }
        else{
            trueError = error?.response?.data?.message
        }
    toast.error(trueError, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    return Promise.reject(error)
})

export default instance