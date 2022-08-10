import {AxiosResponse} from 'axios';
import {instance} from "../instance/instance";

export const loginApi = {
    loginRequest(data: LoginPayloadType) {
        return instance.post<any, AxiosResponse<UserResponseType>, LoginPayloadType>('auth/login', data);
    },
}

//types
export type UserResponseType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    __v: number,
    token: string,
    tokenDeathTime: number,
    avatar: string
    error?: string
}

export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}