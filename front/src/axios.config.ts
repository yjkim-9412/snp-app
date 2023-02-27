import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('loginTeacher');
        config.headers = {
            'Authorization' : `Bearer ${token}`
    }

    return config;
});


export default axios;