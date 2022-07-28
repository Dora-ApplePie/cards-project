import axios from "axios"
import { LoginParamsType } from "../../main/pages/Login/loginReducer"
import { ProfileType } from "../../main/pages/Profile/profileReducer"

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,

})

export const loginAPI = {
    login() {
        return instance.post<ProfileType>('auth/login', {email: 'falconaleksey@mail.ru',
            password: '12345678'})
    },
}
