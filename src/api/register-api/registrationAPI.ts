import { instance } from "../login-api/loginAPI";

export const registrationApi = {
    registrationRequest(data:{email: string, password: string}){
        return instance.post('/auth/register', data)
    }
}
