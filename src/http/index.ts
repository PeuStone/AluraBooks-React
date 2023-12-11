import axios from "axios";
import { useObterToken } from "../hooks";

const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    const token = useObterToken()
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (erro) {
    console.log('Erro no interceptor do axios');

    return Promise.reject(erro)
})

export default http