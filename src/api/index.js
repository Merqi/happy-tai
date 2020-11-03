import axios from 'axios'

axios.interceptors.request.use(function (config) {
    // if(localStorage.getItem('token')){
    //     config.headers.Authorization = `${localStorage.getItem('token')}`
    // }
    
    config.headers = {'Content-Type':'application/x-www-form-urlencoded'}
    if(localStorage.getItem('token')){ //拼接token
        config.params.token = localStorage.getItem('token')
    }
    console.log(config)
    return config;
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default axios;