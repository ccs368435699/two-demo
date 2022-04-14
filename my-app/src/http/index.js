import axios from "axios";
const config = {
    baseURL: 'https://api.uomg.com/api',
    timeout: 2000,
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     "Access-Control-Allow-Origin": "*",       
    // }
}

const axios_instance = axios.create(config);
// 设置axios拦截器：请求拦截器
axios_instance.interceptors.request.use(config => {  
    return config
}, err => {
    // 请求未成功发出，如：没有网络...
    return Promise.reject(err)
})

axios_instance.interceptors.response.use(res => {
    console.log('res:', res)
    return Promise.resolve(res.data)
}, err => {
    console.log(err)
    if (err.response) {
        // 失败响应的status需要在response中获得
        console.log(err.response)
        switch (err.response.status) {
            // 对得到的状态码的处理，具体的设置视自己的情况而定
            case 401:
                console.log('未登录')
                window.location.href = '/'
                break
            case 404:
                window.location.href = '/'
                break
            case 405:
                console.log('不支持的方法')
                break
            default:
                console.log('其他错误')
                break
        }
    }
    return Promise.reject(err)
})

export {    
    axios_instance
}



