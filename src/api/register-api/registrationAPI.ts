import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // || process.env.REACT_APP_BASE_URL
    withCredentials: true,
})

export const registrationApi = {
    registrationRequest(data:{email: string, password: string}){
        return instance.post('/auth/register', data)
    }
}
