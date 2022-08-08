import axios from 'axios';
import {ProfileType} from "../../main/pages/Profile/profileReducer";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const loginApi = {
    loginRequest(data: LoginPayloadType) {
        return instance.post<ProfileType>('auth/login', data);
    },
}

//types

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}