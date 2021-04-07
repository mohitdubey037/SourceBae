import axios from 'axios'
import { config } from "./apiConstants"

var url = config.url.API_URL
const instance = axios.create({
    baseURL: url,
    headers: {'Authorization': `Bearer ${localStorage.getItem('AUTHORIZATION')}`},
    params:{},
    data:{},
    // cancelToken: new CancelToken(function (cancel) {
    // }),
})

instance.interceptors.request.use(function (response){
    return response
}, function (error){

    return Promise.reject(error)
})

export default instance