import axios from 'axios';

export type ProfileType = {
    avatar: string;
    created: string | null;
    email: string | null;
    isAdmin: boolean | null;
    name: string;
    publicCardPacksCount: number | null;
    rememberMe: boolean | null;
    updated: string | null;
    verified: boolean | null;
    _id: string | null;
    error?: string;
};

export const instance = axios.create({
    baseURL:  'http://localhost:7542/2.0/',
    // || process.env.REACT_APP_BASE_URL
    withCredentials: true,
})

export const loginApi = {
    loginRequest(data: { email: string; password: string; rememberMe: boolean }) {
        return instance.post<ProfileType>('auth/login', data);
    },
}