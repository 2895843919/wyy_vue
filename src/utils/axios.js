import axios from 'axios';

let http = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'wyynodejs-api.vercel.app',
    timeout: '5000'
})

http.interceptors.request.use(config => {
    return config;
})

http.interceptors.response.use(res => {
    return res.data;
}, err => {
    console.log('请求出错');
})

export default http;