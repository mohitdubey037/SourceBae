import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from 'react-cookies';
const buildType = 'development';
var url =
    process.env.NODE_ENV === 'development' || buildType === 'development'
        ? 'https://api.onesourcing.in'
        : 'https://api.sourcebae.com';

axios.defaults.headers.common['Authorization'] = `${localStorage.getItem(
    'Authorization'
)}`;
const instance = axios.create({
    baseURL: url,
    params: {},
    data: {}
});

instance.interceptors.request.use(function (request) {
    if (!request.url.includes('login')) {
        request.headers['Authorization'] = cookie.load('Authorization');
    }
    return request;
});
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
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            return response.data.data;
        } else {
        }
    },
    function (error) {
        let trueError = '';

        if (error?.response?.status !== 404) {
            if (
                error?.response?.data?.message === 'Bearer Token not found' ||
                error?.response?.data?.message === 'Unauthorized' ||
                error?.response?.data?.error?.includes('CastError') ||
                error?.response?.data?.error?.includes('MongooseError')
            ) {
                if (cookie.load('Authorization')) {
                    alert(error?.response?.data?.message);
                }
                cookie.remove('Authorization');
                if (error?.response?.data?.message === 'Unauthorized')
                    alert('Please login with correct details');
                window.location.href = '/';
            } else if (error?.response?.status === 401) {
                localStorage.clear();
                cookie.remove('Authorization');
                if (error?.config?.url?.includes('login'))
                    toast.error('Please login with correct details');
                else window.location.href = '/';
            } else {
                const errors = error?.response?.data?.error ?? {};
                const errorName = Object.keys(errors);
                if (typeof errors === 'object' && errorName.length > 0) {
                    trueError = trueError + errors[errorName[0]][0];
                } else {
                    trueError = error?.response?.data?.message;
                }
                toast.error(trueError, {
                    position: 'top-right',
                    autoClose: 10000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else if (
            error?.response?.status === 404 &&
            error?.response?.config?.url?.includes('login')
        ) {
            toast.error(error?.response?.data?.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
