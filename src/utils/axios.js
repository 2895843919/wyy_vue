import axios from 'axios';

let http = axios.create({
    // baseURL: 'http://localhost:3000',
    // baseURL: 'https://wyynodejs-api.vercel.app',
    baseURL: 'http://music.cpengx.cnn/',   //一个老师的服务器地址
    timeout: '10000'
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