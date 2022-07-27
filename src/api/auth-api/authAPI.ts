import {instance} from "../login-api/loginAPI";

export const authApi = {
    me() {
        return instance.post('auth/me', {});
    },
}