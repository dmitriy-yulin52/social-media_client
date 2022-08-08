import axios from "axios";


export const instance = axios.create({
    withCredentials:true,
    baseURL: 'http://localhost:5555'
})



instance.interceptors.request.use((req)=>{
    if(localStorage.getItem('token')){
        if(req.headers){
            req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

        }
    }
    return req
})