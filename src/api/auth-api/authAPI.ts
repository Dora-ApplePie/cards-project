import {instance} from "../login-api/loginAPI";

export const authApi = {
    me() {
        return instance.post('auth/me', {});
    },
}

export const profileAPI = {
    authMe() {
        return instance.post('/auth/me').then(response => response.data)
    },

    updateProfile(name: string | null) {
        return instance.put('auth/me', {name}).then(response => response.data)
    },
    logOut() {
        return instance.delete('auth/me').then(response => response.data)
    }

}