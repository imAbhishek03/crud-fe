import { myAxios } from "./config"

export const registerUser = (request) =>{
    return myAxios.post(`/auth/register-user`,request).then((response) => {return response})
}

export const loginUser = (request) =>{
    return myAxios.post(`/auth/login`, request).then((response)=>{return response})
}