import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from 'react-cookies';
const buildType = 'development';
var url =
    process.env.NODE_ENV === 'development' || buildType === 'development'
        ? 'https://testapi.sourcebae.com'
        : 'https://api.sourcebae.com';

// ? 'https://api.onesourcing.in'
axios.defaults.headers.common['Authorization'] = `${cookie.load(
    'Authorization'
)}`;
const instance = axios.create({
    baseURL: url,
    params: {},
    data: {}
});

let sessionExpiredShowed = false

const throttle = () => {
    if (!sessionExpiredShowed) {
        toast.error('Session expired!')
        sessionExpiredShowed = true
        let timeOut = setTimeout(() => {
            sessionExpiredShowed = false
            clearTimeout(timeOut)
        }, 1000);
    }
}

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
        let isAuth = !!cookie.load('Authorization');
        if (isAuth) {
            switch (error?.response?.status) {
                case 400:
                    let trueError = '';

                    if (
                        error?.response?.data?.message ===
                        'Invalid parameters passed'
                    ) {
                        const errors = error?.response?.data?.error ?? {};
                        const errorName = Object.keys(errors);
                        if (
                            typeof errors === 'object' &&
                            errorName.length > 0
                        ) {
                            trueError = trueError + errors[errorName[0]][0];
                            toast.error(trueError);
                        } else {
                            toast.error(error?.response?.data?.message);
                        }
                    }

                    break;
                case 401:
                    throttle()
                    let timeOut = setTimeout(() => {
                        localStorage.clear();
                        cookie.remove('Authorization');
                        window.location.href = '/';
                        clearTimeout(timeOut)
                    }, 1000);
                    break;
                case 403:
                    break;
                case 404:
                    if (error?.response?.data?.message === 'User not found')
                        toast.error(error?.response?.data?.message);
                    break;
                case 500:
                    alert(error?.response?.data?.message);
                    localStorage.clear();
                    cookie.remove('Authorization');
                    window.location.href = '/';
                    break;
                default:
                    break;
            }
        } else {
            switch (error?.response?.status) {
                case 400:
                    toast.error(error?.response?.data?.message);
                    break;

                case 401:
                    alert(error?.response?.data?.message);
                    localStorage.clear();
                    cookie.remove('Authorization');
                    window.location.href = '/';
                    break;
                case 403:
                    break;
                case 404:
                    if (error?.response?.data?.message === 'User not found')
                        toast.error(error?.response?.data?.message);

                    break;
                case 500:
                    break;
                default:
                    window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export const axiosPatchModule = async (urlEndpoint, body, params, headers = { 'Authorization': cookie.load('Authorization') }) => {
    return axios.patch(url + urlEndpoint, body, { headers, params })
        .then(res => res.data)
        .catch(err => { throw (err) })
}

export default instance;
