import axios from "axios";
import {ProfileType} from "../login-api/loginAPI";

export const instance = axios.create({
    baseURL:  'http://localhost:7542/2.0/',
    // || process.env.REACT_APP_BASE_URL
    withCredentials: true,
})

export const authApi = {
    me() {
        return instance.post<ProfileType>('auth/me', {});
    },
}