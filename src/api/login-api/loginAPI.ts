import axios, {AxiosResponse} from 'axios';


export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

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